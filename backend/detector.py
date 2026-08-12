from ultralytics import YOLO

model = YOLO("model/best (1).pt")

def detector(frame):
    results = model(
        frame,
        conf=0.20,      # lower confidence
        imgsz=640,
        verbose=False
    )
    return results