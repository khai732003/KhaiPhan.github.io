// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const ProductDetail = ({ match }) => {
//   const [product, setProduct] = useState({});
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       const apiUrl = `https://652aea854791d884f1fd8029.mockapi.io/api/product/v1/news/${match.params.code}`;
//       try {
//         const response = await axios.get(apiUrl);
//         setProduct(response.data);
//         setIsLoading(false);
//       } catch (error) {
//         console.error("Lỗi khi lấy dữ liệu:", error);
//         setIsLoading(false);
//       }
//     };

//     fetchProduct();
//   }, [match.params.code]);

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h1>{product.name}</h1>
//       {/* ... (display other product details) */}
//     </div>
//   );
// };

// export default ProductDetail;
