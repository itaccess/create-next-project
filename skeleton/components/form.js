import React, { useState } from 'react';
import fetch from 'isomorphic-unfetch';

export default () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();

    fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name, email, message,
      }),
    }).then((res) => {
      if (res.status === 200) {
        setIsSent(true);
      }
    });
  };

  return (
    <div>
      {isSent ? <h1>Your message has been sent!</h1>
        : (
          <form onSubmit={e => submit(e)}>
            <input
              type="text"
              name="name"
              placeholder="Enter your name..."
              onChange={e => setName(e.target.value)}
            />
            <input
              type="text"
              name="email"
              placeholder="Enter your email..."
              onChange={e => setEmail(e.target.value)}
            />
            <input
              type="textarea"
              name="message"
              placeholder="Enter your name..."
              onChange={e => setMessage(e.target.value)}
            />
            <input type="submit" />
          </form>
        )
      }
    </div>
  );
};