---
sidebar_position: 6
---

# Module 6: Components Of CCIF 02

<iframe width="560" height="315" src="https://www.youtube.com/embed/5IbVbrBvX9c" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Components Of CCIF 02

Intent Adapters are Smart Contracts Pivotal in Abstracting Complex Actions of Decentralized Applications (dApps) and enabling Streamlined Interactions, whether within a Single dApp or across Multiple dApps. They Serve as Building Blocks in Constructing Intuitive and Efficient Workflows. Decomposing executable Workflows into sub-tasks and Utilizing Adapters for these sub-tasks allows Developers to focus on Creating Specialized Adapters for their dApp’s Functionalities while Leveraging Generalized Adapters for Common Tasks. This approach -

(a) Reduces redundancy in Development Efforts, Fosters Reusability, and Accelerates the Deployment
of new Services and Features.

(b) Streamlines the Integration Process, making it easier for Developers to Contribute to the Blockchain Ecosystem.

## Intent Adapter Components

To Ensure Secure and Orderly Operations, each Adapter Consists of the following Components -

- **Head Registry:** This Registry Governs the initiation of the Adapter, exclusively Listing Authorized Preceding Adapters. Only the Adapters Documented in this Registry can invoke the Current Adapter, thereby Guaranteeing Regulated and Secure Execution Sequences.

- **Tail Registry:** This Registry Dictates the Potential Succeeding Actions by Listing Adapters that may be invoked following the Current one. Just like the Head Registry, this Registry ensures a Secure Progression of the Execution Flow.

- **Inbound Asset Registry:** This Registry keeps Track of all the Acceptable incoming Assets, ensuring that the Adapter only Processes Predefined Asset Types.

- **Outbound Asset Registry:** It manages the Types of Assets that the Adapter is allowed to Output, thus Controlling the Flow’s Output and Maintaining Consistency.

- **Fee Handler Module:** A Dedicated Module that manages the Fees associated with the Utilization of the Adapter. This Module ensures a Transparent and Equitable Remuneration Structure for the Rendered Service.

## Classification of Intent Adapters

1. **Stateless Adapters:** Stateless Adapters are Designed to Execute Blockchain Actions that do not need
   Knowledge of any User-Specific State (e.g., past stake). A Stateless Adapter can efficiently Execute any Operation that does not require a Persistent Store within the Contract.

2. **Stateful Adapters:** Unlike Stateless Adapters, Stateful Adapters are Designed to maintain and manage User States. They can handle Complex Interactions that require Persistence of Storage across Different Operations. These Adapters can be utilized when the underlying dApp returns no Proof of Interaction, like a Position NFT or an LP Token.
