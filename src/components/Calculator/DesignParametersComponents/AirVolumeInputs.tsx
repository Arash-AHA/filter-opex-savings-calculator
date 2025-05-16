
import React, { useEffect, useRef } from 'react';

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
  const m3hInputRef = useRef<HTMLInputElement>(null);
  const acfmInputRef = useRef<HTMLInputElement>(null);
  
  // Effect to update input elements when props change (e.g., after reset)
  useEffect(() => {
    if (m3hInputRef.current) {
      m3hInputRef.current.value = airVolumeM3h;
    }
    if (acfmInputRef.current) {
      acfmInputRef.current.value = airVolumeACFM;
    }
  }, [airVolumeM3h, airVolumeACFM]);

  // Handle Enter key press to maintain value during rendering
  const handleKeyDown = (e: React.KeyboardEvent, updateFunction: (value: string) => void, value: string) => {
    if (e.key === 'Enter') {
      // Apply input value again to ensure it's set
      updateFunction(value);
    }
  };

  return (
    <div className="flex flex-col mb-4">
      <div className="w-60 pr-4 calculator-field-label mb-2">
        <span>Design Air Volume:</span>
      </div>
      <div className="flex flex-col space-y-2">
        <div className="relative">
          <input 
            type="text" 
            value={airVolumeM3h} 
            onChange={e => handleAirVolumeM3hChange(e.target.value)} 
            onKeyDown={e => handleKeyDown(e, handleAirVolumeM3hChange, airVolumeM3h)}
            placeholder="Enter air volume" 
            className="calculator-input pr-12 w-full"
            ref={m3hInputRef}
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">m³/h</span>
        </div>
        <div className="relative">
          <input 
            type="text" 
            value={airVolumeACFM} 
            onChange={e => handleAirVolumeACFMChange(e.target.value)} 
            onKeyDown={e => handleKeyDown(e, handleAirVolumeACFMChange, airVolumeACFM)}
            placeholder="Enter air volume" 
            className="calculator-input pr-12 w-full"
            ref={acfmInputRef}
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">ACFM</span>
        </div>
      </div>
    </div>
  );
};

export default AirVolumeInputs;
