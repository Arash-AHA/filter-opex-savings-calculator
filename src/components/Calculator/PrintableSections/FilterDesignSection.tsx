
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
  bagsPerRow?: number;
}

export const FilterDesignSection: React.FC<FilterDesignSectionProps> = ({
  designType,
  airVolume,
  numEMCFlaps,
  bagLength,
  unitSystem = 'metric',
  negativePressure,
  filterRowType = 'single',
  bagsPerRow = 0
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

  // Calculate filter model based on design type
  const getFilterModel = () => {
    // Convert numEMCFlaps to number for calculations
    const numFlaps = typeof numEMCFlaps === 'string' 
      ? parseInt(numEMCFlaps) || 0
      : numEMCFlaps || 0;
      
    // If modular design with odd number of flaps, force single row configuration
    let effectiveRowType = filterRowType;
    if (designType === 'modular' && numFlaps % 2 !== 0) {
      effectiveRowType = 'single';
    }
    
    if (designType === 'modular') {
      // First part: row configuration
      const rowPart = effectiveRowType === 'single' ? '1' : '2';
      
      // Second part: EMC flaps divided by factor
      let flapsPart;
      
      if (effectiveRowType === 'double' && numFlaps % 2 === 0) {
        // For double row with even number of flaps, divide by 6
        flapsPart = Math.round(numFlaps / 6);
      } else {
        // For single row, divide by 3
        flapsPart = Math.round(numFlaps / 3);
      }
      
      // Combine with bag length
      return `${rowPart} x ${flapsPart} x ${bagLengthDisplay}`;
    } else if (designType === 'bolt-weld') {
      // For panelized design: FIPP xt-y.y-z/(1 or 2)e
      // x is Number of Bags per Row
      // y.y is Filter Bag Length formatted with a decimal point in the middle
      // z is Total Quantity of EMC Flaps
      
      // Use bagsPerRow as the x value in FIPP xt
      const bagsPerRowValue = bagsPerRow || 0;
      
      // Format bag length with a decimal point in the middle (y.y format)
      let formattedBagLength = '0.0';
      
      if (bagLength) {
        // Convert bag length to string and remove any decimal points
        const bagLengthStr = bagLength.toString().replace('.', '');
        
        // If the string is just one digit, pad with a leading zero
        const paddedBagLength = bagLengthStr.padStart(2, '0');
        
        // Insert a decimal point in the middle: y.y format
        formattedBagLength = `${paddedBagLength.charAt(0)}.${paddedBagLength.charAt(1)}`;
      }
      
      // Row configuration suffix (1 for single, 2 for double)
      const rowSuffix = effectiveRowType === 'single' ? '1' : '2';
      
      return `FIPP ${bagsPerRowValue}t-${formattedBagLength}-${numFlaps}/${rowSuffix}e`;
    }
    
    return null;
  };

  // Get the filter model
  const filterModel = getFilterModel();

  return (
    <section className="relative">
      <h2 className="text-xl font-semibold mb-4">Filter Design Configuration</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>Filter Design Type:</div>
        <div>{designTypeName}</div>
        
        {filterModel && (
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
