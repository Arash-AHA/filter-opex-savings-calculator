
import React, { useState, useEffect } from 'react';
import { HelpCircle, AlertCircle, Check } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useToast } from '@/hooks/use-toast';
import EMCFlapsTooltip from './EMCFlapsTooltip';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

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
  const [inputValue, setInputValue] = useState<string>(numEMCFlaps?.toString() || '');
  const [overrideACLimit, setOverrideACLimit] = useState<boolean>(false);
  const [showACWarning, setShowACWarning] = useState<boolean>(false);
  const { toast } = useToast();

  // Store override status in sessionStorage to persist across configuration changes
  useEffect(() => {
    // Load override status on component mount
    const savedOverride = sessionStorage.getItem('acRatioOverride') === 'true';
    if (savedOverride) {
      setOverrideACLimit(savedOverride);
    }
  }, []);

  // Update inputValue when numEMCFlaps changes externally
  useEffect(() => {
    setInputValue(numEMCFlaps?.toString() || '');
  }, [numEMCFlaps]);

  useEffect(() => {
    // Reset override only when design type changes from modular to bolt-weld
    if (designType !== 'modular') {
      setOverrideACLimit(false);
      setShowACWarning(false);
      // Clear storage when changing away from modular
      sessionStorage.removeItem('acRatioOverride');
    }
  }, [designType]);

  // Check if warning should be shown when inputs affecting A/C ratio change
  useEffect(() => {
    if (designType === 'modular' && numEMCFlaps) {
      const parsedValue = typeof numEMCFlaps === 'string' ? 
                         (numEMCFlaps === '' ? 0 : parseInt(numEMCFlaps)) : 
                         numEMCFlaps;
      
      // Only check if we have valid inputs
      if (parsedValue > 0 && bagsPerRow > 0 && bagLength > 0 && airVolumeACFM) {
        const { isValid } = checkACRatio(parsedValue);
        setShowACWarning(!isValid);
      }
    }
  }, [airVolumeACFM, bagsPerRow, bagLength, designType]);

  const handleEMCFlapsInputChange = (value: string) => {
    setInputValue(value);
  };

  const checkACRatio = (parsedValue: number): { isValid: boolean; acRatio: number } => {
    if (designType === 'modular') {
      const areaPerFlap = bagLength * bagsPerRow * 5 * 1.6;
      const totalArea = areaPerFlap * parsedValue;
      const airVolume = parseFloat(airVolumeACFM) || 0;
      const acRatio = totalArea > 0 ? airVolume / totalArea : 0;
      
      return { isValid: acRatio <= 3.2 || overrideACLimit, acRatio };
    }
    
    return { isValid: true, acRatio: 0 };
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
        
        // If the number of flaps is odd (e.g. 9, 15, etc.), alert user about row type limitation
        if (parsedValue % 2 !== 0) {
          toast({
            title: "Single Row Configuration Required",
            description: `With ${parsedValue} EMC flaps, only single row configuration is possible.`,
            variant: "default",
          });
        }
        
        // Check A/C ratio if not overridden
        const { isValid, acRatio } = checkACRatio(parsedValue);
        
        if (!isValid) {
          // Show warning but don't change value if override is disabled
          setShowACWarning(true);
          return;
        } else {
          // Hide warning if previously shown
          setShowACWarning(false);
        }
      }
      setNumEMCFlaps(parsedValue);
    } else {
      setInputValue(numEMCFlaps?.toString() || '');
    }
  };

  // Handle Enter key press to trigger blur effect
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleEMCFlapsBlur();
    }
  };

  // For bolt-weld design only, provide apply suggested option
  const applySuggestedFlaps = () => {
    if (suggestedFlaps && designType === 'bolt-weld') {
      setNumEMCFlaps(suggestedFlaps);
    } else if (suggestedFlaps && designType === 'modular') {
      // For modular, only apply if user explicitly requests via tooltip button
      // Ensure it's a multiple of 3
      const adjustedSuggested = Math.ceil(suggestedFlaps / 3) * 3;
      setNumEMCFlaps(adjustedSuggested);
    }
  };

  // Handle override button click
  const handleOverrideClick = () => {
    setOverrideACLimit(true);
    // Save override status to sessionStorage for persistence
    sessionStorage.setItem('acRatioOverride', 'true');
    setShowACWarning(false);
    
    // Apply the current input value after override
    const parsedValue = parseInt(inputValue);
    if (!isNaN(parsedValue)) {
      setNumEMCFlaps(parsedValue);
      toast({
        title: "A/C Ratio Limit Overridden",
        description: "The Air-to-Cloth ratio limit has been overridden for this calculation.",
        variant: "default",
      });
    }
  };

  // Set the label text based on design type
  const emcFlapsLabel = designType === 'modular' 
    ? "TOTAL Quantity of EMC Flaps: (Modular)" 
    : "TOTAL Quantity of EMC Flaps: (Panelized)";

  return (
    <div className="flex flex-col mb-4">
      <div className="w-full calculator-field-label mb-2 flex items-center">
        <span>{emcFlapsLabel}</span>
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
          onKeyDown={handleKeyDown}
          className={`calculator-input w-full ${showACWarning ? 'border-red-500' : ''}`}
          placeholder="Enter value"
        />
      </div>
      
      {showACWarning && designType === 'modular' && (
        <Alert variant="destructive" className="mt-2">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="flex justify-between items-center">
            <span>A/C Ratio exceeds 3.2 with this configuration.</span>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleOverrideClick}
              className="flex items-center gap-1 border-red-500 hover:bg-red-50"
            >
              <Check className="h-4 w-4" /> Override Limit
            </Button>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default EMCFlapsInput;
