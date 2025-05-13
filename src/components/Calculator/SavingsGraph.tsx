
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SavingsGraphProps {
  bagSavings: number;
  fanPowerSavings: number;
  airSavings: number;
  total: number;
  savingYears: number;
}

const SavingsGraph: React.FC<SavingsGraphProps> = ({
  bagSavings,
  fanPowerSavings,
  airSavings,
  total,
  savingYears
}) => {
  const data = [
    { name: 'Bag Material & Labor', value: bagSavings },
    { name: 'Fan Power', value: fanPowerSavings },
    { name: 'Compressed Air', value: airSavings },
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center text-lg">OPEX Savings Breakdown - {savingYears} Years</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 40, bottom: 60 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name" 
                angle={-45} 
                textAnchor="end"
                height={60}
              />
              <YAxis 
                tickFormatter={(value) => `$${value.toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                  notation: 'compact',
                })}`}
                label={{ 
                  value: 'USD', 
                  angle: -90, 
                  position: 'insideLeft',
                  style: { textAnchor: 'middle' }
                }}
              />
              <Tooltip 
                formatter={(value) => [`$${Number(value).toLocaleString(undefined, {
                  maximumFractionDigits: 0
                })}`, 'Savings']}
              />
              <Legend />
              <Bar 
                dataKey="value" 
                name="Savings" 
                fill="#4ade80" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 text-center">
          <div className="text-sm text-gray-500">Total Estimated Savings</div>
          <div className="text-2xl font-bold text-green-600">
            ${total.toLocaleString(undefined, {maximumFractionDigits: 0})}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SavingsGraph;
