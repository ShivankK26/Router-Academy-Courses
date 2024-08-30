---
title: Module 7 - Components Of CCIF 04
description: Get Started with Router Academy.
---

# Module 7: Components Of CCIF 03

<iframe width="560" height="315" src="https://www.youtube.com/embed/DnGgfG69VTA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Components Of CCIF 03

The Adapter Registry Module (ARM) is a Web 2.0 Module that serves as a Repository for all the Intent Adapters, which Developers can use to Track and Update their Adapter’s Functionalities and Constraints. It Standardizes the way Adapters are Specified, Utilized, and Managed within the Framework. This Standardization is essential for Seamless Interaction between Different Components of the Framework and the Reliable Execution of User Intents at any given Time.

## Adapter Specifications

Each Adapter within the ARM is Uniquely Defined by the following Specifications -

- **adapter id:** A Unique Identifier Generated as a Hash of the chain_id and adapter_address. This Serves as the Primary Identifier for the Adapter within the Network.

- **adapter description:** This Field Describes the Function of the Adapter and outlines how it Interacts within the Intent Framework. It Provides Vital Information about the Adapter’s Operational Mechanics, its interaction with Blockchain Elements, and its Input and Output Processes.

- **adapter function selectors:** An Array offunction identifiers, each a Hash of the adapter_id and the Specific function Selector.

- **adapter function descriptors:** A Mapping between the Adapter function Selectors and their Descriptions, providing Detailed insight into the Behavior and Purpose of each Function.

- **whitelisted head set:** A Set of adapter_ids that are allowed to Precede an Adapter, maintaining the Integrity and Order of the Execution Flow.

- **whitelisted tail set:** A Set of adapter_ids that are allowed to Succeed an Adapter in an Intent Execution Sequence, ensuring Controlled and Secure flow of Execution.

- **chain id:** The Identifier of the Blockchain Network where the Adapter is Deployed, essential for cross-chain functionality and recognition.

- **inbound asset set:** A list of Assets that an Adapter is Capable of receiving. This List Specifies the Adapter’s Scope of input Handling Capabilities.

- **outbound asset set:** A List of Assets that an Adapter can Output or Transfer. This List outlines the Adapter’s Capacity in terms of Deliverable Assets.

- **adapter type:** Specifies whether the Adapter is Stateless or Stateful, indicating its Capability to Maintain State or execute Discrete actions without Retaining user-specific States.

- **tags:** A List of Descriptive Tags for the Adapter, such as ‘staking’, ‘lido’, ‘dex’, ‘swap’, among others. This List aids in Classification and Easier Identification within the Framework.

## Adapter Sync Module

The Adapter Sync Module plays a Crucial Role in maintaining the Integrity and Consistency of the Adapter Registry Module (ARM). Its Primary functions include -

- **Verification Check:** Confirming the Verification Status of each Adapter on its respective Blockchain, thereby ensuring its Authenticity.

- **ABI Synchronization:** Extracting and Storing the Adapter’s ABI (Application Binary Interface) from the Blockchain, providing a Reliable Interface for Interaction.

- **Function Selector Validation:** Crossreferencing the Adapter’s Declared Function Selectors with those available in the ABI, ensuring that the Adapter’s Functionality Aligns with its on-chain Implementation.

- **Default Function Handler Generation:** Creating Baseline function handlers for each declared function Selector to Streamline the Integration process.

This Module ensures that each Adapter in the ARM not only meets the required Specifications but also remains in Sync with its on-chain Version, upholding the Framework’s Robust Standards for Security and Reliability.
