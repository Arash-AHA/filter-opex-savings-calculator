
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
  cagePrice?: number; // Added cage price prop
}

const YearlySavingsGraph: React.FC<YearlySavingsGraphProps> = ({
  bagSavings,
  fanPowerSavings,
  airSavings,
  savingYears,
  bagChangeFrequency = 24, // Default to 24 months if not provided
  cageReplacementFrequency = 48, // Default to 48 months if not provided
  onBagFrequencyChange,
  onCageFrequencyChange,
  cagePrice = 80 // Default cage price if not provided
}) => {
  // Local state for frequencies if not controlled from parent
  const [localBagFrequency, setLocalBagFrequency] = useState(bagChangeFrequency);
  const [localCageFrequency, setLocalCageFrequency] = useState(cageReplacementFrequency);

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

  // Generate yearly data with bag costs and cage costs added as step functions at specific years
  const data = useMemo(() => {
    const yearlyData = [];
    
    // Add Year 0 with all values at 0
    yearlyData.push({
      year: 'Year 0',
      'Bag Material & Labor': 0,
      'Cage Replacement': 0, // Added cage replacement cost
      'Fan Power': 0,
      'Compressed Air': 0,
      'Total': 0
    });
    
    // Calculate the exact years when bag changes occur
    const bagChangeYears = new Set();
    if (localBagFrequency > 0) {
      for (let month = localBagFrequency; month <= savingYears * 12; month += localBagFrequency) {
        const exactYear = month / 12;
        const yearIndex = Math.ceil(exactYear);
        bagChangeYears.add(yearIndex);
      }
    }
    
    // Calculate the exact years when cage replacements occur
    const cageChangeYears = new Set();
    if (localCageFrequency > 0) {
      for (let month = localCageFrequency; month <= savingYears * 12; month += localCageFrequency) {
        const exactYear = month / 12;
        const yearIndex = Math.ceil(exactYear);
        cageChangeYears.add(yearIndex);
      }
    }
    
    let accumulatedBagCost = 0;
    let accumulatedCageCost = 0;
    
    for (let year = 1; year <= savingYears; year++) {
      // Check if this year is a bag change year
      if (bagChangeYears.has(year)) {
        accumulatedBagCost += bagSavings;
      }
      
      // Check if this year is a cage replacement year
      if (cageChangeYears.has(year)) {
        accumulatedCageCost += (bagSavings / 2); // Using half of bag savings as an estimate for cage cost
      }
      
      // Calculate linear fan power and air savings
      const yearlyFanPowerSavings = fanPowerSavings / savingYears * year;
      const yearlyAirSavings = airSavings / savingYears * year;
      
      // Total savings include all accumulated costs plus the linear savings
      const totalYearlySavings = accumulatedBagCost + accumulatedCageCost + yearlyFanPowerSavings + yearlyAirSavings;
      
      yearlyData.push({
        year: `Year ${year}`,
        'Bag Material & Labor': accumulatedBagCost,
        'Cage Replacement': accumulatedCageCost, // Added cage replacement cost
        'Fan Power': yearlyFanPowerSavings,
        'Compressed Air': yearlyAirSavings,
        'Total': totalYearlySavings
      });
    }
    
    return yearlyData;
  }, [bagSavings, fanPowerSavings, airSavings, savingYears, localBagFrequency, localCageFrequency]);

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
                dataKey="Cage Replacement" 
                stroke="#f59e0b" 
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
