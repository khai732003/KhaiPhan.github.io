// import React, { useState } from "react";
// import products from "../data";
// import Button from "@mui/material/Button";
// import DeleteIcon from "@mui/icons-material/Delete";

// function Compare() {
//   const [selectedProducts, setSelectedProducts] = useState([]);

//   const addProduct = (product) => {
//     if (selectedProducts.length < 3 && !selectedProducts.includes(product)) {
//       setSelectedProducts([...selectedProducts, product]);
//     }
//   };

//   const removeProduct = (id) => {
//     setSelectedProducts(
//       selectedProducts.filter((product) => product.id !== id)
//     );
//   };

//   return (
//     <div>
//       <h1>Compare Items</h1>
//       <table>
//         <thead>
//           <tr>
//             <th>Tên sản phẩm</th>
//             <th>Hình ảnh</th>
//             <th></th>
//           </tr>
//         </thead>
//         <tbody>
//           {products.map((product) => (
//             <tr key={product.id}>
//               <td>{product.name}</td>
//               <td>
//                 <img src={product.image} alt={product.name} />
//               </td>
//               <td>
//                 <button onClick={() => addProduct(product)}>Compare</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {selectedProducts.length > 0 && (
//         <table className="table-compare">
//           <thead className="table-compare-header">
//             <tr>
//               <th></th>
//               {selectedProducts.map((product) => (
//                 <th key={product.id}>
//                   <div className="compare-header">
//                     <div>{product.name}</div>
//                     <div className="header-button">
//                       {/* <button onClick={() => removeProduct(product.id)}><DeleteIcon /></button> */}
//                       <Button
//                         variant="outlined"
//                         startIcon={<DeleteIcon />}
//                         onClick={() => removeProduct(product.id)}
//                       >
//                         Delete
//                       </Button>
//                     </div>
//                   </div>
//                 </th>
//               ))}
//             </tr>
//           </thead>

//           <tbody className="table-compare-body">
//             <tr>
//               <td>Image</td>
//               {selectedProducts.map((product) => (
//                 <td key={product.id}>
//                   <img src={product.image} alt={product.name} />
//                 </td>
//               ))}
//             </tr>

//             <tr>
//               <td>Price</td>
//               {selectedProducts.map((product) => (
//                 <td key={product.id}>{product.price}</td>
//               ))}
//             </tr>
//             <tr>
//               <td>Description</td>
//               {selectedProducts.map((product) => (
//                 <td key={product.id}>{product.description}</td>
//               ))}
//             </tr>
//             <tr>
//               <td>Condition</td>
//               {selectedProducts.map((product) => (
//                 <td key={product.id}>{product.condition}</td>
//               ))}
//             </tr>
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }

// export default Compare;


import React, { useState } from 'react';
import ProductSelect from './ProductSelect';
import products from './data';
import '../compare/Compare.scss'
import Header from '../../../header/Header';
import Footer from '../../../footer/Footer';
// import axios from 'axios';


const Compare = () => {
  const [selected1, setSelected1] = useState(0);
  const [selected2, setSelected2] = useState(0);
  const [selected3, setSelected3] = useState(0);

  // useEffect(() => {
  //   axios.get('YOUR_API_ENDPOINT_HERE')
  //     .then(response => {
  //       setProducts(response.data);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching data:', error);
  //     });
  // }, []);

  return (
    <>
      <Header />
      <div className="container-compare-page">
        <h1 className="display-compare my-compare text-center">Compare Page </h1>
        <div className="col-table-compare mx-auto">
          <table className="table-compare-page">
            <thead>
              <tr className="select-btn-compare-page">
                <th>Select Product</th>
                <th width="300px">
                  <ProductSelect products={products} value={selected1} onChange={setSelected1} />
                </th>
                <th width="300px">
                  <ProductSelect products={products} value={selected2} onChange={setSelected2} />
                </th>
                <th width="300px">
                  <ProductSelect products={products} value={selected3} onChange={setSelected3} />
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Product Image</th>
                <td className='img-compare-table'><img src={products[selected1].image} alt={products[selected1].title} style={{ width: '100%', height: '250px', objectFit: 'contain' }} /></td>
                <td className='img-compare-table'><img src={products[selected2].image} alt={products[selected2].title} style={{ width: '100%', height: '250px', objectFit: 'contain' }} /></td>
                <td className='img-compare-table'><img src={products[selected3].image} alt={products[selected3].title} style={{ width: '100%', height: '250px', objectFit: 'contain' }} /></td>
              </tr>
              <tr>
                <th>Product Price</th>
                <td>{products[selected1].price}</td>
                <td>{products[selected2].price}</td>
                <td>{products[selected3].price}</td>
              </tr>
              <tr>
                <th>Product Description</th>
                <td>{products[selected1].name}</td>
                <td>{products[selected2].name}</td>
                <td>{products[selected3].name}</td>
              </tr>
              <tr>
                <th>Product Brand</th>
                <td>{products[selected1].brand}</td>
                <td>{products[selected2].brand}</td>
                <td>{products[selected3].brand}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Compare;


