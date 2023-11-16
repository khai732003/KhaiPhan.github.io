import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, TextField, Button } from '@mui/material';
import './Voucher.scss';
import customAxios from '../../CustomAxios/customAxios';
import { Navigate, useNavigate } from 'react-router-dom';

function Voucher() {
  const navigate = useNavigate();
  const [voucherData, setVoucherData] = useState({
    code: '',
    description: '',
    voucherAmount: '',
    voucherType: '',
    quantity:'',
    expiration_date: "2023-12-22T15:37:00.000",
  });

  const [errors, setErrors] = useState({
    code: '',
    description: '',
    voucherAmount: '',
    voucherType: '',
    quantity:'',
  
    expiration_date: "2023-12-22T15:37:00.000",
  });

  useEffect(() => {

    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 3);

    setVoucherData(prevData => ({
      ...prevData,
      expiration_date: expirationDate.toISOString(),
    }));
  }, []); // Empty dependency array ensures that this effect runs only once after the initial render

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
      expiration_date: "2023-12-22T15:37:00.000",
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
    console.log("aaaaa")
    event.preventDefault();

    // if (validateForm()) {
      customAxios.post('/voucher/add', voucherData)
        .then(response => {
          navigate(-1)
        })
        .catch(error => {
          console.error('Error adding voucher:', error);
        }
        );

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
        <label className="form-label" >
          Loại Voucher
        </label>
        <div className="form-outline mb-4">
          <select
            className="form-control form-control-lg"
            name="voucherType"
            value={voucherData.voucherType}
            onChange={handleInputChange}
            required
          >
            <option value="">-- Chọn Loại Voucher --</option>
            <option value="CASH">CASH</option>
            <option value="FREESHIP">FREESHIP</option>
          </select>
        </div>
      </div>
      <div>
        <TextField
          label="Số lượng"
          name="quantity"
          value={voucherData.quantity}
          onChange={handleInputChange}
          fullWidth
        />
        <div className="error">{errors.quantity}</div>
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