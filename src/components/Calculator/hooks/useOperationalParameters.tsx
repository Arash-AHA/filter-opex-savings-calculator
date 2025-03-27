import { useState } from 'react';

export const useOperationalParameters = () => {
  // Bag lifetimes with updated default values
  const [currentLifeTime, setCurrentLifeTime] = useState(24); // Current Situation default updated to 24
  const [scheuchLifeTime, setScheuchLifeTime] = useState(48); // Scheuch EMC Technology default

  // Operational parameters
  const [currentDiffPressure, setCurrentDiffPressure] = useState(20);
  const [scheuchDiffPressure, setScheuchDiffPressure] = useState(15);
  const [currentAirConsumption, setCurrentAirConsumption] = useState(350);
  const [scheuchAirConsumption, setScheuchAirConsumption] = useState(250);
  const [currentMotorKW, setCurrentMotorKW] = useState(50);
  const [scheuchMotorKW, setScheuchMotorKW] = useState(40);
  const [bagQuality, setBagQuality] = useState('needle-felt');
  const [cleaningPressure, setCleaningPressure] = useState('2-3-bar'); // Updated default value
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
