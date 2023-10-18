import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { GoogleMap, LoadScript, useLoadScript } from '@react-google-maps/api';
import Capcha from './Capcha';


const mapContainer = {
  width: '100%',
  height: '100vh'
};

const center = {
  lat: 10.755882,
  lng: 106.722446
};

export default function ContactPage() {
  const{isLoading} = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

if(!isLoading) return <div>Loading...</div>
return <Map/>;
}

function Map(){
  return <GoogleMap zoom={10} center={{lat: 44, lng: -80}} mapContainerClassName='map-container'></GoogleMap>
}

//   return (
//     // <Container>
//     //   <h1>LIÊN HỆ</h1><hr/>
//     //   <p>Công ty TNHH Đầu tư Motors là một trong những công ty đi đầu trong lĩnh vực kinh doanh xe đạp điện, xe máy điện có hệ thống showroom trải rộng trên khắp địa bàn Hồ Chí Minh. Sau khi thành lập Công ty, Motors đã không ngừng tiến hóa toàn bộ bộ máy tổ chức, cải tiến công nghệ, đầu tư trang thiết bị đem lại hiệu quả cao nhất cho công việc.</p>
//     //   <Row>
//     //     <Col lg={6}>
          
//     //     </Col>
//     //     <Col lg={6}>
//     //       <h4>GỬI LIÊN HỆ</h4>
//     //       <Form>
//     //         <Capcha/>
//     //         <Button variant="primary" type="submit">
//     //           GỬI
//     //         </Button>
//     //       </Form>
//     //     </Col>
//     //   </Row>
//     // </Container>

//     <div>Map</div>
//   );
// }

