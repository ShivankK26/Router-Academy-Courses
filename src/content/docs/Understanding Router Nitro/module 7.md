---
title: Module 7 - Understanding Forwarders and How Do they Work?
description: Get Started with Router Academy.
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/X5Q0XJ-rxHo" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## What are Forwarders?

Picture a Scenario where you need to Transfer funds from Bank A to Bank B. In this process, Router Nitro acts as an Intermediary, Collecting the Money from Bank A, and then its Partners, referred to as Forwarders, Personally convey the funds to Bank B. Following the Transfer, Router Nitro Undertakes a Crucial Verification step to ensure that the Amount you originally Deposited in Bank A Matches the amount that arrives at Bank B. If the Verification is Successful, Router Nitro’s Partners retrieve the funds they initially Transferred to your Bank B, effectively Completing the Transaction.

Router Nitro has three flows with which it enables this Swapping -

- **Forwarder Flow:** It uses a Trustless Optimistic approach to handle cross-chain Asset Transfers and has an entity called the Forwarder that provides the users with their desired Assets on the Destination Chain.

- **Burn and Mint Flow:** For Certain tokens, the Bridge has Mint/Burn rights, which allows the Bridge to Burn the Tokens on one Chain and Mint them on another.

- **USDC Circle Flow:** This flow uses Circle’s CCTP infra to provide cross-chain Transfers of USDC. The flow works for USDC Transfers on Chains where CCTP is live.

Now, we will be covering the Forwarder flow, and before we do that, here are some terms and their explanations for you to understand the flow in a better way -

- **Orchestrators:** It ensures that all the Validators and relayers are Playing in Sync and that the information being Passed between them is Accurate and Legitimate.

- **Middleware Contract:** It is a Contract which is Deployed on the Router chain, which enables Custom business logic directly in the Bridging layer.

- **IBC:** Inter-Blockchain Communication Protocol is an Open Source Protocol to handle authentication and Transport of Data between Blockchains (within the Cosmos Ecosystem).

- **Gateway Contracts:** Gateway contracts serve as the Interface for the Application Contracts on any Chain to interact with Contracts on other Chains.

## How Does Router Nitro implement Forwarders?

In the Forwarder Flow, first of all, a user invokes the Nitro Contract to Transfer Funds from Chain A (Source) to Chain B (Destination). The Source Chain Nitro Contract will validate the request, deduct funds from the user’s account, Increment event nonce and emit a FundsDeposited event. Whenever a FundsDeposited event is emitted from a Nitro contract, Orchestrators listen to this event and Submit the event to the Router chain along with their attestation. Parallely, the Forwarders also listen to the FundsDeposited event.

After 2/3+1 Validation, the Router chain will invoke the Middleware Nitro Contract with the event info, and after this, the Middleware Contract will Persist with the Request! While the Event was being processed on the Router chain (Attestation, Validator, submission on the Middleware Contract), in parallel, the Forwarder also listens to the FundsDeposited Event and invokes the Nitro Contract on the Destination Chain.

Upon receiving the transaction, the Nitro contract on the destination chain will -

- Transfer the Defined Amount from the forwarder address to the Receiver Address.

- Create a hash of the fields included in the Request and Persist it in the Status Map (to skip the replays), and emit a FundsPaid event Confirming the execution. Orchestrators on the Router chain listen to the FundsPaid event from the Destination Chain Nitro Contract and Submit it to the Router chain with their attestation. Upon receiving the FundsPaid event, the Middleware Contract verifies that the message Generated from the Request Data is the same as the message hash from the Executed Event, marks the request as Completed and persists the Forwarder address and amount.

So, just like that, Router Nitro bridges your assets from Chain A to Chain B Efficiently, Securely, and with minimal Cost using the Reverse Verification Flow!
