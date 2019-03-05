let config = {
    "caddress": "0x3993708ac85132D83DE0eE51af2678898f254188",
    "cabi": [
      {
        "constant": true,
        "inputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "users",
        "outputs": [
          {
            "name": "user_name",
            "type": "string"
          },
          {
            "name": "full_name",
            "type": "string"
          },
          {
            "name": "pass_word",
            "type": "string"
          },
          {
            "name": "public_key",
            "type": "address"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x365b98b2"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "totalusers",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x657d1471"
      },
      {
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor",
        "signature": "constructor"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_username",
            "type": "string"
          },
          {
            "name": "_fullname",
            "type": "string"
          },
          {
            "name": "_password",
            "type": "string"
          },
          {
            "name": "_publickey",
            "type": "address"
          }
        ],
        "name": "newUser",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0x9262ddfb"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "_username",
            "type": "string"
          }
        ],
        "name": "getUserFromUsername",
        "outputs": [
          {
            "name": "",
            "type": "string"
          },
          {
            "name": "",
            "type": "string"
          },
          {
            "name": "",
            "type": "string"
          },
          {
            "name": "",
            "type": "address"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x26aabd0e"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "index",
            "type": "uint256"
          }
        ],
        "name": "getUserFromIndex",
        "outputs": [
          {
            "name": "",
            "type": "string"
          },
          {
            "name": "",
            "type": "string"
          },
          {
            "name": "",
            "type": "string"
          },
          {
            "name": "",
            "type": "address"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x5f6b2405"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "getNoOfUsers",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x34f5138e"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_username",
            "type": "string"
          },
          {
            "name": "_name",
            "type": "string"
          },
          {
            "name": "_price",
            "type": "uint256"
          },
          {
            "name": "_owner",
            "type": "string"
          }
        ],
        "name": "addItem",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0x13df81d6"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "_username",
            "type": "string"
          },
          {
            "name": "index",
            "type": "uint256"
          }
        ],
        "name": "getItems",
        "outputs": [
          {
            "name": "",
            "type": "string"
          },
          {
            "name": "",
            "type": "string"
          },
          {
            "name": "",
            "type": "uint256"
          },
          {
            "name": "",
            "type": "string"
          },
          {
            "name": "",
            "type": "bool"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0xcfa5e471"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_username",
            "type": "string"
          },
          {
            "name": "index",
            "type": "uint256"
          },
          {
            "name": "_newOwner",
            "type": "string"
          }
        ],
        "name": "updateItem",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0xc9374b84"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_username",
            "type": "string"
          },
          {
            "name": "index",
            "type": "uint256"
          },
          {
            "name": "_newOwner",
            "type": "string"
          }
        ],
        "name": "buyItem",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function",
        "signature": "0xa569320c"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "_username",
            "type": "string"
          }
        ],
        "name": "getNumberOfItems",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0xe506db35"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "_username",
            "type": "string"
          },
          {
            "name": "index",
            "type": "uint256"
          }
        ],
        "name": "getBuyItems",
        "outputs": [
          {
            "name": "",
            "type": "string"
          },
          {
            "name": "",
            "type": "string"
          },
          {
            "name": "",
            "type": "uint256"
          },
          {
            "name": "",
            "type": "string"
          },
          {
            "name": "",
            "type": "bool"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x43fda9dc"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "_username",
            "type": "string"
          },
          {
            "name": "index",
            "type": "uint256"
          }
        ],
        "name": "getSellItems",
        "outputs": [
          {
            "name": "",
            "type": "string"
          },
          {
            "name": "",
            "type": "string"
          },
          {
            "name": "",
            "type": "uint256"
          },
          {
            "name": "",
            "type": "string"
          },
          {
            "name": "",
            "type": "bool"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x1ff6cd04"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "_username",
            "type": "string"
          }
        ],
        "name": "getBuyLength",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0xefcf3d1e"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "_username",
            "type": "string"
          }
        ],
        "name": "getSellLength",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function",
        "signature": "0x81654bee"
      }
    ]
}

