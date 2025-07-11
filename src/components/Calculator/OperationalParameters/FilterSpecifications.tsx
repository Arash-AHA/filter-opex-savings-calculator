import React from 'react';
import InputField from '../InputField';

interface FilterSpecificationsProps {
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
  currentLifeTime: number;
  scheuchLifeTime: number;
}

const FilterSpecifications: React.FC<FilterSpecificationsProps> = ({
  bagQuality,
  setBagQuality,
  cleaningPressure,
  setCleaningPressure,
  minPulseInterval,
  setMinPulseInterval,
  avgPulseInterval,
  setAvgPulseInterval,
  numEMCFlaps,
  workingHours,
  currentLifeTime,
  scheuchLifeTime
}) => {
  return (
    <div>
      <h3 className="text-sm font-medium text-gray-700 mb-4 border-b border-yellow-200 pb-2">Filter Specifications</h3>
      
      <div className="mb-6">
        <div className="font-medium text-gray-700 mb-3">Filter Bag:</div>
        <div className="flex space-x-3">
          <label className="relative flex-1 flex cursor-pointer rounded-lg border border-gray-200 bg-white p-3 shadow-sm focus:outline-none">
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
          
          <label className="relative flex-1 flex cursor-pointer rounded-lg border border-gray-200 bg-white p-3 shadow-sm focus:outline-none">
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
        <div className="flex space-x-3">
          <label className="relative flex-1 flex cursor-pointer rounded-lg border border-gray-200 bg-white p-3 shadow-sm focus:outline-none">
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
          
          <label className="relative flex-1 flex cursor-pointer rounded-lg border border-gray-200 bg-white p-3 shadow-sm focus:outline-none">
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
      
      <CleaningCycleParameters 
        minPulseInterval={minPulseInterval}
        setMinPulseInterval={setMinPulseInterval}
        avgPulseInterval={avgPulseInterval}
        setAvgPulseInterval={setAvgPulseInterval}
        numEMCFlaps={numEMCFlaps}
      />
      
      <LifetimeDisplay 
        bagQuality={bagQuality}
        cleaningPressure={cleaningPressure}
        numEMCFlaps={numEMCFlaps}
        minPulseInterval={minPulseInterval}
        avgPulseInterval={avgPulseInterval}
        workingHours={workingHours}
        currentLifeTime={currentLifeTime}
        scheuchLifeTime={scheuchLifeTime}
      />
    </div>
  );
};

interface CleaningCycleParametersProps {
  minPulseInterval: number;
  setMinPulseInterval: (value: number) => void;
  avgPulseInterval: number;
  setAvgPulseInterval: (value: number) => void;
  numEMCFlaps: number;
}

const CleaningCycleParameters: React.FC<CleaningCycleParametersProps> = ({
  minPulseInterval,
  setMinPulseInterval,
  avgPulseInterval,
  setAvgPulseInterval,
  numEMCFlaps
}) => {
  const totalNumEMCFlaps = numEMCFlaps; // Total number of EMC flaps from input
  
  const minCompleteCycle = totalNumEMCFlaps * (5 * minPulseInterval + 3) / 60;
  const avgCompleteCycle = totalNumEMCFlaps * (5 * avgPulseInterval + 3) / 60;

  return (
    <div className="mb-4">
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
            inputClassName="py-1 h-8 text-sm"
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
            inputClassName="py-1 h-8 text-sm"
          />
        </div>
      </div>
      
      <div className="mt-3 text-base text-gray-800 font-semibold">
        <span>Min. complete cycle: {minCompleteCycle.toFixed(1)} min, Ave. complete cycle: {avgCompleteCycle.toFixed(1)} min</span>
      </div>
    </div>
  );
};

interface LifetimeDisplayProps {
  bagQuality: string;
  cleaningPressure: string;
  numEMCFlaps: number;
  minPulseInterval: number;
  avgPulseInterval: number;
  workingHours: number;
  currentLifeTime: number;
  scheuchLifeTime: number;
}

const LifetimeDisplay: React.FC<LifetimeDisplayProps> = ({
  bagQuality,
  cleaningPressure,
  numEMCFlaps,
  minPulseInterval,
  avgPulseInterval,
  workingHours,
  currentLifeTime,
  scheuchLifeTime
}) => {
  const totalNumEMCFlaps = numEMCFlaps; // Total number of EMC flaps from input
  
  const minCompleteCycle = totalNumEMCFlaps * (5 * minPulseInterval + 3) / 60;
  const avgCompleteCycle = totalNumEMCFlaps * (5 * avgPulseInterval + 3) / 60;
  
  const displayTitle = cleaningPressure === '2-3-bar' && bagQuality === 'ptfe-membrane' 
    ? "Filter Bag Life Time - EMC / PTFE-Membrane" 
    : "Life Time - EMC";
  
  let minLifetime = "-";
  let avgLifetime = "-";
  
  let minLifetimeYears = 0;
  let avgLifetimeYears = 0;
  
  if (cleaningPressure === '2-3-bar') {
    if (bagQuality === 'ptfe-membrane') {
      minLifetimeYears = (150000 * minCompleteCycle) / 60 / workingHours;
      avgLifetimeYears = (150000 * avgCompleteCycle) / 60 / workingHours;
      
      // Check if values exceed 5 years
      minLifetime = minLifetimeYears > 5 ? ">5 years" : `${minLifetimeYears.toFixed(1)} years`;
      avgLifetime = avgLifetimeYears > 5 ? ">5 years" : `${avgLifetimeYears.toFixed(1)} years`;
    } else {
      minLifetimeYears = (300000 * minCompleteCycle) / 60 / workingHours;
      avgLifetimeYears = (450000 * avgCompleteCycle) / 60 / workingHours;
      
      // Check if values exceed 5 years
      minLifetime = minLifetimeYears > 5 ? ">5 years" : `${minLifetimeYears.toFixed(1)} years`;
      avgLifetime = avgLifetimeYears > 5 ? ">5 years" : `${avgLifetimeYears.toFixed(1)} years`;
    }
  }
  
  return (
    <div className="mt-6">
      <div className="font-medium text-gray-700 mb-2">
        {displayTitle}
      </div>
      <div className="bg-white p-4 rounded-lg shadow-sm border border-yellow-200">
        <div className="mb-2">
          <span className="font-medium text-sm">Minimum: </span>
          <span className="text-sm">{minLifetime}</span>
        </div>
        <div>
          <span className="font-medium text-sm">Average: </span>
          <span className="text-sm">{avgLifetime}</span>
        </div>
      </div>
    </div>
  );
};

export default FilterSpecifications;
export { CleaningCycleParameters, LifetimeDisplay };
