import React, { useState, useEffect } from "react";
import "../styles/productmanagement.css";
import customAxios from "../../../CustomAxios/customAxios";

const URL = "/doanh-thu";

const Revenue = () => {
  const [products, setProducts] = useState([]);

  const getListProducts = async () => {
    const res = await customAxios.get(`/doanh-thu`);
    setProducts(res.data);
    console.log(res.data);
  };

  useEffect(() => {
    getListProducts();
  }, []);

  return (
    <div className="user-management-page" style={{ paddingTop: '100px' }}>
      <div className="table-staff-container">
        <table className="user-table" style={{ marginBlock: '100px' }}>
          <thead>
            <tr>
              <th className="user-management-header">Data</th>
            </tr>
          </thead>

          <tbody>
            {products && products.map((product, index) => (
              <tr key={product.id}>
                <td className="user-management-td smaller-text">
                  {product.data}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Revenue;
