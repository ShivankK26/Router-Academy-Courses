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

### **Example 1: Add Liquidity on UniSwap**

![EXAMPLE_1](https://github.com/ShivankK26/Router-Academy-Courses/assets/115289871/6d9c41e0-c890-42a3-8ed7-6dcad65d9d4f)

- **Subcase 1:** If the User doesn't have Desired Tokens -

    1. Swap to Tokens A and B using the Dexspan Adapter.
    2. Add Liquidity on Uniswap using the Uniswap Adapter.

   This Set of Transactions can be executed through Batch Transaction Contract's _executeBatchCallsSameChain_ function. In the above example, the Array of Targets would be Passed as [address of Dexspan Adapter, address of Uniswap Adapter], and the Data would be an Array of respective Inputs.

- **Subcase 2:** If the User has Desired Tokens, they can add Liquidity on Uniswap using the Uniswap Adapter directly.

   In this Case, the Array of Targets would be passed as [address of Uniswap Adapter] in the _executeBatchCallsSameChain_ function along with other Parameters accordingly.

### **Example 2: cross-chain Liquid Stake ETH**

![EXAMPLE_2a](https://github.com/ShivankK26/Router-Academy-Courses/assets/115289871/7aff2df3-a98c-435d-b7ce-15920ba41ede)

![EXAMPLE_2b](https://github.com/ShivankK26/Router-Academy-Courses/assets/115289871/b2ab161a-9490-47b0-8c85-79ee4f10ea92)

- If the user wants to stake Ethereum on a liquid staking protocol but has funds on some other chain, say Polygon:

    1. The user can bridge funds from Polygon to Ethereum using Nitro Adapter on Polygon.
    2. After the request is received on Ethereum , the funds automatically get staked on the desired Liquid Staking Protocol.

   This set of transactions can be executed through Batch transaction contract's executeBatchCallsSameChain function on the source chain.
   
   In this case, the array of targets would be passed here as [address of nitro adapter] . The data parameter will contain inputs to the Nitro adapter. Among the inputs, there is a message parameter in which the user has to encode the data pertaining to liquid staking on ethereum. The message to be sent would consist the refund address, destination targets (LST Adapter address) and the data for that adapter/target.
