
import React, { useEffect, useState } from 'react';
import { suggestEMCFlaps } from '../hooks/utils/calculationUtils';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { HelpCircle } from 'lucide-react';

interface FilterInputsProps {
  airVolumeM3h: string;
  airVolumeACFM: string;
  numEMCFlaps: number | string;
  bagsPerRow: number;
  bagLength: number;
  designType: string;
  handleAirVolumeM3hChange: (value: string) => void;
  handleAirVolumeACFMChange: (value: string) => void;
  setNumEMCFlaps: (value: number | string) => void;
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
  const [suggestedFlaps, setSuggestedFlaps] = useState<number | null>(null);
  
  useEffect(() => {
    const suggested = suggestEMCFlaps(
      designType,
      bagLength,
      bagsPerRow,
      airVolumeM3h
    );
    setSuggestedFlaps(suggested);
  }, [designType, bagLength, bagsPerRow, airVolumeM3h]);
  
  const applySuggestedFlaps = () => {
    if (suggestedFlaps) {
      setNumEMCFlaps(suggestedFlaps);
    }
  };
  
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
        <div className="w-60 pr-4 calculator-field-label flex items-center">
          <span>TOTAL No. EMC Flaps:</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle 
                  size={16} 
                  className="ml-2 text-gray-500 cursor-pointer" 
                />
              </TooltipTrigger>
              <TooltipContent side="right" className="max-w-xs p-4">
                <div className="space-y-2">
                  <p><strong>Suggested value: {suggestedFlaps}</strong></p>
                  {designType === 'bolt-weld' && (
                    <p className="text-sm">Based on your current configuration (Air Volume: {airVolumeM3h} m³/h, {bagsPerRow} bags per row, {bagLength}m bag length), we suggest using {suggestedFlaps} EMC flaps to maintain an A/C ratio below 1.0.</p>
                  )}
                  <Button 
                    size="sm" 
                    onClick={applySuggestedFlaps} 
                    className="w-full mt-2"
                  >
                    Apply suggestion
                  </Button>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="flex-1">
          <div>
            <input
              type="number"
              value={numEMCFlaps}
              onChange={(e) => {
                const value = e.target.value;
                if (value === '') {
                  setNumEMCFlaps('');
                } else {
                  setNumEMCFlaps(parseInt(value) || 0);
                }
              }}
              min={1}
              className="calculator-input w-full"
              placeholder="Enter value"
            />
          </div>
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
