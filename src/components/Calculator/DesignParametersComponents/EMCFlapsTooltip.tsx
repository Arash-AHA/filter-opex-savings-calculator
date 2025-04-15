
import React from 'react';
import { Button } from '@/components/ui/button';

interface EMCFlapsTooltipProps {
  suggestedFlaps: number | null;
  designType: string;
  airVolumeM3h: string;
  airVolumeACFM: string;
  bagsPerRow: number;
  bagLength: number;
  currentAcRatio: number;
  onApplySuggestion: () => void;
}

const EMCFlapsTooltip: React.FC<EMCFlapsTooltipProps> = ({
  suggestedFlaps,
  designType,
  airVolumeM3h,
  airVolumeACFM,
  bagsPerRow,
  bagLength,
  currentAcRatio,
  onApplySuggestion,
}) => {
  return (
    <div className="space-y-2">
      <p><strong>Suggested value: {suggestedFlaps}</strong></p>
      {designType === 'modular' && (
        <p className="text-sm text-yellow-600">Note: For modular design, the number of EMC flaps must be a multiple of 3 (each Module has 3 EMC dampers)</p>
      )}
      {designType === 'bolt-weld' ? (
        <>
          <p className="text-sm">Based on your current configuration (Air Volume: {airVolumeM3h} m³/h, {bagsPerRow} bags per row, {bagLength}m bag length), we suggest using {suggestedFlaps} EMC flaps to maintain an A/C ratio below 1.0.</p>
          <p className="text-sm">Current A/C ratio: {currentAcRatio.toFixed(2)} m³/min/m²</p>
          <p className="text-sm">{currentAcRatio <= 1.0 ? '✅ A/C ratio is good (below 1.0)' : '⚠️ A/C ratio is too high (above 1.0)'}</p>
        </>
      ) : (
        <>
          <p className="text-sm">Based on your current configuration (Air Volume: {airVolumeACFM} ACFM, {bagsPerRow} bags per row, {bagLength}ft bag length), we suggest using {suggestedFlaps} EMC flaps to maintain an A/C ratio below 3.2.</p>
          <p className="text-sm">Current A/C ratio: {currentAcRatio.toFixed(2)} cfm/sq ft</p>
          <p className="text-sm">{currentAcRatio <= 3.2 ? '✅ A/C ratio is good (below 3.2)' : '⚠️ A/C ratio is too high (above 3.2)'}</p>
        </>
      )}
      <Button 
        size="sm" 
        onClick={onApplySuggestion} 
        className="w-full mt-2"
      >
        Apply suggestion
      </Button>
    </div>
  );
};

export default EMCFlapsTooltip;
