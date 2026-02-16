Profile Project – Full Stack Application
🔗 Live Demo

Frontend:
https://profile-frontend-dusky.vercel.app

Backend API:
https://profile-backend-zwd2.onrender.com

📌 Overview

This is a full-stack profile management application where users can:

Sign up and log in securely

Create and update personal profiles

Add, delete, and endorse skills

Add professional experience

View public profiles via shareable links

The application demonstrates authentication, protected routes, CRUD operations, and deployment to cloud platforms.

🛠 Tech Stack
Frontend

React (Vite)

Tailwind CSS

Axios

JWT Authentication

Backend

Node.js

Express.js

MongoDB Atlas

Mongoose

JWT

bcryptjs

Deployment

Frontend: Vercel

Backend: Render

Database: MongoDB Atlas

⚙️ Setup Instructions (Local Development)
1️⃣ Clone Repository
git clone https://github.com/Haribaskar21/Profile-project.git
cd Profile-project

2️⃣ Backend Setup
cd server
npm install


Create a .env file inside /server:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
FRONTEND_URL=http://localhost:5173


Run backend:

npm run dev

3️⃣ Frontend Setup

Open a new terminal:

cd client
npm install


Create .env inside /client:

VITE_API_URL=http://localhost:5000


Run frontend:

npm run dev

🚀 Innovation Feature

The innovative aspect of this project is the public profile sharing and skill endorsement system.

Key Innovations:

Public Profile Endpoint
Users can share a public URL to display their profile, skills, and experience.

Skill Endorsement System
Users can endorse skills dynamically, simulating real-world professional networking platforms.

Full JWT-Based Authentication
Secure authentication with protected API routes ensures data isolation per user.

Cloud Deployment Architecture
The app is deployed using separate services:

Frontend (Vercel)

Backend (Render)

Cloud database (MongoDB Atlas)

This demonstrates real-world production deployment practices rather than a purely local setup.
