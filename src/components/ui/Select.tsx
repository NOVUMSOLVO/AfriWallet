import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options: Array<{ value: string; label: string; disabled?: boolean }>;
}

export const Select: React.FC<SelectProps> = ({
  label,
  error,
  helperText,
  options,
  className = '',
  ...props
}) => {
  const baseClasses = `
    w-full px-3 py-2 border rounded-lg bg-white text-gray-900
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
    transition-colors duration-200 cursor-pointer
  `;
  
  const errorClasses = error 
    ? 'border-red-300 focus:ring-red-500' 
    : 'border-gray-300 hover:border-gray-400';

  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      
      <select
        className={`${baseClasses} ${errorClasses} ${className}`}
        {...props}
      >
        {options.map((option) => (
          <option 
            key={option.value} 
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>
      
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
      
      {helperText && !error && (
        <p className="text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
};
