'use client';

import { useSearchParams } from 'next/navigation';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const paymentIntent = searchParams.get('payment_intent');
  const redirectStatus = searchParams.get('redirect_status');

  return (
    <div className="flex flex-col items-center justify-center h-screen px-4 text-center">
      <h1 className="text-4xl font-bold text-green-600 mb-4">🎉 Thank You!</h1>
      <p className="text-lg mb-2">Your payment was successful.</p>
      {redirectStatus && (
        <p className="text-sm text-gray-500">Status: {redirectStatus}</p>
      )}
      {paymentIntent && (
        <p className="text-sm text-gray-400">Payment ID: {paymentIntent}</p>
      )}
    </div>
  );
}
