
import React from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';
import CalculatorSection from '../CalculatorSection';

interface CollapsibleSectionProps {
  title: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  title,
  isOpen,
  onToggle,
  children,
  delay = 0,
  className
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
        className={className}
      >
        <CollapsibleContent>
          {children}
        </CollapsibleContent>
      </CalculatorSection>
    </Collapsible>
  );
};

export default CollapsibleSection;
