import React, { useState } from "react";
import { Button, CircularProgress, Container, TextField } from "@mui/material";
import customAxios from "../../CustomAxios/customAxios";
import { useNavigate, useParams } from "react-router-dom";
import "./Scss/addfeedback.scss";
import { useAuth } from "./Context/AuthContext";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

function AddFeedBack() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { productId } = useParams();
  const [feedback, setFeedback] = useState({
    rating: "",
    content: "",
    userId: user.userId,
    productId: productId,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFeedback((prevFeedback) => ({
      ...prevFeedback,
      [name]: value,
    }));
  };

  const handleAddFeedback = async () => {
    try {
      const response = await customAxios .post("/feedback/add", feedback)
      if (response.status === 200 || response.status === 201) {
        navigate("/sanpham");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <div className="feedback-form" style={{ marginTop: "150px" }}>
        <h2 className="input-feedback">Add Feedback</h2>
        <FormControl fullWidth className="input-feedback">
          <InputLabel id="rating-label">Rating</InputLabel>
          <Select
            labelId="rating-label"
            id="rating"
            name="rating"
            value={feedback.rating}
            onChange={handleInputChange}
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Feedback Content"
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          name="content"
          value={feedback.content}
          onChange={handleInputChange}
          className="input-feedback"
        />

        <TextField
          label="User ID"
          variant="outlined"
          fullWidth
          name="userId"
          value={feedback.userId}
          readOnly
          className="input-feedback"
        />

        <TextField
          label="Product ID"
          variant="outlined"
          fullWidth
          name="productId"
          value={feedback.productId}
          readOnly
          className="input-feedback"
        />

        <Button
          variant="contained"
          color="primary"
          disabled={loading}
          onClick={handleAddFeedback}
          className="input-feedback"
        >
          {loading ? <CircularProgress size={24} /> : "Add Feedback"}
        </Button>
      </div>
    </Container>
  );
}

export default AddFeedBack;
