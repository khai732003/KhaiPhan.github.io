// import React, { useEffect, useState } from "react";
// import customAxios from "../../CustomAxios/customAxios";

// const PaypalButton = () => {
//   const [sdkLoaded, setSdkLoaded] = useState(false);
//   const [capCode, setCapCode] = useState(null);

//   useEffect(() => {
//     const loadPaypalScript = () => {
//       const script = document.createElement("script");
//       script.type = "text/javascript";
//       script.src = "https://www.paypal.com/sdk/js?client-id=AaWSnvt4rwX5aILA175T8zS02f1ExhM0hC0CJ8qy0dgEHDfrB7z2oP0y5k69gWD3vqXQR_oTuGhsPueL&currency=USD";
//       script.async = true;
//       script.onload = () => setSdkLoaded(true);
//       document.body.appendChild(script);
//     };

//     loadPaypalScript();
//   }, []);

//   const createOrder = async () => {
//     try {
//       const orderData = {
//         link: "ai biet",
//         orderId: 17,
//       };

//       const response = await customAxios.post("http://localhost:8080/api/orders", orderData);
//       const createdCapCode = response.data.id;
//       setCapCode(createdCapCode);
//       return createdCapCode;
//     } catch (error) {
//       console.error("Error creating order:", error);
//       throw error;
//     }
//   };

//   const captureOrder = async (capCode) => {
//     try {
//       const orderData = {
//         link: "ai biet",
//         orderId: 17,
//       };
  
//       const response = await customAxios.post(`/orders/${capCode}/capture`, orderData);
//       return response.data;
  
//     } catch (error) {
//       console.error("Error capturing payment:", error);
//       throw error;
//     }
//   };

//   useEffect(() => {
//     const initializePaypalButton = () => {
//       if (window.paypal && window.paypal.Buttons && sdkLoaded) {
//         window.paypal.Buttons({
//           createOrder: async (data, actions) => {
//             const orderId = await createOrder();
//             return orderId;
//           },
//           onApprove: async (data, actions) => {
//             const orderId = data.orderID;
//             if (capCode) {
//               const orderData = await captureOrder(capCode);
//               console.log("Capture result", orderData);
//               // window.location.href = "http://localhost:3000/paysuccess";
//             } else {
//               console.error("Invalid capCode.");
//             }
//           },
//         }).render("#paypal-button-container");
//       } else {
//         console.error("PayPal SDK not loaded.");
//       }
//     };

//     initializePaypalButton();
//   }, [sdkLoaded, capCode]);

//   return (
//     <div id="paypal-button-container">
//       <div>cccc</div>
//     </div>
//   );
// };

// export default PaypalButton;
