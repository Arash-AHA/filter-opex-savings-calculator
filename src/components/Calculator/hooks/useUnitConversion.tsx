
import { useState } from 'react';

interface UnitConversionResult {
  filterArea: string;
  netFilterArea: string;
  acRatioGross: string;
  acRatioNet: string;
  airVolume: string;
}

export const useUnitConversion = (
  designType: string,
  filterArea: string,
  netFilterArea: string,
  acRatioGross: string,
  acRatioNet: string,
  airVolume: string,
) => {
  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('metric');

  const airVolumeDisplay = () => {
    if (unitSystem === 'metric') {
      // For metric display, always show m³/h
      return `${airVolume} m³/h`;
    } else {
      // For imperial display, show ACFM (convert from m³/h if needed)
      const acfmValue = parseFloat(airVolume) * 0.588774;
      return `${acfmValue.toFixed(0)} ACFM`;
    }
  };

  const convertedValues: UnitConversionResult = {
    filterArea: unitSystem === 'imperial' 
      ? `${(parseFloat(filterArea) * 10.7639).toFixed(1)} ft²` 
      : `${filterArea} m²`,
    netFilterArea: unitSystem === 'imperial'
      ? `${(parseFloat(netFilterArea) * 10.7639).toFixed(1)} ft²`
      : `${netFilterArea} m²`,
    acRatioGross: unitSystem === 'imperial'
      ? `${(parseFloat(acRatioGross) * 3.28084).toFixed(1)} ft/min`
      : `${acRatioGross} m³/m²/min`,
    acRatioNet: unitSystem === 'imperial'
      ? `${(parseFloat(acRatioNet) * 3.28084).toFixed(1)} ft/min`
      : `${acRatioNet} m³/m²/min`,
    airVolume: airVolumeDisplay()
  };

  return { unitSystem, setUnitSystem, convertedValues };
};
