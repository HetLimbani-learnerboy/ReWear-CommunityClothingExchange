const mongoose = require('mongoose');
const cors = require('cors');
const express = require('express');
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/ReWare_Database")
  .then(() => console.log("✅ Database connected"))
  .catch(err => console.error("❌ DB connection error:", err));

// Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const User = mongoose.model('Users', userSchema);

// Signup route
app.post('/signup', async (req, res) => {
  try {
    const user = new User(req.body);
    const result = await user.save();
    
    const { password, ...userData } = result.toObject(); // exclude password in response
    res.status(201).send({ success: true, user: userData });
  } catch (error) {
    console.error("❌ Error during registration:", error);
    if (error.code === 11000) {
      res.status(400).send({ success: false, message: "Username or email already exists" });
    } else {
      res.status(500).send({ success: false, message: "Failed to register user" });
    }
  }
});

app.listen(5021, () => {
  console.log("🚀 Server running on http://localhost:5021");
});
