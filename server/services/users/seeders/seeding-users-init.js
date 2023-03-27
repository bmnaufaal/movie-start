const usersData = require('./users-init.json')

const { MongoClient } = require("mongodb");

// Replace the uri string with your connection string.
const uri = "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.8.0";

const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db('db_movie');
    const users = database.collection('users');

    // Query for a movie that has the title 'Back to the Future'
    
    const option = { ordered: true }
    const result = await users.insertMany(usersData, option)

    console.log(result);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);