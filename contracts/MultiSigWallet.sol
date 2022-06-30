//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "hardhat/console.sol";

contract MultiSigWallet {
    modifier adminOnly() {
        require(isAdmin[msg.sender] == true, "address is not an admin");
        _;
    }

    modifier validTransactionId(uint256 transactionId) {
        require(
            transactionId < transactions.length,
            "not a valid transactionid"
        );
        _;
    }

    modifier validApproval(uint256 transactionId) {
        require(
            getApprovalCountFromTransaction(transactionId) >= required,
            "not enough admins have approved this transaction"
        );
        _;
    }

    modifier notExecuted(uint256 transactionId) {
        require(
            !transactions[transactionId].executed,
            "transaction is already executed"
        );
        _;
    }
    event Deposit(address indexed from, uint256 value);
    event DepositERC20(address indexed from, address token, uint256 ammount);
    event Request(address indexed requester, uint256 indexed transactionId);
    event RequestERC20(
        address indexed requester,
        uint256 indexed transactionId
    );
    event Approve(address indexed approver, uint256 indexed transactionId);
    event Execute(address indexed executor, uint256 indexed transactionId);

    struct Transaction {
        address requester;
        address to;
        uint256 value;
        bytes data;
        address token;
        bool executed;
    }

    mapping(address => bool) public isAdmin;
    // transactionId => (admin => idApproved)
    mapping(uint256 => mapping(address => bool)) public approved;
    Transaction[] public transactions;
    address[] public admins;
    // admins that are required to approve a transaction
    uint256 required;

    constructor(address[] memory _admins, uint256 _required) {
        required = _required;

        require(_admins.length > 0, "add more admins");
        require(_admins.length >= required, "admins > required");

        for (uint256 i = 0; i < _admins.length; i++) {
            isAdmin[_admins[i]] = true;
            admins.push(_admins[i]);
        }
    }

    function depositToWallet() external payable {
        emit Deposit(msg.sender, msg.value);
    }

    function depositERC20ToWallet(address _token, uint256 _ammount) external {
        IERC20(_token).transferFrom(msg.sender, address(this), _ammount);
        emit DepositERC20(msg.sender, _token, _ammount);
    }

    function createTransactionRequestForERC20(
        address _to,
        uint256 _ammount,
        address _token
    ) external adminOnly {
        transactions.push(
            Transaction({
                requester: msg.sender,
                to: _to,
                value: _ammount,
                data: bytes("0"),
                token: _token,
                executed: false
            })
        );

        emit RequestERC20(msg.sender, transactions.length - 1);
    }

    function createTransactionRequest(
        address _to,
        uint256 _value,
        bytes memory _data
    ) external adminOnly {
        transactions.push(
            Transaction({
                requester: msg.sender,
                to: _to,
                value: _value,
                data: _data,
                token: address(0),
                executed: false
            })
        );

        emit Request(msg.sender, transactions.length - 1);
    }

    function approveTransactionRequest(uint256 _transactionId)
        external
        adminOnly
        validTransactionId(_transactionId)
    {
        require(
            !approved[_transactionId][msg.sender],
            "you have already approved this transaction"
        );
        approved[_transactionId][msg.sender] = true;
        emit Approve(msg.sender, _transactionId);
    }

    function executeTransaction(uint256 _transactionId)
        public
        adminOnly
        validTransactionId(_transactionId)
        validApproval(_transactionId)
        notExecuted(_transactionId)
    {
        Transaction storage transaction = transactions[_transactionId];
        transaction.executed = true;

        // ERC20 transaction
        if (transaction.token != address(0)) {
            IERC20(transaction.token).transfer(
                transaction.to,
                transaction.value
            );
            emit Execute(msg.sender, _transactionId);
        }
        // ether transaction
        else {
            (bool success, ) = transaction.to.call{value: transaction.value}(
                transaction.data
            );

            require(success, "something went wrong");
            emit Execute(msg.sender, _transactionId);
        }
    }

    function getApprovalCountFromTransaction(uint256 _transactionId)
        private
        view
        returns (uint256 count)
    {
        for (uint256 i = 0; i < admins.length; i++) {
            if (approved[_transactionId][admins[i]] == true) {
                count++;
            }
        }
    }

    function getAllAdmins() external view returns (address[] memory) {
        return admins;
    }

    function getAllTransactions() external view returns (Transaction[] memory) {
        return transactions;
    }

    function getContractERC20Balance(address _token)
        public
        view
        returns (uint256)
    {
        return IERC20(_token).balanceOf(address(this));
    }
}
