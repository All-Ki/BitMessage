// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";

contract BitMessageRsaRegistry is ChainlinkClient {
    address public owner;
    uint256 public fee;

    // Mapping to store RSA keys
    mapping(address => string) public rsaKeys;

    // Events for tracking key updates and fee changes
    event RSAKeyUpdated(address indexed wallet, string rsaKey);
    event FeeChanged(uint256 newFee);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    constructor(uint256 _initialFee) {
        owner = msg.sender;
        fee = _initialFee;
    }

    function updateRSAKey(string calldata _rsaKey) external payable {
        require(bytes(_rsaKey).length > 0, "RSA key cannot be empty");
        require(msg.value >= fee, "Insufficient fee");

        rsaKeys[msg.sender] = _rsaKey;
        emit RSAKeyUpdated(msg.sender, _rsaKey);

        if (msg.value > fee) {
            // Refund excess fee
            payable(msg.sender).transfer(msg.value - fee);
        }
    }

    function changeFee(uint256 _newFee) external onlyOwner {
        fee = _newFee;
        emit FeeChanged(_newFee);
    }

    function withdrawFees() external onlyOwner {
        payable(owner).transfer(address(this).balance);
    }
}
