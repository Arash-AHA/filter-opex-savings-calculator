import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

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
  designType: string;
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
  airVolumeM3h,
  designType
}) => {
  const [ductVelocity, setDuctVelocity] = useState<string>('');
  const [ductSize, setDuctSize] = useState<string>('');
  const [pressureUnit, setPressureUnit] = useState<string>('mbar');
  const [pressureValue, setPressureValue] = useState<string>('');
  
  useEffect(() => {
    // Initialize pressure value from props when component mounts
    if (negativePressureMbar !== null) {
      setPressureValue(negativePressureMbar.toString());
    }
  }, []);
  
  useEffect(() => {
    if (pressureValue && pressureUnit) {
      // Convert pressureValue to mbar based on selected unit
      let mbarValue: number;
      switch (pressureUnit) {
        case 'mmH2O':
          mbarValue = parseFloat(pressureValue) * 0.0980665;
          break;
        case 'pascal':
          mbarValue = parseFloat(pressureValue) * 0.01;
          break;
        case 'mmHg':
          mbarValue = parseFloat(pressureValue) * 1.33322;
          break;
        case 'mbar':
        default:
          mbarValue = parseFloat(pressureValue);
          break;
      }
      
      if (!isNaN(mbarValue)) {
        handleNegativePressureMbarChange(mbarValue.toString());
      }
    }
  }, [pressureValue, pressureUnit]);
  
  useEffect(() => {
    if (airVolumeM3h) {
      const airFlowM3h = parseFloat(airVolumeM3h);
      const airFlowM3s = airFlowM3h / 3600; // Convert m³/h to m³/s
      
      if (designType === 'modular') {
        // For modular design: velocity in ft/min, duct size in inches
        if (ductSize && !ductVelocity) {
          const diameter = parseFloat(ductSize) * 0.0254; // Convert inches to meters
          const area = Math.PI * Math.pow(diameter, 2) / 4; // A = π * D² / 4
          const velocityMS = airFlowM3s / area;
          const velocityFtMin = velocityMS * 196.85; // Convert m/s to ft/min
          setDuctVelocity(velocityFtMin.toFixed(0));
        } 
        else if (ductVelocity && !ductSize) {
          const velocityFtMin = parseFloat(ductVelocity);
          const velocityMS = velocityFtMin / 196.85; // Convert ft/min to m/s
          const requiredArea = airFlowM3s / velocityMS;
          const diameterM = Math.sqrt((4 * requiredArea) / Math.PI);
          const diameterInch = diameterM * 39.3701; // Convert m to inches
          setDuctSize(diameterInch.toFixed(1));
        }
      } else {
        // For bolt-weld design: velocity in m/s, duct size in mm
        if (ductSize && !ductVelocity) {
          const diameter = parseFloat(ductSize) / 1000; // Convert mm to m
          const area = Math.PI * Math.pow(diameter, 2) / 4;
          const calculatedVelocity = airFlowM3s / area;
          setDuctVelocity(calculatedVelocity.toFixed(2));
        } 
        else if (ductVelocity && !ductSize) {
          const velocity = parseFloat(ductVelocity);
          const requiredArea = airFlowM3s / velocity;
          const diameter = Math.sqrt((4 * requiredArea) / Math.PI);
          setDuctSize((diameter * 1000).toFixed(0));
        }
      }
    }
  }, [ductSize, ductVelocity, airVolumeM3h, designType]);

  const safeToString = (value: number | null | undefined): string => {
    return value !== null && value !== undefined ? value.toString() : '';
  };

  const calculatePressureUnits = (mbar: number | null) => {
    if (mbar === null) return { kpa: null, psi: null, mmwg: null };
    
    const kpa = mbar * 0.1;
    const psi = mbar * 0.0145038;
    const mmwg = mbar * 10.1972;
    
    return {
      kpa: kpa.toFixed(2),
      psi: psi.toFixed(3),
      mmwg: mmwg.toFixed(1)
    };
  };

  const additionalPressureUnits = calculatePressureUnits(negativePressureMbar);
  
  const handlePressureValueChange = (value: string) => {
    setPressureValue(value);
  };

  return (
    <div className="space-y-4 p-4 border border-blue-100 rounded-xl bg-blue-50/50 animate-fadeIn">
      <h3 className="font-medium text-gray-700 mb-2">Additional Filter Design Parameters</h3>
      
      <div className="flex flex-col md:flex-row md:items-center mb-4">
        <div className="w-full md:w-60 pr-4 calculator-field-label text-sm mb-2 md:mb-0">
          <span>Gas Temperature:</span>
        </div>
        <div className="flex flex-1 space-x-2">
          <div className="w-1/2 relative">
            <Input 
              type="text"
              value={safeToString(gasTempC)}
              onChange={(e) => handleGasTempCChange(e.target.value)}
              className="pr-10 w-full bg-white text-lg md:text-sm"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">°C</span>
          </div>
          <div className="w-1/2 relative">
            <Input 
              type="text"
              value={safeToString(gasTempF)}
              onChange={(e) => handleGasTempFChange(e.target.value)}
              className="pr-10 w-full bg-white text-lg md:text-sm"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">°F</span>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row md:items-center mb-4">
        <div className="w-full md:w-60 pr-4 calculator-field-label text-sm mb-2 md:mb-0">
          <span>Inlet Dust Concentration (Actual):</span>
        </div>
        <div className="flex flex-1 space-x-2">
          <div className="w-1/2 relative">
            <Input 
              type="text"
              value={safeToString(dustConcGramAm3)}
              onChange={(e) => handleDustConcGramAm3Change(e.target.value)}
              className="pr-14 w-full bg-white text-lg md:text-sm"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">g/Am³</span>
          </div>
          <div className="w-1/2 relative">
            <Input 
              type="text"
              value={safeToString(dustConcGrainACF)}
              onChange={(e) => handleDustConcGrainACFChange(e.target.value)}
              className="pr-14 w-full bg-white text-lg md:text-sm"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">grain/ACF</span>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row md:items-center mb-4">
        <div className="w-full md:w-60 pr-4 calculator-field-label text-sm mb-2 md:mb-0">
          <span>Inlet Dust Concentration (Normal):</span>
        </div>
        <div className="flex flex-1 space-x-2">
          <div className="w-1/2 relative">
            <Input 
              type="text"
              value={safeToString(dustConcGramNm3)}
              onChange={(e) => handleDustConcGramNm3Change(e.target.value)}
              className="pr-14 w-full bg-white text-lg md:text-sm"
              placeholder="Enter g/Nm³"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">g/Nm³</span>
          </div>
          <div className="w-1/2 relative">
            <Input 
              type="text"
              value={safeToString(dustConcGrainSCF)}
              onChange={(e) => handleDustConcGrainSCFChange(e.target.value)}
              className="pr-14 w-full bg-white text-lg md:text-sm"
              placeholder="Enter grain/SCF"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">grain/SCF</span>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row md:items-center mb-4">
        <div className="w-full md:w-60 pr-4 calculator-field-label text-sm mb-2 md:mb-0">
          <span>Outlet Dust Concentration:</span>
        </div>
        <div className="flex flex-1 flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-2">
          <div className="w-full md:w-1/2 relative">
            <Input 
              type="text"
              value={safeToString(outletDustKgH)}
              onChange={(e) => handleOutletDustKgHChange(e.target.value)}
              className="pr-14 w-full bg-white text-lg md:text-sm"
              placeholder="Enter kg/h"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">kg/h</span>
          </div>
          <div className="w-full md:w-1/2 relative">
            <Input 
              type="text"
              value={safeToString(outletDustLbH)}
              onChange={(e) => handleOutletDustLbHChange(e.target.value)}
              className="pr-14 w-full bg-white text-lg md:text-sm"
              placeholder="Enter lb/h"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">lb/h</span>
          </div>
          <Button
            type="button"
            onClick={estimateOutletDust}
            variant="outline"
            className="w-full md:w-auto md:ml-2 h-10"
          >
            Estimate
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row md:items-center mb-4">
        <div className="w-full md:w-60 pr-4 calculator-field-label text-sm mb-2 md:mb-0">
          <span>Target Emission:</span>
        </div>
        <div className="flex flex-1 space-x-2">
          <div className="w-1/2 relative">
            <Input 
              type="text"
              value={safeToString(targetEmissionMgNm3)}
              onChange={(e) => handleTargetEmissionMgNm3Change(e.target.value)}
              className="pr-14 w-full bg-white text-lg md:text-sm"
              placeholder="Enter mg/Nm³"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">mg/Nm³ (dry)</span>
          </div>
          <div className="w-1/2 relative">
            <Input 
              type="text"
              value={safeToString(targetEmissionGrainDscf)}
              onChange={(e) => handleTargetEmissionGrainDscfChange(e.target.value)}
              className="pr-14 w-full bg-white text-lg md:text-sm"
              placeholder="Enter grain/dscf"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">grain/dscf (dry)</span>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row md:items-center mb-4">
        <div className="w-full md:w-60 pr-4 calculator-field-label text-sm mb-2 md:mb-0">
          <span>Negative Pressure at Filter Inlet:</span>
        </div>
        <div className="flex flex-1 space-x-2">
          <div className="w-1/2 relative">
            <div className="flex">
              <Input 
                type="text"
                value={pressureValue}
                onChange={(e) => handlePressureValueChange(e.target.value)}
                className="pr-10 w-full bg-white text-lg md:text-sm rounded-r-none"
              />
              <Select 
                value={pressureUnit} 
                onValueChange={setPressureUnit}
              >
                <SelectTrigger className="w-24 rounded-l-none border-l-0">
                  <SelectValue placeholder="Unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mbar">mbar</SelectItem>
                  <SelectItem value="mmH2O">mmH₂O</SelectItem>
                  <SelectItem value="pascal">Pa</SelectItem>
                  <SelectItem value="mmHg">mmHg</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="w-1/2 relative">
            <Input 
              type="text"
              value={negativePressureInchWG !== null ? negativePressureInchWG.toString() : ''}
              onChange={(e) => handleNegativePressureInchWGChange(e.target.value)}
              className="pr-14 w-full bg-white text-lg md:text-sm"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">Inches W.G.</span>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row md:items-center mb-4">
        <div className="w-full md:w-60 pr-4 calculator-field-label text-sm mb-2 md:mb-0">
          <span>Duct before BH (Size & Velocity):</span>
        </div>
        <div className="flex flex-1 space-x-2">
          <div className="w-1/2 relative">
            <Input 
              type="text"
              value={ductVelocity}
              onChange={(e) => {
                setDuctVelocity(e.target.value);
                setDuctSize('');
              }}
              className="pr-14 w-full bg-white text-lg md:text-sm"
              placeholder={designType === 'modular' ? 'Enter velocity' : 'Enter velocity'}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">
              {designType === 'modular' ? 'ft/min' : 'm/s'}
            </span>
          </div>
          <div className="w-1/2 relative">
            <Input 
              type="text"
              value={ductSize}
              onChange={(e) => {
                setDuctSize(e.target.value);
                setDuctVelocity('');
              }}
              className="pr-14 w-full bg-white text-lg md:text-sm"
              placeholder={designType === 'modular' ? 'Enter duct size' : 'Enter duct size'}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">
              {designType === 'modular' ? 'inches' : 'mm'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdditionalParameters;
