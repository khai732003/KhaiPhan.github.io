import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
} from "@mui/material";
import customAxios from "../../../CustomAxios/customAxios";

function VoucherList() {
  const [voucherList, setVoucherList] = useState([]);
  const [searchCode, setSearchCode] = useState("");

  useEffect(() => {
    // Fetch voucher data from the API
    customAxios
      .get("/voucher/get-all/0")
      .then((response) => response.data)
      .then((data) => setVoucherList(data))
      .catch((error) => console.error("Error fetching voucher data:", error));
  }, []);

  const filteredVouchers = voucherList.filter((voucher) =>
    voucher.code.toLowerCase().includes(searchCode.toLowerCase())
  );

  function formatCurrency(amount) {
    return amount.toLocaleString('en-US');
  }
  return (
    <div style={{ marginLeft: "5rem", marginRight: "9rem", marginBottom: "160px" }}>
      <TableContainer
        component={Paper}
        style={{
          marginTop: "7rem",
          marginBottom: "20rem",
          marginLeft: "2rem",
          marginRight: "2rem",
        }}
      >
        <h3 style={{ textAlign: "center", marginBottom: "1rem" }}>
          List Voucher
        </h3>
        <div
          style={{
            marginRight: "70rem",
            paddingBottom: "1rem",
            marginLeft: "2rem",
          }}
        >
          <TextField
            label="Search by Code"
            variant="outlined"
            fullWidth
            margin="normal"
            value={searchCode}
            onChange={(e) => setSearchCode(e.target.value)}
          />
        </div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                style={{
                  fontWeight: "bold",
                  backgroundColor: "#1976D2",
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
                Code
              </TableCell>
              <TableCell
                style={{
                  fontWeight: "bold",
                  backgroundColor: "#1976D2",
                  color: "white",
                  textAlign: "center",
                }}
              >
                Description
              </TableCell>
              <TableCell
                style={{
                  fontWeight: "bold",
                  backgroundColor: "#1976D2",
                  color: "white",
                  textAlign: "center",
                }}
              >
                Voucher Amount
              </TableCell>
              <TableCell
                style={{
                  fontWeight: "bold",
                  backgroundColor: "#1976D2",
                  color: "white",
                  textAlign: "center",
                }}
              >
                Voucher Type
              </TableCell>
              <TableCell
                style={{
                  fontWeight: "bold",
                  backgroundColor: "#1976D2",
                  color: "white",
                  textAlign: "center",
                }}
              >
                Expiration Date
              </TableCell>
              <TableCell
                style={{
                  fontWeight: "bold",
                  backgroundColor: "#1976D2",
                  color: "white",
                  textAlign: "center",
                }}
              >
                Quantity
              </TableCell>
              <TableCell
                style={{
                  fontWeight: "bold",
                  backgroundColor: "#1976D2",
                  color: "white",
                  textAlign: "center",
                }}
              >
                Available
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredVouchers.map((voucher) => (
              <TableRow key={voucher.id}>
                <TableCell style={{ textAlign: "center" }}>
                  {voucher.id}
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  {voucher.createDate}
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  {voucher.code}
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  {voucher.description}
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  {formatCurrency(voucher.voucherAmount)}
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  {voucher.voucherType}
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  {voucher.expiration_date}
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  {voucher.quantity}
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  {voucher.available ? (
                    <span style={{ color: "green", fontSize: "2em" }}>•</span>
                  ) : (
                    <span style={{ color: "red", fontSize: "2em" }}>•</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default VoucherList;
