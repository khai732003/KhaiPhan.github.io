
// import React, { useState,useEffect} from 'react';
// import Carousel from 'react-bootstrap/Carousel';
// import Typography from '@mui/material/Typography';
// import '../tintuc/slideshow.scss'
// import { Link } from 'react-router-dom';
// import listOfnews from '../../share/listOfnews';
// const ImageSlider = () => {
//     const [newsData, setNewsData] = useState([]);

//     useEffect(() => {
//         fetch('https://652b64fe4791d884f1fdc2d3.mockapi.io/swp/news')
//             .then((response) => response.json())
//             .then((data) => {
//                 if (Array.isArray(data)) {
//                     // Ensure data is an array
//                     setNewsData(data);
//                 } else {
//                     console.error('Data from API is not an array:', data);
//                 }
//             })
//             .catch((error) => console.error('Error fetching data:', error));
//     }, []);
//     return (
//         <>
//             <div className='container-news'>
//                 <Carousel className='slideshow-news' controls={false}>
//                     {newsData.map((src, index) => (
//                         <Carousel.Item key={index}>
//                             <img
//                                 src={src.img}
//                                 alt={`Slide ${index + 1}`}
//                             />
//                             <div className='S-content'>
//                                 <Link to={`newsdetail/${src.id}`} style={{ textDecoration: 'none' }}>
//                                     <span id='news-d'>{src.date}</span>
//                                     <span id='news-l'>{src.title}</span>
//                                     <span id='news-short'>{src.shortinfo}</span>
//                                 </Link>
//                             </div>
//                         </Carousel.Item>
//                     ))}
//                 </Carousel>
//             </div>
//         </>
//     );
// };
