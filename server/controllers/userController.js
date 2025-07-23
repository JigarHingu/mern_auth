import userModel from "../models/userModel.js";

export const getUserData = async (req, res) => {
  try {
    const { id } = req.user;

    const user = await userModel.findById(id).select("-password");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, userData: user });
  } catch (error) {
    console.error("getUserData Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching user data",
    });
  }
};
