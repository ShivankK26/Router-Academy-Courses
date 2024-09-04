---
title: Module 8 - Same Chain Staking & Cross Chain Staking  
description: Get Started with Router Academy.
---

## Same Chain Staking

<img src="https://res.cloudinary.com/dguv1yapd/image/upload/v1725435737/router-academy-courses/le9g6z5wdicuqs1qcbuo.png" alt="Same Chain Staking" />

In Same Chain Staking there are 2 options, either user can Stake Token A or Swap it to a Token B for Staking.

For Example - To Stake on Stader on Ethereum, if the User has ETH on Ethereum i.e Token A = ETH, the User can Simply use the Stader Adapter to Stake. But there might be a Case, where User has some other Token, Let’s say MATIC on Ethereum. Now in order to Stake, User has to make use of 2 Adapters, Dexspan Adapter to Swap MATIC to ETH and then Stader Adapter to Stake on Stader.

Let’s Understand the Flow Diagram in Depth now. Considering Our First Case, i.e the Case in which User has ETH on Ethereum i.e Token A = ETH, the Token A becomes the Desired Token because it can be used to Stake on Stader. In this Case, Simply Stader Adapter address has to be passed in Target in `executeBatchCallsSameChain` of the `BatchTransaction` function and the Staking is Successfully Completed. 

In the Second Case, i.e the Case in which User has Let’s say MATIC on Ethereum and still want to stake on Stader on Ethereum. In this Case, Token A = MATIC which is not the Desired Token, so it has to be Swapped to ETH for Staking. So, in `executeBatchCallsSameChain` function, the Dexspan Adapter Address and Stader Adapter Address is passed in Target to Batch these Transactions into one Single Transaction and Execute it. The Dexspan Adapter is used to Swap MATIC to ETH and Stader Adapter is used to Stake ETH on Stader.

## Cross Chain Staking 

Similarly, We can also have cross-chain Staking on Stader. Let’s Consider an Example in which User has MATIC on Polygon and want to Stake ETH on Stader on Ethereum. In Order to Do this, we can Call the Nitro Adapter Execute function on the Source Chain i.e Polygon passing it’s Address in `executeBatchCallsSameChain` function. This Bridges the MATIC from Polygon to Ethereum. On the Destination Chain i.e Ethereum `handleMessage` function of the `BatchTransaction` Contract gets called automatically which calls the `executeBatchCallsSameChain` function on Ethereum passing in Dexspan Adapter Address to Swap MATIC to ETH, Stader Adapter Address in Target to Stake on Stader. These two Transactions are Batched into a Single Transaction on Ethereum.
