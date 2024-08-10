---
sidebar_position: 6
---

# Module 6: Architectural Components Part - 2

## Architectural Components - 2

### Relayers

Relayers are Permissionless entities that relay executable Proposals from the Router Chain to a specific Destination Chain. The Router Chain has a set of Relayers Operated by various third parties, which Distributes the responsibility. In the set, each Relayer listens to the Router Chain and relays Data to the Destination Chains as and when required. These relayers also carry out Subsequent actions based on the events that have been Transmitted.

<img width="981" alt="figure 5" src="https://github.com/user-attachments/assets/e1e831fc-d397-413a-938d-3b86a5a90e1f">

#### Functionalities

1. The Relayer will be able to Submit cross-chain requests from the Router Chain to other Chains.

2. The Relayer can Choose to whitelist Bridge Contract Addresses and process Outgoing requests Originating from only those Addresses.

3. The Relayer will be able to make a `updateValset()` call to all the Gateway Contracts Configured in the Multichain Module.

4. The Relayer will securely hold the Private Keys to wallets on different Chains. These Chains can be of Distinct types, such as EVM, Cosmos, and Substrate, among others.

#### Working

- **Step 1:** The Listener interface of the Relayer will listen to the Transaction Pool on the Router Chain for Unprocessed requests and add them to a tx Queue.

- **Step 2:** The Processor interface of the Relayer will fetch all the Unprocessed requests from the tx Queue.

- **Step 3:** The Relayer will Transform the request into a Defined message format where it Queries the Router Chain and fetches -

    1. the current valset
   
    2. Payload from the request
   
    3. Signatures of validators who signed the request

- **Step 4:** The Relayer Validates if the request has received 2/3 + 1 votes. If it has, it will estimate the Gas Price required to Submit the request to the Destination Chain and check if sucient Gas Price is provided by the Bridge Contract to execute the request.

- **Step 5:** Finally, the request is relayed to the Destination Chain Defined in the request.

- **Step 6:** Once the request is Successfully executed on the Destination Chain and an acknowledgment is received for the same, the Relayer receives the fee it incurred in pPsting the tx on the Destination Chain and an additional fee on top of it.

#### Addressing Relayer Collisions

In some cases, Multiple Relayers may pick up the same request. To avoid Collisions while Submitting the Transaction on the Destination Chain, Relayers may choose to implement Collision prevention Strategies at their end. For Example, Relayers can include a Specified time offset within their Logic to ensure they wait for a certain amount of time before Delivering the Transaction to the Destination Chain. If another Relayer Submits the Transaction within this time frame, they can Simply Discard it. Even if Relayers do not implement any Collision Prevention Strategy, no Transaction that has already been executed will ever get replayed thanks to the event nonce-level Validation done by the Router Gateway Contracts on the Destination Chain. The Gateway Contracts always maintain a Mapping of the most recent event nonce that has been executed. Since event nonces are incremental, if any request with an event nonce equal to or less than the Mapped event nonce is received, it is ignored by the Gateway Contract.

#### Addressing Scalability Constraints via the Use of Application-specific Relayers

Scaling issues might arise if we process the requests Sequentially, i.e., in the Order of event nonce. To address this, the Router Chain’s Relay architecture allows for the Parallel execution of requests. Since the Relayer Network is Permissionless, each application can run its custom Relayer to process its requests. This way, an Outgoing request from one application Bridge Contract does not affect an Outgoing request
from another.

<img width="1142" alt="figure 6" src="https://github.com/user-attachments/assets/9715010c-db62-4d49-809b-66f20c107afd">

#### Gas Estimation

All Relayers will need to run a `GasEstimator` module to estimate the Gas Price required to Submit a request to the Destination Chain. If a third-party estimator Service like Owlracle, Eth Gas Station, or others is available, the Relayer will estimate the Gas using that; if not, the Relayer will estimate using an RPC endpoint.

#### Trustlessness

To ensure that the Data forwarded by the Relayer is not tampered with, the Gateway Contract on the Destination Chain decodes the Signed Call Data to verify the Validator Signatures. Upon ensuring the authenticity of the request, the Call Data is executed.

#### Manual Relaying using Router’s Web Relayer

Web Relayer is a User Interface provided by the Router Team using which a tx Payload can be manually Relayed on the Destination Chain -

1. If anyone wants faster execution for their request on the Destination Side, they can manually increase the Gas Price and perform the tx from their Wallets using the Web Relayer.

2. Transactions Stuck on the Router Chain for any reason can be Replayed using the Web Relayer.
