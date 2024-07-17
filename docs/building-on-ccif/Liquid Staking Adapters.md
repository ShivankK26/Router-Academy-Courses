---
sidebar_position: 7
---

# Module 7: About Liquid Staking Adapters

## Adapters for Liquid Staking

This Module is Useful for Understanding the ***StakeStone*** and ***Lido*** Adapters which are important for Learning about Liquid Staking Adapters. Refer [this](https://github.com/router-protocol/router-intents-eoa-adapters/tree/main/evm/contracts/intent-adapters/liquid-staking) Repository for Smart Contracts.

### StakeStone Adapter

The `StakeStoneStakeEth` Smart Contract allows users to Stake ETH and Receive STONE Tokens on the StakeStone Platform. This Tutorial provides a Comprehensive Guide to Understanding and using the `StakeStoneStakeEth` Contract.

- **Contract Structure** - The `StakeStoneStakeEth` Smart Contract allows users to Stake their ETH in the StakeStone Vault to Receive STONE Tokens. It also supports cross-chain functionality to Deposit received STONE Tokens on another Chain using LayerZero OFT.

    a) ***stone***
      - The Address of the STONE token.

    b) ***stoneVault***
      - The Interface to Interact with the StakeStone Vault.

```sol
address public immutable stone;
IStoneVault public immutable stoneVault;
```

- **Functions** -

    a) ***constructor()*** - The Constructor initializes the Contract with Native Token, Wrapped Native Token, StakeStone Vault, and STONE Token Addresses.

    ```sol
    constructor(
        address __native,
        address __wnative,
        address __stoneVault,
        address __stone
    ) RouterIntentEoaAdapterWithoutDataProvider(__native, __wnative) {
        stoneVault = IStoneVault(__stoneVault);
        stone = __stone;
    }
    ```

    b) ***name()*** - The `name` function returns the name of the Adapter.

    ```sol
    function name() public pure override returns (string memory) {
        return "StakeStoneStake";
    }
    ```

    c) ***execute()*** - The `execute` function Performs the Staking Operation by Parsing Input Data, handling ETH Transfers, and Calling the `_stake` function.

    ```sol
    function execute(bytes calldata data) external payable override returns (address[] memory tokens) {

        (address _recipient, uint256 _amount, uint16 dstEid, bytes memory crossChainData) = parseInputs(data);

        uint256 nativeFee = 0;
        if (dstEid != 0) nativeFee = abi.decode(crossChainData, (uint256));

        if (address(this) == self()) {
            require(
                msg.value == _amount,
                Errors.INSUFFICIENT_NATIVE_FUNDS_PASSED
            );
            _amount = msg.value - nativeFee;
        } else if (_amount == type(uint256).max)
            _amount = address(this).balance - nativeFee;
        
        else {_amount = _amount - nativeFee;}

        bytes memory logData;
        (tokens, logData) = _stake(_recipient, _amount, dstEid, crossChainData);

        emit ExecutionEvent(name(), logData);
        return tokens;
    }
    ```

    d) ***_stake()*** - The `_stake` function Performs the Actual Staking Operation with the `stoneVault` and handles cross-chain Operations if needed.

    ```sol
    function _stake( address _recipient, uint256 _amount, uint16 dstEid, bytes memory crossChainData) internal returns (address[] memory tokens, bytes memory logData) {

        uint256 receivedStone = stoneVault.deposit{value: _amount}();

        if (dstEid != 0) {
            depositLzOFT(dstEid, crossChainData, receivedStone, _recipient);
        } else {
            if (_recipient != address(this))
                withdrawTokens(stone, _recipient, receivedStone);
        }        

        tokens = new address[](2);
        tokens[0] = native();
        tokens[1] = stone;

        logData = abi.encode(_recipient, _amount, receivedStone);
    }
    ```

    e) ***depositLzOFT()*** - The `depositLzOFT` function handles cross-chain Transfers using LayerZero OFT.

    ```sol
    function depositLzOFT(uint16 dstEid, bytes memory crossChainData, uint256 amount, address recipient) public {
        (uint256 nativeFee, address refundAddress) = abi.decode(

            crossChainData,
            (uint256, address)
        );

        ILzOft(stone).sendFrom{value: nativeFee}(address(this), dstEid, abi.encodePacked(recipient), amount, payable(refundAddress), address(0) , hex"");
    }
    ```

    f) ***parseInputs*** - The `parseInputs` function Decodes the Input Data.

    ```sol
    function parseInputs(
        bytes memory data
    ) public pure returns (address, uint256, uint16, bytes memory) {
        return abi.decode(data, (address, uint256, uint16, bytes));
    }
    ```

    g) ***receive()*** - The `receive` function allows the Contract to Accept ETH Deposits.

    ```sol
    receive() external payable {}
    ```

- **Usage** - To use the `StakeStoneStakeEth` Contract -

  1. Deploy the Contract with the Native Token, Wrapped Native Token, `stoneVault`, and STONE Token Addresses.
  2. Call the `execute` function with the appropriate Input Data to Stake ETH and Receive STONE Tokens.      

```solidity
// Example data to be passed to the execute function
    (address recipient, uint256 amount, uint16 dstEid, bytes memory crossChainData) = (
        address(0x...),
        1000000000000000000, // 1 ETH in wei
        0, // Destination chain ID (0 for same chain)
        new bytes(0) // No cross-chain data
    );

    bytes memory data = abi.encode(recipient, amount, dstEid, crossChainData);

    stakeStoneStakeEth.execute{value: amount}(data);    
```  

- **Error Handling** - The `StakeStoneStakeEth` Contract uses the Errors library to handle various error Scenarios, such as Insufficient Native Funds.

#### Conclusion

The `StakeStoneStakeEth` Smart Contract Simplifies Staking ETH in Exchange for STONE Tokens on the StakeStone Platform. By following this Tutorial, you should be able to Understand and Utilize the Contract effectively. 


### Lido Adapter

The `LidoStakeEth` Smart Contract. This Contract allows users to Stake their ETH to Receive stETH on Lido and optionally Bridge the Staked Assets to various Layer 2 Solutions. This Guide will Walk you through the Structure, functionality, and Key Aspects of the Contract.

- **Contract Structure** - The `LidoStakeEth` Contract enables Staking ETH to Receive stETH via the Lido Protocol on the Ethereum Network. Additionally, it supports Bridging the received stETH to other Layer 2 networks or Sidechains like Arbitrum, Optimism, Base, Linea, Mantle, zkSync, and Scroll.

    a) ***State Variables***
      - The Contract Defines several State Variables to Manage Addresses of various Bridges, Gateways, and Token Contracts.

        ```sol
        address public immutable lidoStETH;
        address public immutable lidoWstEth;
        address public immutable referralId;
        ILidoArbitrumBridge public immutable arbitrumGateway;
        ILidoOptBaseMan public immutable baseGateway;
        ILidoLineaBridge public immutable lineaGateway;
        ILidoOptBaseMan public immutable mantleGateway;
        ILidoOptBaseMan public immutable optimismGateway;
        ILidoZkSyncBridge public immutable zksyncGateway;
        ILidoScrollBridge public immutable scrollGateway;
        IScrollMessageQueue public immutable scrollMessageQueue;
        address public immutable lidoWstEthOptimism;
        address public immutable lidoWstEthBase;
        address public immutable lidoWstEthMantle;
        IZkSync public immutable zkSyncBridge;
        ```

    b) ***Chain IDs***
      - The Contract also Defines Constants for various Chain IDs -

        ```sol
        uint256 public constant ARBITRUM_CHAIN_ID = 42161;
        uint256 public constant OPTIMISM_CHAIN_ID = 10;
        uint256 public constant BASE_CHAIN_ID = 8453;
        uint256 public constant LINEA_CHAIN_ID = 59144;
        uint256 public constant MANTLE_CHAIN_ID = 5000;
        uint256 public constant ZKSYNC_CHAIN_ID = 324;
        uint256 public constant SCROLL_CHAIN_ID = 534352;
        ```

- **Functions** -

    a) ***constructor()*** - The Constructor initializes the Contract with Addresses for the Native and Wrapped Native Tokens, Lido Token Contracts, various Gateways, and Bridges.

        ```sol
        constructor(
            address __native,
            address __wnative,
            address __lidoStETH,
            address __lidoWstETH,
            address __referralId,
            address __arbitrumGateway,
            address __baseGateway,
            address __lineaGateway,
            address __mantleGateway,
            address __optimismGateway,
            address __zksyncGateway,
            address __scrollGateway,
            address __scrollMessageQueue,
            address __lidoWstEthOptimism,
            address __lidoWstEthBase,
            address __lidoWstEthMantle
        ) RouterIntentEoaAdapterWithoutDataProvider(__native, __wnative) {
            lidoStETH = __lidoStETH;
            lidoWstEth = __lidoWstETH;
            referralId = __referralId;
            arbitrumGateway = ILidoArbitrumBridge(__arbitrumGateway);
            baseGateway = ILidoOptBaseMan(__baseGateway);
            lineaGateway = ILidoLineaBridge(__lineaGateway);
            mantleGateway = ILidoOptBaseMan(__mantleGateway);
            optimismGateway = ILidoOptBaseMan(__optimismGateway);
            zksyncGateway = ILidoZkSyncBridge(__zksyncGateway);
            scrollGateway = ILidoScrollBridge(__scrollGateway);
            scrollMessageQueue = IScrollMessageQueue(__scrollMessageQueue);
            lidoWstEthOptimism = __lidoWstEthOptimism;
            lidoWstEthBase = __lidoWstEthBase;
            lidoWstEthMantle = __lidoWstEthMantle;
            zkSyncBridge = zksyncGateway.zkSync();
        }
        ```

    b) ***name()*** - Returns the name of the Contract.

        ```sol
        function name() public pure override returns (string memory) {
            return "LidoStakeEth";
        }
        ```

    c) ***execute()*** - Executes the Staking and Bridging Process based on the Input Data.

        ```sol
        function execute(bytes calldata data) external payable override returns (address[] memory tokens) {
            (
                address _recipient,
                uint256 _amount,
                uint256 _bridgeChainId,
                bytes memory _bridgeData
            ) = parseInputs(data);

            uint256 _bridgeFee = getBridgeFee(_bridgeChainId, _bridgeData);

            if (address(this) == self()) {
                require(
                    msg.value == _amount + _bridgeFee,
                    Errors.INSUFFICIENT_NATIVE_FUNDS_PASSED
                );
            } else if (_amount == type(uint256).max)
                _amount = address(this).balance - _bridgeFee;
            else _amount = _amount - _bridgeFee;

            bytes memory logData;

            (tokens, logData) = _stake(
                _recipient,
                _amount,
                _bridgeChainId,
                _bridgeFee,
                _bridgeData
            );

            emit ExecutionEvent(name(), logData);

            return tokens;
        }
        ```

    d) ***_stake()*** - Handles the Staking Logic and Determines whether to Bridge the Staked Tokens to another Chain.

        ```sol
        function _stake(
            address _recipient,
            uint256 _amount,
            uint256 _bridgeChainId,
            uint256 _bridgeFee,
            bytes memory _bridgeData
        ) internal returns (address[] memory tokens, bytes memory logData) {
            ILidoStakeEth(lidoStETH).submit{value: _amount}(referralId);

            bytes memory data;
            if (_bridgeChainId == 0) {
                tokens = new address ;
                tokens[0] = native();
                tokens[1] = lidoStETH;

                data = abi.encode(
                    0,
                    withdrawTokens(lidoStETH, _recipient, type(uint256).max)
                );
            } else {
                tokens = new address ;
                tokens[0] = native();
                tokens[1] = lidoStETH;
                tokens[2] = lidoWstEth;

                data = _bridge(_bridgeChainId, _bridgeFee, _bridgeData);
            }

            logData = abi.encode(_recipient, _amount, data);
        }
        ```

    e) ***parseInputs*** - Parses the Input Data to extract Recipient Address, Amount, Bridge Chain ID, and Bridge Data.

        ```sol
        function parseInputs(
            bytes memory data
        ) public pure returns (address, uint256, uint256, bytes memory) {
            return abi.decode(data, (address, uint256, uint256, bytes));
        }
        ```    

    f) ***_bridge*** - Handles the Bridging Logic for various Chains.

        ```sol
        function _bridge(
            uint256 chainId,
            uint256 bridgeFee,
            bytes memory bridgeData
        ) internal returns (bytes memory) {
            if (chainId == ARBITRUM_CHAIN_ID) {
                return _bridgeToArbitrum(bridgeFee, bridgeData);
            } else if (chainId == OPTIMISM_CHAIN_ID) {
                return _bridgeToOptBaseMan(OPTIMISM_CHAIN_ID, optimismGateway, lidoWstEthOptimism, bridgeData);
            } else if (chainId == BASE_CHAIN_ID) {
                return _bridgeToOptBaseMan(BASE_CHAIN_ID, baseGateway, lidoWstEthBase, bridgeData);
            } else if (chainId == MANTLE_CHAIN_ID) {
                return _bridgeToOptBaseMan(MANTLE_CHAIN_ID, mantleGateway, lidoWstEthMantle, bridgeData);
            } else if (chainId == LINEA_CHAIN_ID) {
                return _bridgeToLinea(bridgeData);
            } else if (chainId == ZKSYNC_CHAIN_ID) {
                return _bridgeToZkSync(bridgeFee, bridgeData);
            } else if (chainId == SCROLL_CHAIN_ID) {
                return _bridgeToScroll(bridgeFee, bridgeData);
            } else revert(Errors.INVALID_BRIDGE_CHAIN_ID);
        }
        ```    

    g) ***_bridgeToArbitrum*** - Handles the Bridging Logic to Arbitrum.

        ```sol
        function _bridgeToArbitrum(
            uint256 bridgeFee,
            bytes memory data
        ) internal returns (bytes memory) {
            (
                address recipient_,
                uint256 amount_,
                uint256 maxGas_,
                uint256 gasPriceBid_,
                uint256 maxSubmissionCost_
            ) = abi.decode(data, (address, uint256, uint256, uint256, uint256));

            if (amount_ == type(uint256).max)
                amount_ = IERC20(lidoStETH).balanceOf(address(this));

            amount_ = convertToWstEth(amount_);

            IERC20(lidoWstEth).safeIncreaseAllowance(
                address(arbitrumGateway),
                amount_
            );

            bytes memory returnData = arbitrumGateway.outboundTransfer{
                value: bridgeFee
            }(
                lidoWstEth,
                recipient_,
                amount_,
                maxGas_,
                gasPriceBid_,
                abi.encode(maxSubmissionCost_, hex"")
            );

            uint256 retryableTicketId = abi.decode(returnData, (uint256));

            return abi.encode(ARBITRUM_CHAIN_ID, amount_, retryableTicketId);
        }
        ```

    h) ***_bridgeToOptBaseMan*** - Handles the Bridging Logic to Optimism, Base, and Mantle.

        ```sol
        function _bridgeToOptBaseMan(
            uint256 chainId,
            ILidoOptBaseMan gateway,
            address wstEthDestChain,
            bytes memory data
        ) internal returns (bytes memory) {
            (
                address recipient_,
                uint256 amount_,
                uint32 l2Gas_,
                bytes memory data_
            ) = abi.decode(data, (address, uint256, uint32, bytes));

            if (amount_ == type(uint256).max)
                amount_ = IERC20(lidoStETH).balanceOf(address(this));

            amount_ = convertToWstEth(amount_);

            IERC20(lidoWstEth).safeIncreaseAllowance(address(gateway), amount_);

            gateway.depositERC20To(
                lidoWstEth,
                wstEthDestChain,
                recipient_,
                amount_,
                l2Gas_,
                data_
            );

            return abi.encode(chainId, amount_);
        }
        ```

    i) ***_bridgeToLinea*** - Handles the Bridging Logic to Linea.

        ```sol
        function _bridgeToLinea(bytes memory data) internal returns (bytes memory) {

            (address recipient_, uint256 amount_) = abi.decode(
                data,
                (address, uint256)
            );

            if (amount_ == type(uint256).max)
                amount_ = IERC20(lidoStETH).balanceOf(address(this));

            amount_ = convertToWstEth(amount_);

            IERC20(lidoWstEth).safeIncreaseAllowance(
                address(lineaGateway),
                amount_
            );

            lineaGateway.bridgeToken(lidoWstEth, amount_, recipient_);

            return abi.encode(LINEA_CHAIN_ID, amount_);
        }
        ```

    j) ***_bridgeToZkSync*** - Handles the Bridging Logic to zkSync.

        ```sol
        function _bridgeToZkSync(
            uint256 bridgeFee,
            bytes memory data
        ) internal returns (bytes memory) {
            (
                address recipient_,
                address refundRecipient_,
                uint256 amount_,
                uint256 _l2TxGasLimit
            ) = abi.decode(data, (address, address, uint256, uint256));

            if (amount_ == type(uint256).max)
                amount_ = IERC20(lidoStETH).balanceOf(address(this));
            amount_ = convertToWstEth(amount_);

            IERC20(lidoWstEth).safeIncreaseAllowance(
                address(zksyncGateway),
                amount_
            );

            bytes32 l2TxHash = zksyncGateway.deposit{value: bridgeFee}(
                recipient_,
                lidoWstEth,
                amount_,
                _l2TxGasLimit,
                800,
                refundRecipient_
            );

            return abi.encode(ZKSYNC_CHAIN_ID, amount_, l2TxHash);
        }
        ```

    k) ***_bridgeToScroll*** - Handles the Bridging Logic to Scroll.

        ```sol
        function _bridgeToScroll(
            uint256 bridgeFee,
            bytes memory data
        ) internal returns (bytes memory) {
            (address recipient_, uint256 amount_) = abi.decode(
                data,
                (address, uint256)
            );

            if (amount_ == type(uint256).max)
                amount_ = IERC20(lidoStETH).balanceOf(address(this));
            amount_ = convertToWstEth(amount_);

            IERC20(lidoWstEth).safeIncreaseAllowance(
                address(scrollGateway),
                amount_
            );

            scrollGateway.depositERC20{value: bridgeFee}(
                lidoWstEth,
                recipient_,
                amount_,
                180000
            );

            return abi.encode(SCROLL_CHAIN_ID, amount_);
        }
        ```    

    l) ***convertToWstEth*** - Converts StEth to WstEth.

        ```sol
        function convertToWstEth(uint256 amount) internal returns (uint256) {
            IERC20(lidoStETH).safeIncreaseAllowance(lidoWstEth, amount);
            uint256 wstEthBalBefore = IERC20(lidoWstEth).balanceOf(address(this));
            IWstEth(lidoWstEth).wrap(amount);
            amount = IERC20(lidoWstEth).balanceOf(address(this)) - wstEthBalBefore;

            if (amount == 0) revert(Errors.INVALID_AMOUNT);
            return amount;
        }
        ```

    m) ***getBridgeFee*** - Calculates the Bridge Fee for Different Chains.

        ```sol
        function getBridgeFee(
            uint256 chainId,
            bytes memory data
        ) internal view returns (uint256) {
            if (chainId == ARBITRUM_CHAIN_ID) {
                (
                    ,
                    ,
                    uint256 maxGas_,
                    uint256 gasPriceBid_,
                    uint256 maxSubmissionCost_
                ) = abi.decode(data, (address, uint256, uint256, uint256, uint256));

                return maxSubmissionCost_ + maxGas_ * gasPriceBid_;
            } else if (chainId == ZKSYNC_CHAIN_ID) {
                (, , , uint256 _l2TxGasLimit) = abi.decode(
                    data,
                    (address, address, uint256, uint256)
                );

                return
                    zkSyncBridge.l2TransactionBaseCost(
                        tx.gasprice,
                        _l2TxGasLimit,
                        800
                    );
            } else if (chainId == SCROLL_CHAIN_ID) {
                return scrollMessageQueue.estimateCrossDomainMessageFee(180000);
            } else return 0;
        }
        ```    

    n) ***Fallback Function*** - The fallback function to Receive ETH.

        ```sol
        receive() external payable {}
        ```    

- **Usage** - To use the `DexSpanAdapter`, Deploy the Contract with the required Parameters -     

    1. ***Deploy the Contract*** - Deploy the LidoStakeEth contract on the Ethereum network by providing the required constructor arguments.
   
    2. ***Execute Staking and Bridging*** - Use the Execute function to Stake ETH and Optionally Bridge the resulting StEth to another Chain. The Execute function takes a Data Parameter that includes the ecipient address, amount, Bridge Chain ID, and Bridge-Specific Data.

        ```sol
        function execute(
            bytes calldata data
        ) external payable override returns (address[] memory tokens);
        ```

    3. ***Bridge Functions*** - The contract includes functions for bridging to different chains. Each chain-specific bridging function is called internally by the _bridge function based on the provided chain ID.


#### Conclusion

The `LidoStakeEth` Contract Provides a Comprehensive Solution for Staking ETH on Lido and Bridging the Resulting StEth to various Layer 2 and Sidechain Networks. By Understanding the Structure and functions of this Contract, Developers can Integrate Lido Staking and Bridging Capabilities into their Decentralized Applications.

