// File: listitem.js
import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import './listitem.scss';

const ITEMS_PER_PAGE = 3;

const ListItemComponent = ({ title, img, shortInfo }) => {
  return (
    <Paper elevation={3} className="list-item-container">
      <img src={img} alt={title} />
      <div className="info-container">
        <div className="title">{title}</div>
        <div className="short-info">{shortInfo}</div>
      </div>
    </Paper>
  );
};

const ListItem = () => {
  const [newsData, setNewsData] = useState(listOfnews);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = newsData.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = Array.from({ length: Math.ceil(newsData.length / ITEMS_PER_PAGE) }, (_, index) => index + 1);

  const renderItems = () => {
    return currentItems.map((item, index) => (
      <ListItemComponent
        key={index}
        title={item.title}
        img={item.img}
        shortInfo={item.shortinfo}
      />
    ));
  };

  const renderPageNumbers = () => {
    return pageNumbers.map(number => (
      <span key={number} className={`page-number ${currentPage === number ? 'active-page' : ''}`}>
        <button onClick={() => setCurrentPage(number)}>{number}</button>
      </span>
    ));
  };

  return (
    <div>
      {loading ? (
        <div className="loading-indicator">Loading...</div>
      ) : (
        <>
          {renderItems()}
          <div className="pagination">{renderPageNumbers()}</div>
        </>
      )}
    </div>
  );
};

export default ListItem;
