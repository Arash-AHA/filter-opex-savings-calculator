
import React from 'react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Columns2, Columns3 } from 'lucide-react';

interface FilterDimensionsProps {
  filterRowType: string;
  setFilterRowType: (value: string) => void;
  channelWidthMm: number;
  setChannelWidthMm: (value: number) => void;
  channelHeightMm: number;
  setChannelHeightMm: (value: number) => void;
  airVolumeM3h: string;
  numEMCFlaps: number;
  bagsPerRow: number;
  designType: string;
}

const FilterDimensions: React.FC<FilterDimensionsProps> = ({
  filterRowType,
  setFilterRowType,
  channelWidthMm,
  setChannelWidthMm,
  channelHeightMm,
  setChannelHeightMm,
  airVolumeM3h,
  numEMCFlaps,
  bagsPerRow,
  designType
}) => {
  const { toast } = useToast();
  
  // Convert dimensions based on design type
  const isModular = designType === 'modular';
  const channelWidthDisplay = isModular ? (channelWidthMm / 25.4).toFixed(1) : channelWidthMm;
  const channelHeightDisplay = isModular ? (channelHeightMm / 25.4).toFixed(1) : channelHeightMm;
  const unitText = isModular ? 'in' : 'mm';
  
  // Calculate gas velocity
  const channelWidthM = channelWidthMm / 1000;
  const channelHeightM = channelHeightMm / 1000;
  const gasVelocityMS = channelWidthMm > 0 && channelHeightMm > 0 && airVolumeM3h ? 
    parseFloat(airVolumeM3h) * 1000000 / (3600 * channelWidthMm * channelHeightMm) : 0;
  
  const gasVelocityFPM = gasVelocityMS * 196.85;
  const velocityDisplay = isModular ? gasVelocityFPM.toFixed(0) : gasVelocityMS.toFixed(2);
  const velocityUnit = isModular ? 'ft/min' : 'm/s';
  
  const isVelocityTooHigh = gasVelocityMS > 12;
  
  // Calculate filter dimensions based on design type
  const filterWidth = bagsPerRow === 18 ? (2 * 4500 + channelWidthMm) : (3750 * 2 + channelWidthMm);
  const filterLength = filterRowType === 'single' ? numEMCFlaps * 1200 : (numEMCFlaps / 2) * 1200;
  
  const filterWidthDisplay = isModular ? (filterWidth / 25.4).toFixed(1) : filterWidth.toFixed(0);
  const filterLengthDisplay = isModular ? (filterLength / 25.4).toFixed(1) : filterLength.toFixed(0);
  
  // Handle input changes with unit conversion
  const handleWidthChange = (value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      const mmValue = isModular ? numValue * 25.4 : numValue;
      setChannelWidthMm(mmValue);
    }
  };

  const handleHeightChange = (value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      const mmValue = isModular ? numValue * 25.4 : numValue;
      setChannelHeightMm(mmValue);
    }
  };

  React.useEffect(() => {
    if (isVelocityTooHigh && channelWidthMm > 0 && channelHeightMm > 0 && airVolumeM3h) {
      toast({
        title: "High Gas Velocity Warning",
        description: `The inlet velocity (${gasVelocityMS.toFixed(2)} m/s) exceeds recommended maximum of 12 m/s`,
        variant: "destructive",
      });
    }
  }, [isVelocityTooHigh, channelWidthMm, channelHeightMm, airVolumeM3h, gasVelocityMS, toast]);

  return (
    <>
      <div className="flex items-center mb-4 animate-fadeIn">
        <div className="w-60 pr-4 calculator-field-label">
          <span>Filter Row Configuration:</span>
        </div>
        <div className="flex-1">
          <RadioGroup 
            value={filterRowType}
            onValueChange={setFilterRowType}
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="single" id="single-row" />
              <Label htmlFor="single-row" className="flex items-center cursor-pointer">
                <Columns2 className="h-4 w-4 mr-1" />
                <span>Single Row</span>
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="double" id="double-row" />
              <Label htmlFor="double-row" className="flex items-center cursor-pointer">
                <Columns3 className="h-4 w-4 mr-1" />
                <span>Double Row</span>
              </Label>
            </div>
          </RadioGroup>
        </div>
      </div>
      
      <div className="flex items-center mb-4 animate-fadeIn">
        <div className="w-60 pr-4 calculator-field-label">
          <span>Clean Gas Channel Width x Height:</span>
        </div>
        <div className="flex flex-1 space-x-2">
          <div className="w-1/2 relative">
            <input 
              type="number"
              value={channelWidthDisplay}
              onChange={(e) => handleWidthChange(e.target.value)}
              step={isModular ? 0.1 : 10}
              min={10}
              className="calculator-input pr-8 w-full"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">{unitText}</span>
          </div>
          <div className="w-1/2 relative">
            <input 
              type="number"
              value={channelHeightDisplay}
              onChange={(e) => handleHeightChange(e.target.value)}
              step={isModular ? 0.1 : 10}
              min={10}
              className="calculator-input pr-8 w-full"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">{unitText}</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center mb-4 animate-fadeIn">
        <div className="w-60 pr-4 calculator-field-label">
          <span>Gas velocity at filter inlet flange:</span>
        </div>
        <div className="flex flex-1 space-x-2">
          <div className="w-full relative">
            <input 
              type="text"
              value={velocityDisplay}
              readOnly
              className={cn("calculator-input pr-16 w-full bg-gray-50", 
                isVelocityTooHigh ? "border-red-300 text-red-700" : "")}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
              {velocityUnit}
            </span>
          </div>
        </div>
      </div>
      
      {isVelocityTooHigh && (
        <div className="bg-red-50 p-3 rounded-md text-xs text-red-700 mt-2 font-medium">
          Warning: Inlet velocity ({gasVelocityMS.toFixed(2)} m/s) should be maximum 12 m/s
        </div>
      )}
      
      <div className="flex items-center mb-4 animate-fadeIn">
        <div className="w-60 pr-4 calculator-field-label">
          <span>Filter dimensions: Width / Length</span>
        </div>
        <div className="flex flex-1 space-x-2">
          <div className="w-1/2 relative">
            <input 
              type="text"
              value={filterWidthDisplay}
              readOnly
              className="calculator-input pr-8 w-full bg-gray-50"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">{unitText}</span>
          </div>
          <div className="w-1/2 relative">
            <input 
              type="text"
              value={filterLengthDisplay}
              readOnly
              className="calculator-input pr-8 w-full bg-gray-50"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">{unitText}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterDimensions;
