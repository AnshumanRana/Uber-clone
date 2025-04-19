// app/success/SuccessPageClient.jsx
'use client';

import { useSearchParams } from 'next/navigation';

export default function SuccessPageClient() {
  const searchParams = useSearchParams();
  const paymentIntent = searchParams.get('payment_intent');
  const redirectStatus = searchParams.get('redirect_status');

  return (
    <div className="flex flex-col items-center justify-center h-screen px-4 text-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
        <h1 className="text-4xl font-extrabold text-green-600 mb-4">🎉 Thank You!</h1>
        <p className="text-lg text-gray-700 mb-2">
          Your payment was successful.
        </p>
        {redirectStatus && (
          <p className="text-sm text-gray-500">
            Status: <span className="font-medium">{redirectStatus}</span>
          </p>
        )}
        {paymentIntent && (
          <p className="text-sm text-gray-400">
            Payment ID: <span className="font-mono">{paymentIntent}</span>
          </p>
        )}
      </div>
    </div>
  );
}
