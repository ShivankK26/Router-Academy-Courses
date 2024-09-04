---
title: Module 6 - Understanding HandleMessage function 
description: Get Started with Router Academy.
---

The `Nitro` Adapter enables Bridging Assets or Sending Messages from one Blockchain to another, or even both. When a Message is Successfully Transferred to the Destination Chain, the `handleMessage` function of the `BatchTransaction` Contract is invoked on the Destination Chain. This function is where the Logic for Handling the received Instructions can be Defined and executed.

## Function `handleMessage`

The `handleMessage` function in the `BatchTransaction` Contract is used to Handle Instructions received from the Source Chain. It is called when a Message is Bridged from One Chain to another using the Nitro Adapter. This function Defines the Actions that should be performed on the Destination Chain based on the instructions Provided.

## Function Definition

```
function handleMessage(
    address tokenSent,
    uint256 amount,
    bytes memory instruction
) external override onlyNitro nonReentrant {}
```

## Parameters

- `tokenSent` (`address`):  
  The Address of the Token that has been Bridged from the Source Chain to the Destination Chain. This Parameter specifies which Token has been Received.

- `amount` (`uint256`):  
  The Amount of Tokens that have been received from the Source Chain. This Parameter indicates the Quantity of the `tokenSent` that is now available on the Destination Chain.

- `instruction` (`bytes memory`):  
  Encoded Instructions Passed from the Source Chain. This Parameter contains the Data that Specifies what actions should be performed on the Destination Chain Upon receipt of the Bridged Tokens or Message.

## Functionality

- The `handleMessage` function is called automatically on the Destination Chain when a Message or Asset Transfer is initiated from a Source Chain using the Nitro Adapter.
  
- The function takes the Received Token and Amount, along with any additional Encoded Instructions, and processes them according to the Logic defined within the function body.
  
- This is the place where Custom Logic is written to handle the Bridged Tokens or to execute any Specific Actions as per the Instructions Received.

## Modifiers

- `onlyNitro`:  
  Ensures that only Authorized Nitro Adapter Contracts can call this function, adding a Layer of Security to prevent Unauthorized access.

- `nonReentrant`:  
  Prevents Reentrancy Attacks by ensuring that the function cannot be called again while it is still Executing. This Modifier is Crucial for Protecting against Reentrancy Vulnerabilities in Smart Contracts.
