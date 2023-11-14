
// import React, { useState, useEffect } from 'react';
// import Container from '@mui/material/Container';
// import Paper from '@mui/material/Paper';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemText from '@mui/material/ListItemText';
// import CircularProgress from '@mui/material/CircularProgress';
// import '../tintuc/listitem.scss';
// import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
// import { Link } from 'react-router-dom';

// const NewsPage = () => {
//   const [newsData, setNewsData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const ITEMS_PER_PAGE = 3; // Number of items per page

//   useEffect(() => {
//     fetch('https://652b64fe4791d884f1fdc2d3.mockapi.io/swp/news')
//       .then((response) => response.json())
//       .then((data) => {
//         if (Array.isArray(data)) {
//           setNewsData(data);
//         } else {
//           console.error('Data from API is not an array:', data);
//         }
//       })
//       .catch((error) => console.error('Error fetching data:', error))
//       .finally(() => {
//         setLoading(false);
//       });
//   }, []);

//   // Calculate the index range for the current page
//   const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
//   const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
//   const currentItems = newsData.slice(indexOfFirstItem, indexOfLastItem);

//   const pageNumbers = [];
//   for (let i = 1; i <= Math.ceil(newsData.length / ITEMS_PER_PAGE); i++) {
//     pageNumbers.push(i);
//   }

//   return (
//     <Container maxWidth="md" className='Container-n'>
//       <Paper elevation={3} style={{ margin: '120px 0 50px 0', boxShadow: 'none', backgroundColor: 'rgb(235, 239, 242)' }} className='list-news'>
//         {loading ? (
//           <div className="loading-indicator">
//             <CircularProgress />
//           </div>
//         ) : (
//           <>
//             <List>
//               {currentItems.map((news, index) => (
//                 <ListItem key={index}>
//                   <Link to={`newsdetail/${news.id}`} style={{ textDecoration: 'none' }}>
//                     <div className='news-c'>
//                       <img alt={`News ${index + 1}`} src={news.img} />
//                       <div className='news-icon'>
//                         <span id='news-hot-icon'>Mới <LocalFireDepartmentIcon fontSize="small" /></span>
//                         <span id='news-date'>{news.date}</span>
//                       </div>
//                       <ListItemText
//                         className='ct-n'
//                         primary={<span id='content-news'>{news.title}</span>}
//                       />
//                     </div>
//                   </Link>
//                 </ListItem>
//               ))}
//             </List>
//             {pageNumbers.length > 10 ? (
//               <div className="pagination" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//                 {currentPage >= 1 && (
//                   <span key={1} className={`page-number ${currentPage === 1 ? 'active-page' : ''}`}>
//                     <button onClick={() => setCurrentPage(1)}>1</button>
//                   </span>
//                 )}
//                 <span style={{color:'#626264'}}>...</span>
//                 {currentPage > 2 && (
//                   <span key={currentPage - 1} className="page-number">
//                     <button onClick={() => setCurrentPage(currentPage - 1)}>{currentPage - 1}</button>
//                   </span>
//                 )}
//                 {currentPage > 1 && ( // Check if current page is not the first page
//                   <span key={currentPage} className={`page-number ${currentPage === currentPage ? 'active-page' : ''}`}>
//                     <button onClick={() => setCurrentPage(currentPage)}>{currentPage}</button>
//                   </span>
//                 )}

//                 {currentPage < pageNumbers.length - 1 && (
//                   <span key={currentPage + 1} className={`page-number ${currentPage === currentPage + 1 ? 'active-page' : ''}`}>
//                     <button onClick={() => setCurrentPage(currentPage + 1)}>{currentPage + 1}</button>
//                   </span>
//                 )}
//                 <span  style={{color:'#626264'}}>...</span>
//                 {currentPage < pageNumbers.length && (
//                   <span key={pageNumbers.length} className={`page-number ${currentPage === pageNumbers.length ? 'active-page' : ''}`}>
//                     <button onClick={() => setCurrentPage(pageNumbers.length)}>{pageNumbers.length}</button>
//                   </span>
//                 )}
//               </div>
//             ) : (
//               <div className="pagination">
//                 {pageNumbers.map((number) => (
//                   <span key={number} className={`page-number ${currentPage === number ? 'active-page' : ''}`}>
//                     <button onClick={() => setCurrentPage(number)}>{number}</button>
//                   </span>
//                 ))}
//               </div>
//             )}
//           </>
//         )}
//       </Paper>
//     </Container>
//   );
// };

// export default NewsPage;

// File: listitem.js
// import React, { useState, useEffect } from 'react';
// import Paper from '@mui/material/Paper';
// import './listitem.scss';

// const ITEMS_PER_PAGE = 3;

// const ListItemComponent = ({ title, img, shortInfo }) => {
//   return (
//     <Paper elevation={3} className="list-item-container">
//       <img src={img} alt={title} />
//       <div className="info-container">
//         <div className="title">{title}</div>
//         <div className="short-info">{shortInfo}</div>
//       </div>
//     </Paper>
//   );
// };

// const ListItem = () => {
//   const [newsData, setNewsData] = useState(listOfnews);
//   const [loading, setLoading] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);

//   const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
//   const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
//   const currentItems = newsData.slice(indexOfFirstItem, indexOfLastItem);

//   const pageNumbers = Array.from({ length: Math.ceil(newsData.length / ITEMS_PER_PAGE) }, (_, index) => index + 1);

//   const renderItems = () => {
//     return currentItems.map((item, index) => (
//       <ListItemComponent
//         key={index}
//         title={item.title}
//         img={item.img}
//         shortInfo={item.shortinfo}
//       />
//     ));
//   };

//   const renderPageNumbers = () => {
//     return pageNumbers.map(number => (
//       <span key={number} className={`page-number ${currentPage === number ? 'active-page' : ''}`}>
//         <button onClick={() => setCurrentPage(number)}>{number}</button>
//       </span>
//     ));
//   };

//   return (
//     <div>
//       {loading ? (
//         <div className="loading-indicator">Loading...</div>
//       ) : (
//         <>
//           {renderItems()}
//           <div className="pagination">{renderPageNumbers()}</div>
//         </>
//       )}
//     </div>
//   );
// };

// export default ListItem;

