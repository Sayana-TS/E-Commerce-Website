import jwt from "jsonwebtoken";
import Users from "../models/userModel.js";

const protect = async (req, res, next) => {
  try {
    let token;
    token = req.cookies.jwt;

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await Users.findById(decoded.userId).select("-password");
        next();
      } catch (error) {
        res.status(401);
        throw new Error("Not Authorized, Invalid Token");
      }
    } else {
      res.status(401);
      throw new Error("Not Authorized, Invalid Token");
    }
  } catch (error) {
    next(error);
  }
};

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not Authorised As Admin");
  }
};

export { protect, admin };
