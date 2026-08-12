from flask import Flask, jsonify, request
from flask_cors import CORS
import threading
import time
import cv2
import sqlite3

from backend.detector import detector
from backend.queue import get_queue_length

app = Flask(__name__)
CORS(app)

# ---------------- SETTINGS ----------------
MAX_GREEN = 45
MIN_GREEN = 5

# ---------------- LOGIN USER ----------------
LOGIN_EMAIL = "admin@gmail.com"
LOGIN_PASSWORD = "123456"

# ---------------- LIVE DATA ----------------
traffic_data = {
    "lane1": 0,
    "lane2": 0,
    "lane3": 0,
    "lane4": 0,
    "green_lane": "Lane1",
    "timer": 0
}

# ---------------- DATABASE ----------------
conn = sqlite3.connect("traffic.db", check_same_thread=False)
cur = conn.cursor()

cur.execute("""
CREATE TABLE IF NOT EXISTS traffic_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    time TEXT,
    lane1 INTEGER,
    lane2 INTEGER,
    lane3 INTEGER,
    lane4 INTEGER
)
""")
conn.commit()

# ---------------- VIDEO PATHS ----------------
cap1 = cv2.VideoCapture(r"C:\Users\Rutva\traffic_project\Smart signal sync\Smart signal sync\public\videos\lane1.mp4")
cap2 = cv2.VideoCapture(r"C:\Users\Rutva\traffic_project\Smart signal sync\Smart signal sync\public\videos\lane2.mp4")
cap3 = cv2.VideoCapture(r"C:\Users\Rutva\traffic_project\Smart signal sync\Smart signal sync\public\videos\lane3.mp4")
cap4 = cv2.VideoCapture(r"C:\Users\Rutva\traffic_project\Smart signal sync\Smart signal sync\public\videos\lane4.mp4")

# ---------------- DETECTION ----------------
def detect_lane(cap):
    ret, frame = cap.read()

    if not ret:
        cap.set(cv2.CAP_PROP_POS_FRAMES, 0)
        ret, frame = cap.read()

    if not ret:
        return 10, 0

    results = detector(frame)

    h, w, _ = frame.shape
    queue_line = int(h * 0.70)

    vehicle_count = 0

    for box in results[0].boxes:
        x1, y1, x2, y2 = box.xyxy[0]
        cy = int((y1 + y2) / 2)

        if cy > queue_line:
            vehicle_count += 1

    # TIMER LOGIC
    if vehicle_count <= 2:
        green_time = 10
    elif vehicle_count <= 5:
        green_time = 18
    elif vehicle_count <= 8:
        green_time = 28
    elif vehicle_count <= 12:
        green_time = 38
    else:
        green_time = 45

    print("🚗 Vehicles:", vehicle_count)
    print("⏱ Timer:", green_time)

    return green_time, vehicle_count

# ---------------- SAVE DATABASE ----------------
def save_log():
    cur.execute("""
        INSERT INTO traffic_logs(time,lane1,lane2,lane3,lane4)
        VALUES(datetime('now','localtime'),?,?,?,?)
    """, (
        traffic_data["lane1"],
        traffic_data["lane2"],
        traffic_data["lane3"],
        traffic_data["lane4"]
    ))
    conn.commit()

# ---------------- MAIN LOOP ----------------
def traffic_loop():

    green1, c1 = detect_lane(cap1)
    traffic_data["lane1"] = c1

    while True:

        # -------- Lane 1 --------
        traffic_data["green_lane"] = "Lane1"

        for t in range(green1, -1, -1):
            traffic_data["timer"] = t

            if t == 3:
                green2, c2 = detect_lane(cap2)
                traffic_data["lane2"] = c2

            time.sleep(1)

        # -------- Lane 2 --------
        traffic_data["green_lane"] = "Lane2"

        for t in range(green2, -1, -1):
            traffic_data["timer"] = t

            if t == 3:
                green3, c3 = detect_lane(cap3)
                traffic_data["lane3"] = c3

            time.sleep(1)

        # -------- Lane 3 --------
        traffic_data["green_lane"] = "Lane3"

        for t in range(green3, -1, -1):
            traffic_data["timer"] = t

            if t == 3:
                green4, c4 = detect_lane(cap4)
                traffic_data["lane4"] = c4

            time.sleep(1)

        # -------- Lane 4 --------
        traffic_data["green_lane"] = "Lane4"

        for t in range(green4, -1, -1):
            traffic_data["timer"] = t

            if t == 3:
                green1, c1 = detect_lane(cap1)
                traffic_data["lane1"] = c1

            time.sleep(1)

        # SAVE AFTER FULL CYCLE
        save_log()

# ---------------- LOGIN API ----------------
@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    if email == LOGIN_EMAIL and password == LOGIN_PASSWORD:
        return jsonify({
            "success": True,
            "message": "Login Successful"
        })

    return jsonify({
        "success": False,
        "message": "Invalid Email or Password"
    })

# ---------------- API ----------------
@app.route("/traffic-data")
def traffic_api():
    return jsonify(traffic_data)

@app.route("/analytics-data")
def analytics_api():

    cur.execute("""
        SELECT time,lane1,lane2,lane3,lane4
        FROM traffic_logs
        ORDER BY id DESC
        LIMIT 20
    """)

    rows = cur.fetchall()
    rows.reverse()

    result = []

    for row in rows:
        avg = int((row[1] + row[2] + row[3] + row[4]) / 4)

        result.append({
            "time": row[0][-8:-3],
            "lane1": row[1],
            "lane2": row[2],
            "lane3": row[3],
            "lane4": row[4],
            "overall": avg
        })

    return jsonify(result)

# ---------------- START ----------------
if __name__ == "__main__":
    threading.Thread(target=traffic_loop, daemon=True).start()
    app.run(debug=True, port=8000)