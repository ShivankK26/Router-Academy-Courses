---
sidebar_position: 1
---


# Module 1: PathFinder API Flow

<iframe width="560" height="315" src="https://www.youtube.com/embed/ENIIS-LqbI0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## PathFinder API Architecture

Follow this Repository to [see](https://github.com/router-resources/BuidingonNitro) the Code of the dApp we're Building.

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

    widgetId: 0, 
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

- `'widgetId'`: This Parameter is used to identify the Widget Responsible for the Transfer. For now, Keep it as 0.

With these Parameters, you can now Call the `getQuote` Function with this `params` Object to initiate a Quote Request for your Specific Token Transfer.

### Response

The `getQuote` Function returns the Quote Data, which typically includes Details about the Token Transfer, such as Source and Destination Chains, Token Amount, Fees, and other Relevant Information. Click the <code>Get Quote</code> Button and go to console to see the Quote Data printed on console.
