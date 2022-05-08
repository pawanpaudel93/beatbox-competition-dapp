export const COMPETITION_FACTORY_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
export const COMPETITION_FACTORY_CREATOR = "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266"
export const COMPETITION_FACTORY_ABI = [
    {
        "inputs": [],
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
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "creator",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "wildcardStart",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "wildcardEnd",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "contractAddress",
                "type": "address"
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
                "name": "image",
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
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "competitions",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "competitionId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "wildcardStart",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "wildcardEnd",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "description",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "image",
                "type": "string"
            },
            {
                "internalType": "address",
                "name": "creator",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "contractAddress",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "description",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "image",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "wildcardStart",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "wildcardEnd",
                "type": "uint256"
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
        "inputs": [
            {
                "internalType": "address",
                "name": "creator",
                "type": "address"
            }
        ],
        "name": "getCompetitionsByCreator",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "competitionId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "wildcardStart",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "wildcardEnd",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "description",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "image",
                        "type": "string"
                    },
                    {
                        "internalType": "address",
                        "name": "creator",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "contractAddress",
                        "type": "address"
                    }
                ],
                "internalType": "struct CompetitionFactory.Competition[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
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
                "internalType": "string",
                "name": "_name",
                "type": "string"
            },
            {
                "internalType": "address",
                "name": "contractOwner",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "_description",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_image",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "_wildcardStart",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_wildcardEnd",
                "type": "uint256"
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
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "competitionAddress",
                "type": "address"
            },
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
                "internalType": "address",
                "name": "beatboxerOneAddress",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "beatboxerTwoAddress",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "startTime",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "endTime",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "winningAmount",
                "type": "uint256"
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
                "internalType": "address",
                "name": "competitionAddress",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "beatboxerAddress",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "name",
                "type": "string"
            }
        ],
        "name": "BeatboxerAdded",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "competitionAddress",
                "type": "address"
            },
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
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "competitionAddress",
                "type": "address"
            },
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
                "name": "competitionAddress",
                "type": "address"
            },
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
        "inputs": [],
        "name": "HELPER_ROLE",
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
        "inputs": [],
        "name": "JUDGE_ROLE",
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
                "name": "beatboxerAddress",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "_name",
                "type": "string"
            }
        ],
        "name": "addBeatboxer",
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
        "name": "battlePoints",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "originality",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "pitchAndTiming",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "complexity",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "enjoymentOfListening",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "video",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "audio",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "battle",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "extraPoint",
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
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "beatboxerOneAddress",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "beatboxerTwoAddress",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "winnerAddress",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "beatboxerOneScore",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "beatboxerTwoScore",
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
                "name": "totalVotes",
                "type": "uint256"
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
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "beatboxerByAddress",
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
            },
            {
                "internalType": "bool",
                "name": "added",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "beatboxerCount",
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
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "description",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "image",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "wildcardStart",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "wildcardEnd",
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
                "name": "beatboxerAddress",
                "type": "address"
            }
        ],
        "name": "removeBeatboxer",
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
        "inputs": [
            {
                "internalType": "string",
                "name": "_description",
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
                "name": "_image",
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
                "internalType": "string",
                "name": "_name",
                "type": "string"
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
                "internalType": "string",
                "name": "_name",
                "type": "string"
            },
            {
                "internalType": "address",
                "name": "_beatboxerOneAddress",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_beatboxerTwoAddress",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_startTime",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_endTime",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_winningAmount",
                "type": "uint256"
            }
        ],
        "name": "startBattle",
        "outputs": [],
        "stateMutability": "nonpayable",
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
                        "internalType": "uint256",
                        "name": "originality",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "pitchAndTiming",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "complexity",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "enjoymentOfListening",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "video",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "audio",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "battle",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "extraPoint",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct BbxCompetition.Point",
                "name": "point1",
                "type": "tuple"
            },
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "originality",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "pitchAndTiming",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "complexity",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "enjoymentOfListening",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "video",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "audio",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "battle",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "extraPoint",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct BbxCompetition.Point",
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
        "stateMutability": "payable",
        "type": "receive"
    }
]