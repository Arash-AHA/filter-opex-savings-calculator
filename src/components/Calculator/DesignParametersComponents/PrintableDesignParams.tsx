
import React from 'react';

interface PrintableDesignParamsProps {
  designType: string;
  numEMCFlaps: number | string;
  bagsPerRow: number;
  bagLength: number;
  airVolumeM3h: string;
  airVolumeACFM: string;
  formattedResults: {
    filterArea: string;
    netFilterArea: string;
    acRatioGross: string;
    acRatioNet: string;
    totalBags: number;
  } | null;
}

const PrintableDesignParams: React.FC<PrintableDesignParamsProps> = ({
  designType,
  numEMCFlaps,
  bagsPerRow,
  bagLength,
  airVolumeM3h,
  airVolumeACFM,
  formattedResults,
}) => {
  const bagLengthDisplay = designType === 'bolt-weld' 
    ? `${bagLength} m` 
    : `${bagLength} ft`;

  const safeResults = formattedResults || {
    filterArea: "-",
    netFilterArea: "-",
    acRatioGross: "-",
    acRatioNet: "-",
    totalBags: 0,
  };

  return (
    <div className="p-6 print:p-0 bg-white text-gray-900 rounded-lg">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Filter Design Configuration – {designType === "bolt-weld" ? "Bolt/Weld" : "Modular Design"}
      </h2>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <div className="flex flex-col space-y-1">
            <div className="font-medium">Design Type</div>
            <div>{designType === "bolt-weld" ? "Bolt/Weld" : "Modular Design"}</div>
          </div>
          
          <div className="flex flex-col space-y-1">
            <div className="font-medium">Number of EMC Flaps</div>
            <div>{numEMCFlaps}</div>
          </div>
          
          <div className="flex flex-col space-y-1">
            <div className="font-medium">Bags Per Row</div>
            <div>{bagsPerRow}</div>
          </div>
          
          <div className="flex flex-col space-y-1">
            <div className="font-medium">Bag Length</div>
            <div>{bagLengthDisplay}</div>
          </div>
          
          <div className="flex flex-col space-y-1">
            <div className="font-medium">
              {designType === "modular" ? "Air Volume (ACFM)" : "Air Volume (m³/h)"}
            </div>
            <div>{designType === "modular" ? airVolumeACFM : airVolumeM3h}</div>
          </div>
        </div>

        <h3 className="text-lg font-semibold mt-6 mb-4">Calculated Parameters</h3>
        
        <div className="grid grid-cols-1 gap-4">
          <div className="flex flex-col space-y-1">
            <div className="font-medium">Filter Area (Gross)</div>
            <div>{safeResults.filterArea}</div>
          </div>
          
          <div className="flex flex-col space-y-1">
            <div className="font-medium">
              {designType === "modular" ? "Net Filter Area (Cleaning)" : "Net Filter Area"}
            </div>
            <div>{safeResults.netFilterArea}</div>
          </div>
          
          <div className="flex flex-col space-y-1">
            <div className="font-medium">Air-to-Cloth Ratio (Gross)</div>
            <div>{safeResults.acRatioGross}</div>
          </div>
          
          <div className="flex flex-col space-y-1">
            <div className="font-medium">Air-to-Cloth Ratio (Net)</div>
            <div>{safeResults.acRatioNet}</div>
          </div>
          
          <div className="flex flex-col space-y-1">
            <div className="font-medium">Total Number of Bags</div>
            <div>{safeResults.totalBags}</div>
          </div>
        </div>
      </div>
      
      <div className="text-xs text-center mt-6 text-gray-500 print:hidden">
        Generated on {new Date().toLocaleString()}
      </div>
    </div>
  );
};

export default PrintableDesignParams;
