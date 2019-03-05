const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545'));
web3.eth.defaultAccount = '0xb70B457da6524a0035C209F98CB9e70590326A2e';

const path = require('path');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
  }));



app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.get('/', function (req, res) {
    res.render('index.html', {
        page: 'index'
    })
});
app.use('/scripts', express.static(path.join(__dirname, 'node_modules/')));
app.use('/js', express.static(path.join(__dirname, 'js/')));
app.use('/css', express.static(path.join(__dirname, 'css/')));




app.listen(3913, () => console.log('App listen on port 3913')); 



/*
app.get('/login', function (req, res) {
    res.render('index.html', {
        page: 'index'
    })
});



app.get('/signup', function (req, res) {
    res.render('Signup.html', {
        page: 'Signup'
    })
});


app.post('/home', function (req, res) {
     transaction.loginUser(con,req.body.username)

                            if(req.body.username=="admin")
                        {
                        res.render('Homepage.html', {
                            welcomename : req.body.username
                        })
                        
                    }
                    else{
                        res.render('index.html', {
                            page: 'index'
                        })

                    }
    
});*/







/*SQL Connection

var mysql = require('mysql');


con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "320375Ha!"
});

con.connect(function(err) {
  if (err) throw err;

  console.log("Connected!");
  con.query("Use blockchain", function (err, result, fields) {
    if (err) throw err;
}); 

  
});

*/