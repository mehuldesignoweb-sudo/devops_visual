const http = require("http");
const { MongoClient } = require("mongodb");

const url = process.env.MONGO_URL;
const PORT = process.env.PORT || 3000;
const client = new MongoClient(url);

async function startServer() {
  await client.connect();
  console.log("Connected to MongoDB");

  const db = client.db("devopsdb");
  const collection = db.collection("visits");

  const server = http.createServer(async (req, res) => {
  
  console.log("Request received:", req.url);       
    if (req.url === "/") {
    await collection.insertOne({ time: new Date() });
  }


    const count = await collection.countDocuments();
   
    res.end(`Hello DevOps 🚀. Visits: ${count}`);
  });

  server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
  }

startServer();

