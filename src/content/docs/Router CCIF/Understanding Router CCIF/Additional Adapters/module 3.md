---
title: Module 3 - Different Types of Adapters in Adapter Store
description: Get Started with Router Academy.
---

## Available Adapters in Adapter Store

This Module talks about the Different Adapters available in the Intent Adapter Store and what can you Build with each Adapter.

Some of the Adapters available are - 

- **Dexspan Swap** - The Dexspan Adapter Outlines a feature that enables Users to Interact with the Nitro Dexspan Contract for the most Efficient Swaps.

- **Benqi Stake Adapter** - The Benqi Stake Adapter Outlines a feature that enables Users to do Liquid Staking in Avalanche Blockchain in AVAX Tokens.

- **StakeStone Adapter** - The StakeStone Adapter Outlines a feature that helps Users in getting an Omni-chain Liquidity Infrastructure.

- **Batch Handler** - The Batch Handler Contract acts as a Versatile Contract, enabling the execution of multiple Actions in one Transaction. It forms the Base of Router's Cross-Chain Intent Framework (CCIF), and is invoked whenever user wants to Interact with any Intent Adapter.

- **Lido Stake** - The Lido Stake Adapter Outlines a feature that helps Users to Stake ETH on Lido from any Chain. 

- **Kim AMM V4 Deposit** - The Kim Deposit Adapter Outlines a feature that enables Users Holding funds on any Compatible Chain to add Liquidity and Mint a New Position on Kim in one Step.

- **SwapMode AMM Deposit V3** - The SwapMode AMM Adapter Outlines a feature that helps us in Rising the Sun on Mode. 

- **Lynex AMM Stake** - The Lynex AMM Stake Adapter Outlines a feature that helps us in Building a self-optimizing DEX. 

- **Lynex Gamma Deposit** - The Lynex Gamma Deposit Adapter Outlines the Native Liquidity Layer of Linea.

## Interfaces & Mocks available for Adapters

Follow [this](https://github.com/router-protocol/intents-adapter-docs/tree/feat/first-draft) Repository to view the entire CodeBase.

### Interfaces

This Section Comprises of Different Interfaces which are used for Interacting while Running the Smart Contract.

- `IAssetBridge.sol` - This Smart Contract consists of Interface which Support Deposits and Deposit Execution.

    ```sol
        // SPDX-License-Identifier: MIT
        pragma solidity ^0.8.18;

        /// @title Interface for Voyager contracts that support deposits and deposit executions.
        /// @author Router Protocol.

            interface IAssetBridge {
                event TokenTransfer(
                    bytes32 indexed destChainIdBytes,
                    address indexed srcTokenAddress,
                    uint256 srcTokenAmount,
                    bytes recipient,
                    uint256 partnerId,
                    uint256 depositId
            );

            event TokenTransferWithInstruction(
                bytes32 indexed destChainIdBytes,
                address indexed srcTokenAddress,
                uint256 srcTokenAmount,
                bytes recipient,
                uint256 partnerId,
                uint64 destGasLimit,
                bytes instruction,
                uint256 depositId
            );

            event DepositReverted(
                bytes32 indexed destChainIdBytes,
                uint256 indexed depositNonce,
                address indexed sender,
                address srcSettlementToken,
                uint256 srcSettlementAmount
            );

            event Execute(
                uint8 executeType,
                bytes32 indexed sourceChainIdBytes,
                uint256 indexed depositNonce,
                address settlementToken,
                uint256 settlementAmount,
                address recipient
            );

            event ExecuteWithMessage(
                uint8 executeType,
                bytes32 indexed sourceChainIdBytes,
                uint256 indexed depositNonce,
                address settlementToken,
                uint256 settlementAmount,
                address recipient,
                bool flag,
                bytes data
            );

            struct ExecuteInfo {
                address recipient;
                address destTokenAddress;
                uint256 destTokenAmount;
                uint256 depositNonce;
            }

            struct DepositData {
                address sender;
                address srcTokenAddress;
                uint256 srcTokenAmount;
                uint256 depositNonce;
            }

            struct TransferPayload {
                bytes32 destChainIdBytes;
                address srcTokenAddress;
                uint256 srcTokenAmount;
                bytes recipient;
                uint256 partnerId;
            }
            
            struct SwapTransferPayload {
                bytes32 destChainIdBytes;
                address[] tokens; // index 0 will be src token and index n-1 will be to address
                uint256[] flags;
                bytes[] dataTx;
                uint256 srcTokenAmount;
                uint256 minToAmount;
                bytes recipient;
                uint256 partnerId;
            }

            function transferTokenWithInstruction(
                TransferPayload memory transferPayload,
                uint64 destGasLimit,
                bytes calldata instruction
            ) external payable;

            function transferToken(TransferPayload memory transferPayload) external payable;

            function swapAndTransferToken(SwapTransferPayload memory transferPayload) external payable;

            function swapAndTransferTokenWithInstruction(
                SwapTransferPayload memory transferPayload,
                uint64 destGasLimit,
                bytes calldata instruction
            ) external payable;
        }
    ```

- `IAssetForwarder.sol` - This Smart Contract consists of Interface which Support Deposits and Deposit Execution.

    ```sol
        // SPDX-License-Identifier: MIT
        pragma solidity ^0.8.18;

        /// @title Interface for handler contracts that support deposits and deposit executions.
        /// @author Router Protocol.

        interface IAssetForwarder {
            event FundsDeposited(
                uint256 partnerId,
                uint256 amount,
                bytes32 destChainIdBytes,
                uint256 destAmount,
                uint256 depositId,
                address srcToken,
                address depositor,
                bytes recipient,
                bytes destToken
            );

        event iUSDCDeposited(
            uint256 partnerId,
            uint256 amount,
            bytes32 destChainIdBytes,
            uint256 usdcNonce,
            address srcToken,
            bytes32 recipient,
            address depositor
        );

        event FundsDepositedWithMessage(
            uint256 partnerId,
            uint256 amount,
            bytes32 destChainIdBytes,
            uint256 destAmount,
            uint256 depositId,
            address srcToken,
            bytes recipient,
            address depositor,
            bytes destToken,
            bytes message
        );

        event FundsPaid(bytes32 messageHash, address forwarder, uint256 nonce);

        event DepositInfoUpdate(
            address srcToken,
            uint256 feeAmount,
            uint256 depositId,
            uint256 eventNonce,
            bool initiatewithdrawal,
            address depositor
        );

        event FundsPaidWithMessage(
            bytes32 messageHash,
            address forwarder,
            uint256 nonce,
            bool execFlag,
            bytes execData
        );

        struct DestDetails {
            uint32 domainId;
            uint256 fee;
            bool isSet;
        }

        struct RelayData {
            uint256 amount;
            bytes32 srcChainId;
            uint256 depositId;
            address destToken;
            address recipient;
        }

        struct RelayDataMessage {
            uint256 amount;
            bytes32 srcChainId;
            uint256 depositId;
            address destToken;
            address recipient;
            bytes message;
        }

        struct DepositData {
            uint256 partnerId;
            uint256 amount;
            uint256 destAmount;
            address srcToken;
            address refundRecipient;
            bytes32 destChainIdBytes;
        }

        function iDepositUSDC(
            uint256 partnerId,
            bytes32 destChainIdBytes,
            bytes32 recipient,
            uint256 amount
        ) external payable;

        function iDeposit(
            DepositData memory depositData,
            bytes memory destToken,
            bytes memory recipient
        ) external payable;

        function iDepositInfoUpdate(
            address srcToken,
            uint256 feeAmount,
            uint256 depositId,
            bool initiatewithdrawal
        ) external payable;

        function iDepositMessage(
            DepositData memory depositData,
            bytes memory destToken,
            bytes memory recipient,
            bytes memory message
        ) external payable;

        function iRelay(RelayData memory relayData) external payable;

        function iRelayMessage(RelayDataMessage memory relayData) external payable;

        function usdc() external view returns (address);

        function destDetails(
            bytes32 destChainIdBytes
        ) external view returns (DestDetails memory);
    }
    ```

- `IDexSpan.sol` - This Smart Contract consists of Interface which Supports Efficient Swaps with Nitro Dexspan Contracts.

    ```sol
        // SPDX-License-Identifier: MIT
        pragma solidity ^0.8.18;

        import {IERC20} from "../utils/SafeERC20.sol";

        interface IDexSpan {
            struct SameChainSwapParams {
                IERC20[] tokens;
                uint256 widgetId;
                uint256 amount;
                uint256 minReturn;
                uint256[] flags;
                bytes[] dataTx;
                address recipient;
        }

        struct SwapParams {
            IERC20[] tokens;
            uint256 amount;
            uint256 minReturn;
            uint256[] flags;
            bytes[] dataTx;
            bool isWrapper;
            address recipient;
            bytes destToken;
        }

        function swapInSameChain(
            IERC20[] memory tokens,
            uint256 amount,
            uint256 minReturn,
            uint256[] memory flags,
            bytes[] memory dataTx,
            bool isWrapper,
            address recipient,
            uint256 widgetID
        ) external payable returns (uint256 returnAmount);

        function swapAndDeposit(
            uint256 partnerId,
            bytes32 destChainIdBytes,
            bytes calldata recipient,
            uint8 depositType,
            uint256 feeAmount,
            bytes memory message,
            SwapParams memory swapData,
            address refundRecipient
        ) external payable;
    }
    ```

- `IERC20.sol` - This Smart Contract consists of Interface which Supports ERC 20 Tokens.

    ```sol
        // SPDX-License-Identifier: MIT
        pragma solidity ^0.8.18;

        interface IERC20 {
            function name() external view returns (string memory);

            function symbol() external view returns (string memory);

            function decimals() external view returns (uint8);

            function totalSupply() external view returns (uint256 supply);

            function balanceOf(address _owner) external view returns (uint256 balance);

            function transfer(
                address _to,
                uint256 _value
            ) external returns (bool success);

            function transferFrom(
                address _from,
                address _to,
                uint256 _value
            ) external returns (bool success);

            function approve(
                address _spender,
                uint256 _value
            ) external returns (bool success);

            function allowance(
                address _owner,
                address _spender
            ) external view returns (uint256 remaining);

            event Approval(
                address indexed _owner,
                address indexed _spender,
                uint256 _value
            );
        }
    ```    

### Mocks

This Section Comprises of Different Mock Contracts which are used for Mock Asset Transfers while Running the Smart Contract.

- `MockAssetForwarder.sol` - This Smart Contract comprises of Mock Asset Transfer including iDeposit function.

    ```sol
        // SPDX-License-Identifier: MIT
        pragma solidity ^0.8.18;

        import {IERC20, SafeERC20} from "../utils/SafeERC20.sol";
        import {IAssetForwarder} from "../interfaces/IAssetForwarder.sol";
        import {NitroMessageHandler} from "@routerprotocol/intents-core/contracts/utils/NitroMessageHandler.sol";

        contract MockAssetForwarder {
            using SafeERC20 for IERC20;
            address public constant ETH = 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE;
            address public constant USDC = 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE;

            error InvalidAmount();
            error ExecutionFailed();

            function usdc() external pure returns (address) {
                return USDC;
            }

            function iDeposit(
                IAssetForwarder.DepositData memory depositData,
                bytes memory destToken,
                bytes memory recipient
            ) external payable {
                if (depositData.srcToken != ETH) {
                    IERC20(depositData.srcToken).safeTransferFrom(
                        msg.sender,
                        address(this),
                        depositData.amount
                    );
                } else {
                    if (msg.value != depositData.amount) {
                        revert InvalidAmount();
                    }
                }
            }

            function iDepositMessage(
                IAssetForwarder.DepositData memory depositData,
                bytes memory destToken,
                bytes memory recipient,
                bytes memory message
            ) external payable {
                if (depositData.srcToken != ETH) {
                    IERC20(depositData.srcToken).safeTransferFrom(
                        msg.sender,
                        address(this),
                        depositData.amount
                    );
                } else {
                    if (msg.value != depositData.amount) {
                        revert InvalidAmount();
                    }
                }
            }

            function handleMessage(
                address tokenSent,
                uint256 amount,
                bytes memory instruction,
                address recipient
            ) external payable {
                if (tokenSent != ETH) {
                    IERC20(tokenSent).safeTransferFrom(msg.sender, recipient, amount);
                } else {
                    if (msg.value != amount) {
                        revert InvalidAmount();
                    }
                    payable(recipient).transfer(amount);
                }

                // solhint-disable-next-line avoid-low-level-calls
                (bool success, ) = recipient.call(
                    abi.encodeWithSelector(
                        NitroMessageHandler.handleMessage.selector,
                        tokenSent,
                        amount,
                        instruction
                    )
                );

                if (!success) {
                    revert ExecutionFailed();
                }
            }
        }
    ```

- `MockToken.sol` - This Smart Contract comprises of a Mock ERC 20 Token which we'll be Transferring.   

    ```sol
        // SPDX-License-Identifier: MIT
        pragma solidity ^0.8.18;

        import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

        contract MockToken is ERC20 {
            // solhint-disable-next-line no-empty-blocks
            constructor() ERC20("Token", "TKN") {}

            function mint(address recipient, uint256 amount) external {
                _mint(recipient, amount);
            }
        }
    ```