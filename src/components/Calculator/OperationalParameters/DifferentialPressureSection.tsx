
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface DifferentialPressureSectionProps {
  currentDiffPressure: number;
  setCurrentDiffPressure: (value: number) => void;
  scheuchDiffPressure: number;
  setScheuchDiffPressure: (value: number) => void;
}

const DifferentialPressureSection: React.FC<DifferentialPressureSectionProps> = ({
  currentDiffPressure,
  setCurrentDiffPressure,
  scheuchDiffPressure,
  setScheuchDiffPressure
}) => {
  const isMobile = useIsMobile();

  return (
    <div className="space-y-4 mb-6">
      <h3 className="text-sm font-medium text-gray-700 border-b pb-2">Differential Pressure</h3>
      
      <div className="space-y-1">
        <div className="text-sm font-medium text-gray-700">Filter Differential Pressure</div>
        <div className="text-sm text-gray-500">Current Situation:</div>
        <div className={`grid grid-cols-${isMobile ? '1' : '2'} gap-3`}>
          <div className={isMobile ? "flex flex-col" : "flex items-center"}>
            {!isMobile && (
              <span className="inline-flex items-center px-2 py-2 text-sm text-gray-500 bg-gray-50 border border-r-0 border-gray-200 rounded-l-md whitespace-nowrap">
                mbar
              </span>
            )}
            <input
              type="number"
              value={currentDiffPressure}
              onChange={(e) => setCurrentDiffPressure(parseFloat(e.target.value) || 0)}
              className={`w-full min-w-0 rounded-${isMobile ? 'md' : 'r-md'} border border-gray-200 px-2 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary`}
              min={0}
            />
            {isMobile && (
              <span className="text-xs text-gray-500 mt-1">mbar</span>
            )}
          </div>
          {!isMobile && (
            <div className="flex items-center">
              <span className="inline-flex items-center px-2 py-2 text-sm text-gray-500 bg-gray-50 border border-r-0 border-gray-200 rounded-l-md whitespace-nowrap">
                Inches&nbsp;W.G.
              </span>
              <input
                type="text"
                value={(currentDiffPressure * 0.4).toFixed(2)}
                onChange={(e) => setCurrentDiffPressure(parseFloat(e.target.value) / 0.4 || 0)}
                className="w-full min-w-0 rounded-r-md border border-gray-200 px-2 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                min={0}
              />
            </div>
          )}
          {isMobile && (
            <div className="flex flex-col mt-2">
              <input
                type="text"
                value={(currentDiffPressure * 0.4).toFixed(2)}
                onChange={(e) => setCurrentDiffPressure(parseFloat(e.target.value) / 0.4 || 0)}
                className="w-full min-w-0 rounded-md border border-gray-200 px-2 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                min={0}
              />
              <span className="text-xs text-gray-500 mt-1">Inches&nbsp;W.G.</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="space-y-1 mt-4">
        <div className="text-sm font-medium text-gray-700">Filter Differential Pressure</div>
        <div className="text-sm text-gray-500">Scheuch EMC Technology:</div>
        <div className={`grid grid-cols-${isMobile ? '1' : '2'} gap-3`}>
          <div className={isMobile ? "flex flex-col" : "flex items-center"}>
            {!isMobile && (
              <span className="inline-flex items-center px-2 py-2 text-sm text-gray-500 bg-gray-50 border border-r-0 border-gray-200 rounded-l-md whitespace-nowrap">
                mbar
              </span>
            )}
            <input
              type="number"
              value={scheuchDiffPressure}
              onChange={(e) => setScheuchDiffPressure(parseFloat(e.target.value) || 0)}
              className={`w-full min-w-0 rounded-${isMobile ? 'md' : 'r-md'} border border-gray-200 px-2 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary`}
              min={0}
            />
            {isMobile && (
              <span className="text-xs text-gray-500 mt-1">mbar</span>
            )}
          </div>
          {!isMobile && (
            <div className="flex items-center">
              <span className="inline-flex items-center px-2 py-2 text-sm text-gray-500 bg-gray-50 border border-r-0 border-gray-200 rounded-l-md whitespace-nowrap">
                Inches&nbsp;W.G.
              </span>
              <input
                type="text"
                value={(scheuchDiffPressure * 0.4).toFixed(2)}
                onChange={(e) => setScheuchDiffPressure(parseFloat(e.target.value) / 0.4 || 0)}
                className="w-full min-w-0 rounded-r-md border border-gray-200 px-2 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                min={0}
              />
            </div>
          )}
          {isMobile && (
            <div className="flex flex-col mt-2">
              <input
                type="text"
                value={(scheuchDiffPressure * 0.4).toFixed(2)}
                onChange={(e) => setScheuchDiffPressure(parseFloat(e.target.value) / 0.4 || 0)}
                className="w-full min-w-0 rounded-md border border-gray-200 px-2 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                min={0}
              />
              <span className="text-xs text-gray-500 mt-1">Inches&nbsp;W.G.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DifferentialPressureSection;
