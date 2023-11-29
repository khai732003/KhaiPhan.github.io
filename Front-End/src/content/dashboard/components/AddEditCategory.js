
import React, { useState } from "react";
import {
  Button,
  CircularProgress,
  Container,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import customAxios from "../../../CustomAxios/customAxios";
import { useAuth } from "../../SanPham/Context/AuthContext";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos"; // Add this line

// import "./Scss/addfeedback.scss";


const AddEditCategory = () =>{
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [category, setCategory] = useState({
    name: "",
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
      const response = await customAxios .post("/category/add", category)
      if (response.status === 200 || response.status === 201) {
        navigate("/productmanagement");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleReturn = () => {
    navigate(-1);
  };

  return (
    <Container>
      <div className="feedback-form" style={{ marginTop: "100px" }}>
      <Button
        sx={{ fontSize: 18 }}
        variant="contained"
        style={{ backgroundColor: "#e0e0e0", color: "#212121", marginBottom: 20 }}
        startIcon={<ArrowBackIosIcon />}
        onClick={handleReturn}
      >
        BACK
      </Button>
        <h2 className="input-feedback" >Add Category</h2>
        {/* <FormControl fullWidth className="input-feedback" style={{paddingBottom: 20}}>
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
        </FormControl> */}

        <TextField
          label="Category Content"
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          name="name"
          value={category.name}
          onChange={handleInputChange}
          className="input-feedback"
          style={{paddingBottom: 20}}
        />

        {/* <TextField
          label="Product ID"
          variant="outlined"
          fullWidth
          name="price"
          value={category.price}
          style={{paddingBottom: 20}}
          className="input-feedback"
        /> */}

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

