import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button } from '@mui/material';
import './Voucher.scss';
import customAxios from '../../CustomAxios/customAxios';
function Voucher() {
  const [voucherData, setVoucherData] = useState({
    code: '',
    description: '',
    voucherAmount: '',
    voucherType: '',
    isActive: true,
    expiration_date: '',
  });

  // Chuyển chuỗi ngày tháng thành đối tượng Date
  const expirationDate = new Date(voucherData.expiration_date);

  // Lấy ngày hiện tại
  const currentDate = new Date();

  // Thêm 3 ngày vào ngày hiện tại
  currentDate.setDate(currentDate.getDate() + 3);

  // Cập nhật expiration_date trong voucherData
  const updatedVoucherData = {
    ...voucherData,
    expiration_date: currentDate.toISOString(),
  };

  // Cập nhật state với dữ liệu mới
  setVoucherData(updatedVoucherData);

  const [errors, setErrors] = useState({
    code: '',
    description: '',
    voucherAmount: '',
    voucherType: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setVoucherData({ ...voucherData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {
      code: '',
      description: '',
      voucherAmount: '',
      voucherType: '',
      quantity: '',
    };

    if (voucherData.code.trim() === '') {
      newErrors.code = 'Mã Voucher không được bỏ trống';
    }

    if (voucherData.description.trim() === '') {
      newErrors.description = 'Description không được bỏ trống';
    }

    if (isNaN(voucherData.voucherAmount) || voucherData.voucherAmount <= 0) {
      newErrors.voucherAmount = 'Số Tiền Voucher không hợp lệ';
    }

    if (voucherData.voucherType.trim() === '') {
      newErrors.voucherType = 'Loại Voucher không được bỏ trống';
    }
    if (isNaN(voucherData.quantity) || voucherData.quantity <= 0) {
      newErrors.quantity = 'Số Lượng Voucher không hợp lệ';
    }

    setErrors(newErrors);

    return !Object.values(newErrors).some((error) => error);
  };

  const addVoucher = (event) => {
    event.preventDefault();

    if (validateForm()) {
      customAxios.post('/voucher/add', voucherData)
        .then(response => {
          console.log('Voucher added successfully:', response.data);
        })
        .catch(error => {
          console.error('Error adding voucher:', error);
        });
    }
  };

  return (
    <Container maxWidth="md" className='voucher-form-container '>
      <div>
        <TextField
          label="Mã Voucher"
          name="code"
          value={voucherData.code}
          onChange={handleInputChange}
          fullWidth
        />
        <div className="error">{errors.code}</div>
      </div>
      <div>
        <TextField
          label="Description"
          name="description"
          value={voucherData.description}
          onChange={handleInputChange}
          fullWidth
        />
        <div className="error">{errors.description}</div>
      </div>
      <div>
        <TextField
          label="Số Tiền Voucher"
          name="voucherAmount"
          type="number"
          value={voucherData.voucherAmount}
          onChange={handleInputChange}
          fullWidth
        />
        <div className="error">{errors.voucherAmount}</div>
      </div>
    
      <Button
        variant="contained"
        color="primary"
        onClick={addVoucher}
        style={{ marginTop: '10px' }}
      >
        Thêm Voucher
      </Button>
    </Container>
  );
}

export default Voucher;
