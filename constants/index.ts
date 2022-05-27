export const COMPETITION_FACTORY_ADDRESS = "0xaef0d2cF47B35410eb8fb33316142FDeD8A2aDFb"
export const COMPETITION_FACTORY_CREATOR = "0xd23e883540cC6BA2407cB3b793c6c8a92654C571"
export const COMPETITION_FACTORY_ABI = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "chainlinkToken",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "chainlinkOracle",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "vrfCoordinator",
                "type": "address"
            },
            {
                "internalType": "bytes32",
                "name": "chainlinkJobId",
                "type": "bytes32"
            },
            {
                "internalType": "bytes32",
                "name": "chainlinkKeyhash",
                "type": "bytes32"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "competitionId",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "creator",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "contractAddress",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "bytes32",
                "name": "name",
                "type": "bytes32"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "description",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "imageURI",
                "type": "string"
            }
        ],
        "name": "CompetitionCreated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "previousOwner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
    },
    {
        "stateMutability": "payable",
        "type": "fallback"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "name",
                "type": "bytes32"
            },
            {
                "internalType": "string",
                "name": "description",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "imageURI",
                "type": "string"
            }
        ],
        "name": "createCompetition",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalCompetitions",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "_value",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "withdraw",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "stateMutability": "payable",
        "type": "receive"
    }
]
export const BBX_COMPETITION_ABI = [
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "name",
                "type": "bytes32"
            },
            {
                "internalType": "address",
                "name": "contractOwner",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "description",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "imageURI",
                "type": "string"
            },
            {
                "internalType": "address",
                "name": "chainlinkToken",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "chainlinkOracle",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "vrfCoordinator",
                "type": "address"
            },
            {
                "internalType": "bytes32",
                "name": "chainlinkJobId",
                "type": "bytes32"
            },
            {
                "internalType": "bytes32",
                "name": "chainlinkKeyhash",
                "type": "bytes32"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [],
        "name": "NotAdmin",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "NotAdminOrHelper",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "NotHelper",
        "type": "error"
    },
    {
        "inputs": [],
        "name": "NotJudge",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "have",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "want",
                "type": "address"
            }
        ],
        "name": "OnlyCoordinatorCanFulfill",
        "type": "error"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "enum CompetitionBase.CompetitionState",
                "name": "state",
                "type": "uint8"
            }
        ],
        "name": "BattleCreated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "battleId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "votedBy",
                "type": "address"
            }
        ],
        "name": "BattleVoted",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "beatboxerAddress",
                "type": "address"
            }
        ],
        "name": "BeatboxerRemoved",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [],
        "name": "BeatboxersAdded",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "id",
                "type": "bytes32"
            }
        ],
        "name": "ChainlinkCancelled",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "id",
                "type": "bytes32"
            }
        ],
        "name": "ChainlinkFulfilled",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "id",
                "type": "bytes32"
            }
        ],
        "name": "ChainlinkRequested",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "judgeAddress",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "name",
                "type": "string"
            }
        ],
        "name": "JudgeAdded",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "judgeAddress",
                "type": "address"
            }
        ],
        "name": "JudgeRemoved",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "enum CompetitionBase.CompetitionState",
                "name": "state",
                "type": "uint8"
            }
        ],
        "name": "OpponentsSelected",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "requestId",
                "type": "uint256"
            }
        ],
        "name": "RandomNumberRequested",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "role",
                "type": "bytes32"
            },
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "previousAdminRole",
                "type": "bytes32"
            },
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "newAdminRole",
                "type": "bytes32"
            }
        ],
        "name": "RoleAdminChanged",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "role",
                "type": "bytes32"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "account",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "sender",
                "type": "address"
            }
        ],
        "name": "RoleGranted",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "role",
                "type": "bytes32"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "account",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "sender",
                "type": "address"
            }
        ],
        "name": "RoleRevoked",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "battleId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "winnerId",
                "type": "uint256"
            }
        ],
        "name": "WinnerSelected",
        "type": "event"
    },
    {
        "stateMutability": "payable",
        "type": "fallback"
    },
    {
        "inputs": [],
        "name": "DEFAULT_ADMIN_ROLE",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address[]",
                "name": "beatboxerAddresses",
                "type": "address[]"
            },
            {
                "internalType": "string[]",
                "name": "names",
                "type": "string[]"
            }
        ],
        "name": "addBeatboxers",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "judgeAddress",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "_name",
                "type": "string"
            }
        ],
        "name": "addJudge",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "enum CompetitionBase.CompetitionState",
                "name": "",
                "type": "uint8"
            }
        ],
        "name": "battleCountByState",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "battles",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "bytes11",
                        "name": "ytVideoId",
                        "type": "bytes11"
                    },
                    {
                        "internalType": "uint8",
                        "name": "score",
                        "type": "uint8"
                    },
                    {
                        "internalType": "uint256",
                        "name": "beatboxerId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "likeCount",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct CompetitionBase.BattleBeatboxer",
                "name": "beatboxerOne",
                "type": "tuple"
            },
            {
                "components": [
                    {
                        "internalType": "bytes11",
                        "name": "ytVideoId",
                        "type": "bytes11"
                    },
                    {
                        "internalType": "uint8",
                        "name": "score",
                        "type": "uint8"
                    },
                    {
                        "internalType": "uint256",
                        "name": "beatboxerId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "likeCount",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct CompetitionBase.BattleBeatboxer",
                "name": "beatboxerTwo",
                "type": "tuple"
            },
            {
                "internalType": "uint256",
                "name": "winnerId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "startTime",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "endTime",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "winningAmount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "stateBattleId",
                "type": "uint256"
            },
            {
                "internalType": "enum CompetitionBase.CompetitionState",
                "name": "state",
                "type": "uint8"
            },
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "beatboxers",
        "outputs": [
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "address",
                "name": "beatboxerAddress",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes",
                "name": "",
                "type": "bytes"
            }
        ],
        "name": "checkUpkeep",
        "outputs": [
            {
                "internalType": "bool",
                "name": "upkeepNeeded",
                "type": "bool"
            },
            {
                "internalType": "bytes",
                "name": "",
                "type": "bytes"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "enum CompetitionBase.CompetitionState",
                "name": "",
                "type": "uint8"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "competitionStateToBattleOpponents",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "beatboxerOneId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "beatboxerTwoId",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "isCompleted",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "endWildcard",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "requestId",
                "type": "bytes32"
            },
            {
                "internalType": "uint256",
                "name": "likeCount1",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "likeCount2",
                "type": "uint256"
            }
        ],
        "name": "fulfillValue1AndValue2",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getAllBattles",
        "outputs": [
            {
                "components": [
                    {
                        "components": [
                            {
                                "internalType": "bytes11",
                                "name": "ytVideoId",
                                "type": "bytes11"
                            },
                            {
                                "internalType": "uint8",
                                "name": "score",
                                "type": "uint8"
                            },
                            {
                                "internalType": "uint256",
                                "name": "beatboxerId",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "likeCount",
                                "type": "uint256"
                            }
                        ],
                        "internalType": "struct CompetitionBase.BattleBeatboxer",
                        "name": "beatboxerOne",
                        "type": "tuple"
                    },
                    {
                        "components": [
                            {
                                "internalType": "bytes11",
                                "name": "ytVideoId",
                                "type": "bytes11"
                            },
                            {
                                "internalType": "uint8",
                                "name": "score",
                                "type": "uint8"
                            },
                            {
                                "internalType": "uint256",
                                "name": "beatboxerId",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "likeCount",
                                "type": "uint256"
                            }
                        ],
                        "internalType": "struct CompetitionBase.BattleBeatboxer",
                        "name": "beatboxerTwo",
                        "type": "tuple"
                    },
                    {
                        "internalType": "uint256",
                        "name": "winnerId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "startTime",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "endTime",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "winningAmount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "stateBattleId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "enum CompetitionBase.CompetitionState",
                        "name": "state",
                        "type": "uint8"
                    },
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    }
                ],
                "internalType": "struct CompetitionBase.Battle[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "battleId",
                "type": "uint256"
            }
        ],
        "name": "getBattlePoints",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint8",
                        "name": "originality",
                        "type": "uint8"
                    },
                    {
                        "internalType": "uint8",
                        "name": "pitchAndTiming",
                        "type": "uint8"
                    },
                    {
                        "internalType": "uint8",
                        "name": "complexity",
                        "type": "uint8"
                    },
                    {
                        "internalType": "uint8",
                        "name": "enjoymentOfListening",
                        "type": "uint8"
                    },
                    {
                        "internalType": "uint8",
                        "name": "video",
                        "type": "uint8"
                    },
                    {
                        "internalType": "uint8",
                        "name": "audio",
                        "type": "uint8"
                    },
                    {
                        "internalType": "uint8",
                        "name": "battle",
                        "type": "uint8"
                    },
                    {
                        "internalType": "uint8",
                        "name": "extraPoint",
                        "type": "uint8"
                    },
                    {
                        "internalType": "address",
                        "name": "votedBy",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "votedFor",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct CompetitionBase.Point[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getCurrentBattles",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "internalType": "address",
                        "name": "beatboxerAddress",
                        "type": "address"
                    }
                ],
                "internalType": "struct CompetitionBase.Beatboxer[2][]",
                "name": "",
                "type": "tuple[2][]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "role",
                "type": "bytes32"
            }
        ],
        "name": "getRoleAdmin",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_address",
                "type": "address"
            }
        ],
        "name": "getRoles",
        "outputs": [
            {
                "internalType": "bool[]",
                "name": "",
                "type": "bool[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "judge",
                "type": "address"
            }
        ],
        "name": "getVotedBattlesIndices",
        "outputs": [
            {
                "internalType": "uint256[]",
                "name": "",
                "type": "uint256[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "role",
                "type": "bytes32"
            },
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "grantRole",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "role",
                "type": "bytes32"
            },
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "hasRole",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "judgeCount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "_value",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "judgeVoted",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "metaData",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "name",
                "type": "bytes32"
            },
            {
                "internalType": "string",
                "name": "imageURI",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "description",
                "type": "string"
            },
            {
                "internalType": "enum CompetitionBase.CompetitionState",
                "name": "competitionState",
                "type": "uint8"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes",
                "name": "",
                "type": "bytes"
            }
        ],
        "name": "performUpkeep",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "pointsByBattle",
        "outputs": [
            {
                "internalType": "uint8",
                "name": "originality",
                "type": "uint8"
            },
            {
                "internalType": "uint8",
                "name": "pitchAndTiming",
                "type": "uint8"
            },
            {
                "internalType": "uint8",
                "name": "complexity",
                "type": "uint8"
            },
            {
                "internalType": "uint8",
                "name": "enjoymentOfListening",
                "type": "uint8"
            },
            {
                "internalType": "uint8",
                "name": "video",
                "type": "uint8"
            },
            {
                "internalType": "uint8",
                "name": "audio",
                "type": "uint8"
            },
            {
                "internalType": "uint8",
                "name": "battle",
                "type": "uint8"
            },
            {
                "internalType": "uint8",
                "name": "extraPoint",
                "type": "uint8"
            },
            {
                "internalType": "address",
                "name": "votedBy",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "votedFor",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "requestId",
                "type": "uint256"
            },
            {
                "internalType": "uint256[]",
                "name": "randomWords",
                "type": "uint256[]"
            }
        ],
        "name": "rawFulfillRandomWords",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "judgeAddress",
                "type": "address"
            }
        ],
        "name": "removeJudge",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "role",
                "type": "bytes32"
            },
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "renounceRole",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "role",
                "type": "bytes32"
            },
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "revokeRole",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "s_upkeepNeeded",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "description",
                "type": "string"
            }
        ],
        "name": "setDescription",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "imageURI",
                "type": "string"
            }
        ],
        "name": "setImage",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "name",
                "type": "bytes32"
            }
        ],
        "name": "setName",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint64",
                "name": "_subscriptionId",
                "type": "uint64"
            }
        ],
        "name": "setSubscriptionId",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "stateBattleId",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "bytes11",
                "name": "ytVideoIdOne",
                "type": "bytes11"
            },
            {
                "internalType": "bytes11",
                "name": "ytVideoIdTwo",
                "type": "bytes11"
            },
            {
                "internalType": "uint256",
                "name": "startTime",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "endTime",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "winningAmount",
                "type": "uint256"
            }
        ],
        "name": "startBattle",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "startWildcard",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "subscriptionId",
        "outputs": [
            {
                "internalType": "uint64",
                "name": "",
                "type": "uint64"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes4",
                "name": "interfaceId",
                "type": "bytes4"
            }
        ],
        "name": "supportsInterface",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "battleId",
                "type": "uint256"
            },
            {
                "components": [
                    {
                        "internalType": "uint8",
                        "name": "originality",
                        "type": "uint8"
                    },
                    {
                        "internalType": "uint8",
                        "name": "pitchAndTiming",
                        "type": "uint8"
                    },
                    {
                        "internalType": "uint8",
                        "name": "complexity",
                        "type": "uint8"
                    },
                    {
                        "internalType": "uint8",
                        "name": "enjoymentOfListening",
                        "type": "uint8"
                    },
                    {
                        "internalType": "uint8",
                        "name": "video",
                        "type": "uint8"
                    },
                    {
                        "internalType": "uint8",
                        "name": "audio",
                        "type": "uint8"
                    },
                    {
                        "internalType": "uint8",
                        "name": "battle",
                        "type": "uint8"
                    },
                    {
                        "internalType": "uint8",
                        "name": "extraPoint",
                        "type": "uint8"
                    },
                    {
                        "internalType": "address",
                        "name": "votedBy",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "votedFor",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct CompetitionBase.Point",
                "name": "point1",
                "type": "tuple"
            },
            {
                "components": [
                    {
                        "internalType": "uint8",
                        "name": "originality",
                        "type": "uint8"
                    },
                    {
                        "internalType": "uint8",
                        "name": "pitchAndTiming",
                        "type": "uint8"
                    },
                    {
                        "internalType": "uint8",
                        "name": "complexity",
                        "type": "uint8"
                    },
                    {
                        "internalType": "uint8",
                        "name": "enjoymentOfListening",
                        "type": "uint8"
                    },
                    {
                        "internalType": "uint8",
                        "name": "video",
                        "type": "uint8"
                    },
                    {
                        "internalType": "uint8",
                        "name": "audio",
                        "type": "uint8"
                    },
                    {
                        "internalType": "uint8",
                        "name": "battle",
                        "type": "uint8"
                    },
                    {
                        "internalType": "uint8",
                        "name": "extraPoint",
                        "type": "uint8"
                    },
                    {
                        "internalType": "address",
                        "name": "votedBy",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "votedFor",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct CompetitionBase.Point",
                "name": "point2",
                "type": "tuple"
            }
        ],
        "name": "voteBattle",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "withdraw",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "stateMutability": "payable",
        "type": "receive"
    }
]
export const CompetitionState = {
    NOT_STARTED: 0,
    WILDCARD_SUBMISSION: 1,
    WILDCARD_SELECTION: 2,
    TOP16: 3,
    TOP8: 4,
    SEMIFINAL: 5,
    FINAL: 6,
    COMPLETED: 7
}
