import React from 'react';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';
import theme from '../../utils/theme';

interface EnhancedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
  loadingText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
}

/**
 * Enhanced Button component with consistent styling and variants
 * 
 * @param children - Button content
 * @param variant - Button style variant
 * @param size - Button size
 * @param isLoading - Loading state
 * @param loadingText - Text to display during loading
 * @param leftIcon - Icon to display on the left
 * @param rightIcon - Icon to display on the right
 * @param fullWidth - Whether the button should take full width
 * @param className - Additional CSS classes
 * @param ...props - Additional button props
 */
const EnhancedButton: React.FC<EnhancedButtonProps> = ({
  children,
  variant = 'default',
  size = 'md',
  isLoading = false,
  loadingText,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className = '',
  ...props
}) => {
  // Map our variants to shadcn button variants
  let buttonVariant: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' = 'default';
  let customStyles = '';
  
  switch (variant) {
    case 'primary':
      buttonVariant = 'default';
      customStyles = `bg-primary-500 hover:bg-primary-600 text-white`;
      break;
    case 'secondary':
      buttonVariant = 'secondary';
      customStyles = `bg-secondary-500 hover:bg-secondary-600 text-white`;
      break;
    case 'outline':
      buttonVariant = 'outline';
      break;
    case 'ghost':
      buttonVariant = 'ghost';
      break;
    case 'link':
      buttonVariant = 'link';
      break;
    case 'success':
      buttonVariant = 'default';
      customStyles = `bg-success-500 hover:bg-success-700 text-white`;
      break;
    case 'warning':
      buttonVariant = 'default';
      customStyles = `bg-warning-500 hover:bg-warning-700 text-white`;
      break;
    case 'danger':
      buttonVariant = 'destructive';
      break;
    default:
      buttonVariant = 'default';
      break;
  }
  
  // Map our sizes to shadcn button sizes
  let buttonSize: 'default' | 'sm' | 'lg' | 'icon' = 'default';
  
  switch (size) {
    case 'sm':
      buttonSize = 'sm';
      break;
    case 'lg':
      buttonSize = 'lg';
      break;
    case 'icon':
      buttonSize = 'icon';
      break;
    default:
      buttonSize = 'default';
      break;
  }
  
  // Full width style
  const widthStyle = fullWidth ? 'w-full' : '';
  
  return (
    <Button
      variant={buttonVariant}
      size={buttonSize}
      disabled={isLoading || props.disabled}
      className={`${customStyles} ${widthStyle} ${className} transition-all duration-200`}
      {...props}
    >
      {isLoading && (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      )}
      {!isLoading && leftIcon && (
        <span className="mr-2">{leftIcon}</span>
      )}
      {isLoading && loadingText ? loadingText : children}
      {!isLoading && rightIcon && (
        <span className="ml-2">{rightIcon}</span>
      )}
    </Button>
  );
};

export default EnhancedButton;
