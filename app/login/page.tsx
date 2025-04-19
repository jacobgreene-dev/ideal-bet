'use client';

// import { useState } from 'react';
// import Image from 'next/image';
import { signIn } from 'next-auth/react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';


export default function SignIn() {
  return (
    <div className="min-h-screen flex flex-col pt-3 ">
      <Header />

      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold">
              Sign in to your account
            </h2>
          </div>
          {/* Google Sign-In */}
          <div className="mt-8 space-y-6">
            <button
              onClick={() => signIn('google', { callbackUrl: '/' })}
              className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign in with Google
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
