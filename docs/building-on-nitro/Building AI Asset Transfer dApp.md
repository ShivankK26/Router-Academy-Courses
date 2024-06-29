---
sidebar_position: 8
---

# Building AI Asset Transfer dApp

In this Tutorial, we'll be Building an AI dApp which can execute cross-chain Transactions based on Prompts. To view the CodeBase, Click on the Link at the Bottom. 

![download](https://github.com/router-resources/NitroAIDApp/assets/124175970/f46ad4ce-af52-4cf5-872e-f4eeb1b1bc9b)

## Running the Application

- **Clone the Repository**
  ```
  git clone https://github.com/router-resources/NitroAIDApp.git
  ```

- **Install the necessary Packages**

  ```
  npm install
  ```

- **Replace Your_OpenAI_API_KEY with your OpenAI API Key**

  ![Screenshot 2024-06-28 at 5 59 18 PM](https://github.com/router-resources/NitroAIDApp/assets/124175970/2433e270-4217-49fd-a390-7b3f9e20dab3)


- **Run on Localhost**

  ```
  npm start
  ```

Congratulations!! Your application has started running.

# Understanding the Code

Run the following commands in your Terminal to Download the necessary Libraries required in our Project.

  ```
  npm install axios ethers@5.7.2 openai
  ```

## Getting OpenAI API Key

- Visit [OpenAI](https://openai.com/index/openai-api/) and click on ***Explore API***. Make sure to Create an account on OpenAI before Proceeding with the Step.

- It will redirect you [here](https://openai.com/api/). Click on ***Start Building***.

- It will redirect you to OpenAI Platform. Click on **API Keys** Option in the left SideBar and Create your new API Key.

Now, Copy the API Key somewhere as you'll need it afterwards.

## Imports

Import the Downloaded Libararies by  -

    ```jsx
    import OpenAI from "openai";
    import axios from "axios"
    import { ethers } from 'ethers';
    ```

## Extract Variable Function

The `extractVariables` function is designed to extract Specific Variables from a given sentence using the OpenAI API. It identifies and extracts the `sourceToken`, `sourceChain`, `desToken`, `desChain`, and `amount` from the sentence based on Predefined sets of Possible Values.

#### Parameters

- `sentence` (String): The input sentence from which the variables need to be extracted.

#### Returns

- A Promise that resolves to an object containing the extracted variables in the following format -

  ```json
    {
      "sourceToken": "x",
      "sourceChain": "a",
      "desToken": "y",
      "desChain": "b",
      "amount": "z"
    }
  ```

#### Usage

  ```javascript
      const sentence = "Transfer 100 USDT from Holsky to Fuji in exchange for USDC.";
      extractVariables(sentence).then(variables => {
      console.log(variables);
      });
  ```

#### Function Details

1. **Initialize OpenAI Instance:**
   The function initializes an instance of the OpenAI Client using the Provided API Key.

  ```javascript
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      dangerouslyAllowBrowser: true 
    });
  ```

2. **Call OpenAI API:**
   The function sends a request to the OpenAI API's `chat.completions.create` endpoint, instructing it to extract the required variables from the input sentence. It uses the `gpt-3.5-turbo` model.

  ```javascript
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: `Extract the sourceToken, sourceChain, desToken, desChain, and amount from the following sentence. Source Chains can be Holsky, Fuji and Amoy. Similarly, Destination Chains can be Holsky, Fuji and Amoy. Source and Destination Tokens can be AFTT, USDT, USDC. 
      "${sentence}"
      Return the results in the following format: 
      {
        "sourceToken": "x",
        "sourceChain": "a",
        "desToken": "y",
        "desChain": "b",
        "amount": "z"
      }` }],
      model: "gpt-3.5-turbo",
    });
  ```

3. **Parse and Return Result:**
   The function parses the JSON response from the OpenAI API and returns the extracted variables.

```javascript
   const result = completion.choices[0].message["content"];
   const variables = JSON.parse(result);
   return variables;
```

#### Example Output

Given the input sentence "Transfer 100 USDT from Holsky to Fuji in exchange for USDC.", the function might return -

```json
{
  "sourceToken": "USDT",
  "sourceChain": "Holsky",
  "desToken": "USDC",
  "desChain": "Fuji",
  "amount": "100"
}
```

**Note: For sake for simplicity we are limiting this application for transferring AFTT Tokens between Amoy, Fuji and Holsky only but you can extend it for other tokens and chains as well. For more details please visit [here](https://github.com/router-resources/SupportedChains/blob/main/supportedchains.js)**. 

## Getting the Quote

Nitro enables you to interact with the Voyager Contract and initiate cross-chain Token Transfers. The first step in this Process is to request a Quote, which provides you with essential details about the proposed Token Transfer.

To request a Quote, follow these steps -

1. **Define the PATH_FINDER_API_URL:** Set the PATH_FINDER_API_URL variable to the URL of the Pathfinder API for the Voyager testnet. This is where you will send your Quote request.

```javascript
   const PATH_FINDER_API_URL = "https://api.pf.testnet.routerprotocol.com/api"
```

2. **Create the `getQuote` Function:** This function handles the Quote request. It uses the `axios` library to make an HTTP GET request to the Voyager Pathfinder API.

```javascript
   const getQuote = async (params) => {
		const endpoint = "v2/quote"
		const quoteUrl = `${PATH_FINDER_API_URL}/${endpoint}`
	
		console.log(quoteUrl)
	
		try {
			const res = await axios.get(quoteUrl, { params })
			return res.data;
		} catch (e) {
			console.error(`Fetching quote data from pathfinder: ${e}`)
		}    
	}
```

3. **Call the `getQuote` Function:** Use this function to request a Quote by passing appropriate Parameters. In this repository, this function is called using a button.

   ```javascript
   const quoteParams = {
				'fromTokenAddress': source_token_address,
				'toTokenAddress': destination_token_address,
				'amount': amount,
				'fromTokenChainId': source_chain_id,
				'toTokenChainId': destination_chain_id, 
		
				'widgetId': 0,
			}
   
   const quoteData = await getQuote(quoteParams);
   console.log("Quote Data:", quoteData);
   ```

These Parameters Define the details of the Token Transfer you wish to Execute. Let’s Break down what each Parameter represents - 

- **'fromTokenAddress':** This should specify the address of the Token you want to Transfer from (the Source Token).

- **'toTokenAddress':** Provide the Address of the Token you want to Transfer to (the Dstination Token).

- **'amount':** Set the Amount of the Token you wish to Transfer.

- **'fromTokenChainId':** This Parameter Represents the Chain ID of the Source Blockchain. In this Case, it’s Set to “80001.”

- **'toTokenChainId':** Similarly, this Parameter Specifies the Chain ID of the Destination Blockchain, which, in this example, is “43113” (Fuji).

- **'widgetId':** This Parameter is used to identify the Widget Responsible for the Transfer. You’ll typically need to Obtain a Unique Widget ID through Contact with the Voyager Team, often via Telegram or other means. For now, let’s keep it as 0.

With these Parameters, you can now Call the getQuote Function with this params Object to initiate a Quote Request for your Specific Token Transfer.


### Response

The `getQuote` Function returns the Quote Data, which typically includes Details about the Token Transfer, such as Source and Destination Chains, Token Amount, Fees, and other Relevant Information. Click the Get Quote Button and go to console to see the Quote Data printed on console.

## Check and Set Allowance

In Step 2 of using Router Nitro, you’ll Verify and Configure the Allowance for Token Transfers. This Process allows Router’s swap or Transfer Contract to safely move Tokens on your Behalf between Blockchain Networks.

```javascript
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

1. **Define ERC20 Contract ABI:** We begin by Defining the ABI (Application Binary Interface) for ERC20 Tokens, specifically focusing on the “approve” and “allowance” Functions. This ABI is essential for interacting with ERC20 Token Contracts.

2. **The checkAndSetAllowance Function:** This Function Checks your Current Allowance and, if necessary, Sets a new Allowance. It first Checks if the Token is the Native Token (ETH), in which case no approval is needed.

3. **Creating an ERC20 Contract:** Using the Provided Token Address and the ERC20 ABI, we Create an Instance of the ERC20 Contract. This Contract represents the Token you want to Set an Allowance for.

4. **Checking Current Allowance:** We Retrieve your Current Allowance for the Token. The Allowance is the Maximum Amount the Voyager System (or any other address) can Withdraw from your Wallet.

5. **Setting the Allowance:** If the Current Allowance is less than the Desired Amount, we Proceed to set a new Allowance. We initiate an Approval Transaction to the ERC20 Contract, Granting Permission to Router’s Swap or Transfer Contract to Withdraw tokens on your Behalf.


## Executing the Transaction

This Function is responsible for actually Executing the Transaction. It takes in the following Parameters -

- **params:** Parameters required for the Transaction, which should include the Source and Destination Token Addresses, Slippage Tolerance, Sender and Receiver Addresses, and the Widget ID.
- **quoteData:** Quote Data Obtained from Step 1.

When the Button is Clicked, It Performs the following tasks using the Function defined -


```javascript
  const getTransaction = async (params, quoteData) => {
		const endpoint = "v2/transaction"
		const txDataUrl = `${PATH_FINDER_API_URL}/${endpoint}`
	
		console.log(txDataUrl)
	
		try {
			const res = await axios.post(txDataUrl, {
				...quoteData,
				slippageTolerance: 0.5,
				senderAddress: account,
				receiverAddress: account,
			})
			return res.data;
		} catch (e) {
			console.error(`Fetching tx data from pathfinder: ${e}`)
		}    
	}

```

## Create an Input Field 

![Screenshot 2024-06-28 at 6 56 24 PM](https://github.com/router-resources/NitroAIDApp/assets/124175970/081cb1f3-aef5-4ec0-aa63-4508e77bdb5d)

Now, create an Input field to enter the Prompt and the extract the variables from the Prompt by creating the following objects -

```javascript
let chainID = {

    amoy:'80002',
    fuji:'43113',
    holsky:'17000'
  
    }
  
let tokenAddress = {
  
    aftt: {
      amoy:'0xBAD6e1AbE5EbEae8a123ef14AcA7024D3F8c45fb',
      fuji:'0x69dc97bb33e9030533ca2006ab4cef67f4db4125',
      holsky:'0x5c2c6ab36a6e4e160fb9c529e164b7781f7d255f'
    }

  }
```

When the variables are extracted, the variables are mapped to the fields in the above Objects to get the Data in terms of Token Addresses and Chain IDs.

## Submit Button

![Screenshot 2024-06-28 at 6 57 33 PM](https://github.com/router-resources/NitroAIDApp/assets/124175970/8ec213f9-623f-4281-bae2-2c6758a293b4)

Next, we need to Create a Button on Click of which the following tasks take place.

1. Extracting the Variables
2. Getting the Quote
3. Checking and Setting Allowance
4. Executing the Transaction**

```javascript
 <button role="button" style={{width:'10em',height:'3em',backgroundColor:'white',borderRadius:'2em',borderColor:'black'}} onClick={async ()=>{

        // Extracting Variables
        const variables=await extractVariables(sentence)
          if (variables) {
           
            const { sourceToken, sourceChain, desToken,desChain, amount } = variables;
            let resObj={sourceToken:tokenAddress[`${sourceToken.toLowerCase()}`][`${sourceChain.toLowerCase()}`],sourceChain:chainID[`${sourceChain.toLowerCase()}`],
            desToken:tokenAddress[`${desToken.toLowerCase()}`][`${desChain.toLowerCase()}`],desChain:chainID[`${desChain.toLowerCase()}`],amount:amount}
            console.log(resObj)

            // Getting the Quote
            const params ={
              'fromTokenAddress': resObj.sourceToken,
              'toTokenAddress': resObj.desToken,
              'amount': parseFloat(amount)*Math.pow(10,18),
              'fromTokenChainId': resObj.sourceChain,
              'toTokenChainId': resObj.desChain, 
              'partnerId': "0",
              
            }
            
             const quote=await getQuote(params)
              setQuoteData(quote)
              alert(quote.allowanceTo)
              console.log(quote)

              // Checking and Setting Allowance
              if(window.ethereum) {
                console.log('detected');
            
                try {
                const accounts = await window.ethereum.request({
                  method: "eth_requestAccounts",
                });
          
                console.log(accounts[0])
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
          
                
          
                await checkAndSetAllowance(
                  signer,
                 resObj.sourceToken, 
                  quote.allowanceTo, 
                  ethers.constants.MaxUint256 
                );
                
                // Executing the Transaction
                const txResponse = await getTransaction({
                  'fromTokenAddress': resObj.sourceToken,
                  'toTokenAddress': resObj.desToken,
                  'fromTokenChainId': resObj.sourceChain,
                  'toTokenChainId': resObj.desChain, 
                  'widgetId': 0, 
                }, quote); 

                const tx = await signer.sendTransaction(txResponse.txn)
                try {
                  await tx.wait();
                  console.log(`Transaction mined successfully: ${tx.hash}`)
                  alert(`Transaction mined successfully: ${tx.hash}`)
                  
                }
                catch (error) {
                  console.log(`Transaction failed with error: ${error}`)
                }
               
                }
                catch(err) {
                console.log(err)
                }
              }
          }

        
       
      }}>Submit</button>
```

Check out the actual Code Implementation in the following Repository by Clicking [here](https://github.com/router-resources/NitroAIDApp/tree/main).