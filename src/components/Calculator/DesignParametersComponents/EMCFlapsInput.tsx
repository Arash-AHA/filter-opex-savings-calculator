
import React, { useState, useEffect } from 'react';
import { HelpCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useToast } from '@/hooks/use-toast';
import EMCFlapsTooltip from './EMCFlapsTooltip';

interface EMCFlapsInputProps {
  numEMCFlaps: number | string;
  setNumEMCFlaps: (value: number | string) => void;
  suggestedFlaps: number | null;
  designType: string;
  airVolumeM3h: string;
  airVolumeACFM: string;
  bagsPerRow: number;
  bagLength: number;
  currentAcRatio: number;
}

const EMCFlapsInput: React.FC<EMCFlapsInputProps> = ({
  numEMCFlaps,
  setNumEMCFlaps,
  suggestedFlaps,
  designType,
  airVolumeM3h,
  airVolumeACFM,
  bagsPerRow,
  bagLength,
  currentAcRatio,
}) => {
  const [inputValue, setInputValue] = useState<string>(numEMCFlaps.toString());
  const { toast } = useToast();

  useEffect(() => {
    setInputValue(numEMCFlaps.toString());
  }, [numEMCFlaps]);

  const handleEMCFlapsInputChange = (value: string) => {
    setInputValue(value);
  };

  const handleEMCFlapsBlur = () => {
    if (inputValue === '') {
      setNumEMCFlaps('');
      return;
    }

    const parsedValue = parseInt(inputValue);
    if (!isNaN(parsedValue)) {
      if (designType === 'modular') {
        if (parsedValue % 3 !== 0) {
          toast({
            title: "Invalid EMC Flaps Number",
            description: "For modular design, the number of EMC flaps must be a multiple of 3 (each Module has 3 EMC dampers)",
            variant: "destructive",
          });
          setInputValue(numEMCFlaps.toString());
          return;
        }
        
        const areaPerFlap = bagLength * bagsPerRow * 5 * 1.6;
        const totalArea = areaPerFlap * parsedValue;
        const airVolume = parseFloat(airVolumeACFM) || 0;
        const acRatio = totalArea > 0 ? airVolume / totalArea : 0;
        
        if (acRatio > 3.2) {
          toast({
            title: "Warning: High A/C Ratio",
            description: "The selected number of EMC flaps results in an A/C ratio above 3.2. Consider increasing the number of flaps.",
            variant: "destructive",
          });
        }
      }
      setNumEMCFlaps(parsedValue);
    } else {
      setInputValue(numEMCFlaps.toString());
    }
  };

  const applySuggestedFlaps = () => {
    if (suggestedFlaps) {
      setNumEMCFlaps(suggestedFlaps);
    }
  };

  return (
    <div className="flex items-center mb-4">
      <div className="w-60 pr-4 calculator-field-label flex items-center">
        <span>TOTAL No. EMC Flaps:</span>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <HelpCircle size={16} className="ml-2 text-gray-500 cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent side="right" className="max-w-xs p-4">
              <EMCFlapsTooltip
                suggestedFlaps={suggestedFlaps}
                designType={designType}
                airVolumeM3h={airVolumeM3h}
                airVolumeACFM={airVolumeACFM}
                bagsPerRow={bagsPerRow}
                bagLength={bagLength}
                currentAcRatio={currentAcRatio}
                onApplySuggestion={applySuggestedFlaps}
              />
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="flex-1">
        <div>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => handleEMCFlapsInputChange(e.target.value)}
            onBlur={handleEMCFlapsBlur}
            className="calculator-input w-full"
            placeholder="Enter value"
          />
        </div>
      </div>
    </div>
  );
};

export default EMCFlapsInput;
