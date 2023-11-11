
import React, { useState } from "react";
import { Button, CircularProgress, Container, TextField } from "@mui/material";
import customAxios from "../../../CustomAxios/customAxios";
import { useNavigate, useParams } from "react-router-dom";
// import "./Scss/addfeedback.scss";
import { useAuth } from "../../SanPham/Context/AuthContext";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

function AddEditCategory() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [category, setCategory] = useState({
    description: "",
    price: "",
    type: "Accessory Type",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCategory((prevCategory) => ({
      ...prevCategory,
      [name]: value,
    }));
  };

  const handleAddCategory = async () => {
    try {
      const response = await customAxios .post("/addaccessories", category)
      if (response.status === 200 || response.status === 201) {
        navigate("/productmanagement");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <div className="feedback-form" style={{ marginTop: "150px" }}>
        <h2 className="input-feedback">Add Category</h2>
        <FormControl fullWidth className="input-feedback">
          <InputLabel id="rating-label">Type</InputLabel>
          <Select
            labelId="rating-label"
            id="rating"
            name="rating"
            value={category.type}
            onChange={handleInputChange}
          >
            <MenuItem value={1}>Accessory Type 1</MenuItem>
            <MenuItem value={2}>Accessory Type 2</MenuItem>
            
          </Select>
        </FormControl>

        <TextField
          label="Category Content"
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          name="content"
          value={category.description}
          onChange={handleInputChange}
          className="input-feedback"
        />

        <TextField
          label="Product ID"
          variant="outlined"
          fullWidth
          name="price"
          value={category.price}
          
          className="input-feedback"
        />

        <Button
          variant="contained"
          color="primary"
          disabled={loading}
          onClick={handleAddCategory}
          className="input-feedback"
        >
          {loading ? <CircularProgress size={24} /> : "Add Category"}
        </Button>
      </div>
    </Container>
  );
}

export default AddEditCategory;

