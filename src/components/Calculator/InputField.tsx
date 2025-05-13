
import React from 'react';
import { cn } from '@/lib/utils';

type InputFieldProps = {
  id?: string;
  label?: React.ReactNode;
  value: string | number;
  onChange: (value: string) => void;
  type?: 'text' | 'number' | 'select';
  min?: number;
  max?: number;
  step?: number | string;
  units?: string;
  className?: string;
  placeholder?: string;
  options?: { value: string | number; label: string }[];
  labelClassName?: string;
  inputClassName?: string;
  secondaryInput?: {
    value: string | number;
    onChange: (value: string) => void;
    units: string;
    label?: string;
  };
  estimateButton?: {
    onClick: () => void;
    label: string;
  };
};

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  value,
  onChange,
  type = 'text',
  min,
  max,
  step,
  units,
  className,
  placeholder,
  options = [],
  labelClassName,
  inputClassName,
  secondaryInput,
  estimateButton,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  const renderInput = () => {
    if (type === 'select') {
      return (
        <select
          id={id}
          value={value}
          onChange={handleChange}
          className={cn(
            'calculator-input',
            inputClassName
          )}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
    }

    const inputContent = (
      <input
        id={id}
        type={type}
        value={value}
        onChange={handleChange}
        min={min}
        max={max}
        step={step}
        placeholder={placeholder}
        className={cn(
          'calculator-input',
          units && 'rounded-r-none',
          inputClassName
        )}
      />
    );

    if (units) {
      return (
        <div className="flex items-center">
          {inputContent}
          <span className="inline-flex items-center px-3 py-2 text-sm text-gray-500 bg-gray-50 border border-l-0 border-gray-200 rounded-r-md">
            {units}
          </span>
        </div>
      );
    }

    return inputContent;
  };

  const renderSecondaryInput = () => {
    if (!secondaryInput) return null;

    return (
      <div className="mt-1">
        {secondaryInput.label && (
          <label className="block text-xs text-gray-500 mb-1">{secondaryInput.label}</label>
        )}
        <div className="flex items-center">
          <input
            type="number"
            value={secondaryInput.value}
            onChange={(e) => secondaryInput.onChange(e.target.value)}
            className="calculator-input rounded-r-none"
          />
          <span className="inline-flex items-center px-3 py-2 text-sm text-gray-500 bg-gray-50 border border-l-0 border-gray-200 rounded-r-md">
            {secondaryInput.units}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className={cn("mb-4 flex items-center flex-wrap", className)}>
      {label && (
        <div className={cn("calculator-field-label", labelClassName)}>
          {label}
        </div>
      )}
      <div className={cn("calculator-field-input", secondaryInput && 'flex-1')}>
        <div className="flex">
          <div className={cn("flex-1", estimateButton && 'pr-2')}>
            {renderInput()}
            {renderSecondaryInput()}
          </div>
          {estimateButton && (
            <button
              type="button"
              onClick={estimateButton.onClick}
              className="self-start px-3 py-2 text-sm text-white bg-primary rounded-md shadow-sm hover:bg-primary/90 transition-colors duration-200"
            >
              {estimateButton.label}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default InputField;
