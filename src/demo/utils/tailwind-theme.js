// Tailwind theme configuration based on our design system
const theme = {
  extend: {
    colors: {
      // Primary Colors
      'primary': {
        50: '#e6f0ff',
        100: '#cce0ff',
        200: '#99c2ff',
        300: '#66a3ff',
        400: '#3385ff',
        500: '#0066ff', // Main primary color
        600: '#0052cc',
        700: '#003d99',
        800: '#002966',
        900: '#001433',
      },
      
      // Secondary Colors
      'secondary': {
        50: '#e6f9f6',
        100: '#ccf3ed',
        200: '#99e7db',
        300: '#66dbc9',
        400: '#33cfb7',
        500: '#00c3a5', // Main secondary color
        600: '#009c84',
        700: '#007563',
        800: '#004e42',
        900: '#002721',
      },
      
      // Success Colors
      'success': {
        50: '#ecfdf5',
        100: '#d1fae5',
        500: '#10b981',
        700: '#047857',
      },
      
      // Warning Colors
      'warning': {
        50: '#fffbeb',
        100: '#fef3c7',
        500: '#f59e0b',
        700: '#b45309',
      },
      
      // Error Colors
      'error': {
        50: '#fef2f2',
        100: '#fee2e2',
        500: '#ef4444',
        700: '#b91c1c',
      },
      
      // Info Colors
      'info': {
        50: '#eff6ff',
        100: '#dbeafe',
        500: '#3b82f6',
        700: '#1d4ed8',
      },
    },
    fontFamily: {
      sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'],
      mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', '"Liberation Mono"', '"Courier New"', 'monospace'],
    },
    boxShadow: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      none: 'none',
    },
    borderRadius: {
      none: '0',
      sm: '0.125rem',    // 2px
      DEFAULT: '0.25rem', // 4px
      md: '0.375rem',    // 6px
      lg: '0.5rem',      // 8px
      xl: '0.75rem',     // 12px
      '2xl': '1rem',     // 16px
      '3xl': '1.5rem',   // 24px
      full: '9999px',
    },
    transitionDuration: {
      75: '75ms',
      100: '100ms',
      150: '150ms',
      200: '200ms',
      300: '300ms',
      500: '500ms',
      700: '700ms',
      1000: '1000ms',
    },
    transitionTimingFunction: {
      linear: 'linear',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
    zIndex: {
      0: '0',
      10: '10',
      20: '20',
      30: '30',
      40: '40',
      50: '50',
      auto: 'auto',
    },
  },
};

module.exports = theme;
