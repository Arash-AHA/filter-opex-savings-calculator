
import React from 'react';
import InputField from './InputField';

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

const OperationalParameters: React.FC<OperationalParametersProps> = ({
  currentLifeTime,
  setCurrentLifeTime,
  scheuchLifeTime,
  setScheuchLifeTime,
  currentDiffPressure,
  setCurrentDiffPressure,
  scheuchDiffPressure,
  setScheuchDiffPressure,
  currentAirConsumption,
  setCurrentAirConsumption,
  scheuchAirConsumption,
  setScheuchAirConsumption,
  currentMotorKW,
  setCurrentMotorKW,
  scheuchMotorKW,
  setScheuchMotorKW,
  bagQuality,
  setBagQuality,
  cleaningPressure,
  setCleaningPressure,
  minPulseInterval,
  setMinPulseInterval,
  avgPulseInterval,
  setAvgPulseInterval,
  numEMCFlaps,
  workingHours
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Column 1 & 2: Labels & Inputs */}
      <div className="md:col-span-2">
        <div className="space-y-4 mb-6">
          <h3 className="text-sm font-medium text-gray-700 border-b pb-2">Bag Lifetime</h3>
          
          <InputField
            label={
              <div>
                <div>Filter Bag Life time</div>
                <div className="text-sm text-gray-500">Current Situation (Months):</div>
              </div>
            }
            value={currentLifeTime}
            onChange={(value) => setCurrentLifeTime(parseFloat(value) || 0)}
            type="number"
            min={1}
          />
          
          <InputField
            label={
              <div>
                <div>Filter Bag Life time</div>
                <div className="text-sm text-gray-500">Scheuch EMC Technology (Months):</div>
              </div>
            }
            value={scheuchLifeTime}
            onChange={(value) => setScheuchLifeTime(parseFloat(value) || 0)}
            type="number"
            min={1}
          />
        </div>
        
        <div className="space-y-4 mb-6">
          <h3 className="text-sm font-medium text-gray-700 border-b pb-2">Differential Pressure</h3>
          
          <InputField
            label={
              <div>
                <div>Filter Differential Pressure</div>
                <div className="text-sm text-gray-500">Current Situation:</div>
              </div>
            }
            value={currentDiffPressure}
            onChange={(value) => setCurrentDiffPressure(parseFloat(value) || 0)}
            type="number"
            min={0}
            units="mbar"
            secondaryInput={{
              value: (currentDiffPressure * 0.4).toFixed(2),
              onChange: (value) => setCurrentDiffPressure(parseFloat(value) / 0.4 || 0),
              units: "Inches W.G.",
            }}
          />
          
          <InputField
            label={
              <div>
                <div>Filter Differential Pressure</div>
                <div className="text-sm text-gray-500">Scheuch EMC Technology:</div>
              </div>
            }
            value={scheuchDiffPressure}
            onChange={(value) => setScheuchDiffPressure(parseFloat(value) || 0)}
            type="number"
            min={0}
            units="mbar"
            secondaryInput={{
              value: (scheuchDiffPressure * 0.4).toFixed(2),
              onChange: (value) => setScheuchDiffPressure(parseFloat(value) / 0.4 || 0),
              units: "Inches W.G.",
            }}
          />
        </div>
        
        <div className="space-y-4 mb-6">
          <h3 className="text-sm font-medium text-gray-700 border-b pb-2">Compressed Air</h3>
          
          <InputField
            label={
              <div>
                <div>Compressed air Consumption</div>
                <div className="text-sm text-gray-500">Current Situation:</div>
              </div>
            }
            value={currentAirConsumption}
            onChange={(value) => setCurrentAirConsumption(parseFloat(value) || 0)}
            type="number"
            min={0}
            units="Nm³/h"
            secondaryInput={{
              value: (currentAirConsumption * 0.589).toFixed(1),
              onChange: (value) => setCurrentAirConsumption(parseFloat(value) / 0.589 || 0),
              units: "SCFM",
            }}
          />
          
          <InputField
            label={
              <div>
                <div>Compressed air Consumption</div>
                <div className="text-sm text-gray-500">Scheuch EMC Technology:</div>
              </div>
            }
            value={scheuchAirConsumption}
            onChange={(value) => setScheuchAirConsumption(parseFloat(value) || 0)}
            type="number"
            min={0}
            units="Nm³/h"
            secondaryInput={{
              value: (scheuchAirConsumption * 0.589).toFixed(1),
              onChange: (value) => setScheuchAirConsumption(parseFloat(value) / 0.589 || 0),
              units: "SCFM",
            }}
          />
        </div>
        
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-700 border-b pb-2">Motor Power</h3>
          
          <InputField
            label={
              <div>
                <div>Motor KW for standalone compressor</div>
                <div className="text-sm text-gray-500">Current Situation:</div>
              </div>
            }
            value={currentMotorKW}
            onChange={(value) => setCurrentMotorKW(parseFloat(value) || 0)}
            type="number"
            min={0}
            units="kW"
            secondaryInput={{
              value: (currentMotorKW * 1.34102).toFixed(1),
              onChange: (value) => setCurrentMotorKW(parseFloat(value) / 1.34102 || 0),
              units: "HP",
            }}
          />
          
          <InputField
            label={
              <div>
                <div>Motor KW for standalone compressor</div>
                <div className="text-sm text-gray-500">Scheuch EMC Technology:</div>
              </div>
            }
            value={scheuchMotorKW}
            onChange={(value) => setScheuchMotorKW(parseFloat(value) || 0)}
            type="number"
            min={0}
            units="kW"
            secondaryInput={{
              value: (scheuchMotorKW * 1.34102).toFixed(1),
              onChange: (value) => setScheuchMotorKW(parseFloat(value) / 1.34102 || 0),
              units: "HP",
            }}
          />
        </div>
      </div>
      
      {/* Column 3: Parameters */}
      <div className="bg-gradient-to-b from-amber-50 to-amber-100/40 rounded-xl p-5 border border-amber-200">
        <h3 className="text-sm font-medium text-gray-700 mb-4 border-b border-amber-200 pb-2">Filter Specifications</h3>
        
        <div className="mb-6">
          <div className="font-medium text-gray-700 mb-3">Filter Bag:</div>
          <div className="space-y-2">
            <label className="relative flex cursor-pointer rounded-lg border border-gray-200 bg-white p-3 shadow-sm focus:outline-none">
              <input 
                type="radio" 
                name="bagQuality" 
                value="needle-felt" 
                checked={bagQuality === 'needle-felt'} 
                onChange={() => setBagQuality('needle-felt')}
                className="peer sr-only"
              />
              <span className="flex h-full flex-col">
                <span className="flex items-center">
                  <span className={`mr-2 h-4 w-4 rounded-full border ${bagQuality === 'needle-felt' ? 'border-primary bg-primary' : 'border-gray-300'} flex items-center justify-center`}>
                    {bagQuality === 'needle-felt' && (
                      <span className="h-2 w-2 rounded-full bg-white"></span>
                    )}
                  </span>
                  <span className="text-sm font-medium">Needle felt quality</span>
                </span>
              </span>
            </label>
            
            <label className="relative flex cursor-pointer rounded-lg border border-gray-200 bg-white p-3 shadow-sm focus:outline-none">
              <input 
                type="radio" 
                name="bagQuality" 
                value="ptfe-membrane" 
                checked={bagQuality === 'ptfe-membrane'} 
                onChange={() => setBagQuality('ptfe-membrane')}
                className="peer sr-only"
              />
              <span className="flex h-full flex-col">
                <span className="flex items-center">
                  <span className={`mr-2 h-4 w-4 rounded-full border ${bagQuality === 'ptfe-membrane' ? 'border-primary bg-primary' : 'border-gray-300'} flex items-center justify-center`}>
                    {bagQuality === 'ptfe-membrane' && (
                      <span className="h-2 w-2 rounded-full bg-white"></span>
                    )}
                  </span>
                  <span className="text-sm font-medium">PTFE-Membrane</span>
                </span>
              </span>
            </label>
          </div>
        </div>
        
        <div className="mb-6">
          <div className="font-medium text-gray-700 mb-3">Cleaning Pressure:</div>
          <div className="space-y-2">
            <label className="relative flex cursor-pointer rounded-lg border border-gray-200 bg-white p-3 shadow-sm focus:outline-none">
              <input 
                type="radio" 
                name="cleaningPressure" 
                value="6-bar" 
                checked={cleaningPressure === '6-bar'} 
                onChange={() => setCleaningPressure('6-bar')}
                className="peer sr-only"
              />
              <span className="flex h-full flex-col">
                <span className="flex items-center">
                  <span className={`mr-2 h-4 w-4 rounded-full border ${cleaningPressure === '6-bar' ? 'border-primary bg-primary' : 'border-gray-300'} flex items-center justify-center`}>
                    {cleaningPressure === '6-bar' && (
                      <span className="h-2 w-2 rounded-full bg-white"></span>
                    )}
                  </span>
                  <span className="text-sm font-medium">6 bar (87 psi)</span>
                </span>
              </span>
            </label>
            
            <label className="relative flex cursor-pointer rounded-lg border border-gray-200 bg-white p-3 shadow-sm focus:outline-none">
              <input 
                type="radio" 
                name="cleaningPressure" 
                value="2-3-bar" 
                checked={cleaningPressure === '2-3-bar'} 
                onChange={() => setCleaningPressure('2-3-bar')}
                className="peer sr-only"
              />
              <span className="flex h-full flex-col">
                <span className="flex items-center">
                  <span className={`mr-2 h-4 w-4 rounded-full border ${cleaningPressure === '2-3-bar' ? 'border-primary bg-primary' : 'border-gray-300'} flex items-center justify-center`}>
                    {cleaningPressure === '2-3-bar' && (
                      <span className="h-2 w-2 rounded-full bg-white"></span>
                    )}
                  </span>
                  <span className="text-sm font-medium">2 to 3 bar (29-44 psi)</span>
                </span>
              </span>
            </label>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="font-medium text-gray-700 mb-2">Cleaning cycle parameters:</div>
          
          <div className="grid grid-cols-2 gap-3 mb-2">
            <div>
              <InputField
                label="Min. interval (sec):"
                labelClassName="text-xs text-gray-600 mb-1"
                value={minPulseInterval}
                onChange={(value) => setMinPulseInterval(parseFloat(value) || 0)}
                type="number"
                min={0}
                step={1}
                className="mb-0"
              />
            </div>
            <div>
              <InputField
                label="Ave. interval (sec):"
                labelClassName="text-xs text-gray-600 mb-1"
                value={avgPulseInterval}
                onChange={(value) => setAvgPulseInterval(parseFloat(value) || 0)}
                type="number"
                min={0}
                step={1}
                className="mb-0"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="bg-white p-3 rounded-lg shadow-sm border border-amber-100">
              <div className="text-xs text-gray-600 mb-1">Min. complete cycle:</div>
              <div className="font-medium text-sm">
                {((numEMCFlaps * 5 * minPulseInterval) / 60).toFixed(1)} min
              </div>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm border border-amber-100">
              <div className="text-xs text-gray-600 mb-1">Ave. complete cycle:</div>
              <div className="font-medium text-sm">
                {((numEMCFlaps * 5 * avgPulseInterval) / 60).toFixed(1)} min
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <div className="font-medium text-gray-700 mb-2">
            {bagQuality === 'needle-felt' 
              ? 'Life Time - EMC / Needlefelt' 
              : 'Life Time - EMC / PTFE-Membrane'}
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-amber-200">
            <div className="mb-2">
              <span className="font-medium text-sm">Minimum: </span>
              <span className="text-sm">
                {cleaningPressure === '2-3-bar' ? (
                  bagQuality === 'needle-felt' ? 
                    `${((300000 * ((numEMCFlaps * 5 * minPulseInterval) / 60) / workingHours) / 60).toFixed(1)} years` : 
                    `${((150000 * ((numEMCFlaps * 5 * minPulseInterval) / 60) / workingHours) / 60).toFixed(1)} years`
                ) : (
                  "-"
                )}
              </span>
            </div>
            <div>
              <span className="font-medium text-sm">Average: </span>
              <span className="text-sm">
                {cleaningPressure === '2-3-bar' ? (
                  bagQuality === 'needle-felt' ? 
                    `${((450000 * ((numEMCFlaps * 5 * avgPulseInterval) / 60) / workingHours) / 60).toFixed(1)} years` : 
                    `${((250000 * ((numEMCFlaps * 5 * avgPulseInterval) / 60) / workingHours) / 60).toFixed(1)} years`
                ) : (
                  "-"
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OperationalParameters;
