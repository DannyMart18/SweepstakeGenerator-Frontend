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
            // You might want to check for status code here as well
            if (response.data) {
                setResults(response.data);
                setError(''); // Clear any previous errors
            }
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx and error details are in error.response.data
                setError(error.response.data || "An error occurred while generating the sweepstake.");
            } else if (error.request) {
                // The request was made but no response was received
                setError("No response from the server. Please try again later.");
            } else {
                // Something happened in setting up the request that triggered an error
                setError("An error occurred while setting up the request.");
            }
        }
    };
    
    
    

    return (
        <div className="container mt-5">
            <header className="header">
                <Header />
            </header>
            <div className="info-section my-4 p-3 bg-light border rounded">
                <h2>How to Use</h2>
                <p>Welcome to the Grand National Sweepstake Generator! Add participants with their desired number of horses, and then click "Generate Sweepstake" to see the results. You can edit or delete participants before generating the sweepstake.</p>
            </div>

            <div className="content">
            {error && <div className="alert alert-danger" role="alert">{error}</div>}

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
