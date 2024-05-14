---
sidebar_position: 11
---

# Module 11: Using Asset Transfer SDK - Part 2

Welcome to Module 11 of the Router Nitro Cookbook. This module focuses on importing all the necessary modules , getting the quote and actually executing the transaction.

## Proceed with the following steps to

### 1. Importing Modules

#### Description:

Import the necessary modules from the SDK into your codebase.

#### Example:

```javascript
import { PathFinder, Network } from "@routerprotocol/asset-transfer-sdk-ts";
import { evmSignerFromPrivateKeyAndRpc } from "@routerprotocol/asset-transfer-sdk-ts/pathfinder/ChainClient/EvmChainClient";
```

### 3. Initializing Pathfinder

#### Description:

Next you need to initialize a Pathfinder instance. You need to provide your unique Widget ID obtained from Router Protocol Telegram Channel. For now let it be 24

#### Example:

```javascript
const YOUR_WIDGET_ID = 24; // Replace with your unique SDK ID
const pathfinder = new Pathfinder(Network.Testnet, YOUR_WIDGET_ID);
```

### 4. Main Function

#### Description:

Define a main function where asset swapping operations will be organized and executed.

#### Example:

```javascript
const main = async () => {
  // Asset swapping logic
};

main();
```

### 5. Building EVM Signer

#### Description:

Construct an EVM signer object using your private key and the RPC endpoint. This signer will be used for signing transactions during asset transfers. In this tutorial we will be transferring 10 AFTT from Fuji to Holesky chain.

#### Example:

```javascript
const evmSigner = evmSignerFromPrivateKeyAndRpc(
  evmPrivateKey,
  "https://rpc.ankr.com/avalanche_fuji"
);
```

Make sure to replace evmPrivateKey with your Private Key .
Note : This is just a tutorial , so abstain from using Private Key which you use for normal usage.

### 6. Getting Quote

#### Description:

Router Nitro enables you to interact with the nitro contract and initiate CrossChain token transfers. The first step in this process is to request a quote, which provides you with essential details about the proposed token transfer.
Request a quote from Pathfinder for the desired asset transfer, specifying source and destination chain IDs, token addresses, and the amount of assets to be transferred. In our case , we are transferring 10 AFTT tokens.

#### Example:

```javascript
const quote = await pathfinder.getQuote({
  sourceChainId: "43113",
  sourceTokenAddress: "0xb452b513552aa0B57c4b1C9372eFEa78024e5936",
  destinationChainId: "17000",
  destinationTokenAddress: "0x5c2c6ab36a6e4e160fb9c529e164b7781f7d255f",
  expandedInputAmount: "10000000000000000000",
});
```

### 7. Executing Quote

#### Description:

Execute the obtained quote, handling approval and executing the transaction to ensure a successful asset transfer.

#### Example:

```javascript
const transaction = await pathfinder.executeQuote(
  {
    quote,
    slippageTolerance: "1",
    senderAddress: evmSigner.address,
    receiverAddress: evmSigner.address,
  },
  {
    evmSigner,
  }
);
```

### Congratulations!

You just transferred 10 AFTT from Fuji to using Router Protocol's Asset Transfer SDK

# Share Your Learnings!

![img](https://github.com/router-resources/Router-Nitro-CookBook/assets/124175970/23258532-0dfa-407e-b695-2ed2eb39d1bc)

_Share your learnings on Twitter. Click [here](https://clicktotweet.com/5p7ub)_
