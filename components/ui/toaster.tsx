'use client';

import { Toaster as SonnerToaster } from 'sonner';

export function Toaster() {
  return (
    <SonnerToaster
      position="top-right"
      expand={false}
      richColors
      toastOptions={{
        style: {
          background: '#1c1917',
          border: '1px solid #44403c',
          color: '#fafaf9',
        },
      }}
    />
  );
}
