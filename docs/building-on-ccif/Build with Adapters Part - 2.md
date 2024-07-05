---
sidebar_position: 3
---

# Module 3: Building with Adapters Part - 2

## Integrations & Concepts

Router's Intents provide the functionality of a multi-caller Contract, facilitating the Batching of multiple Transactions. This multi-caller Contract, in turn, Disseminates Data to various Adapters, each responsible for executing Custom Logic. The Adapters play a Crucial role in processing the received Data, allowing for flexibility and Tailored actions.

### **Batch Handler (Multicall) Contract**

The Batch Handler Contract acts as a Versatile Contract, enabling the execution of multiple Actions in one Transaction. It forms the Base of Router's Cross-Chain Intent Framework (CCIF), and is invoked whenever user wants to Interact with any Intent Adapter. This Contract facilitates Efficient cross-chain Interoperability and empowers Users to engage in Complex Transactions across Different Chains with ease.

- **Key Function**

1. **executeBatchCallsSameChain Function:** This function is used to execute Batch Calls on same Chain. It is responsible for Calling execute function on every Adapter for Triggering respective Tasks such as Staking, Liquidity Addition, Lending, Borrowing and so on.

    ```jsx
        function executeBatchCallsSameChain(
            address[] calldata tokens,
            uint256[] calldata amounts,
            address[] calldata target,
            uint256[] calldata value,
            uint256[] calldata callType,
            bytes[] calldata data
        ) external payable {}
    ```

    The Parameters for this function are explained below -

    a) **Tokens:** Array of addresses of the Tokens to fetch from the User.

    b) **Amounts:** Array of amounts of the Tokens to fetch from the User.

    c) **Target:** Array of addresses of the Contracts/Adapters to Call.

    d) **Value:** Array of amounts of Native Tokens to send along with the Transactions.

    e) **CallType:** Type of call. 1: call, 2: delegateCall.

    f) **Data:** Array of ABI-encoded Data for the respective Transactions.


2. **handleMessage Function:** This function is used to handle cross-chain requests received from Router Nitro. It is also responsible for Calling execute function on every Adapter for Triggering respective Tasks such as Staking, Liquidity Addition, Lending, Borrowing and so on. Note that only Router Nitro can Call this function on Destination Chain.

    ```jsx
        function handleMessage(
        address tokenSent,
        uint256 amount,
        bytes memory instruction
    ) external override onlyNitro nonReentrant {}
    ```

    The Parameters for this function are explained below -

    a) **tokenSent:** Address of Token received.

    b) **amount:** Amount of Tokens received.

    c) **instruction:** Instruction passed from Source Chain to be executed on Destination Chain.    

## Examples

