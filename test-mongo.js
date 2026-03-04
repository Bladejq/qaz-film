// test-mongo.js
import { MongoClient } from "mongodb";

const uri = process.env.DATABASE_URL;
const client = new MongoClient(uri);

try {
  await client.connect();
  console.log("✅ MongoDB auth OK");
} catch (e) {
  console.error("❌ MongoDB auth FAIL", e);
} finally {
  await client.close();
}