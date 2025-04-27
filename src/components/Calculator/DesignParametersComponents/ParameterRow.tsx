
import React from 'react';

interface ParameterRowProps {
  label: string;
  value: string | number;
}

const ParameterRow: React.FC<ParameterRowProps> = ({ label, value }) => {
  return (
    <div className="flex flex-col space-y-1">
      <div className="text-sm font-medium text-gray-700">{label}</div>
      <div className="text-sm">{value}</div>
    </div>
  );
};

export default ParameterRow;
