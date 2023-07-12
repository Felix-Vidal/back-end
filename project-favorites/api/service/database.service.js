const mongoDB = require("mongodb");


const collections = {
  favorites: {}
  
}
 async function connectToDatabase(){
  const client = new mongoDB.MongoClient("mongodb+srv://sthefany:81135644@pair-programming.r52v40e.mongodb.net/?retryWrites=true&w=majority")
  const db = client.db("favoritos")
  const linkCollection = db.collection("links")
  collections.favorites = linkCollection;

  console.log(
    `Sucesso ao conectar com o banco: ${db.databaseName} e colecao: ${linkCollection.collectionName}`
  );
}

module.exports ={
  connectToDatabase,
  collections
}