const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://megha:pass@cluster0.ur9mz.mongodb.net/?retryWrites=true&w=majority&authMechanism=DEFAULT";

async function fetchMongoData() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    console.log("MongoDB connection is successful");

    const cursor = await client.db("aircraft").collection("airplanes").find({});
    const results = await cursor.toArray();

    console.log(results); 

    return results;
  } catch (error) {
    console.error("MongoDB error:", error);
    throw new Error("Error fetching data from MongoDB");
  } finally {
    await client.close();
    console.log("MongoDB connection closed");
  }
}

exports.handler = async (event, context) => {
  try {
    const data = await fetchMongoData();
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', 
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: 'Error fetching data from MongoDB',
    };
  }
};


  
