
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
  handleAirVolumeACFMChange
}) => {
  return (
    <div className="flex flex-col mb-4">
      <div className="w-full calculator-field-label mb-2">
        <span>Design Air Volume:</span>
      </div>
      <div className="flex space-x-4">
        <div className="relative w-1/2">
          <input
            type="text"
            value={airVolumeM3h}
            onChange={(e) => handleAirVolumeM3hChange(e.target.value)}
            className="calculator-input pr-12 w-full"
            placeholder="Enter air volume"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
            m³/h
          </span>
        </div>
        <div className="relative w-1/2">
          <input
            type="text"
            value={airVolumeACFM}
            onChange={(e) => handleAirVolumeACFMChange(e.target.value)}
            className="calculator-input pr-16 w-full"
            placeholder="Enter Air Volume in ACFM"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
            ACFM
          </span>
        </div>
      </div>
    </div>
  );
};

export default AirVolumeInputs;
