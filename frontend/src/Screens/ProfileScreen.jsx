import React from 'react';
import { Row, Col } from 'react-bootstrap';

import UserProfileForm from '../components/UserProfileForm';
import OrdersHistory from '../components/OrdersHistory';

const ProfileScreen = () => {
  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        <UserProfileForm />
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>

        <OrdersHistory />
      </Col>
    </Row>
  );
};

export default ProfileScreen;
