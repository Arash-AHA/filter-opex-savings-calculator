
import React from 'react';

interface FilterDimensionsOutputProps {
  dimensions: {
    width: string;
    length: string;
  };
  unitText: string;
}

const FilterDimensionsOutput: React.FC<FilterDimensionsOutputProps> = ({
  dimensions,
  unitText
}) => {
  return (
    <div className="flex items-center mb-4 animate-fadeIn">
      <div className="w-60 pr-4 calculator-field-label">
        <span>Filter dimensions: Width / Length</span>
      </div>
      <div className="flex flex-1 space-x-2">
        <div className="w-1/2 relative">
          <input 
            type="text"
            value={dimensions.width}
            readOnly
            className="calculator-input pr-8 w-full bg-gray-50"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">{unitText}</span>
        </div>
        <div className="w-1/2 relative">
          <input 
            type="text"
            value={dimensions.length}
            readOnly
            className="calculator-input pr-8 w-full bg-gray-50"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">{unitText}</span>
        </div>
      </div>
    </div>
  );
};

export default FilterDimensionsOutput;
