import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  Grid,
  Typography,
  InputLabel,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import customAxios from "../../CustomAxios/customAxios";
import "./../dashboard/styles/addedituser.css";
import { toast, ToastContainer } from "react-toastify";

import { useAuth } from "./Context/AuthContext";

import "../SanPham/Scss/custom.scss";

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

  const [sidePanelData, setSidePanelData] = useState([]);
  const [spokesRange, setSpokesRange] = useState({ min: 0, max: 0 });

  const [formData, setFormData] = useState({
    name: "CUSTOM PRODUCT",
    code: "CP PRODUCT",
    categoryId: "1",
    productImage:
      "https://tse3.mm.bing.net/th?id=OIP.U5UDLyjPeHOjMtyEuBWr7gHaKe&pid=Api&P=0&h=180",
    stock: "1",
    status: "CustomProduct",
    note: "custom",
    cage: {
      description: "CUSTOM PRODUCT",
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
    } else if (name === "cage.spokes") {
      const spokesValue = parseInt(value, 10);

      // Giới hạn giá trị trong khoảng min và max
      const limitedSpokesValue = Math.min(
        Math.max(spokesValue, spokesRange.min),
        spokesRange.max
      );

      // Cập nhật giá trị vào state
      setFormData((prevData) => ({
        ...prevData,
        cage: {
          ...prevData.cage,
          spokes: limitedSpokesValue,
        },
      }));
    } else {
      // Xử lý các trường hợp khác
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
      setProduct(response.data);
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
      let orderId = localStorage.getItem("orderId");
      if (!orderId) {
        const address = user.address;
        const shipAddress = "hcm";
        const shipPrice = shipAddress === "hcm" ? 10.0 : 20.0;

        const orderResponse = await customAxios.post("/order/add", {
          name: `Order of ${user.userId}`,
          status: "pending",
          paymentMethod: "credit card",
          address: address,
          city: "Đà Nẵng",
          content: "Đóng gói cẩn thận nhé",
          userId: user.userId,
        });

        orderId = orderResponse.data.id;
        localStorage.setItem("orderId", orderId);
      }

      await customAxios.post("/order_detail/add", {
        quantity: 1,
        name: product.name,
        note: `Sản phẩm là ${product.id}`,
        orderId,
        productId: product.id,
        totalCost: product.totalPrice,
      });

      // Navigate to the order page
      navigate(`/order/${orderId}`);
    } catch (error) {
      console.error("Error creating order and order detail:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Kiểm tra nếu spokes không nằm trong khoảng min và max của size
    const minSpokes =
      sizes.find((size) => size.id === selectedSize)?.minspokes || 0;
    const maxSpokes =
      sizes.find((size) => size.id === selectedSize)?.maxspokes || 0;
    const spokesValue = parseInt(formData.cage.spokes, 10);

    console.log("spokesValue:", spokesValue);
  console.log("minSpokes:", minSpokes);
  console.log("maxSpokes:", maxSpokes);

    if (spokesValue < minSpokes || spokesValue > maxSpokes) {
      toast.error(
        `Spokes value must be between ${minSpokes} and ${maxSpokes}. Please enter a valid value.`
      );
      return;
    }
   addCustomProductManagement();
  };

  useEffect(() => {
    if (product) {
      handleBuy();
    }
  }, [product]);

  useEffect(() => {
    const sizeData = sizes.find((size) => size.id === selectedSize);
    if (sizeData) {
      setSpokesRange({ min: sizeData.minspokes, max: sizeData.maxspokes });
    }
  }, [selectedSize, sizes]);

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

  const updateSidePanelData = () => {
    // Create an array with selected options and their prices
    const newSidePanelData = [];

    // Push selected shape data
    if (selectedShape) {
      const shapeData = shapes.find((shape) => shape.id === selectedShape);
      newSidePanelData.push({
        label: "Shape",
        name: shapeData.shapeName,
        price: shapeData.price,
      });
    }

    if (selectedMaterial) {
      const materialData = materials.find(
        (material) => material.id === selectedMaterial
      );
      newSidePanelData.push({
        label: "Material",
        name: materialData.materialName,
        price: materialData.price,
      });
    }

    if (selectedSize) {
      const sizeData = sizes.find((size) => size.id === selectedSize);
      const spokesPrice = calculateSpokesPrice();
      newSidePanelData.push({
        label: "Size",
        name: sizeData.sizeName,
        price: sizeData.price,
        minspokes: sizeData.minspokes,
        maxspokes: sizeData.maxspokes,
      });
    }

    // Update the state
    setSidePanelData(newSidePanelData);
  };

  const calculateSpokesPrice = () => {
    // Tính toán giá tiền dựa trên số lượng spokes và giá của size
    const selectedSizeData = sizes.find((size) => size.id === selectedSize);
    const pricePerSpoke = selectedSizeData ? selectedSizeData.price : 0;
    const spokes = parseInt(formData.cage.spokes, 10) || 0;
    return pricePerSpoke * spokes - pricePerSpoke;
  };

  const calculateTotal = () => {
    // Calculate the total price based on selected options
    let total = 0;
    sidePanelData.forEach((item) => {
      total += item.price;
    });

    const spokesPrice = calculateSpokesPrice();
    total += spokesPrice;
    return formatCurrency(total);
  };

  useEffect(() => {
    // Update side panel data whenever the selected options change
    updateSidePanelData();
  }, [selectedShape, selectedSize, selectedMaterial]);

  function formatCurrency(amount) {
    return amount.toLocaleString("en-US");
  }

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

            <div className="side-panel">
              <h2 style={{ textAlign: "center" }}>Custom Summary</h2>
              <hr />
              <div>
                {sidePanelData.map((item, index) => (
                  <div key={index}>
                    {index + 1}. {item.label}: {item.name} - Price:{" "}
                    {formatCurrency(item.price)}
                  </div>
                ))}
                {/* <div>{sidePanelData.length + 1}. Spokes Price: {calculatePrice()}</div> */}
              </div>
              <p
                style={{
                  color: "red",
                  fontWeight: "bold",
                  fontSize: "1.5rem",
                  textAlign: "right",
                }}
              >
                Total: {calculateTotal()}
              </p>
            </div>
            <hr />
            <br />

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
                    <Grid container justifyContent="space-between">
                      <Grid item>{shape.shapeName}</Grid>
                      <Grid item>{formatCurrency(shape.price)}</Grid>
                    </Grid>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Display selected shapeName based on shapeId */}
            {selectedShape &&
              shapes.find((shape) => shape.id === selectedShape)?.shapeName}

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
                    <Grid container justifyContent="space-between">
                      <Grid item>{material.materialName}</Grid>
                      <Grid item>{formatCurrency(material.price)}</Grid>
                    </Grid>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {selectedMaterial &&
              materials.find((material) => material.id === selectedMaterial)
                ?.materialName}

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
                    <Grid container justifyContent="space-between">
                      <Grid item>{size.sizeName}</Grid>
                      <Grid item>{formatCurrency(size.price)}</Grid>
                    </Grid>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <div className="side-panel">
              <p> Customer should choose spokes based on custom size :</p>
              {selectedSize && (
                <div style={{ marginLeft: "16rem" }}>
                  Min Spokes:{" "}
                  {sizes.find((size) => size.id === selectedSize)?.minspokes} -{" "}
                  Max Spokes:{" "}
                  {sizes.find((size) => size.id === selectedSize)?.maxspokes}
                </div>
              )}
            </div>

            {/* Display selected sizeName based on sizeId */}
            {selectedSize &&
              sizes.find((size) => size.id === selectedSize)?.sizeName}

            <TextField
              label="Spokes"
              id="spokes"
              name="spokes"
              type="number"
              value={formData.cage.spokes}
              onChange={(event) => {
                const spokesValue = parseInt(event.target.value, 10);
                const minSpokes =
                  sizes.find((size) => size.id === selectedSize)?.minspokes ||
                  0;
                const maxSpokes =
                  sizes.find((size) => size.id === selectedSize)?.maxspokes ||
                  0;

                // Giới hạn giá trị trong khoảng min và max
                const limitedSpokesValue = Math.min(
                  Math.max(spokesValue, minSpokes),
                  maxSpokes
                );

                // Cập nhật giá trị vào state
                setFormData((prevData) => ({
                  ...prevData,
                  cage: {
                    ...prevData.cage,
                    spokes: limitedSpokesValue,
                  },
                }));
              }}
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
}
