require("dotenv").config();
const { spawn, execSync } = require("node:child_process");
const fs = require("fs");
const emailService = require("../services/email.service");

// mysqldump -uroot -p17112003 blog_dev > blog_dev_2026-09-20.sql
function backupDB() {
  const outputFile = `./backup/${process.env.DB_NAME}-${new Date().toISOString().split("T")[0]}.sql`;

  const outputStream = fs.createWriteStream(outputFile);

  const mysqldump = spawn(
    "mysqldump",
    [
      `-u${process.env.DB_USER}`,
      `-p${process.env.DB_PASS}`,
      `-P${process.env.DB_PORT}`,
      process.env.DB_NAME,
    ],
    {
      shell: true,
    },
  );

  mysqldump.stdout.pipe(outputStream);

  mysqldump.on("error", (error) => {
    outputStream.end();
    console.error(`mysqldump error: ${error.message}`);
  });

  mysqldump.stderr.on("data", (data) => {
    console.error(`MySQL Error: ${data.toString()}`);
  });

  mysqldump.on("close", async (code) => {
    outputStream.end();

    console.log(`child process exited with code ${code}`);

    if (code === 0) {
      console.log(`Backup successfully File: ${outputFile}`);
      execSync(`rclone sync ./backup Tblog:backupDB`);
      console.log(`Upload GDrive successfully!`);

      await emailService.sendBackupReport(
        "huynhtrung171103@gmail.com",
        "Backup thành công!",
        outputFile,
      );
      console.log("Send email report successfully!");
    } else {
      fs.unlinkSync(outputFile);
    }
  });
}

module.exports = backupDB;
