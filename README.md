# OpenStudy Backend

The backend service for the **OpenStudy Platform** - a comprehensive personalized learning companion designed specifically for OUSL (Open University of Sri Lanka) first-year students.

This Node.js & Express API provides all necessary endpoints for user authentication, course management, quizzes, leaderboards, and a student help forum.

## Tech Stack

- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web framework for building the REST API.
- **MongoDB & Mongoose**: NoSQL database and Object Data Modeling (ODM) library.
- **JWT (JSON Web Tokens)**: Used for secure user authentication and authorization.
- **Bcrypt**: Used for hashing user passwords securely.
- **Nodemailer**: Used for handling 'Contact Us' email services.
- **dotenv**: For loading environment variables.
- **cors**: Middleware for enabling Cross-Origin Resource Sharing.

## Setup Instructions

### 1. Prerequisites

Ensure you have the following installed on your local machine:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB](https://www.mongodb.com/) (Local server or MongoDB Atlas cluster)

### 2. Installation

Navigate into the backend directory and install all required dependencies:

```bash
cd OpenStudy-Backend
npm install
```

### 3. Environment Variables

Create a `.env` file in the root of the `OpenStudy-Backend` directory and define the following environment variables:

```env
MONGO_DB_URI=your_mongodb_connection_string
SECRET_KEY=your_jwt_secret_key
SMTP_HOST=your_smtp_host
SMTP_PORT=your_smtp_port
SMTP_USER=your_email_address
SMTP_PASS=your_email_app_password
TO_EMAIL=destination_email_address
```

### 4. Running the Development Server

To start the backend server, run:

```bash
npm start
```

The server will start running on `http://localhost:3000`.

## API Endpoints Summary

### Authentication & Users (`/api/users`)

- `POST /login`: Authenticate a user and receive a JWT token.
- `POST /register`: Register a new student or admin.
- `GET /`: Get the currently logged-in user's details.
- `PUT /update`: Update the current user's profile information.

### Courses (`/api/courses`)

- `GET /`: Retrieve all available courses.
- `POST /`: Create a new course (Admin only).
- `PUT /:id`: Update course details (Admin only).
- `DELETE /:id`: Delete a course (Admin only).

### Quizzes (`/api/quizzes`)

- `GET /`: Retrieve all available quizzes.
- `POST /`: Create a new quiz question (Admin only).
- `DELETE /:id`: Delete a specific quiz (Admin only).

### Leaderboard (`/api/leaderboard`)

- `GET /`: Retrieve top students ranked by quiz performance.

### Help Forum (`/api/topics`)

- `GET /`: Retrieve all student discussion topics.
- `POST /`: Create a new topic.
- `DELETE /:id`: Delete an existing topic.
- `POST /:id/replies`: Add a reply to a specific topic.

### Contact (`/api/contact`)

- `POST /`: Send an email through the contact form utilizing Nodemailer.
