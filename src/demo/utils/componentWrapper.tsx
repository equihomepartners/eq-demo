import React from 'react';
import { isStandalone } from './environment';

/**
 * A higher-order component that wraps components to handle conditional rendering
 * based on whether the demo is running in standalone mode or within the platform.
 * 
 * @param StandaloneComponent The component to use in standalone mode
 * @param PlatformComponent The component to use in platform mode
 * @returns A component that renders the appropriate version based on the environment
 */
export function withEnvironment<P>(
  StandaloneComponent: React.ComponentType<P>,
  PlatformComponent: React.ComponentType<P>
): React.FC<P> {
  return (props: P) => {
    const Component = isStandalone() ? StandaloneComponent : PlatformComponent;
    return <Component {...props} />;
  };
}

/**
 * A utility to create a component that uses different styling based on the environment.
 * 
 * @param Component The base component
 * @param standaloneClassName Additional classes to apply in standalone mode
 * @param platformClassName Additional classes to apply in platform mode
 * @returns A component with environment-specific styling
 */
export function withEnvironmentStyles<P extends { className?: string }>(
  Component: React.ComponentType<P>,
  standaloneClassName: string = '',
  platformClassName: string = ''
): React.FC<P> {
  return (props: P) => {
    const environmentClass = isStandalone() ? standaloneClassName : platformClassName;
    const className = `${props.className || ''} ${environmentClass}`.trim();
    return <Component {...props} className={className} />;
  };
}
