import React from 'react';
import InputField from './InputField';
import YearlySavingsGraph from './YearlySavingsGraph';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Import the EnergyUnit type from the hook
import { EnergyUnit } from './hooks/useSavingsCalculation';

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
    cageSavings?: number;
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
  airVolumeACFM: string;
  numEMCFlaps: number | string;
  bagLength: number;
  formattedResults: any;
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
}) => {
  // Handle energy unit change
  const handleEnergyUnitChange = (value: string) => {
    setEnergyUnit(value as EnergyUnit);
  };
  
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField 
              label="Analysis Period (Years):" 
              value={savingYears} 
              onChange={value => setSavingYears(parseInt(value) || 0)} 
              type="number" 
              min={1}
              max={30}
            />
            <InputField 
              label="Annual Operating Hours:" 
              value={workingHours} 
              onChange={value => setWorkingHours(parseInt(value) || 0)} 
              type="number" 
              min={0}
              max={8760}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-2">Energy Unit:</label>
              <Select value={energyUnit} onValueChange={handleEnergyUnitChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select energy unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kWh">kWh</SelectItem>
                  <SelectItem value="MMBtu">MMBtu</SelectItem>
                  <SelectItem value="therms">therms</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <InputField 
              label={`Energy Cost (USD/${energyUnit}):`} 
              value={kwhCost} 
              onChange={value => setKwhCost(parseFloat(value) || 0)} 
              type="number" 
              min={0}
              step={0.01}
            />
          </div>
          
          <InputField 
            label="Compressed Air Cost (USD/Nm³):" 
            value={compressedAirCost} 
            onChange={value => setCompressedAirCost(value)} 
            type="number" 
            min={0}
            step={0.001}
            tooltip="Leave blank to calculate based on motor kW difference"
          />
        </div>
        
        <Card className="h-fit">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Total Savings (10 Years)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-center text-green-600">
              ${totalSavings.total.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">Savings Category</TableHead>
            <TableHead>Amount (USD)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Bag Material & Labor Savings</TableCell>
            <TableCell>${totalSavings.bagSavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}</TableCell>
          </TableRow>
          {totalSavings.cageSavings !== undefined && (
            <TableRow>
              <TableCell>Cage Replacement Savings</TableCell>
              <TableCell>${totalSavings.cageSavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}</TableCell>
            </TableRow>
          )}
          <TableRow>
            <TableCell>Fan Power Savings</TableCell>
            <TableCell>${totalSavings.fanPowerSavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Compressed Air Savings</TableCell>
            <TableCell>${totalSavings.airSavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-bold">Total Savings</TableCell>
            <TableCell className="font-bold">${totalSavings.total.toLocaleString(undefined, { maximumFractionDigits: 0 })}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      
      <div className="mt-8">
        <h3 className="text-lg font-medium mb-4">Yearly Savings Projection</h3>
        <YearlySavingsGraph 
          bagSavings={totalSavings.bagSavings / (savingYears * 12 / currentLifeTime)} 
          fanPowerSavings={totalSavings.fanPowerSavings} 
          airSavings={totalSavings.airSavings} 
          savingYears={savingYears} 
          bagChangeFrequency={currentLifeTime}
          cageReplacementFrequency={currentLifeTime * 2}
        />
      </div>
    </div>
  );
};

export default SavingsResults;
