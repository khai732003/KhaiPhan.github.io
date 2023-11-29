import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import customAxios from "../../../CustomAxios/customAxios";
import "../styles/addedituser.css";

export default function AddMaterial() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    materialName: "",
    price: 0,
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

  const addMaterial = async () => {
    try {
      const response = await customAxios.post(`/materials/add`, formData);
      console.log(response);

      if (response.status === 201) {
        navigate("/usermanagement");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    // Validation for Material Name
    if (!/^[a-zA-Z0-9\s]+$/.test(formData.materialName)) {
      alert("Material Name can only contain alphanumeric characters and spaces.");
      return;
    }
  
    // Validation for Price
    if (formData.price < 0) {
      alert("Price cannot be less than 0.");
      return;
    }
  
    addMaterial();
    navigate(-1);
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
            <label className="form-label" htmlFor="materialName">
              Material Name
            </label>
            <div className="form-outline mb-4">
              <input
                type="text"
                id="materialName"
                className="form-control form-control-lg"
                name="materialName"
                value={formData.materialName}
                onChange={handleInputChange}
                required
                placeholder="Enter Material Name"
              />
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
