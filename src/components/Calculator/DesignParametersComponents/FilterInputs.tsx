
import React from 'react';

interface FilterInputsProps {
  airVolumeM3h: string;
  airVolumeACFM: string;
  numEMCFlaps: number;
  bagsPerRow: number;
  bagLength: number;
  designType: string;
  handleAirVolumeM3hChange: (value: string) => void;
  handleAirVolumeACFMChange: (value: string) => void;
  setNumEMCFlaps: (value: number) => void;
  setBagsPerRow: (value: number) => void;
  setBagLength: (value: number) => void;
}

const FilterInputs: React.FC<FilterInputsProps> = ({
  airVolumeM3h,
  airVolumeACFM,
  numEMCFlaps,
  bagsPerRow,
  bagLength,
  designType,
  handleAirVolumeM3hChange,
  handleAirVolumeACFMChange,
  setNumEMCFlaps,
  setBagsPerRow,
  setBagLength
}) => {
  return (
    <>
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
      
      <div className="flex items-center mb-4">
        <div className="w-60 pr-4 calculator-field-label">
          <span>TOTAL No. EMC Flaps:</span>
        </div>
        <div className="flex-1">
          <input
            type="number"
            value={numEMCFlaps}
            onChange={(e) => setNumEMCFlaps(parseInt(e.target.value) || 0)}
            min={1}
            className="calculator-input w-full"
          />
        </div>
      </div>
      
      <div className="flex items-center mb-4">
        <div className="w-60 pr-4 calculator-field-label">
          <span>No. Bags in a Row:</span>
        </div>
        <div className="flex-1">
          <select
            value={bagsPerRow}
            onChange={(e) => setBagsPerRow(parseInt(e.target.value) || 0)}
            className="calculator-input w-full"
          >
            {designType === 'bolt-weld' ? (
              <>
                <option value={15}>15</option>
                <option value={18}>18</option>
              </>
            ) : (
              <option value={15}>15</option>
            )}
          </select>
        </div>
      </div>
      
      <div className="flex items-center mb-4">
        <div className="w-60 pr-4 calculator-field-label">
          <span>Bag Length:</span>
        </div>
        <div className="flex-1">
          <select
            value={bagLength}
            onChange={(e) => setBagLength(parseInt(e.target.value) || 0)}
            className="calculator-input w-full"
          >
            {designType === 'bolt-weld' ? (
              <>
                <option value={8}>8 m</option>
                <option value={9}>9 m</option>
                <option value={10}>10 m</option>
              </>
            ) : (
              <>
                <option value={16}>16 ft</option>
                <option value={24}>24 ft</option>
                <option value={28}>28 ft</option>
              </>
            )}
          </select>
        </div>
      </div>
    </>
  );
};

export default FilterInputs;
