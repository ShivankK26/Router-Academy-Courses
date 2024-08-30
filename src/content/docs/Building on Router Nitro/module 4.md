---
title: Module 4 - Building Simple dApp Part 03
description: Get Started with Router Academy.
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/fe-taJ5_yDo" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Imports & Integrations

- Below Code, consists of the Integrations Part of MetaMask and EthersJS which is used for Displaying the Connect Wallet Button.

    ```jsx
    import React,{useState,useEffect} from 'react'
    import axios from "axios"
    import { ethers } from 'ethers';

    // Metmask Connection Part

    return (
        
        <h1 class="name">Router Nitro Dapp</h1>

            <button class="button-52" onClick={async () => {

                if(window.ethereum) {
                console.log('detected');

                try {
                    const accounts = await window.ethereum.request({
                    method: "eth_requestAccounts",
                });

                setAccount(accounts[0])

                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const provider1 = new ethers.providers.JsonRpcProvider("https://rpc.holesky.ethpandaops.io", 17000); // RPC for Holesky
                alert (provider1);
                const provider2 = new ethers.providers.JsonRpcProvider("https://rpc.ankr.com/avalanche_fuji", 43113); // RPC for Avalanche
                const signer = provider.getSigner();


                const contract = new ethers.Contract(
                    to,
                    erc20_abi,
                    provider1
                );

                setholskyBalance(ethers.utils.formatEther(balance))

                const contract2 = new ethers.Contract(
                    from,
                    erc20_abi,
                    provider2
                );

                balance = await contract2.balanceOf(accounts[0])
            	setAvalancheBalance(ethers.utils.formatEther(balance))

                }}> {account.substring(0,4)+"...."+account.substring(38,42)}
            </button>

        <h5>Transfer AFTT from Fuji to Holsky</h5>
        <div>Fuji: {avalancheBalance}&nbsp;&nbsp;&nbsp;&nbsp;Holsky: {holskyBalance}</div>
        <input placeholder='Enter Amount' onChange={(e)=>{setAmount(e.target.value*Math.pow(10,18))}}></input>

    )
    ```

- Below Code consists of Connecting the Contract Addresses of the Source and Destination Chain.

    ```jsx
        const from = "0x69dc97bb33e9030533ca2006ab4cef67f4db4125";
        const to = "0x5c2c6ab36a6e4e160fb9c529e164b7781f7d255f";
        const [amount, setAmount] = useState(0);
        
        const [holskyBalance, setholskyBalance] = useState(0);
        const [avalancheBalance, setAvalancheBalance] = useState(0);
        const [account, setAccount] = useState('Connect Wallet');
    ```