import React from "react";

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange' | 'value'> {
  onValueChange?: (value: string) => void;
  value?: string;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, onValueChange, value, children, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      if (onValueChange) {
        onValueChange(e.target.value);
      }
    };

    return (
      <select
        className={`h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className || ''}`}
        ref={ref}
        onChange={handleChange}
        value={value}
        {...props}
      >
        {children}
      </select>
    );
  }
);
Select.displayName = "Select";

interface SelectItemProps extends React.OptionHTMLAttributes<HTMLOptionElement> {}

const SelectItem = React.forwardRef<HTMLOptionElement, SelectItemProps>(
  ({ className, ...props }, ref) => (
    <option
      ref={ref}
      className={className}
      {...props}
    />
  )
);
SelectItem.displayName = "SelectItem";

// These components are just placeholders to maintain compatibility with the existing code
// They don't actually render anything
const SelectTrigger = ({ children }: { children: React.ReactNode }) => null;
const SelectValue = ({ children }: { children: React.ReactNode }) => null;
const SelectContent = ({ children }: { children: React.ReactNode }) => children;

export {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent
};
