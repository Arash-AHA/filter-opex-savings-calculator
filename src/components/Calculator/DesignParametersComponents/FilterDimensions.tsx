
import React from 'react';
import { useToast } from '@/hooks/use-toast';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Columns2, Columns3 } from 'lucide-react';
import ChannelDimensionsInput from './Dimensions/ChannelDimensionsInput';
import GasVelocityInput from './Dimensions/GasVelocityInput';
import FilterDimensionsOutput from './Dimensions/FilterDimensionsOutput';

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

  // Calculate filter dimensions
  const dimensions = React.useMemo(() => {
    if (isModular) {
      const widthInches = 166 + (channelWidthMm / 25.4);
      let lengthInches = filterRowType === 'single' ? 
        (numEMCFlaps / 3) * 141 : 
        (numEMCFlaps / 6) * 141;
      
      return {
        width: widthInches.toFixed(1),
        length: lengthInches.toFixed(1)
      };
    } else {
      const filterWidth = bagsPerRow === 18 ? 
        (2 * 4500 + channelWidthMm) : 
        (3750 * 2 + channelWidthMm);
      const filterLength = filterRowType === 'single' ? 
        numEMCFlaps * 1200 : 
        (numEMCFlaps / 2) * 1200;
      
      return {
        width: filterWidth.toFixed(0),
        length: filterLength.toFixed(0)
      };
    }
  }, [isModular, channelWidthMm, filterRowType, numEMCFlaps, bagsPerRow]);

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
      
      <ChannelDimensionsInput 
        channelWidthDisplay={channelWidthDisplay}
        channelHeightDisplay={channelHeightDisplay}
        handleWidthChange={handleWidthChange}
        handleHeightChange={handleHeightChange}
        unitText={unitText}
      />
      
      <GasVelocityInput 
        velocityDisplay={velocityDisplay}
        velocityUnit={velocityUnit}
        isVelocityTooHigh={isVelocityTooHigh}
        gasVelocityMS={gasVelocityMS}
      />
      
      <FilterDimensionsOutput 
        dimensions={dimensions}
        unitText={unitText}
      />
    </>
  );
};

export default FilterDimensions;
