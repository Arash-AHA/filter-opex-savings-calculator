
import React from 'react';

interface CardHeaderProps {
  designType: string;
}

const CardHeader: React.FC<CardHeaderProps> = ({ designType }) => {
  return (
    <h3 className="text-sm font-medium text-gray-700 mb-4">
      {designType === 'bolt-weld'
        ? 'Design Parameters (Bolt/Weld)'
        : 'Design Parameters (Modular Design)'}
    </h3>
  );
};

export default CardHeader;
