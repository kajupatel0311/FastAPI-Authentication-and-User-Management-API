import smtplib

from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

from fastapi import HTTPException

from app.config import (
    SMTP_EMAIL,
    SMTP_PASSWORD,
    SMTP_SERVER,
    SMTP_PORT
)


# ---------------------------------------
# Send Email
# ---------------------------------------
def send_email(
    recipient: str,
    subject: str,
    body: str
):

    message = MIMEMultipart()

    message["From"] = SMTP_EMAIL
    message["To"] = recipient
    message["Subject"] = subject

    message.attach(
        MIMEText(body, "plain")
    )

    try:

        server = smtplib.SMTP(
            SMTP_SERVER,
            SMTP_PORT
        )

        server.starttls()

        server.login(
            SMTP_EMAIL,
            SMTP_PASSWORD
        )

        server.sendmail(
            SMTP_EMAIL,
            recipient,
            message.as_string()
        )

        server.quit()

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=f"Failed to send email: {str(e)}"
        )