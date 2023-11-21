import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import customAxios from "../../../CustomAxios/customAxios";
import "../styles/addedituser.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateSize = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the size ID from the URL params

  const [formData, setFormData] = useState({
    sizeName: "",
    price: 0,
    minspokes: 0,
    maxspokes: 0,
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

  const fetchSizeData = async (sizeId) => {
    try {
      const response = await customAxios.get(`/sizes/${sizeId}`);
      const sizeData = response.data;

      // Populate the form with existing size data
      setFormData({
        sizeName: sizeData.sizeName,
        price: sizeData.price,
        minspokes: sizeData.minspokes,
        maxspokes: sizeData.maxspokes,
      });
    } catch (error) {
      console.error("Error fetching size data:", error);
    }
  };

  useEffect(() => {
    if (id) {
      // Fetch size data only if the ID is available
      fetchSizeData(id);
    }
  }, [id]);

  const updateSize = async () => {
    try {
      // Validation checks
      if (formData.sizeName.includes("@")) {
        toast.error("Size Name cannot contain special characters like '@'");
        return;
      }

      if (formData.price < 0) {
        toast.error("Price cannot be less than 0");
        return;
      }

      if (formData.minspokes > formData.maxspokes) {
        toast.error("Min Spokes cannot be greater than Max Spokes");
        return;
      }

      const response = await customAxios.put(`/sizes/${id}`, formData);

      if (response.status === 200) {
        navigate("/custom-list");
        toast.success("Update successful!");
      }
    } catch (error) {
      console.error("Error updating size:", error);
      toast.error("Error updating size");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateSize();
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
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default UpdateSize;
