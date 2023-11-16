import React from 'react';
import '../Trangchu/Ad.scss'

const WhyChooseUs = () => {
  return (
    <div className='Whyus' style={{ backgroundImage: 'url("https://media.istockphoto.com/id/1443260733/vi/anh/r%C3%B2-r%E1%BB%89-%C3%A1nh-s%C3%A1ng-tuy%E1%BB%87t-%C4%91%E1%BA%B9p-y%E1%BA%BFu-t%E1%BB%91-thi%E1%BA%BFt-k%E1%BA%BF-l%E1%BB%9Bp-ph%E1%BB%A7-bokeh-%E1%BB%91ng-k%C3%ADnh.jpg?s=2048x2048&w=is&k=20&c=y1De5LnrcEUijtS6atRIAOpDLRcvqcKZjf13z-Tmz30=")' }}>
      <h2 className="text-center"><strong>WHY <span style={{ color: '#cc6119' }}>CHOOSE US</span></strong></h2>

      <div className='Container-W'>

        {/* First Column */}
        <div className="card">
          <div className="d-flex align-items-center">
            <i className="bi bi-truck"></i>
            <div className='content'>
              <h6>Delivery,Door-to-Door.</h6>
              <h6>100% Guaranteed%</h6>
            </div>
          </div>
        </div>

        {/* Second Column */}
        <div className="card">
          <div className="d-flex align-items-center">
            <i className="bi bi-box2-heart"></i>
            <div className='content'>
              <h6>Special gift cards</h6>
              <h6>Attractive gifts included</h6>
            </div>
          </div>
        </div>

        {/* Third Column */}
        <div className="card">
          <div className="d-flex align-items-center">
            <i className="bi bi-telephone"></i>
            <div className='content'>
              <h6>24/7 customer service</h6>
              <h6>Call us 24/7</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
