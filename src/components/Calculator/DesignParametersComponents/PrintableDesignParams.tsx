
import React, { useState } from 'react';
import { FilterDesignSection } from '../PrintableSections/FilterDesignSection';
import { FilterParametersSection } from '../PrintableSections/FilterParametersSection';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export interface PrintableDesignParamsProps {
  designType: string;
  numEMCFlaps: number | string;
  bagsPerRow: number;
  bagLength: number;
  airVolumeM3h: string;
  airVolumeACFM: string;
  formattedResults: {
    filterArea: string;
    netFilterArea: string;
    acRatioGross: string;
    acRatioNet: string;
    totalBags: number;
  } | null;
  filterRowType?: string;
}

const PrintableDesignParams: React.FC<PrintableDesignParamsProps> = ({
  designType,
  numEMCFlaps,
  bagsPerRow,
  bagLength,
  airVolumeM3h,
  airVolumeACFM,
  formattedResults,
  filterRowType = 'single'
}) => {
  // Initialize unit system based on design type
  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>(
    designType === 'bolt-weld' ? 'metric' : 'imperial'
  );
  
  // For modular design, if numEMCFlaps is odd, force single row
  const effectiveFilterRowType = (() => {
    if (designType === 'modular') {
      const flapsValue = typeof numEMCFlaps === 'string' ? parseInt(numEMCFlaps) || 0 : numEMCFlaps || 0;
      return flapsValue % 2 !== 0 ? 'single' : filterRowType;
    }
    return filterRowType;
  })();
  
  // Convert values based on selected unit system
  const convertedValues = {
    airVolume: unitSystem === 'metric' 
      ? (designType === 'bolt-weld' ? `${airVolumeM3h} m³/h` : `${(parseFloat(airVolumeACFM) / 1.69901).toFixed(0)} m³/h`)
      : (designType === 'bolt-weld' ? `${(parseFloat(airVolumeM3h) * 1.69901).toFixed(0)} ACFM` : `${airVolumeACFM} ACFM`),
      
    bagLength: unitSystem === 'metric'
      ? (designType === 'bolt-weld' ? `${bagLength} m` : `${(bagLength * 0.3048).toFixed(2)} m`)
      : (designType === 'bolt-weld' ? `${(bagLength / 0.3048).toFixed(2)} ft` : `${bagLength} ft`),
      
    filterArea: unitSystem === 'metric'
      ? (designType === 'bolt-weld' 
          ? formattedResults?.filterArea 
          : `${(parseFloat(formattedResults?.filterArea.replace(/[^0-9.]/g, '') || '0') / 10.7639).toFixed(2)} m²`)
      : (designType === 'bolt-weld' 
          ? `${(parseFloat(formattedResults?.filterArea.replace(/[^0-9.]/g, '') || '0') * 10.7639).toFixed(2)} sq ft` 
          : formattedResults?.filterArea),
          
    netFilterArea: unitSystem === 'metric'
      ? (designType === 'bolt-weld' 
          ? formattedResults?.netFilterArea 
          : `${(parseFloat(formattedResults?.netFilterArea.replace(/[^0-9.]/g, '') || '0') / 10.7639).toFixed(2)} m²`)
      : (designType === 'bolt-weld' 
          ? `${(parseFloat(formattedResults?.netFilterArea.replace(/[^0-9.]/g, '') || '0') * 10.7639).toFixed(2)} sq ft` 
          : formattedResults?.netFilterArea),
          
    acRatioGross: unitSystem === 'metric'
      ? (designType === 'bolt-weld' 
          ? formattedResults?.acRatioGross 
          : `${(parseFloat(formattedResults?.acRatioGross.replace(/[^0-9.]/g, '') || '0') / 3.28084).toFixed(2)} m³/min/m²`)
      : (designType === 'bolt-weld' 
          ? `${(parseFloat(formattedResults?.acRatioGross.replace(/[^0-9.]/g, '') || '0') * 3.28084).toFixed(2)} ft/min` 
          : formattedResults?.acRatioGross),
          
    acRatioNet: unitSystem === 'metric'
      ? (designType === 'bolt-weld' 
          ? formattedResults?.acRatioNet 
          : `${(parseFloat(formattedResults?.acRatioNet.replace(/[^0-9.]/g, '') || '0') / 3.28084).toFixed(2)} m³/min/m²`)
      : (designType === 'bolt-weld' 
          ? `${(parseFloat(formattedResults?.acRatioNet.replace(/[^0-9.]/g, '') || '0') * 3.28084).toFixed(2)} ft/min` 
          : formattedResults?.acRatioNet),
  };

  // Handle bagLength value for passing to FilterDesignSection
  // Convert to the appropriate units and handle potential null/NaN values
  const convertedBagLength = (() => {
    if (bagLength === null || isNaN(bagLength)) {
      return null;
    }
    return unitSystem === 'metric' 
      ? (designType === 'bolt-weld' ? bagLength : (bagLength * 0.3048)) 
      : (designType === 'bolt-weld' ? (bagLength / 0.3048) : bagLength);
  })();

  return (
    <div className="p-6 space-y-8">
      <div className="print:hidden mb-4">
        <Select value={unitSystem} onValueChange={(value: 'metric' | 'imperial') => setUnitSystem(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select unit system" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="metric">Metric Units</SelectItem>
            <SelectItem value="imperial">Imperial Units</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <FilterDesignSection
        designType={designType}
        airVolume={convertedValues.airVolume}
        numEMCFlaps={numEMCFlaps}
        bagLength={convertedBagLength}
        unitSystem={unitSystem}
        filterRowType={effectiveFilterRowType}
      />
      
      {formattedResults && (
        <FilterParametersSection
          filterArea={convertedValues.filterArea}
          netFilterArea={convertedValues.netFilterArea}
          acRatioGross={convertedValues.acRatioGross}
          acRatioNet={convertedValues.acRatioNet}
          totalBags={formattedResults.totalBags}
        />
      )}
    </div>
  );
};

export default PrintableDesignParams;
