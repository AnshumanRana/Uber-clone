import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React from 'react'  

function CheckOutForm({amount}) {
  const stripe = useStripe();
  const elements = useElements();
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if(elements == null) {
      return;
    }
    
    // Fixed destructuring syntax here
    const {error: submitError} = await elements.submit();
    
    if(submitError) {
      return;
    }
    
    const res = await fetch('/api/create-intent', {
      method: 'POST',
      body: JSON.stringify({
        amount: amount
      })
    })
    
    const secretKey = await res.json();
    
    // You're creating a variable 'error' here but not using it correctly
    const result = await stripe.confirmPayment({
      clientSecret: secretKey,
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/"
      }
    })
  }
  
  return (
    <div className='justify-center flex-col text-center flex w-full mt-6'>
      <h2 className='m-5 font-bold'>Amount To Pay: {amount}</h2>
      <form onSubmit={handleSubmit}>
        <PaymentElement/>
        <button className='bg-black w-full text-white rounded-lg p-2 mt-2'>Pay</button>
      </form>
    </div>
  )
}

export default CheckOutForm