
import { useState } from 'react';

export const useOperationalParameters = () => {
  // Bag lifetimes that were missing in the previous code
  const [currentLifeTime, setCurrentLifeTime] = useState(8); // Default value
  const [scheuchLifeTime, setScheuchLifeTime] = useState(18); // Default value
  
  // Operational parameters
  const [currentDiffPressure, setCurrentDiffPressure] = useState(20);
  const [scheuchDiffPressure, setScheuchDiffPressure] = useState(15);
  const [currentAirConsumption, setCurrentAirConsumption] = useState(350);
  const [scheuchAirConsumption, setScheuchAirConsumption] = useState(250);
  const [currentMotorKW, setCurrentMotorKW] = useState(50);
  const [scheuchMotorKW, setScheuchMotorKW] = useState(40);
  const [bagQuality, setBagQuality] = useState('needle-felt');
  const [cleaningPressure, setCleaningPressure] = useState('6-bar');
  const [minPulseInterval, setMinPulseInterval] = useState(3); // Updated default value
  const [avgPulseInterval, setAvgPulseInterval] = useState(8); // Updated default value
  
  return {
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
    setAvgPulseInterval
  };
};
