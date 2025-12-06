import React from 'react';

interface DisplayProps {
  expression: string;
  result: string;
}

const Display: React.FC<DisplayProps> = ({ expression, result }) => {
  // Format numbers for display (add commas)
  const formatNumber = (numStr: string) => {
    if (numStr === "Error") return numStr;
    if (!numStr) return "";
    
    // Split into parts to handle operators in expression string
    // This is a visual-only formatter for the expression line
    return numStr.split(/([+\-*/%])/).map(part => {
        if (/[+\-*/%]/.test(part)) return ` ${part} `;
        return part;
    }).join('');
  };

  return (
    <div className="w-full bg-white p-6 pb-2 rounded-t-3xl sm:rounded-3xl flex flex-col items-end justify-end shadow-sm z-10">
      <div className="text-gray-500 text-sm sm:text-base font-medium h-6 mb-1 overflow-hidden w-full text-right tracking-wide opacity-80">
        {formatNumber(expression)}
      </div>
      <div className="text-gray-900 text-5xl sm:text-6xl font-light tracking-tight w-full text-right overflow-x-auto overflow-y-hidden whitespace-nowrap scrollbar-hide">
        {result || (expression ? '' : '0')}
      </div>
    </div>
  );
};

export default Display;
