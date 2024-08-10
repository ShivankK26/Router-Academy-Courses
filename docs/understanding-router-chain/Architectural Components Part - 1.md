---
sidebar_position: 5
---

# Module 5: Architectural Components Part - 1

## Architectural Components - 1

### Application Contracts

These are Contracts Deployed by applications on third-party Chains and Serve as the Intermediary between end Users of the application and the Router cross-chain Infra. In the Lifecycle of a cross-chain Transaction, these Contracts are responsible for making the `iSend()` function Call to the Gateway Contracts on the Source Chain by passing the address of the Bridge Contract on the Router Chain as well as the relevant Payload. On the Destination Chain, application Contracts will execute the Instructions forwarded by the Gateway Contract.

### Gateway Contracts

As their name implies, Gateway Contracts serve as the Interface for application Contracts to interact
with Router’s Bridging Infrastructure. Gateway Contract functions include -

- `iSend()` - The application Contract on the Source Chain can Call its corresponding Bridge Contract
on the Router Chain by invoking `iSend()` on the Gateway Contract with the relevant Parameters.
Upon receiving this function Call, the Gateway Contract emits an event that is Listened to by the
Router Chain Orchestrators.

- `iReceive()` - The Bridge Contract on the Router Chain can call its application Contract on the
Destination Chain by submitting an Outbound request with the relevant Parameters. Relayers will
eventually Submit the outbound request to the Destination Chain by invoking the `iReceive()`
function on the Gateway Contract, which will Subsequently pass the Payload to the Destination
Contract.

- `setDappMetadata()` - To facilitate cross-chain Transactions, a feePayerAddress needs to be
set for Paying the fees on the Router Chain. This can be achieved using the `setDappMetadata()`
function available in the Gateway Contracts.

**Note -** Once the feePayerAddress is set, the Designated fee payer must approve the request
to act as the fee payer on the Router Chain. Without this approval, dApps will not be able to
Execute any cross-chain Transactions.

### Orchestrators

Router Orchestrators are entities that Listen to incoming cross-chain requests from other Chains, attest their Validity, Parse them into a Unified format and post them on the Router Chain. These attested requests can then be picked up by the Relayers and forwarded to the Destination Chain. All Validators must run an Orchestrator instance to be a part of the Router Chain Ecosystem.

<img width="1067" alt="figure 4" src="https://github.com/user-attachments/assets/6d57f279-696d-4b2d-9c6c-fbf32aae8899" />

#### Working

At a High level, a Router Orchestrator works like a funnel that gathers events from various Chains and posts them to the Router Chain. To do so, an Orchestrator uses a Listener and Dispatcher model wherein the Listener module aggregates events while the Dispatcher module forwards these events to the Router Chain.

- ***Listener:*** The Listener module of an Orchestrator listens to events emitted from Specific Chains based on the ChainType Parameter in the Configuration provided to it. Listeners Operate as threads (goroutines) under an Orchestrator. All Listeners Subscribe to multiple Types of events - 

    1. a regular `iSend()` (cross-chain send) event, 

    2. an `iRecieve()` (cross-chain receive) event, and

    3. an `iAck()` (acknowledgment) event. Once the Listener module receives an event, it waits forthe Preconfigured amount of Network Confirmations (for example, three network confirmations for requests originating from Mumbai/Fuji) before Parsing it into a Message. Once the message is prepared, the Listener adds it to a Queue.

- ***Queue:*** The Queue is used to Store and Deliver transformed messages to Consumers (dispatchers)
in a first-in-first-out manner while ensuring that Duplicate messages are automatically Discarded.

- ***Dispatcher:*** The Dispatcher Module is essentially responsible for Streamlining the Incoming requests by - 

    1. Listening to the queue, 

    2. Signing the messages, and 

    3. Broadcasting them to the Router Chain.

Besides Verifying the incoming requests to the Router Chain, Orchestrators also verify the Outgoing requests from the Router Chain.

### Validator Set (Valset)

Each Validator Set Consists of a nonce, a list of Validators, and the height on the Router Chain at which the Valset is created. The Validator Set on the Router Chain should be Consistent across all the Gateway Contracts.

**Updating the Valset**

Here is how the Valset is updated on all the third-party Chains - 

- **Step 1:** At the end of each Block, the Router Chain checks if the Valset Power has changed by more than 5%. If it has, the Router Chain Creates a new Valset request.

- **Step 2:** Orchestrators will query the Chain for the latest Valset request and Confirm the new Valset request by Sending a `MsgValsetConfirm` tx.

- **Step 3:** Once the 2/3 + 1 majority has approved the new Valset request, the Relayer will pick the Valset request and Send the `updateValset()` Contract Call on all the Gateway Contracts of all the Configured Chains in the Multichain Module.

- **Step 4:** The Gateway Contracts will verify the Signatures, replace the Old Valset with the new Nalset and emit a `ValsetUpdate` event.

- **Step 5:** The Orchestrators will listen to the `ValsetUpdate` event and Submit a tx to the Router Chain, Confirming that the Valset has been updated on all the Chains.

- **Step 6:** On receiving the Confirmation from the 2/3 + 1 majority, the Router Chain will update the Valset nonce in the Multichain Module.

### MultiChain Module

The Multichain Module persists the Configuration of all the external Chains Supported by the Router Chain and provides APIs to Query the ChainConfig, which consists of the following -

- ***chainID:*** Network ID of the Supported Blockchain. For Example - 1 for Ethereum Mainnet, 137 for Polygon, etc.

- ***chainName:*** Name of the Chain. For Example - Polygon, Ethereum, etc.

- ***symbol:*** Native Gas Token Symbol for the Supported Chain. For Example - ETH for Ethereum, MATIC for Polygon, etc.

- ***nativeDecimals:*** Number of Decimal Places in Supported by the Chain’s Native Token.

- ***chainType:*** EVM, Cosmos, Solana, Polkadot, etc.

- ***confirmationsRequired:*** To Make sure that the tx is finalized, the Orchestrator has to wait for a Specified number of Network Confirmations on each Blockchain, which is Determined by this Parameter.

- ***gatewayContractAddress:*** Router Gateway Contract Address.

- ***gatewayContractHeight:*** Router Gateway Contract Deployment Height.

- ***routerContractAddress:*** ROUTE ERC20 Contract Address on the Chain.

- ***lastObservedEventNonce:*** Nonce of the Latest event that was observed on the Chain, initially, it will be set to zero.

- ***lastObservedValsetNonce:*** Nonce of the latest `ValsetUpdate` event, initially, it will be Set to zero.

#### Adding a New Chain

To add a new Chain in Router’s Interoperability mesh, the following Steps need to be followed -

- **Step 1:** Deploy a Router Gateway Contract on the new Chain with the Current Validator set.

- **Step 2:** Create a Chain Integration Governance Proposal and send it to the Multichain Module.

- **Step 3:** If not already Present, Deploy a ROUTE Token Contract on the new Chain.

- **Step 4:** Once the Governance Proposal is passed, the requested Chain Config is added to the Multichain Module.

### Application-specific Bridge Contracts

The application-specific Bridge Contracts are Middleware Contracts Deployed on the Router Chain that include the Logic required to Process the incoming request from a third-party Chain and Generate an Outoging request to another third-party Blockchain. These Contracts can be written in either Rust (compiled using CosmWasm) or Solidity (compiled using the EVM Compiler provided by Ethermint). To ensure that a faux Contract doesn’t execute any of the functions in these Contracts, a Bridge Contract should always maintain a Mapping of the ChainId and Addresses of all the application Contracts (deployed on the third-party chains) that can execute its functions. Along with the Payload, the Gateway Contract will always pass the `msg.sender` Parameter, which can be cross-referenced by the Bridge Contract to Determine whether the Source Chain application Contract is genuine or not.

### Token and Gas Price Oracles

For a Bridge Contract to Create and Submit a cross-chain request from the Router Chain to any external Destination Chain, it should be aware of the current Gas Price on the Destination Chain. Additionally, a Bridge Contract may require the Price of any external Chain’s Native Gas Token for internal Calculations. To Address this, we need Oracles on the Router Chain, which provides the Token and Gas Prices of various
Chains.

#### Gas Price Oracle

The Steps involved in Querying Gas Prices and providing a Generalized Gas Price Oracle to the Contracts on the Router Chain are as follows -

- **Step 1:** A Simple Microservice will be used to Query the Gas Price on different Chains and Submit the same in the form of a Transaction on the Router Chain.

- **Step 2:** The Router Chain, upon receiving the Gas Prices from multiple Providers, will take a Median and update the Oracle Module State with the Gas Price.

- **Step 3:** At any given time, application-specific Bridge Contracts can Query the Oracle Module for the latest Gas Prices of external Chains and Pass the `gasLimit` Parameter for the Outbound request accordingly.

#### Token Price Oracle

Token Prices of all the Native Tokens of all the Chains in the Multichain Module will be fetched from the Band Protocol via Cosmos’ IBC. The System has been Designed in a way that different types of Providers can be Supported in the Long term. The Steps involved in Querying Price feeds and providing a generalized Token Price Oracle to the applications on the Router Chain are as follows -

- **Step 1:** At regular intervals, the Router Chain will generate a Band IBC Oracle request to the Oracle Module on the Router Chain. The Length of these intervals is decided using Governance and added to the Chain Configuration.

- **Step 2:** Upon receiving the request, the Module will Query the Band Protocol for the Latest Price feed of all the assets Specified in the Multichain Module.

- **Step 3:** Upon receiving the Band IBC Price feed, the Oracle Module will Update the Latest Price of the assets in its Contract State.

- **Step 4:** At any given time, any application can Query the Oracle Module for the Latest Price feed of any Chain’s Native asset. Upon receiving the request, the Oracle Module will return the most recent Price of the Specified asset from its Contract State.

**Note -** In addition to the Bridge Contracts, the Token Price Oracle is also used by the Router Chain to estimate the Outbound Transaction fee in ROUTE Tokens.
