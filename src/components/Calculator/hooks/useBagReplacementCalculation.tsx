
import { useMemo } from 'react';

export const useBagReplacementCalculation = (
  numEMCFlaps: number,
  bagsPerRow: number,
  bagChangeTime: number,
  numPeople: number,
  bagPrice: number,
  cagePrice: number = 0 // Added cagePrice with default value
) => {
  // Calculate bag replacement metrics
  const bagResults = useMemo(() => {
    try {
      // Calculate total bags
      const totalBags = numEMCFlaps * bagsPerRow * 5;
      
      // Calculate days to replace
      const daysToReplace = (totalBags * bagChangeTime / 60 / 10 / numPeople * 2) || 0;
      
      // Calculate material cost including both bags and cages
      const bagMaterialCost = totalBags * bagPrice + (totalBags * cagePrice);
      
      return {
        totalBags,
        daysToReplace,
        bagMaterialCost
      };
    } catch (error) {
      console.error("Error calculating bag replacement results:", error);
      // Return default values if calculation fails
      return {
        totalBags: 0,
        daysToReplace: 0,
        bagMaterialCost: 0
      };
    }
  }, [numEMCFlaps, bagsPerRow, bagChangeTime, numPeople, bagPrice, cagePrice]);

  return bagResults;
};
