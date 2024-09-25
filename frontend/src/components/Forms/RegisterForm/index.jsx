import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

import Loader from '../../Loader';
import { useRegisterMutation } from '../../../slices/usersApiSlice';
import { setCredentials } from '../../../slices/authSlice';

const RegisterForm = () => {
  const [registerCreds, setRegisterCreds] = useState({});

  const { search } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const params = new URLSearchParams(search);
  const redirect = params.get('redirect') || '/';

  const [register, { isLoading }] = useRegisterMutation();

  const handleFormUpdate = (e) => {
    const { name, value } = e.target;
    setRegisterCreds((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const { name, email, password, confirmPassword } = registerCreds;

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await register({ name, email, password }).unwrap();

        if (res.error) {
          toast.error(res.error?.data?.message || res.error);
          return;
        }

        dispatch(setCredentials({ ...res }));
        navigate(redirect);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <Form onSubmit={submitHandler}>
      <Form.Group className='my-2' controlId='name'>
        <Form.Label>Name</Form.Label>
        <Form.Control
          type='name'
          name='name'
          placeholder='Enter name'
          value={registerCreds.name}
          onChange={handleFormUpdate}
        ></Form.Control>
      </Form.Group>

      <Form.Group className='my-2' controlId='email'>
        <Form.Label>Email Address</Form.Label>
        <Form.Control
          type='email'
          name='email'
          placeholder='Enter email'
          value={registerCreds.email}
          onChange={handleFormUpdate}
        ></Form.Control>
      </Form.Group>

      <Form.Group className='my-2' controlId='password'>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type='password'
          name='password'
          placeholder='Enter password'
          value={registerCreds.password}
          onChange={handleFormUpdate}
        ></Form.Control>
      </Form.Group>
      <Form.Group className='my-2' controlId='confirmPassword'>
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type='password'
          name='confirmPassword'
          placeholder='Confirm password'
          value={registerCreds.confirmPassword}
          onChange={handleFormUpdate}
        ></Form.Control>
      </Form.Group>

      <Button disabled={isLoading} type='submit' variant='primary'>
        Register
      </Button>

      {isLoading && <Loader />}
    </Form>
  );
};

export default RegisterForm;
