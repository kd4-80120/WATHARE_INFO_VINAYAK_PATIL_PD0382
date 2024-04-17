const express = require('express');
const app = express();
const port = 9999;
const cors=require('cors')
const config= require('config')
const mysql = require('mysql2');

app.use(cors("*"))
const data = require('../data.json');

const connectionDetails={
    host: config.get('server'),
    database: config.get("db"),
    user : config.get('user'),
    password : config.get('pwd')
}

var connection = mysql.createConnection(connectionDetails);
    var stmt = `SELECT * from data`;

    connection.query(stmt,(error,result)=>{
      if(error==null){
        var data = result[0];
      }
      else{
        console.log(error);
      }
    })



app.get('/data', (req, res) => {
  res.json(data);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
