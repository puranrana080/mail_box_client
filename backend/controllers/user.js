import User from "../models/user.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    let emailExist = await User.findOne({ email });
    if (emailExist) {
      return res.status(401).json({ message: "Email already exist" });
    }
    const hashedPssword = await bcrypt.hash(password, 10);
    await User.create({ email, password: hashedPssword });
    return res.status(200).json({ message: "User registered Successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server error", error });
  }
};
