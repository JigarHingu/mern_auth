import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  const token = req.cookies.token;

  // if (!token) {
  //   return res
  //     .status(401)
  //     .json({ success: false, message: "Unauthorized, Login Again" });
  // }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    
    req.user = { id: tokenDecode.id };

    if (!tokenDecode.id) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized, Login Again" });
    }

    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

export default userAuth;
