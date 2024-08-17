// middleware/roleMiddleware.js
module.exports = (roles) => {
    return (req, res, next) => {
      const userRole = req.user.role; // Assume req.user is set by the authentication middleware
  
      if (!roles.includes(userRole)) {
        return res.status(403).json({ message: 'Access denied' });
      }
  
      next();
    };
  };
  