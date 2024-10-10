---
title: Module 3 - What is Router Chain?
description: Get Started with Router Academy.
---

### About Router Chain

The Router Chain is a Layer 1 Blockchain that leverages **Tendermint’s Byzantine Fault Tolerant (BFT)** Consensus Engine. As a Proof of Stake (PoS) Blockchain, the Router Chain is primarily run by a Network of Validators with economic Incentives to act honestly. The Router Chain is built using the Cosmos SDK and encapsulates all the features of Cosmos, including fast Block Times, Robust Security Mechanisms, and, most importantly, CosmWasm - a Security-first Smart Contract Platform. In addition to CosmWasm, the Router Chain also Ships with Ethermint [10] - a Cosmos Library with support for EVM Smart Contracts. By Leveraging the CosmWasm and Ethermint Toolkit, Developers can start Building Secure Blockchain applications on the Router Chain from Scratch or port their existing applications to the Router Chain with minimal Overhead.

In addition to its functionalities as a Blockchain Network, the Router Chain provides an innovative Solution to the problem of Blockchain Interoperability. Apart from Validating State changes on the Router Chain, Validators running on the Router Chain also monitor State changes on other Chains. Applications on the Router Chain can write Custom Logic to Trigger events in response to these external State changes. Additionally, applications on the Router Chain can Leverage a Trustless Network of Relayers to update States on external Chains directly from the Router Chain. Simply put, the Router architecture allows Contracts on one Chain to interact with Contracts on other chains in a Secure and Decentralized manner. More details regarding the Router Chain and how it enables cross-chain Communication are given in the
following sections - 

### Characterstics of Router Chain

The Below Content describes the Key Characteristics and features of Router V2, a Blockchain Interoperability Solution that uses a Decentralized trust-based approach -

   #### 1. Decentralized Trust-based Approach

   - ***Reasoning***: Router V2 Opts for a Decentralized trust-based Model over a Trustless one due to the Latter's limitations in Supporting application-specific Bridging Logic.

   - ***Mechanism***: CrossChain requests pass through Router Chain's Tendermint-based PoS Consensus. Validators are Penalized for Malicious Behavior or excessive Downtime, Minimizing the need for users to trust the System.

   - ***Additional Security***: Router V2 Supports **Additional Security Modules (ASMs)** that allow Developers to add Custom Security Measures like Optimistic Verification and m-out-of-n Multisig.

   #### 2. Support for Middleware Contracts

   - ***Flexibility***: Router V2 allows applications to Implement Custom Business Logic within the Bridging Layer, eliminating the need for Redundant Code and enabling features like Batching, Sequenced Transactions, and Atomicity.

   - ***Advantages***: This Setup Rreduces Code redundancy and allows for more efficient and Customizable cross-chain Interactions.

   #### 3. Router Chain as a Data Aggregation Layer

   - ***Functionality***: The Router Chain can serve as a Data Aggregation and Synchronization Layer for various cross-chain applications. This includes enabling cross-chain Governance where Proposals and votes can be Synchronized across Different Blockchains via the Router Chain.

   #### 4. Multilayer Security

   - ***Customizable Security***: Applications can Implement their own Security Layers on top of the Router Chain’s infrastructure-level Security. For instance, MPC-based or Multisig Verification can be enforced before a cross-chain request is processed by the Relayer.

   #### 5. Flexibility

   - ***Bridging and Security Model***: Router V2 Offers Developers flexibility over their Bridging (stateless or stateful) and Security Models, as well as the choice of Smart Contract Platforms (EVM or CosmWasm).

   - ***Support for Multiple Languages***: Developers can use Rust, Solidity, or Vyper to build Middleware Contracts, accommodating Different Language Preferences and experience Levels.

   - ***Modular Security***: The Security Model can be Configured based on various Parameters like Source Chain, Transfer Value, and Latency Sensitivity. Applications can add custom Safeguards to enhance Security.

   #### 6. Composability

   - ***Integration***: Router V2 is Designed with High Composability in mind, allowing Developers to freely Integrate various out-of-the-box Components and functionalities into their applications.

   #### 7. Global Liquidity

   - ***Asset Swapping Engine***: Router V2 includes an Inbuilt asset-swapping engine for Securely and efficiently Transferring funds across Chains. Applications can Utilize this engine to move funds and execute Transactions, such as minting NFTs, on Destination Chains.

   #### 8. Oracles

   - ***Data Feeds***: Router V2 provides Decentralized Oracle Support for various needs, such as Price feeds, Gas Price estimation, and other application-specific Data. It uses reliable Oracle providers like the Band Protocol to fetch and maintain these feeds.

   #### 9. Inter-Blockchain Communication Protocol (IBC)

   - ***Cosmos SDK Integration***: Since Router V2 is built using the Cosmos SDK, it supports IBC, allowing Seamless Interaction between applications built on any Cosmos-based Chain. This includes Token Transfers and instruction Transfers between Chains like Injective and Osmosis.

Overall, Router V2 provides a Robust and flexible Framework for Building cross-chain applications, balancing Security, Efficiency, and Customization.

### Features of Router Chain

A Blockchain focused primarily on enabling State Transitions across Chains, the Router Chain will sit as a Hub between various EVM and non-EVM Ecosystems. Features that set Router Chain apart from other Interoperability Solutions include, but are not limited to -

1. ***Support for Middleware Contracts:*** Maintain States and implement Custom Business Logic directly in the Bridging Layer.
   
2. ***Plug-and-play for Developers:*** Router has a Transcendent open-source Developer Tooling Suite to assist with the Continuous Integration and Development of cross-chain dApps.

3. ***CrossTalk:*** Developers looking to build cross-chain applications without any Custom Bridging Logic can leverage Router’s easy-to-integrate Smart Contract Library, CrossTalk.

4. ***Support for various Kinds of Use Cases:*** Batching, Sequencing, and Atomicity can be enforced directly from the Router Chain.

5. ***Flexibility:*** Router provides Developers with the utmost Flexibility over their Bridging Model (stateless or stateful), Security Model, and Smart Contract Platform (EVM or CosmWasm).
   
6. ***Data aggregation:*** Contracts on the Router Chain can Serve as Data Aggregation Modules for various cross-chain and multi-chain applications.
   
7. ***Cross-chain Meta Transactions:*** By leveraging Router as their cross-chain Infra Provider, applications can enable Gasless cross-chain Transactions by Delegating the execution of a request to a third-party Service.

8. ***Composability:*** The Router Chain will have inbuilt Support for Global applications such as Oracles and Liquidity Pools/Bridges, to name a few, which will help in easier Integration of other applications.