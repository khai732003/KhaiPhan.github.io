import React from 'react';

const Filter = ({ brands, colors, selectedBrand, setSelectedBrand, /*... các props khác */ }) => (
  <div className="col-md-3">
    {/* Bộ lọc thương hiệu, màu sắc, khoảng giá... */}
    {/* Ví dụ về bộ lọc thương hiệu: */}
    <select value={selectedBrand} onChange={e => setSelectedBrand(e.target.value)}>
      <option value="">Tất cả thương hiệu</option>
      {brands.map(brand => <option key={brand} value={brand}>{brand}</option>)}
    </select>
    {/* Thêm bộ lọc màu sắc và khoảng giá tương tự */}
  </div>
);

export default Filter;
