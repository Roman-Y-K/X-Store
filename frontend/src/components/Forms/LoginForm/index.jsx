import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

import Loader from '../../Loader';
import { useLoginMutation } from '../../../slices/usersApiSlice';
import { setCredentials } from '../../../slices/authSlice';

const LoginForm = () => {
  const [loginCreds, setLoginCreds] = useState({});

  const [login, { isLoading }] = useLoginMutation();

  const { search } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const params = new URLSearchParams(search);
  const redirect = params.get('redirect') || '/';

  const handleFormUpdate = (e) => {
    const { name, value } = e.target;
    setLoginCreds((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const { email, password } = loginCreds;

    try {
      const res = await login({ email, password });
      if (res.error) {
        toast.error(res.error?.data?.message || res.error);
        return;
      }

      dispatch(setCredentials({ ...res.data }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <Form onSubmit={submitHandler}>
      <Form.Group className='my-2' controlId='email'>
        <Form.Label>Email Address</Form.Label>
        <Form.Control
          type='email'
          name='email'
          placeholder='Enter email'
          value={loginCreds.email}
          onChange={handleFormUpdate}
        ></Form.Control>
      </Form.Group>

      <Form.Group className='my-2' controlId='password'>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type='password'
          name='password'
          placeholder='Enter password'
          value={loginCreds.password}
          onChange={handleFormUpdate}
        ></Form.Control>
      </Form.Group>

      <Button disabled={isLoading} type='submit' variant='primary'>
        Sign In
      </Button>

      {isLoading && <Loader />}
    </Form>
  );
};

export default LoginForm;
