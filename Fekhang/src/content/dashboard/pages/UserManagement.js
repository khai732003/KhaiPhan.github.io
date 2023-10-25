import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import "../styles/usermanagement.scss";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";

const URL =
  "https://652aea854791d884f1fd8029.mockapi.io/api/product/v1/staffManagement";

const UserManagement = () => {
  const [staffs, setStaffs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredStaffs, setFilteredStaffs] = useState([]);

  const getListStaff = async () => {
    const res = await axios.get(`${URL}`);
    if (res.status === 200) {
      const newStaffs = res.data.sort((a, b) => a.id - b.id);
      setStaffs(newStaffs);
      setFilteredStaffs(newStaffs); // Khởi tạo danh sách tìm kiếm bằng danh sách gốc
    }
  };

  useEffect(() => {
    getListStaff();
  }, []);

  const handleDelete = async (id) => {
    if (
      window.confirm(
        `Are you sure that you want to delete a staff with ID: ${id}`
      )
    ) {
      const res = await axios.delete(`${URL}/${id}`);
      if (res.status === 200) {
        getListStaff();
        toast.success("Deleted Successfully");
      } else {
        toast.error("Deleted Error!");
      }
    }
  };

  const handleSearch = () => {
    // Lọc danh sách người dùng dựa trên từ khóa tìm kiếm và kiểm tra trường fullname
    const filtered = staffs.filter((staff) => {
      return (
        staff.fullname &&
        staff.fullname.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    setFilteredStaffs(filtered);
  };

  const handleResetSearch = () => {
    setSearchTerm("");
    setFilteredStaffs(staffs); // Đặt lại danh sách tìm kiếm bằng danh sách gốc
  };

  return (
    <div className="staff-table">
      <div className="search-add-btn">

        <div className="search-name">
          {/* Thanh tìm kiếm */}
          <TextField
            label="Search"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button
            variant="outlined"
            className="search-button"
            onClick={handleSearch}
          >
            Search
          </Button>
          <Button
            variant="outlined"
            className="reset-button"
            onClick={handleResetSearch}
          >
            Reset
          </Button>
        </div>

        <div className="btn-add action-bar">
          <Link to={"/add/"}>
            <button className="add-staff-btn">Add new staff</button>
          </Link>
        </div>
      </div>

      <div className="table-staff-container">
        <table>
          <thead>
            <tr>
              <th>Serial</th>
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
            {filteredStaffs.map((staff, index) => (
              <tr key={staff.id}>
                <td>{index + 1}</td>
                <td>{staff.id}</td>
                <td>
                  <img src={staff.image} alt={staff.id} />
                </td>
                <td>{staff.fullname}</td>
                <td>{staff.email}</td>
                <td>{staff.address}</td>
                <td>{staff.phonenumber}</td>
                <td>{new Date(staff.createdAt * 1000).toLocaleDateString()}</td>
                <td>
                  <Link to={`/update/${staff.id}`}>
                    <Button startIcon={<CreateIcon />} />
                  </Link>
                  <Button
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDelete(staff.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
