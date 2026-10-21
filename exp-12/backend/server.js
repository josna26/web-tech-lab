require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const client = new MongoClient(process.env.MONGO_URI);

app.use(cors());
app.use(express.json());

let students;

app.get('/api/students', async (req, res) => {
    const data = await students.find({}).toArray();
    res.json(data);
});

app.post('/api/students', async (req, res) => {
    const student = {
        name: req.body.name,
        department: req.body.department
    };

    const result = await students.insertOne(student);

    res.json({
        _id: result.insertedId,
        ...student
    });
});

app.put('/api/students/:id', async (req, res) => {
    await students.updateOne(
        { _id: new ObjectId(req.params.id) },
        {
            $set: {
                name: req.body.name,
                department: req.body.department
            }
        }
    );

    res.json({ message: 'Student updated successfully' });
});

app.delete('/api/students/:id', async (req, res) => {
    await students.deleteOne({
        _id: new ObjectId(req.params.id)
    });

    res.json({ message: 'Student deleted successfully' });
});

async function startServer() {
    try {
        await client.connect();

        const db = client.db('RoboPulseDB');
        students = db.collection('robotics_students');

        app.listen(process.env.PORT || 5000, () => {
            console.log('RoboPulse backend running on port 5000');
        });
    } catch (error) {
        console.log('Database connection failed:', error.message);
    }
}

startServer();