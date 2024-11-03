from flask import Flask, request, jsonify
import requests
import os

app = Flask(__name__)

@app.route('/send-email', methods=['POST'])
def send_email():
    # Ensure data from the form is present
    data = request.get_json()
    if not all(k in data for k in ("fullname", "email", "message")):
        return jsonify(success=False, error="Missing form data"), 400

    # Prepare email details
    sender_name = data.get('fullname')
    sender_email = data.get('email')
    message_content = data.get('message')

    # Mailgun configuration
    MAILGUN_API_KEY = os.getenv("MAILGUN_API_KEY")
    MAILGUN_DOMAIN = os.getenv("MAILGUN_DOMAIN")
    recipient_email = "yourprotonmail@example.com"  # Replace with your ProtonMail address

    # Mailgun API URL
    url = f"https://api.mailgun.net/v3/{MAILGUN_DOMAIN}/messages"
    email_data = {
        "from": f"{sender_name} <contact@{MAILGUN_DOMAIN}>",  # The sender address set up in Mailgun
        "to": recipient_email,
        "subject": f"Contact Form Submission from {sender_name}",
        "text": f"Message from {sender_name} ({sender_email}):\n\n{message_content}"
    }

    # Send request to Mailgun
    response = requests.post(
        url,
        auth=("api", MAILGUN_API_KEY),
        data=email_data
    )

    # Handle Mailgun response
    if response.status_code == 200:
        return jsonify(success=True, message="Email sent successfully!")
    else:
        return jsonify(success=False, error="Failed to send email"), 500

if __name__ == '__main__':
    app.run(debug=True)
