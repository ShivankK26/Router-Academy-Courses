---
sidebar_position: 6
---

# Module 6: About Swap Adapters

## Adapters for Swapping Assets

This Module is Useful for Understanding the ***ThirdFy*** and ***DexSpan*** Adapters which are important for Learning about Swapping Adapters.

### DexSpan Adapter

The `DexSpanAdapter` Smart Contract is Designed to facilitate Token Swaps using the `DexSpan` Contract. This Document Provides a Comprehensive Guide to Understanding and using the `DexSpanAdapter`.

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

    f) ***Usage*** - To use the `DexSpanAdapter`, Deploy the Contract with the required Parameters -     

      1. Native Token Address
      2. Wrapped Native Token Address
      3. DexSpan Contract Address

    After Deployment, you can call the execute function with the appropriate Input Data to Perform Token Swaps.

    g) ***Error Handling*** - The `DexSpanAdapter` Contract uses the `Errors` library to handle Various error Scenarios, such as Insufficient Native funds.    

#### Conclusion

The `DexSpanAdapter` Smart Contract Simplifies Token Swaps using the `DexSpan` Protocol. By following this Documentation, you should be able to Understand and Utilize the Contract effectively.


### ThirdFy Adapter

