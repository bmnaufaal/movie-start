const { MongoClient, ObjectId } = require("mongodb");
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url =
  "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.8.0";
const client = new MongoClient(url);

// Database Name
const dbName = "db_movie";

async function mongoConnect() {
  try {
    // Use connect method to connect to the server
    await client.connect();
    console.log("Connected successfully to server");
    const db = client.db(dbName);
    const usersCollection = db.collection("users");
    const users = await usersCollection.find({}).toArray();

    // the following code examples can be pasted here...
    return users;

    // const user = await usersCollection.findOne({
    //   _id: new ObjectId("641bc7a6ebb522281ff95796"),
    // });

    // return user;

    // const newUser = await usersCollection.insertOne({
    //   id: 3,
    //   username: "bmnaufaal3",
    //   email: "bmnaufaal3@gmail.com",
    //   password: "123456",
    //   role: "admin",
    //   phoneNumber: "12345678",
    //   address: "Indonesia",
    // });
  } catch (error) {
    await client.close();
    throw error;
  }
}

mongoConnect()
  .then((data) => console.log(data))
  .catch(console.error);
//   .finally(() => client.close());
