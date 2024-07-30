---
sidebar_position: 18
---

# Module 8: About Perps Adapters

## Adapters for Perps

This Module is Useful for Understanding the ***Parifi*** Adapter which is important for Learning about Perp Adapters. Refer [this](https://github.com/router-protocol/router-intents-eoa-adapters/tree/main/evm/contracts/intent-adapters/perps/Parifi) Repository for Smart Contracts.

### Perps Adapter

Welcome to the `ParifiFairsale` Smart Contract Tutorial! This Guide will help you Understand the functionality of the `ParifiFairsale` Contract, its Purpose, and how to Interact with it. By the end of this Tutorial, you will have a Good Understanding of how to Participate in the Parifi Fairsale for PRF Tokens using this Contract.

- **Contract Structure** - The `ParifiFairsale` Contract is Designed to facilitate Participation in the Parifi Fairsale for PRF Tokens. This Contract Leverages the `RouterIntentEoaAdapterWithoutDataProvider` from the Router Protocol, ensuring Seamless Integration and Interaction with Parifi. The `ParifiFairsale` Contract inherits from `RouterIntentEoaAdapterWithoutDataProvider` and Utilizes various Interfaces and Libraries to ensure Safe and Efficient tToken Transfers.

  a) ***RouterIntentEoaAdapterWithoutDataProvider and EoaExecutorWithoutDataProvider:*** Contracts from the Router Protocol.

  b) ***IERC20 and SafeERC20:*** Interface and Library for ERC20 Token Operations.

  c) ***Errors:*** Utility Contract for Standardized Error messages.

  d) ***Interfaces:*** The Contract Defines the `IParifiFairsale` Interface to Interact with the Parifi Fairsale Contract.

    ```sol
    interface IParifiFairsale {
        function depositFor(
            uint256 amount,
            address recipient
        ) external returns (uint256 tokenAmount);

        function stable() external view returns (IERC20);
    }
    ```    

  e) ***State Variables:*** The Contract Defines the following Immutable State Variables - 

    - ***parifiFairsaleContract:*** The Address of the Parifi Fairsale Contract.

    - ***stable:*** The Address of the Stable Token accepted by the Parifi Fairsale Contract.

- **Functions** - 

    a) ***constructor()*** - The Constructor initializes the Contract with the addresses of the Native Token, Wrapped Native Token, and Parifi Fairsale Contract.

    ```sol
    constructor(
        address __native,
        address __wnative,
        address __parifiFairsaleContract
    ) RouterIntentEoaAdapterWithoutDataProvider(__native, __wnative) {
        parifiFairsaleContract = IParifiFairsale(__parifiFairsaleContract);
        stable = parifiFairsaleContract.stable();
    }
    ```

    b) ***name()*** - Returns the name of the Contract.

    ```sol
    function name() public pure override returns (string memory) {
        return "ParifiFairsale";
    }
    ```

    c) ***execute()*** - Executes the Deposit Operation by Parsing the Input Data, Transferring the required amount of Tokens, and Calling the `_depositIntoParifi` function.

    ```sol
    function execute(
        bytes calldata data
    ) external payable override returns (address[] memory tokens) {
        (address recipient, uint256 amount) = parseInputs(data);

        // If the adapter is called using `call` and not `delegatecall`
        if (address(this) == self()) {
            stable.safeTransferFrom(msg.sender, self(), amount);
        } else if (amount == type(uint256).max)
            amount = stable.balanceOf(address(this));

        bytes memory logData;

        (tokens, logData) = _depositIntoParifi(amount, recipient);

        emit ExecutionEvent(name(), logData);

        return tokens;
    }
    ```

    d) ***_depositIntoParifi()*** - Handles the actual Deposit of Funds into the Parifi Fairsale Contract.

    ```sol
    function _depositIntoParifi(
        uint256 amount,
        address recipient
    ) internal returns (address[] memory tokens, bytes memory logData) {
        stable.safeIncreaseAllowance(address(parifiFairsaleContract), amount);

        uint256 prfTokenAmount = parifiFairsaleContract.depositFor(
            amount,
            recipient
        );

        tokens = new address ;
        tokens[0] = address(stable);

        logData = abi.encode(amount, prfTokenAmount);
    }
    ```

    e) ***parseInputs()*** - Parses the Input Data.

    ```sol
    function parseInputs(
        bytes memory data
    ) public pure returns (address, uint256) {
        return abi.decode(data, (address, uint256));
    }
    ```

    f) ***ExecutionEvent()*** - Emitted when an execution Occurs.

    ```sol
    event ExecutionEvent(string indexed name, bytes data);
    ```


- **Usage** - To use the `DexSpanAdapter`, Deploy the Contract with the required Parameters -     

    1. ***Deploying the Contract*** - To Deploy the `ParifiFairsale` Contract, you will need to Provide the Addresses of the Native Token, Wrapped Native Token, and Parifi Fairsale Contract.
   
    2. ***Supplying Funds*** - To Participate in the Parifi Fairsale using this Contract, Call the execute function with the appropriate Input Data, including the recipient and Amount. For Example - 

        ```sol
        bytes memory data = abi.encode(recipientAddress, amount);
        parifiFairsaleContract.execute(data);
        ```

#### Conclusion

The `ParifiFairsale` Contract Simplifies the Process of Participating in the Parifi Fairsale for PRF Tokens. By Understanding and following this Tutorial, you should be able to Interact with the Contract effectively and Leverage its functionality to Manage your assets in the Fairsale.

