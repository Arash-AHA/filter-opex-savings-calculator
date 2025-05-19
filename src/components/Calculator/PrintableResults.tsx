
import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FilterDesignSection } from './PrintableSections/FilterDesignSection';
import { FilterParametersSection } from './PrintableSections/FilterParametersSection';
import { SavingsSection } from './PrintableSections/SavingsSection';

interface PrintableResultsProps {
  // Design Configuration
  designType: string;
  airVolume: string;
  numEMCFlaps: number | string;
  bagLength: number;
  
  // Filter Parameters
  filterArea: string;
  netFilterArea: string;
  acRatioGross: string;
  acRatioNet: string;
  totalBags: number;
  
  // Savings Parameters
  savingYears: number;
  bagSavings: number;
  fanPowerSavings: number;
  airSavings: number;
  totalSavings: number;
}

const PrintableResults: React.FC<PrintableResultsProps> = ({
  designType,
  airVolume,
  numEMCFlaps,
  bagLength,
  filterArea,
  netFilterArea,
  acRatioGross,
  acRatioNet,
  totalBags,
  savingYears,
  bagSavings,
  fanPowerSavings,
  airSavings,
  totalSavings
}) => {
  // Initialize unit system based on design type
  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>(
    designType === 'bolt-weld' ? 'metric' : 'imperial'
  );
  
  // Convert values based on selected unit system
  const convertedValues = {
    // Air volume conversion
    airVolume: unitSystem === 'metric' 
      ? (designType === 'modular' 
          ? `${(parseFloat(airVolume.replace(/[^0-9.]/g, '') || '0') / 1.69901).toFixed(0)} m³/h`
          : airVolume)
      : (designType === 'bolt-weld' 
          ? `${(parseFloat(airVolume.replace(/[^0-9.]/g, '') || '0') * 1.69901).toFixed(0)} ACFM`
          : airVolume),
    
    // Filter area conversions
    filterArea: unitSystem === 'metric'
      ? (designType === 'bolt-weld' 
          ? filterArea
          : `${(parseFloat(filterArea.replace(/[^0-9.]/g, '') || '0') / 10.7639).toFixed(2)} m²`)
      : (designType === 'bolt-weld' 
          ? `${(parseFloat(filterArea.replace(/[^0-9.]/g, '') || '0') * 10.7639).toFixed(2)} sq ft`
          : filterArea),
    
    netFilterArea: unitSystem === 'metric'
      ? (designType === 'bolt-weld' 
          ? netFilterArea
          : `${(parseFloat(netFilterArea.replace(/[^0-9.]/g, '') || '0') / 10.7639).toFixed(2)} m²`)
      : (designType === 'bolt-weld' 
          ? `${(parseFloat(netFilterArea.replace(/[^0-9.]/g, '') || '0') * 10.7639).toFixed(2)} sq ft`
          : netFilterArea),
    
    // A/C ratio conversions
    acRatioGross: unitSystem === 'metric'
      ? (designType === 'bolt-weld' 
          ? acRatioGross
          : `${(parseFloat(acRatioGross.replace(/[^0-9.]/g, '') || '0') / 3.28084).toFixed(2)} m³/min/m²`)
      : (designType === 'bolt-weld' 
          ? `${(parseFloat(acRatioGross.replace(/[^0-9.]/g, '') || '0') * 3.28084).toFixed(2)} ft/min`
          : acRatioGross),
    
    acRatioNet: unitSystem === 'metric'
      ? (designType === 'bolt-weld' 
          ? acRatioNet
          : `${(parseFloat(acRatioNet.replace(/[^0-9.]/g, '') || '0') / 3.28084).toFixed(2)} m³/min/m²`)
      : (designType === 'bolt-weld' 
          ? `${(parseFloat(acRatioNet.replace(/[^0-9.]/g, '') || '0') * 3.28084).toFixed(2)} ft/min`
          : acRatioNet),
  };

  return (
    <div className="p-6 print:p-0 space-y-8">
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
      />

      <FilterParametersSection
        filterArea={convertedValues.filterArea}
        netFilterArea={convertedValues.netFilterArea}
        acRatioGross={convertedValues.acRatioGross}
        acRatioNet={convertedValues.acRatioNet}
        totalBags={totalBags}
      />

      <SavingsSection
        savingYears={savingYears}
        bagSavings={bagSavings}
        fanPowerSavings={fanPowerSavings}
        airSavings={airSavings}
        totalSavings={totalSavings}
      />
    </div>
  );
};

export default PrintableResults;
