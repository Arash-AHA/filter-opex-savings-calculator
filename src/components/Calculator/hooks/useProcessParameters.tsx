
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

  // Adding the missing handlers
  const handleDustConcGrainACFChange = useCallback((value: string) => {
    const concGrainACF = parseFloat(value);
    setDustConcGrainACF(isNaN(concGrainACF) ? 0 : concGrainACF);
    if (!isGramAm3Updating && !isNaN(concGrainACF)) {
      setIsGrainACFUpdating(true);
      const gramAm3 = concGrainACF / 0.437;
      setDustConcGramAm3(isNaN(gramAm3) ? 0 : gramAm3);
      setTimeout(() => setIsGrainACFUpdating(false), 100);
    }
  }, [isGramAm3Updating]);

  const handleDustConcGramNm3Change = useCallback((value: string) => {
    const concGramNm3 = parseFloat(value);
    setDustConcGramNm3(isNaN(concGramNm3) ? null : concGramNm3);
    if (!isGrainSCFUpdating && !isNaN(concGramNm3)) {
      setIsGramNm3Updating(true);
      const grainSCF = concGramNm3 * 0.437;
      setDustConcGrainSCF(isNaN(grainSCF) ? null : grainSCF);
      setTimeout(() => setIsGramNm3Updating(false), 100);
    }
  }, [isGrainSCFUpdating]);

  const handleDustConcGrainSCFChange = useCallback((value: string) => {
    const concGrainSCF = parseFloat(value);
    setDustConcGrainSCF(isNaN(concGrainSCF) ? null : concGrainSCF);
    if (!isGramNm3Updating && !isNaN(concGrainSCF)) {
      setIsGrainSCFUpdating(true);
      const gramNm3 = concGrainSCF / 0.437;
      setDustConcGramNm3(isNaN(gramNm3) ? null : gramNm3);
      setTimeout(() => setIsGrainSCFUpdating(false), 100);
    }
  }, [isGramNm3Updating]);

  const handleOutletDustKgHChange = useCallback((value: string) => {
    const kgH = parseFloat(value);
    setOutletDustKgH(isNaN(kgH) ? null : kgH);
    if (!isLbHUpdating && !isNaN(kgH)) {
      setIsKgHUpdating(true);
      const lbH = kgH * 2.20462;
      setOutletDustLbH(isNaN(lbH) ? null : lbH);
      setTimeout(() => setIsKgHUpdating(false), 100);
    }
  }, [isLbHUpdating]);

  const handleOutletDustLbHChange = useCallback((value: string) => {
    const lbH = parseFloat(value);
    setOutletDustLbH(isNaN(lbH) ? null : lbH);
    if (!isKgHUpdating && !isNaN(lbH)) {
      setIsLbHUpdating(true);
      const kgH = lbH / 2.20462;
      setOutletDustKgH(isNaN(kgH) ? null : kgH);
      setTimeout(() => setIsLbHUpdating(false), 100);
    }
  }, [isKgHUpdating]);

  const handleTargetEmissionMgNm3Change = useCallback((value: string) => {
    const mgNm3 = parseFloat(value);
    setTargetEmissionMgNm3(isNaN(mgNm3) ? null : mgNm3);
    if (!isGrainDscfUpdating && !isNaN(mgNm3)) {
      setIsMgNm3Updating(true);
      const grainDscf = mgNm3 * 0.00043707;
      setTargetEmissionGrainDscf(isNaN(grainDscf) ? null : grainDscf);
      setTimeout(() => setIsMgNm3Updating(false), 100);
    }
  }, [isGrainDscfUpdating]);

  const handleTargetEmissionGrainDscfChange = useCallback((value: string) => {
    const grainDscf = parseFloat(value);
    setTargetEmissionGrainDscf(isNaN(grainDscf) ? null : grainDscf);
    if (!isMgNm3Updating && !isNaN(grainDscf)) {
      setIsGrainDscfUpdating(true);
      const mgNm3 = grainDscf / 0.00043707;
      setTargetEmissionMgNm3(isNaN(mgNm3) ? null : mgNm3);
      setTimeout(() => setIsGrainDscfUpdating(false), 100);
    }
  }, [isMgNm3Updating]);

  const handleNegativePressureMbarChange = useCallback((value: string) => {
    const mbar = parseFloat(value);
    setNegativePressureMbar(isNaN(mbar) ? null : mbar);
    if (!isInchWGUpdating && !isNaN(mbar)) {
      setIsMbarUpdating(true);
      const inchWG = mbar * 0.4;
      setNegativePressureInchWG(isNaN(inchWG) ? null : inchWG);
      setTimeout(() => setIsMbarUpdating(false), 100);
    }
  }, [isInchWGUpdating]);

  const handleNegativePressureInchWGChange = useCallback((value: string) => {
    const inchWG = parseFloat(value);
    setNegativePressureInchWG(isNaN(inchWG) ? null : inchWG);
    if (!isMbarUpdating && !isNaN(inchWG)) {
      setIsInchWGUpdating(true);
      const mbar = inchWG / 0.4;
      setNegativePressureMbar(isNaN(mbar) ? null : mbar);
      setTimeout(() => setIsInchWGUpdating(false), 100);
    }
  }, [isMbarUpdating]);

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
    handleDustConcGrainACFChange,
    handleDustConcGramNm3Change,
    handleDustConcGrainSCFChange,
    handleOutletDustKgHChange,
    handleOutletDustLbHChange,
    handleTargetEmissionMgNm3Change,
    handleTargetEmissionGrainDscfChange,
    handleNegativePressureMbarChange,
    handleNegativePressureInchWGChange,
  };
};
