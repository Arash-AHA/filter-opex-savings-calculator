
import React from 'react';

interface FilterDesignSectionProps {
  designType: string;
  airVolume: string;
  numEMCFlaps: number | string;
  bagLength: number | null;
  unitSystem?: 'metric' | 'imperial';
  negativePressure?: {
    value: number | null;
    unit: string;
  };
  filterRowType?: string;
}

export const FilterDesignSection: React.FC<FilterDesignSectionProps> = ({
  designType,
  airVolume,
  numEMCFlaps,
  bagLength,
  unitSystem = 'metric',
  negativePressure,
  filterRowType = 'single'
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
  
  // Format pressure display if available
  const pressureDisplay = negativePressure?.value && negativePressure.unit
    ? `${negativePressure.value} ${negativePressure.unit}`
    : '-';

  // Calculate filter model for modular design
  const getFilterModel = () => {
    if (designType !== 'modular') return null;
    
    // Convert numEMCFlaps to number for calculations
    const numFlaps = typeof numEMCFlaps === 'string' 
      ? parseInt(numEMCFlaps) || 0
      : numEMCFlaps || 0;
      
    // If odd number of flaps, force single row configuration
    let effectiveRowType = filterRowType;
    if (numFlaps % 2 !== 0) {
      effectiveRowType = 'single';
    }
    
    // First part: row configuration
    const rowPart = effectiveRowType === 'single' ? '1' : '2';
    
    // Second part: EMC flaps divided by factor based on row configuration
    const flapFactor = effectiveRowType === 'single' ? 3 : 6;
    const flapsPart = Math.round(numFlaps / flapFactor);
    
    // Combine with bag length
    return `${rowPart} x ${flapsPart} x ${bagLengthDisplay}`;
  };

  // Get the filter model for modular design
  const filterModel = getFilterModel();

  return (
    <section className="relative">
      <h2 className="text-xl font-semibold mb-4">Filter Design Configuration</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>Filter Design Type:</div>
        <div>{designTypeName}</div>
        
        {designType === 'modular' && filterModel && (
          <>
            <div>Filter Model:</div>
            <div>{filterModel}</div>
          </>
        )}
        
        <div>Air Volume:</div>
        <div>{airVolume || '-'}</div>
        <div>{flapsLabel}</div>
        <div>{numEMCFlaps || '-'}</div>
        <div>Bag Length:</div>
        <div>{bagLengthDisplay}</div>
        <div>Negative Pressure:</div>
        <div>{pressureDisplay}</div>
      </div>
    </section>
  );
};
