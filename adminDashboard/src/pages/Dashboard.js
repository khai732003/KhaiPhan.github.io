import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import "../styles/dashboard.css";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create'; 

const URL = 'https://652aea854791d884f1fd8029.mockapi.io/api/product/v1/staffManagement';

const Dashboard = () => {
    const [staffs, setStaffs] = useState();

    const getListStaff = async () => {
        const res = await axios.get(`${URL}`);
        if (res.status === 200) {
            setStaffs(res.data);
        }
    }

    useEffect(() => {
        getListStaff();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm(`Are you sure that you want to delete a staff with ID: ${id}`)) {
            const res = await axios.delete(`${URL}/${id}`);
            if (res.status === 200) {
                getListStaff();
                toast.success("Deleted Successfully");
            } else {
                toast.error("Deleted Error!");
            }
        }
    }

    return (
        <div className="staff-table">
            <div className="btn-add">
                <Link to={"/add/"}>
                    <button className="add-staff-btn">Add new staff</button>
                </Link>
            </div>
        
        
        <div>
       
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Avatar</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Phone Number</th>
                        <th>Created At</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {staffs && staffs.map(staff => (
                        <tr key={staff.id}>
                            <td>{staff.id}</td>
                            <td><img src={staff.image} alt={staff.id} /></td>
                            <td>{staff.fullname}</td>
                            <td>{staff.email}</td>
                            <td>{staff.address}</td>
                            <td>{staff.phone}</td>
                            <td>{new Date(staff.createdAt * 1000).toLocaleDateString()}</td>
                            <td>
                                <Link to={`/update/${staff.id}`}>
                                    <Button startIcon={<CreateIcon />}></Button>
                                </Link>
                                <Button startIcon={<DeleteIcon />} onClick={() => handleDelete(staff.id)}></Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>
    )
}

export default Dashboard;
