import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useUnitConversion } from './hooks/useUnitConversion';
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
  const { unitSystem, setUnitSystem, convertedValues } = useUnitConversion(
    designType,
    filterArea,
    netFilterArea,
    acRatioGross,
    acRatioNet,
    airVolume
  );

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
        bagLength={bagLength}
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
