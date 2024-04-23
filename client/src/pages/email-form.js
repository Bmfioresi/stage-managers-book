// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs

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