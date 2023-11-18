// ListShape.js
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

const itemsPerPage = 5;

const ListShape = () => {
  const [shapes, setShapes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate(); 

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

  const handleUpdateShape = (id) => {
    navigate(`/update-shape/${id}`);
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentShapes = shapes.slice(startIndex, endIndex);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead style={{backgroundColor: "#3498db", color: "#fff"}}>
            <TableRow>
              <TableCell style={{color: "#fff"}}>ID</TableCell>
              <TableCell style={{color: "#fff"}}>Shape Name</TableCell>
              <TableCell style={{color: "#fff"}}>Price</TableCell>
              <TableCell style={{color: "#fff" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentShapes.map((shape) => (
              <TableRow key={shape.id}>
                <TableCell>{shape.id}</TableCell>
                <TableCell>{shape.shapeName}</TableCell>
                <TableCell>{shape.price}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleUpdateShape(shape.id)}
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
        count={Math.ceil(shapes.length / itemsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
      />
    </div>
  );
};

export default ListShape;
