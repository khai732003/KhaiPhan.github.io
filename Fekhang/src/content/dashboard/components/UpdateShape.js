import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import customAxios from "../../../CustomAxios/customAxios";
import "../styles/addedituser.css";

const UpdateShape = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the shape ID from the URL params

  const [formData, setFormData] = useState({
    shapeName: "",
    price: 0,
  });

  const handleReturnPage = () => {
    navigate("/custom-list"); // Adjust the navigation as needed
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateShapeName = (shapeName) => {
    return /^[a-zA-Z0-9\s]+$/.test(shapeName);
  };

  const validatePrice = (price) => {
    return price >= 0;
  };

  const fetchShapeData = async (shapeId) => {
    try {
      const response = await customAxios.get(`/shapes/${shapeId}`);
      const shapeData = response.data;

      // Populate the form with existing shape data
      setFormData({
        shapeName: shapeData.shapeName,
        price: shapeData.price,
      });
    } catch (error) {
      console.error("Error fetching shape data:", error);
    }
  };

  useEffect(() => {
    if (id) {
      // Fetch shape data only if the ID is available
      fetchShapeData(id);
    }
  }, [id]);

  const updateShape = async () => {
    try {
      if (!validateShapeName(formData.shapeName)) {
        alert("Invalid Shape Name. Please use only alphanumeric characters and spaces.");
        return;
      }

      if (!validatePrice(formData.price)) {
        alert("Invalid Price. Please enter a non-negative value.");
        return;
      }

      const response = await customAxios.put(`/shapes/${id}`, formData);
      console.log(response);

      if (response.status === 200) {
        navigate("/custom-list");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateShape();
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
            <label className="form-label" htmlFor="shapeName">
              Shape Name
            </label>
            <div className="form-outline mb-4">
              <input
                type="text"
                id="shapeName"
                className="form-control form-control-lg"
                name="shapeName"
                value={formData.shapeName}
                onChange={handleInputChange}
                required
                placeholder="Enter Shape Name"
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
};

export default UpdateShape;
