
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
      <div className="mb-4">
        <div className="mb-2">
          <span className="text-sm font-medium text-gray-700">Number of Bags per Row (cleaned by one pulsejet valve):</span>
        </div>
        <div className="w-full max-w-md">
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
      
      <div className="mb-4">
        <div className="mb-2">
          <span className="text-sm font-medium text-gray-700">Bag Length:</span>
        </div>
        <div className="w-full max-w-md">
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
