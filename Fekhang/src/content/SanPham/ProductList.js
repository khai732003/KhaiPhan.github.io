import React, { useState } from 'react';

function ProductComparison() {
  const [product1, setProduct1] = useState(null);
  const [product2, setProduct2] = useState(null);

  const products = [
    {
      id: 1,
      name: 'Sản phẩm 1',
      price: 100,
      config: 'Cấu hình sản phẩm 1',
      color: 'Màu sắc sản phẩm 1',
    },
    {
      id: 2,
      name: 'Sản phẩm 2',
      price: 150,
      config: 'Cấu hình sản phẩm 2',
      color: 'Màu sắc sản phẩm 2',
    },
    {
        id: 3,
        name: 'Sản phẩm 3',
        price: 150,
        config: 'Cấu hình sản phẩm 2',
        color: 'Màu sắc sản phẩm 2',
      },
      {
        id: 4,
        name: 'Sản phẩm 4',
        price: 150,
        config: 'Cấu hình sản phẩm 2',
        color: 'Màu sắc sản phẩm 2',
      },
    // Thêm các sản phẩm khác
  ];

  const selectProduct = (product) => {
    if (!product1) {
      setProduct1(product);
    } else if (!product2) {
      setProduct2(product);
    }
  };

  const resetSelection = () => {
    setProduct1(null);
    setProduct2(null);
  };

  return (
    <div>
      <h2>Danh sách sản phẩm</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <div>
              <strong>{product.name}</strong>
            </div>
            <div>Giá: {product.price}</div>
            <div>Cấu hình: {product.config}</div>
            <div>Màu sắc: {product.color}</div>
            <button onClick={() => selectProduct(product)}>Chọn sản phẩm để so sánh</button>
          </li>
        ))}
      </ul>

      {/* Nút Reset */}
      <button onClick={resetSelection}>Xóa lựa chọn</button>

      {/* Hiển thị thông tin so sánh */}
      {product1 && product2 && (
        <div>
          <h2>So sánh sản phẩm</h2>
          <div>
            <strong>Sản phẩm 1:</strong> {product1.name}
          </div>
          <div>Giá: {product1.price}</div>
          <div>Cấu hình: {product1.config}</div>
          <div>Màu sắc: {product1.color}</div>
          <hr />
          <div>
            <strong>Sản phẩm 2:</strong> {product2.name}
          </div>
          <div>Giá: {product2.price}</div>
          <div>Cấu hình: {product2.config}</div>
          <div>Màu sắc: {product2.color}</div>
        </div>
      )}
    </div>
  );
}

export default ProductComparison;
