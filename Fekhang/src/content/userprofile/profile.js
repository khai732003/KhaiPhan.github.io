import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { FaSave, FaEdit } from "react-icons/fa";
import customAxios from "../../CustomAxios/customAxios";
import "../userprofile/profile.scss"; // Đảm bảo bạn đặt lại đúng đường dẫn đến file .scss
import { useAuth } from '../SanPham/Context/AuthContext';
import { Link } from "react-router-dom";
import CreateIcon from "@mui/icons-material/Create";
import { Button } from "@mui/material";
const Profile = () => {
  const initialUserProfile = {
    // username: "",
    fullname: "",
    email: "",
    phone: "",
    gender: "",
    address: "",
    image: "",
  };

  const [userprofile, setUserProfile] = useState(initialUserProfile);
  const [isEditMode, setIsEditMode] = useState(false);
  const { user } = useAuth();
  const userId = user.userId;

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUserProfile({ ...userprofile, profileImage: event.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileUpdate = () => {
    setIsEditMode(!isEditMode);
  };

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const response = await customAxios.get(`/user/list/${userId}`); // Thay thế bằng đường dẫn API của bạn
        if (response.status === 200) {
          setUserProfile(response.data);
        } else {
          console.error("Failed to fetch user profile data");
        }
      } catch (error) {
        console.error("Error fetching user profile data:", error);
      }
    };

    loadUserProfile();
  }, [userId]);

  return (
    <Container className="mt-5" style={{ paddingTop: 70 }}>
      <Row style={{padding:'40px 50px 40px 50px', backgroundColor: 'rgb(248,248,255)',borderRadius:'5px'}}>
        {/* Cột bên trái */}
        <Col md={4} className="left-content-profile">
          <div className="text-center">
            <img
              src={userprofile.image}
              alt="Profile"
              className="img-fluid rounded-circle"
            />
            <div className="mt-2">
              <h5>
                <strong>{userprofile.fullname}</strong>
              </h5>
              <br/>
              <p>{userprofile.phone}</p>
              <p>{userprofile.email}</p>
              {/* <p>{userprofile.role.name}</p> */}
            </div>
            {/* <Button
              variant="primary"
              className="button-mt2 custom-btn-profile"
              onClick={handleProfileUpdate}
            >
              {isEditMode ? (
                <>
                  <FaSave /> Save Profile
                </>
              ) : (
                <>
                  <FaEdit /> Change Profile
                </>
              )}
            </Button> */}
          </div>
        </Col>
        {/* Cột bên phải */}
        <Col md={8}>
          <center>
            <h1>Information</h1>
          </center>
          <Container className="information-profile-right">
            <Row>
              <Col md={6}>
                {/* Cột bên trái cho username, fullname, phone number và email */}
                <Form>
                  {/* <Form.Group controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      value={userprofile.username}
                      readOnly
                      disabled={!isEditMode}
                    />
                  </Form.Group> */}
                  <Form.Group controlId="fullName">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={userprofile.fullname}
                      readOnly
                      onChange={(e) =>
                        setUserProfile({ ...userprofile, fullname: e.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      value={userprofile.email}
                      readOnly
                      onChange={(e) =>
                        setUserProfile({ ...userprofile, email: e.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group controlId="phoneNumber">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="tel"
                      value={userprofile.phone}
                      readOnly
                      onChange={(e) =>
                        setUserProfile({ ...userprofile, phone: e.target.value })
                      }
                    />
                  </Form.Group>
                </Form>
              </Col>
              <Col md={6}>
                {/* Cột bên phải cho các trường còn lại */}
                <Form>
                  <Form.Group controlId="phoneNumber">
                    <Form.Label>Gender</Form.Label>
                    <Form.Control
                      type="tel"
                      value={userprofile.gender}
                      readOnly
                      onChange={(e) =>
                        setUserProfile({ ...userprofile, phone: e.target.value })
                      }
                    />
                  </Form.Group>
                  {/* <option>Nam</option>
                      <option>Nữ</option>
                      <option>Others</option> */}
                  <Form.Group controlId="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={userprofile.address}
                      readOnly
                      onChange={(e) =>
                        setUserProfile({ ...userprofile, address: e.target.value })
                      }
                    />
                  </Form.Group>
                  {/* <div className="text-center">
                    <label htmlFor="profileImageUpload" className="custom-file-upload">
                      <input
                        type="file"
                        id="profileImageUpload"
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </label>
                  </div> */}
                  {/* {isEditMode && (
                    <Button variant="primary" onClick={handleProfileUpdate}>
                      Save Changes
                    </Button>
                  )} */}
                  <Link to={`/edit-profile/${userId}`}>
                    <Button 
                    style={{margin:'0px 0 0 0px'}}
                    variant="contained"
                    
                    >Edit Profile
                    </Button>
                  </Link>
                </Form>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;