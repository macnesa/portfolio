import React from 'react';

interface InputProps {
  disabled?: boolean;
  id?: string;
  max?: string;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  value?: string | number;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
}

export const Input: React.FC<InputProps> = ({
  disabled = false,
  id = '',
  max = '',
  placeholder = '',
  type = 'text',
  value = '',
  onChange = () => {},
  onKeyDown = () => {},
}) => {
  return (
    <input
      type={type}
      id={id}
      className="bg-gray-50 border border-gray-300 text-text text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder={placeholder}
      onChange={onChange}
      onKeyDown={onKeyDown}
      value={value}
      max={max}
      disabled={disabled}
    />
  );
};
