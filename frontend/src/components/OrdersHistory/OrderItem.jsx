import React from 'react';
import { Button } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const OrderItem = ({ order }) => {
  return (
    <tr key={order._id}>
      <td>{order._id}</td>
      <td>{order.createdAt.substring(0, 10)}</td>
      <td>{order.totalPrice}</td>
      <td>
        {order.isPaid ? (
          order.paidAt.substring(0, 10)
        ) : (
          <FaTimes style={{ color: 'red' }} />
        )}
      </td>
      <td>
        {order.isDelivered ? (
          order.deliveredAt.substring(0, 10)
        ) : (
          <FaTimes style={{ color: 'red' }} />
        )}
      </td>
      <td>
        <Button
          as={Link}
          to={`/order/${order._id}`}
          className="btn-sm"
          variant="light"
        >
          Details
        </Button>
      </td>
    </tr>
  );
};

export default OrderItem;
