const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "yomanet.office@gmail.com",
        pass: "yomanet-2020",
    },
    from: '"מערכת יומנט" <yomanet.office@gmail.com>',
});

async function sendEmail(mailAddress, subject, body, attachments) {
    let info = await transporter.sendMail({
        to: mailAddress,
        subject: subject,
        html: body,
        attachments: attachments,
    });
    return info;
}

async function sendReportByEmail(mailAddress, reportTitle, reportBuffer, reportFileName) {
    const subject = `נשלח לך קובץ בשם ${reportTitle} מאת יומן Net`;
    const body = "";
    const attachments = [
        {
            filename: reportFileName,
            content: reportBuffer,
        },
    ];
    return sendEmail(mailAddress, subject, body, attachments);
}

module.exports = {
    sendReportByEmail,
};
