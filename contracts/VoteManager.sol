// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract VoteManager {
    // ===== Structs =====
    struct Voter {
        string username;
        uint256 totalPoints;
    }

    // ===== Mappings =====
    mapping(address => Voter) public voters;
    mapping(uint256 => mapping(address => uint8)) public votes; // themeId => wallet => optionIndex

    // ===== Events =====
    event UsernameRegistered(address indexed user, string username);
    event VoteSubmitted(address indexed user, uint256 themeId, uint8 optionIndex);

    // ===== Functions =====

    // 1️⃣ Register Username
    function registerUsername(string memory _username) external {
        require(bytes(voters[msg.sender].username).length == 0, "Username already registered");
        require(bytes(_username).length > 0 && bytes(_username).length <= 32, "Username length invalid");
        voters[msg.sender].username = _username;
        voters[msg.sender].totalPoints = 0;
        emit UsernameRegistered(msg.sender, _username);
    }

    // 2️⃣ Vote Function
    function vote(uint256 themeId, uint8 optionIndex) external {
        Voter storage voter = voters[msg.sender];
        require(bytes(voter.username).length != 0, "Username not registered");

        // Only 1 vote per theme
        require(votes[themeId][msg.sender] == 0, "Already voted for this theme");

        // Record vote
        votes[themeId][msg.sender] = optionIndex + 1; // store optionIndex+1, 0 = not voted
        voter.totalPoints += 1;

        emit VoteSubmitted(msg.sender, themeId, optionIndex);
    }

    // 3️⃣ Get Voter Info
    function getVoter(address user) external view returns (string memory, uint256) {
        Voter memory v = voters[user];
        return (v.username, v.totalPoints);
    }

    // 4️⃣ Get Vote Option (per theme)
    function getVote(uint256 themeId, address user) external view returns (uint8) {
        uint8 option = votes[themeId][user];
        if (option == 0) return 255; // not voted
        return option - 1; // return original optionIndex
    }
}

