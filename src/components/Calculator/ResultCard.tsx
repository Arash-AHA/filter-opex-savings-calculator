
import React from 'react';
import { cn } from '@/lib/utils';
import Transition from '../UI/Transition';

type ResultCardProps = {
  label: string;
  value: React.ReactNode;
  subValue?: React.ReactNode;
  className?: string;
  valueClassName?: string;
  highlight?: boolean;
  delay?: number;
};

const ResultCard: React.FC<ResultCardProps> = ({
  label,
  value,
  subValue,
  className,
  valueClassName,
  highlight = false,
  delay = 0,
}) => {
  return (
    <Transition
      animation="scale-in"
      delay={delay}
      className={cn(
        "calculator-result-card",
        highlight && "ring-2 ring-primary/20 bg-primary/5",
        className
      )}
    >
      <div className="calculator-result-label">{label}</div>
      <div className={cn("calculator-result-value", valueClassName)}>
        {value}
      </div>
      {subValue && (
        <div className="text-xs text-gray-500 mt-1">{subValue}</div>
      )}
    </Transition>
  );
};

export default ResultCard;
