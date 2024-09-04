---
title: Module 7 - Understanding Stader Adapter Contract 
description: Get Started with Router Academy.
---

Here’s the Stader Adapter Contract -

```
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {IStaderPool} from "./Interfaces.sol";
import {RouterIntentEoaAdapterWithoutDataProvider, EoaExecutorWithoutDataProvider} from "@routerprotocol/intents-core/contracts/RouterIntentEoaAdapter.sol";
import {Errors} from "@routerprotocol/intents-core/contracts/utils/Errors.sol";
import {IERC20, SafeERC20} from "../../../utils/SafeERC20.sol";

/**
 * @title StaderStakeEth
 * @author Shivam Agrawal
 * @notice Staking ETH to receive EthX on Stader.
 * @notice This contract is only for Ethereum chain.
 */
contract StaderStakeEth is RouterIntentEoaAdapterWithoutDataProvider {
    using SafeERC20 for IERC20;

    address public immutable ethx;
    IStaderPool public immutable staderPool;

    constructor(
        address __native,
        address __wnative,
        address __ethx,
        address __staderPool
    ) RouterIntentEoaAdapterWithoutDataProvider(__native, __wnative) {
        ethx = __ethx;
        staderPool = IStaderPool(__staderPool);
    }

    function name() public pure override returns (string memory) {
        return "StaderStakeEth";
    }

    /**
     * @inheritdoc EoaExecutorWithoutDataProvider
     */
    function execute(
        bytes calldata data
    ) external payable override returns (address[] memory tokens) {
        (address _recipient, uint256 _amount) = parseInputs(data);

        // If the adapter is called using `call` and not `delegatecall`
        if (address(this) == self()) {
            require(
                msg.value == _amount,
                Errors.INSUFFICIENT_NATIVE_FUNDS_PASSED
            );
        } else if (_amount == type(uint256).max)
            _amount = address(this).balance;

        bytes memory logData;

        (tokens, logData) = _stake(_recipient, _amount);

        emit ExecutionEvent(name(), logData);
        return tokens;
    }

    //////////////////////////// ACTION LOGIC ////////////////////////////

    function _stake(
        address _recipient,
        uint256 _amount
    ) internal returns (address[] memory tokens, bytes memory logData) {
        staderPool.deposit{value: _amount}(_recipient);

        tokens = new address[](2);
        tokens[0] = native();
        tokens[1] = ethx;

        logData = abi.encode(_recipient, _amount);
    }

    /**
     * @dev function to parse input data.
     * @param data input data.
     */
    function parseInputs(
        bytes memory data
    ) public pure returns (address, uint256) {
        return abi.decode(data, (address, uint256));
    }

    // solhint-disable-next-line no-empty-blocks
    receive() external payable {}
}
```

The `StaderStakeEth` Contract allows users to Stake ETH on the Stader Protocol to Receive EthX in return. It is Designed Specifically for the Ethereum Chain and extends the `RouterIntentEoaAdapterWithoutDataProvider` to Implement Staking functionality. This Contract Integrates with the Stader Pool to facilitate the Staking Process.

## Contract `StaderStakeEth.sol`

The `StaderStakeEth` Contract is an Adapter that enables Users to Stake their ETH on Stader and receive EthX in return. The Contract extends `RouterIntentEoaAdapterWithoutDataProvider` and overrides the `execute` function to implement the Core Staking Logic.

## Inheritance

- `RouterIntentEoaAdapterWithoutDataProvider`: The Base Contract for EOAs (Externally Owned Accounts) without a Data Provider.
- `EoaExecutorWithoutDataProvider`: Provides the `execute` function, which is overridden in this Contract.

## Constructor

The Constructor Initializes the Contract with essential Addresses, including the Native Token, Wrapped Native Token, EthX Token, and the Stader Pool Address.

```
constructor(
    address __native,
    address __wnative,
    address __ethx,
    address __staderPool
) RouterIntentEoaAdapterWithoutDataProvider(__native, __wnative) {
    ethx = __ethx;
    staderPool = IStaderPool(__staderPool);
}    
```

- Parameters -
  - `__native`: Address of the Native Token (e.g., ETH).
  - `__wnative`: Address of the Wrapped Native Token (e.g., WETH).
  - `__ethx`: Address of the EthX Token on Stader.
  - `__staderPool`: Address of the Stader Pool Contract where Staking is Performed.

## Functions

- ***name():*** Returns the Name of the Adapter. It returns a String representing the name of the Adapter, `StaderStakeEth`.

```
function name() public pure override returns (string memory)
```

- ***execute():*** Executes the Staking Logic by Calling the `execute` function of the Adapter. This function Decodes the Input Data, checks for Sufficient Native Funds, and Performs the Staking Action.

```
function execute(
    bytes calldata data
) external payable override returns (address[] memory tokens)
```

1. Parameters -
   
    a) `data`: Encoded Input Data containing the Recipient Address and the amount of ETH to be Staked.

2. Returns -
   
    a) `tokens`: An array of Token Addresses involved in the Transaction (Native Token and EthX).

3. Functionality -
   
    a) Decodes the Input Data to Retrieve the Recipient Address and Staking Amount.

    b) Verifies if the Contract is called using `call` and Checks if the Correct Amount of Native funds is Passed.

    c) Executes the `_stake` function to Stake ETH on the Stader Pool.

- ***_stake():*** Handles the Core Staking Logic. It Deposits the Specified amount of ETH to the Stader Pool and returns the involved Tokens and Log Data.

```
function _stake(
    address _recipient,
    uint256 _amount
) internal returns (address[] memory tokens, bytes memory logData)
```

1. Parameters -
   
    a) `_recipient`: The Address that will Receive the EthX Tokens.
    b) `_amount`: The Amount of ETH to be Staked.

2. Returns -
   
    a) `tokens`: An array of Token Addresses involved in the Transaction (Native Token and EthX).
    b) `logData`: Encoded Log Data containing the Execution Event.

3. Functionality -
   
    a) Deposits ETH into the Stader Pool using the provided Recipient Address.

    b) Constructs an array of Token Addresses (Native Token and EthX).

    c) Encodes Log Data containing the Recipient and Amount.

- ***parseInputs():*** Parses the Input Data to Extract the Recipient Address and the Amount of ETH to be Staked.

```
function parseInputs(
    bytes memory data
) public pure returns (address, uint256)
```

1. Parameters -
   
    a) `data`: Encoded Input Data containing the Recipient Address and Staking Amount.

2. Returns - A Tuple Containing -
   
    a) `address`: The Recepient Address.
    b) `uint256`: The Amount of ETH to be Staked.

## Conclusion

Before Going on to the Next Module Let’s Understand Two More Adapters -

1. ***Nitro Adapter:*** This is used to Bridge the Assets or Send Message or do Both from One Chain to another.
2. ***Dexspan Adapter:*** This is used to Swap one Asset to another on the Same Chain.
