const express = require("express");
const operacoes = require("./conexao");
const cors = require("cors")


const servidor = express();

servidor.use(cors);


servidor.get("/", async (req, res)=>{
    const data = await operacoes.getOne();
    res.send(data)
})

servidor.post("/", async(req, res)=>{
    const objDoCorpo = req.body;

   const data = await operacoes.insert(JSON.parse(objDoCorpo));

   res.send(data)
})

const port = 5000
servidor.listen(3000, ()=>{
    console.log("Running server in " + port );
});