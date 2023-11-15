import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Pagination from "@mui/material/Pagination";
import customAxios from "../../../CustomAxios/customAxios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import "../styles/usermanagement.css"; // Assuming you have some custom styles

const URL = "/user/list";

const StaffManagement = () => {
  const [staffs, setStaffs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredStaffs, setFilteredStaffs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const getListStaff = async () => {
    try {
      const res = await customAxios.get(URL);
      if (res.status === 200) {
        const newStaffs = res.data.sort((a, b) => a.id - b.id);
        setStaffs(newStaffs);
        setFilteredStaffs(newStaffs);
      }
    } catch (error) {
      console.error("Error fetching staff list:", error);
    }
  };

  useEffect(() => {
    getListStaff();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm(`Are you sure you want to delete the staff with ID: ${id}`)) {
      try {
        const res = await customAxios.delete(`/user/delete/${id}`);
        if (res.status === 200) {
          getListStaff();
          // Assuming you have a toast notification library, adjust accordingly
          // toast.success("Deleted Successfully");
        } else {
          // toast.error("Deletion Error!");
        }
      } catch (error) {
        console.error("Error deleting staff:", error);
        // toast.error("Deletion Error!");
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
    setCurrentPage(1);
  };

  const handleResetSearch = () => {
    setSearchTerm("");
    setFilteredStaffs(staffs);
    setCurrentPage(1);
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
              variant="contained"
              className="search-button"
              onClick={handleSearch}
            >
              Search
            </Button>
            <Button
            
              variant="outlined"
              color="success"
              className="reset-button"
              onClick={handleResetSearch}
            >
              Reset
            </Button>
          </div>
        </div>

        <div className="btn-add action-bar">
          <Link to={"/add-edit-staff"}>
            <Button variant="outlined"  className="add-staff-btn">
              Add new Staff
            </Button>
          </Link>
        </div>
      </div>

      <div className="table-staff-container">
        <TableContainer component={Paper}>
          <Table className="user-table" aria-label="user table">
            <TableHead>
              <TableRow>
                <TableCell className="user-management-header">Serial</TableCell>
                <TableCell className="user-management-header">ID</TableCell>
                <TableCell className="user-management-header">Avatar</TableCell>
                <TableCell className="user-management-header">Full Name</TableCell>
                <TableCell className="user-management-header">Name</TableCell>
                <TableCell className="user-management-header">Email</TableCell>
                <TableCell className="user-management-header">Address</TableCell>
                <TableCell className="user-management-header">
                  Phone Number
                </TableCell>
                <TableCell className="user-management-header">Created At</TableCell>
                <TableCell className="user-management-header">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {getVisibleStaffs().map((staff, index) => (
                <TableRow key={staff.id}>
                  <TableCell className="user-management-td smaller-text">
                    {index + 1}
                  </TableCell>
                  <TableCell className="user-management-td smaller-text">
                    {staff.id}
                  </TableCell>
                  <TableCell className="user-management-td smaller-text">
                    <img
                      src={staff.image}
                      alt={staff.id}
                      className="img-user-management"
                    />
                  </TableCell>
                  <TableCell className="user-management-td smaller-text">
                    {staff.fullname}
                  </TableCell>
                  <TableCell className="user-management-td smaller-text">
                    {staff.name}
                  </TableCell>
                  <TableCell className="user-management-td smaller-text">
                    {staff.email}
                  </TableCell>
                  <TableCell className="user-management-td smaller-text">
                    {staff.address}
                  </TableCell>
                  <TableCell className="user-management-td smaller-text">
                    {staff.phonenumber}
                  </TableCell>
                  <TableCell className="user-management-td smaller-text">
                    {staff.createDate}
                  </TableCell>
                  <TableCell className="user-management-td">
                    <Link to={`/update/${staff.id}`}>
                      <Button
                        startIcon={<CreateIcon />}
                        variant="contained"
                        color="primary"
                      >
                        Update
                      </Button>
                    </Link>
                    <Button
                      className="delete-btn"
                      startIcon={<DeleteIcon />}
                      variant="contained"
                      color="error"
                      onClick={() => handleDelete(staff.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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

export default StaffManagement;
