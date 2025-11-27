# Development Guidelines

## Code Quality Standards

### Formatting and Structure
- **Indentation**: 2 spaces for JavaScript/TypeScript/Solidity, 4 spaces for Python
- **Line Length**: Keep lines reasonable, break long function calls across multiple lines
- **Semicolons**: Required in JavaScript/TypeScript, not used in Python
- **Quotes**: Single quotes for JavaScript/TypeScript strings, double quotes for Python
- **Trailing Commas**: Used in JavaScript/TypeScript objects and arrays

### Naming Conventions
- **Variables/Functions**: camelCase (JavaScript/TypeScript/Solidity)
  - Examples: `nftContractAddress`, `getERC20TokenFee`, `calculateEarnings`
- **Constants**: UPPER_SNAKE_CASE for contract constants
  - Examples: `TURTLE_PER_NFT`, `DAILY_EARNING`, `ONE_DAY`, `MAX_BATCH_SIZE`
- **Classes**: PascalCase
  - Examples: `TwitterPhotoMatcher`, `TurtleRedemptionVault`
- **Private Variables**: Prefix with underscore in Python
  - Example: `self.options`
- **Contract State Variables**: camelCase
  - Examples: `requiredTurtlePerNFT`, `dailyEarningRate`, `vaultAddress`

### Documentation Standards
- **Test Descriptions**: Clear, descriptive test names using "Should" pattern
  - Example: "Should transfer Turtle tokens to the contract when staking"
- **Comment Blocks**: Comprehensive test case lists at file top
  - Group by functionality (Staking, Earnings, Unstaking, Admin functions)
- **Inline Comments**: Explain complex logic, calculations, and business rules
  - Example: `// Calculate expected earnings: 3 NFTs * 10 tokens per day * 2 days`
- **Function Docstrings**: Python functions use triple-quoted docstrings
  - Example: `"""Download and return PIL Image"""`

## Semantic Patterns

### Smart Contract Testing Patterns

#### Test Organization Structure
```javascript
describe("ContractName", function () {
  // Shared variables
  let Contract, contract, owner, addr1, addr2;
  const CONSTANT_VALUE = 123;

  beforeEach(async function () {
    // Setup code runs before each test
    [owner, addr1, addr2] = await ethers.getSigners();
    // Deploy contracts, mint tokens, set approvals
  });

  describe("Feature Group", function () {
    it("Should describe expected behavior", async function () {
      // Test implementation
    });
  });
});
```

**Frequency**: Used in 100% of contract test files (Earning.js, TurtleRedemptionVault.js)

#### Fixture Pattern for Test Setup
```javascript
async function deployFixture() {
  const [owner, addr1, addr2] = await ethers.getSigners();
  // Deploy contracts
  // Setup initial state
  return { contract, token, nft, owner, addr1, addr2 };
}

// Usage in tests
const { vault, token, nft } = await loadFixture(deployFixture);
```

**Frequency**: Used in TurtleRedemptionVault.js (modern Hardhat pattern)

#### Assertion Patterns
```javascript
// Equality checks
expect(value).to.equal(expectedValue);

// Revert checks with message
await expect(contract.function()).to.be.revertedWith("Error message");

// Revert checks with custom error
await expect(contract.function())
  .to.be.revertedWithCustomError(contract, "ErrorName")
  .withArgs(arg1);

// Event emission checks
await expect(contract.function())
  .to.emit(contract, "EventName")
  .withArgs(arg1, arg2);

// Timestamp tolerance
expect(timestamp).to.be.closeTo(expectedTimestamp, 5);
```

**Frequency**: Used in 100% of test assertions across all test files

### Web3 Integration Patterns

#### Contract Instance Creation
```javascript
const contract = new Contract(contractAddress, abi, signerOrProvider);
```

**Frequency**: Used in every contract interaction in useContract.js

#### Transaction Execution with Value
```javascript
const result = await contract.function(params, { value: ethAmount });
```

**Frequency**: Used for payable functions (minting, unstaking with fees)

#### BigInt Arithmetic for Token Amounts
```javascript
const totalFee = fee * BigInt(amount);
const requiredTurtle = ethers.parseEther(`${count * AMOUNT}`);
```

**Frequency**: Used in all token/ETH calculations

#### Approval Pattern for ERC20
```javascript
// 1. Approve spending
await token.approve(spenderAddress, amount);
// 2. Execute function that transfers tokens
await contract.functionThatUsesTokens();
```

**Frequency**: Used in all ERC20 token interactions (staking, swapping)

### Configuration Patterns

#### Environment Variable Management
```javascript
require("dotenv").config();

const getHDWallet = () => {
  const { MNEMONIC, PRIVATE_KEY } = process.env;
  if (MNEMONIC && MNEMONIC !== "") {
    return { mnemonic: MNEMONIC };
  }
  if (PRIVATE_KEY && PRIVATE_KEY !== "") {
    return [PRIVATE_KEY];
  }
  throw Error("Private Key Not Set! Please set up .env");
};
```

**Frequency**: Used in hardhat.config.js for wallet configuration

#### Network Configuration Structure
```javascript
module.exports = {
  networks: {
    networkName: {
      url: "rpc-url",
      chainId: 123,
      accounts: getHDWallet(),
      gasPrice: 10100000000000,
    },
  },
  etherscan: {
    apiKey: { networkName: apiKey },
    customChains: [/* chain configs */],
  },
  solidity: {
    version: "0.8.28",
    settings: {
      optimizer: { enabled: true, runs: 200 }
    }
  },
};
```

**Frequency**: Standard Hardhat configuration pattern

### Vue Composable Patterns

#### Composable Function Structure
```javascript
export default function useComposableName() {
  // Internal state/variables
  const someValue = ref(null);
  
  // Helper functions
  const helperFunction = () => { /* ... */ };
  
  // Public API functions
  const publicFunction = async (params) => { /* ... */ };
  
  // Return public API
  return {
    publicFunction,
    helperFunction,
    someValue,
  };
}
```

**Frequency**: Used in all composables (useContract.js, useCommon.js, useNavigation.js)

#### Contract Interaction Pattern
```javascript
const getContractData = async (provider) => {
  const contract = new Contract(address, abi, provider);
  const data = await contract.viewFunction();
  return data;
};

const executeTransaction = async (signer, params) => {
  const contract = new Contract(address, abi, signer);
  const tx = await contract.writeFunction(params);
  return tx;
};
```

**Frequency**: Used for all read/write contract operations

### Python Class Patterns

#### Class Initialization with Configuration
```python
class ClassName:
    def __init__(self):
        self.options = Options()
        self.options.add_argument('--headless')
        self.options.add_argument('--no-sandbox')
        # Additional configuration
```

**Frequency**: Used in TwitterPhotoMatcher initialization

#### Try-Finally for Resource Cleanup
```python
def function_with_resource(self):
    driver = webdriver.Chrome(options=self.options)
    try:
        # Use resource
        return result
    finally:
        driver.quit()
```

**Frequency**: Used for Selenium driver management

#### Dictionary Return Pattern
```python
return {
    'key1': value1,
    'key2': value2,
    'is_match': boolean_value
}

# Error handling
except Exception as e:
    return {'error': str(e)}
```

**Frequency**: Used for function return values with multiple data points

## Best Practices

### Smart Contract Development

1. **Use OpenZeppelin Libraries**: Leverage battle-tested implementations
   - `Ownable` for access control
   - `ReentrancyGuard` for reentrancy protection
   - `ERC721`, `ERC20` for token standards

2. **Comprehensive Testing**: Cover all paths including edge cases
   - Happy paths (successful operations)
   - Failure cases (reverts with specific messages)
   - Boundary conditions (time limits, amount limits)
   - State transitions (before/after checks)

3. **Gas Optimization**: Use efficient patterns
   - Batch operations (max 20 NFTs per transaction)
   - ERC721A for batch minting
   - Optimizer enabled with 200 runs

4. **Access Control**: Protect administrative functions
   - Owner-only functions for configuration changes
   - Validation checks before state changes

5. **Event Emission**: Emit events for all state changes
   - Include relevant parameters in events
   - Use events for off-chain tracking

### Frontend Development

1. **Composable Separation**: Extract reusable logic into composables
   - Contract interactions in `useContract.js`
   - Common utilities in `useCommon.js`
   - Navigation logic in `useNavigation.js`

2. **Error Handling**: Graceful error management
   - Try-catch blocks for async operations
   - User-friendly error messages via snackbar

3. **Type Safety**: Use TypeScript where possible
   - Configuration files (nuxt.config.ts)
   - Type definitions for better IDE support

4. **Web3 Best Practices**:
   - Separate read (provider) and write (signer) operations
   - Use BigInt for all token amount calculations
   - Approve before transfer pattern for ERC20

### Testing Standards

1. **Descriptive Test Names**: Use "Should" pattern for clarity
   - "Should transfer tokens when staking"
   - "Should reject insufficient balance"

2. **Test Organization**: Group related tests in describe blocks
   - Feature-based grouping (Staking, Earnings, Admin)
   - Setup in beforeEach for consistency

3. **Comprehensive Coverage**: Test all scenarios
   - Success cases
   - Failure cases with specific error messages
   - Edge cases (time boundaries, amount limits)
   - State verification (balance checks, ownership)

4. **Time Manipulation**: Use Hardhat helpers for time-based tests
   - `time.increase()` for advancing blockchain time
   - `time.latest()` for current timestamp

5. **Fixture Pattern**: Use loadFixture for gas efficiency
   - Faster test execution
   - Consistent initial state

## Common Code Idioms

### Solidity Patterns
```solidity
// Require checks at function start
require(condition, "Error message");

// Checks-Effects-Interactions pattern
// 1. Checks
require(balance >= amount, "Insufficient balance");
// 2. Effects
balance -= amount;
// 3. Interactions
token.transfer(recipient, amount);

// Modifier for access control
modifier onlyOwner() {
    require(msg.sender == owner, "Not owner");
    _;
}
```

### JavaScript/TypeScript Patterns
```javascript
// Async/await for promises
const result = await asyncFunction();

// Destructuring for clean code
const { contract, token, nft } = await loadFixture(deployFixture);

// Template literals for dynamic strings
const message = `User ${username} has ${balance} tokens`;

// Arrow functions for callbacks
const filtered = array.filter(item => item.value > 0);
```

### Test Patterns
```javascript
// Setup-Execute-Assert pattern
// Setup
const initialBalance = await token.balanceOf(user);
// Execute
await contract.transfer(recipient, amount);
// Assert
const finalBalance = await token.balanceOf(user);
expect(finalBalance).to.equal(initialBalance - amount);
```

## Frequently Used Annotations

### Hardhat Task Definition
```javascript
task("taskName", "Description", async (taskArgs, hre) => {
  // Task implementation
});
```

### JSDoc Type Hints
```javascript
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = { /* config */ };
```

### Python Type Hints (Implicit)
```python
def function_name(self, param: str) -> dict:
    """Function description"""
    return {'key': 'value'}
```

## Project-Specific Conventions

### Contract Constants
- Define constants at contract level for configurability
- Use immutable for deployment-time constants
- Expose constants via public getters for frontend access

### Token Amount Handling
- Always use `ethers.parseEther()` for token amounts in tests
- Use BigInt arithmetic for calculations
- Return formatted strings for display in frontend

### Transaction Patterns
- Approve tokens before operations requiring transfers
- Include value parameter for payable functions
- Wait for transaction confirmation before UI updates

### Error Messages
- Use descriptive, user-friendly error messages
- Consistent error message format across contracts
- Test for specific error messages in test suite
