async function authenticateUser(req, res, next) {
    const { authorization } = req.headers;
  
    if (!authorization) {
      return res.status(401).json({ error: "User not logged in" });
    }
  
    try {
      const token = authorization.replace("Bearer ", "");
      const payload = jwt.verify(token, JWT_SECRET);
  
      const { _id } = payload;
      const dbUser = await UserModel.findById(_id);
  
      if (!dbUser) {
        return res.status(401).json({ error: "User not found" });
      }
  
      req.user = dbUser;
      next();
    } catch (error) {
      return res.status(401).json({ error: "Authentication failed" });
    }
  }
  module.exports = authenticateUser;
