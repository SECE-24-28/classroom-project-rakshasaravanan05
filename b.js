const { MongoClient, ObjectId } = require('mongodb');

const url = 'mongodb://localhost:27017/';
const dbName = 'database1';
const collectorName = 'users';

const client = new MongoClient(url);

async function main() {
    try {
        await client.connect();
        console.log('Connected successfully to MongoDB');

        const db = client.db(dbName);
        const collection = db.collection(collectorName);

        console.log('\n --- INSERT MANY  OPERATION ---');
        const newUser = [{ name: 'John Doe', email: 'john@example.com', age: 30 },
                         { name:'Raja',email: 'raja@example.com', age: 26},
                         { name:'Surya',email:'surya@example.com', age: 35}];
        const insertResult = await collection.insertMany(newUser);

        console.log('Inserted document ID:', insertResult.insertedId);
    }
    catch (error) {
        console.log('Error:', error);
    }
    finally {
        await client.close();
        console.log('\nConnection closed');
    }
}

main();
