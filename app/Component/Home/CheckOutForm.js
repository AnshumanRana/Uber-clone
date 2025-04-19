'use client';
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react';

function CheckOutForm({ amount }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);
    setErrorMessage(null);

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/create-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: Math.round(amount) }),
      });

      const response = await res.json();

      if (!response.clientSecret) {
        setErrorMessage('Failed to retrieve client secret');
        setLoading(false);
        return;
      }

      const result = await stripe.confirmPayment({
        clientSecret: response.clientSecret,
        elements,
        confirmParams: {
          return_url: 'http://localhost:3000/success', // or your deployed URL
        },
      });

      if (result.error) {
        setErrorMessage(result.error.message);
      }
    } catch (err) {
      console.error('Error during payment process:', err);
      setErrorMessage('Payment failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="justify-center flex-col text-center flex w-full mt-6 max-w-md mx-auto">
      <h2 className="m-5 font-bold text-xl">Amount To Pay: ₹{amount}</h2>
      <form onSubmit={handleSubmit}>
        <PaymentElement />
        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
        <button
          disabled={!stripe || !elements || loading}
          className={`w-full rounded-lg p-2 mt-4 text-white ${
            loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-black hover:bg-gray-800'
          }`}
        >
          {loading ? 'Processing...' : 'Pay'}
        </button>
      </form>
    </div>
  );
}

export default CheckOutForm;
