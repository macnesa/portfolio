import React from 'react';

interface LabelProps {
  id: string;
  children: React.ReactNode;
}

export const Label: React.FC<LabelProps> = ({ id, children }) => {
  return (
    <label
      htmlFor={id}
      className="block mb-2 text-sm font-medium text-text"
    >
      {children}
    </label>
  );
};
