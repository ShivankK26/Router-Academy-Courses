---
sidebar_position: 5
---

# Module 5: About Bridge Adapters

## Adapters for Bridging Assets

This Module is Useful for Understanding the `AssetBridgeAdapter.sol` and `NitroAdapter.sol` Smart Contracts which are helpful for learning about Bridging Adapters.

### Asset Bridge Adapter

This Tutorial will Guide you through the functionality of the `AssetBridgeAdapter.sol` Smart Contract. This Contract is Designed to Bridge Funds and Instructions to another Blockchain. It Utilizes the `RouterIntentEoaAdapterWithoutDataProvider` for Executing Transactions and Interacting with an AssetBridge for Transferring or Swapping Tokens.

- **Contract Structure** - The `AssetBridgeAdapter` Contract inherits from `RouterIntentEoaAdapterWithoutDataProvider` and Integrates with an `AssetBridge` for Asset Bridging Operations. It uses `SafeERC20` for Secure Token Operations and follows a Structure that Separates Data Storage (`AssetBridgeDataStore`) from the Main Adapter Logic. The Contract imports Several Dependencies -

    a) `RouterIntentEoaAdapterWithoutDataProvider` and `EoaExecutorWithoutDataProvider` from `@routerprotocol/intents-core`.

    b) `Errors` for error handling.

    c) `IERC20` and `SafeERC20` from a utilities library.

    d) `IAssetBridge` interface.

    e) `Ownable` from `OpenZeppelin` for access control.

- **Data Storage Contract** - The `AssetBridgeDataStore` Contract Stores the Address of the `AssetBridge` and allows the Owner to Update it.
 
    ```sol
    contract AssetBridgeDataStore is Ownable {
        address public assetBridge;

        constructor(address _owner, address _assetBridge) {
            _transferOwnership(_owner);
            assetBridge = _assetBridge;
        }

        function setAssetBridge(address _assetBridge) external onlyOwner {
            assetBridge = _assetBridge;
        }
    }
    ```

- **Main Adapter Contract** - The `AssetBridgeAdapter` Contract Defines - 

    a) `assetBridgeDataStore` to Store `AssetBridge` Address.

    b) `PARTNER_ID` as a Constant Identifier.

    c) A Constructor to Initialize the Contract and Deploy `AssetBridgeDataStore`.

    d) `name()` function to return the Adapter's Name.

    e) `execute()` function to hHndle the Execution Logic for Bridging Tokens.

    ```sol
    contract AssetBridgeAdapter is RouterIntentEoaAdapterWithoutDataProvider {
        using SafeERC20 for IERC20;

        AssetBridgeDataStore public immutable assetBridgeDataStore;
        uint256 public constant PARTNER_ID = 1;

        constructor(
            address __native,
            address __wnative,
            address __assetBridge
        )
            RouterIntentEoaAdapterWithoutDataProvider(__native, __wnative)
        {
            assetBridgeDataStore = new AssetBridgeDataStore(
                msg.sender,
                __assetBridge
            );
        }

        function name() public pure override returns (string memory) {
            return "AssetBridgeAdapter";
        }

        function execute(
            bytes calldata data
        ) external payable override returns (address[] memory tokens) {
            // implementation details
        }
    }
    ```

- **Deployment** - To Deploy the `AssetBridgeAdapter`, you need to Provide the Addresses for Native and Wrapped Native Tokens, as well as the `AssetBridge` Contract.

    ```sol
    address __native = 0x...;  // Native token address
    address __wnative = 0x...; // Wrapped native token address
    address __assetBridge = 0x...; // AssetBridge contract address

    AssetBridgeAdapter adapter = new AssetBridgeAdapter(__native, __wnative, __assetBridge);
    ```

- **Functions** -

    a) ***name()*** - This function returns the name of the Adapter.

        ```sol
        function name() public pure override returns (string memory) {
            return "AssetBridgeAdapter";
        }
        ```

    b) ***execute()*** - The `execute` function Performs the following Actions Based on the `txType` Decoded from the Input Data -

        ```sol
        function execute(
            bytes calldata data
        ) external payable override returns (address[] memory tokens) {
            // Implementation details
        }
        ```

    1. Transfer Token
    - Directly transfers tokens using `IAssetBridge.transferToken`.
    2. Swap and Transfer Token
    - Swaps and then transfers tokens using `IAssetBridge.swapAndTransferToken`.

- **Usage Example** - To Use the `AssetBridgeAdapter`, you need to Call the Execute function with appropriate calldata.

  1. ***Example: Transfer Token***

      ```sol
      bytes memory data = abi.encode(
          uint8(0),  // txType for transfer
          IAssetBridge.TransferPayload({ /* payload details */ }),
          uint64(21000),  // Destination gas limit
          bytes("")  // Optional instruction
      );

      adapter.execute{value: amount}(data);
      ```

  2. ***Example: Swap and Transfer Token***

      ```sol
      bytes memory data = abi.encode(
          uint8(1),  // txType for swap and transfer
          IAssetBridge.SwapTransferPayload({ /* payload details */ }),
          uint64(21000),  // Destination gas limit
          bytes("")  // Optional instruction
      );

      adapter.execute{value: amount}(data);
      ```

#### Conclusion

The `AssetBridgeAdapter` Contract Provides a Robust Solution for Bridging Assets and Instructions across Chains. By following this Documentation, Developers can understand the Contract's Structure, deploy it, and use its functions effectively.


### NitroAdapter

This Tutorial will Guide you through the functionality and Usage of the `NitroAdapter` Smart Contract. The `NitroAdapter` Contract is Designed to facilitate the Bridging of Assets and Instructions to another Blockchain. It Integrates with Both an `AssetForwarder` and `DexSpan` to Perform Token Deposits and Swaps.

- **Contract Structure** - The `NitroAdapter` Contract inherits from `RouterIntentEoaAdapterWithoutDataProvider` and Interacts with `AssetForwarder` and `DexSpan` for Asset Bridging Operations. It uses `SafeERC20` for Secure Token Operations and follows a Structure that Separates Data Storage (`NitroDataStore`) from the Main Adapter Logic. The Contract imports Several Dependencies -

    a) `RouterIntentEoaAdapterWithoutDataProvider` and `EoaExecutorWithoutDataProvider` from `@routerprotocol/intents-core`.

    b) `Errors` for error handling.

    c) `IERC20` and `SafeERC20` from a utilities library.

    d) `IAssetForwarder` and `IDexSpan` interfaces.

    e) `Ownable` from `OpenZeppelin` for access control.

- **Data Storage Contract** - The `NitroDataStore` Contract Stores the Addresses of the `AssetForwarder` and `DexSpan` and allows the Owner to Update them.

    ```sol
    contract NitroDataStore is Ownable {
        address public assetForwarder;
        address public dexspan;

        constructor(address _owner, address _assetForwarder, address _dexspan) {
            _transferOwnership(_owner);
            assetForwarder = _assetForwarder;
            dexspan = _dexspan;
        }

        function setDexSpan(address _dexspan) external onlyOwner {
            dexspan = _dexspan;
        }

        function setAssetForwarder(address _assetForwarder) external onlyOwner {
            assetForwarder = _assetForwarder;
        }
    }
    ```

- **Main Adapter Contract** - The `NitroAdapter` Contract Defines -

    a) `USDC` as the address of the USDC Token.

    b) `NitroDataStore` to store `AssetForwarder` and `DexSpan` addresses.

    c) `PARTNER_ID` as a constant identifier.

    c) A constructor to initialize the Contract and deploy `NitroDataStore`.

    d) `name()` function to return the Adapter's name.

    e) `execute()` function to handle the Execution Logic for Bridging Tokens.

    ```sol
    contract NitroAdapter is RouterIntentEoaAdapterWithoutDataProvider {
        using SafeERC20 for IERC20;

        address public immutable usdc;
        NitroDataStore public immutable nitroDataStore;
        uint256 public constant PARTNER_ID = 1;

        struct SwapAndDepositData {
            uint256 partnerId;
            bytes32 destChainIdBytes;
            bytes recipient;
            address refundRecipient;
            uint256 feeAmount;
            IDexSpan.SwapParams swapData;
            bytes message;
        }

        struct UsdcCCTPData {
            uint256 partnerId;
            uint256 amount;
            bytes32 destChainIdBytes;
            bytes32 recipient;
        }

        constructor(
            address __native,
            address __wnative,
            address __assetForwarder,
            address __dexspan
        )
            RouterIntentEoaAdapterWithoutDataProvider(__native, __wnative)
        {
            nitroDataStore = new NitroDataStore(
                msg.sender,
                __assetForwarder,
                __dexspan
            );
            usdc = IAssetForwarder(__assetForwarder).usdc();
        }

        function name() public pure override returns (string memory) {
            return "NitroAdapter";
        }

        function execute(
            bytes calldata data
        ) external payable override returns (address[] memory tokens) {
            // Implementation details
        }
    }
    ```
    
- **Deployment** - To Deploy the `NitroAdapter`, you need to Provide the addresses for Native and Wrapped Native Tokens, as well as the `AssetForwarder` and `DexSpan` Contracts.

    ```sol
    address __native = 0x...;  // Native token address
    address __wnative = 0x...; // Wrapped native token address
    address __assetForwarder = 0x...; // AssetForwarder contract address
    address __dexspan = 0x...; // DexSpan contract address

    NitroAdapter adapter = new NitroAdapter(__native, __wnative, __assetForwarder, __dexspan);
    ```

- **Functions** -

    a) ***name()*** - This function returns the name of the Adapter.

        ```sol
        function name() public pure override returns (string memory) {
            return "NitroAdapter";
        }
        ```

    b) ***execute()*** - The `execute` function Performs the following Actions Based on the `txType` Decoded from the Input Data -

        ```sol
        function execute(
            bytes calldata data
        ) external payable override returns (address[] memory tokens) {
            // Implementation details
        }
        ```

    1. iDeposit
        - Directly Deposits Tokens using `IAssetForwarder.iDeposit`.
    2. Swap and Deposit
        - Swaps and then Deposits Tokens using `IDexSpan.swapAndDeposit`.
    3. USDC Request
        - Requests USDC Deposit using `IAssetForwarder.iDepositUSDC`.
    4. Swap and Deposit USDC
        - Swaps and then Deposits USDC Tokens using `IDexSpan.swapAndDeposit`.

- **Usage Example** - To use the `NitroAdapter`, you need to Call the execute function with appropriate calldata.

  1. ***Example: iDeposit***

      ```sol
      bytes memory data = abi.encode(
          uint8(0),  // txType for iDeposit
          IAssetForwarder.DepositData({ /* payload details */ }),
          bytes("destinationToken"),  // Destination token
          bytes("recipientAddress"),  // Recipient address
          bytes("")  // Optional message
      );

      adapter.execute{value: amount}(data);
      ```

  2. ***Example: Swap and Deposit***

      ```sol
      bytes memory data = abi.encode(
          uint8(1),  // txType for swap and deposit
          SwapAndDepositData({ /* payload details */ }),
          bytes("")  // Optional message
      );

      adapter.execute{value: amount}(data);
      ```

  3. ***Example: USDC Request***

      ```sol
      bytes memory data = abi.encode(
          uint8(2),  // txType for USDC request
          UsdcCCTPData({ /* payload details */ })
      );

      adapter.execute(data);
      ```

  4. ***Example: Swap and Deposit USDC***

      ```sol
      bytes memory data = abi.encode(
          uint8(3),  // txType for swap and deposit USDC
          SwapAndDepositData({ /* payload details */ })
      );

      adapter.execute{value: amount}(data);
      ```    

#### Conclusion

The `NitroAdapter` Contract provides a Robust Solution for Bridging Assets and Instructions across Chains. By following this Documentation, Developers can Understand the Contract's Structure, Deploy it, and use its functions Effectively. 