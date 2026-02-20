# Doctor Appointment Dashboard

A comprehensive web application for booking doctor appointments, featuring separate dashboards for patients and doctors.

## Features

- **User Authentication**: Register and login as a Patient or Doctor.
- **Patient Dashboard**: Book appointments, view available doctors.
- **Doctor Dashboard**: Manage appointments, view patient details.
- **Tech Stack**: MongoDB, Express.js, React, Node.js (MERN).

## Prerequisites

Before running the project, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (running locally or a cloud URI)

## Installation & Setup

### 1. Backend Setup

Navigate to the backend directory and install dependencies:

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder with the following content:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/book-appointment
# Add JWT_SECRET if your auth system uses it, e.g.:
# JWT_SECRET=your_super_secret_key
```

### 2. Frontend Setup

Navigate to the frontend directory and install dependencies:

```bash
cd ../frontend
npm install
```

## Running the Application

### Start the Backend

Open a terminal in the `backend` directory:

```bash
npm start
```
*You should see "Server running on port 5000" and "MongoDB connected".*

### Start the Frontend

Open a new terminal in the `frontend` directory:

```bash
npm run dev
```
*Click the link provided (usually http://localhost:5173) to open the app in your browser.*

> [!TIP]
> If you need to change the backend URL, edit `frontend/src/config.js`.

## Usage

1.  **Register**: Create a new account.
    *   To be a **Doctor**, use the email: `rohit240803@gmail.com` (as per system logic).
    *   Any other email will register as a **Patient**.
2.  **Login**: Use your credentials to access your dashboard.
3.  **Book Appointment**: Patients can select a doctor and time to book.

## Submitting for Review

Ensure `node_modules` are NOT included in your submission zip file.
