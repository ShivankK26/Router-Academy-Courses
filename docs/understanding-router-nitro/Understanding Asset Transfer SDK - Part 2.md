---
sidebar_position: 9
---

# Module 9: Understanding Asset Transfer SDK - Part 2

<iframe width="560" height="315" src="https://www.youtube.com/embed/_bvJWZjqreU" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Welcome to Module 11 of the Router Nitro Cookbook. This Module focuses on importing all the Necessary Modules, Getting the Quote and actually Executing the Transaction.

## Proceed with the Following Steps to -

### 1. Importing Modules

#### Description:

Import the Necessary Modules from the SDK into your CodeBase.

#### Example:

```javascript
import { PathFinder, Network } from "@routerprotocol/asset-transfer-sdk-ts";
import { evmSignerFromPrivateKeyAndRpc } from "@routerprotocol/asset-transfer-sdk-ts/pathfinder/ChainClient/EvmChainClient";
```

### 2. Initializing Pathfinder

#### Description:

Next you need to initialize a `Pathfinder` Instance. You need to Provide your Unique Widget ID obtained from Router Protocol Telegram Channel. For now let it be 24.

#### Example:

```javascript
const YOUR_WIDGET_ID = 24; // Replace with your unique SDK ID
const pathfinder = new PathFinder(Network.Testnet, YOUR_WIDGET_ID);
```

### 3. Main Function

#### Description:

Define a <code>main</code> Function where Asset Swapping Operations will be Organized and Executed.

#### Example:

```javascript
const main = async () => {
  // Asset swapping logic
};

main();
```

### 4. Building EVM Signer

#### Description:

Construct an EVM Signer Object using your Private Key and the RPC Endpoint. This Signer will be used for Signing Transactions during Asset Transfers. In this Tutorial, we will be Transferring 10 AFTT from Fuji to Holesky Chain.

#### Example:

```javascript
const evmSigner = evmSignerFromPrivateKeyAndRpc(
  evmPrivateKey,
  "https://rpc.ankr.com/avalanche_fuji"
);
```

Make sure to Replace `evmPrivateKey` with your Private Key.
Note: This is just a Tutorial, so Abstain from using Private Key which you use for Normal Usage.

### 5. Getting Quote

#### Description:

Router Nitro enables you to interact with the Nitro Contract and initiate cross-chain Token Transfers. The First step in this Process is to Request a Quote, which provides you with essential Details about the Proposed Token Transfer.
Request a Quote from Pathfinder for the Desired Asset Transfer, specifying Source and Destination Chain IDs, Token Addresses, and the Amount of Assets to be Transferred. In this case, we are Transferring 10 AFTT Tokens.

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

### 6. Executing Quote

#### Description:

Execute the Obtained Quote, handling Approval and Executing the Transaction to ensure a Successful Asset Transfer.

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

You just Transferred 10 AFTT from Fuji to using Router Protocol's Asset Transfer SDK.
