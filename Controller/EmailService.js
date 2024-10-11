const nodemailer = require('nodemailer');
require('dotenv').config();


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    // user: 'iliyajhushen84@gmail.com',
    // pass: 'jlrp mbra wuzg fplp'
    user:process.env.EMAIL_USER,
    pass:process.env.EMAIL_PASS
  }
});


const sendEmail = async (to, subject, htmlContent) => {
  try {
    await transporter.sendMail({
      from: 'iliyajhushen84@gmail.com',
      to: to,
      subject: subject,
      html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Template</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            background: #4CAF50;
            color: #ffffff;
            padding: 10px 0;
            text-align: center;
            border-radius: 8px 8px 0 0;
        }
        .content {
            padding: 20px;
        }
        .footer {
            background: #f1f1f1;
            color: #555555;
            text-align: center;
            padding: 10px;
            border-radius: 0 0 8px 8px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Email Header</h1>
        </div>
        <div class="content">
            <p>Hello [Recipient's Name],</p>
           ${htmlContent}
`
    });
    console.log('Email sent');
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

module.exports = sendEmail;
