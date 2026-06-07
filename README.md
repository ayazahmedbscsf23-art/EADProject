# EADProject
project Online learning Management System Using React Express.js and MonogDb 


->Project Title:
OnlineLearn - Online Learning Management System

->Project Description:
OnlineLearn is a full-stack Learning Management System (LMS) that allows students and teachers to interact through courses, videos, assignments, quizzes, and progress tracking. The system provides role-based access for students, teachers, and admins, with secure authentication and database integration.

->Features:
User authentication (Student / Teacher / Admin)
Course creation and enrollment
Video lectures management
Assignment submission and grading
Quiz system
Student progress tracking
Course reviews and ratings
Secure password encryption (bcrypt)
RESTful API integration with frontend
CRUD operations for all major modules

->Technologies Used:

->Frontend:
React JS
React Router
Context API / Redux (if used)
Axios
HTML, CSS, JavaScript

cd frontend
npm install
npm start

->Backend:
Node.js
Express.js
MongoDB
Mongoose
bcryptjs
dotenv
cors

cd backend
npm install
npm run dev
http://localhost:5000


->Database Setup Instructions:

Install MongoDB locally
Create a database 
Add connection string in .env file:
MONGO_URI=mongodb://localhost:27017/onlinelearn
PORT=5000
JWT_SECRET=your_secret_key

->Environment Variables:

Create a .env file in the backend folder:
MONGO_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_secret_key

->Step-by-step instructions to run the project:

git clone https://github.com/your-username/onlinelearn-lms.git

->Backend
cd onlinelearn
cd backend
npm install
npm run dev

->Frontend
cd frontend
npm install
npm start

How to Use the System

After running the project, you can use the LMS with different user roles: Admin/Teacher and Student.

Student Flow:
Create a new student account (Sign Up page)
Login with your credentials
Browse available courses
Enroll in any course
Watch course videos and complete assignments
Attempt quizzes (if available)
Track your learning progress in the dashboard

Teacher Flow:
Create a teacher account (Sign Up page)
Login with teacher credentials
Create new courses
Upload course videos and learning materials
Create assignments and quizzes for students
View enrolled students
Review student progress and submissions

Authentication Note:
If you are not registered, first create an account by clicking on the Sign Up option.
After registration, log in using your email and password to access the system.
Without login, you will not be able to enroll in courses or access dashboard features.


