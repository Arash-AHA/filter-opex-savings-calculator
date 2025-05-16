
import React from 'react';
import Transition from '../UI/Transition';
import { Button } from '@/components/ui/button';
import { Eraser } from 'lucide-react';

interface CalculatorSectionProps {
  title: React.ReactNode;
  delay?: number;
  className?: string;
  children: React.ReactNode;
  onEraseInputs?: () => void;
  showEraseButton?: boolean;
}

const CalculatorSection: React.FC<CalculatorSectionProps> = ({
  title,
  delay = 0,
  className = '',
  children,
  onEraseInputs,
  showEraseButton = false
}) => {
  return (
    <Transition animation="fade-in" delay={delay}>
      <div className={`p-6 rounded-lg shadow-sm ${className}`}>
        <div className="mb-6 flex justify-between items-center">
          <div>{title}</div>
          {showEraseButton && onEraseInputs && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onEraseInputs}
              className="flex items-center gap-1"
            >
              <Eraser className="h-4 w-4" />
              Erase inputs
            </Button>
          )}
        </div>
        {children}
      </div>
    </Transition>
  );
};

export default CalculatorSection;
