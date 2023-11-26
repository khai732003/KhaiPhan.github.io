import React from "react";
import "../footer/footer.scss";
import FooterAdmin from "../content/dashboard/components/FooterAdmin";
import { useLocation } from "react-router-dom";

const Footer = (props) => {
  const location = useLocation();

  const isLoginPage = location.pathname === "/login";
  const isRegisterPage = location.pathname === "/register";
  const isSuccess = location.pathname === "/paysuccess";
  const isUserManager = location.pathname === "/usermanagement";
  const isAdmin = location.pathname === "/admin";
  const isAdminProfile = location.pathname === "/adminprofile";
  const isAddUser = location.pathname === "/add-user";
  const isUpdateUser = /^\/update-user\/\d+$/.test(location.pathname);
  const isRevenue = location.pathname === "/revenue";
  const isTimeLine = location.pathname === "/timeline";
  const isProductManager = location.pathname === "/productmanagement";
  const isStaffManager = location.pathname === "/staffmanagement";
  const isUpdateProduct = /^\/update\/\d+$/.test(location.pathname);
  const isAddProduct = location.pathname === "/addproduct";
  const isAddAccessories = location.pathname === "/addaccessories";
  const isVoucher = location.pathname === "/voucher";
  const isError = location.pathname === "/error";
  const isPaypal = location.pathname === "/paypal";
  // const isListConfirm = location.pathname === "/listconfirm";
  const isUpdateProduct1 = /^\/update-product\/\d+$/.test(location.pathname);
  const isCustomList = location.pathname === "/custom-list";
  const isFeedBack = location.pathname === "/list-feedback";
  const isVoucherList = location.pathname === "/list-voucher";
  const islistdevered = location.pathname === "/listdelivered";
  const isAddShape = location.pathname === "/add-shape";
  const isAddMaterial = location.pathname === "/add-material";
  const isAddSize = location.pathname === "/add-size";
  const isMaterial = location.pathname === "/list-material";
  const isSize = location.pathname === "/list-size";
  const isShape = location.pathname === "/list-shape";
  const isUpdateSize = /^\/update-size\/\d+$/.test(location.pathname);
  const isUpdateShape = /^\/update-shape\/\d+$/.test(location.pathname);  
  const isUpdateMaterial = /^\/update-material\/\d+$/.test(location.pathname);
  const isCustomProductManagement = location.pathname === "/custom-product";
  const isNotConfirm = location.pathname === "/listnotconfirm";
  const isAddEditUser = location.pathname === "/add-edit-user";


  if (isLoginPage || isRegisterPage || isSuccess || isPaypal || isError || isUpdateProduct1) {
    return null;
  }

  if (
    isUserManager || isNotConfirm ||
    isVoucher ||
    isAdmin ||
    isAddUser ||
    isUpdateUser ||
    isRevenue ||
    isProductManager ||
    isAddProduct ||
    isUpdateProduct ||
    isStaffManager ||
    isAdminProfile ||
    isTimeLine ||
    isAddAccessories ||
    // isListConfirm ||
    isUserManager ||
    isVoucher ||
    isAdmin ||
    isAddUser ||
    isUpdateUser ||
    isRevenue ||
    isProductManager ||
    isAddProduct ||
    isUpdateProduct ||
    isStaffManager ||
    isAdminProfile ||
    isTimeLine ||
    isFeedBack ||
    islistdevered ||
    isVoucherList ||
    isCustomList ||
    isAddShape ||
    isAddMaterial ||
    isAddSize ||
    isMaterial ||
    isShape ||
    isSize || isUpdateSize ||
    isUpdateShape ||
    isUpdateMaterial || isCustomProductManagement || isAddEditUser
  ) {
    return <FooterAdmin />;
  }
  return (
    <div className="Foot">
      <footer className="container">
        <div className="row">
          <div className="col-md-4">
            <span>CONTACT INFORMATION</span>
            <p>
              <strong>Address: </strong> Lô E2a-7, Đường D1, Đ. D1, Long Thạnh
              Mỹ, Thành Phố Thủ Đức, Thành phố Hồ Chí Minh 700000
            </p>
            <p>
              {" "}
              <strong>Email: </strong>
              <a href="mailto:hcmuni.fpt.edu.vn">hcmuni.fpt.edu.vn</a>
            </p>
            <p>
              <strong>Phone:</strong> 19009477
            </p>
          </div>
          <div className="col-md-4">
            <span>TIME OPEN</span>
            <p>Monday - Friday: 09:00 AM - 09:00 PM</p>
            <p>Saturday: 09:00 AM - 07:00 PM</p>
            <p>Sunday: Closed</p>
          </div>
          <div className="col-md-4">
            <span> TIME FOR SERVICE</span>
            <p>Monday - Friday: 09:00 AM - 09:00 PM</p>
            <p>Saturday: 09:00 AM - 07:00 PM</p>
            <p>Sunday: Closed</p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
          </div>
          <div className="col-md-4">
            <span>SOCIAL MEDIA</span>
            <div className="social-icons-1">
              <a
                style={{ color: "#0967ff" }}
                href="https://www.facebook.com/FPTU.HCM"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i class="bi bi-facebook"></i>
              </a>
              <a
                style={{ color: "#ff0202" }}
                href="https://www.youtube.com/@FPTUniversityHCM"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i class="bi bi-youtube"></i>
              </a>
            </div>
          </div>
          <div className="col-md-4">
            <iframe
              title="Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.609941530492!2d106.80730807486965!3d10.84113285799728!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752731176b07b1%3A0xb752b24b379bae5e!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBGUFQgVFAuIEhDTQ!5e0!3m2!1svi!2s!4v1695706352214!5m2!1svi!2s"
              width="400"
              height="200"
              style={{ border: "0" }}
              allowFullScreen=""
              aria-hidden="false"
              tabIndex="0"
            ></iframe>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default Footer;
