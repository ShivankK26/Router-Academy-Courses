---
sidebar_position: 9
---

# Module 9: Using PathFinder API - Part 3

Welcome to Module 9 Of Router Nitro CookBook. In this Module, we'll be looking at a dApp and Understanding its CodeBase. In the Previous Module, we understood about **Step 2** which is Checking and Setting the Allowance. This is the Part 3 of Understanding the CodeBase. Let's Begin...

## Understanding the CodeBase Part- 3

In this Module, we'll be Understanding the Step 3, i.e `getTransaction`.

## Step 3: Executing the Transaction

In this Step, we will explore how to Execute a Transaction .This process involves Sending a Transaction to Perform the cross-chain Token Transfer initiated in **Step 1** and Configured in **Step 2**.

1. **The `getTransaction` Function:**

This Function is responsible for actually Executing the Transaction. It takes in the following Parameters -

- **`params`**: Parameters required for the Transaction, which should include the Source and Destination Token Addresses, Slippage Tolerance, Sender and Receiver Addresses, and the Widget ID.
- **`quoteData`**: Quote Data Obtained from Step 1.

When the Button is Clicked, It Performs the following tasks using the Function defined:-

```
  const provider = new ethers.providers.JsonRpcProvider("https://rpc.ankr.com/polygon_mumbai", 80001);

    const wallet = new ethers.Wallet("76313c982e5cfdc0c47e36465e5fa90e0db291667296a7bd163178b955162b13", provider)

	const params ={
		'fromTokenAddress': from,
		'toTokenAddress': to,
		'amount': amount,
		'fromTokenChainId': "80001",
		'toTokenChainId': "43113", // Fuji

		'widgetId': 0, // get your unique wdiget id by contacting us on Telegram
	}

	const quoteData = await getQuote(params);


	console.log(quoteData)

    const txResponse = await getTransaction({
		'fromTokenAddress': from,
		'toTokenAddress': to,
		'fromTokenChainId': "80001",
		'toTokenChainId': "43113", // Fuji

		'widgetId': 0, // get your unique wdiget id by contacting us on Telegram
	}, quoteData); // params have been defined in step 1 and quoteData has also been fetched in step 1

    // sending the transaction using the data given by the pathfinder
    const tx = await wallet.sendTransaction(txResponse.txn.execution)
    try {
        await tx.wait();
        console.log(`Transaction mined successfully: ${tx.hash}`)
    }
    catch (error) {
        console.log(`Transaction failed with error: ${error}`)
    }
```

- **Signer Setup**: Configures a Signer using the Specified JSON-RPC Provider. Replace `"YOUR_PRIVATE_KEY"` with your actual Private Key. You can also use the `provider.getSigner()` method if you're implementing this for a User Interface (UI).

- **Retrieve Transaction Data**: Calls the `getTransaction` function with the necessary Parameters to fetch the Transaction Data from the Voyager System.

```
const getTransaction = async (params, quoteData) => {
		const endpoint = "v2/transaction"
		const txDataUrl = `${PATH_FINDER_API_URL}/${endpoint}`

		console.log(txDataUrl)

		try {
			const res = await axios.post(txDataUrl, {
				...quoteData,
				fromTokenAddress: params.fromTokenAddress,
				toTokenAddress: params.toTokenAddress,
				slippageTolerance: 0.5,
				senderAddress: account,
				receiverAddress: account,
				widgetId: params.widgetId
			})
			return res.data;
		} catch (e) {
			console.error(`Fetching tx data from pathfinder: ${e}`)
		}
	}
```

**Send Transaction**: Initiates the Transaction using the Data Obtained from the Voyager System.

**Transaction Handling**: Monitors the Transaction Status. If the Transaction is Successfully Mined, it logs the transaction Hash. If there is an error, it logs an error message.

Please replace `"YOUR_PRIVATE_KEY"` with your actual Private Key and ensure that you have the Required Parameters, including `params` and `quoteData` Obtained from Step 1.

<img width="182" alt="image" src="https://github.com/router-resources/Voyager-2-Cookbook/assets/124175970/7ea56614-6412-43f5-aab8-5e28aa044ff8"/>

## Conclusion

In Conclusion, Module 9 of the Router Nitro Cookbook provided an insightful Exploration of Step 3 in using Router Nitro: executing the Transaction for cross-chain Token Transfers. This Final step in the Process, outlined in the dApp's codeBase, enables users to initiate and Complete Token Transfers Seamlessly between Different Blockchain Networks.

By Elucidating the intricacies of Transaction Execution in cross-chain Token Transfers, Module 9 equips Developers and users with the knowledge and Tools necessary to leverage Router Nitro effectively within their dApps. Through these insights, users can Facilitate Secure, Efficient, and Seamless Token Transfers across Diverse Blockchain Networks, thereby fostering Greater Interoperability and Expanding the Possibilities within the DeFi Ecosystem.

## Quiz

[Play Nitro Quiz and earn Rewards.](https://router-nitro-quiz.vercel.app/page9)

## Share Your Learnings!

![img](https://github.com/router-resources/Router-Nitro-CookBook/assets/124175970/23258532-0dfa-407e-b695-2ed2eb39d1bc)

_Share your learnings on Twitter. Click [here](https://clicktotweet.com/zgEbl)_
