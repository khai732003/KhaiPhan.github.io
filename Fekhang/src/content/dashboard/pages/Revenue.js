// import React, { useState, useEffect } from "react";
// import "../styles/productmanagement.css";
// import customAxios from "../../../CustomAxios/customAxios";
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// const URL = "/doanh-thu";

// const TimeLine = () => {
//   const [revenueData, setRevenueData] = useState([]);

//   const sampleRevenueData = [
//     { data: '2023-01-01', revenue: 1000 },
//     { data: '2023-01-02', revenue: 1200 },
//     { data: '2023-01-03', revenue: 800 },
//     { data: '2023-01-04', revenue: 1500 },
//     { data: '2023-01-05', revenue: 1100 },
//     { data: '2023-01-06', revenue: 1300 },
//     // Thêm các bản ghi khác ở đây
//   ];

//   const getRevenueData = async () => {
//     try {
//       const res = await customAxios.get(URL);
//       setRevenueData(res.data);
//       console.log(res.data);
//     } catch (error) {
//       console.error("Error fetching revenue data:", error);
//     }
//   };

//   useEffect(() => {
//     setRevenueData(sampleRevenueData);
//   }, []);

//   return (
//     <div className="user-management-page" style={{ paddingTop: "100px" }}>
//       <ResponsiveContainer width="100%" height={400}>
//         <LineChart data={revenueData}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="data" />
//           <YAxis />
//           <Tooltip />
//           <Legend />
//           <Line type="monotone" dataKey="revenue" stroke="#8884d8" name="Doanh thu" />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default TimeLine;








import React, { useState, useEffect } from "react";
import "../styles/productmanagement.css";
import customAxios from "../../../CustomAxios/customAxios";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const URL = "/doanh-thu";

const Revenue = () => {
  const [revenueData, setRevenueData] = useState([]);

  const getRevenueData = async () => {
    try {
      const res = await customAxios.get(URL);
      setRevenueData(res.data);
      console.log(res.data);
    } catch (error) {
      console.error("Error fetching revenue data:", error);
    }
  };

  useEffect(() => {
    getRevenueData();
  }, []);

  return (
    <div className="user-management-page" style={{ paddingTop: "100px" }}>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={revenueData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="data" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="revenue" stroke="#8884d8" name="Doanh thu" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Revenue;
