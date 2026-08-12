def get_timer(vehicle_count, queue_length, frame_height):
    normalized = queue_length / frame_height

    timer = 5 + int(vehicle_count * 2.5) + int(normalized * 8)

    timer = max(5, min(timer, 40))
    return timer
