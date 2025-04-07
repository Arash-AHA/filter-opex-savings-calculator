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
 * Format numbers as currency strings
 */
export const formatCurrency = (value: number): string => {
  return Number(value).toLocaleString(undefined, {
    minimumFractionDigits: 2, 
    maximumFractionDigits: 2
  });
};
