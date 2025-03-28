
import React from 'react';

interface AdditionalParametersProps {
  emcSuppliedBags: number;
  bagDiameterMm: number;
  totalBagSurfaceArea: number;
  totalFilterArea: number;
  netFilterArea: number;
  gasTempC: number;
  gasTempF: number;
  dustConcGramAm3: number;
  dustConcGrainACF: number;
  dustConcGramNm3: number;
  dustConcGrainSCF: number;
  handleGasTempCChange: (value: string) => void;
  handleGasTempFChange: (value: string) => void;
  handleDustConcGramAm3Change: (value: string) => void;
  handleDustConcGrainACFChange: (value: string) => void;
  handleDustConcGramNm3Change: (value: string) => void;
  handleDustConcGrainSCFChange: (value: string) => void;
}

const AdditionalParameters: React.FC<AdditionalParametersProps> = ({
  emcSuppliedBags,
  bagDiameterMm,
  totalBagSurfaceArea,
  totalFilterArea,
  netFilterArea,
  gasTempC,
  gasTempF,
  dustConcGramAm3,
  dustConcGrainACF,
  dustConcGramNm3,
  dustConcGrainSCF,
  handleGasTempCChange,
  handleGasTempFChange,
  handleDustConcGramAm3Change,
  handleDustConcGrainACFChange,
  handleDustConcGramNm3Change,
  handleDustConcGrainSCFChange
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
            <input 
              type="text"
              value={gasTempC}
              onChange={(e) => handleGasTempCChange(e.target.value)}
              className="calculator-input pr-8 w-full bg-white text-sm"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">°C</span>
          </div>
          <div className="w-1/2 relative">
            <input 
              type="text"
              value={gasTempF}
              onChange={(e) => handleGasTempFChange(e.target.value)}
              className="calculator-input pr-8 w-full bg-white text-sm"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">°F</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center mb-4">
        <div className="w-60 pr-4 calculator-field-label text-sm">
          <span>Inlet Dust Concentration:</span>
        </div>
        <div className="flex flex-1 space-x-2">
          <div className="w-1/2 relative">
            <input 
              type="text"
              value={dustConcGramAm3}
              onChange={(e) => handleDustConcGramAm3Change(e.target.value)}
              className="calculator-input pr-12 w-full bg-white text-sm"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">g/Am³</span>
          </div>
          <div className="w-1/2 relative">
            <input 
              type="text"
              value={dustConcGrainACF}
              onChange={(e) => handleDustConcGrainACFChange(e.target.value)}
              className="calculator-input pr-12 w-full bg-white text-sm"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">grain/ACF</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center mb-4">
        <div className="w-60 pr-4 calculator-field-label text-sm">
          <span></span>
        </div>
        <div className="flex flex-1 space-x-2">
          <div className="w-1/2 relative">
            <input 
              type="text"
              value={dustConcGramNm3}
              onChange={(e) => handleDustConcGramNm3Change(e.target.value)}
              className="calculator-input pr-12 w-full bg-white text-sm"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">g/Nm³</span>
          </div>
          <div className="w-1/2 relative">
            <input 
              type="text"
              value={dustConcGrainSCF}
              onChange={(e) => handleDustConcGrainSCFChange(e.target.value)}
              className="calculator-input pr-12 w-full bg-white text-sm"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">grain/SCF</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center mb-2">
        <div className="w-60 pr-4 calculator-field-label text-sm">
          <span>Total Number of Filter Bags:</span>
        </div>
        <div className="flex-1">
          <input 
            type="text"
            value={emcSuppliedBags}
            readOnly
            className="calculator-input w-full bg-gray-50 text-sm"
          />
        </div>
      </div>

      <div className="flex items-center mb-2">
        <div className="w-60 pr-4 calculator-field-label text-sm">
          <span>Bag Diameter:</span>
        </div>
        <div className="flex-1 relative">
          <input 
            type="text"
            value={bagDiameterMm}
            readOnly
            className="calculator-input pr-8 w-full bg-gray-50 text-sm"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">mm</span>
        </div>
      </div>

      <div className="flex items-center mb-2">
        <div className="w-60 pr-4 calculator-field-label text-sm">
          <span>Total Bag Surface Area:</span>
        </div>
        <div className="flex-1 relative">
          <input 
            type="text"
            value={totalBagSurfaceArea.toFixed(2)}
            readOnly
            className="calculator-input pr-8 w-full bg-gray-50 text-sm"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">m²</span>
        </div>
      </div>

      <div className="flex items-center mb-2">
        <div className="w-60 pr-4 calculator-field-label text-sm">
          <span>Gross Filter Area:</span>
        </div>
        <div className="flex-1 relative">
          <input 
            type="text"
            value={totalFilterArea.toFixed(2)}
            readOnly
            className="calculator-input pr-8 w-full bg-gray-50 text-sm"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">m²</span>
        </div>
      </div>

      <div className="flex items-center">
        <div className="w-60 pr-4 calculator-field-label text-sm">
          <span>Net Filter Area (EMC cleaning):</span>
        </div>
        <div className="flex-1 relative">
          <input 
            type="text"
            value={netFilterArea.toFixed(2)}
            readOnly
            className="calculator-input pr-8 w-full bg-gray-50 text-sm"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">m²</span>
        </div>
      </div>
    </div>
  );
};

export default AdditionalParameters;
