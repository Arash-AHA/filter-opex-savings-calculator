
import React from 'react';

interface AirVolumeInputsProps {
  airVolumeM3h: string;
  airVolumeACFM: string;
  handleAirVolumeM3hChange: (value: string) => void;
  handleAirVolumeACFMChange: (value: string) => void;
}

const AirVolumeInputs: React.FC<AirVolumeInputsProps> = ({
  airVolumeM3h,
  airVolumeACFM,
  handleAirVolumeM3hChange,
  handleAirVolumeACFMChange,
}) => {
  return (
    <div className="flex items-center mb-4">
      <div className="w-60 pr-4 calculator-field-label">
        <span>Air Volume:</span>
      </div>
      <div className="flex flex-1 space-x-2">
        <div className="w-1/2 relative">
          <input 
            type="text"
            value={airVolumeM3h}
            onChange={(e) => handleAirVolumeM3hChange(e.target.value)}
            placeholder="Enter value"
            className="calculator-input pr-12 w-full"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">m³/h</span>
        </div>
        <div className="w-1/2 relative">
          <input 
            type="text"
            value={airVolumeACFM}
            onChange={(e) => handleAirVolumeACFMChange(e.target.value)}
            placeholder="Enter value"
            className="calculator-input pr-12 w-full"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">ACFM</span>
        </div>
      </div>
    </div>
  );
};

export default AirVolumeInputs;
