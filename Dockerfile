# ----------------------------------------
# Base Image
# ----------------------------------------
FROM python:3.13-slim

# ----------------------------------------
# Environment Variables
# ----------------------------------------
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# ----------------------------------------
# Working Directory
# ----------------------------------------
WORKDIR /app

# ----------------------------------------
# Install Dependencies
# ----------------------------------------
COPY requirements.txt .

RUN pip install --upgrade pip

RUN pip install --no-cache-dir -r requirements.txt

# ----------------------------------------
# Copy Project
# ----------------------------------------
COPY . .

# ----------------------------------------
# Expose Port
# ----------------------------------------
EXPOSE 8000

# ----------------------------------------
# Start FastAPI
# ----------------------------------------
CMD [
    "uvicorn",
    "app.main:app",
    "--host",
    "0.0.0.0",
    "--port",
    "8000"
]
