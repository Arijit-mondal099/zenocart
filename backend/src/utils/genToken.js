import jwt from "jsonwebtoken";

const generateToken = (payload, res) => {
  try {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
    });

    return token;
  } catch (error) {
    console.error("Generate token:", error.message);
    return null;
  }
};

export default generateToken;
