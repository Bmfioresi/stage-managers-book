// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs

// initial testing below
// require('dotenv').config();
// const sgMail = require('@sendgrid/mail')
// sgMail.setApiKey(process.env.SENDGRID_API_KEY)
// const msg = {
//     to: 'kdbryant2@crimson.ua.edu', // Change to your recipient
//     from: 'cs495stagemanagersbook@gmail.com', // Change to your verified sender
//     subject: 'Sending with SendGrid is Fun',
//     text: 'and easy to do anywhere, even with Node.js',
//     html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// }
// sgMail
//     .send(msg)
//     .then(() => {
//         console.log('Email sent')
//     })
//     .catch((error) => {
//         console.error(error)
//     })

import React from 'react';

const EmailForm = () => {
    return (
        <div>
            <h2>Email Signup Form</h2>
            <iframe
                src="https://cdn.forms-content-1.sg-form.com/71943b5d-fdac-11ee-bede-e6162d82788e"
                title="Signup Form"
                width="600"
                height="650"
                style={{ border: '1px solid #ccc' }}
            ></iframe>
        </div>
    );
};

export default EmailForm;