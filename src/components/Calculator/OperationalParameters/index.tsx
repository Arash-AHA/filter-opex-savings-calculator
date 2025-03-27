
import React from 'react';
import DifferentialPressureSection from './DifferentialPressureSection';
import CompressedAirSection from './CompressedAirSection';
import MotorPowerSection from './MotorPowerSection';
import FilterSpecifications from './FilterSpecifications';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

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
  return (
    <div className="space-y-6">
      {/* Filter Bag Lifetime Section - Updated Format */}
      <div className="space-y-4 mb-6">
        <h3 className="text-sm font-medium text-gray-700 border-b pb-2">Filter Bag Lifetime</h3>
        
        <div className="space-y-1">
          <div className="text-sm font-medium text-gray-700">Filter Bag Life time</div>
          <div className="text-sm text-gray-500">Current Situation:</div>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center">
              <input
                type="number"
                value={props.currentLifeTime}
                onChange={(e) => props.setCurrentLifeTime(parseFloat(e.target.value) || 0)}
                className="w-full min-w-0 rounded-l-md border border-gray-200 px-2 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                min={1}
                max={60}
              />
              <span className="inline-flex items-center px-2 py-2 text-sm text-gray-500 bg-gray-50 border border-l-0 border-gray-200 rounded-r-md whitespace-nowrap">
                Months
              </span>
            </div>
          </div>
        </div>
        
        <div className="space-y-1">
          <div className="text-sm font-medium text-gray-700">Filter Bag Life time</div>
          <div className="text-sm text-gray-500">Scheuch EMC Technology:</div>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center">
              <input
                type="number"
                value={props.scheuchLifeTime}
                onChange={(e) => props.setScheuchLifeTime(parseFloat(e.target.value) || 0)}
                className="w-full min-w-0 rounded-l-md border border-gray-200 px-2 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                min={1}
                max={60}
              />
              <span className="inline-flex items-center px-2 py-2 text-sm text-gray-500 bg-gray-50 border border-l-0 border-gray-200 rounded-r-md whitespace-nowrap">
                Months
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Original Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Column 1 & 2: Labels & Inputs */}
        <div className="md:col-span-2">
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
        
        {/* Column 3: Parameters */}
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
    </div>
  );
};

export default OperationalParameters;
