---
sidebar_position: 7
---

# Module 7: Using PathFinder API - Part 1

Welcome to Module 7 Of Router Nitro CookBook. In this Module, we'll be looking at a dApp and Understanding its CodeBase. This is the Part 1 of Understanding the CodeBase. Let's Begin...

## Understanding the CodeBase Part- 1

![gif](https://github.com/router-resources/Voyager-2-Cookbook/assets/124175970/7add0a31-99d0-4d16-9e7d-9f8a3390bfb7)

It's very easy to Integrate Nitro in your dApp.

- **Clone the Repository**, hit <code>npm install</code> to install all the Neccessary Packages and Libraries and hit <code>npm run dev</code> to Start the Demo dApp.

- All you need to do is Change some Parameters based on the dApp that you are Building. You can find all the Suppoted Chains and Assets [here.](https://docs.routerprotocol.com/develop/voyager/voyager-v2.0/supported-chains-tokens)

This Demo dApp Demonstrate how to use Nitro to Transsfer USDT from Polygon Mumbai to Avalanche Fuji. Note, this dApp is just made for Demonstration Purpose. After having this dApp Code on your Local System, you can Modify it (Change thee Parameters) based on the dApp you want to Build.

After you have run the dApp on Localhost, it's time to undertand how does the dApp works.

All you need is just 3 easy steps to integrate Voyager into any dapp :-

**Step 1: Get the Quote**

**Step 2: Check and Set Allowance**

**Step 3: Execute the Transaction**

![Untitled Workspace](https://github.com/router-resources/Voyager-2-Cookbook/assets/124175970/0e7775f5-cf4f-41b1-a57d-bfc57e2fc44f)

### Step1: Get the Quote

Router Nitro enables you to Interact with the Nitro Contract and initiate cross-chain Token Transfers. The First Step in this Process is to Request a Auote, which provides you with Essential Details about the Proposed Token Transfer.

To Request a Auote, follow these Steps:

1. **Define the PATH_FINDER_API_URL:** Set the PATH_FINDER_API_URL Variable to the URL of the Pathfinder API for the Voyager Testnet. This is where you will send your Quote Request.

   ```javascript
   const PATH_FINDER_API_URL = "https://api.pf.testnet.routerprotocol.com/api";
   ```

2. **Create the `getQuote` Function:** This Function handles the Quote Request. It uses the `axios` Library to make an HTTP GET Request to the Voyager Pathfinder API.

   ```javascript
   const getQuote = async (params) => {
     const endpoint = "v2/quote";
     const quoteUrl = `${PATH_FINDER_API_URL}/${endpoint}`;
     try {
       const res = await axios.get(quoteUrl, { params });
       return res.data;
     } catch (e) {
       console.error(`Fetching quote data from pathfinder: ${e}`);
     }
   };
   ```

3. **Call the `getQuote` Function:** Use this Function to Request a Quote by passing appropriate Parameters. In this Repository, this Function is called using a button.

```javascript
// Example usage:
const quoteParams = {
  fromTokenAddress: from,
  toTokenAddress: to,
  amount: amount,
  fromTokenChainId: "80001",
  toTokenChainId: "43113", // Fuji

  widgetId: 0, // get your unique wdiget id by contacting us on Telegram
};

const quoteData = await getQuote(quoteParams);
console.log("Quote Data:", quoteData);
```

These Parameters Define the Details of the Token Transfer you wish to Execute. Let's Break down what each Parameter represents:

- `'fromTokenAddress'`: This should specify the address of the Token you want to Transfer from (the Source Token).

- `'toTokenAddress'`: Provide the Address of the Token you want to Transfer to (the Dstination Token).

- `'amount'`: Set the Amount of the Token you wish to Transfer.

- `'fromTokenChainId'`: This Parameter Represents the Chain ID of the Source Blockchain. In this Case, it's Set to "80001."

- `'toTokenChainId'`: Similarly, this Parameter Specifies the Chain ID of the Destination Blockchain, which, in this example, is "43113" (Fuji).

- `'widgetId'`: This Parameter is used to identify the Widget Responsible for the Transfer. You'll typically need to Obtain a Unique Widget ID through Contact with the Voyager Team, often via Telegram or other means. For now, let's keep it as 0.

With these Parameters, you can now Call the `getQuote` Function with this `params` Object to initiate a Quote Request for your Specific Token Transfer.

   <img width="197" alt="image" src="https://github.com/router-resources/Voyager-2-Cookbook/assets/124175970/5867052e-301e-46c6-b206-24094c19298e"/>

## Response

The `getQuote` Function returns the Quote Data, which typically includes Details about the Token Transfer, such as Source and Destination Chains, Token Amount, Fees, and other Relevant Information. Click the <code>Get Quote</code> Button and go to console to see the Quote Data printed on console.

## Conclusion

In Conclusion, Module 7 of Understanding the CodeBase introduced users to the Seamless Integration of Nitro into their dApps. By following a Straightforward process, Developers can Effectively incorporate Nitro into their Projects, facilitating cross-chain Token Transfers.

The Module Demonstrated a Practical example using a Demo dApp to Transfer USDT from Polygon Mumbai to Avalanche Fuji. After Setting up the dApp Locally and Modifying Parameters as per Individual Project Requirements, users embarked on Understanding the three Fundamental Steps to Integrate Voyager into any dApp:

1. **Step 1: Get the Quote:** Users initiated the Token Transfer process by Requesting a Quote from the Nitro Contract through the Pathfinder API. The Quote provided Essential details about the Proposed Token Transfer, including Source and Destination Chains, Token Amounts, and Associated Fees.

2. **Step 2: Check and Set Allowance:** Once users obtained the Quote, they were prompted to Check and Set the necessary Allowances for the Token Transfer to Proceed Smoothly.

3. **Step 3: Execute the Transaction:** With all Prerequisites met, Users executed the Transaction, initiating the cross-chain Token Transfer from the Source to the Destination Chain.

The Module provided detailed Insights into each Step, including Code Snippets and Explanations, to Guide Developers through the Integration process Effectively. By following the Outlined steps, Developers can seamlessly Incorporate Nitro into their dApps, enabling Efficient and Secure cross-chain Token Transfers.

## Quiz

[Play Nitro Quiz and earn Rewards.](https://router-nitro-quiz.vercel.app/page7)

## Share Your Learnings!

![img](https://github.com/router-resources/Router-Nitro-CookBook/assets/124175970/23258532-0dfa-407e-b695-2ed2eb39d1bc)

_Share your learnings on Twitter. Click [here](https://clicktotweet.com/5p7ub)_
