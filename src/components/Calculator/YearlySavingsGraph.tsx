
import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface YearlySavingsGraphProps {
  bagSavings: number;
  fanPowerSavings: number;
  airSavings: number;
  savingYears: number;
  bagChangeFrequency?: number;
  cageReplacementFrequency?: number;
  onBagFrequencyChange?: (value: number) => void;
  onCageFrequencyChange?: (value: number) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

const YearlySavingsGraph: React.FC<YearlySavingsGraphProps> = ({
  bagSavings,
  fanPowerSavings,
  airSavings,
  savingYears,
  bagChangeFrequency = 24, // Default to 24 months if not provided
  cageReplacementFrequency = 48, // Default to 48 months if not provided
  onBagFrequencyChange,
  onCageFrequencyChange
}) => {
  // Local state for frequencies if not controlled from parent
  const [localBagFrequency, setLocalBagFrequency] = useState(bagChangeFrequency);
  const [localCageFrequency, setLocalCageFrequency] = useState(cageReplacementFrequency);
  // Add state for percentage of bags and cages changed
  const [bagChangePercentage, setBagChangePercentage] = useState(100);
  const [cageChangePercentage, setCageChangePercentage] = useState(100);

  // Handle bag frequency change
  const handleBagFrequencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    setLocalBagFrequency(value);
    if (onBagFrequencyChange) onBagFrequencyChange(value);
  };

  // Handle cage frequency change
  const handleCageFrequencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    setLocalCageFrequency(value);
    if (onCageFrequencyChange) onCageFrequencyChange(value);
  };

  // Handle bag change percentage change
  const handleBagChangePercentageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    setBagChangePercentage(Math.min(100, Math.max(0, value)));
  };

  // Handle cage change percentage change
  const handleCageChangePercentageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    setCageChangePercentage(Math.min(100, Math.max(0, value)));
  };

  // Generate yearly data with accumulating bag costs based on frequency
  const data = useMemo(() => {
    // Calculate the total replacement cost per occurrence (bag replacement event)
    // Adjust cost based on the percentage of bags/cages changed
    const totalReplacementCostPerEvent = bagSavings / (savingYears * 12 / localBagFrequency) * (bagChangePercentage / 100);
    
    // Create an array to track accumulated costs over time
    const yearlyData = [];
    
    // Add Year 0 with all values at 0
    yearlyData.push({
      year: 'Year 0',
      'Bag Material & Labor': 0,
      'Fan Power': 0,
      'Compressed Air': 0,
      'Total': 0
    });
    
    let accumulatedBagCost = 0;
    
    // Generate the rest of the years
    for (let year = 1; year <= savingYears; year++) {
      // Check if a bag change is due this year
      // Convert years to months and check if it's a multiple of the bag change frequency
      const monthsElapsed = year * 12;
      
      // If we've passed a bag change threshold, add the replacement cost
      if (monthsElapsed % localBagFrequency === 0 || 
          (monthsElapsed > localBagFrequency && Math.floor(monthsElapsed / localBagFrequency) > 
           Math.floor((monthsElapsed - 12) / localBagFrequency))) {
        accumulatedBagCost += totalReplacementCostPerEvent;
      }
      
      // Calculate linear fan power and air savings
      const yearlyFanPowerSavings = fanPowerSavings / savingYears * year;
      const yearlyAirSavings = airSavings / savingYears * year;
      
      // Total savings include the accumulated bag costs plus the linear savings
      const totalYearlySavings = accumulatedBagCost + yearlyFanPowerSavings + yearlyAirSavings;
      
      yearlyData.push({
        year: `Year ${year}`,
        'Bag Material & Labor': accumulatedBagCost,
        'Fan Power': yearlyFanPowerSavings,
        'Compressed Air': yearlyAirSavings,
        'Total': totalYearlySavings
      });
    }
    
    return yearlyData;
  }, [bagSavings, fanPowerSavings, airSavings, savingYears, localBagFrequency, bagChangePercentage]);

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="bagFrequency" className="mb-2 block">Complete Bag change frequency:</Label>
            <div className="flex items-center">
              <Input 
                id="bagFrequency"
                type="number" 
                min={1}
                value={localBagFrequency} 
                onChange={handleBagFrequencyChange}
                className="w-full"
              />
              <span className="ml-2 text-sm text-gray-500">months</span>
            </div>
            
            <Label htmlFor="bagPercentage" className="mt-4 mb-2 block">% of Bags changed over time:</Label>
            <div className="flex items-center">
              <Input
                id="bagPercentage"
                type="number"
                min={0}
                max={100}
                value={bagChangePercentage}
                onChange={handleBagChangePercentageChange}
                className="w-full"
              />
              <span className="ml-2 text-sm text-gray-500">%</span>
            </div>
          </div>
          <div>
            <Label htmlFor="cageFrequency" className="mb-2 block">Support Cage replacement Frequency:</Label>
            <div className="flex items-center">
              <Input 
                id="cageFrequency"
                type="number" 
                min={1}
                value={localCageFrequency} 
                onChange={handleCageFrequencyChange}
                className="w-full"
              />
              <span className="ml-2 text-sm text-gray-500">months</span>
            </div>
            
            <Label htmlFor="cagePercentage" className="mt-4 mb-2 block">% of Support Cages changed over time:</Label>
            <div className="flex items-center">
              <Input
                id="cagePercentage"
                type="number"
                min={0}
                max={100}
                value={cageChangePercentage}
                onChange={handleCageChangePercentageChange}
                className="w-full"
              />
              <span className="ml-2 text-sm text-gray-500">%</span>
            </div>
          </div>
        </div>

        <div className="h-[500px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 20, right: 30, left: 60, bottom: 60 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="year" 
                label={{ 
                  value: 'Years', 
                  position: 'insideBottomRight', 
                  offset: -10 
                }}
              />
              <YAxis 
                label={{ 
                  value: 'USD', 
                  angle: -90, 
                  position: 'insideLeft',
                  style: { textAnchor: 'middle' }
                }}
                tickFormatter={(value) => `$${value.toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                  notation: 'compact',
                })}`}
              />
              <Tooltip 
                formatter={(value) => [`$${Number(value).toLocaleString(undefined, {
                  maximumFractionDigits: 0
                })}`, '']}
                labelFormatter={(label) => label}
              />
              <Legend verticalAlign="bottom" />
              <Line 
                type="monotone" 
                dataKey="Bag Material & Labor" 
                stroke="#4ade80" 
                activeDot={{ r: 8 }}
                strokeWidth={2}
              />
              <Line 
                type="monotone" 
                dataKey="Fan Power" 
                stroke="#60a5fa" 
                activeDot={{ r: 8 }}
                strokeWidth={2}
              />
              <Line 
                type="monotone" 
                dataKey="Compressed Air" 
                stroke="#f97316" 
                activeDot={{ r: 8 }}
                strokeWidth={2}
              />
              <Line 
                type="monotone" 
                dataKey="Total" 
                stroke="#8b5cf6" 
                activeDot={{ r: 8 }}
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default YearlySavingsGraph;
