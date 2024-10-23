---
title: Module 2 - Why Existing Solutions are the Not Best Ones?
description: Get Started with Router Academy.
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/u-huO_s8cwo" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Different Deployed cross-chain Technologies

The Problem of Blockchain Interoperability has become impossible to ignore as more Siloed Ecosystems emerge across the DeFi Space. To solve this issue, multiple Bridging Technologies have come to the fore in recent times. Based on the level of Trust required, these Solutions can be
classified into Three Broad Categories -

- ***Trustless:*** These Systems do not require their Users to Place any Trust in third-party actors.
  
- ***Centralized Trust-based:*** The System’s Control rests with a few external actors, and users must assume that they are not Malicious.
  
- ***Decentralized Trust-based:*** The System is Governed by an Extensive Network of third-party actors; users have to Trust that the Majority of them are not Malicious.

In this Module, we'll examine some of the widely Deployed cross-chain Technologies and their advantages & shortcomings -

### 1. Hash Time Locked Contracts (HTLCs)

- ***Description***: HTLCs enable atomic cross-chain Operations using Hash Locks and Timelocks.
  
- ***Example Workflow***: 
  - Alice locks funds in a Smart Contract on Chain A using a Hash Lock and Timelock.
  - Bob acknowledges this and locks funds on Chain B using the same Hash Lock but a different Timelock.
  - Alice unlocks Bob’s funds on Chain B, revealing the Secret Code, which Bob then uses to Unlock Alice’s funds on Chain A.

- ***Advantages***: No Trust assumptions are introduced.

- ***Drawbacks***:
  - Both Parties must be Online to monitor the Blockchain.
  - Inefficiency due to the need for multiple Transactions.
  - Scalability Issues due to High Fees and waiting Periods.

### 2. Proof of Authority (PoA) Bridges

- ***Description***: PoA Bridges use a Small set of Validators to listen to and relay events between Chains.

- ***Advantages***:
  - Low latency due to fewer Validators.
  - Easy to add support for new Chains.

- ***Drawbacks***:
  - Trust-based system reliant on Validators.
  - Potential for Collusion among Validators.

### 3. Light Client Node Approach

- ***Description***: Light clients are Smart Contracts that maintain a record of Block headers and verify events on the Destination Chain.

- ***Advantages***:
  - No need for a new Validation Layer.
  - Trustless as events are independently Verified.

- ***Drawbacks***:
  - High Operating costs, especially on Ethereum.
  - Resource-intensive to add new Chains.

### 4. Ultra Light Client Node with Oracle-based Bridge Adaptors

- ***Description***: Similar to Light clients but with reduced Costs by using external actors (like oracles) for Verification.

- ***Advantages***: Cost-effective compared to Light clients.

- ***Drawbacks***:
  - Introduces Trust assumptions (oracle and relayer).
  - Challenging to add new Chains.

### 5. Relays/Sidechains

- ***Description***: Relays act as Smart Contracts or Scripts on one Chain with Verification Capabilities over another Chain, while Sidechains are independent Networks connected to a Parent Chain via a two-way Bridge.

- ***Advantages***:
  - Can read and verify Information from the main Chain.
  - Examples include Cosmos and Polkadot.

- ***Drawbacks***:
  - Inconsistent Consensus rates can affect Transaction Validity.
  - Typically limited to Communication with Parent or connected Chains only.

### 6. Optimistic Bridges

- ***Description***: These Bridges use Optimistic Verification, where a Transaction is assumed Valid unless proven fraudulent within a Challenge Period.

- ***Advantages***:
  - Trustless, requiring only one honest node to Monitor for fraud.

- ***Drawbacks***:
  - High latency due to the need to wait for the Challenge Period to end before finalizing Transactions.

### 7. Chain-based Approaches

- ***Description***: These Solutions Deploy a dedicated PoS Blockchain as a Hub connecting various Blockchains.

- ***Advantages***:
  - Balances Decentralization, Security, and throughput.

- ***Drawbacks***:
  - Lack of Support for Stateful Middleware, limiting application-level Security and Logic.
  - Redundancy in Business logic across Chains.

