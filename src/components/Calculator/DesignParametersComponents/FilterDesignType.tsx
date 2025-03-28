
import React from 'react';

interface FilterDesignTypeProps {
  designType: string;
  setDesignType: (value: string) => void;
}

const FilterDesignType: React.FC<FilterDesignTypeProps> = ({
  designType,
  setDesignType
}) => {
  return (
    <div className="mb-6">
      <div className="font-medium text-gray-700 mb-2">Filter Design Type:</div>
      <div className="flex gap-4 flex-wrap">
        <label className="relative flex cursor-pointer items-center">
          <input 
            type="radio" 
            name="designType" 
            value="bolt-weld" 
            checked={designType === 'bolt-weld'} 
            onChange={() => setDesignType('bolt-weld')}
            className="peer sr-only"
          />
          <span className="flex h-5 w-5 items-center justify-center rounded-full border border-gray-300 bg-white">
            <span className={`h-3 w-3 rounded-full ${designType === 'bolt-weld' ? 'bg-primary' : 'bg-transparent'}`}></span>
          </span>
          <span className="ml-2 text-sm font-medium text-gray-800">Bolt/Weld Design</span>
        </label>
        
        <label className="relative flex cursor-pointer items-center">
          <input 
            type="radio" 
            name="designType" 
            value="modular" 
            checked={designType === 'modular'} 
            onChange={() => setDesignType('modular')}
            className="peer sr-only"
          />
          <span className="flex h-5 w-5 items-center justify-center rounded-full border border-gray-300 bg-white">
            <span className={`h-3 w-3 rounded-full ${designType === 'modular' ? 'bg-primary' : 'bg-transparent'}`}></span>
          </span>
          <span className="ml-2 text-sm font-medium text-gray-800">Modular Design</span>
        </label>
      </div>
    </div>
  );
};

export default FilterDesignType;
