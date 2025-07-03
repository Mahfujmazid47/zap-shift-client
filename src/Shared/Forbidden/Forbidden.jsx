import React from 'react';

const Forbidden = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 md:p-12 text-center max-w-lg w-full transform transition-all duration-300 hover:scale-105">
        {/* Forbidden Icon (using a simple SVG for visual appeal) */}
        <svg
          className="mx-auto h-24 w-24 text-red-500 dark:text-red-400 mb-6 animate-bounce"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
          ></path>
        </svg>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
          Access Denied
        </h1>

        {/* Message */}
        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
          You do not have the necessary permissions to view this page.
          <br />
          Please contact an administrator if you believe this is an error.
        </p>

        {/* Action Button */}
        {/*
          Note: In a real application using react-router-dom, you would use
          `import { useNavigate } from 'react-router-dom';`
          `const navigate = useNavigate();`
          and then `onClick={() => navigate('/')}` for the button.
          For this generic component, we use a simple anchor tag.
        */}
        <a
          href="/" // This will navigate to the root of your application
          className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-full shadow-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-transform duration-200 ease-in-out transform hover:scale-105 active:scale-95"
          aria-label="Go to Home Page"
        >
          Go to Home
          <svg
            className="ml-2 -mr-1 h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            ></path>
          </svg>
        </a>
      </div>
    </div>
    );
};

export default Forbidden;