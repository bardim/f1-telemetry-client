# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the F1 Telemetry Client - a TypeScript UDP client and telemetry parser for EA-Codemasters F1 games (F1 24, F1 23, F1 22, F1 2021, F1 2020, F1 2019, F1 2018). The library parses UDP telemetry data streams from F1 games and emits structured events for external applications to consume.

## Core Architecture

### Main Components

- **F1TelemetryClient** (`src/index.ts`): Main UDP client class that extends EventEmitter, handles socket connections, and orchestrates packet parsing
- **F1Parser** (`src/parsers/F1Parser.ts`): Base parser class extending binary-parser for all packet parsers
- **Packet Parsers** (`src/parsers/packets/`): Individual parsers for each telemetry packet type (motion, lap data, car telemetry, etc.)
- **Constants** (`src/constants/`): Game data mappings including teams, drivers, tracks, weather conditions, and packet specifications

### Data Flow

1. UDP packets received from F1 game via socket
2. Packet header parsed to determine packet type and format version
3. Appropriate packet parser selected based on packet ID
4. Binary data parsed into structured JavaScript objects
5. Events emitted with parsed data for consumers to handle

### Key Design Patterns

- **Event-driven architecture**: Client emits events for each packet type
- **Parser factory pattern**: Packet parsers selected dynamically based on packet ID
- **Version compatibility**: Supports multiple F1 game versions through format versioning
- **Message forwarding**: Optional UDP bridging to forward raw packets to other endpoints

## Development Commands

### Building and Running
```bash
npm run build              # Compile TypeScript and create ES5 build
npm run start             # Build and run playground example
npm run record            # Build and run recording utility
```

### Code Quality
```bash
npm run lint              # Run Google TypeScript Style (gts) linter
npm run fix               # Auto-fix linting issues with gts
npm run type-check        # TypeScript type checking without compilation
npm run type-check:watch  # Watch mode for type checking
```

### Testing
```bash
npm test                  # Run Jest tests (also runs lint after tests)
```

### Development Workflow
```bash
npm run clean             # Remove build directory
npm run compile           # TypeScript compilation only
npm run build:link        # Build and create npm link for local development
```

## Key Technical Details

### Packet Structure
- All packets contain a header with format version, packet ID, and session metadata
- Packet sizes vary by game version (stored in `src/constants/packetSizes.ts`)
- Binary parsing handled by `binary-parser` library with custom `F1Parser` wrapper

### Multi-version Support
- Game format versions handled through `m_packetFormat` field in headers
- Parsers adapt behavior based on format version for backward compatibility
- Mock data available in `src/mocks/` for different game years

### Configuration Options
- `port`: UDP port to listen on (default: 20777)
- `bigintEnabled`: Whether to parse 64-bit integers as BigInt (default: true)
- `forwardAddresses`: Optional UDP forwarding to other applications
- `skipParsing`: Option to forward raw packets without parsing

## File Structure Notes

- `src/constants/`: Game data constants organized by category (teams, tracks, drivers, etc.)
- `src/parsers/packets/`: One parser file per packet type, with corresponding type definitions
- `src/playground/`: Example implementations including basic client and recording utility
- `src/mocks/`: Sample telemetry data files for testing different game versions
- Build outputs to `build/main/` (TypeScript) and `build/es5/` (Babel transpiled)

## Testing Framework

- Uses Jest with TypeScript support via ts-jest
- Test files use `.test.ts` or `.spec.ts` extensions
- Tests located in `src/` alongside source files
- Test configuration in `jest.config.js`