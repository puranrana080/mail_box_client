import Mail from "../models/mail.js";

export const handleSendMail = async (req, res) => {
  const { to, subject, message } = req.body;
  
  try {
    const mail = await Mail.create({
      from: req.user._id,
      to: to,
      subject: subject,
      contentHTML: message,
    });

    return res
      .status(200)
      .json({ message: "Mail sent Successfully", success: true, mail });
  } catch (error) {
    return res.status(500).json({ message: "Inernal Server Error", error });
  }
};
