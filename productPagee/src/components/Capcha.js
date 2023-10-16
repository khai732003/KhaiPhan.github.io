import React, { useState } from 'react';

function Capcha() {
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');

  function generateCaptcha() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    let result = '';
    for (let i = 0; i < 5; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  function handleReset() {
    // Cập nhật mã bảo mật mới
    setCaptcha(generateCaptcha()); 

    // Làm mới các trường input
    setName('');
    setEmail('');
    setPhone('');
    setAddress('');
    setMessage('');
  }

  return (
    <div>
      <label>Họ và tên:</label>
      <input type="text" value={name} onChange={e => setName(e.target.value)} />
      <br />
      <label>Email:</label>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
      <br />
      <label>Số điện thoại:</label>
      <input type="text" value={phone} onChange={e => setPhone(e.target.value)} />
      <br />
      <label>Địa chỉ:</label>
      <input type="text" value={address} onChange={e => setAddress(e.target.value)} />
      <br />
      <label>Nội dung:</label>
      <textarea value={message} onChange={e => setMessage(e.target.value)}></textarea>
      <br />
      <label>Mã bảo mật:</label>
      <span>{captcha}</span>
      <br />
      <button onClick={handleReset}>NHẬP LẠI</button>
    </div>
  );
}

export default Capcha;
