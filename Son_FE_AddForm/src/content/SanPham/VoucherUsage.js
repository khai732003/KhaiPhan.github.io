import React, { useState } from 'react';
import axios from 'axios';

function VoucherUsage() {
  const [voucherUsageData, setVoucherUsageData] = useState({
    usedAt: "2023-10-31T14:30:00",
    userId: 1,
    orderId: 6,
    codeVoucher: "GIAMGIA323"
  });

  const addVoucherUsage = () => {
    axios.post('http://localhost:8080/cageshop/api/voucher-usage/add-by-voucher', voucherUsageData)
      .then(response => {
        console.log('Voucher usage added successfully:', response.data);
        // Do something with the response data if needed
      })
      .catch(error => {
        console.error('Error adding voucher usage:', error);
      });
  };

  return (
    <div className="voucher-usage-form-container">
      <h2>Thêm Sử Dụng Voucher</h2>
      <button onClick={addVoucherUsage}>Thêm Sử Dụng Voucher</button>
    </div>
  );
}

export default VoucherUsage;
