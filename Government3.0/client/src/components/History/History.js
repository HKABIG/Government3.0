import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import './History.css';

const History = ({ account, provider, contract }) => {
  const [memos, setMemos] = useState([]);
  
  useEffect(() => {
    const fetchMemos = async () => {
      const memos = await contract.getMemos();
      setMemos(memos);
    };
    fetchMemos();
  }, [account, contract]);

  return (
    <div className='main'>
      <Navbar/>
      <h2>History</h2>
      <div className="memo-container">
        {memos.map((memo, index) => (
          <div className="memo-card" key={index}>
            <p>From: <strong>{memo.from}</strong></p>
            <p>User: <strong>{memo.user}</strong></p>
            <p>Message: <strong>{memo.message}</strong></p>
            <p>Timestamp: <strong>{new Date(memo.timestamp * 1000).toLocaleString()}</strong></p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default History;
