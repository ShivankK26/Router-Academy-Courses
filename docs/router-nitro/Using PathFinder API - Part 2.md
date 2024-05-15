---
sidebar_position: 8
---

# Module 8: Using PathFinder API - Part 2

Welcome to Module 8 Of Router Nitro CookBook. In this Module, we'll be looking at a dApp and Understanding its CodeBase. In the previous Module, we understood about **Step 1** which is getting the Quote Data. This is the Part 2 of Understanding the CodeBase. Let's Begin...

## Understanding the CodeBase Part- 2

In this Module, we'll be Understanding the step 2, i.e Checking and Setting an Allowance.

### Step 2: Check and set allowance

In Step 2 of using Router Nitro, you'll Verify and Configure the Allowance for Token Transfers. This Process allows Router's swap or Transfer Contract to safely move Tokens on your Behalf between Blockchain Networks.

```
import { ethers, Contract } from 'ethers'

// ERC20 Contract ABI for "Approve" and "Allowance" functions
const erc20_abi = [
    {
        "name": "approve",
        "inputs": [
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "name": "allowance",
        "inputs": [
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            }
        ],
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

// Fetch the current allowance and update if needed
const checkAndSetAllowance = async (wallet, tokenAddress, approvalAddress, amount) => {
    // Transactions with the native token don't need approval
    if (tokenAddress === ethers.constants.AddressZero) {
        return
    }

    const erc20 = new Contract(tokenAddress, erc20_abi, wallet);
    const allowance = await erc20.allowance(await wallet.getAddress(), approvalAddress);
    if (allowance.lt(amount)) {
        const approveTx = await erc20.approve(approvalAddress, amount, {gasPrice: await wallet.provider.getGasPrice()});
        try {
            await approveTx.wait();
            console.log(`Transaction mined succesfully: ${approveTx.hash}`)
        }
        catch (error) {
            console.log(`Transaction failed with error: ${error}`)
        }
    }
}
```

1. **Define ERC20 Contract ABI:** We begin by Defining the ABI (Application Binary Interface) for ERC20 Tokens, specifically focusing on the "approve" and "allowance" Functions. This ABI is essential for interacting with ERC20 Token Contracts.

2. **The `checkAndSetAllowance` Function:** This Function Checks your Current Allowance and, if necessary, Sets a new Allowance. It first Checks if the Token is the Native Token (ETH), in which case no approval is needed.

3. **Creating an ERC20 Contract:** Using the Provided Token Address and the ERC20 ABI, we Create an Instance of the ERC20 Contract. This Contract represents the Token you want to Set an Allowance for.

4. **Checking Current Allowance:** We Retrieve your Current Allowance for the Token. The Allowance is the Maximum Amount the Voyager System (or any other address) can Withdraw from your Wallet.

5. **Setting the Allowance:** If the Current Allowance is less than the Desired Amount, we Proceed to set a new Allowance. We initiate an Approval Transaction to the ERC20 Contract, Granting Permission to Router's Swap or Transfer Contract to Withdraw tokens on your Behalf.

6. **Handling Transactions:** The Code Handles the Approval Transaction, Monitors its Status, and logs the Transaction hash upon Successful Confirmation.

When the Button is Clicked your Signer (wallet) is Set up and the `checkAndSetAllowance` Function is called with the required arameters. You can find it in `quote.allowanceTo` in the `quoteData` obtained from Step 1.

<img width="269" alt="image" src="https://github.com/router-resources/Voyager-2-Cookbook/assets/124175970/6ae5efe7-e589-4a61-95ad-37b8b5077c99"/>

Please replace `"YOUR_PRIVATE_KEY"` and other Placeholders with your actual Private Key and the Specific Token Details.

## Conclusion

In conclusion, Module 8 of the Router Nitro CookBook provided a Detailed examination of Step 2 in using Router Nitro: Checking and Setting an allowance for Token Transfers. This Crucial step ensures the Safe and Secure Movement of tokens between Blockchain Networks through Router's Swap or Transfer Contract.

The Module delved into the CodeBase, offering insights into the implementation of the `checkAndSetAllowance` function, which automates the process of Verifying and Configuring Allowances for token transfers.

By providing Developers with a Clear understanding of the CodeBase and its Functionalities, Module 8 empowers them to Seamlessly Integrate Router Nitro into their dApps, facilitating Efficient and Secure cross-chain Token Transfers. Through these insights, Developers can Leverage Router Nitro to enhance Interoperability across Diverse Blockchain Networks, unlocking new Possibilities in the DeFi landscape.

## Quiz

[Play Nitro Quiz and earn Rewards.](https://router-nitro-quiz.vercel.app/page8)

## Share Your Learnings!

![img](https://github.com/router-resources/Router-Nitro-CookBook/assets/124175970/23258532-0dfa-407e-b695-2ed2eb39d1bc)

_Share your learnings on Twitter. Click [here](https://clicktotweet.com/8BhYr)_
