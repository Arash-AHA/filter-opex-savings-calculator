
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
  const [inputValue, setInputValue] = useState<string>(numEMCFlaps !== '' ? numEMCFlaps.toString() : '');
  const { toast } = useToast();

  // Update local state when numEMCFlaps changes from parent
  useEffect(() => {
    setInputValue(numEMCFlaps !== '' ? numEMCFlaps.toString() : '');
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
        // Check if the value is a multiple of 3
        if (parsedValue % 3 !== 0) {
          // Round up to the next multiple of 3
          const adjustedValue = Math.ceil(parsedValue / 3) * 3;
          toast({
            title: "Adjusted EMC Flaps Number",
            description: `For modular design, the number of EMC flaps must be a multiple of 3. Value adjusted to ${adjustedValue}.`,
            variant: "default",
          });
          setInputValue(adjustedValue.toString());
          setNumEMCFlaps(adjustedValue);
          return;
        }
        
        // Check A/C ratio even if multiple of 3 is valid
        if (airVolumeACFM && airVolumeACFM !== '' && parsedValue > 0) {
          const areaPerFlap = bagLength * bagsPerRow * 5 * 1.6;
          const totalArea = areaPerFlap * parsedValue;
          const airVolume = parseFloat(airVolumeACFM) || 0;
          const acRatio = totalArea > 0 ? airVolume / totalArea : 0;
          
          if (acRatio > 3.2) {
            // Round up to the next multiple of 3
            const adjustedValue = parsedValue + 3;
            toast({
              title: "Warning: High A/C Ratio",
              description: `Increasing EMC flaps to ${adjustedValue} to maintain A/C ratio below 3.2.`,
              variant: "destructive",
            });
            setInputValue(adjustedValue.toString());
            setNumEMCFlaps(adjustedValue);
            return;
          }
        }
      }
      setNumEMCFlaps(parsedValue);
    } else {
      setInputValue(numEMCFlaps !== '' ? numEMCFlaps.toString() : '');
    }
  };

  const applySuggestedFlaps = () => {
    if (suggestedFlaps) {
      if (designType === 'modular') {
        // Ensure suggested value is also a multiple of 3
        const adjustedSuggested = Math.ceil(suggestedFlaps / 3) * 3;
        setNumEMCFlaps(adjustedSuggested);
      } else {
        setNumEMCFlaps(suggestedFlaps);
      }
    }
  };

  return (
    <div className="flex flex-col mb-4">
      <div className="w-full calculator-field-label mb-2 flex items-center">
        <span>TOTAL Quantity of EMC Flaps:</span>
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
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => handleEMCFlapsInputChange(e.target.value)}
          onBlur={handleEMCFlapsBlur}
          className="calculator-input w-full"
          placeholder="Enter quantity"
        />
      </div>
    </div>
  );
};

export default EMCFlapsInput;
