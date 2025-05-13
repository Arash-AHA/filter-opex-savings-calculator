import React, { useEffect, useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { EnergyUnit } from './hooks/useSavingsCalculation';
import ResultCard from './ResultCard';
import YearlySavingsGraph from './YearlySavingsGraph';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

interface SavingsResultsProps {
  savingYears: number;
  setSavingYears: (value: number) => void;
  workingHours: number;
  setWorkingHours: (value: number) => void;
  kwhCost: number;
  setKwhCost: (value: number) => void;
  compressedAirCost: string;
  setCompressedAirCost: (value: string) => void;
  energyUnit: EnergyUnit;
  setEnergyUnit: (value: EnergyUnit) => void;
  totalSavings: {
    bagSavings: number;
    fanPowerSavings: number;
    airSavings: number;
    total: number;
  };
  currentLifeTime: number;
  scheuchLifeTime: number;
  currentDiffPressure: number;
  scheuchDiffPressure: number;
  currentAirConsumption: number;
  scheuchAirConsumption: number;
  currentMotorKW: number;
  scheuchMotorKW: number;
  designType: string;
  airVolumeM3h: string;
  airVolumeACFM?: string;
  numEMCFlaps: string | number;
  bagLength: number;
  formattedResults: any;
  bagPrice?: number;   // Added bagPrice
  cagePrice?: number;  // Added cagePrice
  totalBags?: number;  // Added totalBags
}

const SavingsResults: React.FC<SavingsResultsProps> = ({
  savingYears,
  setSavingYears,
  workingHours,
  setWorkingHours,
  kwhCost,
  setKwhCost,
  compressedAirCost,
  setCompressedAirCost,
  energyUnit,
  setEnergyUnit,
  totalSavings,
  currentLifeTime,
  scheuchLifeTime,
  currentDiffPressure,
  scheuchDiffPressure,
  currentAirConsumption,
  scheuchAirConsumption,
  currentMotorKW,
  scheuchMotorKW,
  designType,
  airVolumeM3h,
  airVolumeACFM,
  numEMCFlaps,
  bagLength,
  formattedResults,
  bagPrice = 0,        // Default value for bagPrice
  cagePrice = 0,       // Default value for cagePrice
  totalBags = 0        // Default value for totalBags
}) => {
  const isMobile = useIsMobile();
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // You can perform any side effects here, like logging or additional calculations
  }, [totalSavings]);

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4">Savings Assumptions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="savingYears">Analysis Timeframe (Years)</Label>
            <Input
              type="number"
              id="savingYears"
              value={savingYears}
              onChange={(e) => setSavingYears(Number(e.target.value))}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="workingHours">Annual Working Hours</Label>
            <Input
              type="number"
              id="workingHours"
              value={workingHours}
              onChange={(e) => setWorkingHours(Number(e.target.value))}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="kwhCost">Cost per kWh (USD)</Label>
            <Input
              type="number"
              id="kwhCost"
              step="0.01"
              value={kwhCost}
              onChange={(e) => setKwhCost(Number(e.target.value))}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="compressedAirCost">Compressed Air Cost (USD/Nm³)</Label>
            <Input
              type="number"
              id="compressedAirCost"
              step="0.01"
              value={compressedAirCost}
              onChange={(e) => setCompressedAirCost(e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="energyUnit">Energy Unit</Label>
            <Select value={energyUnit} onValueChange={setEnergyUnit}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Energy Unit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="kWh">kWh</SelectItem>
                <SelectItem value="MMBtu">MMBtu</SelectItem>
                <SelectItem value="therms">Therms</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ResultCard title="Bag Material & Labor Savings" value={totalSavings.bagSavings} currency="USD" />
        <ResultCard title="Fan Power Savings" value={totalSavings.fanPowerSavings} currency="USD" />
        <ResultCard title="Compressed Air Savings" value={totalSavings.airSavings} currency="USD" />
        <ResultCard title="Total Savings" value={totalSavings.total} currency="USD" />
      </div>

      <div className="border rounded-lg p-4 bg-white shadow-sm">
        <h3 className="text-lg font-medium mb-4">Yearly Savings Projection</h3>
        <YearlySavingsGraph 
          bagSavings={totalSavings.bagSavings} 
          fanPowerSavings={totalSavings.fanPowerSavings} 
          airSavings={totalSavings.airSavings}
          savingYears={savingYears}
          scheuchMotorKW={scheuchMotorKW}
          kwhCost={kwhCost}
          workingHours={workingHours}
          totalBags={totalBags}
          bagPrice={bagPrice}
          cagePrice={cagePrice}
        />
      </div>
    </div>
  );
};

export default SavingsResults;
