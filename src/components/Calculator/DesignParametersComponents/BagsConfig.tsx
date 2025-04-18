
import React from 'react';

interface BagsConfigProps {
  bagsPerRow: number;
  bagLength: number;
  designType: string;
  setBagsPerRow: (value: number) => void;
  setBagLength: (value: number) => void;
}

const BagsConfig: React.FC<BagsConfigProps> = ({
  bagsPerRow,
  bagLength,
  designType,
  setBagsPerRow,
  setBagLength,
}) => {
  return (
    <>
      <div className="flex items-center mb-4">
        <div className="w-60 pr-4 calculator-field-label">
          <span>Total Number of Bags:</span>
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

export default BagsConfig;
