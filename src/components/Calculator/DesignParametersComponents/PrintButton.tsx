
import React from 'react';
import { Button } from '@/components/ui/button';
import { Printer } from 'lucide-react';

interface PrintButtonProps {
  onClick: () => void;
}

const PrintButton: React.FC<PrintButtonProps> = ({ onClick }) => {
  return (
    <Button
      variant="outline"
      className="w-full mt-6 flex items-center justify-center gap-2"
      onClick={onClick}
    >
      <Printer size={18} className="mr-1" />
      Print
    </Button>
  );
};

export default PrintButton;
