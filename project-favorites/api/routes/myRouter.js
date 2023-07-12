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

favoritesRouter.get("/:id", async (req, res) => {
    const id = req?.params?.["id"];

    try {
        
        const query = { _id};
        const favorite = await collections.favorites?.findOne(query);

        if (favorite) {
            res.status(200).send(favorite);
        }
    } catch (error) {
        res.status(404).send(`Não foi possível encontrar um documento correspondente com o ID especificado: ${req.params?.["id"]}`); // nao foi encontrado
    }
});


module.exports = myRouter