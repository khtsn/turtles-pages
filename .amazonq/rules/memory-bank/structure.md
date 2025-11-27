# Project Structure

## Directory Organization

```
turtle/
├── client/              # Nuxt 3 web application
├── contracts/           # Hardhat smart contracts
├── pfp/                 # Profile picture matching utility
├── renamer/             # NFT metadata renaming tool
└── reveal/              # NFT reveal automation script
```

## Core Components

### 1. Client Application (`/client`)
Nuxt 3-based progressive web application serving as the primary user interface.

**Key Directories:**
- `components/` - Reusable Vue components (Header, Footer, NotifySnackbar)
- `composables/` - Vue composition functions for contract interaction, navigation, common utilities
- `pages/` - Route-based views (index, mint, earning, vault, etc.)
- `layouts/` - Application layout templates
- `store/` - Pinia state management (snackbar notifications)
- `plugins/` - Vuetify UI framework configuration
- `assets/` - CSS and JavaScript assets
- `public/` - Static files (images, icons, branding)

**Configuration Files:**
- `nuxt.config.ts` - Nuxt framework configuration
- `app.vue` - Root application component
- `package.json` - Dependencies and scripts

### 2. Smart Contracts (`/contracts`)
Hardhat-based Solidity smart contract development environment.

**Contract Files (`/contracts/contracts/`):**
- `TurtlesNFT.sol` - ERC-721 NFT implementation with minting logic
- `Token.sol` - ERC-20 TURTLE token contract
- `Earning.sol` - NFT staking and reward distribution
- `TurtleRedemptionVault.sol` - NFT deposit, swap, and purchase system
- `Faucet.sol` - Token distribution with cooldown mechanism

**Supporting Directories:**
- `test/` - Comprehensive test suites for all contracts
- `scripts/` - Deployment and verification scripts
- `frontend/` - Alternative Vite-based frontend interface
- `artifacts/` - Compiled contract artifacts
- `cache/` - Hardhat compilation cache

**Configuration:**
- `hardhat.config.js` - Network configuration, compiler settings
- `package.json` - Hardhat toolbox and OpenZeppelin dependencies

### 3. PFP Utility (`/pfp`)
Python-based Twitter profile picture matching service.

**Files:**
- `twitter_photo_matcher.py` - Main matching logic
- `requirements.txt` - Python dependencies
- `server_setup.md` - Deployment instructions

### 4. Renamer Tool (`/renamer`)
Go-based utility for NFT metadata file renaming.

**Files:**
- `main.go` - Renaming logic
- `*.json` - Metadata configuration files
- `new/` - Output directory for renamed files

### 5. Reveal Script (`/reveal`)
Node.js automation for NFT reveal events.

**Files:**
- `index.js` - Reveal execution script
- `abi.json` - Contract ABI for interactions
- `package.json` - Dependencies

## Architectural Patterns

### Smart Contract Architecture
- **Modular Design**: Separate contracts for distinct functionality (NFT, Token, Earning, Vault, Faucet)
- **OpenZeppelin Standards**: Leverages battle-tested implementations (ERC721, ERC20, Ownable, ReentrancyGuard)
- **ERC721A Optimization**: Gas-efficient batch minting for NFTs
- **Access Control**: Owner-only functions for administrative operations
- **Security Guards**: Reentrancy protection on financial operations

### Frontend Architecture
- **Component-Based**: Reusable Vue 3 components with composition API
- **Composable Pattern**: Shared logic extracted into composables (useContract, useCommon, useNavigation)
- **State Management**: Pinia stores for global state (notifications)
- **Route-Based Pages**: File-based routing via Nuxt pages directory
- **Web3 Integration**: Ethers.js for blockchain interactions, Reown AppKit for wallet connections

### Data Flow
1. **User → Frontend**: User interacts with Vue components
2. **Frontend → Composables**: Components call composable functions
3. **Composables → Web3**: Composables use ethers.js to interact with contracts
4. **Web3 → Blockchain**: Transactions sent to smart contracts
5. **Blockchain → Frontend**: Events and state changes reflected in UI

## Component Relationships

### Contract Interactions
- **TurtlesNFT** ↔ **Earning**: NFTs staked in Earning contract
- **Token** ↔ **Earning**: TURTLE tokens used as collateral and rewards
- **TurtlesNFT** ↔ **Vault**: NFTs deposited/swapped/purchased via Vault
- **Token** ↔ **Vault**: TURTLE tokens received on deposit, paid for swaps
- **Token** ↔ **Faucet**: TURTLE tokens distributed to users

### Frontend-Contract Integration
- **useContract.js**: Central composable managing all contract instances
- **Page Components**: Call useContract methods for blockchain operations
- **useSnackbar.js**: Displays transaction status and error messages
- **useCommon.js**: Shared utilities for formatting and validation

## Development Workflow
1. **Contracts**: Develop in `/contracts`, test with Hardhat, deploy via scripts
2. **Frontend**: Develop in `/client`, connect to deployed contracts via ABI
3. **Testing**: Run contract tests in `/contracts/test`, manual testing via frontend
4. **Deployment**: Deploy contracts first, update frontend with contract addresses
