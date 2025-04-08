const jwt = require("jsonwebtoken");


function auth
(req, res, next) {
  let token = req.headers["authorization"];
  console.log(token);
  if (!token) return res.status(403).send("A token is required for authentication");
  
  try {
    // Remove "Bearer " prefix if present
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length);
    }
    console.log(process.env.JWT_SECRET);

    const decoded = jwt.verify(token?.trim(), process.env.JWT_SECRET);
    console.log(decoded, "decoded");
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
}
module.exports = auth;