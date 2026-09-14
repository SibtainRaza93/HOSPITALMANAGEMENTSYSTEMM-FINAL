🏥 Hospital Management System

A full-stack Hospital Management System built using the MERN stack. The application provides separate experiences for patients/users and administrators, with features for doctor management, appointment booking, appointment approval, messaging, authentication, and administrative monitoring.

The project is organized into three main applications:

Frontend — Patient/User-facing React application

Dashboard — Admin-facing React application

Backend — Node.js + Express REST API with MongoDB

🔗 GitHub Repository:
https://github.com/SibtainRaza93/HOSPITALMANAGEMENTSYSTEMM-FINAL

✨ Features

👤 User / Patient Features

User registration and login

User authentication and protected pages

Browse hospital information

Home page

About page

Appointment page

Select a doctor while booking an appointment

Submit/book appointments

View appointment-related information

Send messages to the hospital/admin

Responsive and interactive user interface

Toast notifications and UI feedback

🛡️ Admin Features

The project includes a dedicated admin dashboard for managing hospital operations.

Admin login

Protected admin dashboard

Dashboard overview

View all appointments

View pending appointments

Accept appointments

Reject appointments

Add new doctors

View doctor details

Add new administrators

Manage hospital users/doctors

Review messages submitted by users

Administrative notifications and feedback

📅 Appointment Management

The appointment workflow is designed around an approval-based process:

User
  │
  ▼
Select Doctor
  │
  ▼
Book Appointment
  │
  ▼
Pending
  │
  ├───────────────┐
  ▼               ▼
Accept          Reject
  │               │
  ▼               ▼
Approved        Rejected

This allows administrators to review and control appointment requests from the dashboard.

💬 Messaging

Users can submit messages through the application, while administrators can manage/read submitted messages from the dashboard.

Note: The messaging feature is implemented through the application's REST API. It does not use Socket.IO or WebSocket-based real-time communication.

🔐 Authentication & Authorization

The backend implements role-based authentication for different users.

Patient authentication

Admin authentication

JWT-based authentication

Authentication using HTTP cookies

Role-based authorization

Protected admin routes

Protected patient routes

Password hashing using bcrypt

🛠️ Tech Stack

Frontend

React.js

Vite

React Router

Axios

React Icons

React Toastify

React Multi Carousel

CSS

Admin Dashboard

React.js

Vite

React Router

Axios

React Icons

React Toastify

CSS

Backend

Node.js

Express.js

MongoDB

Mongoose

JWT

bcrypt / bcryptjs

Cookie Parser

CORS

Express File Upload

Cloudinary

dotenv

Validator



📁 Project Structure

HOSPITALMANAGEMENTSYSTEMM-FINAL/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── database/
│   ├── middlewares/
│   ├── models/
│   ├── router/
│   ├── app.js
│   ├── server.js
│   ├── package.json
│   └── ...
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── ...
│
├── dashboard/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── ...
│
├── start.bat
│
└── README.md

Folder Responsibilities

Folder

Purpose

backend

REST API, authentication, database, doctors, appointments, messages and admin logic

frontend

Patient/User-facing web application

dashboard

Admin-facing dashboard

start.bat

Windows startup script for running project components

🚀 Getting Started

Follow the steps below to run the project locally.

📌 Prerequisites

Make sure you have installed:

Node.js

MongoDB / MongoDB Atlas

Git

A code editor such as VS Code

Check Node.js installation:

node --version
npm --version

1️⃣ Clone the Repository

git clone https://github.com/SibtainRaza93/HOSPITALMANAGEMENTSYSTEMM-FINAL.git

Move into the project:

cd HOSPITALMANAGEMENTSYSTEMM-FINAL

⚙️ Backend Setup

Open a terminal:

cd backend

Install dependencies:

npm install

The backend uses environment variables for configuration.

Create the backend configuration file used by the application:

backend/config/config.env

Example:

PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET_KEY=your_jwt_secret_key

FRONTEND_URL=http://localhost:5173
DASHBOARD_URL=http://localhost:5174

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

Start Backend

For development:

npm run dev

For normal execution:

npm start

The backend server will run on the port specified in PORT.

🖥️ Frontend Setup

Open another terminal:

cd frontend

Install dependencies:

npm install

Start the development server:

npm run dev

Vite will display the local frontend URL in the terminal.

📊 Admin Dashboard Setup

Open another terminal:

cd dashboard

Install dependencies:

npm install

Start the dashboard:

npm run dev

Vite will display the dashboard URL in the terminal.

🪟 Running with start.bat

For Windows users, the repository also contains:

start.bat

You can use the batch file if it is configured for your local environment.

If you prefer manual control, run the backend, frontend, and dashboard separately using the commands described above.

🔑 Environment Variables

The backend uses the following configuration values:

Variable

Purpose

PORT

Backend server port

MONGO_URI

MongoDB connection string

JWT_SECRET_KEY

Secret key used for JWT authentication

FRONTEND_URL

Frontend URL allowed by CORS

DASHBOARD_URL

Admin dashboard URL allowed by CORS

CLOUDINARY_CLOUD_NAME

Cloudinary cloud name

CLOUDINARY_API_KEY

Cloudinary API key

CLOUDINARY_API_SECRET

Cloudinary API secret

Never commit your real .env / config.env credentials, database passwords, JWT secrets, or Cloudinary secrets to GitHub.

🔌 API Structure

The backend exposes REST API routes for the main application modules.

/api/v1/user
/api/v1/appointment
/api/v1/message

User Routes

Handles functionality related to:

Registration

Login

Admin authentication

Patient authentication

Doctor management

User information

Role-based authorization

Appointment Routes

Handles:

Creating appointments

Retrieving appointments

Updating appointment status

Appointment management

Message Routes

Handles:

Sending user messages

Retrieving/managing messages

🔐 Security

The project includes several backend security mechanisms:

JWT authentication

HTTP cookie-based authentication

Role-based authorization

Password hashing with bcrypt

Protected routes

CORS configuration

Environment-based secret management

Input validation

The backend distinguishes between authenticated patients and administrators before allowing access to protected resources.

🎨 UI & User Experience

The application focuses on a clean hospital-oriented interface with:

Responsive layouts

Navigation between application sections

Interactive components

Toast notifications

Icons

Carousel-based UI sections

CSS-based visual styling and transitions

The project does not use Tailwind CSS, Bootstrap, Material UI, Socket.IO, or WebSocket for its core implementation.

🧪 Testing the Application

After starting all three parts of the project, verify the following flow:

User Flow

Register
   ↓
Login
   ↓
Browse Doctors
   ↓
Select Doctor
   ↓
Book Appointment
   ↓
Appointment Created

Admin Flow

Admin Login
   ↓
Dashboard
   ↓
View Appointments
   ↓
Review Pending Appointment
   ↓
Accept / Reject

Management Flow

Admin
 ├── Add Doctor
 ├── View Doctors
 ├── Add Admin
 ├── View Appointments
 ├── Manage Appointment Status
 └── View Messages

🌐 Deployment

The application contains three independently runnable parts:

Frontend       → React/Vite application
Dashboard      → React/Vite admin application
Backend        → Node.js/Express API
Database       → MongoDB

For production deployment, configure:

FRONTEND_URL=https://your-frontend-domain
DASHBOARD_URL=https://your-dashboard-domain
MONGO_URI=your_production_mongodb_uri
JWT_SECRET_KEY=your_production_secret

Also make sure the frontend and dashboard use the deployed backend API URL rather than a localhost URL.



💡 What This Project Demonstrates

This project demonstrates practical experience with:

Full-stack MERN development

REST API development

React frontend development

MongoDB database integration

Authentication and authorization

JWT and cookies

Role-based access control

CRUD operations

Appointment workflow management

Admin dashboard development

File/image handling

Cloudinary integration

API communication using Axios

Environment configuration

Error handling

Responsive UI development

👨‍💻 Author

Sibtain Raza

B.Tech Computer Science & Engineering

GitHub

https://github.com/SibtainRaza93

Project Repository

https://github.com/SibtainRaza93/HOSPITALMANAGEMENTSYSTEMM-FINAL
