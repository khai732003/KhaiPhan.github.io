import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import "../styles/productmanagement.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const URL =
  "https://652aea854791d884f1fd8029.mockapi.io/api/product/v1/staffManagement";

const ProductManagement = () => {
  const [staffs, setStaffs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredStaffs, setFilteredStaffs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Thêm trạng thái cho trang hiện tại
  const itemsPerPage = 5;

  const getListStaff = async () => {
    const res = await axios.get(`${URL}`);
    if (res.status === 200) {
      const newStaffs = res.data.sort((a, b) => a.id - b.id);
      setStaffs(newStaffs);
      setFilteredStaffs(newStaffs);
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
    const filtered = staffs.filter((staff) => {
      return (
        staff.fullname &&
        staff.fullname.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    setFilteredStaffs(filtered);
    setCurrentPage(1); // Đặt lại trang hiện tại về trang đầu khi tìm kiếm
  };

  const handleResetSearch = () => {
    setSearchTerm("");
    setFilteredStaffs(staffs);
    setCurrentPage(1); // Đặt lại trang hiện tại về trang đầu khi đặt lại tìm kiếm
  };

  const getVisibleStaffs = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredStaffs.slice(startIndex, endIndex);
  };

  const pageCount = Math.ceil(filteredStaffs.length / itemsPerPage);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <div className="user-management-page">
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
              variant="outlined"
              className="reset-button"
              onClick={handleResetSearch}
            >
              Reset
            </Button>
          </div>
        </div>

        <div className="btn-add action-bar">
          <Link to={"/add"}>
            <button className="add-staff-btn">Add new staff</button>
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
              <th className="user-management-header">Email</th>
              <th className="user-management-header">Address</th>
              <th className="user-management-header">Phone Number</th>
              <th className="user-management-header">Created At</th>
              <th className="user-management-header">Action</th>
            </tr>
          </thead>

          <tbody>
            {getVisibleStaffs().map((staff, index) => (
              <tr key={staff.id}>
                <td className="user-management-td smaller-text">{index + 1}</td>
                <td className="user-management-td smaller-text">{staff.id}</td>
                <td className="user-management-td smaller-text">
                  <img
                    src={staff.image}
                    alt={staff.id}
                    className="img-user-management"
                  />
                </td>
                <td className="user-management-td smaller-text">{staff.fullname}</td>
                <td className="user-management-td smaller-text">{staff.email}</td>
                <td className="user-management-td smaller-text">{staff.address}</td>
                <td className="user-management-td smaller-text">{staff.phonenumber}</td>
                <td className="user-management-td smaller-text">
                  {new Date(staff.createdAt * 1000).toLocaleDateString()}
                </td>
                <td className="user-management-td">
                  <Link to={`/update/${staff.id}`}>
                    <Button startIcon={<CreateIcon />} />
                  </Link>
                  <Button
                    className="delete-btn"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDelete(staff.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <Pagination
          count={pageCount}
          page={currentPage}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default ProductManagement;
