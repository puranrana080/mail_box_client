import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    let emailExist = await User.findOne({ email });
    if (emailExist) {
      return res.status(401).json({ message: "Email already exist" });
    }
    const hashedPssword = await bcrypt.hash(password, 10);
    await User.create({ email, password: hashedPssword });
    return res
      .status(200)
      .json({ message: "User registered Successfully", success: true });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server error", error });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ messge: "Invalid Email", success: false });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res
        .status(401)
        .json({ message: "Password Wrong", success: false });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET
    );

    return res.status(200).json({ message: "User Logged In ", success:true,token });
  } catch (error) {
    return res.status(500).json({ message: "Internl Server error", error });
  }
};
