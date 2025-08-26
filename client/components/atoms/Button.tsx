import React, { useState, useEffect, ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  type?: string;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  type,
  className = '',
  disabled = false,
  onClick = () => {},
}) => {
  const [myClass, setClass] = useState<string>('');

  useEffect(() => {
    switch (type) {
      case 'danger':
        setClass(
          ' text-white bg-danger',
        );
        break;
      case 'primary':
        setClass(
          'text-white bg-blue-600 hover:bg-blue-700',
        );
        break;
      default:
        setClass(
          'text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100  dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600  ',
        );
        break;
    }
  }, [type]);

  return (
    <button
      disabled={disabled}
      type="button"
      className={`w-full cursor-pointer py-2.5 px-5 text-sm font-medium rounded-lg ${myClass} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
