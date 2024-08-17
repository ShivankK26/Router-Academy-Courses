---
sidebar_position: 7
---

# Module 7: What is CrossTalk Library?

## About CrossTalk Library

### What is CrossTalk Library?

Router’s CrossTalk Library is an extensible cross-chain Framework that enables Seamless State Transitions across Multiple Chains. In simple terms, this Library leverages Router’s Infrastructure to allow Contracts on one Chain to pass Instructions to Contracts Deployed on another Chain without needing to Deploy any Contracts on the Router Chain. The Library is Structured in a way that it can be Integrated Seamlessly into your Development environment to allow for cross-chain Message passing without Disturbing other parts of your Product.

### Why is CrossTalk Required?

Based on our Initial market Research, we have Discovered that a fair number of cross-chain applications do not require a Customized Bridging Logic for their functioning. Instead, they merely need an Infra Layer that allows them to pass Instructions between different Blockchain Networks. And while the Router Chain Middleware Flow enables the applications to Route instructions/messages from one Chain to another, to do so, they need to Deploy a Dedicated Contract with the Routing Logic on the Router Chain. Even though we provide a Template for a Standard Bridging Contract, we do not want the Developers, especially the ones new to the Cosmos Ecosystem, to go through the Task of Deploying and managing a Middleware Contract. With CrossTalk, applications can Transform their existing single-chain and multi-chain applications into cross-chain applications by including nothing but a Few Lines of Code in their existing Contracts. Therefore, for cross-chain dApps that do not require Custom Bridging logic or any Data Aggregation Layer in the middle, Router’s CrossTalk Framework is the best Option.

### CrossTalk Workflow

The CrossTalk Workflow is very similar to the Middleware Flow, except that the Request from the Source Chain does not go to a Contract on the Router Chain. As soon as the Request is Validated on the Router Chain, it gets picked by the Relayer and gets forwarded to the Destination Chain.

<img width="1342" alt="Screenshot 2024-08-16 at 11 58 08 PM" src="https://github.com/user-attachments/assets/404b1809-c064-46a2-b379-2a35f1b20bfa" />

### Different Types of CrossTalk Requests

Now that we have an Understanding of the CrossTalk Workflow, let us take a look at the Different types of Requests that can be sent using CrossTalk. We will be Categorizing the Requests based on two Different Properties -

1. ***Number of Contract Calls*** 
   
    Depending on the Number of Contract Calls present in a cross-chain Request, a CrossTalk Request can be Categorized into two types - 

   - **Single-call Request:** A Request that includes only One Contract Call for Execution on the Destination Chain.

   - **Multi-call Request:** A Request that includes Multiple Contract Calls for Execution on the Destination Chain.

    Consider an application that allows users to Transfer their ERC20 Tokens from One Chain to another. If only one ERC20 Token is being transferred, then the Request will fall under the former Category. However, if Multiple Tokens are transferred in a Single Request, it will be Categorized as a multi-call Request.

1. ***Acknowledgment Requirement***
   
    Depending on the need for an application to Receive an acknowledgment for its Request on the Source Chain, a CrossTalk Request can be Split into two Types -

   - **Requests Without Acknowledgment:** An acknowledgment is not required on the Source Chain after the Request is executed on the Destination Chain.

   - **Request With Acknowledgment:** If an acknowledgment is required on the Source Chain, Developers need to Specify whether they want an acknowledgment only in the case of a Successful Call, a failed call, or in both Cases.

    If an acknowledgment is anticipated on the Source Chain, an acknowledgment Handler function with the Relevant Logic to handle the acknowledgment on the Source Chain has to be Implemented by the application in their Contract. If an acknowledgment is not anticipated, the acknowledgment Handler function can be left empty, as it will never get Invoked.
