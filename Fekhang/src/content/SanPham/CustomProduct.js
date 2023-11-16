
import React, { useState, useEffect } from "react";
import customAxios from "../../CustomAxios/customAxios";
import { useNavigate, useParams } from "react-router-dom";
import {
    Checkbox,
    FormControl,
    InputLabel,
    Button,
    Container,
    Typography,
    Box,
  } from "@mui/material";

import ListCustom from './ListCustom';

import { useLocation } from 'react-router-dom';

function CustomProduct() {
  const location = useLocation();
  const totalPrice = location.state.totalPrice;
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedAccessories, setSelectedAccessories] = useState([]);
  const [accessories, setAccessories] = useState([]);


  useEffect(() => {
    const fetchAccessories = async () => {
      try {
        const response = await customAxios.get("/accessories/newaccessories"); // Replace with your actual API endpoint

        setAccessories(response.data);
      } catch (error) {
        console.error("Error fetching accessories:", error);
      }
    };

    fetchAccessories();
  }, []);

  const handleAccessorySelect = (accessoryId) => {
    if (selectedAccessories.includes(accessoryId)) {
      setSelectedAccessories(
        selectedAccessories.filter((id) => id !== accessoryId)
      );
    } else {
      setSelectedAccessories([...selectedAccessories, accessoryId]);
    }
  };

  const handleBuyCustomProduct = async () => {
    try {
        const selectedAccessoryDTOs = selectedAccessories.map((accessoryId) => {
            const selectedAccessory = accessories.find((accessory) => accessory.id === accessoryId);
            return {
                id: selectedAccessory.id,
                description: selectedAccessory.description,
                price: selectedAccessory.price,
                type: selectedAccessory.type
            };
        });

        const response = await customAxios.post(`/product/clone-and-add-accessories/${id}`, selectedAccessoryDTOs);

        // Kiểm tra xem response có dữ liệu cần thiết hay không, và sử dụng nó để điều hướng
        if (response && response.data && response.data.id) {
            const newProductId = response.data.id;
            localStorage.setItem("cusPro", newProductId);
            navigate(`/customdetail/${newProductId}`);
        } else {
            console.error("Invalid response format:", response);
        }
    } catch (error) {
        console.error("Error while cloning product and adding accessories:", error);
    }
};
function formatCurrency(amount) {
  return amount.toLocaleString('en-US');
}

  return (
    <Container
      maxWidth="sm"
      sx={{
        marginBottom: 10,
        marginTop: 20,
        marginLeft: "auto",
        marginRight: "auto",
        paddingTop: 6,
        paddingBottom: 5,
        textAlign: "center",
        border: "5px solid black"
      }}
    >
      <Typography variant="h5" gutterBottom style={{color: "red"}}>
        Select Accessories:
      </Typography><hr/>
      {accessories.map((accessory) => (
        <Box key={accessory.id} sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
          <Checkbox
            id={accessory.id}
            checked={selectedAccessories.includes(accessory.id)}
            onChange={() => handleAccessorySelect(accessory.id)}
          />
          <label htmlFor={accessory.id} style={{ marginLeft: 1 }}>
            {accessory.description} {formatCurrency(accessory.price)}
          </label>
        </Box>
      ))}<hr/>
      <div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleBuyCustomProduct}
        sx={{ marginTop: 2 }}
      >
        Buy Custom Product
      </Button>
      </div>
      
    </Container>
  );

   
}

export default CustomProduct;
