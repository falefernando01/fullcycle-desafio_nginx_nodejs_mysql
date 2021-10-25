const express = require("express")
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
}

const mysql = require('mysql')

const connection = mysql.createConnection(config)

const sql = `INSERT INTO people(name) values ('Fernando')`

connection.query(sql)

let lista = ''
connection.query('SELECT name FROM people', function (error, rows, fields) {
    if (error) throw error;
    console.log(rows)

    lista = rows.map(people => `<li>${people.name}</li>`).join('')

  });

connection.end()

app.get('/',(req,res) => {
      res.send(`
        <h1>FullCycle Rocks!</h1>
        <ul>${lista}<ul>
      `)
})

app.listen(port, ()=>{
    console.log('Rodando na porta: ' + port)
})