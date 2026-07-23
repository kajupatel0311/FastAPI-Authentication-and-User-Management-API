# FastAPI Authentication and User Management API

A production-ready authentication and user management backend built with **FastAPI**, **MongoDB Atlas**, and **JWT Authentication**. The project follows a modular architecture and provides secure authentication, role-based authorization, profile management, file uploads, password recovery, logging, and Docker support.

---

## Features

### Authentication
- User Registration
- Secure Login
- JWT Access Token
- Refresh Token
- Logout with Token Blacklisting
- Forgot Password
- Reset Password
- Change Password

### User Management
- User Profile
- Update Profile
- Admin User Management
- Role-Based Access Control (Admin/User)
- Pagination
- Search
- Sorting
- Filtering

### File Upload
- Profile Image Upload
- Image Validation
- Static File Serving

### Security
- Password Hashing (bcrypt)
- JWT Authentication
- Role-Based Authorization
- Global Exception Handling
- Request Logging
- Custom Middleware

### Database
- MongoDB Atlas
- Motor (Async MongoDB Driver)

### Deployment
- Docker
- Docker Compose
- Environment Variable Configuration

---

## Tech Stack

| Category | Technology |
|----------|------------|
| Backend | FastAPI |
| Database | MongoDB Atlas |
| ODM | Motor |
| Authentication | JWT |
| Validation | Pydantic |
| Password Hashing | Passlib (bcrypt) |
| Server | Uvicorn |
| Containerization | Docker |
| API Testing | Swagger UI |

---

## Project Structure

```text
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
│   ├── exceptions.py
│   ├── logger.py
│   ├── middleware.py
│   └── main.py
│
├── Dockerfile
├── docker-compose.yml
├── requirements.txt
├── .env.example
├── .gitignore
└── README.md
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/kajupatel0311/FastAPI-Authentication-and-User-Management-API.git

cd FastAPI-Authentication-and-User-Management-API
```

---

### Create Virtual Environment

Windows

```bash
python -m venv venv

venv\Scripts\activate
```

Linux/macOS

```bash
python3 -m venv venv

source venv/bin/activate
```

---

### Install Dependencies

```bash
pip install -r requirements.txt
```

---

### Configure Environment Variables

Create a `.env` file.

```env
MONGO_URI=
DATABASE_NAME=

SECRET_KEY=
ALGORITHM=

ACCESS_TOKEN_EXPIRE_MINUTES=
REFRESH_TOKEN_EXPIRE_DAYS=
RESET_TOKEN_EXPIRE_MINUTES=

SMTP_EMAIL=
SMTP_PASSWORD=
SMTP_SERVER=
SMTP_PORT=
```

---

### Run the Application

```bash
uvicorn app.main:app --reload
```

Server

```
http://127.0.0.1:8000
```

Swagger UI

```
http://127.0.0.1:8000/docs
```

ReDoc

```
http://127.0.0.1:8000/redoc
```

---

## Docker

Build and Run

```bash
docker compose up --build
```

Stop Containers

```bash
docker compose down
```

---

## API Modules

- Authentication
- User Management
- Dashboard
- Profile Management
- File Upload

---

## Authentication Flow

```
Register
      │
      ▼
Login
      │
      ▼
Access Token + Refresh Token
      │
      ▼
Protected APIs
      │
      ▼
Refresh Token
      │
      ▼
Logout
```

---

## Future Enhancements

- Email Verification
- OTP Authentication
- Two-Factor Authentication
- Audit Logs Dashboard
- Rate Limiting
- Unit Testing
- CI/CD Pipeline
- Cloud Storage (AWS S3 / Cloudinary)
- Kubernetes Deployment

---

## Author

**Kaju Patel**

Email: kajupatel2003@gmail.com

GitHub:
https://github.com/kajupatel0311

---

## License

This project is licensed under the MIT License.

