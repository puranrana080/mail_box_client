import Mail from "../models/mail.js";

export const handleSendMail = async (req, res) => {
  const { to, subject, message } = req.body;
  const recipients = to.map((email) => ({ email, isRead: false }));
  try {
    const mail = await Mail.create({
      from: req.user._id,
      to: recipients,
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

export const getInboxMails = async (req, res) => {
  try {
    const userEmail = req.user.email;

    const inbox = await Mail.find({ "to.email": userEmail })
      .populate("from", "email")
      .sort({
        createdAt: -1,
      });

    return res
      .status(200)
      .json({ message: "My Inbox feched successfully", success: true, inbox });
  } catch (error) {
    return res.status(500).json({ message: "internal Server Error", error });
  }
};

export const markMailAsRead = async (req, res) => {
  try {
    const { mailId } = req.params;
    const userEmail = req.user.email;
    const mail = await Mail.findById(mailId);
    if (!mail) {
      return res.status(404).json({ message: "Mail not found" });
    }
    mail.to = mail.to.map((t) =>
      t.email === userEmail ? { ...t, isRead: true } : t
    );

    await mail.save();
    return res.status(200).json({ message: "Mail marked as read" });
  } catch (error) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
