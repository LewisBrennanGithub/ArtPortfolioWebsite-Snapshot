import React, { useState } from 'react';
import { sendEmail } from '../../services/EmailServices';
import { EmailData } from '../../../types/emailTypes';

const EmailElement = () => {
    const [userEmail, setUserEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [statusMessage, setStatusMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const emailData: EmailData = { userEmail, subject, message };

        try {
            await sendEmail(emailData);
            setStatusMessage('Email sent successfully!');
            setUserEmail('');
            setSubject('');
            setMessage('');
        } catch (error) {
            setStatusMessage('Failed to send email.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="emailElement">
            <div className="emailElementBorder">
                <div className="emailSubjectRow">
                    <input
                        type="email"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        placeholder="Your Email"
                        required
                        className="userEmailBox"
                    />
                    <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="Subject"
                        required
                        className="emailSubjectBox"
                    />
                </div>
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Your Message"
                    required
                    className="emailBodyBox"
                ></textarea>
            </div>
            <button type="submit" className="emailButton">SEND EMAIL</button>
            <br />
            <div>{statusMessage}</div>
        </form>
    );
}

export default EmailElement;
