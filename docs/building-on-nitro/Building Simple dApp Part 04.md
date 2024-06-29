---
sidebar_position: 5
---

# Module 5: Building Simple dApp Part 04

<iframe width="560" height="315" src="https://www.youtube.com/embed/cpwFDBSoB8k" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Building Input Box, Get Quote Function & Button

- Below Code consists of the Input Box via which we'll enter all Input Amount as well as the Get Quote Function & Button which is used to fetch the Quote Data.

    ```jsx
    const [quoteData, setQuoteData] = useState('');

    const PATH_FINDER_API_URL = "https://api.pf.testnet.routerprotocol.com/api"

    // Function
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

    // Frontend Button Part
    <input placeholder='Enter Amount' onChange={(e)=>{setAmount(e.target.value*Math.pow(10,18))}}></input>
    <center>
    
    <button  class="button-51" onClick={ async ()=>{
			
			const params = {
				'fromTokenAddress': from,
				'toTokenAddress': to,
				'amount': amount,
				'fromTokenChainId': "43113",
				'toTokenChainId': "17000", // Fuji
        			'partnerId': "0",
				'widgetId': 0, 
			}
			
			const quoteData = await getQuote(params);
			setQuoteData(quoteData)
			setStep1('✅')
			alert(quoteData.allowanceTo)
		}}>
        Step 1: Get Quote {step1}
    </button>
    ```

