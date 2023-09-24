const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const postRegister = async (req, res) => {
  try {
    const { username, mail, password } = req.body;

    // check if user exists
    const userExist = await User.exists({ mail: mail.toLowerCase() });
    if (userExist) {
      return res.status(409).send("E-mail already in use"); // 409 Conflict error
    }

    // we need to encrypt the password
    const encryptedPassword = await bcrypt.hash(password, 10);

    // create user document means new row
    const user = await User.create({
      username,
      password: encryptedPassword,
      mail: mail.toLowerCase(),
    });

    // crate JWT token

    const token = jwt.sign(
      { username: user.username, mail },
      "secret",
      { expiresIn: "24h" },
      process.env.JWT_TOKEN_SECRET
    );

    res.status(201).json({
      // 201 Request Success
      userDetails: {
        mail: user.mail,
        token: token,
        username: user.username,
        _id: user._id,
      },
    });
  } catch (e) {
    return res.status(500).send("Error Occurred. Please Try Again"); // 500 Internal Server Error
  }
};

module.exports = postRegister;
