
import { useCallback, useMemo } from 'react';
import { calculateFilterArea, calculateNetFilterArea } from './utils/calculationUtils';

export const useFilterAreaCalculation = (
  designType: string,
  bagLength: number, 
  bagsPerRow: number, 
  numEMCFlaps: number,
  emcCleaningFactor: number,
  airVolumeM3h: string,
  airVolumeACFM?: string
) => {
  // Calculate filter area
  const calculateTotalFilterArea = useCallback(() => {
    return calculateFilterArea(designType, bagLength, bagsPerRow, numEMCFlaps);
  }, [designType, bagLength, bagsPerRow, numEMCFlaps]);
  
  // Calculate net filter area (accounting for EMC cleaning)
  const calculateTotalNetFilterArea = useCallback((totalArea: number) => {
    return calculateNetFilterArea(designType, bagLength, bagsPerRow, numEMCFlaps, emcCleaningFactor, totalArea);
  }, [designType, bagLength, bagsPerRow, numEMCFlaps, emcCleaningFactor]);
  
  // Calculate results
  const filterResults = useMemo(() => {
    try {
      // Calculate total filter area based on design type
      const totalFilterArea = calculateTotalFilterArea();
      const netFilterArea = calculateTotalNetFilterArea(totalFilterArea);
      
      // Calculate OPEX metrics - check for valid inputs to prevent NaN
      let parsedAirVolume: number;
      
      // For modular design, use ACFM value
      if (designType === 'modular' && airVolumeACFM) {
        parsedAirVolume = parseFloat(airVolumeACFM) || 0;
      } else {
        parsedAirVolume = parseFloat(airVolumeM3h) || 0;
      }
      
      const acRatioGross = parsedAirVolume / totalFilterArea || 0;
      const acRatioNet = parsedAirVolume / netFilterArea || 0;
      const baselinePowerConsumption = parsedAirVolume * 0.0002 || 0; // 0.0002 kW per m³/h
      const improvedPowerConsumption = baselinePowerConsumption * 0.8 || 0; // 20% reduction
      
      return {
        filterArea: totalFilterArea,
        netFilterArea: netFilterArea,
        acRatioGross: acRatioGross,
        acRatioNet: acRatioNet,
        baselinePower: baselinePowerConsumption,
        improvedPower: improvedPowerConsumption
      };
    } catch (error) {
      console.error("Error calculating filter results:", error);
      // Return default values if calculation fails
      return {
        filterArea: 0,
        netFilterArea: 0,
        acRatioGross: 0,
        acRatioNet: 0,
        baselinePower: 0,
        improvedPower: 0
      };
    }
  }, [calculateTotalFilterArea, calculateTotalNetFilterArea, airVolumeM3h, airVolumeACFM, designType]);

  return filterResults;
};
