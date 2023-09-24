const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const postLogin = async (req, res) => {
  try {
    const { mail, password } = req.body;
    const user = await User.findOne({ mail: mail.toLowerCase() });
    if (user && (await bcrypt.compare(password, user.password))) {

      const token = jwt.sign(
        {
          userId: user._id,
          mail
        },
        process.env.TOKEN_KEY,
        {
          expiresIn: '24h',
        }
      );
      // send new token
      return res.status(200).json({ // status 200 means success
        userDetails: {
          mail: user.mail,
          token: token,
          username: user.username,
          _id: user._id
        },
      });
    }

    return res.status(400).send("Invalid Credentials. Please try again!"); // 400 user not found
  } catch (error) {
    return res.status(500).send(`Internal Server Error ${error}`);
  }
};

module.exports = postLogin;
