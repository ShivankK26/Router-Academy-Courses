---
title: Module 6 - Building Simple dApp Part 05
description: Get Started with Router Academy.
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/CuEz40WCAz4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Building Check Allowance Function & Button

- Below Code consists of the Check Allowance Function & Button.

    ```jsx
    const [quoteData, setQuoteData] = useState('');


    // Function
    const checkAndSetAllowance = async (wallet, tokenAddress, approvalAddress, amount) => {
		// Transactions with the native token don't need approval
		if (tokenAddress === ethers.constants.AddressZero) {
			return
		}
	
		// Using the provided token address and the ERC20 ABI, we create an instance of the ERC20 contract.
		const erc20 = new ethers.Contract(tokenAddress, erc20_abi, wallet);
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
            else{

                console.log("enough allowance")
                alert("enough allowance")
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

			await checkAndSetAllowance(
				signer,
				from, // fromTokenAddress (USDT on Mumbai)
				quoteData.allowanceTo, // quote.allowanceTo in getQuote(params) response from step 1
				ethers.constants.MaxUint256 // Amount to approve (infinite approval)
			);

			setStep2('✅')
		  }

		  catch(err) {
			console.log(err)
		         }
              }
            }
           }>
        Step 2: Check Allowance {step2}
        </button>
    ```