
import React from 'react';
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

interface FilterDesignSectionProps {
  designType: string;
  airVolume: string;
  numEMCFlaps: number | string;
  bagLength: number;
  unitSystem?: 'metric' | 'imperial';
  onEraseInputs?: () => void;
}

export const FilterDesignSection: React.FC<FilterDesignSectionProps> = ({
  designType,
  airVolume,
  numEMCFlaps,
  bagLength,
  unitSystem = 'metric',
  onEraseInputs,
}) => {
  // Determine bag length display based on unit system
  const bagLengthDisplay = unitSystem === 'metric'
    ? `${bagLength.toFixed(2)} m`
    : `${bagLength.toFixed(2)} ft`;
    
  const flapsLabel = designType === 'bolt-weld' 
    ? 'Total No. EMC Flaps (Panelized):' 
    : 'Total No. EMC Flaps (Modular):';
  
  // Design type name for display
  const designTypeName = designType === 'bolt-weld' ? 'Panelized Design' : 'Modular Design';

  return (
    <section className="relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Filter Design Configuration</h2>
        {onEraseInputs && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onEraseInputs}
            className="flex items-center gap-1"
          >
            <RefreshCw className="h-4 w-4" />
            Reset inputs
          </Button>
        )}
      </div>
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
