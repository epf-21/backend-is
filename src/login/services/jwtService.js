const jwt = require('jsonwebtoken');

exports.generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      correo: user.correo,
      roles: user.roles
    },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
};

exports.verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};