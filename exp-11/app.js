const { MongoClient } = require('mongodb');

const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);

async function main() {
    try {
        await client.connect();
        console.log('Connected to MongoDB successfully');

        const db = client.db('RoboPulseDB');
        const students = db.collection('robotics_students');

        // Insert student records
        const result = await students.insertMany([
            {
                name: 'Arun',
                department: 'CSE',
                year: 2
            },
            {
                name: 'Priya',
                department: 'CSE',
                year: 3
            },
            {
                name: 'Rahul',
                department: 'ECE',
                year: 2
            }
        ]);

        console.log('Inserted records:', result.insertedCount);

        // Display all students
        const allStudents = await students.find({}).toArray();

        console.log('Student Records:');
        console.log(allStudents);

        // Display CSE students
        const cseStudents = await students.find({
            department: 'CSE'
        }).toArray();

        console.log('CSE Students:');
        console.log(cseStudents);

        // Update a student record
        const updateResult = await students.updateOne(
            { name: 'Arun' },
            { $set: { year: 3 } }
        );

        console.log(
            'Updated records:',
            updateResult.modifiedCount
        );

        // Delete a student record
        const deleteResult = await students.deleteOne({
            name: 'Rahul'
        });

        console.log(
            'Deleted records:',
            deleteResult.deletedCount
        );

    } catch (error) {
        console.log('Database error:', error.message);
    } finally {
        await client.close();
        console.log('MongoDB connection closed');
    }
}

main();