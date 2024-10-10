---
title: Module 4 - Workflow
description: Get Started with Router Academy.
---

## Understanding cross-chain Requests & Acknowledgment

Now that we Understand the Primary Characteristics of the Router Chain as an Interoperability Solution, let’s examine the Overall Lifecycle of passing a cross-chain request via the Router Chain and receiving an acknowledgment back on the Source Chain.

### Generating and Sending a cross-chain Request

The Below steps Outlines the process of Generating and Sending a cross-chain request using Router Protocol - 

1. **Initiating cross-chain Action**: A User triggers a cross-chain action on a Source Chain's application Smart Contract, which then Calls the `iSend()` function on the Router Gateway Contract.
  
2. **Event Emission**: The Gateway Contract emits an Event on the Source Chain, which is picked up by Orchestrators on the Router Chain.

3. **Fee Deduction**: After Validating the event, the Router Chain Deducts a fee from the `feePayerAddress` associated with the dApp on the Router Chain.

4. **Request Sent to Bridge Contract**: The request is sent to the application's Bridge Contract on the Router Chain, where the Source Contract address is Validated and Custom Logic is applied.

5. **Request Execution**:
   - If the Router Chain is the Destination Chain, the Bridge Contract executes the relevant functions and Terminates the request.
   - If an External Chain is the Destination Chain, the Bridge Contract generates an Outgoing request and pays the fees for the Transfer.
   - Any excess fees are refunded to the `feePayerAddress`.
  
  <img width="1318" alt="1" src="https://github.com/user-attachments/assets/61fc7bea-2722-4758-bb34-31c04940993f" />

6. **Outgoing Request Validation**: After the Transaction is mined on the Router Chain, the Outgoing request is Validated by the Orchestrators.

7. **Event Forwarding**: A Relayer forwards the Validated request to the Router Gateway Contract on the Destination Chain.

8. **Receiving and Acting on Data**: The Gateway Contract on the Destination Chain Calls the `iReceive()` function on the Destination Chain's application Contract, which then acts on the Transferred Data.

**Note**: If there is no need for application-specific Bridging Logic, the application can use Router's CrossTalk Framework to Integrate cross-chain functionalities with minimal Changes to its Codebase.

### Generating and Sending an Acknowledgment

The Below steps Outlines the process of Generating and Sending an acknowledgment in a cross-chain request using Router Protocol - 

1. **Emit Acknowledgment Event**: After the `iReceive()` function Completes on the Destination Chain, the Gateway Contract on that Chain emits an acknowledgment Event. This event is Detected by Orchestrators on the Router Chain.

2. **Process Acknowledgment on Router Chain**:
   - Transfer `(RelayerIncentive + FeeConsumed)` to the relayer address.
   - Refund `(OutgoingTxFee - FeeConsumed)` to the Bridge Contract on the Router Chain.

3. **Send Acknowledgment to Bridge Contract**: The Processed acknowledgment is Sent to the application's Bridge Contract on the Router Chain.

4. **Forward or Discard Acknowledgment**:
   - If the dApp has requested the acknowledgment to be Sent back to the Source Chain, relayers forward it to the Source Chain’s Gateway Contract.
   - If not, the acknowledgment is Discarded.

<img width="1323" alt="2" src="https://github.com/user-attachments/assets/046f3c50-eddf-490c-8654-ea7d8f50eb58" />

5. **Final Acknowledgment Delivery**: The Gateway Contract on the Source Chain sends the acknowledgment to the application's Contract on the Source Chain.
