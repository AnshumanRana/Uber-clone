
import { Suspense } from 'react';
import SuccessPageClient from './SuccessPageClient';

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="text-center p-10">Loading...</div>}>
      <SuccessPageClient />
    </Suspense>
  );
}
