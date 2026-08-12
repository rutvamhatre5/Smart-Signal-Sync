def get_queue_length(results, frame):
    boxes = results[0].boxes
    
    if len(boxes) > 0:
        y_positions = [box.xyxy[0][3].item() for box in boxes]
        return max(y_positions) - min(y_positions)
    
    return 0