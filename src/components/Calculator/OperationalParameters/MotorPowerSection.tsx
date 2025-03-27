
import React from 'react';

interface MotorPowerSectionProps {
  currentMotorKW: number;
  setCurrentMotorKW: (value: number) => void;
  scheuchMotorKW: number;
  setScheuchMotorKW: (value: number) => void;
}

const MotorPowerSection: React.FC<MotorPowerSectionProps> = ({
  currentMotorKW,
  setCurrentMotorKW,
  scheuchMotorKW,
  setScheuchMotorKW
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-gray-700 border-b pb-2">Motor Power</h3>
      
      <div className="space-y-1">
        <div className="text-sm font-medium text-gray-700">Motor KW for standalone compressor</div>
        <div className="text-sm text-gray-500">Current Situation:</div>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center">
            <input
              type="number"
              value={currentMotorKW}
              onChange={(e) => setCurrentMotorKW(parseFloat(e.target.value) || 0)}
              className="w-full min-w-0 rounded-l-md border border-gray-200 px-2 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              min={0}
            />
            <span className="inline-flex items-center px-2 py-2 text-sm text-gray-500 bg-gray-50 border border-l-0 border-gray-200 rounded-r-md whitespace-nowrap">
              kW
            </span>
          </div>
          <div className="flex items-center">
            <input
              type="text"
              value={(currentMotorKW * 1.34102).toFixed(1)}
              onChange={(e) => setCurrentMotorKW(parseFloat(e.target.value) / 1.34102 || 0)}
              className="w-full min-w-0 rounded-l-md border border-gray-200 px-2 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              min={0}
            />
            <span className="inline-flex items-center px-2 py-2 text-sm text-gray-500 bg-gray-50 border border-l-0 border-gray-200 rounded-r-md whitespace-nowrap">
              HP
            </span>
          </div>
        </div>
      </div>
      
      <div className="space-y-1">
        <div className="text-sm font-medium text-gray-700">Motor KW for standalone compressor</div>
        <div className="text-sm text-gray-500">Scheuch EMC Technology:</div>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center">
            <input
              type="number"
              value={scheuchMotorKW}
              onChange={(e) => setScheuchMotorKW(parseFloat(e.target.value) || 0)}
              className="w-full min-w-0 rounded-l-md border border-gray-200 px-2 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              min={0}
            />
            <span className="inline-flex items-center px-2 py-2 text-sm text-gray-500 bg-gray-50 border border-l-0 border-gray-200 rounded-r-md whitespace-nowrap">
              kW
            </span>
          </div>
          <div className="flex items-center">
            <input
              type="text"
              value={(scheuchMotorKW * 1.34102).toFixed(1)}
              onChange={(e) => setScheuchMotorKW(parseFloat(e.target.value) / 1.34102 || 0)}
              className="w-full min-w-0 rounded-l-md border border-gray-200 px-2 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              min={0}
            />
            <span className="inline-flex items-center px-2 py-2 text-sm text-gray-500 bg-gray-50 border border-l-0 border-gray-200 rounded-r-md whitespace-nowrap">
              HP
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MotorPowerSection;
