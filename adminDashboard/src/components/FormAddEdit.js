// // FormAddEdit.js
// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import { toast } from "react-toastify";
// import "../styles/formAddEdit.css";

// const API_URL = 'http://localhost:8080/cageshop/api/user/listformadmin'; 

// const FormAddEdit = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();

//     const [staff, setStaff] = useState({
//         avatar: '',
//         fullname: '',
//         email: '',
//         address: '',
//         phonenumber: '',
//     });

//     const [errors, setErrors] = useState({
//         avatar: '',
//         fullname: '',
//         email: '',
//         address: '',
//         phonenumber: '',
//     });

//     useEffect(() => {
//         if (id) {
//             getOneStaff(id);
//         }
//     }, [id]);

//     const getOneStaff = async (id) => {
//         try {
//             const response = await axios.get(`${API_URL}/${id}`);
//             if (response.status === 200) {
//                 setStaff(response.data);
//             }
//         } catch (error) {
//             console.error(error);
//         }
//     }

//     const updateStaff = async (data) => {
//         try {
//             const response = await axios.put(`${API_URL}/${id}`, data);
//             if (response.status === 200) {
//                 toast.success(`Updated Staff with ID: ${id} successfully`);
//                 navigate("/dashboard");
//             }
//         } catch (error) {
//             console.error(error);
//         }
//     }

//     const addNewStaff = async (data) => {
//         try {
//             const response = await axios.post(API_URL, data);
//             if (response.status === 200 || response.status === 201) {
//                 toast.success("New staff has been added successfully");
//                 navigate("/dashboard");
//             }
//         } catch (error) {
//             console.error(error);
//         }
//     }

//     const validateForm = () => {
//         let isValid = true;
//         const newErrors = { ...errors };

//         if (staff.fullname.trim() === '') {
//             newErrors.fullname = "Full Name is required";
//             isValid = false;
//         }

//         if (staff.avatar.trim() === '') {
//             newErrors.avatar = "Avatar is required";
//             isValid = false;
//         }

//         if (staff.email.trim() === '') {
//             newErrors.email = "Email is required";
//             isValid = false;
//         }

//         if (staff.address.trim() === '') {
//             newErrors.address = "Address is required";
//             isValid = false;
//         }

//         if (staff.phonenumber.trim() === '') {
//             newErrors.phonenumber = "Phone Number is required";
//             isValid = false;
//         }

//         setErrors(newErrors);
//         return isValid;
//     }

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         if (validateForm()) {
//             if (id) {
//                 updateStaff(staff);
//             } else {
//                 addNewStaff(staff);
//             }
//         } else {
//             toast.error("Some info is invalid. Please check again.");
//         }
//     }

//     const handleInputChange = (event) => {
//         const { name, value } = event.target;
//         setStaff({ ...staff, [name]: value });
//     }

//     return (
//         <div className="container">
//             <div className="form">
//                 <h2>{id ? "Update Form" : "Add New Staff"}</h2>
//                 <form onSubmit={handleSubmit}>
//                     <div>
//                         <label htmlFor="fullname">Full Name: </label>
//                         <input
//                             type="text"
//                             name="fullname"
//                             value={staff.fullname}
//                             onChange={handleInputChange}
//                         />
//                         {errors.fullname && <span className="error">{errors.fullname}</span>}
//                     </div>

//                     <div>
//                         <label htmlFor="avatar">Avatar: </label>
//                         <input
//                             type="text"
//                             name="avatar"
//                             value={staff.avatar}
//                             onChange={handleInputChange}
//                         />
//                         {errors.avatar && <span className="error">{errors.avatar}</span>}
//                     </div>

//                     <div>
//                         <label htmlFor="email">Email: </label>
//                         <input
//                             type="text"
//                             name="email"
//                             value={staff.email}
//                             onChange={handleInputChange}
//                         />
//                         {errors.email && <span className="error">{errors.email}</span>}
//                     </div>

//                     <div>
//                         <label htmlFor="address">Address: </label>
//                         <input
//                             type="text"
//                             name="address"
//                             value={staff.address}
//                             onChange={handleInputChange}
//                         />
//                         {errors.address && <span className="error">{errors.address}</span>}
//                     </div>

//                     <div>
//                         <label htmlFor="phonenumber">Phone Number: </label>
//                         <input
//                             type="text"
//                             name="phonenumber"
//                             value={staff.phonenumber}
//                             onChange={handleInputChange}
//                         />
//                         {errors.phonenumber && <span className="error">{errors.phonenumber}</span>}
//                     </div>

//                     <button type="submit" className="form-button">
//                         {id ? "Update" : "Submit"}
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default FormAddEdit;


import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "../styles/formAddEdit.css";

const API_URL = 'https://652aea854791d884f1fd8029.mockapi.io/api/product/v1/staffManagement';

const FormAddEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [staff, setStaff] = useState({});
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (id) {
            getOneStaff(id);
        }
    }, [id]);

    const getOneStaff = async (id) => {
        try {
            const response = await axios.get(`${API_URL}/${id}`);
            if (response.status === 200) {
                setStaff(response.data);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const updateStaff = async (data) => {
        try {
            const response = await axios.put(`${API_URL}/${id}`, data);
            if (response.status === 200) {
                toast.success(`Updated Staff with ID: ${id} successfully`);
                navigate("/dashboard");
            }
        } catch (error) {
            console.error(error);
        }
    }

    const addNewStaff = async (data) => {
        try {
            const response = await axios.post(API_URL, data);
            if (response.status === 200 || response.status === 201) {
                toast.success("New staff has been added successfully");
                navigate("/dashboard");
            }
        } catch (error) {
            console.error(error);
        }
    }

    const validateForm = () => {
        let isValid = true;
        const newErrors = {};

        if (!staff.fullname) {
            newErrors.fullname = "Full Name is required";
            isValid = false;
        }

        if (!staff.avatar) {
            newErrors.avatar = "Avatar is required";
            isValid = false;
        }

        if (!staff.email) {
            newErrors.email = "Email is required";
            isValid = false;
        }

        if (!staff.address) {
            newErrors.address = "Address is required";
            isValid = false;
        }

        if (!staff.phonenumber) {
            newErrors.phonenumber = "Phone Number is required";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm()) {
            if (id) {
                updateStaff(staff);
            } else {
                addNewStaff(staff);
            }
        } else {
            toast.error("Some info is invalid. Please check again.");
        }
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setStaff({ ...staff, [name]: value });
    }

    return (
        <div className="container">
            <div className="form">
                <h2>{id ? "Update Form" : "Add New Staff"}</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="fullname">Full Name: </label>
                        <input
                            type="text"
                            name="fullname"
                            value={staff.fullname || ""}
                            onChange={handleInputChange}
                        />
                        {errors.fullname && <span className="error">{errors.fullname}</span>}
                    </div>

                    <div>
                        <label htmlFor="avatar">Avatar: </label>
                        <input
                            type="text"
                            name="avatar"
                            value={staff.avatar || ""}
                            onChange={handleInputChange}
                        />
                        {errors.avatar && <span className="error">{errors.avatar}</span>}
                    </div>

                    <div>
                        <label htmlFor="email">Email: </label>
                        <input
                            type="text"
                            name="email"
                            value={staff.email || ""}
                            onChange={handleInputChange}
                        />
                        {errors.email && <span className="error">{errors.email}</span>}
                    </div>

                    <div>
                        <label htmlFor="address">Address: </label>
                        <input
                            type="text"
                            name="address"
                            value={staff.address || ""}
                            onChange={handleInputChange}
                        />
                        {errors.address && <span className="error">{errors.address}</span>}
                    </div>

                    <div>
                        <label htmlFor="phonenumber">Phone Number: </label>
                        <input
                            type="text"
                            name="phonenumber"
                            value={staff.phonenumber || ""}
                            onChange={handleInputChange}
                        />
                        {errors.phonenumber && <span className="error">{errors.phonenumber}</span>}
                    </div>

                    <button type="submit" className="form-button">
                        {id ? "Update" : "Submit"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default FormAddEdit;

