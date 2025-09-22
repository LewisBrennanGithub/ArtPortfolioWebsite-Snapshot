import { EmailData } from '../../types/emailTypes';

export const sendEmail = (emailData: EmailData): Promise<Response> => {
    return fetch(`${import.meta.env.VITE_BACKEND_URL}/api/sendEmail`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
    })
        .then((res) => {
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
        .catch(error => {
            console.error("Fetch error: ", error);
            throw error;
        });
};

export default sendEmail;