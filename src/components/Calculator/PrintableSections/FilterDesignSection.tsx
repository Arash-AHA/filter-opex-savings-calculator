
import React from 'react';
import { Button } from '@/components/ui/button';
import { Eraser } from 'lucide-react';

interface FilterDesignSectionProps {
  designType: string;
  airVolume: string;
  numEMCFlaps: number | string;
  bagLength: number;
  onEraseInputs?: () => void; // New prop for erasing inputs
}

export const FilterDesignSection: React.FC<FilterDesignSectionProps> = ({
  designType,
  airVolume,
  numEMCFlaps,
  bagLength,
  onEraseInputs,
}) => {
  const bagLengthDisplay = designType === 'bolt-weld' 
    ? `${bagLength} m` 
    : `${bagLength} ft`;
    
  const flapsLabel = designType === 'bolt-weld' 
    ? 'Total No. EMC Flaps (Panelized):' 
    : 'Total No. EMC Flaps (Modular):';

  return (
    <section className="relative">
      {designType === 'modular' && onEraseInputs && (
        <div className="absolute top-0 right-0">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onEraseInputs}
            className="flex items-center gap-1 text-gray-500 hover:text-gray-700"
          >
            <Eraser className="h-4 w-4" />
            Erase inputs
          </Button>
        </div>
      )}
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
