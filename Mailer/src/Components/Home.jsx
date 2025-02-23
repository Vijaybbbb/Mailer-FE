import React, { useState } from 'react';
import axios from 'axios';

const Home = () => {
    const [strToEmail, setStrToEmail] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    //let [intMailSent,setIntMailSent] = useState(0);

    const emailOptions = [
        'qanucem@gmail.com',
        'vijay@nucore.in',
        'example3@outlook.com'
    ];

    async function generateEmail() { 
       // setIntMailSent(intMailSent++)
       setShowPopup(true);
       setTimeout(() => setShowPopup(false), 3000);    
        const response = await axios.post('http://localhost:3000/', {
            strToEmail
        });

    }

    return (
        <div>
            <label>Select Recipient</label><br /><br />
            <select onChange={(e) => setStrToEmail(e.target.value)}>
                <option value="">Select Email</option>
                {emailOptions.map((email, index) => (
                    <option key={index} value={email}>{email}</option>
                ))}
            </select>
            <br /><br /><br />
            <button onClick={() => generateEmail(strToEmail)}>Send</button>

            {showPopup && (
                <div style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    background: 'green',
                    color: 'white',
                    padding: '10px',
                    borderRadius: '5px'
                }}>
                    Message Sent Successfully!
                </div>
            )}
        </div>
    );
};

export default Home;
