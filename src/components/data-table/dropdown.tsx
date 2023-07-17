import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ChevronDown } from 'lucide-react';
import { ReactNode } from 'react';
import { Button } from '../ui/button';

type DropdownProps = {
  title: string;
  children: ReactNode;
};

const Dropdown = ({ title, children }: DropdownProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          {title} <ChevronDown className="ml-2 h-5 w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="max-h-96 overflow-auto">
        {children}
      </PopoverContent>
    </Popover>
  );
};

export default Dropdown;
