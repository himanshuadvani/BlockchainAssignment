let mContract = web3.eth.contract(config.cabi).at(config.caddress);
console.log(mContract);

let publicContract = web3.eth.contract(public_config.cabi).at(public_config.caddress);



var users=[];
function back()
{
  $("#homepage").hide();
            $("#signup_form").hide();
$("#login_form").show();

}
function newUser()
{
 
    var fname=$("#fname").val();
    var uname=$("#uname").val();
    var pword=$("#pword").val();
    var pubkey=$("#pubkey").val();
    console.log(fname+uname+pword+pubkey);
    mContract.newUser(uname,fname,pword,pubkey,function(err,res){
        if(res!=null)
        {
            console.log("Response: "+res);
            alert("User created successfully...");
            window.location.href="http://localhost:3913";

          }
          else
              console.log("Error: "+err);
      });
}

function loginUser()
{
    var username=$("#username").val();
    var passname=$("#password").val();

    var noOfUsers;


    if(username=="admin")
    {
      if(passname=="admin")
      {
        var admin=["admin","Admin","admin","0x3BAAa86674d6cED61bc4ff56dE482111EAE78C50"];
        sessionStorage.setItem('username',admin);
                var arr=[];
                arr=sessionStorage.getItem('username').split(',');
                var name="Welcome, "+arr[1];
                console.log(name);
                $("#user").text(name);
                $("#signup_form").hide();
                $("#login_form").hide();
                $("#homepage").show();
                $("#market").hide();
                
                $("#home").hide();
                //home();


                $("#viewProfile").hide();
      $("#viewHistory").hide();
      $("#admin_home").show();
      $("#PendReq").show();
      pendreq();

  
      }

    }
    else{
      mContract.getNoOfUsers(function(err,res){
        if(res!=null)
        {
          console.log("num of users: "+res);
          noOfUsers=res;
          console.log(typeof(noOfUsers));
          for(var i=0;i<noOfUsers;i++)
          {
            console.log("inside for loop");
            mContract.getUserFromIndex(i,function(err,res){
              console.log("User :"+res);
              if(res[0]==username)
              {
                if(passname==res[2])
                {
                  sessionStorage.setItem('username',res);
                console.log("Sessionstorage: "+sessionStorage.getItem('username'));
                var name="Welcome, "+res[1];
                console.log(name);
                $("#user").text(name);
                $("#signup_form").hide();
                $("#login_form").hide();
                $("#homepage").show();
                $("#market").show();
                $("#market").show();
                $("#reqTokens").hide();
                $("#home").show();
                home();
               
                $("#viewProfile").hide();
      $("#viewHistory").hide();
      
  
      
                
               }
               else
               {
                  console.log("Invalid passsword");
               }
                 }
                 
              });
              
  
                
            }
  
          }
  
          else 
        console.log(err);
        });
        
    }
   
    
    

  


    /*mContract.getUserFromUsername(username,function(err,res){
        if(res!=null)
        {
          if(passname==res[2])
          {
            sessionStorage.setItem('username',res);
          console.log("Sessionstorage: "+sessionStorage.getItem('username'));
          var name="Welcome, "+res[1];
          console.log(name);
          $("#user").text(name);
          $("#signup_form").hide();
          $("#login_form").hide();
          $("#homepage").show();
          $("#market").show();
         
          $("#viewProfile").hide();
$("#viewHistory").hide();
          
         }
         else
         {
            console.log("Invalid passsword");
         }
           }
          else
          {
            console.log("Invalid username");
              console.log("Error: "+err);
            }
      });*/
    
}



function logoutUser()
{
  sessionStorage.clear();
  window.location.href="http://localhost:3913";
}


function home()
{
  $("#home").show();
  $( "#allItems" ).empty();
  $("#viewProfile").hide();
  $("#viewHistory").hide(); 
  $("#addeditItem").hide();
  $("#reqTokens").hide();
  var arr=[];
  var temp=sessionStorage.getItem('username');
  arr=temp.split(',');
  

  function getItemUsingIndex(_username,_index)
  {
    var resp=[];
    var itemData="";
   


    mContract.getItems(_username,_index,function(err,res){
      if(res!=null)
      {
        
        resp=res;
        console.log(res);
        if(res[4]==false)
        {
          resp.push(res);
          console.log("res: "+resp);
        itemData+= '<div class="panel panel-default">';
                itemData+='<div class="panel-body" style="border-style:solid;background-color: white;border-width:0.5px;border-radius:5px;margin:10px;">';
                itemData+='&nbsp;&nbsp;Item: '+res[1]+'<br>&nbsp;&nbsp;Price:<b> '+res[2]+' SHOP tokens</b><br>&nbsp;&nbsp;Owner: '+res[3]+'<br>&nbsp&nbsp';

                if(arr[0]!=res[0])
                {
                itemData+='<div style="display:flex;margin-left:10px;"><button class="btn btn-danger" onClick="transferTokens(\''+resp+'\');">Transfer Tokens</button>&nbsp;&nbsp;&nbsp;';
                itemData+='<button class="btn btn-primary" onClick="buyItem(\''+res+'\');">Buy</button></div>';
                itemData+='<small style="color:red;margin-left:10px;">To buy, you need to transfer tokens to respective owners account.</small>'
               
              }
                itemData+='<br><br></div></div>';
                $("#allItems").append(itemData);}
        
      }

        else
        console.log(err);
          
        
      });
    
  
  }


  mContract.getNoOfUsers(function(err,res1){

    if(res1!=null)
    {
      console.log("No of users: "+res1);
      var len=res1;
      for(var i=0;i<len;i++)
      {
        mContract.getUserFromIndex(i,function(err,res2){
          if(res2!=null)
          {
            
            users.push(res2);
            var user=res2[0];
            console.log("From home: "+user);
            mContract.getNumberOfItems(res2[0],function(err,res3){
            if(res3!=null)
            {
              var len=res3.toJSON();
          
            for(var j=0;j<len;j++)
            {
              
              
              getItemUsingIndex(user,j);
              console.log(j);
              /* console.log("\nj: "+j);
              
                
                
                */
                
              }
              
            }
            
            
            });

          }
        });
      }

    }
    
  });



}

function viewProfile()
{
  
  $("#viewProfile").show();
  $("#viewHistory").hide();
  $("#addeditItem").hide();
  $("#home").hide();
  $("#reqTokens").hide();
  $("#profile").empty();


  var arr=[];
  arr=sessionStorage.getItem('username').split(',');
  console.log(arr[0]);
  itemData='<br><h2 style="margin:10px">Profile</h2>';
  itemData+= '<div class="panel panel-default">';
            itemData+='<div class="panel-body">';
            itemData+='&nbsp;&nbsp;Full-Name: '+arr[1]+'<br>&nbsp;&nbsp;User-name: '+arr[0]+'<br>&nbsp;&nbsp;<b>Account: </b>'+arr[3]+'<br>&nbsp&nbsp';

            
            itemData+='<br><br></div></div>';
            $("#profile").append(itemData);



}




function addItem()
{
  $("#home").hide();
  $("#viewProfile").hide();
  $("#viewHistory").hide();
  $("#addeditItem").show();
  $("#reqTokens").hide();

}


function addNewItem()
{
  var itemName=$("#itemName").val();
  var itemPrice=$("#itemPrice").val();
  var arr=[];
  var temp=sessionStorage.getItem('username');
  arr=temp.split(',');
  var itemOwner=arr[0];
  console.log("name: "+itemName+",price: "+itemPrice+",owner: "+itemOwner);
  mContract.addItem(itemOwner,itemName,itemPrice,itemOwner,function(err,res){
    if(res!=null)
    {
      console.log("Response: "+res);
      alert("Item added successfully");
      $("#addeditItem").hide();
      $("#home").show();
      home();
      

      }
      else
      console.log(err);
         
  });

}



function buyItem(temp)
{

  var allItems=new Array();
  var flag=0;
  var itemToBuy;
  var arr=[];
  var t=sessionStorage.getItem('username');
  arr=t.split(',');
  console.log("inside buyitem");
  console.log("current user: "+arr[0]);

  var data=[];
  data=temp.split(',');
  console.log(data);

  mContract.getNumberOfItems(data[0],function(err,res){
    if(res!=null)
    {
      var len=res.toJSON();
      ///console.log(len);
      var index=-1;
     for(var j=0;j<len;j++)
     {
       index++;
      mContract.getItems(data[0],j,function(err,res){
        if(res!=null)
        {
          //console.log(res);
          allItems.push(res[1]);
          for(var i=0;i<allItems.length;i++)
        {
          if(allItems[i]==data[1])
          {
            console.log("Item found at: "+i+"  ofusername: "+data[0]);

            mContract.buyItem(data[0],i,arr[0],function(err,res){
              if(res!=null)
              {
                console.log("Response from contract buyitem: "+res);
                $("#home").show();
                home();

                viewHistory();
              }
              else{
                console.log("Error: "+err);
              }


          });
        }
        }}
          else{
          console.log(err);
        }

 
        });
        
        
        
       }
      
     }
    
    
    });
 

}




function viewHistory()
{
  $("#reqTokens").hide();
  
  $("#viewProfile").hide();
  $("#viewHistory").show();
  $("#addeditItem").hide();
  $("#home").hide();
  $("#allHistory" ).empty();
  viewBuyHistory();
  viewSellHistory();


}

function viewBuyHistory()
{
  
  
  var arr=[];
  var t=sessionStorage.getItem('username');
  arr=t.split(',');
  var loggedInUser=arr[0];
  console.log(loggedInUser);

  mContract.getBuyLength(loggedInUser,function(err,res){
    if(res!=null)
    {
      console.log("buy history: "+res.toJSON());
      var len=res.toJSON();
      for(var i=0;i<len;i++)
      {


        displayBuy(loggedInUser,i);
        
      }

    }
    else{
      
    }


});


}




function displayBuy(loggedInUser,i)
{
  var itemData="";
  mContract.getBuyItems(loggedInUser,i,function(err,res){
    if(res!=null)
    {
      console.log("item: "+res[1]+",bought from : "+res[3]);
      itemData+= '<div class="panel panel-default">';
           itemData+='<div class="panel-body" style="border-style:solid;background-color: white;border-width:0.5px;border-radius:5px;margin:10px;">';
           itemData+='&nbsp;&nbsp;Item: '+res[1]+'<br>&nbsp;&nbsp;Price: '+res[2]+' SHOP tokens<br>&nbsp;&nbsp;<b>Bought-from: </b>'+res[3]+'<br>&nbsp&nbsp';

          
          itemData+='<br><br></div></div>';
           $("#allHistory").append(itemData);
    }
    else
    console.log(err);
    });

}



function viewSellHistory()
{
 
  var itemData="<h3>Sold To:</h3>";
  var arr=[];
  var t=sessionStorage.getItem('username');
  arr=t.split(',');
  var loggedInUser=arr[0];
  console.log(loggedInUser);
  mContract.getSellLength(loggedInUser,function(err,res){
    if(res!=null)
    {
      console.log("sell history: "+res.toJSON());

      var len=res.toJSON();
      for(var i=0;i<len;i++)
      {

        displaySell(loggedInUser,i); 
      
      }

    }
    else{
      console.log(err);
      
    }

    });
}

function displaySell(loggedInUser,i)
{
  var itemData="";
  mContract.getSellItems(loggedInUser,i,function(err,res){
    if(res!=null)
    {
      console.log("item: "+res[1]+",bought from : "+res[3]);
      itemData+= '<div class="panel panel-default">';
           itemData+='<div class="panel-body" style="border-style:solid;background-color: white;border-width:0.5px;border-radius:5px;margin:10px;">';
           itemData+='&nbsp;&nbsp;Item: '+res[1]+'<br>&nbsp;&nbsp;Price: '+res[2]+' SHOP tokens<br>&nbsp;&nbsp;<b>Sold-to: </b>'+res[3]+'<br>&nbsp&nbsp';

          
          itemData+='<br><br></div></div>';
           $("#allHistory").append(itemData);
    }
    else
    console.log(err);
    });

}



function viewAdminProfile()
{
  $("#viewPendReq").hide();
  $("#viewAccReq").hide();
  $("#viewAdminProfile").show();
  $("#adminProfile").empty();

  var balance;

 
 


  var arr=[];
  arr=sessionStorage.getItem('username').split(',');
  console.log(arr[0]);



  itemData='<br><h2 style="margin:10px">Profile</h2>';
  itemData+= '<div class="panel panel-default">';
            itemData+='<div class="panel-body">';
            itemData+='&nbsp;&nbsp;Full-Name: '+arr[1]+'<br>&nbsp;&nbsp;User-name: '+arr[0]+'<br>&nbsp;&nbsp;<b>Account: </b>'+arr[3];

            publicContract.balanceOf(arr[3],function(err,res){
              if(res!=null)
              {
                console.log(res.toJSON());
                balance=res.toJSON();
                 itemData+='<br>&nbsp;&nbsp;<b>Balance: </b>'+balance+' SHOP tokens<br>&nbsp&nbsp';    
                 itemData+='<br><br></div></div>';
            $("#adminProfile").append(itemData);    
              }
            });
          
            
            


}


function pendreq()
{
  $("#viewAccReq").hide();
  $("#viewAdminProfile").hide();
  
  $("#viewPendReq").show();
  $("#PendReq").empty();
  
  
  var arr=[];
  var t=sessionStorage.getItem('username');
  arr=t.split(',');


function getReqUsingIndex(j)
{
  var itemData="";
  publicContract.getRequest(j,function(err,res){
    if(res!=null)
    {
      if(res[3]==false)
      {
      console.log("request response: "+res);
      itemData+= '<div class="panel panel-default">';
      itemData+='<div class="panel-body" style="border-style:solid;background-color: white;border-width:0.5px;border-radius:5px;margin:10px;">';
      itemData+='&nbsp;&nbsp;Username: '+res[0]+'<br>&nbsp;&nbsp;Amount: '+res[2]+'<br>&nbsp;&nbsp;<br>&nbsp&nbsp';
      itemData+='<button class="btn btn-primary" onClick="sendNewTokens(\''+res+'\');">Accept</button>';
     
     itemData+='<br><br></div></div>';
      $("#PendReq").append(itemData);
    }
    }

    
    else
    console.log(err);
    });
}



    publicContract.getRequestLength(function(err,res){
      if(res!=null)
      {
       console.log(res.toJSON());
       var leng=res.toJSON();
       for(var i=0;i<leng;i++)
       {
        getReqUsingIndex(i)
       }
        

      }
      else
        console.log(err);
    });
  
}

function accreq()
{
  $("#viewAdminProfile").hide();
  
  $("#viewPendReq").hide();
 
  $("#viewAccReq").show();
  $("#AccReq").empty();
  
  
  var arr=[];
  var t=sessionStorage.getItem('username');
  arr=t.split(',');


function getReqUsingIndex(j)
{
  var itemData="";
  publicContract.getRequest(j,function(err,res){
    if(res!=null)
    {
      if(res[3]==true)
      {
      console.log("request response: "+res);
      itemData+= '<div class="panel panel-default">';
      itemData+='<div class="panel-body" style="border-style:solid;background-color: white;border-width:0.5px;border-radius:5px;margin:10px;">';
      itemData+='&nbsp;&nbsp;Username: '+res[0]+'<br>&nbsp;&nbsp;Amount: '+res[2]+'<br>&nbsp;&nbsp;<br>&nbsp&nbsp';
      
     
     itemData+='<br><br></div></div>';
      $("#AccReq").append(itemData);
    }
    }

    
    else
    console.log(err);
    });
}



    publicContract.getRequestLength(function(err,res){
      if(res!=null)
      {
       console.log(res.toJSON());
       var leng=res.toJSON();
       for(var i=0;i<leng;i++)
       {
        getReqUsingIndex(i)
       }
        

      }
      else
        console.log(err);
    });


}

function viewreqTokens()
{
  console.log("Inside viewreqTokens()");
  $("#viewProfile").hide();
  $("#viewHistory").hide();
  $("#addeditItem").hide();
  $("#home").hide();
  $("#reqTokens").show();

  var arr=[];
  var t=sessionStorage.getItem('username');
  arr=t.split(',');
  publicContract.balanceOf(arr[3],function(err,res){
    if(res!=null)
    {
      var tokn="Token Balance: "+res.toJSON()+" SHOP tokens";
                console.log(tokn);
                $("#avltokn").text(tokn);
                
                
    }
  });



}

function sendreq()
{
  var noOfTokens=parseInt($("#noOfTokens").val());
  console.log(noOfTokens);

  var arr=[];
  var t=sessionStorage.getItem('username');
  arr=t.split(',');
  publicContract.request_token(arr[0],arr[3],noOfTokens,function(err,res){
    if(res!=null)
    {
     console.log(res);
    }
    else
      console.log(err);
  });

}

function sendNewTokens(temp)
{
  console.log(temp);
  var data=[]
  data=temp.split(',');
  console.log(data[0]);
  console.log(data[1]);
  console.log(data[2]);
  console.log(data[3]);
  console.log(data[4]);

  
  publicContract.accept_token(data[0],data[1],data[2],data[4],function(err,res){
    if(res!=null)
    {
     console.log("Accept token: "+res);
     publicContract.transfer(data[1],data[2],function(err,res){
      if(res!=null)
      {
        console.log("transfer: "+res);
        pendreq();
      }
    
    });
    }
    else
      console.log(err);
  });
  
}







function transferTokens(res)
{
  var data=[];
  data=res.split(',');
  
  var add;
  var _price=parseInt(data[2]);
    console.log(_price);
 
    console.log(data);
    for(var i=0;i<users.length;i++)
    {
      if(data[0]==users[i][0])
      {
        add=users[i][3];
        break;
      }
    }

    console.log("Address: "+add);
    console.log("Price: "+_price);

    
  
  publicContract.transfer(add,_price,function(err,res){
    if(res!=null)
    {
      console.log("After buy:"+res);
      alert("Tokens transfered successfully...");
    }
    else
    console.log(err);
  });
}