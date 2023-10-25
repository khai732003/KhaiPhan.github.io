import React from 'react';
import '../Trangchu/Ad.scss'

const WhyChooseUs = () => {
  return (
    <div className='Whyus' style={{ backgroundImage: 'url("https://media.istockphoto.com/id/1443260733/vi/anh/r%C3%B2-r%E1%BB%89-%C3%A1nh-s%C3%A1ng-tuy%E1%BB%87t-%C4%91%E1%BA%B9p-y%E1%BA%BFu-t%E1%BB%91-thi%E1%BA%BFt-k%E1%BA%BF-l%E1%BB%9Bp-ph%E1%BB%A7-bokeh-%E1%BB%91ng-k%C3%ADnh.jpg?s=2048x2048&w=is&k=20&c=y1De5LnrcEUijtS6atRIAOpDLRcvqcKZjf13z-Tmz30=")' }}>
      <h2 className="text-center"><strong>TẠI SAO <span style={{ color: '#cc6119' }}>CHỌN CHÚNG TÔI</span></strong></h2>

      <div className='Container-W'>

        {/* First Column */}
        <div className="card">
          <div className="d-flex align-items-center">
            <i className="bi bi-truck"></i>
            <div className='content'>
              <h6>Giao hàng tận nơi</h6>
              <h6>Đảm bảo 100%</h6>
            </div>
          </div>
        </div>

        {/* Second Column */}
        <div className="card">
          <div className="d-flex align-items-center">
            <i class="bi bi-box2-heart"></i>
            <div className='content'>
              <h6>Thẻ quà tặng đặc biệt</h6>
              <h6>Quà tặng hấp dẫn đi kèm</h6>
            </div>
          </div>
        </div>

        {/* Third Column */}
        <div className="card">
          <div className="d-flex align-items-center">
            <i class="bi bi-telephone"></i>
            <div className='content'>
              <h6>Dịch vụ khách hàng 24/7</h6>
              <h6>Gọi cho chúng tôi 24/7</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
