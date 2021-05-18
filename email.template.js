const nodemailer = require('nodemailer');
const transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'yourEmail@gmail.com',
        pass: 'yourPassword',
    },
});

module.exports = function sendEmail() {
    const mailOptions = {
        from: 'yourEmail@gmail.com',
        to: 'phonenumber@txt.att.net', //http://www.emailtextmessages.com/
        subject: 'KITTEN!',
        html: 'The NINJA has been feed',
    };

    transport.sendMail(mailOptions, (error) => {
        if (error) {
            console.log(error);
        }
    });
};
