pragma solidity ^0.5.0;

import "./ERC20Interface.sol";

contract TransactToken is ERC20Interface {
    
struct Token{
    string username;
    address account;
    uint amount;
    bool accepted;
}


mapping(string => Token) tokenInfo;

uint256 constant private MAX_UINT256 = 2**256 - 1;
    mapping (address => uint256) public balances;
    mapping (address => mapping (address => uint256)) public allowed;
    
    string public name;                                  //Token name: Medical Token
    uint8 public decimals;                               //How many decimals to show.
    string public symbol;                                //An identifier: MEDToken
    
    constructor() public  {
        
        
        balances[msg.sender] = 10000;                    // Give the creator all initial tokens
        totalSupply = 10000;                             // Update total supply
        name = "Shopping Token";                          // Set the name for display purposes
        decimals = 0;                                    // Amount of decimals for display purposes
        symbol = "SHOP";                             // Set the symbol for display purposes
    }


    Token[] public reqtoken;
    
    function request_token(string memory _username, address _account,uint _amount) public
    {
    Token memory t;
   
    t.username=_username;
    t.account=_account;
    t.accepted=false;
    t.amount=_amount;
    
    reqtoken.push(t);
    
    }

function accept_token(string memory _username,address _account,uint _amount,uint _index) public
{
        Token storage temp=reqtoken[_index];
        temp.accepted=true;
}

function getRequestLength()public view returns(uint)
{
    return reqtoken.length;
}

function getRequest(uint _index)public view returns(string memory,address,uint,bool,uint)
{
    Token memory temp=reqtoken[_index];
    return (temp.username,temp.account,temp.amount,temp.accepted,_index);
}
    
    function transfer(address _to, uint256 _value) public returns (bool success) {  
        require(balances[msg.sender] >= _value);
        balances[msg.sender] -= _value;
        balances[_to] += _value;
        emit Transfer(msg.sender, _to, _value); 
        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        uint256 allowance = allowed[_from][msg.sender];
        require(balances[_from] >= _value && allowance >= _value);
        balances[_to] += _value;
        balances[_from] -= _value;
        if (allowance < MAX_UINT256) {
            allowed[_from][msg.sender] -= _value;
        }
        emit Transfer(_from, _to, _value); 
        return true;
    }

    function balanceOf(address _owner) public view returns (uint256 balance) {
        return balances[_owner];
    }

    function approve(address _spender, uint256 _value) public returns (bool success) {
        allowed[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value); 
        return true;
    }

    function allowance(address _owner, address _spender) public view returns (uint256 remaining) {
        return allowed[_owner][_spender];
    }
    
}
