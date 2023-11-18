// import React, { useState } from 'react';
// import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

// function MapComponent() {
//     const [startLocation, setStartLocation] = useState(null);
//     const [endLocation, setEndLocation] = useState(null);

//     const vietnamBounds = {
//         north: 23.4,
//         south: 8.18,
//         west: 102.14,
//         east: 109.46,
//     };

//     const handleMapClick = (event) => {
//         const clickedLocation = {
//             lat: event.latLng.lat(),
//             lng: event.latLng.lng(),
//         };

//         console.log('Clicked Location:', clickedLocation);

//         if (
//             clickedLocation.lat >= vietnamBounds.south &&
//             clickedLocation.lat <= vietnamBounds.north &&
//             clickedLocation.lng >= vietnamBounds.west &&
//             clickedLocation.lng <= vietnamBounds.east
//         ) {
//             if (!startLocation) {
//                 setStartLocation(clickedLocation);
//             } else if (!endLocation) {
//                 setEndLocation(clickedLocation);
//             }
//         } else {
//             alert('Please select a location within Vietnam.');
//         }
//     };

//     const calculateDistance = () => {
//         if (startLocation && endLocation) {
//             // Your distance calculation logic here

//             console.log('Distance calculation logic');
//         }
//     };

//     return (
//         <div style={{ height: '400px', paddingTop: '19rem', backgroundColor:'yellow' }}>
//             <LoadScript googleMapsApiKey="AIzaSyD7s1jXr1Pbvk3IDhclF44xNygmIDjBcfo">
//                 <GoogleMap onClick={handleMapClick} bounds={vietnamBounds}>
//                     {startLocation && <Marker position={startLocation} />}
//                     {endLocation && <Marker position={endLocation} />}
//                 </GoogleMap>

//                 <button onClick={calculateDistance}>Calculate Distance</button>
//             </LoadScript>
//         </div>


//     );
// }

// export default MapComponent;
