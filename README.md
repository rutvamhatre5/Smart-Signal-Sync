
# 🚦 Smart Signal Sync

An AI-powered adaptive traffic management system that uses computer vision and YOLOv8 to detect vehicles from traffic footage and dynamically optimize traffic signal timing based on traffic density.

## 📌 Overview

Traditional traffic signals generally operate using fixed timings, which can result in unnecessary waiting when traffic density varies between lanes.

**Smart Signal Sync** aims to make traffic signal control more responsive by analyzing vehicle density and allocating signal time according to traffic conditions.

The system uses **YOLOv8** for vehicle detection, a **Python/Flask backend** for processing, and a **React-based dashboard** for monitoring traffic conditions.

---

## 🎯 Problem Statement

Fixed-time traffic signals do not adapt to changing traffic conditions. A lane with heavy traffic may receive the same signal duration as a lane with very little traffic, leading to:

* Unnecessary waiting time
* Uneven traffic flow
* Increased congestion
* Inefficient utilization of green signal time

Smart Signal Sync addresses this problem through **vehicle detection and adaptive signal timing**.

---

## 💡 How It Works

```text
Traffic Video / CCTV Feed
          ↓
    YOLOv8 Detection
          ↓
     Vehicle Counting
          ↓
   Traffic Density Analysis
          ↓
   Signal Timing Logic
          ↓
   Adaptive Traffic Signals
          ↓
    React Dashboard
```

---

 ✨ Key Features

* 🚗 Vehicle detection using YOLOv8
* 📹 Traffic image/video processing using OpenCV
* 🚦 Adaptive traffic signal timing
* 📊 Traffic density monitoring
* 🖥️ Interactive React dashboard
* ⚙️ Flask backend for processing and API communication
* 💾 SQLite-based traffic data storage
* 🔄 Multi-lane traffic management

---

## 🛠️ Tech Stack

### Frontend

* React
* Vite
* JavaScript
* HTML/CSS

### Backend

* Python
* Flask
* OpenCV

### Machine Learning

* YOLOv8
* Ultralytics

### Database

* SQLite

### Tools

* Git
* GitHub
* VS Code

---

## 🏗️ System Architecture

```text
              Traffic Camera / Video
                       │
                       ▼
                ┌─────────────┐
                │   OpenCV    │
                └──────┬──────┘
                       │
                       ▼
                ┌─────────────┐
                │   YOLOv8    │
                │   Detector  │
                └──────┬──────┘
                       │
                       ▼
              Vehicle Detection
                       │
                       ▼
              Vehicle Count / Density
                       │
                       ▼
              ┌─────────────────┐
              │ Signal Timing   │
              │     Logic       │
              └────────┬────────┘
                       │
                       ▼
                Adaptive Signals
                       │
                       ▼
              ┌─────────────────┐
              │ React Dashboard │
              └─────────────────┘
                       │
                       ▼
                   Flask API
                       │
                       ▼
                    SQLite
```

---

## 📁 Project Structure

```text
traffic_project/
│
├── backend/
│   ├── app.py
│   ├── app2.py
│   ├── detector.py
│   ├── queue.py
│   └── timer.py
│
├── model/
│   └── YOLO model files
│
├── output/
│   └── result.jpg
│
├── Smart signal sync/
│   └── Smart signal sync/
│       ├── public/
│       ├── src/
│       ├── package.json
│       └── vite.config.js
│
├── requirements.txt
├── test.jpg
├── .gitignore
└── README.md
```

> Large model weights, datasets, databases, environment files, and dependencies are excluded from the repository using `.gitignore`.

---

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/Smart-Signal-Sync.git
cd Smart-Signal-Sync
```

### 2. Create a Python Virtual Environment

```bash
python -m venv .venv
```

### 3. Activate the Environment

**Windows:**

```bash
.venv\Scripts\activate
```

### 4. Install Python Dependencies

```bash
pip install -r requirements.txt
```

### 5. Install Frontend Dependencies

```bash
cd "Smart signal sync/Smart signal sync"
npm install
```

---

## ▶️ Running the Project

### Start the Backend

From the project root:

```bash
python backend/app.py
```

### Start the Frontend

Open another terminal:

```bash
cd "Smart signal sync/Smart signal sync"
npm run dev
```

The Vite development server will provide the local URL in the terminal.

---

## 🧠 Machine Learning Model

The project uses **YOLOv8** for vehicle detection from traffic footage.

The trained model weights are excluded from the GitHub repository because of their file size. The required model weights should be placed in the appropriate model directory before running inference.

---

## 📸 Results

The system processes traffic footage and detects vehicles to estimate traffic density.

Example output:

`output/result.jpg`

Traffic-lane images are also included as demonstration inputs/outputs.

---

## 🔮 Future Scope

* Real-time CCTV stream integration
* Improved vehicle tracking across frames
* Emergency vehicle prioritization
* Pedestrian-aware signal control
* Historical traffic prediction
* Reinforcement-learning-based signal optimization
* Multi-intersection traffic coordination
* IoT-based traffic infrastructure integration

---

## 👥 Team

* **Rutva Mhatre**
* **Vijaya Sawant**
* **Janhavi Sajurkar**
* **Rushikesh Kolhe**

**B.Tech – Computer Technology**

---

## 📄 License

This project is intended for educational and academic purposes.
:::
