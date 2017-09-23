const nodemailer = require('nodemailer');
const transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'adventuresofaria10216@gmail.com',
        pass: 'Sephora!7!',
    },
});

module.exports = function sendEmail() {
    const mailOptions = {
        from: 'petersholten@gmail.com',
        to: '2316315819@txt.att.net',
        subject: 'KITTEN!',
        html: 'The NINJA has been feed',
    };

    transport.sendMail(mailOptions, (error) => {
        if (error) {
            console.log(error);
        }
    });
};
