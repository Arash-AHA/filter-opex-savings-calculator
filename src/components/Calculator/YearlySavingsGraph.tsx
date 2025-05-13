
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Maximize } from 'lucide-react';

interface YearlySavingsGraphProps {
  bagSavings: number;
  fanPowerSavings: number;
  airSavings: number;
  savingYears: number;
  isOpen: boolean;
  onClose: () => void;
}

const YearlySavingsGraph: React.FC<YearlySavingsGraphProps> = ({
  bagSavings,
  fanPowerSavings,
  airSavings,
  savingYears,
  isOpen,
  onClose
}) => {
  // Generate yearly data
  const data = Array.from({ length: savingYears }, (_, index) => {
    const year = index + 1;
    const yearlyBagSavings = bagSavings / savingYears * year;
    const yearlyFanPowerSavings = fanPowerSavings / savingYears * year;
    const yearlyAirSavings = airSavings / savingYears * year;
    const totalYearlySavings = yearlyBagSavings + yearlyFanPowerSavings + yearlyAirSavings;
    
    return {
      year: `Year ${year}`,
      'Bag Material & Labor': yearlyBagSavings,
      'Fan Power': yearlyFanPowerSavings,
      'Compressed Air': yearlyAirSavings,
      'Total': totalYearlySavings
    };
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] max-h-[95vh] w-[95vw] h-[90vh] p-4">
        <Card className="w-full h-full">
          <CardHeader className="pb-2">
            <CardTitle className="text-center flex items-center justify-center gap-2">
              <Maximize className="h-5 w-5" />
              OPEX Cost Over {savingYears} Years
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[calc(100%-60px)]">
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
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default YearlySavingsGraph;
