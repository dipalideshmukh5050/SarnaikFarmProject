const nodemailer = require('nodemailer');
require('dotenv').config(); // Ensure this is at the top of the file to load environment variables

const testEmail = async () => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: 'Test Email',
        text: 'This is a test email to verify that Nodemailer is working.'
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Test email sent:', info.response);
    } catch (error) {
        console.error('Error sending test email:', error);
    }
};

testEmail();
