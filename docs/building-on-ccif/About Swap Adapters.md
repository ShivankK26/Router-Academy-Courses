---
sidebar_position: 6
---

# Module 6: About Swap Adapters

## Adapters for Swapping Assets

This Module is Useful for Understanding the ***ThirdFy*** and ***DexSpan*** Adapters which are important for Learning about Swapping Adapters. Refer [this](https://github.com/router-protocol/router-intents-eoa-adapters/tree/main/evm/contracts/intent-adapters/swap) Repository for Smart Contracts.

### DexSpan Adapter

The `DexSpanAdapter` Smart Contract is Designed to facilitate Token Swaps using the `DexSpan` Contract. This Tutorial Provides a Comprehensive Guide to Understanding and using the `DexSpanAdapter`.

- **Contract Structure** - The `DexSpanDataStore` Contract is used to Store the address of the DexSpan Contract. It Inherits from OpenZeppelin's Ownable Contract for Ownership Management. The Contract imports Several Dependencies -

    ```sol
    contract DexSpanDataStore is Ownable {
    address public dexspan;

        constructor(address _owner, address _dexspan) {
            _transferOwnership(_owner);
            dexspan = _dexspan;
        }

        function setDexSpan(address _dexspan) external onlyOwner {
            dexspan = _dexspan;
        }
    }   
    ```

- **DexSpanAdapter** - The `DexSpanAdapter` Contract Inherits from `RouterIntentEoaAdapterWithoutDataProvider` and implements the `EoaExecutorWithoutDataProvider` Interface. It Provides functionality for Swapping Tokens using the DexSpan Contract.

    ```sol
        contract DexSpanAdapter is RouterIntentEoaAdapterWithoutDataProvider {
        using SafeERC20 for IERC20;

        DexSpanDataStore public immutable dexSpanDataStore;

        constructor(
            address __native,
            address __wnative,
            address __dexspan
        ) RouterIntentEoaAdapterWithoutDataProvider(__native, __wnative) {
            dexSpanDataStore = new DexSpanDataStore(msg.sender, __dexspan);
        }

        function name() public pure override returns (string memory) {
            return "DexSpanAdapter";
        }

        function execute(
            bytes calldata data
        ) external payable override returns (address[] memory tokens) {
            IDexSpan.SameChainSwapParams memory swapData = parseInputs(data);

            if (address(this) == self()) {
                if (address(swapData.tokens[0]) != native())
                    swapData.tokens[0].safeTransferFrom(
                        msg.sender,
                        self(),
                        swapData.amount
                    );
                else
                    require(
                        msg.value == swapData.amount,
                        Errors.INSUFFICIENT_NATIVE_FUNDS_PASSED
                    );
            } else if (swapData.amount == type(uint256).max) {
                if (address(swapData.tokens[0]) != native())
                    swapData.amount = swapData.tokens[0].balanceOf(address(this));
                else swapData.amount = address(this).balance;
            }

            bytes memory logData;
            (tokens, logData) = _swap(swapData);

            emit ExecutionEvent(name(), logData);
            return tokens;
        }

        function _swap(
            IDexSpan.SameChainSwapParams memory _swapData
        ) internal returns (address[] memory tokens, bytes memory logData) {
            address dexspan = dexSpanDataStore.dexspan();

            withdrawTokens(address(_swapData.tokens[0]), dexspan, _swapData.amount);

            IDexSpan(dexspan).swapInSameChain(
                _swapData.tokens,
                _swapData.amount,
                _swapData.minReturn,
                _swapData.flags,
                _swapData.dataTx,
                true,
                _swapData.recipient,
                _swapData.widgetId
            );

            tokens = new address ;
            tokens[0] = address(_swapData.tokens[0]);
            tokens[1] = address(_swapData.tokens[_swapData.tokens.length - 1]);

            logData = abi.encode(_swapData.tokens, _swapData.amount);
        }

        function parseInputs(
            bytes memory data
        ) public pure returns (IDexSpan.SameChainSwapParams memory) {
            IDexSpan.SameChainSwapParams memory swapData = abi.decode(
                data,
                (IDexSpan.SameChainSwapParams)
            );

            return swapData;
        }
    }
    ```

- **Functions** - 

    a) ***Constructor()*** - The Constructor initializes the `DexSpanDataStore` with the Owner's address and the `DexSpan` Contract Address. It also Sets the Native and Wrapped Native Token Addresses.

        ```sol
        constructor(
            address __native,
            address __wnative,
            address __dexspan
        ) RouterIntentEoaAdapterWithoutDataProvider(__native, __wnative) {
            dexSpanDataStore = new DexSpanDataStore(msg.sender, __dexspan);
        }
        ```

    b) ***name()*** - The `name` function returns the name of the Adapter.

        ```sol
        function name() public pure override returns (string memory) {
            return "DexSpanAdapter";
        }
        ```

    c) ***execute()*** - The `execute` function is the main entry point for performing Token Swaps. It Decodes the Input Data, performs necessary Token Transfers, and Calls the `_swap` function.

        ```sol
        function execute (bytes calldata data) external payable override returns (address[] memory tokens) {
            IDexSpan.SameChainSwapParams memory swapData = parseInputs(data);

            if (address(this) == self()) {
                if (address(swapData.tokens[0]) != native())
                    swapData.tokens[0].safeTransferFrom(
                        msg.sender,
                        self(),
                        swapData.amount
                    );
                else
                    require(
                        msg.value == swapData.amount,
                        Errors.INSUFFICIENT_NATIVE_FUNDS_PASSED
                    );
            } else if (swapData.amount == type(uint256).max) {
                if (address(swapData.tokens[0]) != native())
                    swapData.amount = swapData.tokens[0].balanceOf(address(this));
                else swapData.amount = address(this).balance;
            }

            bytes memory logData;
            (tokens, logData) = _swap(swapData);

            emit ExecutionEvent(name(), logData);
            return tokens;
        }
        ```

    d) ***_swap*** - The `_swap` function Performs the actual Token Swap using the `DexSpan` Contract.

        ```sol
        function _swap(IDexSpan.SameChainSwapParams memory _swapData) internal returns (address[] memory tokens, bytes memory logData) {
            address dexspan = dexSpanDataStore.dexspan();

            withdrawTokens(address(_swapData.tokens[0]), dexspan, _swapData.amount);

            IDexSpan(dexspan).swapInSameChain(
                _swapData.tokens,
                _swapData.amount,
                _swapData.minReturn,
                _swapData.flags,
                _swapData.dataTx,
                true,
                _swapData.recipient,
                _swapData.widgetId
            );

            tokens = new address ;
            tokens[0] = address(_swapData.tokens[0]);
            tokens[1] = address(_swapData.tokens[_swapData.tokens.length - 1]);

            logData = abi.encode(_swapData.tokens, _swapData.amount);
        }
        ```        

    e) ***parseInputs*** - The `parseInputs` function Decodes the Input Data into a `SameChainSwapParams` Struct.   

        ```sol
        function parseInputs(
            bytes memory data
        ) public pure returns (IDexSpan.SameChainSwapParams memory) {
            IDexSpan.SameChainSwapParams memory swapData = abi.decode(
                data,
                (IDexSpan.SameChainSwapParams)
            );

            return swapData;
        }
        ```

- **Usage** - To use the `DexSpanAdapter`, Deploy the Contract with the required Parameters -     

    1. Native Token Address
    2. Wrapped Native Token Address
    3. DexSpan Contract Address

    After Deployment, you can call the execute function with the appropriate Input Data to Perform Token Swaps.

- **Error Handling** - The `DexSpanAdapter` Contract uses the `Errors` library to handle Various error Scenarios, such as Insufficient Native funds.    

#### Conclusion

The `DexSpanAdapter` Smart Contract Simplifies Token Swaps using the `DexSpan` Protocol. By following this Tutorial, you should be able to Understand and Utilize the Contract effectively.


### ThirdFy Adapter

The ThirdFySwap Smart Contract facilitates Token Swaps using the ThirdFy Protocol. This Tutorial provides an in-depth Guide to Understanding and using the ThirdFySwap Contract. 

- **Contract Structure** - The `ThirdFySwap` Smart Contract enables Token Swaps via the ThirdFy Protocol. It extends `RouterIntentEoaAdapterWithoutDataProvider` and Utilizes `SafeERC20` for Safe Token Operations and `ThirdFyHelpers` for Helper functions.

    a) ***ThirdFyHelpers***
      - The `ThirdFyHelpers` Contract provides Utility functions for Interacting with the ThirdFy Protocol. It should be Deployed with the Swap Router Address.

    b) ***ThirdFySwap***
      -  The `ThirdFySwap` Contract is the Main Contract that handles Token Swaps using the ThirdFy Protocol. It Inherits from `RouterIntentEoaAdapterWithoutDataProvider` and `ThirdFyHelpers`.

```sol
contract ThirdFySwap is RouterIntentEoaAdapterWithoutDataProvider, ThirdFyHelpers {
    using SafeERC20 for IERC20;

        constructor(
            address __native,
            address __wnative,
            address __swapRouter
        )
            RouterIntentEoaAdapterWithoutDataProvider(__native, __wnative)
            ThirdFyHelpers(__swapRouter)
        {
        }

        function name() public pure override returns (string memory) {
            return "ThirdFySwap";
        }

        function execute(
            bytes calldata data
        ) external payable override returns (address[] memory tokens) {
            IThirdFySwapRouter.ExactInputSingleParams memory swapParams = parseInputs(data);

            if (address(this) == self()) {
                if (swapParams.tokenIn != native())
                    IERC20(swapParams.tokenIn).safeTransferFrom(
                        msg.sender,
                        self(),
                        swapParams.amountIn
                    );
                else
                    require(
                        msg.value == swapParams.amountIn,
                        Errors.INSUFFICIENT_NATIVE_FUNDS_PASSED
                    );
            } else {
                if (swapParams.amountIn == type(uint256).max)
                    swapParams.amountIn = getBalance(
                        swapParams.tokenIn,
                        address(this)
                    );
            }

            if (swapParams.tokenIn == native()) {
                convertNativeToWnative(swapParams.amountIn);
                swapParams.tokenIn = wnative();
            }

            IERC20(swapParams.tokenIn).safeIncreaseAllowance(
                address(swapRouter),
                swapParams.amountIn
            );

            bytes memory logData;

            (tokens, logData) = _mint(swapParams);

            emit ExecutionEvent(name(), logData);
            return tokens;
        }

        function _mint(
            IThirdFySwapRouter.ExactInputSingleParams memory swapParams
        ) internal returns (address[] memory tokens, bytes memory logData) {
            (uint256 amountOut) = swapRouter.exactInputSingle(swapParams);

            tokens = new address ;
            tokens[0] = swapParams.tokenIn;
            tokens[1] = swapParams.tokenOut;

            logData = abi.encode(swapParams, amountOut);
        }

        function parseInputs(
            bytes memory data
        )
            public
            pure
            returns (IThirdFySwapRouter.ExactInputSingleParams memory)
        {
            return
                abi.decode(data, (IThirdFySwapRouter.ExactInputSingleParams));
        }

        receive() external payable {}
    }
```

- **Functions** -

    a) ***constructor()*** - The Constructor initializes the Contract with Native Token, Wrapped Native Token, and Swap Router Addresses.

        ```sol
        constructor(
            address __native,
            address __wnative,
            address __swapRouter
        )
            RouterIntentEoaAdapterWithoutDataProvider(__native, __wnative)
            ThirdFyHelpers(__swapRouter)
        {
        }
        ```

    b) ***name()*** - The name function returns the name of the Adapter.

        ```sol
        function name() public pure override returns (string memory) {
            return "ThirdFySwap";
        }
        ``` 

    c) ***execute()*** - The `execute` function performs the Token Swap by Parsing Input Data, handling Token Transfers, and calling the `_mint` function. 

        ```sol
        function execute(
            bytes calldata data
        ) external payable override returns (address[] memory tokens) {
            IThirdFySwapRouter.ExactInputSingleParams memory swapParams = parseInputs(data);

            if (address(this) == self()) {
                if (swapParams.tokenIn != native())
                    IERC20(swapParams.tokenIn).safeTransferFrom(
                        msg.sender,
                        self(),
                        swapParams.amountIn
                    );
                else
                    require(
                        msg.value == swapParams.amountIn,
                        Errors.INSUFFICIENT_NATIVE_FUNDS_PASSED
                    );
            } else {
                if (swapParams.amountIn == type(uint256).max)
                    swapParams.amountIn = getBalance(
                        swapParams.tokenIn,
                        address(this)
                    );
            }

            if (swapParams.tokenIn == native()) {
                convertNativeToWnative(swapParams.amountIn);
                swapParams.tokenIn = wnative();
            }

            IERC20(swapParams.tokenIn).safeIncreaseAllowance(
                address(swapRouter),
                swapParams.amountIn
            );

            bytes memory logData;

            (tokens, logData) = _mint(swapParams);

            emit ExecutionEvent(name(), logData);
            return tokens;
        }
        ```   

    d) ***_mint()*** - The `_mint` function Performs the actual Token Swap using the `swapRouter`.    

        ```solidity
        function _mint(
            IThirdFySwapRouter.ExactInputSingleParams memory swapParams
        ) internal returns (address[] memory tokens, bytes memory logData) {
            (uint256 amountOut) = swapRouter.exactInputSingle(swapParams);

            tokens = new address ;
            tokens[0] = swapParams.tokenIn;
            tokens[1] = swapParams.tokenOut;

            logData = abi.encode(swapParams, amountOut);
        }
        ```

    e) ***parseInputs*** - The `parseInputs` function Decodes the Input Data into `ExactInputSingleParams`.   

        ```solidity
        function parseInputs(
            bytes memory data
        ) public pure returns (IThirdFySwapRouter.ExactInputSingleParams memory) {
            return abi.decode(data, (IThirdFySwapRouter.ExactInputSingleParams));
        }
        ```

    f) ***receive*** - The `receive` function allows the Contract to accept Native Token Deposits.  

        ```solidity
        receive() external payable {}
        ```    

- **Usage** - To use the `ThirdFySwap` Contract -

  1. Deploy the Contract with the Native Token, Wrapped Native Token, and Swap Router Addresses.
  2. Call the `execute` function with the appropriate Input Data to Perform a Token Swap.       

```solidity
    // Example data to be passed to the execute function
    IThirdFySwapRouter.ExactInputSingleParams memory params = IThirdFySwapRouter.ExactInputSingleParams({
        tokenIn: address(0x...),
        tokenOut: address(0x...),
        recipient: address(0x...),
        amountIn: 1000,
        amountOutMinimum: 990,
        deadline: block.timestamp + 300,
        fee: 3000,
        sqrtPriceLimitX96: 0
    });

    bytes memory data = abi.encode(params);

    thirdFySwap.execute(data);
```  

- **Error Handling** - The `ThirdFySwap` Contract uses the `Errors` library to handle various error Scenarios, such as Insufficient Native Funds.

#### Conclusion

The `ThirdFySwap` Smart Contract Simplifies Token Swaps using the ThirdFy Protocol. By following this Tutorial, you should be able to Understand and Utilize the Contract effectively. 