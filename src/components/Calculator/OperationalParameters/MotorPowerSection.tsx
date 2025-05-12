
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const isMobile = useIsMobile();

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-gray-700 border-b pb-2">Motor Power</h3>
      
      <div className="space-y-1">
        <div className="text-sm font-medium text-gray-700">Motor KW for standalone compressor</div>
        <div className="text-sm text-gray-500">Current Situation:</div>
        <div className={`grid grid-cols-${isMobile ? '1' : '2'} gap-3`}>
          <div className={isMobile ? "flex flex-col" : "flex items-center"}>
            <input
              type="number"
              value={currentMotorKW}
              onChange={(e) => setCurrentMotorKW(parseFloat(e.target.value) || 0)}
              className={`w-full min-w-0 ${isMobile ? "rounded-md" : "rounded-l-md"} border border-gray-200 px-2 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary`}
              min={0}
            />
            <span className={`inline-flex items-center px-2 py-2 text-sm text-gray-500 bg-gray-50 ${isMobile ? "rounded-md border border-gray-200 mt-1 justify-center" : "border border-l-0 border-gray-200 rounded-r-md whitespace-nowrap"}`}>
              kW
            </span>
          </div>
          {!isMobile && (
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
          )}
          {isMobile && (
            <div className="flex flex-col mt-2">
              <input
                type="text"
                value={(currentMotorKW * 1.34102).toFixed(1)}
                onChange={(e) => setCurrentMotorKW(parseFloat(e.target.value) / 1.34102 || 0)}
                className="w-full min-w-0 rounded-md border border-gray-200 px-2 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                min={0}
              />
              <span className="inline-flex items-center justify-center px-2 py-2 text-sm text-gray-500 bg-gray-50 border border-gray-200 rounded-md mt-1">
                HP
              </span>
            </div>
          )}
        </div>
      </div>
      
      <div className="space-y-1 mt-4">
        <div className="text-sm font-medium text-gray-700">Motor KW for standalone compressor</div>
        <div className="text-sm text-gray-500">Scheuch EMC Technology:</div>
        <div className={`grid grid-cols-${isMobile ? '1' : '2'} gap-3`}>
          <div className={isMobile ? "flex flex-col" : "flex items-center"}>
            <input
              type="number"
              value={scheuchMotorKW}
              onChange={(e) => setScheuchMotorKW(parseFloat(e.target.value) || 0)}
              className={`w-full min-w-0 ${isMobile ? "rounded-md" : "rounded-l-md"} border border-gray-200 px-2 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary`}
              min={0}
            />
            <span className={`inline-flex items-center px-2 py-2 text-sm text-gray-500 bg-gray-50 ${isMobile ? "rounded-md border border-gray-200 mt-1 justify-center" : "border border-l-0 border-gray-200 rounded-r-md whitespace-nowrap"}`}>
              kW
            </span>
          </div>
          {!isMobile && (
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
          )}
          {isMobile && (
            <div className="flex flex-col mt-2">
              <input
                type="text"
                value={(scheuchMotorKW * 1.34102).toFixed(1)}
                onChange={(e) => setScheuchMotorKW(parseFloat(e.target.value) / 1.34102 || 0)}
                className="w-full min-w-0 rounded-md border border-gray-200 px-2 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                min={0}
              />
              <span className="inline-flex items-center justify-center px-2 py-2 text-sm text-gray-500 bg-gray-50 border border-gray-200 rounded-md mt-1">
                HP
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MotorPowerSection;
