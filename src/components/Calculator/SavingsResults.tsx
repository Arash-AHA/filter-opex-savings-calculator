import React from 'react';
import InputField from './InputField';
import ResultCard from './ResultCard';

interface SavingsResultsProps {
  savingYears: number;
  setSavingYears: (value: number) => void;
  daysPerYear: number;
  setDaysPerYear: (value: number) => void;
  hoursPerDay: number;
  setHoursPerDay: (value: number) => void;
  workingHours: number;
  setWorkingHours: (value: number) => void;
  kwhCost: number;
  setKwhCost: (value: number) => void;
  compressedAirCost: string;
  setCompressedAirCost: (value: string) => void;
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
}

const SavingsResults: React.FC<SavingsResultsProps> = ({
  savingYears,
  setSavingYears,
  daysPerYear,
  setDaysPerYear,
  hoursPerDay,
  setHoursPerDay,
  workingHours,
  setWorkingHours,
  kwhCost,
  setKwhCost,
  compressedAirCost,
  setCompressedAirCost,
  totalSavings,
  currentLifeTime,
  scheuchLifeTime,
  currentDiffPressure,
  scheuchDiffPressure,
  currentAirConsumption,
  scheuchAirConsumption,
  currentMotorKW,
  scheuchMotorKW
}) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-1">
          <h3 className="text-sm font-medium text-gray-700 mb-4">Calculation Parameters</h3>
          
          <InputField
            label="Saving in x years:"
            value={savingYears}
            onChange={(value) => setSavingYears(parseInt(value) || 0)}
            type="number"
            min={1}
            className="mb-6"
          />
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Working hours per year:</label>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <label className="text-xs text-gray-600 whitespace-nowrap">Days/Year:</label>
                <InputField
                  value={daysPerYear}
                  onChange={(value) => setDaysPerYear(parseInt(value) || 0)}
                  type="number"
                  min={1}
                  className="w-16"
                  labelClassName="hidden"
                />
              </div>
              <div className="flex items-center gap-1">
                <label className="text-xs text-gray-600 whitespace-nowrap">Hours/Day:</label>
                <InputField
                  value={hoursPerDay}
                  onChange={(value) => setHoursPerDay(parseInt(value) || 0)}
                  type="number"
                  min={1}
                  className="w-16"
                  labelClassName="hidden"
                />
              </div>
              <div className="flex items-center bg-gray-50 px-2 py-1.5 rounded-md border border-gray-200 text-sm">
                <span className="font-medium mr-1">Total:</span>
                <span>{workingHours} hours/year</span>
              </div>
            </div>
          </div>
          
          <InputField
            label="USD per kWh for plant:"
            value={kwhCost}
            onChange={(value) => setKwhCost(parseFloat(value) || 0)}
            type="number"
            min={0}
            step={0.01}
            className="mb-6"
          />
          
          <InputField
            label="USD/Nm³ from Plant Network:"
            value={compressedAirCost}
            onChange={(value) => setCompressedAirCost(value)}
            type="number"
            min={0}
            step={0.01}
            placeholder="Leave empty if not available"
          />
        </div>
        
        <div className="md:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-xl shadow-soft border border-gray-100">
              <h3 className="text-sm font-medium text-gray-700 mb-4 pb-2 border-b">Improvement Metrics</h3>
              
              <div className="space-y-4">
                <ResultCard
                  label="Bag Life Time Extension"
                  value={`${(scheuchLifeTime - currentLifeTime)} months (${((scheuchLifeTime - currentLifeTime) / currentLifeTime * 100).toFixed(0)}%)`}
                  className="bg-transparent shadow-none border-0 p-0"
                />
                
                <ResultCard
                  label="Saving in Differential Pressure"
                  value={`${(currentDiffPressure - scheuchDiffPressure) * savingYears} mbar (${((currentDiffPressure - scheuchDiffPressure) / currentDiffPressure * 100).toFixed(0)}%)`}
                  className="bg-transparent shadow-none border-0 p-0"
                />
                
                <ResultCard
                  label="Saving in Compressed Air"
                  value={`${(currentAirConsumption - scheuchAirConsumption) * savingYears} Nm³/h (${((currentAirConsumption - scheuchAirConsumption) / currentAirConsumption * 100).toFixed(0)}%)`}
                  className="bg-transparent shadow-none border-0 p-0"
                />
                
                <ResultCard
                  label="Saving in Motor KW"
                  value={`${(currentMotorKW - scheuchMotorKW) * savingYears} kW (${((currentMotorKW - scheuchMotorKW) / currentMotorKW * 100).toFixed(0)}%)`}
                  className="bg-transparent shadow-none border-0 p-0"
                />
              </div>
            </div>
            
            <div className="bg-white p-5 rounded-xl shadow-soft border border-gray-100">
              <h3 className="text-center text-sm font-medium text-gray-700 mb-4 pb-2 border-b">OPEX Savings in {savingYears} years</h3>
              
              <div className="space-y-4">
                <ResultCard
                  label="Bag Material and Labor"
                  value={`$${totalSavings.bagSavings.toLocaleString(undefined, {maximumFractionDigits: 0})}`}
                  className="bg-transparent shadow-none border-0 p-0"
                />
                
                <ResultCard
                  label="Savings in Fan Power Consumption"
                  value={`$${totalSavings.fanPowerSavings.toLocaleString(undefined, {maximumFractionDigits: 0})}`}
                  className="bg-transparent shadow-none border-0 p-0"
                />
                
                <ResultCard
                  label="Savings in Compressed Air"
                  value={`$${totalSavings.airSavings.toLocaleString(undefined, {maximumFractionDigits: 0})}`}
                  className="bg-transparent shadow-none border-0 p-0"
                />
                
                <div className="h-px bg-gray-200 my-2"></div>
                
                <ResultCard
                  label={`Total Savings in ${savingYears} years`}
                  value={`$${totalSavings.total.toLocaleString(undefined, {maximumFractionDigits: 0})}`}
                  valueClassName="text-xl font-bold text-green-600"
                  className="bg-transparent shadow-none border-0 p-0"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-10">
        <div className="flex justify-center">
          <div className="bg-green-50 border border-green-200 p-6 rounded-xl max-w-2xl text-center">
            <h3 className="text-xl font-medium text-green-800 mb-4">Total Estimated Savings</h3>
            <div className="text-4xl font-bold text-green-700 mb-1">${totalSavings.total.toLocaleString(undefined, {maximumFractionDigits: 0})}</div>
            <div className="text-sm text-green-600">Over {savingYears} years of operation with EMC technology</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SavingsResults;
