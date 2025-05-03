# Equihome Platform Demo - Standalone Setup Instructions

This document provides comprehensive instructions for setting up the Equihome Platform Demo as a standalone project.

## Overview

The Equihome Platform Demo is designed to be self-contained within the `src/demo` folder. The demo includes a standalone mode that allows it to run independently of the main platform, with all necessary components, styles, and data included within the demo folder.

## Prerequisites

- Node.js (v16 or later)
- npm or yarn

## Step 1: Create a New Project

```bash
# Using Vite with React and TypeScript
npm create vite@latest equihome-demo -- --template react-ts

# Navigate to the new project
cd equihome-demo

# Install base dependencies
npm install
```

## Step 2: Install Required Dependencies

```bash
# Install all required dependencies
npm install @tanstack/react-table recharts lucide-react @radix-ui/react-dropdown-menu @radix-ui/react-slot class-variance-authority clsx tailwind-merge react-map-gl mapbox-gl @radix-ui/react-tabs

# Install development dependencies
npm install -D tailwindcss postcss autoprefixer
```

## Step 3: Set Up Tailwind CSS

```bash
# Initialize Tailwind CSS
npx tailwindcss init -p
```

Update the `tailwind.config.js` file with the following content:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
        },
        secondary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
      },
      keyframes: {
        'draw': {
          '0%': { strokeDashoffset: 1000 },
          '100%': { strokeDashoffset: 0 }
        },
        'grow-up': {
          '0%': { transform: 'scaleY(0)' },
          '100%': { transform: 'scaleY(1)' }
        },
        'slide-right': {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' }
        },
        'pulse-subtle': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.02)' }
        },
        'ping-slow': {
          '0%': { transform: 'scale(1)', opacity: '0.2' },
          '50%': { transform: 'scale(1.05)', opacity: '0.1' },
          '100%': { transform: 'scale(1)', opacity: '0' }
        }
      },
      animation: {
        'draw': 'draw 2s ease-out forwards',
        'grow-up': 'grow-up 1s ease-out forwards',
        'slide-right': 'slide-right 1s ease-out forwards',
        'pulse-subtle': 'pulse-subtle 2s ease-in-out infinite',
        'ping-slow': 'ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite'
      },
    },
  },
  plugins: [],
}
```

Update the `src/index.css` file with the following content:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;

    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;

    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;

    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;

    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;

    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;

    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;

    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;

    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;

    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;

    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;

    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;

    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;

    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;

    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;

    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;

    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;

    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 212.7 26.8% 83.9%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

## Step 4: Copy the Demo Files

1. Copy the entire `src/demo` folder from the original project to the `src` directory of your new project.

2. No need to create additional components outside the demo folder - all necessary components are included in the `src/demo/standalone` directory.

## Step 5: Use the Standalone Entry Point

The demo includes a standalone entry point that sets up all necessary providers and routing.

Update your `src/main.tsx` file to use the standalone entry point:

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import StandaloneDemo from './demo/StandaloneDemo'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StandaloneDemo />
  </React.StrictMode>,
)
```

## Standalone Architecture

The demo includes a standalone architecture with the following components:

1. **StandaloneDemo.tsx**: The entry point for the standalone demo that sets up all necessary providers
2. **standalone/components/**: UI components used in standalone mode
3. **standalone/contexts/**: Context providers used in standalone mode
4. **standalone/data/**: Data files used in standalone mode
5. **standalone/styles.css**: Styles for standalone mode
6. **utils/environment.ts**: Utility to detect whether the demo is running in standalone mode
7. **utils/imports.ts**: Utility for conditional imports based on environment
8. **utils/componentWrapper.tsx**: Higher-order components for environment-specific rendering

## Step 6: Run the Demo

```bash
npm run dev
```

The demo will automatically detect that it's running in standalone mode and use the appropriate components and styles.

## How It Works

The standalone architecture uses a detection mechanism to determine whether the demo is running in standalone mode or within the platform:

1. When running in standalone mode, the `isStandalone()` function in `utils/environment.ts` returns `true`
2. Components use conditional imports based on this environment detection
3. The standalone entry point sets up all necessary providers and routing
4. Styles are applied based on the environment

This approach allows the demo to run both within the platform and as a standalone application without any code changes.

## Troubleshooting

If you encounter any issues:

1. **Missing dependencies**: Check the console for errors about missing packages and install them.

2. **Import path errors**: The demo should handle import paths automatically through the environment detection mechanism. If you see import errors, make sure all files in the standalone directory are properly copied.

3. **Component errors**: The standalone architecture includes all necessary components. If you see component errors, check that the standalone directory structure is intact.

4. **Styling issues**: The standalone mode includes its own CSS file. Make sure it's properly imported in the StandaloneDemo component.

## Container Sizing

The standalone mode includes CSS classes that ensure containers expand to full width:

```css
.demo-container {
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  padding: 0 1rem;
}
```

These classes are automatically applied when running in standalone mode.

## Additional Resources

- [Vite Documentation](https://vitejs.dev/guide/)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## License

This demo is proprietary and confidential. Unauthorized copying, distribution, or use is strictly prohibited.
