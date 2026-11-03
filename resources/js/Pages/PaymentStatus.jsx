import React from 'react';
import { Head, Link } from '@inertiajs/react';

export default function PaymentStatus({ status, message, txnid }) {
  const isSuccess = status === 'success';

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col justify-center items-center px-4">
      <Head title={`Payment ${isSuccess ? 'Successful' : 'Failed'}`} />

      <div className="max-w-md w-full bg-gray-800/60 p-8 rounded-2xl border border-gray-800 text-center shadow-xl">
        <div className={`text-5xl mb-4 ${isSuccess ? 'text-green-500' : 'text-red-500'}`}>
          {isSuccess ? '✅' : '❌'}
        </div>
        <h1 className="text-2xl font-bold mb-2">
          {isSuccess ? 'Payment Successful!' : 'Payment Failed'}
        </h1>
        <p className="text-gray-400 text-sm mb-6">{message}</p>

        {txnid && (
          <div className="bg-gray-900 p-3 rounded-lg text-xs text-gray-400 mb-6 border border-gray-800">
            Transaction ID: <span className="text-white font-mono">{txnid}</span>
          </div>
        )}

        <Link
          href="/"
          className="inline-block w-full bg-red-600 hover:bg-red-700 py-3 rounded-xl font-bold transition"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}