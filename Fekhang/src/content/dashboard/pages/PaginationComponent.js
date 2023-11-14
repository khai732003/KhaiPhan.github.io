// PaginationComponent.js
import React from 'react';
import { Pagination } from '@mui/material';

const ITEMS_PER_PAGE = 5;

const PaginationComponent = ({ items, onPageChange }) => {
  const pageCount = Math.ceil(items.length / ITEMS_PER_PAGE);

  const handlePageChange = (event, value) => {
    onPageChange(value);
  };

  return (
    <Pagination
      count={pageCount}
      onChange={handlePageChange}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        marginY: 2,
      }}
      shape="rounded"
      color="primary"
    />
  );
};

export default PaginationComponent;
