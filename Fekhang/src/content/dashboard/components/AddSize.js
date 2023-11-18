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

  const addSize = async () => {
    try {
      const response = await customAxios.post(`/sizes/add`, formData);
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
