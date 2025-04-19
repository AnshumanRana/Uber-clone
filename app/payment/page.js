"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";
import CheckOutForm from "../Component/Home/CheckOutForm";

function PaymentComponent() {
  const searchParams = useSearchParams();
  const amount = searchParams.get("amount");

  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHER_KEY);

  const options = {
    mode: "payment",
    amount: Math.round(amount * 100),
    currency: "inr",
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckOutForm amount={amount} />
    </Elements>
  );
}

export default function Payment() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentComponent />
    </Suspense>
  );
}
