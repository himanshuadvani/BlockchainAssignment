pragma solidity ^0.5.0;



contract Assignment 
{    


 struct User{
        
        string user_name;
        string full_name;
        string pass_word;
        address public_key;
        
        }
    

     /*struct Item{
            string name;
            uint price;
            string owner;
        }*/


  struct Item{
            string user;
            string name;
            uint price;
            string owner;
            bool isTransacted;
         
     }

    
   
    User[] public users;
    uint public totalusers;
      


    mapping(string => User) userInfo;
    mapping(string => bool) isUserExist;
     mapping(string => Item[])private all_Items;
         mapping(string => Item[])private sell_Items;
     mapping(string => Item[])private buy_Items;



    constructor() public  {
                     // Set the symbol for display purposes
    }
   
    function newUser(string memory _username, string memory _fullname, string memory _password, address _publickey)  public {   //Set the details of doctors
        
       User storage u =userInfo[_username];
     
        u.user_name=_username;
        u.full_name=_fullname;
        u.pass_word=_password;
        u.public_key=_publickey;
           users.push(u);
         
        isUserExist[_username] = true;
    }
    
    
    function getUserFromUsername(string memory _username) public view returns(string memory, string memory, string memory,address) {    //Get doctor details
        
        User memory u=userInfo[_username];
        require(isUserExist[_username] == true, "Record does not exist...");
        return (u.user_name,u.full_name,u.pass_word,u.public_key);
    }
    
    function getUserFromIndex(uint index) public view returns (string memory, string memory, string memory,address) 
    {
        User memory u=users[index];
         return (u.user_name,u.full_name,u.pass_word,u.public_key);
    }
    
    function getNoOfUsers()public view returns (uint)
    {
 
        return users.length;
    }
    

/*
     function addItem(string memory _username,string memory _name,uint _price,string memory _owner) public returns(uint)
   {
        Item memory temp;
       Item[] storage allItems=all_Items[_username];
       temp.name=_name;
       temp.price=_price;
       temp.owner=_owner;
       allItems.push(temp);
      
   }
    
     function getItems(string memory _username,uint index) public view returns(string memory,uint,string memory)
     {   
        Item memory temp=all_Items[_username][index];
        return (temp.name,temp.price,temp.owner);
     
    }
    
    function getNumberOfItems(string memory _username) public  view returns (uint)
    {
       Item[] storage allItems=all_Items[_username];
        
         return allItems.length;
    }
  */






   function addItem(string memory _username,string memory _name,uint _price,string memory _owner) public returns(uint)
   {
        Item memory temp;
       Item[] storage allItems=all_Items[_username];
       temp.user=_username;
       temp.name=_name;
       temp.price=_price;
       temp.owner=_owner;
       temp.isTransacted=false;
       allItems.push(temp);
       
      
      
   }
    
     function getItems(string memory _username,uint index) public view returns(string memory,string memory,uint,string memory,bool)
     {   
        Item memory temp=all_Items[_username][index];
        return (temp.user,temp.name,temp.price,temp.owner,temp.isTransacted);
     
    }
    
    
    function updateItem(string memory _username,uint index,string memory _newOwner) public 
     {   
         //Item[] storage allItems=all_Items[_username];
        Item storage temp=all_Items[_username][index];
        temp.owner=_newOwner;
    }
    
    
    function buyItem(string memory _username,uint index,string memory _newOwner)public 
    {
         Item memory temp=all_Items[_username][index];
         Item[] storage buyItems=buy_Items[_newOwner];
         Item[] storage sellItems=sell_Items[_username];
         temp.user=_newOwner;
         temp.owner=_username;
         temp.isTransacted=true;
         buyItems.push(temp);
         temp.user=_username;
         temp.owner=_newOwner;
        
         sellItems.push(temp);
         
          Item storage it=all_Items[_username][index];
          it.isTransacted=true;
         
         
         
        
    }
    
    
    function getNumberOfItems(string memory _username) public  view returns (uint)
    {
       Item[] storage allItems=all_Items[_username];
        
         return allItems.length;
    }
  
    function getBuyItems(string memory _username,uint index)public view returns(string memory,string memory,uint,string memory,bool)
    {
        Item memory tempItem=buy_Items[_username][index];
        return(tempItem.user,tempItem.name,tempItem.price,tempItem.owner,tempItem.isTransacted);
    }
 
    function getSellItems(string memory _username,uint index)public view returns(string memory,string memory,uint,string memory,bool)
    {
        Item memory tempItem=sell_Items[_username][index];
        return(tempItem.user,tempItem.name,tempItem.price,tempItem.owner,tempItem.isTransacted);
    }
    
    function getBuyLength(string memory _username)public view returns(uint)
    {   
        Item[] storage tempItems=buy_Items[_username];
        return tempItems.length;
        
    }
    
    function getSellLength(string memory _username)public view returns(uint)
    {   
        Item[] storage tempItems=sell_Items[_username];
        return tempItems.length;
        
    }
    
   
    
    




   /* struct User{
        
        string user_name;
        string full_name;
        string pass_word;
        address public_key;
        
        }
    
    
   
    
    mapping(string => User) userInfo;
    mapping(string => bool) isUserExist;
    
    constructor() public  {
                             // Set the symbol for display purposes
    }
   
    function newUser(string memory _username, string memory _fullname, string memory _password, address _publickey)  public {   //Set the details of doctors
        
       User storage u =userInfo[_username];
        
        u.user_name=_username;
        u.full_name=_fullname;
        u.pass_word=_password;
        u.public_key=_publickey;
        isUserExist[_username] = true;
    }
    
    
    function getUser(string memory _username) public view returns(string memory, string memory, string memory,address) {    //Get doctor details
        
        User memory u=userInfo[_username];
        require(isUserExist[_username] == true, "Record does not exist...");
        return (u.user_name,u.full_name,u.pass_word,u.public_key);
    }
    
    */
   
    
}
