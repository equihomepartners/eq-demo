import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import theme from '../../utils/theme';

interface EnhancedCardProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'bordered' | 'interactive';
  status?: 'default' | 'success' | 'warning' | 'error' | 'info';
}

/**
 * Enhanced Card component with consistent styling and variants
 * 
 * @param title - Card title
 * @param description - Card description
 * @param children - Card content
 * @param footer - Card footer
 * @param className - Additional CSS classes
 * @param variant - Card style variant
 * @param status - Card status indicator
 */
const EnhancedCard: React.FC<EnhancedCardProps> = ({
  title,
  description,
  children,
  footer,
  className = '',
  variant = 'default',
  status = 'default',
}) => {
  // Base styles
  let cardStyles = 'rounded-lg overflow-hidden transition-all duration-200';
  
  // Variant styles
  switch (variant) {
    case 'elevated':
      cardStyles += ` shadow-md hover:shadow-lg bg-white`;
      break;
    case 'bordered':
      cardStyles += ` border-2 border-gray-200 bg-white`;
      break;
    case 'interactive':
      cardStyles += ` shadow-sm hover:shadow-md transform hover:-translate-y-1 bg-white cursor-pointer`;
      break;
    default:
      cardStyles += ` shadow-sm bg-white`;
      break;
  }
  
  // Status indicator styles
  let statusStyles = '';
  let statusColor = '';
  
  switch (status) {
    case 'success':
      statusStyles = `border-l-4 border-success-500`;
      statusColor = theme.colors.success[500];
      break;
    case 'warning':
      statusStyles = `border-l-4 border-warning-500`;
      statusColor = theme.colors.warning[500];
      break;
    case 'error':
      statusStyles = `border-l-4 border-error-500`;
      statusColor = theme.colors.error[500];
      break;
    case 'info':
      statusStyles = `border-l-4 border-info-500`;
      statusColor = theme.colors.info[500];
      break;
    default:
      statusStyles = '';
      break;
  }
  
  return (
    <Card className={`${cardStyles} ${statusStyles} ${className}`}>
      {(title || description) && (
        <CardHeader className="pb-3">
          {title && <CardTitle className="text-gray-900">{title}</CardTitle>}
          {description && <CardDescription className="text-gray-500">{description}</CardDescription>}
        </CardHeader>
      )}
      <CardContent>{children}</CardContent>
      {footer && <CardFooter className="border-t border-gray-100 bg-gray-50">{footer}</CardFooter>}
    </Card>
  );
};

export default EnhancedCard;
