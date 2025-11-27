# Technology Stack

## Programming Languages

### Solidity ^0.8.0
- Smart contract development language
- Used for all blockchain contracts (NFT, Token, Earning, Vault, Faucet)
- OpenZeppelin v5.2.0 library integration
- ERC721A v4.3.0 for gas-optimized NFT minting

### JavaScript/TypeScript
- **JavaScript**: Contract tests, deployment scripts, reveal automation
- **TypeScript**: Nuxt 3 configuration, type definitions
- **Node.js**: Runtime for scripts and development servers

### Vue 3
- Frontend framework with Composition API
- Single File Components (.vue)
- Reactive state management with Pinia

### Python 3
- PFP matching utility (`twitter_photo_matcher.py`)
- Dependencies managed via `requirements.txt`

### Go
- NFT metadata renaming tool (`renamer/main.go`)

## Build Systems & Frameworks

### Hardhat 2.22.18 (`/contracts`)
Ethereum development environment for smart contracts.

**Key Dependencies:**
- `@nomicfoundation/hardhat-toolbox` ^5.0.0 - Complete toolset
- `@openzeppelin/contracts` ^5.2.0 - Standard implementations
- `erc721a` ^4.3.0 - Gas-efficient ERC721
- `dotenv` ^16.4.7 - Environment variable management

**Commands:**
```bash
npx hardhat compile          # Compile contracts
npx hardhat test             # Run test suite
npx hardhat node             # Start local blockchain
npx hardhat run scripts/deploy-*.js  # Deploy contracts
```

### Nuxt 3.16.2 (`/client`)
Vue.js meta-framework for web application.

**Core Dependencies:**
- `vue` ^3.5.13 - Core framework
- `vuetify` ^3.8.3 - Material Design components
- `ethers` ^6.13.7 - Ethereum library
- `@reown/appkit` ^1.7.3 - Wallet connection
- `@reown/appkit-adapter-ethers` ^1.7.3 - Ethers adapter
- `pinia` 2.0.36 - State management
- `@vite-pwa/nuxt` ^0.4.0 - PWA support
- `marked` ^9.1.6 - Markdown parsing
- `lodash` ^4.17.21 - Utility functions

**Dev Dependencies:**
- `@nuxt/eslint` 1.3.0 - Linting
- `@vueuse/core` ^10.1.2 - Composition utilities
- `sass` ^1.62.1 - CSS preprocessing

**Commands:**
```bash
yarn install                 # Install dependencies
yarn dev                     # Start dev server (localhost:3000)
yarn build                   # Build for production
yarn generate                # Generate static site
yarn preview                 # Preview production build
```

**Package Manager:** Yarn 1.22.19

### Vite (`/contracts/frontend`)
Alternative frontend build tool for contract testing interface.

## Development Tools

### Testing
- **Hardhat Test**: Mocha-based testing for smart contracts
- **Chai Assertions**: Contract behavior validation
- **Ethers.js**: Contract interaction in tests

### Code Quality
- **ESLint**: JavaScript/TypeScript linting (Nuxt ESLint config)
- **Prettier**: Code formatting (implicit via ESLint)

### Environment Management
- `.env` files for configuration (contracts, client, pfp)
- `.env.example` templates for required variables
- `dotenv` package for loading environment variables

## Smart Contract Standards

### ERC-721 (NFT)
- OpenZeppelin ERC721 base implementation
- ERC721A for batch minting optimization
- ERC721Enumerable for token enumeration
- Pausable extension for emergency stops
- Burnable extension for token destruction

### ERC-20 (Token)
- OpenZeppelin ERC20 base implementation
- Ownable for access control
- Mintable with owner restrictions

### Security Patterns
- ReentrancyGuard on financial operations
- Ownable for administrative functions
- SafeERC20 for token transfers
- Checks-Effects-Interactions pattern

## Web3 Integration

### Ethers.js 6.13.7
- Contract interaction library
- Wallet connection and signing
- Event listening and filtering
- Transaction management

### Reown AppKit 1.7.3
- Multi-wallet connection support
- WalletConnect v2 integration
- Ethereum provider abstraction
- Network switching

## Configuration Files

### Hardhat (`hardhat.config.js`)
- Network configurations (mainnet, testnet, localhost)
- Solidity compiler version and settings
- Plugin configurations
- Gas reporter settings
- Etherscan verification

### Nuxt (`nuxt.config.ts`)
- Module configurations (Vuetify, PWA, Pinia)
- Build optimizations
- Vite plugins (node polyfills)
- Route generation
- Meta tags and SEO

### TypeScript (`tsconfig.json`)
- Compiler options
- Path aliases
- Type checking rules
- Module resolution

## Deployment

### Smart Contracts
- Deployment scripts in `/contracts/scripts/`
- Network-specific configurations in `hardhat.config.js`
- Verification scripts for block explorers

### Frontend
- Static site generation via `nuxt generate`
- Output in `.output/public/`
- PWA manifest and service worker
- Environment-specific contract addresses

## Development Environment

### Required Tools
- Node.js (v18+)
- Yarn package manager
- Python 3 (for PFP utility)
- Go (for renamer tool)
- Git for version control

### IDE Support
- TypeScript definitions for autocomplete
- ESLint integration for linting
- Vue language server for .vue files
- Solidity extensions for .sol files
