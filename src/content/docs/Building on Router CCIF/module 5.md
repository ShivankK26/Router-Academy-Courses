---
title: Module 5 - Understanding executeBatchCallsSameChain function
description: Get Started with Router Academy.
---

The `BatchTransaction` Contract is Designed as a multi-caller Contract capable of Batching multiple Transactions into a Single Call. This Contract allows executing a Series of Operations in one go, significantly Reducing Gas Costs and improving Transaction Efficiency.

The `executeBatchCallsSameChain` function in the `BatchTransaction` Contract is Specifically Designed to Call the `execute` function of Multiple Adapter Contracts whose addresses are provided in the `target` Parameter. This allows for executing the Core Business Logic of different Adapters in a Single, Batched Transaction.

## Function `executeBatchCallsSameChain`

The `executeBatchCallsSameChain` function enables the Contract to Interact with multiple Adapter Contracts by invoking their `execute` functions in a Single Transaction. The Address of each Adapter Contract is passed in the `target` Parameter, which is used to Specify where the call should be directed.

## Function Definition

```
function executeBatchCallsSameChain(
    address[] calldata tokens,
    uint256[] calldata amounts,
    address[] calldata target,
    uint256[] calldata value,
    uint256[] calldata callType,
    bytes[] calldata data
) external payable {}
```

## Parameters

- `tokens` (`address[] calldata`):  
  An array of Token Addresses specifying which Tokens should be fetched from the User for each Transaction.

- `amounts` (`uint256[] calldata`):  
  An array of Amounts corresponding to each Token in the `tokens` array to be transferred from the User for each Transaction.

- `target`(`address[] calldata`):  
  An array of Addresses of the Adapter Contracts whose `execute` function needs to be Called. Each Address corresponds to a specific Adapter Contract where the Business Logic is implemented.

- `value` (`uint256[] calldata`):  
  An array specifying the Amount of Native Tokens (such as ETH) to be sent along with each Transaction to the respective `target` Address.

- `callType` (`uint256[] calldata`):  
  An array that Defines the Type of Call for each Transaction -
  - `1`: `call` - Executes the `execute` function directly on the Target Adapter Contract.
  - `2`: `delegatecall` - Executes the `execute` function in the Context of the Calling Contract.

- `data` (`bytes[] calldata`):  
  An array of `bytes` Containing the Encoded Data for each `execute` function call of the Adapter Contracts. This Data is what gets Passed to the `execute` function of each respective Adapter.

## Functionality

- The `executeBatchCallsSameChain` function Batches Multiple `execute` function calls into one Transaction, allowing Efficient Interaction with various Adapter Contracts.
  
- Each entry in the `target` array represents an Adapter Contract whose `execute` function will be called with the corresponding encoded Data in the `data` array.
  
- This function is highly flexible, supporting both `call` and `delegatecall` Operations, allowing for either Direct Execution on the Target Contract or within the Context of the Calling Contract.
  
- The function handles Token Transfers, Native Token Transfers, and Batch Execution of the `execute` function on Multiple Adapter Contracts, making it highly efficient for multi-step Operations.
