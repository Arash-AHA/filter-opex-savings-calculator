
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
  onEraseInputs?: () => void;
}

const PrintableDesignParams: React.FC<PrintableDesignParamsProps> = ({
  designType,
  numEMCFlaps,
  bagsPerRow,
  bagLength,
  airVolumeM3h,
  airVolumeACFM,
  formattedResults,
  onEraseInputs
}) => {
  // Initialize unit system based on design type
  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>(
    designType === 'bolt-weld' ? 'metric' : 'imperial'
  );
  
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
        bagLength={unitSystem === 'metric' 
          ? (designType === 'bolt-weld' ? bagLength : (bagLength * 0.3048)) 
          : (designType === 'bolt-weld' ? (bagLength / 0.3048) : bagLength)}
        unitSystem={unitSystem}
        onEraseInputs={onEraseInputs}
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
