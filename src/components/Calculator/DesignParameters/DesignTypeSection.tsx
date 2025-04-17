
import React from 'react';
import FilterDesignType from '../DesignParametersComponents/FilterDesignType';

interface DesignTypeSectionProps {
  designType: string;
  setDesignType: (value: string) => void;
}

const DesignTypeSection: React.FC<DesignTypeSectionProps> = ({
  designType,
  setDesignType
}) => {
  return <FilterDesignType designType={designType} setDesignType={setDesignType} />;
};

export default DesignTypeSection;
