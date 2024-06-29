---
sidebar_position: 7
---

# Module 7: Building Simple dApp Part 06

<iframe width="560" height="315" src="https://www.youtube.com/embed/EQiNnTW1Kys" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Building Execute Function & Button

- Below Code consists of the Execute Function & Button.

    ```jsx
    // Function
    const getTransaction = async (params, quoteData) => {
		const endpoint = "v2/transaction"
		const txDataUrl = `${PATH_FINDER_API_URL}/${endpoint}`
	
		console.log(txDataUrl)
	
		try {
			const res = await axios.post(txDataUrl, {
				...quoteData,
				// fromTokenAddress: params.fromTokenAddress,
				// toTokenAddress: params.toTokenAddress,
				slippageTolerance: 0.5,
				senderAddress: account,
				receiverAddress: account,
				// widgetId: params.widgetId
			})
			return res.data;
		} catch (e) {
			console.error(`Fetching tx data from pathfinder: ${e}`)
		}    
	}

    // Frontend Button Part
    <button class="button-51" onClick={ async () => {

        if(window.ethereum) {
            console.log('detected');
    
            try {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });

            console.log(accounts[0])

            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();

            const txResponse = await getTransaction({
                'fromTokenAddress': from,
                'toTokenAddress': to,
                'fromTokenChainId': "43113",
                'toTokenChainId': "17000", // Fuji
        
                'widgetId': 0, 
            }, quoteData); // params have been defined in step 1 and quoteData has also been fetched in step 1
        
            // sending the transaction using the data given by the pathfinder
            const tx = await signer.sendTransaction(txResponse.txn)

            try {
                await tx.wait();
                console.log(`Transaction mined successfully: ${tx.hash}`)
                alert(`Transaction mined successfully: ${tx.hash}`)
                setStep3('✅')
            }
            catch (error) {
                console.log(`Transaction failed with error: ${error}`)
                }

                }
                catch(err) {
                console.log(err)
                    }
                }
    
            }}>
        Step 3: Execute {step3}
    </button>
    </center>
    </div>
    )
    ```
