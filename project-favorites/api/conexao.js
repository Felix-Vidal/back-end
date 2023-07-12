const { MongoClient } = require("mongodb");

// Replace the uri string with your connection string.
const uri = "mongodb+srv://sthefany:81135644@pair-programming.r52v40e.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);

async function getOne() {
  try {
    const database = client.db('favoritos');
    const tabelaDeLinks = database.collection('links');

    // Query for a movie that has the title 'Back to the Future'
    const query = { 
        name: "Web Academy",
        url: "www.test.com" };
    const movie = await tabelaDeLinks.findOne(query);

    return movie;
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

async function insert(query) {
    try {
      const database = client.db('favoritos');
      const tabelaDeLinks = database.collection('links');
  
      // Query for a movie that has the title 'Back to the Future'
      
      const resultado = await tabelaDeLinks.insertOne(query);
  
      return resultado;
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }

  
module.exports ={
    getOne,
    insert
}


