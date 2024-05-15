---
sidebar_position: 6
---

# Module 6: Understanding Forwarders and How They Work?

Welcome to Module 6 Of Router Nitro CookBook. In this Module, we'll be Understanding what are Forwarders, how do they Work, and how Router Protocol has been Implementing it. Let's Begin...

## What are Forwarders?

![forwarders](https://github.com/router-resources/Router-Nitro-CookBook/assets/124175970/b8e783e5-d5dd-41b7-a1c9-94157fc3b04d)

- Picture a Scenario where you need to Transfer Funds from Bank A to Bank B. In this process, Router Nitro acts as an intermediary, collecting the money from Bank A, and then its Partners, referred to as Forwarders, personally convey the Funds to Bank B. Following the Transfer, Router Nitro undertakes a Crucial Verification Step to ensure that the amount you Originally Deposited in Bank A Matches the amount that arrives at Bank B. If the Verification is Successful, Router Nitro’s Partners retrieve the funds they initially Transferred to your Bank B, Effectively Completing the Transaction.

- Router Nitro has three Flows with which it enables this Swapping -

1. **Forwarder Flow:** It uses a Trustless Optimistic Approach to handle cross-chain Asset Transfers and has an entity called the Forwarder that Provides the users with their Desired Assets on the Destination Chain.
2. **Burn and Mint flow:** For Certain Tokens, the Bridge has Mint/Burn Rights, which allows the Bridge to burn the Tokens on one Chain and Mint them on another.
3. **USDC Circle Flow:** This Flow uses Circle’s CCTP infra to provide cross-chain Transfers of USDC. The Flow works for USDC Transfers on Chains where CCTP is Live.

- Now, we will be Covering the Forwarder flow, and before we do that, here are some Terms and their explanations for you to understand the flow in a better way -

1. **Orchestrators:** It ensures that all the Validators and Relayers are Playing in Sync and that the information being passed between them is Accurate and Legitimate.
2. **Middleware Contract:** It is a Contract which is Deployed on the Router Chain, which enables Custom Business Logic directly in the Bridging Layer.
3. **IBC:** Inter-Blockchain Communication Protocol is an open-source Protocol to handle Authentication and Transport of data between Blockchains within the Cosmos Ecosystem.
4. **Gateway Contracts:** Gateway Contracts serve as the Interface for the Application Contracts on any Chain to interact with Contracts on other Chains.

## How does Router Nitro Implement the Forwarders?

- In the Forwarder flow, first of all, a user invokes the Nitro Contract to Transfer Funds from Chain A (Source) to Chain B (Destination). The Source Chain Nitro Contract will Validate the Request, Deduct Funds from the User’s Account, Increment Event Nonce and emit a FundsDeposited event. Whenever a FundsDeposited event is emitted from a Nitro Contract, Orchestrators listen to this event and Submit the event to the Router Chain along with their Attestation. Parallely, the Forwarders also listen to the FundsDeposited event.

- After 2/3+1 Validation, the Router Chain will invoke the Middleware Nitro Contract with the event info, and after this, the Middleware Contract will Persist with the Request! While the event was being Processed on the Router Chain (Attestation, Validator, Submission on the Middleware Contract), in parallel, the Forwarder also listens to the FundsDeposited event and invokes the Nitro Contract on the Destination Chain.

- Upon Receiving the Transaction, the Nitro Contract on the Destination Chain will
  (a) Transfer the Defined amount from the Forwarder Address to the Receiver Address,
  (b) Create a Hash of the Fields included in the Request and Persist it in the Status Map (to skip the replays), and © emit a FundsPaid event Confirming the Execution. Orchestrators on the Router Chain listen to the FundsPaid event from the Destination Chain Nitro Contract and Submit it to the Router Chain with their Attestation. Upon Receiving the FundsPaid event, the Middleware Contract Verifies that the Message generated from the Request Data is the same as the Message Hash from the Executed event, marks the Request as Completed and Persists the Forwarder Address and Amount.

So, just like that, Router Nitro Bridges your Assets from Chain A to Chain B Efficiently, Securely, and with Minimal Cost using the Reverse Verification Flow!

## Conclusion

In conclusion, Module 6 of Router Nitro CookBook provided an in-depth Understanding of Forwarders and how they function within the Router Protocol Ecosystem. By Leveraging Forwarders, Router Nitro facilitates cross-chain Asset Transfers Efficiently and Securely. The Module outlined three key flows utilized by Router Nitro, namely the Forwarder Flow, Burn and Mint Flow, and the USDC Circle Flow, each Catering to specific Token Transfer Scenarios.

Moreover, the Module introduced essential terms such as Orchestrators, Middleware contracts, IBC, and Gateway Contracts to better Comprehend the intricacies of the Forwarder Flow. It elucidated the step-by-step process involved in Transferring Funds from one Chain to another, highlighting the Crucial Roles played by Orchestrators and Forwarders in ensuring Transaction Validity and Execution.

Through a Detailed Examination of the Forwarder Flow implementation, Module 6 illustrated how Router Nitro Bridges assets Seamlessly Across different Chains while Maintaining Security and Minimizing Costs. By employing a Reverse Verification Flow, Router Nitro Completes Asset Transfers with Accuracy and Reliability, thus Offering users a Robust Solution for Interoperability in the Blockchain Space.

## Quiz

[Play Nitro Quiz and earn Rewards.](https://router-nitro-quiz.vercel.app/page6)

## Share Your Learnings!

![img](https://github.com/router-resources/Router-Nitro-CookBook/assets/124175970/23258532-0dfa-407e-b695-2ed2eb39d1bc)

_Share your learnings on Twitter. Click [here](https://ctt.ac/0ba8b)_
