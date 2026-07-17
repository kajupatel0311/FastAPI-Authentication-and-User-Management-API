# FastAPI Authentication and User Management API

## Overview

This project is a backend application developed using FastAPI and MongoDB that implements user authentication, role-based authorization, profile management, file uploads, and common REST API features. It follows a modular architecture with separate layers for routes, services, schemas, utilities, and configuration.

## Technologies

- Python 3
- FastAPI
- MongoDB
- Motor
- JWT Authentication
- Passlib (bcrypt)
- Pydantic
- Uvicorn
- Docker
- Docker Compose

## Features

- User registration and login
- JWT-based authentication
- Access and refresh tokens
- Role-based authorization
- Password change
- Password reset
- Logout with token blacklist
- User CRUD operations
- Pagination
- Search
- Sorting
- Filtering
- Profile image upload
- File validation
- Logging
- Custom middleware
- Global exception handling
- Docker support

## Project Structure

```
backend_project/
│
├── app/
│   ├── routes/
│   ├── services/
│   ├── schemas/
│   ├── utils/
│   ├── uploads/
│   ├── auth.py
│   ├── config.py
│   ├── database.py
│   ├── logger.py
│   ├── middleware.py
│   └── main.py
│
├── Dockerfile
├── docker-compose.yml
├── requirements.txt
├── .env.example
└── README.md
```

## Installation

Clone the repository.

```bash
git clone <repository_url>
```

Move into the project directory.

```bash
cd backend_project
```

Create a virtual environment.

```bash
python -m venv venv
```

Activate the virtual environment.

Windows

```bash
venv\Scripts\activate
```

Linux/macOS

```bash
source venv/bin/activate
```

Install the required packages.

```bash
pip install -r requirements.txt
```

Create a `.env` file using `.env.example` and update the required values.

Run the application.

```bash
uvicorn app.main:app --reload
```

Open the API documentation.

```
http://127.0.0.1:8000/docs
```

## Running with Docker

Build and start the application.

```bash
docker compose up --build
```

## Environment Variables

```
MONGO_URI=
DATABASE_NAME=

SECRET_KEY=
ALGORITHM=

ACCESS_TOKEN_EXPIRE_MINUTES=
REFRESH_TOKEN_EXPIRE_DAYS=
RESET_TOKEN_EXPIRE_MINUTES=
```

## API Modules

- Authentication
- User Management
- File Upload

## Future Improvements

- Email verification
- OTP-based password reset
- Unit testing
- Cloud storage for uploaded files
- CI/CD pipeline
- Deployment on cloud platform

## License

This project was developed for learning backend development concepts using FastAPI.