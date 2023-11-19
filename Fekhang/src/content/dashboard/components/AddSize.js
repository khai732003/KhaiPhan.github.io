import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import customAxios from "../../../CustomAxios/customAxios";
import "../styles/addedituser.css";

export default function AddSize() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    sizeName: "",
    price: 0,
    minspokes: 0,
    maxspokes: 0,
  });

  const [validationError, setValidationError] = useState({
    nameError: "",
    priceError: "",
    minspokesError: "",
    maxspokesError: "",
  });

  const handleReturnPage = () => {
    navigate(-1);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let isValid = true;

    // Validate name
    if (!/^[a-zA-Z0-9 ]+$/.test(formData.sizeName)) {
      setValidationError((prevState) => ({
        ...prevState,
        nameError: "Name cannot have special characters.",
      }));
      isValid = false;
    } else {
      setValidationError((prevState) => ({
        ...prevState,
        nameError: "",
      }));
    }

    // Validate price
    if (formData.price < 0) {
      setValidationError((prevState) => ({
        ...prevState,
        priceError: "Price cannot be less than 0.",
      }));
      isValid = false;
    } else {
      setValidationError((prevState) => ({
        ...prevState,
        priceError: "",
      }));
    }

    // Validate minspokes and maxspokes
    if (formData.minspokes > formData.maxspokes) {
      setValidationError((prevState) => ({
        ...prevState,
        minspokesError: "Min Spokes cannot be greater than Max Spokes.",
        maxspokesError: "Max Spokes cannot be less than Min Spokes.",
      }));
      isValid = false;
    } else {
      setValidationError((prevState) => ({
        ...prevState,
        minspokesError: "",
        maxspokesError: "",
      }));
    }

    return isValid;
  };

  const addSize = async () => {
    if (validateForm()) {
      try {
        const response = await customAxios.post(`/sizes/add`, formData);
        console.log(response);

        if (response.status === 200) {
          navigate("/custom-list");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addSize();
  };

  return (
    <div>
      <div className="add-edit-container" style={{ paddingTop: "70px", margin: "0" }}>
        <div className="form-add-edit">
          <form onSubmit={handleSubmit} style={{ width: 500 }}>
            <div className="d-flex justify-content-between align-items-center  mb-1 pb-1" style={{ paddingRight: 100 }}>
              <div className="mb-5 pb-lg-2" style={{ color: "#393f81", position: "absolute", left: "10%", top: "20%" }}>
                <Button sx={{ fontSize: 18 }} variant="outlined" startIcon={<ArrowBackIosIcon />} onClick={handleReturnPage}>
                  BACK
                </Button>
              </div>
            </div>
            <label className="form-label" htmlFor="sizeName">
              Size Name
            </label>
            <div className="form-outline mb-4">
              <input
                type="text"
                id="sizeName"
                className="form-control form-control-lg"
                name="sizeName"
                value={formData.sizeName}
                onChange={handleInputChange}
                required
                placeholder="Enter Size Name"
              />
              {validationError.nameError && (
                <div className="error-message">{validationError.nameError}</div>
              )}
            </div>

            <label className="form-label" htmlFor="price">
              Price
            </label>
            <div className="form-outline mb-4">
              <input
                type="number"
                id="price"
                className="form-control form-control-lg"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
                placeholder="Enter Price"
              />
              {validationError.priceError && (
                <div className="error-message">{validationError.priceError}</div>
              )}
            </div>

            <label className="form-label" htmlFor="minspokes">
              Min Spokes
            </label>
            <div className="form-outline mb-4">
              <input
                type="number"
                id="minspokes"
                className="form-control form-control-lg"
                name="minspokes"
                value={formData.minspokes}
                onChange={handleInputChange}
                required
                placeholder="Enter Min Spokes"
              />
              {validationError.minspokesError && (
                <div className="error-message">{validationError.minspokesError}</div>
              )}
            </div>

            <label className="form-label" htmlFor="maxspokes">
              Max Spokes
            </label>
            <div className="form-outline mb-4">
              <input
                type="number"
                id="maxspokes"
                className="form-control form-control-lg"
                name="maxspokes"
                value={formData.maxspokes}
                onChange={handleInputChange}
                required
                placeholder="Enter Max Spokes"
              />
              {validationError.maxspokesError && (
                <div className="error-message">{validationError.maxspokesError}</div>
              )}
            </div>

            <button type="submit" className="btn btn-primary btn-lg">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
