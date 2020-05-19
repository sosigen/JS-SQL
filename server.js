const express = require('express')
const path = require('path')
const connection = require('./connection')
let app = express()
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.json({
    type: ['application/json', 'text/plain']
  }));
app.listen(5000, () => console.log("Serwer działa na porcie 5000"))

app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/public/main.html")
})
app.get("/selectTable/:table", (req, res)=>{
    let sql = `SELECT * FROM ${req.params.table}`;
    connection.query(sql, (err, result, fields) => {
        let ret = [];        if(err) throw new Error(err);
        console.log(result)
        res.set('Content-Type', 'application/json');
        res.send(result);
    });
})
app.get("/selectTable", (req, res)=>{
    res.sendFile(__dirname + "/public/select.html")
})
app.post("/addRow/:table", (req, res)=>{
    let data = req.body; 
    let cols = '';
    for(let prop in data){
        if(prop !=  Object.keys(data)[0]) cols += ','
        cols += prop;
    }
    let vals = '';
    for(let prop in data){
        if(prop !=  Object.keys(data)[0]) vals += ','
        vals += `"${data[prop]}"`
    }
    let sql = `INSERT INTO ${req.params.table}(${cols}) VALUES (${vals})`;
    connection.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result)
        res.send("OK");
    });
    
})
app.get("/addRow", (req, res)=>{
    res.sendFile(__dirname + "/public/add.html")
})

app.delete("/deleteRow/:table/:id", (req, res)=>{
    let sql = `DELETE FROM ${req.params.table} WHERE id="${req.params.id}"`;
    connection.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result)
        res.send("OK");
    });
})
app.get("/deleteRow", (req, res)=>{
    res.sendFile(__dirname + "/public/delete.html")
})


