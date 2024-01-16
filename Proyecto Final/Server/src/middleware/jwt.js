const jwt = require("jsonwebtoken")

function authenticationToken(req, res, next) {
  console.log("validando")
  const authHeader = req.header('Authorization')|| ""
  const token = authHeader && authHeader.split(' ')[1]
  if (!token) {
    return res.sendStatus(401).json({mensaje:"no hay token",ok:"fail"})
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403).json({mensaje:"prohibido", ok:"fail"})
    req.user = user
    next()
  })
}

module.exports = authenticationToken