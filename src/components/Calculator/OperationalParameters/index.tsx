
import React, { useState } from 'react';
import DifferentialPressureSection from './DifferentialPressureSection';
import CompressedAirSection from './CompressedAirSection';
import MotorPowerSection from './MotorPowerSection';
import FilterSpecifications from './FilterSpecifications';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

interface OperationalParametersProps {
  currentLifeTime: number;
  setCurrentLifeTime: (value: number) => void;
  scheuchLifeTime: number;
  setScheuchLifeTime: (value: number) => void;
  currentDiffPressure: number;
  setCurrentDiffPressure: (value: number) => void;
  scheuchDiffPressure: number;
  setScheuchDiffPressure: (value: number) => void;
  currentAirConsumption: number;
  setCurrentAirConsumption: (value: number) => void;
  scheuchAirConsumption: number;
  setScheuchAirConsumption: (value: number) => void;
  currentMotorKW: number;
  setCurrentMotorKW: (value: number) => void;
  scheuchMotorKW: number;
  setScheuchMotorKW: (value: number) => void;
  bagQuality: string;
  setBagQuality: (value: string) => void;
  cleaningPressure: string;
  setCleaningPressure: (value: string) => void;
  minPulseInterval: number;
  setMinPulseInterval: (value: number) => void;
  avgPulseInterval: number;
  setAvgPulseInterval: (value: number) => void;
  numEMCFlaps: number;
  workingHours: number;
}

const OperationalParameters: React.FC<OperationalParametersProps> = (props) => {
  const [showFilterSpecs, setShowFilterSpecs] = useState(false);
  const isMobile = useIsMobile();

  return (
    <div className="space-y-6">
      {/* Main Grid Layout - 2 Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column - Filter Bag Lifetime */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-700 border-b pb-2">Filter Bag Lifetime</h3>
          
          <div className="space-y-1">
            <div className="text-sm font-medium text-gray-700">Filter Bag Life time</div>
            {/* Modified this section to put the inputs on separate rows */}
            <div className="space-y-3">
              <div className="space-y-1">
                <div className="text-sm text-gray-500">Current Situation:</div>
                <div className="flex flex-col">
                  <input
                    type="number"
                    value={props.currentLifeTime}
                    onChange={(e) => props.setCurrentLifeTime(parseFloat(e.target.value) || 0)}
                    className="w-full min-w-0 rounded-md border border-gray-200 px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-primary h-8"
                    min={1}
                    max={60}
                  />
                  <span className="text-xs text-gray-500 mt-1">Months</span>
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="text-sm text-gray-500">Scheuch EMC Technology:</div>
                <div className="flex flex-col">
                  <input
                    type="number"
                    value={props.scheuchLifeTime}
                    onChange={(e) => props.setScheuchLifeTime(parseFloat(e.target.value) || 0)}
                    className="w-full min-w-0 rounded-md border border-gray-200 px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-primary h-8"
                    min={1}
                    max={60}
                  />
                  <span className="text-xs text-gray-500 mt-1">Months</span>
                </div>
              </div>
            </div>

            <div className="mt-3">
              <Button 
                onClick={() => setShowFilterSpecs(!showFilterSpecs)} 
                variant="outline"
                size="sm"
                className="w-full mt-2"
              >
                {showFilterSpecs ? 'Hide Estimate Details' : 'Estimate bag life with EMC'}
              </Button>
            </div>
          </div>

          <div className="pt-4">
            <DifferentialPressureSection 
              currentDiffPressure={props.currentDiffPressure}
              setCurrentDiffPressure={props.setCurrentDiffPressure}
              scheuchDiffPressure={props.scheuchDiffPressure}
              setScheuchDiffPressure={props.setScheuchDiffPressure}
            />
            
            <CompressedAirSection 
              currentAirConsumption={props.currentAirConsumption}
              setCurrentAirConsumption={props.setCurrentAirConsumption}
              scheuchAirConsumption={props.scheuchAirConsumption}
              setScheuchAirConsumption={props.setScheuchAirConsumption}
            />
            
            <MotorPowerSection 
              currentMotorKW={props.currentMotorKW}
              setCurrentMotorKW={props.setCurrentMotorKW}
              scheuchMotorKW={props.scheuchMotorKW}
              setScheuchMotorKW={props.setScheuchMotorKW}
            />
          </div>
        </div>
        
        {showFilterSpecs && (
          <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200 h-fit">
            <FilterSpecifications 
              bagQuality={props.bagQuality}
              setBagQuality={props.setBagQuality}
              cleaningPressure={props.cleaningPressure}
              setCleaningPressure={props.setCleaningPressure}
              minPulseInterval={props.minPulseInterval}
              setMinPulseInterval={props.setMinPulseInterval}
              avgPulseInterval={props.avgPulseInterval}
              setAvgPulseInterval={props.setAvgPulseInterval}
              numEMCFlaps={props.numEMCFlaps}
              workingHours={props.workingHours}
              currentLifeTime={props.currentLifeTime}
              scheuchLifeTime={props.scheuchLifeTime}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default OperationalParameters;
