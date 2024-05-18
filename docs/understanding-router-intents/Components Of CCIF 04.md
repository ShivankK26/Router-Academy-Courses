---
sidebar_position: 8
---

# Module 8: Components Of CCIF 04

![Screenshot 2024-05-18 at 11 55 59 AM](https://github.com/ShivankK26/Router-Academy-Courses/assets/115289871/145276a2-57d8-4420-b1f9-803dc963f663)

Welcome to Module 8 Of Cross Chain Intent Framework CookBook. In this Module, we'll be Understanding what are the Different Components (Intent Solver) Of Cross Chain Intent Framework - 04. Let's Begin...

## Introduction

Intent Solver is a Crucial Part of Router’s cross-chain Intent Framework Module. Its Primary Function is to find and Scrutinize Potential Execution Paths for the Executable. After identifying Potential Execution Paths along with the requisite Inputs for the Head Adapter in each Path, the Intent Solver employs Advanced multi-criteria Decision Making Algorithms to Discern the most Optimal Path.

Its Responsibilities also encompass the Generation and Optimization of Call Data for each Adapter in the Selected Path to ensure a Seamless Transaction Process. Upon Determination of the Optimal Path and Preparation of the Call Data, the Intent Solver Communicates the Entry Point Contract Address, along with the Call Data, back to the User.

## Intent Solver Components

The Intent Solver’s Effectiveness is anchored by its Key Components: Pathfinder, Simulator, and Calldata Composer. Pathfinder is responsible for Determining the Most Optimal Path Based on Different Criteria. The Simulator Performs real-time Transaction Simulation to ensure the Feasibility of the Paths prepared by the Pathfinder. The Calldata Composer assembles the Necessary Transaction Data for the Selected Path. In Synergy, these Components Collectively Propel the Intent Solver towards efficient Execution of User Intents on the Blockchain.

1. **Pathfinder:** The Pathfinder is an algorithm that identifies Potential Adapters from the Adapter
   Registry Module to execute the User’s Intent and Proposes Executable Paths. Leveraging Advanced Multicriteria Decision making Techniques, it also evaluates these Paths, giving Precedence to factors such as Cost Effectiveness, Time Efficiency, and the Maximization of Potential Yields. This Evaluation ensures that the Chosen Path Balances Cost Savings and low-latency Execution.

2. **Simulator:** As the name suggests, the Simulator is responsible for Simulating Transactions Pertaining to each Adapter in the Proposed path. This Component’s Primary Responsibility is to Guarantee the Proper Operation of every Adapter in the Proposed Sequence. In Instances where an Adapter fails to Yield a Successful Simulation, the Simulator Dismisses that Particular Path.

3. **Calldata Composer:** The CallData Composer is responsible for Preparing CallData for each Adapter in a Chosen Path and Synthesizing them into a Unified CallData Payload. This Unified Payload Embodies the Execution Blueprint of the User’s Intent, as Determined by the Optimal Path identified by the Pathfinder. It is this Aggregated CallData Payload that the User Ultimately Broadcasts on the Blockchain to Actualize their Intent, making the CallData Composer a Key Architect in the Process of Transforming user Intents into actual Blockchain Transactions.

## Intent Solver Workflow

This Section Delves into Intent Solver’s Operational Workflow. To Illustrate the Intricate Interplay between Intent Solver’s Components, let us Consider the following Executable Intent: “Stake 100 USDC from Polygon to Stader on Ethereum.”

The Steps are -

1. **Recognizing all the Potential Paths:** The Pathfinder scans the ARM for Potential Adapters that can be used to Execute the User Intent and Identifies all the Potential Paths to achieve User’s Desired Output.

- Potential Paths proposed by the IRM:

(a) funds → DEX (Polygon) → Bridge 1 → Stader (Ethereum)

(b) funds → Bridge 1 → DEX (Ethereum) → Stader (Ethereum)

(c) funds → DEX (Polygon) → Bridge 2 → Stader (Ethereum)

2. **Simulating the Potential Paths:** The Pathfinder engages the Simulator to Assess all of the Identified Paths Based on many factors, including Execution Cost, Time Taken for Transaction Completion, and the Potential Yield each Path Offers. For Example, Path 2 requires 230K Gas for Execution, a Duration of 6 minutes, and an Estimated Outcome of 0.13 ETHx. The Simulator’s Capability to Identify and Reject Nonviable Paths is a Critical Part of this Process. For Instance, if the Simulator encounters a failure during the Simulation of DEX (Ethereum) Adapter in Path 2, the Pathfinder Promptly eliminates this Path from Consideration, ensuring that only Viable Paths are Retained for further Analysis.

3. **Choosing the Most Optimal Path(s):** Using a Custom A\* Algorithm, Pathfinder Assesses each Potential Path in terms of its Execution Cost, Time, and Estimated Outcome to Calculate a Composite Score for each. Let us say that Path 3 (180K gas, 10 minutes, 0.136 ETHx) is identified as the Best for net Yield, but Path 2 (120K gas, 2 minutes, 0.134
   ETHx) emerges as the recommended Choice by Striking a Good Balance for Speed, Cost and estimated Outcome.

4. **Composing the CallData:** Once one or more Optimal Routes are decided, the CallData Composer Creates a Unified CallData Payload by assembling the CallData for each Adapter in the respective Paths. Once the CallData is Generated, the Intent Solver returns it to the User along with the Entry Point Contract Address.
