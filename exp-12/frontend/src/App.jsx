import { useEffect, useState } from 'react';
import './App.css';

const API = 'http://localhost:5000/api/students';

function App() {
    const [students, setStudents] = useState([]);
    const [name, setName] = useState('');
    const [department, setDepartment] = useState('');
    const [editId, setEditId] = useState(null);
    const [message, setMessage] = useState('');

    async function loadStudents() {
        const response = await fetch(API);
        const data = await response.json();
        setStudents(data);
    }

    useEffect(() => {
        loadStudents();
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();

        const url = editId ? `${API}/${editId}` : API;
        const method = editId ? 'PUT' : 'POST';

        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, department })
        });

        const data = await response.json();

        setMessage(data.message || 'Student added successfully!');
        setName('');
        setDepartment('');
        setEditId(null);

        loadStudents();
    }

    function editStudent(student) {
        setName(student.name);
        setDepartment(student.department);
        setEditId(student._id);
        setMessage('');
    }

    async function deleteStudent(id) {
        if (window.confirm('Do you want to delete this student?')) {
            const response = await fetch(`${API}/${id}`, {
                method: 'DELETE'
            });

            const data = await response.json();
            setMessage(data.message);
            loadStudents();
        }
    }

    return (
        <div className="container">
            <header>
                <h1>RoboPulse</h1>
                <p>AI & Robotics | Student Management</p>
            </header>

            <section className="form-box">
                <h2>{editId ? 'Edit Student' : 'Add Student'}</h2>

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Student Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                    <input
                        type="text"
                        placeholder="Department"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        required
                    />

                    <button type="submit">
                        {editId ? 'Update Student' : 'Add Student'}
                    </button>

                    {editId && (
                        <button
                            type="button"
                            className="cancel"
                            onClick={() => {
                                setEditId(null);
                                setName('');
                                setDepartment('');
                            }}
                        >
                            Cancel
                        </button>
                    )}
                </form>

                {message && <p className="message">{message}</p>}
            </section>

            <section className="records">
                <h2>Student Records</h2>

                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Department</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {students.map((student) => (
                            <tr key={student._id}>
                                <td>{student.name}</td>
                                <td>{student.department}</td>
                                <td>
                                    <button
                                        onClick={() => editStudent(student)}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="delete"
                                        onClick={() => deleteStudent(student._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {students.length === 0 && (
                    <p className="empty">No student records yet. Add one above!</p>
                )}
            </section>

            <footer>RoboPulse © 2026 | Learning Today, Building Tomorrow</footer>
        </div>
    );
}

export default App;