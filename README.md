# Equihome Platform Demo

This is a standalone version of the Equihome Platform Demo, showcasing the complete workflow of the Equihome platform.

**Live Demo:** [https://equihomepartners.github.io/eq-demo/](https://equihomepartners.github.io/eq-demo/)

The demo includes:

1. **Underwriting System** - Processes loan applications, evaluates properties and homeowners, and generates term sheets for no-monthly-payment loans.
2. **Traffic Light System** - Classifies suburbs into green, yellow, and red zones based on investment potential, using machine learning to analyze market data.
3. **Portfolio Management System** - Manages loan portfolios, applies CIO guidelines, runs simulations for portfolio optimization, and provides financial modeling.

## Features

- Interactive demo with guided tour
- Standalone architecture that runs independently
- Responsive design with Tailwind CSS
- Mock data for demonstration purposes
- Simulated API calls and data processing

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/equihomepartners/eq-demo.git
cd eq-demo
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal).

## Technologies Used

- React
- TypeScript
- Vite
- Tailwind CSS
- Radix UI Components
- Chart.js / Recharts
- React Router
- Mapbox GL / React Map GL

## Project Structure

- `/src/demo` - Main demo components and logic
  - `/components` - UI components organized by feature
  - `/context` - React context providers
  - `/data` - Mock data for the demo
  - `/standalone` - Standalone-specific components and utilities
  - `/utils` - Utility functions and helpers

## Embedding the Demo

You can embed this demo in other websites using an iframe:

```html
<iframe
  src="https://equihomepartners.github.io/eq-demo/"
  width="100%"
  height="800px"
  frameborder="0"
  title="Equihome Platform Demo">
</iframe>
```

## Deployment

To deploy the demo to GitHub Pages:

```bash
npm run deploy
```

This will build the project and publish it to the `gh-pages` branch, making it available at https://equihomepartners.github.io/eq-demo/.

## License

This project is proprietary and confidential. Unauthorized copying, distribution, or use is strictly prohibited.
