
import React from 'react';

interface FilterDesignSectionProps {
  designType: string;
  airVolume: string;
  numEMCFlaps: number | string;
  bagLength: number | null;
  unitSystem?: 'metric' | 'imperial';
}

export const FilterDesignSection: React.FC<FilterDesignSectionProps> = ({
  designType,
  airVolume,
  numEMCFlaps,
  bagLength,
  unitSystem = 'metric',
}) => {
  // Determine bag length display based on unit system
  const bagLengthDisplay = bagLength !== null && bagLength !== undefined
    ? unitSystem === 'metric'
      ? `${bagLength.toFixed(2)} m`
      : `${bagLength.toFixed(2)} ft`
    : '-';
    
  const flapsLabel = designType === 'bolt-weld' 
    ? 'Total No. EMC Flaps (Panelized):' 
    : 'Total No. EMC Flaps (Modular):';
  
  // Design type name for display
  const designTypeName = designType === 'bolt-weld' ? 'Panelized Design' : 'Modular Design';

  return (
    <section className="relative">
      <h2 className="text-xl font-semibold mb-4">Filter Design Configuration</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>Filter Design Type:</div>
        <div>{designTypeName}</div>
        <div>Air Volume:</div>
        <div>{airVolume || '-'}</div>
        <div>{flapsLabel}</div>
        <div>{numEMCFlaps || '-'}</div>
        <div>Bag Length:</div>
        <div>{bagLengthDisplay}</div>
      </div>
    </section>
  );
};
