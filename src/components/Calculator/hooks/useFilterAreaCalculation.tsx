import { useCallback, useMemo, useEffect } from 'react';
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
  // Log input parameters whenever they change
  useEffect(() => {
    console.log('useFilterAreaCalculation input parameters:');
    console.log(`designType: ${designType}`);
    console.log(`bagLength: ${bagLength}`);
    console.log(`bagsPerRow: ${bagsPerRow}`);
    console.log(`numEMCFlaps: ${numEMCFlaps}`);
    console.log(`emcCleaningFactor: ${emcCleaningFactor}`);
    console.log(`airVolumeM3h: ${airVolumeM3h}`);
    console.log(`airVolumeACFM: ${airVolumeACFM}`);
    
    // Check if this is the calculation shown in the picture with updated formula
    if (designType === 'modular' && bagLength === 24 && bagsPerRow === 15 && numEMCFlaps === 12) {
      const manualCalculation = 24 * 12 * 5 * 1.6 * 15 * 12;
      console.log(`DEBUG: Manual calculation check with updated formula: 24 * 12 * 5 * 1.6 * 15 * 12 = ${manualCalculation}`);
    }
  }, [designType, bagLength, bagsPerRow, numEMCFlaps, emcCleaningFactor, airVolumeM3h, airVolumeACFM]);

  // Calculate filter area
  const calculateTotalFilterArea = useCallback(() => {
    // Verify input values used in calculation
    console.log(`Calculating total filter area with: bagLength=${bagLength}, bagsPerRow=${bagsPerRow}, numEMCFlaps=${numEMCFlaps}`);
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
      console.log(`Calculated totalFilterArea: ${totalFilterArea}`);
      
      const netFilterArea = calculateTotalNetFilterArea(totalFilterArea);
      console.log(`Calculated netFilterArea: ${netFilterArea}`);
      
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
      
      console.log(`Calculated acRatioGross: ${acRatioGross}`);
      console.log(`Calculated acRatioNet: ${acRatioNet}`);
      
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
