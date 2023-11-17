import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import "../styles/usermanagement.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import customAxios from "../../../CustomAxios/customAxios";

const URL =
  "/user/listformadmin";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Thêm trạng thái cho trang hiện tại
  const itemsPerPage = 5;

  const getListUser = async () => {
    const res = await customAxios.get(`${URL}`);
    if (res.status === 200) {
      const newUsers = res.data.sort((a, b) => a.id - b.id);
      setUsers(newUsers);
      setFilteredUsers(newUsers);
    }
  };

  useEffect(() => {
    getListUser();
  }, []);

  const handleDelete = async (id) => {
    if (
      window.confirm(
        `Are you sure that you want to delete a User with ID: ${id}`
      )
    ) {
      const res = await customAxios.delete(`/user/delete/${id}`);
      if (res.status === 200) {
        getListUser();
        toast.success("Deleted Successfully");
      } else {
        toast.error("Deleted Error!");
      }
    }
  };

  const handleSearch = () => {
    const filtered = users.filter((user) => {
      return (
        user.fullname &&
        user.fullname.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    setFilteredUsers(filtered);
    setCurrentPage(1); // Đặt lại trang hiện tại về trang đầu khi tìm kiếm
  };

  const handleResetSearch = () => {
    setSearchTerm("");
    setFilteredUsers(users);
    setCurrentPage(1); // Đặt lại trang hiện tại về trang đầu khi đặt lại tìm kiếm
  };

  const getVisibleUsers = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredUsers.slice(startIndex, endIndex);
  };

  const pageCount = Math.ceil(filteredUsers.length / itemsPerPage);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <div className="user-management-page" style={{marginBottom: "140px"}}>
      <div className="search-add-btn">
        <div className="search-name">
          <div className="search-text">
            <TextField
              label="Search"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="search-click">
            <Button
              variant="outlined"
              className="search-button"
              onClick={handleSearch}
            >
              Search
            </Button>
            <Button
              style={{ marginLeft: '40px' }}
              variant="outlined"
              className="reset-button"
              onClick={handleResetSearch}
            >
              Reset
            </Button>
          </div>
        </div>

        <div className="btn-add action-bar">
          <Link to={"/add-edit-user"}>
            <Button
              variant="outlined"
              color="error"
            >Add new Manager</Button>
          </Link>
        </div>
      </div>

      <div className="table-staff-container">
        <table className="user-table">
          <thead>
            <tr>
              <th className="user-management-header">Serial</th>
              <th className="user-management-header">ID</th>
              <th className="user-management-header">Avatar</th>
              <th className="user-management-header">Full Name</th>
              <th className="user-management-header">Name</th>
              <th className="user-management-header">Email</th>
              <th className="user-management-header"> Role</th>
              <th className="user-management-header">Address</th>
              <th className="user-management-header">Phone Number</th>
              <th className="user-management-header">Created At</th>
              <th className="user-management-header">Action</th>
            </tr>
          </thead>

          <tbody>
            {getVisibleUsers().map((user, index) => (
              <tr key={user.id}>
                <td className="user-management-td smaller-text">{index + 1}</td>
                <td className="user-management-td smaller-text">{user.id}</td>
                <td className="user-management-td smaller-text">
                  <img
                    src={user.image}
                    alt={user.id}
                    className="img-user-management"
                  />
                </td>
                <td className="user-management-td smaller-text">{user.fullname}</td>
                <td className="user-management-td smaller-text">{user.name}</td>
                <td className="user-management-td smaller-text">{user.email}</td>
                <td className="user-management-td smaller-text">{user.role.name}</td>
                <td className="user-management-td smaller-text">{user.address}</td>
                <td className="user-management-td smaller-text">{user.phone}</td>
                <td className="user-management-td smaller-text">
                  {user.createDate}
                </td>
                <td className="user-management-td">
                  <Link to={`/update-user/${user.id}`}>
                    <Button
                      color="warning"
                      startIcon={<CreateIcon />} />
                  </Link>
                  <Button
                    color="error"
                    className="delete-btn"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDelete(user.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination" style={{ marginTop: '50px', marginLeft: '2%', display: 'flex' }}>
        <Pagination
          count={pageCount}
          page={currentPage}
          onChange={handlePageChange}
        />
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
      <ToastContainer />
    </div>

  );
};

export default UserManagement;
