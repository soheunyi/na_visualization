# Claude Code Memory

## Project Overview
This is a React-based numerical analysis visualization tool that allows users to:
- Create draggable points on a canvas
- Apply various interpolation methods (linear, lagrange, splines, etc.)
- Animate points with different movement patterns
- Visualize curves in real-time

## Recent Improvements (Phase 1)

### Dependencies Updated
- React 17 → 18.2.0 (with concurrent features)
- Updated all testing libraries to latest versions
- Pyodide 0.1.1 → 0.25.1 (major performance improvement)
- Added TypeScript and modern tooling (ESLint, Prettier)
- Removed unused socket.io dependencies

### TypeScript Migration
- Converted main files to TypeScript (.tsx/.ts)
- Added comprehensive type definitions in `src/types/index.ts`
- Proper typing for React components and hooks
- Type-safe interpolation and animation interfaces

### Code Quality Improvements
- Fixed `class` → `className` React attribute
- Replaced `setInterval` with `requestAnimationFrame` for 60fps updates
- Added proper error boundaries and null checks
- Implemented useCallback for performance optimization
- Modern React patterns (hooks, proper state management)

### Development Experience
- Added ESLint + Prettier configuration
- TypeScript strict mode enabled
- Added basic test setup with Jest and React Testing Library
- New npm scripts: `lint`, `lint:fix`, `format`, `type-check`

### Architecture Enhancements
- Created reusable Pyodide hook (`usePyodide.ts`)
- Interpolation worker utility for better performance
- Proper error handling throughout the application
- Type-safe animation and interpolation systems

## Build Commands
- `npm start` - Development server
- `npm run build` - Production build
- `npm run test` - Run tests
- `npm run lint` - Check code quality
- `npm run format` - Format code with Prettier
- `npm run type-check` - TypeScript type checking

## Key Files Modified
- `package.json` - Updated dependencies and scripts
- `src/index.tsx` - Main app with TypeScript and React 18
- `src/constant.ts` - Type-safe constants
- `src/canvas/pointCanvas.tsx` - Canvas component with proper types
- `src/types/index.ts` - TypeScript definitions
- `src/hooks/usePyodide.ts` - Modern Pyodide integration

## Next Phase Recommendations
- Add more comprehensive tests
- Implement proper state management (Context/Zustand)
- Add export functionality (SVG, PNG)
- Enhanced UI with point deletion and coordinate editing
- More interpolation methods and mathematical features