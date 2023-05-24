const { MongoClient } = require("mongodb");

const connect = async (uri, password) => {
  try {
    const dbUri = uri.replace("<password>", password);
    const client = new MongoClient(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await client.connect();
    console.log("MongoDB Connected");

    const collectionName = "messages"; // Yangi element qo'shilganda yangilashni olish uchun koleksiyani nomini o'zgartiring

    const changeStream = client
      .db()
      .collection(collectionName)
      .watch({ fullDocument: "updateLookup" });

  return changeStream;
  } catch (error) {
    console.log("MongoDB Connection Failed");
  }
};

// connect("mongodb+srv://aliqulovazizjon68:<password>@cluster0.1l9cumx.mongodb.net/updates?retryWrites=true&w=majority","XU2OEpZafMeIckZv")
module.exports = connect;


