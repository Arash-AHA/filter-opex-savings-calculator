
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
      return designType === 'modular' 
        ? `${(parseFloat(airVolume) / 1.69901).toFixed(0)} m³/h`
        : `${airVolume} m³/h`;
    } else {
      return designType === 'modular'
        ? `${airVolume} ACFM`
        : `${(parseFloat(airVolume) * 1.69901).toFixed(0)} ACFM`;
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
