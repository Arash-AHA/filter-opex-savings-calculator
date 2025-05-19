import { useState, useEffect } from 'react';

export const useDesignType = () => {
  const [designType, setDesignType] = useState('bolt-weld');
  const [showDimensions, setShowDimensions] = useState(false);
  const [showOtherParams, setShowOtherParams] = useState(false);
  const [filterRowType, setFilterRowType] = useState('single');
  const [channelWidthMm, setChannelWidthMm] = useState(3150);
  const [channelHeightMm, setChannelHeightMm] = useState(3000);
  // Add labels for EMC flaps based on design type
  const modularFlapsLabel = "TOTAL Quantity of EMC Flaps: (Modular)";
  const panelizedFlapsLabel = "TOTAL Quantity of EMC Flaps: (Panelized)";

  // Hide dimensions if modular design is selected
  useEffect(() => {
    if (designType === 'modular') {
      setShowDimensions(false);
    }
  }, [designType]);

  // Function to set filter row type with validation for odd EMC flaps
  const setFilterRowTypeWithValidation = (value: string, numEMCFlaps?: number | string) => {
    // If EMC flaps is provided and we're attempting to set double row with odd flaps,
    // prevent the change and keep it as single row
    if (numEMCFlaps !== undefined) {
      const flapsValue = typeof numEMCFlaps === 'string' ? 
        (numEMCFlaps === '' ? 0 : parseInt(numEMCFlaps)) : numEMCFlaps || 0;
        
      if (value === 'double' && flapsValue % 2 !== 0) {
        // For odd number of flaps, force single row configuration
        setFilterRowType('single');
        return;
      }
    }
    
    // Otherwise, set the requested filter row type
    setFilterRowType(value);
  };

  return {
    designType,
    setDesignType,
    showDimensions,
    setShowDimensions,
    showOtherParams,
    setShowOtherParams,
    filterRowType,
    setFilterRowType: setFilterRowTypeWithValidation,
    channelWidthMm,
    setChannelWidthMm,
    channelHeightMm,
    setChannelHeightMm,
    modularFlapsLabel,
    panelizedFlapsLabel
  };
};
