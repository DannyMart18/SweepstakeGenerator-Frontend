import React, { useState } from 'react';
import ParticipantForm from './ParticipantForm';
import SweepstakeResults from './SweepstakeResults';
import { Header, Footer } from './Header';
import axios from 'axios';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // This should be at the top


const App = () => {
    const [participants, setParticipants] = useState([]);
    const [results, setResults] = useState([]);
    const [editIndex, setEditIndex] = useState(-1);
    const [editName, setEditName] = useState('');
    const [editNumHorses, setEditNumHorses] = useState(1);
    const [error, setError] = useState('');


    const addParticipant = (participant) => {
        setParticipants([...participants, participant]);
    };

    const handleEditChange = (index) => {
        setEditIndex(index);
        setEditName(participants[index].name);
        setEditNumHorses(participants[index].numHorses);
    };

    const saveEdit = () => {
        const updatedParticipants = [...participants];
        updatedParticipants[editIndex] = { name: editName, numHorses: editNumHorses };
        setParticipants(updatedParticipants);
        setEditIndex(-1);
    };

      // Function to delete a participant
      const deleteParticipant = (index) => {
        const updatedParticipants = [...participants];
        updatedParticipants.splice(index, 1);
        setParticipants(updatedParticipants);
    };

    // Function to clear the sweepstake results
    const clearResults = () => {
        setResults([]);
    };

    const generateSweepstake = async () => {
        try {
            const response = await axios.post('https://localhost:7105/Sweepstake', participants);
            if (Array.isArray(response.data) && response.data.every(p => p.horses !== undefined)) {
                setResults(response.data);
            } else {
                console.error('Received data is not in the expected format:', response.data);
            }
        } catch (error) {
            console.error('Error generating sweepstake', error);
        }
    };

    return (
        <div className="container mt-5">
            <header className="header">
                <Header />
            </header>
            <div className="content">
            <ParticipantForm onSubmit={addParticipant} />
            {participants.map((participant, index) => (
                <div key={index} className="my-2">
                    {editIndex === index ? (
                        <div className="d-flex justify-content-between align-items-center">
                            <input
                                type="text"
                                className="form-control me-2"
                                value={editName}
                                onChange={e => setEditName(e.target.value)}
                            />
                            <input
                                type="number"
                                className="form-control me-2"
                                value={editNumHorses}
                                onChange={e => setEditNumHorses(Number(e.target.value))}
                            />
                            <button
                                className="btn btn-primary"
                                onClick={saveEdit}>
                                Save
                            </button>
                            <button className="btn btn-danger btn-sm" onClick={() => deleteParticipant(index)}>
                        Delete
                    </button>
                        </div>
                    ) : (
                        <div className="d-flex justify-content-between align-items-center">
                            <span>{participant.name} (Horses: {participant.numHorses})</span>
                            <button
                                className="btn btn-secondary btn-sm"
                                onClick={() => handleEditChange(index)}>
                                Edit
                            </button>
                        </div>
                    )}
                </div>
            ))}
            <div className="d-grid gap-2 my-4">
                <button className="btn btn-success" onClick={generateSweepstake}>Generate Sweepstake</button>
                {results.length > 0 && (
                        <button className="btn btn-warning" onClick={clearResults}>Clear Results</button>
                    )}
            </div>
            <SweepstakeResults participants={results} />
            </div>
            <Footer />

        </div>
    );
};

export default App;
