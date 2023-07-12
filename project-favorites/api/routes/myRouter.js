const express = require("express")
const { collections } = require("../service/database.service")

const myRouter = express.Router()

myRouter.use(express.json())

myRouter.get("/", async (req, res)=>{
    try {
        const favoritos = await collections.favorites.find({}).toArray()
        res.status(200).send(favoritos)
    } catch (error) {
        res.send(500).json({mensage: `${error}`})
    }
})

myRouter.get("/:id", async (req, res) => {
    const id = req?.params?.["id"];

    try {
        
        const query = { _id};
        const favorite = await collections.favorites?.findOne(query);

        if (favorite) {
            res.status(200).send(favorite);
        }
    } catch (error) {
        res.status(404).send(`Não foi possível encontrar um documento correspondente com o ID especificado: ${req.params?.["id"]}`);
    }
});

myRouter.post("/", async (req, res) => {
    try {
        const newFavorite = req.body; 
        const result = await collections.favorites?.insertOne(newFavorite);

        result
            ? res.status(201).send(`Inseriu com sucesso ${result.insertedId}`) 
            : res.status(500).send("Não conseguiu inserir."); 
    } catch (error) {
        console.error(error);
        res.status(400).json({mensage: `${error}`});
    }
});

myRouter.put("/:id", async (req, res) => {
    const id = req?.params?.['id']; 

    try {
        const updateFavorite = req.body; 
        const query = { _id: new ObjectId(id) };
      
        const result = await collections.favorites?.updateOne(query, { $set: updateFavorite });

        result
            ? res.status(200).send(`Atualizou com sucesso id:${id}`) 
            : res.status(304).send(`deu erro: id:${id}`); 
    } catch (error) {
        console.error(`${error.message}`);
        res.status(400).send(error.message);
    }
});

myRouter.delete("/:id", async (req, res) => {
    const id = req?.params?.["id"]; 

    try {
        const query = { _id: new ObjectId(id) };
        const result = await collections.favorite?.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`deletou com sucesso id: ${id}`);
        } else if (!result) {
            res.status(400).send(`nao deletou`);
        } else if (!result.deletedCount) {
            res.status(404).send(`não achou`); 
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});


module.exports = myRouter