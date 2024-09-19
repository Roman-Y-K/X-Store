import React from 'react';
import { Table } from 'react-bootstrap';

import Message from '../../components/Message';
import Loader from '../../components/Loader';
import OrderItem from './OrderItem';
import { useGetMyOrdersQuery } from '../../slices/ordersApiSlice';

const OrdersHistory = () => {
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();

  return (
    <>
      {' '}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Table striped hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <OrderItem key={order._id} order={order} />
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default OrdersHistory;
