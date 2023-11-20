import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  Grid,
  InputLabel,
  List,
  Drawer,
  ListItem,
  ListItemText,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import customAxios from "../../../CustomAxios/customAxios";
import "../styles/addedituser.css";
import axios from "axios";
import { Form, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
export default function CustomProductManagement() {
  const navigate = useNavigate();
  const [shapes, setShapes] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [selectedShape, setSelectedShape] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [categories, setCategories] = useState([]);
  const [sidePanelData, setSidePanelData] = useState([]);


  const [formData, setFormData] = useState({
    name: "CUSTOME PRODUCT",
    code: "CP PRODUCT",
    extraPrice: "",
    categoryId: "",
    productImage:
      "",
    stock: "",
    status: "Available",
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

    // Validation for special characters and numeric values
    switch (name) {
      case "name":
      case "code":
        // Check if the value contains special characters
        if (/[^a-zA-Z0-9 ]/.test(value)) {
          console.error(`${name} cannot have special characters`);
          return;
        }
        break;


      case "extraPrice":
        // Check if the value is not a valid number or is less than 0
        if (isNaN(value) || parseFloat(value) < 0) {
          console.error(`${name} must be a non-negative number`);
          return;
        }
        break;

      case "cage.spokes":
        // Check if the value is not a valid number or is less than 0
        if (isNaN(value) || parseInt(value) < 0) {
          console.error(`${name} must be a non-negative integer`);
          return;
        }
        break;

      default:
        break;
    }

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
    updateSidePanelData();
  };


  const addCustomProductManagement = async () => {

    try {
      const response = await customAxios.post("/product/add", formData);

      if (response.status === 200) {
        navigate("/admin");
      }
    } catch (error) {
      // Log the detailed error response
      console.error("Detailed error response:", error.response);

      // Log the error message
      console.error("Error message:", error.message);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formData.productImage) {
      alert("Please upload a product image.");
      return;
    }
    addCustomProductManagement();
  };

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
    updateSidePanelData();
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
    updateSidePanelData();
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
    updateSidePanelData();
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

    if (selectedSize) {
      const sizeData = sizes.find((size) => size.id === selectedSize);
      newSidePanelData.push({
        label: "Size",
        name: sizeData.sizeName,
        price: sizeData.price,
      });
    }

    // Push selected material data
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

    // Update the state
    setSidePanelData(newSidePanelData);
  };

  const renderSidePanel = () => {
    return (
      <Drawer anchor="left" open={sidePanelData.length > 0} onClose={() => setSidePanelData([])}>
        <List>
          {sidePanelData.map((item, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={`${item.label}: ${item.name}`}
                secondary={`Price: ${item.price}`}
              />
            </ListItem>
          ))}
        </List>
      </Drawer>
    );
  };
  const [productImage, setProductImage] = useState("");
  const handleProductImageUpload = async (options) => {
    const { file } = options;

    if (!file) {
      console.error("Please select a product image.");
      return;
    }

    try {
      const formData1 = new FormData();
      formData1.append("file", file);
      formData1.append("upload_preset", "klbxvzvn");
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dcr9jaohf/image/upload",
        formData1
      );
      const uploadedImage = response.data.secure_url;
      setFormData((prevData) => ({
        ...prevData,
        productImage: uploadedImage,
      }));
    } catch (error) {
      console.error("Error uploading product image:", error);
    }
  };

  const [productDetailImages, setProductDetailImages] = useState([]);
  const handleProductDetailImagesUpload = async (options) => {
    const { fileList } = options;
    if (fileList && fileList.length) {
      try {
        const uploadedImages = await Promise.all(
          fileList.map(async (file) => {
            const formData = new FormData();
            formData.append("file", file.originFileObj);
            formData.append("upload_preset", "klbxvzvn"); // Replace 'klbxvzvn' with your Cloudinary preset name
            const response = await customAxios.post(
              "https://api.cloudinary.com/v1_1/dcr9jaohf/image/upload",
              formData
            );
            return response.data.secure_url;
          })
        );
        console.log(uploadedImages);
        setProductDetailImages(uploadedImages);
      } catch (error) {
        console.error("Error uploading product detail images:", error);
      }
    }
  };



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

            <TextField
              label="Product Name"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
            />

            <TextField
              label="Product Code"
              id="code"
              name="code"
              value={formData.code}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
            />

            <TextField
              label="Extra Price"
              id="extraPrice"
              name="extraPrice"
              value={formData.extraPrice}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
            />

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


            <TextField
              label="Stock"
              id="stock"
              name="stock"
              type="number"
              value={formData.stock}
              onChange={handleInputChange}
              fullWidth
              required
              margin="normal"
            />

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
                      <Grid item>{shape.price}</Grid>
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
                      <Grid item>{material.price}</Grid>
                    </Grid>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

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
                      <Grid item>{size.price}</Grid>
                    </Grid>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Display selected sizeName based on sizeId */}
            {selectedSize &&
              sizes.find((size) => size.id === selectedSize)?.sizeName}

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


            <Form.Item
              style={{ marginTop: '20px' }}
              label={
                <span style={{ fontSize: '16px' }}>
                  Product Image
                </span>
              }
              rules={[{ required: true, message: "Please input the Image name!" }]}
            >
              <Upload
                name="productImage"
                beforeUpload={() => false}
                value={productImage}
                onChange={handleProductImageUpload}
                listType="picture"
                maxCount={1}
              >
                <Button
                  variant="contained"
                  icon={<UploadOutlined />}>
                  <span class="bi bi-upload"></span>
                </Button>
              </Upload>
            </Form.Item>
            <Form.Item
              label={
                <span style={{ fontSize: '16px' }}>
                  Product Image Detail
                </span>
              }
              rules={[
                { required: true, message: "Please input the Detail Image name!" },
              ]}
            >
              <Upload
                name="productDetailImage"
                listType="picture"
                beforeUpload={() => false}
                onChange={handleProductDetailImagesUpload}
                multiple
              >
                <Button variant="contained"
                  icon={<UploadOutlined />}>
                  <span class="bi bi-upload"></span>
                </Button>
              </Upload>
            </Form.Item>
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
