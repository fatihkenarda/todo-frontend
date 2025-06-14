import React from 'react';

const Input = React.forwardRef(({ className = '', ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={`w-full p-2 border rounded
        bg-white text-black border-gray-300
        dark:bg-gray-800 dark:text-white dark:border-gray-600
        focus:outline-none focus:ring-2 focus:ring-blue-400
        caret-black dark:caret-white
        ${className}`}
      {...props}
    />
  );
});

export default Input;