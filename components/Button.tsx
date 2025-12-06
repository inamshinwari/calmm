import React from 'react';
import { CalcButton, ButtonType } from '../types';

interface ButtonProps {
  data: CalcButton;
  onClick: (value: string) => void;
}

const Button: React.FC<ButtonProps> = ({ data, onClick }) => {
  const isZero = data.value === '0';
  const isEquals = data.value === '=';
  
  const baseClasses = `
    relative overflow-hidden
    flex items-center justify-center
    text-2xl sm:text-3xl font-normal
    transition-all duration-100 ease-out
    rounded-full select-none
    ${isZero ? 'col-span-2 aspect-[2/1] rounded-full' : 'aspect-square'}
    ${isEquals ? '' : 'active:bg-gray-200 hover:bg-gray-50 bg-white sm:bg-gray-50/50'}
    ${data.className || 'text-gray-800'}
  `;

  // Custom styling for specific overrides passed via data.className is handled in baseClasses template string interpolation
  // But we want to ensure default layout behavior (centering)
  
  const handleClick = () => {
    // Simple vibration for mobile feeling
    if (navigator.vibrate) navigator.vibrate(10);
    onClick(data.value);
  };

  return (
    <button
      onClick={handleClick}
      className={baseClasses.trim().replace(/\s+/g, ' ')}
      aria-label={data.label}
    >
      {data.label}
    </button>
  );
};

export default Button;
