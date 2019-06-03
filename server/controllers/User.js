const User = require("../models/User");
const config = require("../config/dev");
const { normalizeErrors } = require("../helpers/mongoose");
const jwt = require("jsonwebtoken");
exports.register = (req, res) => {
  const { email, password, username, confirmPassword } = req.body;
  if (!password || !email) {
    return res.status(422).json({
      errors: [{ title: "Data missing", detail: "Provide email and password." }]
    });
  }
  if (password !== confirmPassword) {
    return res.status(422).json({
      errors: [
        {
          title: "Invalid password",
          detail: "Password is not a same as confirmation."
        }
      ]
    });
  }
  User.findOne({ email }, (err, existingUser) => {
    if (err) {
      return res.status(422).json({
        errors: normalizeErrors(err.errors)
      });
    }
    if (existingUser) {
      return res.status(422).json({
        errors: [
          {
            title: "Invalid email",
            detail: "User with this email already exist!"
          }
        ]
      });
    }
    const user = new User({ username, email, password });
    user.save(err => {
      if (err) {
        return res.status(422).json({
          errors: normalizeErrors(err.errors)
        });
      }
      return res.json({ registered: true });
    });
  });
};
exports.auth = (req, res) => {
  const { email, password } = req.body;
  if (!password || !email) {
    return res.status(422).json({
      errors: [{ title: "Data missing", detail: "Provide email and password." }]
    });
  }
  User.findOne({ email }, (err, user) => {
    if (err) {
      return res.status(422).json({
        errors: normalizeErrors(err.errors)
      });
    }
    if (!user) {
      return res.status(422).json({
        errors: [
          {
            title: "Invalid User!",
            detail: "User does not exist!"
          }
        ]
      });
    }
    if (user.isSamePassword(password)) {
      const token = jwt.sign(
        { userId: user._id, username: user.username },
        config.secret,
        { expiresIn: "1h" }
      );
      return res.json(token);
    } else {
      return res.status(422).json({
        errors: [
          {
            title: "Wrong Data!",
            detail: "Wrong email or password"
          }
        ]
      });
    }
  });
};
exports.authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return notAuthorized(res);
  } else {
    const user = parseToken(token);
    User.findById(user.userId, (err, data) => {
      if (err) {
        return res.status(422).json({
          errors: normalizeErrors(err.errors)
        });
      }
      if (data) {
        res.locals.user = data;
        next();
      } else {
        return notAuthorized(res);
      }
    });
  }
};
parseToken = token => jwt.verify(token.split(" ")[1], config.secret);
notAuthorized = res =>
  res.status(401).json({
    errors: [
      {
        title: "Not authorized!",
        detail: "You need to login to get access"
      }
    ]
  });
