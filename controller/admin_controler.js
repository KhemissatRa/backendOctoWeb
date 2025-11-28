const jwt = require("jsonwebtoken");
const joi = require("joi");
const bcrypt = require("bcrypt");

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Debug: print values
    console.log("Email from body:", email);
    console.log("Password from body:", password);
    console.log("ENV ADMIN_EMAIL:", process.env.ADMIN_EMAIL);
    console.log("ENV HASH:", process.env.ADMIN_PASSWORD_HASH);

    // 1. Check admin email
    if (email !== process.env.ADMIN_EMAIL) {
      return res.status(403).json({ message: "You are NOT an admin" });
    }

    // 2. Validate password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      process.env.ADMIN_PASSWORD_HASH
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // 3. Generate token
    const token = jwt.sign(
      { role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.header("x-auth-token",token).send({
      message: "Admin login successful",
      token,
    });

  } catch (error) {
    console.error("❌ Server error:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { Login };
