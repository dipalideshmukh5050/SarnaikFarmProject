const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const stripe = require("stripe")("sk_test_51PiDYURvvBvD9AXGVZVkWSX5upvssos81gJb85uMUs1ksLxDrtUX4r1yDyW2e0TBcdzqXpqzrNewVoIqpXTDY63d00mbuNuGOr"); // Replace with your actual Stripe secret key

const mysql = require("mysql");
const session = require("express-session");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
require("dotenv").config();
const helmet = require("helmet");
const handleFormSubmission = require('./form-handler');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to serve static files from the root directory
app.use(express.static(path.join(__dirname)));

// Middleware to parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "testuser",
  password: process.env.DB_PASSWORD || "test",
  database: process.env.DB_NAME || "sarnaik",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.stack);
    return;
  }
  console.log("Database connected!");
});

// Configure nodemailer
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail address
    pass: process.env.EMAIL_PASS, // Your Gmail password or App Password
  },
});

// Serve static HTML files
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/login.html", (req, res) => {
  res.sendFile(path.join(__dirname, "login.html"));
});

app.get("/signup.html", (req, res) => {
  res.sendFile(path.join(__dirname, "signup.html"));
});

app.get("/forgot-password.html", (req, res) => {
  res.sendFile(path.join(__dirname, "forgot-password.html"));
});

app.get("/reset-password.html", (req, res) => {
  res.sendFile(path.join(__dirname, "reset-password.html"));
});


// Route to handle form submission
// server.js
app.post('/submit-form', (req, res) => {
  const { first_name, last_name, email, phone_number, query } = req.body;

  if (!first_name || !last_name || !email || !phone_number || !query) {
      return res.status(400).json({ success: false });
  }

  const sql = `INSERT INTO ContactFormSubmissions (first_name, last_name, email, phone_number, query)
               VALUES (?, ?, ?, ?, ?)`;

  db.query(sql, [first_name, last_name, email, phone_number, query], (err, result) => {
      if (err) {
          console.error('Error inserting data into database:', err);
          return res.status(500).json({ success: false });
      }
      console.log('Data inserted successfully:', result);
      res.json({ success: true });
  });
});
// Stripe payment routes
app.post("/create-payment-intent", async (req, res) => {
  const { amount } = req.body; // Amount in the smallest currency unit (e.g., paise for INR)

  try {
    if (!amount) {
      return res.status(400).send("Amount is required");
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // Amount in paise for INR
      currency: "inr", // Currency code for INR
    });

    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creating PaymentIntent:", error);
    res.status(500).send("Internal Server Error");
  }
});
// Handle login
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Database error", success: false });
    }
    if (results.length === 0) {
      return res
        .status(400)
        .json({ message: "User not found. Please sign up.", success: false });
    }

    const user = results[0];

    // Compare the provided password with the stored password
    if (password !== user.password) {
      return res
        .status(400)
        .json({ message: "Invalid password", success: false });
    }

    // Password matched, proceed with login
    res.json({ message: "Login successful", success: true });
  });
});

// Handle signup
app.post("/signup", (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Database error", success: false });
    }
    if (results.length > 0) {
      return res
        .status(400)
        .json({ message: "User already exists", success: false });
    }

    // Store the password directly without hashing
    db.query(
      "INSERT INTO users (email, password) VALUES (?, ?)",
      [email, password],
      (err) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Database error", success: false });
        }
        return res.json({
          message: "Signup successful, please login",
          success: true,
        });
      }
    );
  });
});

// Handle forgot password
app.post("/forgot-password", (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res
      .status(400)
      .json({ message: "Email is required", success: false });
  }

  // Generate a password reset token (this is just a placeholder)
  const resetToken = Math.random().toString(36).substr(2); // This should be more secure in a real app

  // Save the reset token in the database
  db.query(
    "UPDATE users SET resetToken = ? WHERE email = ?",
    [resetToken, email],
    (err, results) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Database error", success: false });
      }
      if (results.affectedRows === 0) {
        return res
          .status(400)
          .json({ message: "Email not found", success: false });
      }

      // Send the reset email
      const resetLink = `http://localhost:${port}/reset-password.html?token=${resetToken}`;
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Password Reset Request",
        text: `You requested a password reset. Please click the link below to reset your password:\n\n${resetLink}`,
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Error sending email", success: false });
        }
        res.json({ message: "Password reset link sent", success: true });
      });
    }
  );
});

// Handle reset password
app.post("/reset-password", (req, res) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    return res
      .status(400)
      .json({ message: "Token and new password are required", success: false });
  }

  // Update the password directly
  db.query(
    "UPDATE users SET password = ?, resetToken = NULL WHERE resetToken = ?",
    [newPassword, token],
    (err, results) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Database error", success: false });
      }
      if (results.affectedRows === 0) {
        return res
          .status(400)
          .json({ message: "Invalid or expired token", success: false });
      }
      res.json({ message: "Password has been reset", success: true });
    }
  );
});

// Routes to serve HTML pages
app.get("/payment", (req, res) => {
  res.sendFile(path.join(__dirname, "checkout.html"));
});

app.get("/products", (req, res) => {
  res.sendFile(path.join(__dirname, "products.html"));
});

app.get("/success", (req, res) => {
  res.sendFile(path.join(__dirname, "success.html"));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
