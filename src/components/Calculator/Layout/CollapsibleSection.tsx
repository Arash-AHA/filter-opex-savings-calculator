
import React from 'react';
import { ChevronDown } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import CalculatorSection from '../CalculatorSection';

interface CollapsibleSectionProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  className: string;
  delay: number;
  children: React.ReactNode;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  title,
  isOpen,
  onToggle,
  className,
  delay,
  children
}) => {
  const renderTrigger = () => (
    <CollapsibleTrigger 
      onClick={onToggle}
      className="flex items-center justify-between w-full"
    >
      <span>{title}</span>
      <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
    </CollapsibleTrigger>
  );

  return (
    <Collapsible open={isOpen}>
      <CalculatorSection 
        title={renderTrigger()}
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
