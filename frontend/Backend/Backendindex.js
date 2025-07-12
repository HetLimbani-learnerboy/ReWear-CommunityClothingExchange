const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/ReWare_Database")
  .then(() => console.log("✅ Database connected"))
  .catch(err => console.error("❌ DB connection error:", err));

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const User = mongoose.model('Users', userSchema);

// SIGNUP Route
app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  const existing = await User.findOne({ email });

  if (existing) {
    return res.status(400).send({ message: "Email already registered" });
  }

  const user = new User({ username, email, password });
  await user.save();
  res.send({ message: "User created successfully" });
});

// SIGNIN Route
app.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, password });
  if (!user) {
    return res.status(401).send({ message: 'Invalid email or password' });
  }

  res.send({
    message: "Login successful",
    username: user.username,
    email: user.email
  });
});

app.listen(5021, () => {
  console.log("🚀 Server started on http://localhost:5021");
});
