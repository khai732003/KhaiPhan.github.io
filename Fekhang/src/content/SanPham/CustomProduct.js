
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



function CustomProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedAccessories, setSelectedAccessories] = useState([]);
  const [accessories, setAccessories] = useState([]);


  useEffect(() => {
    const fetchAccessories = async () => {
      try {
        const response = await customAxios.get("/newaccessories"); // Replace with your actual API endpoint

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
        const selectedAccessory = accessories.find(
          (accessory) => accessory.id === accessoryId
        );
        return {
          id: selectedAccessory.id,
          description: selectedAccessory.description,
          price: selectedAccessory.price,
          type: selectedAccessory.type,
        };
      });

      await customAxios.post(
        `/product/clone-and-add-accessories/${id}`,
        selectedAccessoryDTOs
      );
      navigate(`/order-detail/${id}`);
    } catch (error) {
      console.error(
        "Error while cloning product and adding accessories:",
        error
      );
    }
  };

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
            {accessory.description}
          </label>
        </Box>
      ))}<hr/>
      <Button
        variant="contained"
        color="primary"
        onClick={handleBuyCustomProduct}
        sx={{ marginTop: 2 }}
      >
        Buy Custom Product
      </Button>
    </Container>
  );

   
}

export default CustomProduct;
