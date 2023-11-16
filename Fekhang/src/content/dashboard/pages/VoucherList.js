import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import customAxios from "../../../CustomAxios/customAxios";

function VoucherList() {
  const [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => {
    // Fetch feedback data from the API
    customAxios
      .get("/feedback/get-all")
      .then((response) => response.data)
      .then((data) => setFeedbackList(data))
      .catch((error) => console.error("Error fetching feedback data:", error));
  }, []);

  // Group feedback items by id
  const groupedFeedback = feedbackList.reduce((grouped, feedback) => {
    const id = feedback.id;

    if (!grouped[id]) {
      grouped[id] = [];
    }

    grouped[id].push(feedback);

    return grouped;
  }, {});

  return (
    <div style={{marginLeft: "5rem", marginRight: "9rem"}}>
    <TableContainer
      component={Paper}
      style={{
        marginTop: "10rem",
        marginBottom: "10rem",
        marginLeft: "2rem",
        marginRight: "2rem",
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell
              style={{
                fontWeight: "bold",
                backgroundColor: "#1976D2", // Change this to your preferred color
                color: "white",
                textAlign: "center",
              }}
            >
              ID
            </TableCell>
            <TableCell
              style={{
                fontWeight: "bold",
                backgroundColor: "#1976D2",
                color: "white",
                textAlign: "center",
              }}
            >
              Create Date
            </TableCell>
            <TableCell
              style={{
                fontWeight: "bold",
                backgroundColor: "#1976D2",
                color: "white",
                textAlign: "center",
              }}
            >
              Rating
            </TableCell>
            <TableCell
              style={{
                fontWeight: "bold",
                backgroundColor: "#1976D2",
                color: "white",
                textAlign: "center",
              }}
            >
              Content
            </TableCell>
            <TableCell
              style={{
                fontWeight: "bold",
                backgroundColor: "#1976D2",
                color: "white",
                textAlign: "center",
              }}
            >
              User ID
            </TableCell>
            <TableCell
              style={{
                fontWeight: "bold",
                backgroundColor: "#1976D2",
                color: "white",
                textAlign: "center",
              }}
            >
              Product ID
            </TableCell>
            <TableCell
              style={{
                fontWeight: "bold",
                backgroundColor: "#1976D2",
                color: "white",
                textAlign: "center",
              }}
            >
              User Name
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(groupedFeedback).map((id) => (
            <React.Fragment key={id}>
              {groupedFeedback[id].map((feedback, index) => (
                <TableRow key={`${id}-${index}`}>
                  {/* Render the common information only for the first item in the group */}
                  {index === 0 && (
                    <>
                      <TableCell style={{ textAlign: "center" }}>
                        {feedback.id}
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        {feedback.createDate}
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        {feedback.rating}
                      </TableCell>
                    </>
                  )}
                  <TableCell style={{ textAlign: "center" }}>
                    {feedback.content}
                  </TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                    {feedback.userId}
                  </TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                    {feedback.productId}
                  </TableCell>
                  <TableCell style={{ textAlign: "center" }}>
                    {feedback.userName}
                  </TableCell>
                </TableRow>
              ))}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}

export default VoucherList;
