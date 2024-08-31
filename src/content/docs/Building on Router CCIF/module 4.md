---
title: Module 4 - Structure of an Adapter
description: Get Started with Router Academy.
---

## Step By Step Instructions

Every Adapter Contract must import `RouterIntentEoaAdapterWithoutDataProvider` and `EoaExecutorWithoutDataProvider` from the `@routerprotocol/intents-core` Package.

### Import the Required Contracts
   
Ensure you Import both `RouterIntentEoaAdapterWithoutDataProvider` and `EoaExecutorWithoutDataProvider` from the `@routerprotocol/intents-core` Packages into your Contract file. These Contracts are essential for enabling your Adapter to Interact with the Router Protocol's Intent System.

   ```
      import {RouterIntentEoaAdapterWithoutDataProvider, EoaExecutorWithoutDataProvider} from "@routerprotocol/intents-core/contracts/RouterIntentEoaAdapter.sol";
   ```

### Extend the Required Contracts

Your Adapter Contract must extend `RouterIntentEoaAdapterWithoutDataProvider` to Inherit the necessary Functionalities for Working with the Router Protocol's Intent System. Additionally, your Contract Should Implement `EoaExecutorWithoutDataProvider` if execution functionalities without a Data Provider are Required.

   ```
      contract YourAdapterContract is RouterIntentEoaAdapterWithoutDataProvider, EoaExecutorWithoutDataProvider {
       // Adapter-specific code here
   }
   ```

### Example

Below is an Example of how to Implement a Stader Adapter Contract that extends the required Base Contracts -

```
import {RouterIntentEoaAdapterWithoutDataProvider, EoaExecutorWithoutDataProvider} from "@routerprotocol/intents-core/contracts/RouterIntentEoaAdapter.sol";

contract StaderStakeEth is RouterIntentEoaAdapterWithoutDataProvider, EoaExecutorWithoutDataProvider {
    // Adapter-specific code goes here
}
```

To Implement the Core Logic of any Adapter Contract in the Router Protocol Ecosystem, every Adapter Contract must Define an `execute` function. This function Contains the Primary Business Logic for the Specific Adapter, such as Staking incase of Liquid Staking Adapter or adding Liquidity in a Pool incase of Dex Aapters.

### Structure of the `execute` Function

The `execute` function is where the Core Action for each Adapter is Implemented. Depending on the Adapter's Purpose, the Logic within this function will vary. Below is a Breakdown of how the `execute` function is Generally Structured, in Stader Adapter as an example -

### Example: `execute` Function in Stader Adapter

The `execute` function in the Stader Adapter is Designed to handle Staking Logic. It takes Input Data, Parses it, and executes the Staking Action by Calling the appropriate functions. Below is the example Code and Explanation -

```
function execute(
    bytes calldata data
) external payable override returns (address[] memory tokens) {
    (address _recipient, uint256 _amount) = parseInputs(data);

    // Ensure correct value is sent if called directly via `call`
    if (address(this) == self()) {
        require(
            msg.value == _amount,
            Errors.INSUFFICIENT_NATIVE_FUNDS_PASSED
        );
    } 
    // If the amount is set to max, use the contract's entire balance
    else if (_amount == type(uint256).max) {
        _amount = address(this).balance;
    }

    bytes memory logData;

    // Call internal staking function
    (tokens, logData) = _stake(_recipient, _amount);

    // Emit an event with execution details
    emit ExecutionEvent(name(), logData);
    return tokens;
}
```