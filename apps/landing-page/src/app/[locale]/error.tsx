'use client';

import { useEffect } from 'react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-4 text-center">
      <h2 className="text-xl font-bold text-text-primary">
        Something went wrong
      </h2>
      <button
        onClick={reset}
        className="rounded-lg bg-violet-600 px-4 py-2 text-sm text-white hover:bg-violet-700"
      >
        Try again
      </button>
    </div>
  );
}
