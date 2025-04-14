import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface AdditionalParametersProps {
  gasTempC: number;
  gasTempF: number;
  dustConcGramAm3: number;
  dustConcGrainACF: number;
  dustConcGramNm3: number | null;
  dustConcGrainSCF: number | null;
  outletDustKgH: number | null;
  outletDustLbH: number | null;
  targetEmissionMgNm3: number | null;
  targetEmissionGrainDscf: number | null;
  negativePressureMbar: number | null;
  negativePressureInchWG: number | null;
  handleGasTempCChange: (value: string) => void;
  handleGasTempFChange: (value: string) => void;
  handleDustConcGramAm3Change: (value: string) => void;
  handleDustConcGrainACFChange: (value: string) => void;
  handleDustConcGramNm3Change: (value: string) => void;
  handleDustConcGrainSCFChange: (value: string) => void;
  handleOutletDustKgHChange: (value: string) => void;
  handleOutletDustLbHChange: (value: string) => void;
  handleTargetEmissionMgNm3Change: (value: string) => void;
  handleTargetEmissionGrainDscfChange: (value: string) => void;
  handleNegativePressureMbarChange: (value: string) => void;
  handleNegativePressureInchWGChange: (value: string) => void;
  estimateOutletDust: () => void;
  airVolumeM3h: string;
}

const AdditionalParameters: React.FC<AdditionalParametersProps> = ({
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
  estimateOutletDust,
  airVolumeM3h
}) => {
  const [ductVelocity, setDuctVelocity] = useState<string>('');
  const [ductSize, setDuctSize] = useState<string>('');
  
  useEffect(() => {
    if (airVolumeM3h) {
      const airFlowM3h = parseFloat(airVolumeM3h);
      const airFlowM3s = airFlowM3h / 3600; // Convert m³/h to m³/s
      
      if (ductSize && !ductVelocity) {
        const diameter = parseFloat(ductSize) / 1000; // Convert mm to m
        const area = Math.PI * Math.pow(diameter, 2) / 4; // A = π * D² / 4
        const calculatedVelocity = airFlowM3s / area;
        setDuctVelocity(calculatedVelocity.toFixed(2));
      } 
      else if (ductVelocity && !ductSize) {
        const velocity = parseFloat(ductVelocity);
        const requiredArea = airFlowM3s / velocity; // A = Q/v
        const diameter = Math.sqrt((4 * requiredArea) / Math.PI); // D = sqrt(4A/π)
        setDuctSize((diameter * 1000).toFixed(0)); // Convert m to mm
      }
    }
  }, [ductSize, ductVelocity, airVolumeM3h]);

  const safeToString = (value: number | null | undefined): string => {
    return value !== null && value !== undefined ? value.toString() : '';
  };

  return (
    <div className="space-y-4 p-4 border border-blue-100 rounded-xl bg-blue-50/50 animate-fadeIn">
      <h3 className="font-medium text-gray-700 mb-2">Additional Filter Design Parameters</h3>
      
      <div className="flex items-center mb-4">
        <div className="w-60 pr-4 calculator-field-label text-sm">
          <span>Gas Temperature:</span>
        </div>
        <div className="flex flex-1 space-x-2">
          <div className="w-1/2 relative">
            <Input 
              type="text"
              value={safeToString(gasTempC)}
              onChange={(e) => handleGasTempCChange(e.target.value)}
              className="pr-8 w-full bg-white text-sm"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">°C</span>
          </div>
          <div className="w-1/2 relative">
            <Input 
              type="text"
              value={safeToString(gasTempF)}
              onChange={(e) => handleGasTempFChange(e.target.value)}
              className="pr-8 w-full bg-white text-sm"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">°F</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center mb-4">
        <div className="w-60 pr-4 calculator-field-label text-sm">
          <span>Inlet Dust Concentration (Actual):</span>
        </div>
        <div className="flex flex-1 space-x-2">
          <div className="w-1/2 relative">
            <Input 
              type="text"
              value={safeToString(dustConcGramAm3)}
              onChange={(e) => handleDustConcGramAm3Change(e.target.value)}
              className="pr-12 w-full bg-white text-sm"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">g/Am³</span>
          </div>
          <div className="w-1/2 relative">
            <Input 
              type="text"
              value={safeToString(dustConcGrainACF)}
              onChange={(e) => handleDustConcGrainACFChange(e.target.value)}
              className="pr-12 w-full bg-white text-sm"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">grain/ACF</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center mb-4">
        <div className="w-60 pr-4 calculator-field-label text-sm">
          <span>Inlet Dust Concentration (Normal):</span>
        </div>
        <div className="flex flex-1 space-x-2">
          <div className="w-1/2 relative">
            <Input 
              type="text"
              value={safeToString(dustConcGramNm3)}
              onChange={(e) => handleDustConcGramNm3Change(e.target.value)}
              className="pr-12 w-full bg-white text-sm"
              placeholder="Enter g/Nm³"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">g/Nm³</span>
          </div>
          <div className="w-1/2 relative">
            <Input 
              type="text"
              value={safeToString(dustConcGrainSCF)}
              onChange={(e) => handleDustConcGrainSCFChange(e.target.value)}
              className="pr-12 w-full bg-white text-sm"
              placeholder="Enter grain/SCF"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">grain/SCF</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center mb-4">
        <div className="w-60 pr-4 calculator-field-label text-sm">
          <span>Outlet Dust Concentration:</span>
        </div>
        <div className="flex flex-1 items-center space-x-2">
          <div className="w-1/2 relative">
            <Input 
              type="text"
              value={safeToString(outletDustKgH)}
              onChange={(e) => handleOutletDustKgHChange(e.target.value)}
              className="pr-12 w-full bg-white text-sm"
              placeholder="Enter kg/h"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">kg/h</span>
          </div>
          <div className="w-1/2 relative">
            <Input 
              type="text"
              value={safeToString(outletDustLbH)}
              onChange={(e) => handleOutletDustLbHChange(e.target.value)}
              className="pr-12 w-full bg-white text-sm"
              placeholder="Enter lb/h"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">lb/h</span>
          </div>
          <Button
            type="button"
            onClick={estimateOutletDust}
            variant="outline"
            className="ml-2 shrink-0 h-10"
          >
            Estimate
          </Button>
        </div>
      </div>
      
      <div className="flex items-center mb-4">
        <div className="w-60 pr-4 calculator-field-label text-sm">
          <span>Target Emission:</span>
        </div>
        <div className="flex flex-1 space-x-2">
          <div className="w-1/2 relative">
            <Input 
              type="text"
              value={safeToString(targetEmissionMgNm3)}
              onChange={(e) => handleTargetEmissionMgNm3Change(e.target.value)}
              className="pr-12 w-full bg-white text-sm"
              placeholder="Enter mg/Nm³"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">mg/Nm³ (dry)</span>
          </div>
          <div className="w-1/2 relative">
            <Input 
              type="text"
              value={safeToString(targetEmissionGrainDscf)}
              onChange={(e) => handleTargetEmissionGrainDscfChange(e.target.value)}
              className="pr-12 w-full bg-white text-sm"
              placeholder="Enter grain/dscf"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">grain/dscf (dry)</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center mb-4">
        <div className="w-60 pr-4 calculator-field-label text-sm">
          <span>Negative Pressure at Filter Inlet:</span>
        </div>
        <div className="flex flex-1 space-x-2">
          <div className="w-1/2 relative">
            <Input 
              type="text"
              value={safeToString(negativePressureMbar)}
              onChange={(e) => handleNegativePressureMbarChange(e.target.value)}
              className="pr-12 w-full bg-white text-sm"
              placeholder="Enter mbar"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">mbar</span>
          </div>
          <div className="w-1/2 relative">
            <Input 
              type="text"
              value={safeToString(negativePressureInchWG)}
              onChange={(e) => handleNegativePressureInchWGChange(e.target.value)}
              className="pr-12 w-full bg-white text-sm"
              placeholder="Enter inchWG"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">Inches W.G.</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center mb-4">
        <div className="w-60 pr-4 calculator-field-label text-sm">
          <span>Duct Size / Velocity:</span>
        </div>
        <div className="flex flex-1 space-x-2">
          <div className="w-1/2 relative">
            <Input 
              type="text"
              value={ductVelocity}
              onChange={(e) => {
                setDuctVelocity(e.target.value);
                setDuctSize(''); // Clear duct size when velocity changes
              }}
              className="pr-8 w-full bg-white text-sm"
              placeholder="Enter velocity"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">m/s</span>
          </div>
          <div className="w-1/2 relative">
            <Input 
              type="text"
              value={ductSize}
              onChange={(e) => {
                setDuctSize(e.target.value);
                setDuctVelocity(''); // Clear velocity when duct size changes
              }}
              className="pr-8 w-full bg-white text-sm"
              placeholder="Enter duct size"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">mm</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdditionalParameters;
