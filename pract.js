const express = require('express')
const app = express()
const pg =require('pg');
const { Client } = require('pg');
const jwt = require('jsonwebtoken')

const connectionString = "postgres://postgres:Greg366.@localhost:5432/teamwork";
const client = new Client({
    connectionString:connectionString
})
client.connect(err => console.log(err))

function generateToken(id){
    const token = jwt.sign({userId : id},'secret',{expiresIn : '7d'})
    return token;
}

app.get('/feed',(req, res) =>{

    const id = req.query.userId
    const token = generateToken(id)
    client.query('SELECT * FROM articles, gifs',(err, result) =>{
        res.send(`the token is ${token} and result is ${result.rows}`)
    })
})

app.listen(5000, (err) =>{
    console.log('server running on port 5000')
})