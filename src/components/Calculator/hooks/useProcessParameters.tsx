
import { useState, useCallback } from 'react';

export const useProcessParameters = () => {
  const [gasTempC, setGasTempC] = useState(150);
  const [gasTempF, setGasTempF] = useState(302);
  const [dustConcGramAm3, setDustConcGramAm3] = useState(10);
  const [dustConcGrainACF, setDustConcGrainACF] = useState(4.37);
  const [dustConcGramNm3, setDustConcGramNm3] = useState<number | null>(20);
  const [dustConcGrainSCF, setDustConcGrainSCF] = useState<number | null>(8.74);
  const [outletDustKgH, setOutletDustKgH] = useState<number | null>(1.2);
  const [outletDustLbH, setOutletDustLbH] = useState<number | null>(2.65);
  const [targetEmissionMgNm3, setTargetEmissionMgNm3] = useState<number | null>(5);
  const [targetEmissionGrainDscf, setTargetEmissionGrainDscf] = useState<number | null>(0.0022);
  const [negativePressureMbar, setNegativePressureMbar] = useState<number | null>(30);
  const [negativePressureInchWG, setNegativePressureInchWG] = useState<number | null>(12);

  const [isCUpdating, setIsCUpdating] = useState(false);
  const [isFUpdating, setIsFUpdating] = useState(false);
  const [isGramAm3Updating, setIsGramAm3Updating] = useState(false);
  const [isGrainACFUpdating, setIsGrainACFUpdating] = useState(false);
  const [isGramNm3Updating, setIsGramNm3Updating] = useState(false);
  const [isGrainSCFUpdating, setIsGrainSCFUpdating] = useState(false);
  const [isKgHUpdating, setIsKgHUpdating] = useState(false);
  const [isLbHUpdating, setIsLbHUpdating] = useState(false);
  const [isMbarUpdating, setIsMbarUpdating] = useState(false);
  const [isInchWGUpdating, setIsInchWGUpdating] = useState(false);
  const [isMgNm3Updating, setIsMgNm3Updating] = useState(false);
  const [isGrainDscfUpdating, setIsGrainDscfUpdating] = useState(false);

  // Temperature handlers
  const handleGasTempCChange = useCallback((value: string) => {
    const tempC = parseFloat(value);
    setGasTempC(isNaN(tempC) ? 0 : tempC);
    if (!isFUpdating && !isNaN(tempC)) {
      setIsCUpdating(true);
      const tempF = (tempC * 9/5) + 32;
      setGasTempF(isNaN(tempF) ? 0 : tempF);
      setTimeout(() => setIsCUpdating(false), 100);
    }
  }, [isFUpdating]);

  const handleGasTempFChange = useCallback((value: string) => {
    const tempF = parseFloat(value);
    setGasTempF(isNaN(tempF) ? 0 : tempF);
    if (!isCUpdating && !isNaN(tempF)) {
      setIsFUpdating(true);
      const tempC = (tempF - 32) * 5/9;
      setGasTempC(isNaN(tempC) ? 0 : tempC);
      setTimeout(() => setIsFUpdating(false), 100);
    }
  }, [isCUpdating]);

  // Dust concentration handlers
  const handleDustConcGramAm3Change = useCallback((value: string) => {
    const concGramAm3 = parseFloat(value);
    setDustConcGramAm3(isNaN(concGramAm3) ? 0 : concGramAm3);
    if (!isGrainACFUpdating && !isNaN(concGramAm3)) {
      setIsGramAm3Updating(true);
      const grainACF = concGramAm3 * 0.437;
      setDustConcGrainACF(isNaN(grainACF) ? 0 : grainACF);
      setTimeout(() => setIsGramAm3Updating(false), 100);
    }
  }, [isGrainACFUpdating]);

  // ... Add all other handlers for dust concentration, pressure, etc.

  return {
    gasTempC,
    gasTempF,
    dustConcGramAm3,
    dustConcGrainACF,
    dustConcGramNm3,
    dustConcGrainSCF,
    outletDustKgH,
    outletDustLbH,
    targetEmissionMgNm3,
    targetEmissionGrainDscf,
    negativePressureMbar,
    negativePressureInchWG,
    handleGasTempCChange,
    handleGasTempFChange,
    handleDustConcGramAm3Change,
    // ... Export all other handlers
  };
};
