import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Construction } from 'lucide-react';

interface YearlySavingsGraphProps {
  bagSavings: number;
  fanPowerSavings: number;
  airSavings: number;
  savingYears: number;
  airVolumeM3h: string;
  scheuchDiffPressure: number;
  effectiveKwhCost: number;
  workingHours: number;
  scheuchAirConsumption: number;
  compressedAirCost: string;
  scheuchMotorKW: number;
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
  airVolumeM3h,
  scheuchDiffPressure,
  effectiveKwhCost,
  workingHours,
  scheuchAirConsumption,
  compressedAirCost,
  scheuchMotorKW,
  bagChangeFrequency = 24, // Default to 24 months if not provided
  cageReplacementFrequency = 48, // Default to 48 months if not provided
  onBagFrequencyChange,
  onCageFrequencyChange
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

  // Generate yearly data with COSTS for the EMC system (not savings)
  const data = useMemo(() => {
    // For EMC cost estimation, only consider the Scheuch values
    // and zero out the current situation values as requested
    
    // Calculate the fan power cost for EMC (per year)
    const fanPower = (((parseFloat(airVolumeM3h) * 
                      (scheuchDiffPressure) * 100) / 
                      (3600 * 1000 * 0.8)) * effectiveKwhCost * 
                      workingHours);
    
    // Calculate compressed air cost for EMC (per year)
    let airCost = 0;
    if (compressedAirCost && compressedAirCost.trim() !== '') {
      // If USD/Nm³ has a value, use air consumption
      airCost = scheuchAirConsumption * parseFloat(compressedAirCost) * workingHours;
    } else {
      // Otherwise, use motor KW
      airCost = scheuchMotorKW * effectiveKwhCost * workingHours;
    }
    
    // Calculate the bag cost per event
    const totalReplacementCostPerEvent = bagSavings / (savingYears * 12 / localBagFrequency);
    
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
    let accumulatedFanPowerCost = 0;
    let accumulatedAirCost = 0;
    
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
      
      // Add the same fan power cost each year (accumulating)
      accumulatedFanPowerCost += fanPower;
      
      // Add the same air cost each year (accumulating)
      accumulatedAirCost += airCost;
      
      // Total cost is the sum of all costs
      const totalCost = accumulatedBagCost + accumulatedFanPowerCost + accumulatedAirCost;
      
      yearlyData.push({
        year: `Year ${year}`,
        'Bag Material & Labor': accumulatedBagCost,
        'Fan Power': accumulatedFanPowerCost,
        'Compressed Air': accumulatedAirCost,
        'Total': totalCost
      });
    }
    
    return yearlyData;
  }, [
    airVolumeM3h, 
    scheuchDiffPressure, 
    effectiveKwhCost, 
    workingHours, 
    scheuchAirConsumption, 
    compressedAirCost, 
    scheuchMotorKW, 
    bagSavings, 
    savingYears, 
    localBagFrequency
  ]);

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

        <div className="h-[500px] relative">
          {/* Under Construction overlay */}
          <div className="absolute inset-0 flex items-center justify-center z-10 bg-white/80">
            <div className="text-center">
              <Construction className="h-16 w-16 mx-auto text-amber-500 mb-2" />
              <h3 className="text-2xl font-bold text-amber-600">Under Construction</h3>
              <p className="text-gray-500 mt-2">This feature is currently being developed</p>
            </div>
          </div>
          
          {/* Keep the chart in the background */}
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
