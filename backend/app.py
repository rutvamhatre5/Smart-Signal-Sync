from flask import Flask, jsonify
from flask_cors import CORS
import threading
import time
import cv2

from backend.detector import detector
from backend.queue import get_queue_length

# ---------------- FLASK APP ----------------
app = Flask(__name__)
CORS(app)

# ---------------- SETTINGS ----------------
MAX_GREEN = 45

# ---------------- LIVE DATA ----------------
traffic_data = {
    "lane1": 0,
    "lane2": 0,
    "lane3": 0,
    "lane4": 0,
    "green_lane": "Lane1",
    "timer": 0
}

# ---------------- DETECT LANE ----------------
def detect_lane(image_path):
    frame = cv2.imread(image_path)

    if frame is None:
        print(f"Image not found: {image_path}")
        return 5, 0

    results = detector(frame)

    vehicle_count = len(results[0].boxes)
    queue_length = get_queue_length(results, frame)

    green_time = int(vehicle_count * 2 + queue_length / 5)
    green_time = max(5, min(green_time, MAX_GREEN))

    return green_time, vehicle_count

# ---------------- TRAFFIC LOOP ----------------
def traffic_loop():
    while True:

        # Lane 1
        g1, c1 = detect_lane("lane1.png")
        traffic_data["lane1"] = c1
        traffic_data["green_lane"] = "Lane1"

        for t in range(g1, -1, -1):
            traffic_data["timer"] = t
            time.sleep(1)

        # Lane 2
        g2, c2 = detect_lane("lane2.png")
        traffic_data["lane2"] = c2
        traffic_data["green_lane"] = "Lane2"

        for t in range(g2, -1, -1):
            traffic_data["timer"] = t
            time.sleep(1)

        # Lane 3
        g3, c3 = detect_lane("lane3.png")
        traffic_data["lane3"] = c3
        traffic_data["green_lane"] = "Lane3"

        for t in range(g3, -1, -1):
            traffic_data["timer"] = t
            time.sleep(1)

        # Lane 4
        g4, c4 = detect_lane("lane4.png")
        traffic_data["lane4"] = c4
        traffic_data["green_lane"] = "Lane4"

        for t in range(g4, -1, -1):
            traffic_data["timer"] = t
            time.sleep(1)

# ---------------- ROUTES ----------------
@app.route("/")
def home():
    return "Backend Running Correct File"

@app.route("/traffic-data")
def get_data():
    return jsonify(traffic_data)

# ---------------- MAIN ----------------
if __name__ == "__main__":
    threading.Thread(target=traffic_loop, daemon=True).start()
    app.run(host="127.0.0.1", port=8000, debug=True, use_reloader=False)