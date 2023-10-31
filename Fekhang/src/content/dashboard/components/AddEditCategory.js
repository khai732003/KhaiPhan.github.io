
// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import { toast } from "react-toastify";
// import "../styles/formAddEdit.css";
// import { Link } from "react-router-dom";
// import customAxios from '../../../CustomAxios/customAxios';

// const API_URL =
//   "https://652aea854791d884f1fd8029.mockapi.io/api/product/v1/productManagement";

// const AddEditCategory= () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [category, setCategory] = useState({});
//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     if (id) {
//       getOneCategory(id);
//     }
//   }, [id]);

//   const getOneCategory = async (id) => {
//     try {
//       const response = await customAxios.get(`${API_URL}/${id}`);
//       if (response.status === 200) {
//         setCategory(response.data);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const updateCategory = async (data) => {
//     try {
//       const response = await customAxios.put(`${API_URL}/${id}`, data);
//       if (response.status === 200) {
//         toast.success(`Updated Product with ID: ${id} successfully`);
//         navigate("/usermanagement");
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const addNewProduct = async (data) => {
//     try {
//       const response = await customAxios.post(API_URL, data);
//       if (response.status === 200 || response.status === 201) {
//         toast.success("New product has been added successfully");
//         navigate("/usermanagement");
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const validateForm = () => {
//     let isValid = true;
//     const newErrors = {};

//     if (!product.fullname) {
//       newErrors.fullname = "Full Name is required";
//       isValid = false;
//     }

//     if (!product.avatar) {
//       newErrors.avatar = "Avatar is required";
//       isValid = false;
//     }

//     if (!product.email) {
//       newErrors.email = "Email is required";
//       isValid = false;
//     }

//     if (!product.address) {
//       newErrors.address = "Address is required";
//       isValid = false;
//     }

//     if (!product.phonenumber) {
//       newErrors.phonenumber = "Phone Number is required";
//       isValid = false;
//     }

//     setErrors(newErrors);
//     return isValid;
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     if (validateForm()) {
//       if (id) {
//         updateProduct(product);
//       } else {
//         addNewProduct(product);
//       }
//     } else {
//       toast.error("Some info is invalid. Please check again.");
//     }
//   };

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setProduct({ ...product, [name]: value });
//   };

//   return (
//     <div className="add-update-user-form">
//       <div className="add-update-form">
//         <h2>{id ? "Update Form" : "Add New Product"}</h2>
//         <Link to="/usermanagement">
//           <button className="form-button">Back to UserManagement</button>
//         </Link>
//         <form onSubmit={handleSubmit}>
//           <div>
//             <label htmlFor="fullname">Full Name: </label>
//             <input
//               type="text"
//               name="fullname"
//               value={product.fullname || ""}
//               onChange={handleInputChange}
//             />
//             {errors.fullname && (
//               <span className="error-add-update-form">{errors.fullname}</span>
//             )}
//           </div>

//           <div>
//             <label htmlFor="avatar">Avatar: </label>
//             <input
//               type="text"
//               name="avatar"
//               value={product.avatar || ""}
//               onChange={handleInputChange}
//             />
//             {errors.avatar && <span className="error-add-update-form">{errors.avatar}</span>}
//           </div>

//           <div>
//             <label htmlFor="email">Email: </label>
//             <input
//               type="text"
//               name="email"
//               value={product.email || ""}
//               onChange={handleInputChange}
//             />
//             {errors.email && <span className="error-add-update-form">{errors.email}</span>}
//           </div>

//           <div>
//             <label htmlFor="address">Address: </label>
//             <input
//               type="text"
//               name="address"
//               value={product.address || ""}
//               onChange={handleInputChange}
//             />
//             {errors.address && <span className="error-add-update-form">{errors.address}</span>}
//           </div>

//           <div>
//             <label htmlFor="phonenumber">Phone Number: </label>
//             <input
//               type="text"
//               name="phonenumber"
//               value={product.phonenumber || ""}
//               onChange={handleInputChange}
//             />
//             {errors.phonenumber && (
//               <span className="error-add-update-form">{errors.phonenumber}</span>
//             )}
//           </div>

//           <button type="submit" className="form-button">
//             {id ? "Update" : "Submit"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddEditCategory;
