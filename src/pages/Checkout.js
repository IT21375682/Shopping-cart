import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import './checkout.css';


const paymentMethods = [
  { value: 'paypal', label: 'PayPal' },
  { value: 'card', label: 'Credit/Debit Card' },
];

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paypalQR, setPaypalQR] = useState('');
  const [cardDetailsSubmitted, setCardDetailsSubmitted] = useState(false);

  const formik = useFormik({
    initialValues: {
      streetAddress: '',
      district: '',
      phone: '',
      cardNumber: '',
      cardName: '',
      cvv: '',
      expirationDate: '',
    },
    validationSchema: Yup.object().shape({
      streetAddress: Yup.string().required('Street Address is required'),
      district: Yup.string().required('District is required'),
      phone: Yup.string()
        .matches(/^\d{10}$/, 'Invalid phone number')
        .required('Phone Number is required'),
      cardNumber: Yup.string().when('paymentMethod', {
        is: 'card',
        then: Yup.string().required('Card number is required'),
      }),
      cardName: Yup.string().when('paymentMethod', {
        is: 'card',
        then: Yup.string().required('Cardholder name is required'),
      }),
      cvv: Yup.string().when('paymentMethod', {
        is: 'card',
        then: Yup.string().required('CVV is required'),
      }),
      expirationDate: Yup.string().when('paymentMethod', {
        is: 'card',
        then: Yup.string().required('Expiration date is required'),
      }),
    }),
    onSubmit: async values => {
      try {
        // Send checkout information to the backend based on the selected payment method
        const orderData = {
          ...values,
          paymentMethod,
        };

        if (paymentMethod === 'paypal') {
          // Handle PayPal payment submission
          // This is a placeholder, replace it with actual logic to process PayPal payment
          console.log('Submitting PayPal payment:', orderData);
        } else if (paymentMethod === 'card') {
          // Handle card payment submission
          // This is a placeholder, replace it with actual logic to process card payment
          console.log('Submitting card payment:', orderData);
        }

        alert('Order placed successfully');
        // Optionally, redirect the user to the homepage or display a success message
      } catch (error) {
        console.error(error);
      }
    },
  });

  const handlePaymentMethodChange = event => {
    const selectedMethod = event.target.value;
    setPaymentMethod(selectedMethod);
    if (selectedMethod === 'paypal') {
      // Fetch PayPal QR code from the server
      // This is a placeholder, replace it with actual logic to fetch the QR code
      setPaypalQR('../Images/QR_Code_example.png');
    } else {
      setPaypalQR(''); // Clear PayPal QR code
    }
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label htmlFor="streetAddress">Street Address</label>
        <input
          id="streetAddress"
          name="streetAddress"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.streetAddress}
        />
        {formik.errors.streetAddress ? <div>{formik.errors.streetAddress}</div> : null}
      </div>
      <div>
        <label htmlFor="district">District</label>
        <input
          id="district"
          name="district"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.district}
        />
        {formik.errors.district ? <div>{formik.errors.district}</div> : null}
      </div>
      <div>
        <label htmlFor="phone">Phone Number</label>
        <input
          id="phone"
          name="phone"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.phone}
        />
        {formik.errors.phone ? <div>{formik.errors.phone}</div> : null}
      </div>
      <div>
        <label htmlFor="paymentMethod">Payment Method</label>
        <select
          id="paymentMethod"
          name="paymentMethod"
          onChange={handlePaymentMethodChange}
          value={paymentMethod}
        >
          <option value="">Select Payment Method</option>
          {paymentMethods.map(method => (
            <option key={method.value} value={method.value}>{method.label}</option>
          ))}
        </select>
      </div>
      {paymentMethod === 'paypal' && paypalQR && (
        <div>
          <p>Scan the QR code to complete your payment:</p>
          <img src={paypalQR} alt="PayPal QR Code" />
        </div>
      )}
      {paymentMethod === 'card' && (
        <div>
          <h3>Enter Card Details</h3>
          <div>
            <label htmlFor="cardNumber">Card Number</label>
            <input
              id="cardNumber"
              name="cardNumber"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.cardNumber}
            />
            {formik.errors.cardNumber ? <div>{formik.errors.cardNumber}</div> : null}
          </div>
          <div>
            <label htmlFor="cardName">Cardholder Name</label>
            <input
              id="cardName"
              name="cardName"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.cardName}
            />
            {formik.errors.cardName ? <div>{formik.errors.cardName}</div> : null}
          </div>
          <div>
            <label htmlFor="cvv">CVV</label>
            <input
              id="cvv"
              name="cvv"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.cvv}
            />
            {formik.errors.cvv ? <div>{formik.errors.cvv}</div> : null}
          </div>
          <div>
            <label htmlFor="expirationDate">Expiration Date</label>
            <input
              id="expirationDate"
              name="expirationDate"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.expirationDate}
            />
            {formik.errors.expirationDate ? <div>{formik.errors.expirationDate}</div> : null}
          </div>
        </div>
      )}
      <button type="submit">Place Order</button>
    </form>
  );
};

export default Checkout;
