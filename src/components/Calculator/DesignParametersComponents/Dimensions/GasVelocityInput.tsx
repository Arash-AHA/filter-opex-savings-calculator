
import React from 'react';
import { cn } from '@/lib/utils';

interface GasVelocityInputProps {
  velocityDisplay: string;
  velocityUnit: string;
  isVelocityTooHigh: boolean;
  gasVelocityMS: number;
}

const GasVelocityInput: React.FC<GasVelocityInputProps> = ({
  velocityDisplay,
  velocityUnit,
  isVelocityTooHigh,
  gasVelocityMS
}) => {
  return (
    <>
      <div className="flex items-center mb-4 animate-fadeIn">
        <div className="w-60 pr-4 calculator-field-label">
          <span>Gas velocity at filter inlet flange:</span>
        </div>
        <div className="flex flex-1 space-x-2">
          <div className="w-full relative">
            <input 
              type="text"
              value={velocityDisplay}
              readOnly
              className={cn("calculator-input pr-16 w-full bg-gray-50", 
                isVelocityTooHigh ? "border-red-300 text-red-700" : "")}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
              {velocityUnit}
            </span>
          </div>
        </div>
      </div>
      
      {isVelocityTooHigh && (
        <div className="bg-red-50 p-3 rounded-md text-xs text-red-700 mt-2 font-medium">
          Warning: Inlet velocity ({gasVelocityMS.toFixed(2)} m/s) should be maximum 12 m/s
        </div>
      )}
    </>
  );
};

export default GasVelocityInput;
