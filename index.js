const express = require("express");
const mysql = require("mysql2/promise");

const app = express();
app.use(express.json());

const pool = mysql.createPool({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT
});

app.get("/", (req,res)=>{
 res.send("API funcionando");
});

app.get("/emails", async (req,res)=>{
 const [rows] = await pool.query("SELECT * FROM emails");
 res.json(rows);
});

app.post("/emails", async (req,res)=>{

 const {name,email} = req.body;

 await pool.query(
  "INSERT INTO emails (name,email) VALUES (?,?)",
  [name,email]
 );

 res.json({sucesso:true});

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
 console.log("Servidor rodando");
});