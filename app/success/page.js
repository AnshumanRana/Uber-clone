import { Suspense } from 'react';
import SuccessPageClient from './SuccessPageClient';

export default function SuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessPageClient />
    </Suspense>
  );
}