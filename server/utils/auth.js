const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.JWT_SECRET;
const expiration = "2h";

module.exports = {
  authMiddleware: function ({ req }) {
    // Allows token to be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    // We split the token string into an array and return actual token
    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
    }

    if (!token) {
      return req;
    }

    // Verify token, send back to client as user context (if valid)
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });

      req.user = data;
    } catch {
      console.log("Invalid token");
    }

    return req;
  },
  signToken: function ({ email, _id, firstName, lastName }) {
    const payload = { email, _id, firstName, lastName };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
