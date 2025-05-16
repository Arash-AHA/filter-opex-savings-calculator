
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

  return {
    designType,
    setDesignType,
    showDimensions,
    setShowDimensions,
    showOtherParams,
    setShowOtherParams,
    filterRowType,
    setFilterRowType,
    channelWidthMm,
    setChannelWidthMm,
    channelHeightMm,
    setChannelHeightMm,
    modularFlapsLabel,
    panelizedFlapsLabel
  };
};
