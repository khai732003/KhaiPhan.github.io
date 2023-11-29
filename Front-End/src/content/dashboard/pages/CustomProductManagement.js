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
import { ToastContainer, toast } from "react-toastify";
import customAxios from "../../../CustomAxios/customAxios";
import "../styles/addedituser.css";
import axios from "axios";
import { Form, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
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
  const [shapePrice, setShapePrice] = useState(0);
  const [materialPrice, setMaterialPrice] = useState(0);
  const [sizePrice, setSizePrice] = useState(0);
  const [totalSummary, setTotalSummary] = useState([]);

  const [formData, setFormData] = useState({
    name: "Customized Product",
    code: "SP***",
    extraPrice: "",
    categoryId: "",
    productImage: "",
    stock: "",
    status: "Available",
    note: "custome",
    cage: {
      description: "",
      shapeId: "",
      materialId: "",
      sizeId: "",
      spokes: "",
    },
    accessories: [],
    description: "", // Add this line for description
    status: "",
  });

  const handleReturnPage = () => {
    navigate("/productmanagement");
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case "name":
      case "code":
      case "cage.description":
        // Handle nested property
        setFormData((prevData) => ({
          ...prevData,
          cage: {
            ...prevData.cage,
            description: value,
          },
        }));

      case "status":
        if (/[^a-zA-Z0-9 ]/.test(value)) {
          console.error(`${name} cannot have special characters`);
          return;
        }
        break;

      case "extraPrice":
      case "stock":
        if (/[^0-9 ]/.test(value)) {
          console.error(`${name} cannot have special characters`);
          return;
        }
        break;
      case "cage.spokes":
        if (isNaN(value) || parseFloat(value) < 0) {
          console.error(`${name} must be a non-negative number`);
          return;
        }
        break;
      case "productImage":
        if (value.trim() === "") {
          setFormData((prevErrors) => ({
            ...prevErrors,
            [name]: "This field is required",
          }));
        } else {
          setFormData((prevErrors) => ({
            ...prevErrors,
            [name]: "",
          }));
        }
        break;

      default:
        break;
    }

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

    if (name === "stock" || name === "cage.spokes") {
      if (/[^0-9]/.test(value)) {
        toast.error(`${name} cannot have special characters or letters.`);
        return;
      }
    }

    updateSidePanelData();
  };

  const addCustomProductManagement = async () => {
    try {
      const response = await customAxios.post("/product/add", formData);

      if (response.status === 200) {
        navigate("/productmanagement");
      }
    } catch (error) {
      console.error("Detailed error response:", error.response);
      console.error("Error message:", error.message);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Kiểm tra nếu spokes không nằm trong khoảng min và max của size
    const minSpokes =
      sizes.find((size) => size.id === selectedSize)?.minspokes || 0;
    const maxSpokes =
      sizes.find((size) => size.id === selectedSize)?.maxspokes || 0;
    const spokesValue = parseInt(formData.cage.spokes, 10);

    if (spokesValue < minSpokes || spokesValue > maxSpokes) {
      toast.error(
        `Spokes value must be between ${minSpokes} and ${maxSpokes}. Please enter a valid value.`
      );
      return;
    }

    if (!formData.productImage && !isImageValid) {
      toast.error("Please upload a product image.");
      return;
    }
    addCustomProductManagement();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const shapeResponse = await customAxios.get("/shapes/list");
        setShapes(shapeResponse.data);

        const sizeResponse = await customAxios.get("/sizes/list");
        setSizes(sizeResponse.data);

        const materialResponse = await customAxios.get("/materials/list");
        setMaterials(materialResponse.data);

        const categoryResponse = await customAxios.get("/category/list");
        setCategories(categoryResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    updateSidePanelData();
  }, [formData, selectedShape, selectedMaterial, selectedSize]);

  useEffect(() => {
    if (selectedShape) {
      const shapeData = shapes.find((shape) => shape.id === selectedShape);
      setShapePrice(shapeData?.price || 0);
    }
  }, [selectedShape, shapes]);

  useEffect(() => {
    if (selectedMaterial) {
      const materialData = materials.find(
        (material) => material.id === selectedMaterial
      );
      setMaterialPrice(materialData?.price || 0);
    }
  }, [selectedMaterial, materials]);

  useEffect(() => {
    if (selectedSize) {
      const sizeData = sizes.find((size) => size.id === selectedSize);
      setSizePrice(sizeData?.price || 0);
    }
  }, [selectedSize, sizes]);

  const updateSidePanelData = () => {
    const newSidePanelData = [];

    if (formData.extraPrice !== "") {
      newSidePanelData.push({
        label: "Extra Price",
        name: formData.extraPrice || 0,
      });
    }

    // Stock
    if (formData.stock) {
      newSidePanelData.push({
        label: "Stock",
        name: formData.stock || 0,
      });
    }

    if (selectedShape) {
      const shapeData = shapes.find((shape) => shape.id === selectedShape);
      newSidePanelData.push({
        label: "Shape",
        name: shapeData?.shapeName,
        price: formatCurrency(shapeData?.price) || 0,
      });
    }

    if (selectedMaterial) {
      const materialData = materials.find(
        (material) => material.id === selectedMaterial
      );
      newSidePanelData.push({
        label: "Material",
        name: materialData?.materialName,
        price: formatCurrency(materialData?.price) || 0,
      });
    }

    if (selectedSize) {
      const sizeData = sizes.find((size) => size.id === selectedSize);
      const spokesPrice = calculateSpokesPrice();
      newSidePanelData.push({
        label: "Size",
        name: sizeData?.sizeName,
        price: formatCurrency(sizeData?.price) || 0,
        minspokes: sizeData?.minspokes,
        maxspokes: sizeData?.maxspokes,
      });

      newSidePanelData.push({
        label: "Spokes",
        name: formData.cage.spokes || 0,
        price: formatCurrency(spokesPrice),
      });
    }

    const total = calculateTotal();
    setTotalSummary(total);

    setSidePanelData(newSidePanelData);
  };

  const calculateSpokesPrice = () => {
    const selectedSizeData = sizes.find((size) => size.id === selectedSize);
    const pricePerSpoke = selectedSizeData ? selectedSizeData.price : 0;
    const spokes = parseInt(formData.cage.spokes, 11) || 0;
    return pricePerSpoke * spokes - pricePerSpoke;
  };

  const calculateTotal = () => {
    let total = 0;
    // total += shapePrice + materialPrice;
    const spokesPrice = calculateSpokesPrice();
    // total += spokesPrice;
    total += shapePrice + materialPrice + spokesPrice;

    const extraPrice = parseFloat(formData.extraPrice) || 0;
    total += extraPrice;
    return formatCurrency(total);
  };

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
    setFormData((prevData) => ({
      ...prevData,
      cage: {
        ...prevData.cage,
        sizeId: selectedSizeId,
      },
    }));
    updateSidePanelData();
  };

  function formatCurrency(amount) {
    return amount.toLocaleString("en-US");
  }

  const handleChangeMaterial = (event) => {
    const selectedMaterialId = event.target.value;
    setSelectedMaterial(selectedMaterialId);
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

  const renderSidePanel = () => {
    const total = calculateTotal();

    return (
      <Drawer
        anchor="left"
        open={sidePanelData.length > 0}
        onClose={() => setSidePanelData([])}
      >
        <List>
          {sidePanelData.map((item, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={`${item.label}: ${item.name}`}
                secondary={`Price: ${item.price}`}
              />
            </ListItem>
          ))}
          <ListItem>
            <ListItemText
              primary={`Total`}
              secondary={`Total Price: ${total}`}
            />
          </ListItem>
        </List>
      </Drawer>
    );
  };
  const [productImage, setProductImage] = useState("");
  const [isImageValid, setIsImageValid] = useState(false);

  const isImageType = (file) => {
    // Kiểm tra loại MIME của file
    const acceptedImageTypes = ["image/jpeg", "image/png", "image/gif"];
    return acceptedImageTypes.includes(file.type);
  };

  const handleProductImageUpload = async (options) => {
    const { file } = options;

    if (!file) {
      toast.error("Please select a product image.");
      return;
    }

    if (!isImageType(file)) {
      toast.error("Invalid file type. Please upload an image.");
      setIsImageValid(false);

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
      setIsImageValid(true); // Đặt là true nếu hình ảnh hợp lệ
    } catch (error) {
      console.error("Error uploading product image:", error);
      toast.error("Error uploading product image.");
      setIsImageValid(false);
    }
  };

  const [productDetailImages, setProductDetailImages] = useState([]);
  const handleProductDetailImagesUpload = async (options) => {
    const { fileList } = options;
    if (fileList && fileList.length) {
      if (!fileList.every((file) => isImageType(file.originFileObj))) {
        toast.error("Invalid file type. Please upload only images.");
        return;
      }

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
        toast.error("Error uploading product detail images.");
      }
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-9">
          <div
            className="add-edit-container"
            style={{ paddingTop: "70px", margin: "0" }}
          >
            <div className="form-add-edit">
              <form onSubmit={handleSubmit} style={{ width: 500 }}>
                <div
                  className="d-flex justify-content-between align-items-center mb-1 pb-1"
                  style={{ paddingRight: 100 }}
                >
                  <div
                    className="mb-5 pb-lg-2"
                    style={{
                      color: "#393f81",
                      position: "absolute",
                      left: "15%",
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
                  <h2 style={{ textAlign: "center" }}>Add Product</h2>

                  {/* <div>
                    {sidePanelData.map((item, index) => (
                      <div key={index}>
                        {index + 1}. {item.label}: {item.name} - Price:{" "}
                        {item.price}
                      </div>
                    ))}
                  </div>
                  <p
                    style={{
                      color: "red",
                      fontWeight: "bold",
                      fontSize: "1.5rem",
                      textAlign: "right",
                    }}
                  >
                    Total: {totalSummary}
                  </p> */}
                </div>
                <br />

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
                  label="Description"
                  id="cage.description"
                  name="cage.description"
                  value={formData.cage.description}
                  onChange={handleInputChange}
                  fullWidth
                  required
                  margin="normal"
                />

                <FormControl fullWidth margin="normal">
                  <InputLabel id="statusLabel">Select Status</InputLabel>
                  <Select
                    labelId="statusLabel"
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    fullWidth
                    required
                  >
                    <MenuItem value="Available">Available</MenuItem>
                    <MenuItem value="New">New</MenuItem>
                    <MenuItem value="Out of Stock">Out of Stock</MenuItem>
                    <MenuItem value="Upcoming">Upcoming</MenuItem>
                  </Select>
                </FormControl>

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
                      {
                        sizes.find((size) => size.id === selectedSize)
                          ?.minspokes
                      }{" "}
                      - Max Spokes:{" "}
                      {
                        sizes.find((size) => size.id === selectedSize)
                          ?.maxspokes
                      }
                    </div>
                  )}
                </div>

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
                      sizes.find((size) => size.id === selectedSize)
                        ?.minspokes || 0;
                    const maxSpokes =
                      sizes.find((size) => size.id === selectedSize)
                        ?.maxspokes || 0;

                    // Giới hạn giá trị trong khoảng min và max
                    const limitedSpokesValue = Math.min(
                      Math.max(spokesValue, minSpokes),
                      maxSpokes
                    );

                    // Kiểm tra giá trị và thiết lập giá trị mặc định là 1 nếu giá trị là 0 hoặc âm
                    if (spokesValue <= 0) {
                      toast.error(
                        "Please enter a value greater than 0 or different value for spokes."
                      );
                      return;
                    }

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

                <Form.Item
                  style={{ marginTop: "20px" }}
                  label={
                    <span style={{ fontSize: "16px" }}>Product Image</span>
                  }
                  rules={[
                    { required: true, message: "Please input the Image name!" },
                  ]}
                >
                  <Upload
                    name="productImage"
                    beforeUpload={() => false}
                    value={productImage}
                    onChange={handleProductImageUpload}
                    listType="picture"
                    maxCount={1}
                  >
                    <Button variant="contained" icon={<UploadOutlined />}>
                      <span class="bi bi-upload"></span>
                    </Button>
                  </Upload>
                </Form.Item>
                <Form.Item
                  label={
                    <span style={{ fontSize: "16px" }}>
                      Product Image Detail
                    </span>
                  }
                  rules={[
                    {
                      required: true,
                      message: "Please input the Detail Image name!",
                    },
                  ]}
                >
                  <Upload
                    name="productDetailImage"
                    listType="picture"
                    beforeUpload={() => false}
                    onChange={handleProductDetailImagesUpload}
                    multiple
                  >
                    <Button variant="contained" icon={<UploadOutlined />}>
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

        {/* Right Side: Total and Submit Button */}
        <div className="col-md-3">
          <div
            className="side-panel"
            style={{ position: "sticky", top: "70px" }}
          >
            <h2 style={{ textAlign: "center", marginTop: "7rem" }}>
              Total Summary
            </h2>
            <hr />
            {sidePanelData.length > 0 ? (
              <div>
                {sidePanelData.map((item, index) => (
                  <div
                    key={index}
                    style={{ marginBottom: "1rem", display: "flex" }}
                  >
                    <div style={{ minWidth: "100px" }}>
                      {index === 0} {item.label}: {item.name}
                    </div>
                    {item.label !== "Extra Price" && item.label !== "Stock" && (
                      <div style={{ marginLeft: "auto", minWidth: "80px" }}>
                        Price: {item.price}
                      </div>
                    )}
                  </div>
                ))}
                <hr />
                <p
                  style={{
                    color: "red",
                    fontWeight: "bold",
                    fontSize: "1.5rem",
                    textAlign: "right",
                  }}
                >
                  Total: {totalSummary}
                </p>
              </div>
            ) : (
              <Alert severity="info">
                <AlertTitle>No data available</AlertTitle>
                Please add items to see the total summary.
              </Alert>
            )}
          </div>
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
