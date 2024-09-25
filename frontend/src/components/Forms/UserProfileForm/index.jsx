import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

import Loader from '../../Loader';
import { setCredentials } from '../../../slices/authSlice';
import { useProfileMutation } from '../../../slices/usersApiSlice';

const UserProfileForm = () => {
  const [userForm, setUserForm] = useState({});

  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    const { name, email } = userInfo;
    setUserForm({ name, email });
  }, [userInfo]);

  const handleFormUpdate = (e) => {
    const { name, value } = e.target;
    setUserForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, confirmPassword } = userForm;

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await updateProfile({
          // _id: userInfo._id,
          name,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success('Profile updated successfully');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <Form onSubmit={handleFormSubmit}>
      <Form.Group className='my-2' controlId='name'>
        <Form.Label>Name</Form.Label>
        <Form.Control
          name='name'
          type='text'
          placeholder='Enter name'
          value={userForm.name}
          onChange={handleFormUpdate}
        ></Form.Control>
      </Form.Group>

      <Form.Group className='my-2' controlId='email'>
        <Form.Label>Email Address</Form.Label>
        <Form.Control
          name='email'
          type='email'
          placeholder='Enter email'
          value={userForm.email}
          onChange={handleFormUpdate}
        ></Form.Control>
      </Form.Group>

      <Form.Group className='my-2' controlId='password'>
        <Form.Label>Password</Form.Label>
        <Form.Control
          name='password'
          type='password'
          placeholder='Enter password'
          value={userForm.password}
          onChange={handleFormUpdate}
        ></Form.Control>
      </Form.Group>

      <Form.Group className='my-2' controlId='confirmPassword'>
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          name='confirmPassword'
          type='password'
          placeholder='Confirm password'
          value={userForm.confirmPassword}
          onChange={handleFormUpdate}
        ></Form.Control>
      </Form.Group>

      <Button type='submit' variant='primary'>
        Update
      </Button>
      {loadingUpdateProfile && <Loader />}
    </Form>
  );
};

export default UserProfileForm;
