import React, { useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import '../userprofile/profile.scss';
import { FaSave, FaEdit } from 'react-icons/fa';


const Profile = () => {
  const initialUser = {
    username: 'john_doe',
    fullName: 'John Doe',
    email: 'john@example.com',
    phoneNumber: '123-456-7890',
    gender: 'Male',
    address: '123 Main St, City',
    profileImage: 'path_to_profile_image.jpg',
  };

  const [user, setUser] = useState(initialUser);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleImageUpload = (e) => {
    // Handle image upload logic here
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUser({ ...user, profileImage: event.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileUpdate = () => {
    // Handle profile update logic here

    // For demo purposes, let's just toggle the edit mode
    setIsEditMode(!isEditMode);
  };

  return (
    <Container className="mt-5">
      <Row>
        {/* Left Side */}
        <Col md={4} className='left-content'>
          <div className="text-center">
            <img
              src={user.profileImage}
              alt="Profile"
              className="img-fluid rounded-circle"
            />
            <div className="mt-2">
              <h5> <strong>{user.fullName}</strong></h5>
              <p>{user.email}</p>
            </div>
            <Button
              variant="primary"
              className="button-mt2 custom-btn"
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
            </Button>
          </div>
        </Col>
        {/* Middle */}
        <Col md={5}>
          <center>
            <h1>Information</h1>
          </center>
          <Form>
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={user.username}
                readOnly
                disabled={!isEditMode}
              />
            </Form.Group>
            <Form.Group controlId="fullName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                value={user.fullName}
                onChange={(e) => setUser({ ...user, fullName: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="phoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="tel"
                value={user.phoneNumber}
                onChange={(e) => setUser({ ...user, phoneNumber: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="gender">
              <Form.Label>Gender</Form.Label>
              <Form.Control
                as="select"
                value={user.gender}
                onChange={(e) => setUser({ ...user, gender: e.target.value })}
              >
                <option>Male</option>
                <option>Female</option>
                <option>Others</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={user.address}
                onChange={(e) => setUser({ ...user, address: e.target.value })}
              />
            </Form.Group>
            <div className="text-center">
              <label htmlFor="profileImageUpload" className="custom-file-upload">
                <input
                  type="file"
                  id="profileImageUpload"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </label>
              <img
                src={user.profileImage}
                alt="Profile"
                className="img-fluid rounded-circle mt-3"
              />
            </div>
            {isEditMode && (
              <Button variant="primary" onClick={handleProfileUpdate}>
                Save Changes
              </Button>
            )}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
