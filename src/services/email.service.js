const { verifyEmailSecret } = require("../config/jwt");
const transporter = require("../config/nodemailer");
const jwtUtils = require("../utils/jwt");

class EmailService {
  async sendVerifyEmail(user) {
    const token = jwtUtils.sign(
      { sub: user.id, exp: Date.now() + 60 * 60 * 24 * 1000 },
      verifyEmailSecret,
    );
    const info = await transporter.sendMail({
      from: '"Trung" <hohuynhtrung2003gmail.com>',
      to: user.email,
      subject: "Xac thuc tai khoan",
      html: `<p><a href="http://localhost:5173?token=${token}">Click here</a>!</p>`,
    });
    return info;
  }

  async sendReportEmail(email, subject, usersCount) {
    const info = await transporter.sendMail({
      from: '"Trung" <hohuynhtrung2003gmail.com>',
      to: email,
      subject,
      html: `
        <h1>Bao cao hang ngay</h1>
        <p>Nguoi dung dang ky moi: ${usersCount}</p>
        `,
    });
    return info;
  }

  async sendBackupReport(email, subject, backupFile) {
    const info = await transporter.sendMail({
      from: '"Trung" <hohuynhtrung2003gmail.com>',
      to: email,
      subject,
      html: `
        <h1>Backup thanh cong</h1>
        <p>Backup mới: ${backupFile}</p>
        `,
    });
    return info;
  }
}

module.exports = new EmailService();
