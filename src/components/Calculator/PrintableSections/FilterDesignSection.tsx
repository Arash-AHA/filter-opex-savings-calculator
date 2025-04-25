
import React from 'react';

interface FilterDesignSectionProps {
  designType: string;
  airVolume: string;
  numEMCFlaps: number | string;
  bagLength: number;
}

export const FilterDesignSection: React.FC<FilterDesignSectionProps> = ({
  designType,
  airVolume,
  numEMCFlaps,
  bagLength,
}) => {
  const bagLengthDisplay = designType === 'bolt-weld' 
    ? `${bagLength} m` 
    : `${bagLength} ft`;

  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">Filter Design Configuration</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>Filter Design Type:</div>
        <div>{designType === 'bolt-weld' ? 'Bolt/Weld' : 'Modular Design'}</div>
        <div>Air Volume:</div>
        <div>{airVolume}</div>
        <div>Total No. EMC Flaps:</div>
        <div>{numEMCFlaps}</div>
        <div>Bag Length:</div>
        <div>{bagLengthDisplay}</div>
      </div>
    </section>
  );
};
