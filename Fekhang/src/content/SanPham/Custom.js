import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import customAxios from "../../CustomAxios/customAxios";
import "./../dashboard/styles/addedituser.css";
import { useAuth } from "./Context/AuthContext";

export default function Custom() {
  const navigate = useNavigate();
  const [shapes, setShapes] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [selectedShape, setSelectedShape] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState(null);
  const { user } = useAuth();
  const [isOperationsCompleted, setOperationsCompleted] = useState(false);
  const [formData, setFormData] = useState({
    name: "CUSTOME PRODUCT",
    code: "CP PRODUCT",
    categoryId: "",
    productImage:
      "https://tse3.mm.bing.net/th?id=OIP.U5UDLyjPeHOjMtyEuBWr7gHaKe&pid=Api&P=0&h=180",
    stock: "1",
    status: "customeProduct",
    note: "custome",
    cage: {
      description: "CUSTOME",
      shapeId: "",
      materialId: "",
      sizeId: "",
      spokes: "",
    },
    accessories: [], // Uncomment if you plan to use this field
  });

  const handleReturnPage = () => {
    navigate(-1);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // If the property is nested, update the state accordingly
    if (name.includes("cage.")) {
      const nestedProperty = name.split("cage.")[1];
      setFormData((prevData) => ({
        ...prevData,
        cage: {
          ...prevData.cage,
          [nestedProperty]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };



  const addCustomProductManagement = async () => {
    try {
      const response = await customAxios.post("/product/add", formData);
      setOperationsCompleted(true);
      setProduct(response.data)
    } catch (error) {
      console.error("Detailed error response:", error.response);

      console.error("Error message:", error.message);
    }
  };
  const handleBuy = async () => {

    if (!isOperationsCompleted) {
      await addCustomProductManagement();
    }
    if (!user) {
      localStorage.setItem("proId", product.id);
      localStorage.setItem("toBuy", window.location.pathname);
      navigate("/login");
      return;
    }

    try {
      // Create an order if it doesn't exist
      let orderId = localStorage.getItem('orderId');
      if (!orderId) {
        const address = user.address;
        const shipAddress = "hcm";
        const shipPrice = shipAddress === "hcm" ? 10.0 : 20.0;

        const orderResponse = await customAxios.post('/order/add', {
          "name": `Order of${user.userId}`,
          "status": "pending",
          "paymentMethod": "credit card",
          "address": address,
          "city": "Đà Nẵng",
          "content": "Đóng gói cẩn thận nhé",
          userId: user.userId
        });

        orderId = orderResponse.data.id;
        localStorage.setItem('orderId', orderId);
      }

      // // Create order detail for the custom product
      // const customProduct = {
      //   name: formData.name,
      //   code: formData.code,
      //   categoryId: formData.categoryId,
      //   productImage: formData.productImage,
      //   stock: formData.stock,
      //   status: formData.status,
      //   note: formData.note,
      //   cage: {
      //     description: formData.cage.description,
      //     shapeId: formData.cage.shapeId,
      //     materialId: formData.cage.materialId,
      //     sizeId: formData.cage.sizeId,
      //     spokes: formData.cage.spokes,
      //   },
      // };

      await customAxios.post('/order_detail/add', {
        quantity: 1,
        name: product.name,
        note: `Sản phẩm là ${product.id}`,
        orderId,
        productId:product.id,
        totalCost: product.totalPrice
      });

      // Navigate to the order page
      navigate(`/order/${orderId}`);
    } catch (error) {
      console.error("Error creating order and order detail:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await  addCustomProductManagement();
  };

  useEffect(() => {
    // Your existing useEffect code

    // Check if the product is available before calling handleBuy
    if (product) {
      handleBuy();
    }
  }, [product]);

  useEffect(() => {
    const fetchShapes = async () => {
      try {
        const response = await customAxios.get("/shapes/list");
        setShapes(response.data);
      } catch (error) {
        console.error("Error fetching shapes:", error);
      }
    };

    fetchShapes();
  }, []);

  useEffect(() => {
    const fetchSizes = async () => {
      try {
        const response = await customAxios.get("/sizes/list");
        setSizes(response.data);
      } catch (error) {
        console.error("Error fetching sizes:", error);
      }
    };

    fetchSizes();
  }, []);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await customAxios.get("/materials/list");
        setMaterials(response.data);
      } catch (error) {
        console.error("Error fetching materials:", error);
      }
    };

    fetchMaterials();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await customAxios.get("/category/list");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const renderCategories = () => {
    return categories.map((category) => (
      <MenuItem key={category.id} value={category.id}>
        {category.name}
      </MenuItem>
    ));
  };

  const handleChangeShape = (event) => {
    const selectedShapeId = event.target.value;
    setSelectedShape(selectedShapeId);
    // Update the formData.cage.shapeId instead of formData.shapeId
    setFormData((prevData) => ({
      ...prevData,
      cage: {
        ...prevData.cage,
        shapeId: selectedShapeId,
      },
    }));
  };

  const handleChangeSize = (event) => {
    const selectedSizeId = event.target.value;
    setSelectedSize(selectedSizeId);
    // Update the formData.cage.sizeId instead of formData.sizeId
    setFormData((prevData) => ({
      ...prevData,
      cage: {
        ...prevData.cage,
        sizeId: selectedSizeId,
      },
    }));
  };

  const handleChangeMaterial = (event) => {
    const selectedMaterialId = event.target.value;
    setSelectedMaterial(selectedMaterialId);
    // Update the formData.cage.materialId instead of formData.materialId
    setFormData((prevData) => ({
      ...prevData,
      cage: {
        ...prevData.cage,
        materialId: selectedMaterialId,
      },
    }));
  };
  console.log(formData);
  return (
    <div>
      <div
        className="add-edit-container"
        style={{ paddingTop: "70px", margin: "0" }}
      >
        <div className="form-add-edit">
          <form onSubmit={handleSubmit} style={{ width: 500 }}>
            <div
              className="d-flex justify-content-between align-items-center  mb-1 pb-1"
              style={{ paddingRight: 100 }}
            >
              <div
                className="mb-5 pb-lg-2"
                style={{
                  color: "#393f81",
                  position: "absolute",
                  left: "10%",
                  top: "20%",
                }}
              >
                <Button
                  sx={{ fontSize: 18 }}
                  variant="outlined"
                  startIcon={<ArrowBackIosIcon />}
                  onClick={handleReturnPage}
                >
                  BACK
                </Button>
              </div>
            </div>

            {/* Category Select Input */}
            <FormControl fullWidth margin="normal">
              <InputLabel id="categoryIdLabel">Select Category</InputLabel>
              <Select
                labelId="categoryIdLabel"
                id="categoryId"
                name="categoryId"
                value={formData.categoryId}
                onChange={handleInputChange}
                fullWidth
                required
              >
                {renderCategories()}
              </Select>
            </FormControl>

            {/* Stock Input */}
            {/* <TextField
              label="Stock"
              id="stock"
              name="stock"
              type="number"
              value={formData.stock}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
            /> */}

            {/* Select Shape */}
            <FormControl fullWidth margin="normal">
              <InputLabel id="shapeIdLabel">Select Shape</InputLabel>
              <Select
                labelId="shapeIdLabel"
                id="shapeId"
                name="shapeId"
                value={selectedShape || ""}
                onChange={handleChangeShape}
                fullWidth
                required
              >
                {shapes.map((shape) => (
                  <MenuItem key={shape.id} value={shape.id}>
                    {shape.shapeName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Display selected shapeName based on shapeId */}
            {selectedShape &&
              shapes.find((shape) => shape.id === selectedShape)?.shapeName}

            {/* Select Size */}
            <FormControl fullWidth margin="normal">
              <InputLabel id="sizeIdLabel">Select Size</InputLabel>
              <Select
                labelId="sizeIdLabel"
                id="sizeId"
                name="sizeId"
                value={selectedSize || ""}
                onChange={handleChangeSize}
                fullWidth
                required
              >
                {sizes.map((size) => (
                  <MenuItem key={size.id} value={size.id}>
                    {size.sizeName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Display selected sizeName based on sizeId */}
            {selectedSize &&
              sizes.find((size) => size.id === selectedSize)?.sizeName}

            {/* Select Material */}
            <FormControl fullWidth margin="normal">
              <InputLabel id="materialIdLabel">Select Material</InputLabel>
              <Select
                labelId="materialIdLabel"
                id="materialId"
                name="materialId"
                value={selectedMaterial}
                onChange={handleChangeMaterial}
                fullWidth
                required
              >
                {materials.map((material) => (
                  <MenuItem key={material.id} value={material.id}>
                    {material.materialName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Display selected materialName based on materialId */}
            {selectedMaterial &&
              materials.find((material) => material.id === selectedMaterial)
                ?.materialName}
            <TextField
              label="Spokes"
              id="spokes"
              name="spokes"
              value={formData.cage.spokes}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  cage: {
                    ...formData.cage,
                    spokes: event.target.value,
                  },
                })
              }
              fullWidth
              required
              margin="normal"
            />

            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
            >
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}