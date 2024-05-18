---
sidebar_position: 2
---

# Module 2: What are Different Types Of Intents?

Welcome to Module 2 Of Cross Chain Intent Framework CookBook. In this Module, we'll be Understanding What are Intents and its types. Let's Begin...

## What is an Intent?

Broadly Speaking, an Intent Denotes an individual’s Purpose or Goal. Applied within the Context of Blockchain Technology, the User’s Intent refers to their Desired Outcome when Engaging with Blockchain Networks and Decentralized Applications (dApps), encompassing activities such as Trade Execution, Token Staking, or Asset Transfer. The Execution of an Intent through a Framework of Application Programming Interfaces (APIs) and Smart Contracts results in an action. By introducing the concept of Intent-Based Applications, we aim to Abstract the Intricate Technical Procedures underpinning these Actions and Prioritize achieving the User’s Desired end Result.

## Different Types Of Intents

1. **Abstract Intents:** represent the Initial, often incomplete, Expressions of a User’s Goals. For Example, Consider a User who says, “I want to stake USDC.” While this Statement reveals the User’s Desire to Stake USDC, it Lacks Specifics such as the Blockchain Network where the User holds the USDC and the Staking Platform Designated for the USDC Staking. This Lack of Detail renders the Intent too Broad to be actionable in its current form.

2. **Executable Intents:** are the ones that are actionable. Extending our Previous example, the User’s Intent can be made Actionable by Determining the Blockchain Network holding their Funds (e.g., Polygon), the Amount to Stake (e.g., 100 USDC), the Chain for staking (e.g., Ethereum). Within the Realm of Executable Intents, we Define three Distinct Subcategories -

- **Stochastic Intents:** In this Category, both the Path to the Outcome and the Outcome itself are not fixed. For Instance, Consider the Intent, “Stake 100 USDC from my Polygon Wallet on a Liquid Staking Platform on Ethereum.” While this Intent is Actionable, the Ultimate result could be stETH (Lido), ETHx (Stader), or any another Token.

- **Semi-deterministic Intents:** Here, the Path to the Outcome is not fixed, although the Outcome itself is Predetermined. For Example, “Stake 100 USDC from my Polygon Wallet on Lido (Ethereum).” Discounting Potential Transaction Errors, the result of this Intent will be stETH, but the Specifics of the DEX used to Convert USDC to ETH or the Bridge for Fund Transfer from Polygon to Ethereum are not Predetermined.

- **Deterministic Intents:** In this Subcategory, both the Path and the Outcome are Predefined. Consider the Intent, “Use Nitro to Transfer my USDC from Polygon to Ethereum, then use 1inch to Swap USDC to ETH, and finally, Stake the ETH on Lido.” In Deterministic Intents, every Step along with the Final Result is Explicitly Specified.
