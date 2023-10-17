import React, {useState, useEffect} from 'react';
import axios from 'axios';

function OrderDetail() {
  const [orderDetails, setOrderDetails] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/cageshop/api/order_detail/list');
        setOrderDetails(response.data);
        console.log(response.data)
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1>Order Details</h1>
      
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Product</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {orderDetails.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.note}</td>  
              <td>{item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrderDetail;