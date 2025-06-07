import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './home.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Home = () => {
    const [strToEmail, setStrToEmail] = useState('');
    const [emailCount, setEmailCount] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [showError, setShowError] = useState(false);
    const [showErrorCount, setShowErrorCount] = useState(false);
    const [messages, setMessages] = useState([]);

    const emailOptions = [
        'qanucem@gmail.com',
        'vijayramkp2002@gmail.com',
        'example3@outlook.com'
    ];

    async function generateEmail(strToEmail) {
        if (strToEmail === '') {
            if(emailCount > 400) {
                setShowErrorCount(true);
            }
            setShowError(true);
            setTimeout(() => setShowError(false), 2000);
        } else {
            setShowPopup(true);
            setTimeout(() => setShowPopup(false), 3000);
            await axios.post('http://localhost:3000/', {
                strToEmail,
                intBulkEmailCount:emailCount
            });
        }
    }

      useEffect(() => {
    const socket = new WebSocket('ws://localhost:3000'); // Use your backend address

    socket.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
    //   setMessages(prev => [...prev, data]);

    if (data.status === 'sent') {
    toast.success(`✅ Sent email `,
         {
  toastClassName: 'custom-toast'
}
    );
  } else if (data.status === 'failed') {
    toast.error(`❌ Failed email : ${data.error}`,
          {
  toastClassName: 'custom-toast'
}
    );
  } else if (data.status === 'completed') {
    toast.info(`🎉 All ${data.total} emails sent`);
  }
    };

    socket.onclose = () => {
      console.log('Disconnected from WebSocket server');
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => socket.close(); // cleanup on unmount
  }, []);


    return (
        <div className="home-container">
            <h2>Send Email</h2>

            <label>Select Recipient</label>
            <select onChange={(e) => setStrToEmail(e.target.value)} className="input-field">
                <option value="">Select Email</option>
                {emailOptions.map((email, index) => (
                    <option key={index} value={email}>{email}</option>
                ))}
            </select>

            <label>Enter Email Count</label>
            <input
                type="number"
                min="1"
                className="input-field"
                value={emailCount}
                onChange={(e) => setEmailCount(e.target.value)}
                placeholder="e.g. 5"
            />

            <button className="send-button" onClick={() => generateEmail(strToEmail)}>
                Send
            </button>

            {showPopup && <div className="popup-success">Email Generation Started...</div>}
            {showError && <div className="popup-error">Please select email and count</div>}
            {showErrorCount && <div className="popup-error">Please Enter Below 400</div>}

            {/* <ul>
        {messages.map((msg, index) => (
          <li key={index}>
            {msg.status === 'sent' && `✅ Sent email #${index}`}
            {msg.status === 'failed' && `❌ Failed email #${index}: ${msg.error}`}
            {msg.status === 'completed' && `🎉 All ${msg.total} emails sent`}
          </li>
        ))}
      </ul> */}
      <ToastContainer position="top-right" autoClose={3000} />
        </div>
        
    );
};

export default Home;
