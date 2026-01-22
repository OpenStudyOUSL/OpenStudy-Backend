import nodemailer from "nodemailer";

export const sendContactEmail = async (req, res) => {
  try {
    const { fromEmail, subject, message } = req.body;

    if (!fromEmail || !subject || !message) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
       user: process.env.SMTP_USER,
       pass: process.env.SMTP_PASS,
     },
   });


    await transporter.sendMail({
      from: `"OpenStudy Contact" <${process.env.SMTP_USER}>`,
      replyTo: fromEmail,          // ✅ sender email from form
      to: process.env.TO_EMAIL,    // ✅ your receiving email
      subject: subject,            // ✅ subject from form
      text: `From: ${fromEmail}\n\n${message}`, // ✅ description from form
    });

    return res.json({ success: true, message: "Email sent!" });
  } catch (err) {
  console.error("EMAIL ERROR:", err);
  return res.status(500).json({ error: err.message || "Email failed" });
}

};
