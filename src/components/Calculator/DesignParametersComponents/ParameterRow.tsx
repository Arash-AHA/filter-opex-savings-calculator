
import React from 'react';

interface ParameterRowProps {
  label: string;
  value: string | number;
}

const ParameterRow: React.FC<ParameterRowProps> = ({ label, value }) => {
  return (
    <div className="flex justify-between border-b border-gray-100 pb-1">
      <span className="text-gray-600 text-sm">{label}</span>
      <span className="font-medium text-sm">{value}</span>
    </div>
  );
};

export default ParameterRow;
