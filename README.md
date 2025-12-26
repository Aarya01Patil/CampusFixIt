# Campus FixIt 🏫🔧

**Campus Issue Reporting App**
A full-stack React Native application for students to report maintenance issues and for admins to manage them.

---

## 📌 Problem Statement
Colleges face daily maintenance issues, but there is no structured way to report, track, and resolve them.
**Campus FixIt** solves this by providing:
*   **Students**: A mobile app to raise issues, attach photos, and track status.
*   **Admins**: A system to view, update, and resolve reported issues.

---

## 🛠 Tech Stack

### Frontend (Mobile App)
*   **Framework**: React Native (Expo)
*   **Navigation**: React Navigation (Native Stack)
*   **State Management**: React Context API
*   **Networking**: Axios
*   **Storage**: AsyncStorage
*   **Image Handling**: Expo Image Picker

### Backend (Server)
*   **Runtime**: Node.js
*   **Framework**: Express.js
*   **Database**: MongoDB (Mongoose ODM)
*   **Authentication**: JWT (JSON Web Tokens)
*   **File Upload**: Multer

---

## 🚀 Features

### 🎓 Student Features
1.  **Authentication**: Secure Signup & Login.
2.  **Dashboard**: View all reported issues with status indicators (Open, In Progress, Resolved).
3.  **Report Issue**: Form to submit Title, Description, Category (Electrical, Water, etc.).
4.  **Image Upload**: Attach photos from the device gallery.
5.  **Status Tracking**: Real-time updates on issue resolution.

### 🛡 Admin Features
1.  **Dashboard**: View all issues from all students.
2.  **Manage Issues**: Update status (Open -> In Progress -> Resolved).
3.  **Add Remarks**: Provide feedback or notes on resolution.

---

## 🔧 Setup & Installation

### Prerequisites
*   Node.js (v14+)
*   MongoDB (Installed locally or running on Atlas)
*   Expo Go App (on your physical phone)

### 1. Backend Setup
1.  Navigate to the server directory:
    ```bash
    cd server
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Configure Environment Variables:
    *   Create a `.env` file in the `server/` directory.
    *   Copy contents from `.env.example`:
        ```env
        PORT=5000
        MONGO_URI=mongodb://localhost:27017/campusfixit
        JWT_SECRET=your_secret_key
        ```
4.  Start the Server:
    ```bash
    npm start
    # or
    node index.js
    ```
    *Server runs on port 5000.*

### 2. Frontend Setup
1.  Navigate to the client directory:
    ```bash
    cd client
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  **Important**: Configure IP Address
    *   Open `src/context/AuthContext.js`.
    *   Find `const BASE_URL` and replace the IP address with your computer's Local LAN IP (e.g., `192.168.1.5`).
    *   *Note: `localhost` will not work on a physical phone.*
4.  Start the App:
    ```bash
    npx expo start --clear
    ```
5.  Scan the QR code with the **Expo Go** app on your phone.

---

## 📡 API Documentation

### Auth Endpoints
*   `POST /api/auth/register`
    *   Body: `{ name, email, password, role }`
    *   *Role defaults to 'student'. Use 'admin' to create admin accounts.*
*   `POST /api/auth/login`
    *   Body: `{ email, password }`
    *   Returns: `{ token, user info }`

### Issue Endpoints
*   `GET /api/issues`
    *   Headers: `Authorization: Bearer <token>`
    *   Returns: List of issues (Student sees own, Admin sees all).
*   `POST /api/issues`
    *   Headers: `Authorization: Bearer <token>`, `Content-Type: multipart/form-data`
    *   Body: `title`, `description`, `category`, `image` (file).
*   `PUT /api/issues/:id`
    *   Headers: `Authorization: Bearer <token>`
    *   Body: `{ status, remarks }`
    *   *Admin Only.*

---

## 📁 Project Structure
```
campusfixit/
├── client/                 # React Native App
│   ├── src/
│   │   ├── components/     # Reusable UI
│   │   ├── context/        # Auth Context
│   │   ├── navigation/     # App Navigator
│   │   ├── screens/        # App Screens
│   │   └── services/       # API Services
│   ├── App.js              # Entry Point
│   └── package.json
│
├── server/                 # Node.js Backend
│   ├── config/             # DB Connection
│   ├── controllers/        # Logic
│   ├── middleware/         # Auth & Uploads
│   ├── models/             # Mongoose Schemas
│   ├── routes/             # API Routes
│   ├── uploads/            # Initial Image Storage
│   ├── index.js            # Key Entry Point
│   └── .env                # Secrets
│
└── README.md               # Documentation
```

---

## 📸 Screenshots
*(Add screenshots of Login, Dashboard, Create Issue, and Admin View here)*

---

**Submitted by:** [Your Name]
**Date:** [Date]
