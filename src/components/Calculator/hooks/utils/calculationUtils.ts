
/**
 * Utility functions for OPEX calculator calculations
 */

/**
 * Calculate filter area based on design type and parameters
 */
export const calculateFilterArea = (
  designType: string,
  bagLength: number, 
  bagsPerRow: number, 
  numEMCFlaps: number
): number => {
  if (designType === 'bolt-weld') {
    // PI()*165/1000*Bag length*5*No. bags in a row*No. EMC flaps
    return Math.PI * (165/1000) * bagLength * 5 * bagsPerRow * numEMCFlaps;
  } else {
    // For Modular design
    const surfaceAreaPerFoot = 4 * 0.292 * 0.3048; // Surface area per foot
    return numEMCFlaps * bagsPerRow * bagLength * surfaceAreaPerFoot;
  }
};

/**
 * Calculate net filter area (accounting for EMC cleaning)
 */
export const calculateNetFilterArea = (
  designType: string,
  bagLength: number, 
  bagsPerRow: number, 
  numEMCFlaps: number,
  emcCleaningFactor: number,
  totalArea: number
): number => {
  if (designType === 'bolt-weld') {
    // For bolt-weld design, use numEMCFlaps-1 in the calculation
    return Math.PI * (165/1000) * bagLength * 5 * bagsPerRow * (numEMCFlaps - 1);
  } else {
    // For modular design, keep using the emcCleaningFactor
    return totalArea * emcCleaningFactor;
  }
};

/**
 * Calculate suggested number of EMC flaps based on air volume and target A/C ratio
 */
export const suggestEMCFlaps = (
  designType: string,
  bagLength: number,
  bagsPerRow: number,
  airVolumeM3h: string
): number => {
  // Convert airVolumeM3h to number and handle empty string
  const airVolume = parseFloat(airVolumeM3h) || 0;
  
  // Define target A/C ratio based on design type
  const targetACRatio = designType === 'bolt-weld' ? 1.0 : 3.2;
  
  if (airVolume <= 0) {
    return designType === 'bolt-weld' ? 14 : 6; // Default values
  }
  
  // Calculate area per flap
  let areaPerFlap = 0;
  if (designType === 'bolt-weld') {
    areaPerFlap = Math.PI * (165/1000) * bagLength * 5 * bagsPerRow;
  } else {
    const surfaceAreaPerFoot = 4 * 0.292 * 0.3048; // Surface area per foot
    areaPerFlap = bagsPerRow * bagLength * surfaceAreaPerFoot;
  }
  
  // Calculate required number of flaps to meet target A/C ratio
  // Required area = airVolume / targetACRatio to ensure A/C ratio is less than the target
  const requiredArea = airVolume / targetACRatio;
  let suggestedFlaps = Math.ceil(requiredArea / areaPerFlap);
  
  // Ensure minimum number of flaps
  suggestedFlaps = Math.max(suggestedFlaps, designType === 'bolt-weld' ? 6 : 4);
  
  return suggestedFlaps;
};

/**
 * Format numbers as currency strings
 */
export const formatCurrency = (value: number): string => {
  return Number(value).toLocaleString(undefined, {
    minimumFractionDigits: 2, 
    maximumFractionDigits: 2
  });
};
