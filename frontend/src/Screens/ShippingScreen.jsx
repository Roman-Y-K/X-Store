import React from 'react';

import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import ShippingForm from '../components/Forms/ShippingForm';

const ShippingScreen = () => {
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>
      <ShippingForm />
    </FormContainer>
  );
};

export default ShippingScreen;
