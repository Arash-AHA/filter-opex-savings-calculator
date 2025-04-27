
import React from 'react';
import { ChevronDown } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import CalculatorSection from '../CalculatorSection';

interface CollapsibleSectionProps {
  title: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  delay: number;
  gradientClass: string;
  children: React.ReactNode;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  title,
  isOpen,
  onToggle,
  delay,
  gradientClass,
  children
}) => {
  return (
    <Collapsible open={isOpen}>
      <CalculatorSection 
        title={
          <CollapsibleTrigger 
            onClick={onToggle}
            className="flex items-center justify-between w-full"
          >
            <span>{title}</span>
            <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
          </CollapsibleTrigger>
        }
        delay={delay}
        className={gradientClass}
      >
        <CollapsibleContent>
          {children}
        </CollapsibleContent>
      </CalculatorSection>
    </Collapsible>
  );
};

export default CollapsibleSection;
