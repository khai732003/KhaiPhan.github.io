import React, { useEffect, useState } from "react";
import { Button, CircularProgress, Container, TextField } from "@mui/material";
import customAxios from "../../CustomAxios/customAxios";
import { useNavigate, useParams } from "react-router-dom";
import "./Scss/addfeedback.scss";
import { useAuth } from "./Context/AuthContext";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";

const labels = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

function AddFeedBack() {
  const [hasPurchased, setHasPurchased] = useState(false);
  const [loading, setLoading] = useState(true); // Set loading to true initially
  const navigate = useNavigate();
  const { user } = useAuth();
  const { productId } = useParams();
  const [value, setValue] = React.useState(2);
  const [hover, setHover] = React.useState(-1);
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



  useEffect(() => {
    const checkUserPurchase = async () => {
      try {
        const response = await customAxios.get(
          `/order/checkUserPurchase/${user.userId}/${productId}`
        );
        setHasPurchased(response.data);
        setLoading(false); // Set loading to false after the purchase check
        console.log(response.data);

        if (!response.data) {
          // User has not made a purchase, navigate away
          navigate('/');
        }
      } catch (error) {
        setLoading(false); // Set loading to false on error
        console.error(error);
      }
    };

    checkUserPurchase();
  }, [user.userId, productId]);

  useEffect(() => {
    const checkUserPurchase = async () => {
      try {
        const response = await customAxios.get(`/feedback/exists/${user.userId}/${productId}`
        );
        if (response.data) {
          // User has not made a purchase, navigate away
    
      navigate('/');        
    }
      } catch (error) {
        setLoading(false); // Set loading to false on error
        console.error(error);
      }
    };

    checkUserPurchase();
  }, [user.userId, productId]);

  const handleAddFeedback = async () => {
    if (!feedback.rating || !feedback.content) {
      console.error("Please provide both rating and feedback content.");
      return;
    }
    try {
      const response = await customAxios.post("/feedback/add", feedback);
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

        <Box
          sx={{
            width: 200,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Rating
            name="hover-feedback"
            value={feedback.rating}
            precision={0.5}
            getLabelText={getLabelText}
            onChange={(event, newValue) => {
              handleInputChange({
                target: {
                  name: "rating",
                  value: newValue,
                },
              });
            }}
            onChangeActive={(event, newHover) => {
              setHover(newHover);
            }}
            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
          />
          {feedback.rating !== null && (
            <Box sx={{ ml: 2 }}>
              {labels[hover !== -1 ? hover : feedback.rating]}
            </Box>
          )}
        </Box>

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

        {/* <TextField
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
        /> */}

        <Button
          variant="contained"
          color="primary"
          disabled={loading}
          onClick={handleAddFeedback}
          className="input-feedback"
          style={{marginTop:'2rem'}}
        >
          {loading ? <CircularProgress size={24} /> : "Add Feedback"}
        </Button>
      </div>
    </Container>
  );
}

export default AddFeedBack;
