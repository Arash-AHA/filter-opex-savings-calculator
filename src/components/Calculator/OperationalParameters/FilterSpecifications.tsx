
const CleaningCycleParameters: React.FC<CleaningCycleParametersProps> = ({
  minPulseInterval,
  setMinPulseInterval,
  avgPulseInterval,
  setAvgPulseInterval,
  numEMCFlaps
}) => {
  return (
    <div className="mb-4">
      <div className="font-medium text-gray-700 mb-2">Cleaning cycle parameters:</div>
      
      <div className="grid grid-cols-2 gap-3 mb-2">
        <div>
          <InputField
            label="Min. interval (sec):"
            labelClassName="text-xs text-gray-600 mb-1"
            value={minPulseInterval}
            onChange={(value) => setMinPulseInterval(parseFloat(value) || 0)}
            type="number"
            min={0}
            step={1}
            className="mb-0"
          />
        </div>
        <div>
          <InputField
            label="Ave. interval (sec):"
            labelClassName="text-xs text-gray-600 mb-1"
            value={avgPulseInterval}
            onChange={(value) => setAvgPulseInterval(parseFloat(value) || 0)}
            type="number"
            min={0}
            step={1}
            className="mb-0"
          />
        </div>
      </div>
      
      <div className="mt-4 flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <div className="text-xs text-gray-600">Cleaning cycle parameters:</div>
          <div className="font-medium text-sm text-gray-800">
            <span className="mr-3">Min. complete cycle: 5.0 min</span>
            <span>Ave. complete cycle: 13.3 min</span>
          </div>
        </div>
      </div>
    </div>
  );
};
