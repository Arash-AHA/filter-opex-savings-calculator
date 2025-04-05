import React from 'react';
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
  estimateOutletDust: () => void;
  negativePressureMbar: number | null;
  negativePressureInchesWG: number | null;
  handleNegativePressureMbarChange: (value: string) => void;
  handleNegativePressureInchesWGChange: (value: string) => void;
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
  estimateOutletDust,
  negativePressureMbar,
  negativePressureInchesWG,
  handleNegativePressureMbarChange,
  handleNegativePressureInchesWGChange
}) => {
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
              value={gasTempC.toString()}
              onChange={(e) => handleGasTempCChange(e.target.value)}
              className="pr-8 w-full bg-white text-sm"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">°C</span>
          </div>
          <div className="w-1/2 relative">
            <Input 
              type="text"
              value={gasTempF.toString()}
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
              value={dustConcGramAm3.toString()}
              onChange={(e) => handleDustConcGramAm3Change(e.target.value)}
              className="pr-12 w-full bg-white text-sm"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">g/Am³</span>
          </div>
          <div className="w-1/2 relative">
            <Input 
              type="text"
              value={dustConcGrainACF.toString()}
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
              value={dustConcGramNm3 !== null ? dustConcGramNm3.toString() : ''}
              onChange={(e) => handleDustConcGramNm3Change(e.target.value)}
              className="pr-12 w-full bg-white text-sm"
              placeholder="Enter g/Nm³"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">g/Nm³</span>
          </div>
          <div className="w-1/2 relative">
            <Input 
              type="text"
              value={dustConcGrainSCF !== null ? dustConcGrainSCF.toString() : ''}
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
              value={outletDustKgH !== null ? outletDustKgH.toString() : ''}
              onChange={(e) => handleOutletDustKgHChange(e.target.value)}
              className="pr-12 w-full bg-white text-sm"
              placeholder="Enter kg/h"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">kg/h</span>
          </div>
          <div className="w-1/2 relative">
            <Input 
              type="text"
              value={outletDustLbH !== null ? outletDustLbH.toString() : ''}
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
              value={targetEmissionMgNm3 !== null ? targetEmissionMgNm3.toString() : ''}
              onChange={(e) => handleTargetEmissionMgNm3Change(e.target.value)}
              className="pr-12 w-full bg-white text-sm"
              placeholder="Enter mg/Nm³"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">mg/Nm³ (dry)</span>
          </div>
          <div className="w-1/2 relative">
            <Input 
              type="text"
              value={targetEmissionGrainDscf !== null ? targetEmissionGrainDscf.toString() : ''}
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
              value={negativePressureMbar !== null ? negativePressureMbar.toString() : ''}
              onChange={(e) => handleNegativePressureMbarChange(e.target.value)}
              className="pr-12 w-full bg-white text-sm"
              placeholder="Enter mbar"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">mbar</span>
          </div>
          <div className="w-1/2 relative">
            <Input 
              type="text"
              value={negativePressureInchesWG !== null ? negativePressureInchesWG.toString() : ''}
              onChange={(e) => handleNegativePressureInchesWGChange(e.target.value)}
              className="pr-12 w-full bg-white text-sm"
              placeholder="Enter Inches W.G."
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">Inches W.G.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdditionalParameters;
