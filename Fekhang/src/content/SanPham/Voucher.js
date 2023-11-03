import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button } from '@mui/material';
import './Voucher.scss';
function Voucher() {
  const [voucherData, setVoucherData] = useState({
    code: '',
    description: '',
    voucherAmount: '',
    voucherType: '',
    isActive: true,
    expiration_date: "2023-10-26T15:37:00.000",
  });

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

    setErrors(newErrors);

    return !Object.values(newErrors).some((error) => error);
  };

  const addVoucher = (event) => {
    event.preventDefault();

    if (validateForm()) {
      axios.post('http://localhost:8080/cageshop/api/voucher/add', voucherData)
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
      <div>
        <TextField
          label="Loại Voucher"
          name="voucherType"
          value={voucherData.voucherType}
          onChange={handleInputChange}
          fullWidth
        />
        <div className="error">{errors.voucherType}</div>
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
