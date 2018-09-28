const express = require('express');
const mySQL   = require('mysql');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const connectionPool = mySQL.createPool({
    connectionLimit: 1000,
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'rockDB64',
    database: 'servicify',
    debug: 'true'
});

//Here we establish the routes
app.get('/',(request,response)=>{
    response.send('There is nothing here of your interest')
})

app.post('/usr/create',(request,response)=>{

});

//Listen @ port 3000
app.listen(3000,()=>{
    console.log('listening at port 3000');
})