const nodemailer = require('nodemailer');
const transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: '*',
        pass: '*',
    },
});

module.exports = function sendEmail() {
    const mailOptions = {
        from: '*',
        to: '111111@txt.att.net',
        subject: 'KITTEN!',
        html: 'The NINJA has been feed',
    };

    transport.sendMail(mailOptions, (error) => {
        if (error) {
            console.log(error);
        }
    });
};
