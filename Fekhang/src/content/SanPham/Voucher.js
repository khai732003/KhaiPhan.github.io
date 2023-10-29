import React, { useState } from 'react';
import axios from 'axios';

function Voucher() {
  const [voucherData, setVoucherData] = useState({
    code: '',
    description: '',
    voucherAmount: '',
    voucherType: '',
    isActive: true,
    expiration_date: "2023-10-26T15:37:00.000"
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setVoucherData({ ...voucherData, [name]: value });
  };

  const addVoucher = (event) => {
    event.preventDefault(); // Ngăn chặn form từ việc tự động gửi yêu cầu
    axios.post('http://localhost:8080/cageshop/api/voucher/add', voucherData)
      .then(response => {
        console.log('Voucher added successfully:', response.data);
        // Thực hiện các hành động khác sau khi thêm voucher thành công
      })
      .catch(error => {
        console.error('Error adding voucher:', error);
      });
  };

  return (
    <div className="voucher-form-container">
        <div>
c
        </div>
        <div>
            c
        </div>
        <div>
            c
        </div>
        <div>
            c
        </div>
        <div>
            c
        </div>
        <div>
            c
        </div>
        <div>
            c
        </div>
        <div>
            c
        </div>
      <div>
        <label>Mã Voucher:</label>
        <input
          type="text"
          name="code"
          value={voucherData.code}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Description:</label>
        <input
          type="text"
          name="description"
          value={voucherData.description}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Số Tiền Voucher:</label>
        <input
          type="number"
          name="voucherAmount"
          value={voucherData.voucherAmount}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Loại Voucher:</label>
        <input
          type="text"
          name="voucherType"
          value={voucherData.voucherType}
          onChange={handleInputChange}
        />
      </div>
      <button onClick={addVoucher}>Thêm Voucher</button>
    </div>
  );
}

export default Voucher;
