// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "../styles/home.css"

// const URL = 'https://652aea854791d884f1fd8029.mockapi.io/api/product/v1/staffManagement';

// const Home = () => {

//     const [staffs, setStaffs] = useState([]);
//     const [detailPopup, setDetailPopup] = useState(null);

//     const getListStaff = async () => {
//         const res = await axios.get(`${URL}`);
//         if (res.status === 200) {
//             setStaffs(res.data);
//         }
//     }

//     useEffect(() => {
//         getListStaff();
//     }, []);

//     //Popup
//     const handleViewPopup = (staff) => {
//         setDetailPopup(staff);
//     }

//     const handleClosePopup = () => {
//         setDetailPopup(null);
//     }

//     const getValideDate = (timelap) => {
//         return new Date(timelap * 1000).toLocaleDateString();
//     } 

//     return (
//         <div className="Home-Dashboard-container">
//             {staffs && staffs.map(staff => (
//                 <div className="card-Home-Dashboard-container" key={staff.id}>
//                     <img src={staff.avatar} alt={staff.id} />
//                     <h3>{staff.name}</h3>
//                     <button onClick={() => handleViewPopup(staff)}>Details</button>
//                 </div>
//             ))}

//             {detailPopup && (
//                 <div className="popup-Home-Dashboard-container">
//                     <div className="popup-content">
//                         <div>
//                             <span className="close" onClick={handleClosePopup}>
//                                 &times;
//                             </span>

//                             <img src={detailPopup.avatar} alt={detailPopup.id} />
//                             <h2> ID: {detailPopup.id}</h2>
//                             <p>Name: {detailPopup.name}</p>
//                             <p>Age: {detailPopup.age}</p>
//                             <p>Address: {detailPopup.address}</p>
//                             <p>CreatedAt: {getValideDate(detailPopup.createdAt)}</p>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>

//     )
// }

// export default Home;