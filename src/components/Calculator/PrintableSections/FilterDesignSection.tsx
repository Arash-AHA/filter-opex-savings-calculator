
import React from 'react';

interface FilterDesignSectionProps {
  designType: string;
  airVolume: string;
  numEMCFlaps: number | string;
  bagLength: number;
  onEraseInputs?: () => void;
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
    
  const flapsLabel = designType === 'bolt-weld' 
    ? 'Total No. EMC Flaps (Panelized):' 
    : 'Total No. EMC Flaps (Modular):';

  return (
    <section className="relative">
      <h2 className="text-xl font-semibold mb-4">Filter Design Configuration</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>Filter Design Type:</div>
        <div>{designType === 'bolt-weld' ? 'Bolt/Weld' : 'Modular Design'}</div>
        <div>Air Volume:</div>
        <div>{airVolume}</div>
        <div>{flapsLabel}</div>
        <div>{numEMCFlaps}</div>
        <div>Bag Length:</div>
        <div>{bagLengthDisplay}</div>
      </div>
    </section>
  );
};
