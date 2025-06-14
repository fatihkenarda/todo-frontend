import React from 'react';

const Select = React.forwardRef(({ className = '', children, ...props }, ref) => {
  return (
    <select
      ref={ref}
      className={`w-48 p-2 border rounded
        bg-white text-black border-gray-300
        dark:bg-gray-800 dark:text-white dark:border-gray-600
        focus:outline-none focus:ring-2 focus:ring-blue-400
        caret-black dark:caret-white
        ${className}`}
      {...props}
    >
      {children}
    </select>
  );
});

export default Select;