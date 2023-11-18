import React, { useState, useEffect } from "react";
import customAxios from "../../../CustomAxios/customAxios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  Button,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "../styles/listsize.css";

const itemsPerPage = 5;

const ListSize = () => {
  const [sizes, setSizes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate(); 

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

  const handleUpdateSize = (id) => {
    navigate(`/update-size/${id}`);
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentSizes = sizes.slice(startIndex, endIndex);

  return (
    <div className="list-size-container">
      <TableContainer component={Paper}>
        <Table>
          <TableHead style={{backgroundColor: "#3498db", color: "#fff"}}>
            <TableRow>
              <TableCell style={{color: "#fff"}}>ID</TableCell>
              <TableCell style={{color: "#fff"}}>Size Name</TableCell>
              <TableCell style={{color: "#fff"}}>Price</TableCell>
              <TableCell style={{color: "#fff"}}>Min Spokes</TableCell>
              <TableCell style={{color: "#fff"}}>Max Spokes</TableCell>
              <TableCell style={{ color: "#fff" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentSizes.map((size) => (
              <TableRow key={size.id}>
                <TableCell>{size.id}</TableCell>
                <TableCell>{size.sizeName}</TableCell>
                <TableCell>{size.price}</TableCell>
                <TableCell>{size.minspokes}</TableCell>
                <TableCell>{size.maxspokes}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleUpdateSize(size.id)}
                  >
                    Update
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={Math.ceil(sizes.length / itemsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
      />
    </div>
  );
};

export default ListSize;
