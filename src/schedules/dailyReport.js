const userModel = require("../models/user.model");
const emailService = require("../services/email.service");

async function dailyReport() {
  usersCount = await userModel.countNewUSer();

  const date = new Date();
  date.setDate(date.getDate() - 1);
  const prev = date.toISOString().slice(0, 10);

  await emailService.sendReportEmail(
    "huynhtrung171103@gmail.com",
    `Daily report ${prev}`,
    usersCount,
  );

  console.log("Send success");
}

module.exports = dailyReport;
