import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { saveShippingAddress } from '../../../slices/cartSlice';

const ShippingForm = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [shippingForm, setShippingForm] = useState({ ...shippingAddress });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFormUpdate = (e) => {
    const { name, value } = e.target;
    setShippingForm((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(saveShippingAddress({ ...shippingForm }));
    navigate('/payment');
  };

  return (
    <Form onSubmit={submitHandler}>
      <Form.Group className='my-2' controlId='address'>
        <Form.Label>Address</Form.Label>
        <Form.Control
          type='text'
          name='address'
          placeholder='Enter address'
          value={shippingForm.address}
          required
          onChange={handleFormUpdate}
        ></Form.Control>
      </Form.Group>

      <Form.Group className='my-2' controlId='city'>
        <Form.Label>City</Form.Label>
        <Form.Control
          type='text'
          name='city'
          placeholder='Enter city'
          value={shippingForm.city}
          required
          onChange={handleFormUpdate}
        ></Form.Control>
      </Form.Group>

      <Form.Group className='my-2' controlId='postalCode'>
        <Form.Label>Postal Code</Form.Label>
        <Form.Control
          type='text'
          name='postalCode'
          placeholder='Enter postal code'
          value={shippingForm.postalCode}
          required
          onChange={handleFormUpdate}
        ></Form.Control>
      </Form.Group>

      <Form.Group className='my-2' controlId='country'>
        <Form.Label>Country</Form.Label>
        <Form.Control
          type='text'
          name='country'
          placeholder='Enter country'
          value={shippingForm.country}
          required
          onChange={handleFormUpdate}
        ></Form.Control>
      </Form.Group>

      <Button type='submit' variant='primary'>
        Continue
      </Button>
    </Form>
  );
};

export default ShippingForm;
