
import React from 'react';

interface ParameterRowProps {
  label: string;
  value: string | number;
  secondaryValue?: string | null;
}

const ParameterRow: React.FC<ParameterRowProps> = ({ label, value, secondaryValue }) => {
  return (
    <div className="flex justify-between text-sm">
      <div className="font-medium text-gray-700">{label}</div>
      <div className="text-gray-800 flex flex-col items-end">
        <span>{value}</span>
        {secondaryValue && (
          <span className="text-xs text-gray-500 mt-0.5">{secondaryValue}</span>
        )}
      </div>
    </div>
  );
};

export default ParameterRow;
