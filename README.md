📱 Card OCR & Verification App – React Native
📌 Project Overview

This project implements a card capture and OCR-based verification flow in a React Native mobile application using react-native-vision-camera.

The application allows users to capture a card image using the device camera, perform on-device OCR, and display the extracted information in a clean, user-friendly confirmation UI.
The flow is designed to resemble real-world identity and document verification workflows.

🎯 Key Features

📷 Real-time camera integration using Vision Camera

🖼️ Card image preview before processing

🔍 On-device OCR using Google ML Kit

🧠 Automatic text extraction from card images

🖥️ Structured and readable confirmation UI

⚠️ Robust error handling with try–catch

🚀 Offline processing (no backend required)

🧩 User Flow

User opens the camera screen

Captures a card image using Vision Camera

Image preview is shown for confirmation

OCR is triggered on user action

Extracted text is parsed into structured fields

Details are displayed for user verification

User confirms and proceeds to the next step

🛠️ Tech Stack

React Native

react-native-vision-camera

@react-native-ml-kit/text-recognition

JavaScript (ES6+)

React Navigation

📂 Screens Implemented
1️⃣ Card Capture Screen

Uses react-native-vision-camera for camera access

Handles camera permissions

Captures high-quality card images

Passes image path to verification screen

2️⃣ Card Verification Screen

Displays captured card image preview

Performs OCR using ML Kit

Extracts relevant text using parsing logic

Handles OCR errors safely with try–catch

Navigates to details confirmation screen

3️⃣ Card Details Confirmation Screen

Displays extracted details in a card-style layout

User-friendly and readable UI

Graceful handling of missing or partial data

Confirmation button to continue

🧠 OCR & Data Extraction Logic

OCR performed using Google ML Kit

Extracted raw text is parsed into structured fields

Pattern-based extraction logic

All OCR operations wrapped in try–catch blocks

Fallback values shown when extraction fails

⚙️ Installation & Setup
Install Dependencies
npm install react-native-vision-camera
npm install @react-native-ml-kit/text-recognition

iOS Setup
cd ios
pod install

Android Permissions

Camera permission is handled via Vision Camera configuration.

🧪 Sample Extracted Output (Dummy Example)
Field 1 : Sample Value
Field 2 : Example Text
Date    : XX/XX/XXXX
ID      : XXXX1234


⚠️ All displayed data is dummy and for demonstration purposes only.

✅ Error Handling

Camera access errors handled gracefully

OCR failures caught using try–catch

UI remains stable during processing

Buttons disabled while OCR is in progress

🚀 Future Enhancements

🖼️ Image pre-processing (crop, rotate, enhance)

✏️ Editable extracted fields

🧠 OCR confidence scoring

📤 Backend API integration

🧪 Validation of extracted values

🏁 Conclusion

This project demonstrates a generic card capture and OCR verification flow built using React Native and Vision Camera.
It is suitable for identity verification, onboarding flows, and document processing applications.