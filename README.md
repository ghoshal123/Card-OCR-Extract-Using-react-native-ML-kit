📱 Card OCR & Verification – React Native
📌 Project Overview

This project implements an ID Card OCR and verification flow in a React Native mobile application.
The app allows users to capture or upload a card image, extract text using on-device OCR, and display the extracted information in a clean, user-friendly confirmation screen.

The solution is designed to mirror real-world identity verification workflows commonly used in fintech and digital onboarding applications.

🎯 Key Features

📸 Card image preview before processing

🔍 On-device OCR using Google ML Kit

🧠 Automatic text extraction from card images

🖥️ Structured and readable UI for extracted details

✅ Confirmation step before continuing

⚠️ Robust error handling using try–catch

🚀 Offline OCR processing (no server dependency)

🧩 User Flow

User captures or uploads a card image

Image preview is displayed on the verification screen

OCR is triggered on user action

Relevant text fields are extracted from the image

Extracted data is shown in a confirmation UI

User verifies and proceeds to the next step

🛠️ Tech Stack

React Native

@react-native-ml-kit/text-recognition

JavaScript (ES6+)

React Navigation

📂 Screens Implemented
1️⃣ Card Verification Screen

Displays the uploaded or captured card image

Performs OCR using ML Kit

Extracts text using pattern matching and parsing logic

Handles errors gracefully using try–catch

Navigates to the details screen with structured data

2️⃣ Card Details Confirmation Screen

Displays extracted card details in a card-style UI

Fields are clearly labeled and easy to read

Handles missing or partial data safely

Confirmation button to proceed further

🧠 OCR & Data Extraction Logic

Text extracted using Google ML Kit OCR

Pattern-based parsing used to identify structured fields

OCR execution wrapped in try–catch blocks

Supports fallback values for missing information

⚙️ Installation & Setup
Install Dependencies
npm install @react-native-ml-kit/text-recognition

iOS Setup
cd ios
pod install

🧪 Sample Extracted Output (Example)
Full Name      : Sample User
Additional Info: Sample Text
Date           : XX/XX/XXXX
Identifier     : ABCXXXXXX


⚠️ Note: All sample data shown is dummy data and used for demonstration purposes only.

✅ Error Handling

OCR failures are caught and logged

UI remains stable even when extraction fails

User actions are disabled during processing

Graceful fallbacks for missing values

🚀 Future Enhancements

✏️ Editable extracted fields

🧠 Improved parsing and confidence scoring

🖼️ Image pre-processing before OCR

📤 Backend API integration

🧪 Validation of extracted values

🏁 Conclusion

This project demonstrates a generic, production-ready card OCR verification flow built using React Native.
It is suitable for identity verification, onboarding flows, and document processing use cases.