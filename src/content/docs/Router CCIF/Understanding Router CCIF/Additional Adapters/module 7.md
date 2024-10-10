---
title: Module 7 - About Lending/Borrowing Adapters
description: Get Started with Router Academy.
---

## Adapters for Lending/Borrowing

This Module is Useful for Understanding the ***Benqi*** Adapter which is important for Learning about Lending/Borrowing Adapters. Refer [this](https://github.com/router-protocol/router-intents-eoa-adapters/tree/main/evm/contracts/intent-adapters/lending-borrowing) Repository for Smart Contracts.

### Benqi Adapter

The `BenqiSupply` Smart Contract Tutorial! This Guide will help you Understand the functionality of the `BenqiSupply` Contract, its Purpose, and how to Interact with it. By the end of this Tutorial, you will have a Good Understanding of how to Supply funds to `Benqi` using this Contract.

- **Contract Structure** - The `BenqiSupply` Contract is Designed to facilitate the Supply of funds to the Benqi Protocol on the Avalanche Blockchain. This Contract leverages the `RouterIntentEoaAdapterWithoutDataProvider` from the Router Protocol, ensuring Seamless Integration and Interaction with Benqi.

  a) ***IBenqiPool:*** Interface for the Benqi Pool.

  b) ***RouterIntentEoaAdapterWithoutDataProvider and EoaExecutorWithoutDataProvider:*** Contracts from the Router Protocol.

  c) ***Errors:*** Utility Contract for Standardized Error messages.

  d) ***IERC20 and SafeERC20:*** Interface and Library for ERC20 Token Operations.

  e) ***SafeMath:*** Library for Safe Mathematical Operations.

  f) ***qiToken:*** The address of the QiToken (Benqi's interest-bearing Token) Contract.

- **Functions** - 

    a) ***constructor()*** - The Constructor initializes the Contract with the addresses of the Native Token, Wrapped Native Token, and QiToken.

    ```sol
    constructor(
        address __native,
        address __wnative,
        address __qiToken
    ) RouterIntentEoaAdapterWithoutDataProvider(__native, __wnative) {
        qiToken = __qiToken;
    }
    ```

    b) ***name()*** - Returns the name of the Contract.

    ```sol
    function name() public pure override returns (string memory) {
        return "BenqiSupply";
    }
    ```

    c) ***execute()*** - Executes the Supply Operation by Parsing the Input Data, Transferring the required Amount of Tokens, and Calling the `_benqiSupply` function.

    ```sol
    function execute(bytes calldata data) external payable override returns (address[] memory tokens) {

        (address _asset, address _recipient, uint256 _amount) = parseInputs(data);

        if (address(this) == self()) {
            if (_asset == native())
                require(
                    msg.value == _amount,
                    Errors.INSUFFICIENT_NATIVE_FUNDS_PASSED
                );
            else IERC20(_asset).safeTransferFrom(msg.sender, self(), _amount);
        } else if (_amount == type(uint256).max)
            _amount = getBalance(_asset, address(this));

        bytes memory logData;

        (tokens, logData) = _benqiSupply(_asset, _recipient, _amount);

        emit ExecutionEvent(name(), logData);
        return tokens;
    }
    ```

    d) ***_benqiSupply()*** - Handles the actual Supply of funds to the Benqi Protocol.

    ```sol
    function _benqiSupply(
        address asset,
        address recipient,
        uint256 amount
    ) private returns (address[] memory tokens, bytes memory logData) {

        uint256 qiTokenAmountBefore = getBalance(qiToken, address(this));

        if (asset == native()) IBenqiPool(qiToken).mint{value: amount}();
        else {
            IERC20(asset).safeIncreaseAllowance(qiToken, amount);
            IBenqiPool(qiToken).mint(amount);
        }

        uint256 qiTokenAmountReceived = getBalance(qiToken, address(this)).sub(
            qiTokenAmountBefore
        );

        withdrawTokens(qiToken, recipient, qiTokenAmountReceived);

        tokens = new address ;
        tokens[0] = asset;
        tokens[1] = qiToken;

        logData = abi.encode(asset, recipient, amount);
    }
    ```

    e) ***parseInputs()*** - Parses the Input Data.

    ```sol
    function parseInputs(
        bytes memory data
    ) public pure returns (address, address, uint256) {
        return abi.decode(data, (address, address, uint256));
    }
    ```

    f) ***ExecutionEvent()*** - Emitted when an execution Occurs.

    ```sol
    event ExecutionEvent(string indexed name, bytes data);
    ```

- **Usage** - To use the `DexSpanAdapter`, Deploy the Contract with the required Parameters -     

    1. ***Deploying the Contract*** - To Deploy the `BenqiSupply` Contract, you will need to Provide the addresses of the Native Token, Wrapped Native Token, and QiToken.
   
    2. ***Supplying Funds*** - To Supply funds to `Benqi` using this Contract, call the `execute` function with the appropriate Input Data, including the Asset, Recipient, and Amount. For Example -

        ```sol
        bytes memory data = abi.encode(assetAddress, recipientAddress, amount);
        benqiSupplyContract.execute{value: amount}(data);
        ```

#### Conclusion

The `BenqiSupply` Contract Simplifies the Process of Supplying funds to the Benqi Protocol. By Understanding and following this Tutorial, you should be able to Interact with the Contract effectively and Leverage its functionality to Manage your Assets on Benqi.
