// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";

contract BitMessage is ChainlinkClient {
    using ECDSA for bytes32;

    struct Message {
        address sender;
        string encryptedMessage;
    }

    mapping(address => Message[]) private messages;

    event MessageSent(address indexed sender, address indexed receiver, string encryptedMessage);
    event MessageRead(address indexed receiver, string encryptedMessage);
    event SmsSent(address indexed sender, address indexed receiver, string encryptedMessage);

    constructor() {
        setPublicChainlinkToken();
    }

    function sendMessage(address receiver, string memory encryptedMessage) public {
        Message memory newMessage;
        newMessage.sender = msg.sender;
        newMessage.encryptedMessage = encryptedMessage;

        messages[receiver].push(newMessage);

        emit MessageSent(msg.sender, receiver, encryptedMessage);
    }

    function readMessage(uint256 index) public returns (string memory) {
        require(index < messages[msg.sender].length, "Index out of bounds");

        Message memory messageToRead = messages[msg.sender][index];

        emit MessageRead(msg.sender, messageToRead.encryptedMessage);

        return messageToRead.encryptedMessage;
    }

    function sendMessageViaSms(address receiver, string memory encryptedMessage) public {
        // Create a new Chainlink request
        Chainlink.Request memory req = buildChainlinkRequest(
            // This would be the jobId of the Chainlink oracle that makes HTTP POST requests
            "your-job-id-here",
            address(this),
            this.fulfillSms.selector
        );

        // Set the URL and the body of the HTTP POST request
        req.add("http_post_url", "your-api-url-here");
        req.add("http_post_body", string(abi.encodePacked("receiver=", toString(receiver), "&message=", encryptedMessage)));

        // Send the request
        sendChainlinkRequest(req, ORACLE_PAYMENT);
    }

    function fulfillSms(bytes32 _requestId, bytes32 _result) public recordChainlinkFulfillment(_requestId) {
        // This function will be called when the Chainlink node fulfills the request
        // _result will contain the result of the HTTP POST request
        emit SmsSent(msg.sender, receiver, encryptedMessage);
    }

    function toString(address x) internal pure returns (string memory) {
        bytes memory b = new bytes(20);
        for (uint i = 0; i < 20; i++)
            b[i] = byte(uint8(uint(x) / (2**(8*(19 - i)))));
        return string(b);
    }
}
