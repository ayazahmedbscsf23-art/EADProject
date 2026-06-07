# EADProject
project Online learning Management System Using React Express.js and MonogDb 
Online Learning Management System (LMS)
📌 Project Title

EADProject - Online Learning Management System

📖 Project Description

This project is a Full Stack Learning Management System (LMS) built using the MERN Stack (MongoDB, Express, React, Node.js).

It allows teachers to create and manage courses, and students to enroll, learn, and track their progress in an organized digital platform.

The system simplifies online education by providing a centralized platform for course management, user roles, and learning activities.

✨ Features
👨‍🎓 Student Features
Register and login system
Browse available courses
Enroll in courses
View course content
Track learning progress
👨‍🏫 Teacher Features
Create and manage courses
Upload course content (videos, notes, etc.)
View enrolled students
Manage assignments and quizzes
🔐 Admin Features
Manage users (students & teachers)
Manage all courses
Monitor system activity
⚙️ General Features
Role-based authentication (Student / Teacher / Admin)
Secure login system with password encryption
RESTful API integration
CRUD operations (Create, Read, Update, Delete)
Responsive UI design
🛠️ Technologies Used
Frontend:
React JS
HTML5
CSS3
JavaScript
React Router
Backend:
Node.js
Express.js
MongoDB
Mongoose
JWT Authentication
Bcrypt.js
📁 Project Structure
EADProject/
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── database.js
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── App.js
│
└── README.md
⚙️ Installation & Setup Instructions
1️⃣ Clone the Repository
git clone https://github.com/ayazahmedbscsf23-art/EADProject.git
cd EADProject
2️⃣ Backend Setup
cd backend
npm install

Create .env file:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Run backend server:

npm start
3️⃣ Frontend Setup
cd frontend
npm install
npm start

Frontend will run on:

http://localhost:3000
🔄 API Features (Backend)
User Authentication (Register/Login)
Course Management APIs
Enrollment System APIs
Quiz & Assignment APIs
Progress Tracking APIs

🧪 CRUD Operations Demonstrated
➕ Create: Users, Courses, Assignments
📖 Read: Courses, User Data, Enrollments
✏️ Update: Course updates, profile updates
❌ Delete: Courses, users, assignments
