
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
      {/* New Filter Bag Lifetime Section */}
      <div className="bg-blue-50/50 p-4 rounded-lg border border-blue-100">
        <h3 className="text-lg font-medium text-blue-800 mb-4">Filter Bag Lifetime</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="currentLifeTime">Filter Bag Life time<br />Current Situation (Months):</Label>
            <Input
              id="currentLifeTime"
              type="number"
              value={props.currentLifeTime}
              onChange={(e) => props.setCurrentLifeTime(Number(e.target.value))}
              min={1}
              max={60}
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="scheuchLifeTime">Filter Bag Life time<br />Scheuch EMC Technology (Months):</Label>
            <Input
              id="scheuchLifeTime"
              type="number"
              value={props.scheuchLifeTime}
              onChange={(e) => props.setScheuchLifeTime(Number(e.target.value))}
              min={1}
              max={60}
              className="w-full"
            />
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
