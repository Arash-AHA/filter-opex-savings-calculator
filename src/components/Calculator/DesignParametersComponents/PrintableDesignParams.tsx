
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
      <table className="w-full border-t border-b border-gray-300 mb-4">
        <tbody>
          <tr>
            <td className="py-2 font-medium">Design Type</td>
            <td className="py-2">{designType === "bolt-weld" ? "Bolt/Weld" : "Modular Design"}</td>
          </tr>
          <tr>
            <td className="py-2 font-medium">Number of EMC Flaps</td>
            <td className="py-2">{numEMCFlaps}</td>
          </tr>
          <tr>
            <td className="py-2 font-medium">Bags Per Row</td>
            <td className="py-2">{bagsPerRow}</td>
          </tr>
          <tr>
            <td className="py-2 font-medium">Bag Length</td>
            <td className="py-2">{bagLength}</td>
          </tr>
          <tr>
            <td className="py-2 font-medium">
              {designType === "modular" ? "Air Volume (ACFM)" : "Air Volume (m³/h)"}
            </td>
            <td className="py-2">{designType === "modular" ? airVolumeACFM : airVolumeM3h}</td>
          </tr>
        </tbody>
      </table>
      <h3 className="text-lg font-semibold mb-2 mt-6">Calculated Parameters</h3>
      <table className="w-full border-t border-b border-gray-300">
        <tbody>
          <tr>
            <td className="py-2 font-medium">Filter Area (Gross)</td>
            <td className="py-2">{safeResults.filterArea}</td>
          </tr>
          <tr>
            <td className="py-2 font-medium">{designType === "modular" ? "Net Filter Area (Cleaning)" : "Net Filter Area"}</td>
            <td className="py-2">{safeResults.netFilterArea}</td>
          </tr>
          <tr>
            <td className="py-2 font-medium">Air-to-Cloth Ratio (Gross)</td>
            <td className="py-2">{safeResults.acRatioGross}</td>
          </tr>
          <tr>
            <td className="py-2 font-medium">Air-to-Cloth Ratio (Net)</td>
            <td className="py-2">{safeResults.acRatioNet}</td>
          </tr>
          <tr>
            <td className="py-2 font-medium">Total Number of Bags</td>
            <td className="py-2">{safeResults.totalBags}</td>
          </tr>
        </tbody>
      </table>
      <div className="text-xs text-center mt-6 text-gray-500 print:hidden">Generated on {new Date().toLocaleString()}</div>
    </div>
  );
};

export default PrintableDesignParams;
