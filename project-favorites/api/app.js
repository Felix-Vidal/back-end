const express = require("express")
const router = require("./routes/myRouter")
const database = require("./service/database.service")
const cors = require("cors")

const app = express()


app.use(cors())

database.connectToDatabase().then(()=>{
    app.use(router)

    app.listen(3000, ()=>{
        console.log("Rodando")
    })
}).catch((error)=>{
    console.error("Erro ao conectar com o banco", error);
    process.exit()
})





