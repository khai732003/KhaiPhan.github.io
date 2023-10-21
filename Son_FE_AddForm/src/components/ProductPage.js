// // ProductPage.js
// import React from 'react';
// import './ProductPage.css';
// import Filter from './Filter';
// import Main from './Main';

// const ProductPage = ({ products }) => {
//     const [filteredProducts, setFilteredProducts] = useState(products);
// const [selectedBrand, setSelectedBrand] = useState('');
// const [selectedColor, setSelectedColor] = useState('');
// const [priceRange, setPriceRange] = useState({ min: 0, max: 10000000 });

//     return (
//         <div className="container mt-4">
//             <div className="row">
//                 <div className="col-md-9">
//                     <div className="row">
//                         {products.map(product => (
//                             <div className="col-md-4 mb-4" key={product.id}>
//                                 <div className="card product-card">
//                                     <img src={product.image} alt={product.name} className="card-img-top"/>
//                                     <div className="card-body">
//                                         {/* <h5 className="card-title">{product.name}</h5> */}
//                                         <p className="card-text">{product.price}</p>
//                                         <button className="btn btn-primary">Thêm vào giỏ</button>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//                 <div className="col-md-3">
//                     <div className="mb-4">
//                         <h4>Thương hiệu</h4>
//                         <ul className="list-group">
//                             {/* Có thể thêm danh sách thương hiệu từ props hoặc từ API */}
//                             <li className="list-group-item">Thương hiệu A</li>
//                             <li className="list-group-item">Thương hiệu B</li>
//                         </ul>
//                     </div>
//                     <div>
//                         <h4>Bộ lọc</h4>
//                         <Main/>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default ProductPage;
