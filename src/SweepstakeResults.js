import React, { useState, useMemo } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './SweepstakeResults.css'; // This file will contain the animations

const SweepstakeResults = ({ participants }) => {
    const [selectedParticipant, setSelectedParticipant] = useState(null);

    const toggleHorses = (index) => {
        setSelectedParticipant(selectedParticipant === index ? null : index);
    };

    const resultsMarkup = useMemo(() => participants.map((participant, index) => (
        <CSSTransition key={index} timeout={500} classNames="item">
            <div className="card mb-3">
                <div className="card-header" onClick={() => toggleHorses(index)}>
                    <h5 className="mb-0">{participant.name} (Horses: {participant.numHorses})</h5>
                </div>
                <TransitionGroup component={null}>
                    {selectedParticipant === index && (
                        <CSSTransition timeout={500} classNames="item">
                            <ul className="list-group list-group-flush">
                                {participant.horses.map((horse, idx) => (
                                    <li key={idx} className="list-group-item">
                                        {horse.name}
                                    </li>
                                ))}
                            </ul>
                        </CSSTransition>
                    )}
                </TransitionGroup>
            </div>
        </CSSTransition>
    )), [participants, selectedParticipant]);

    if (participants.length === 0) {
        return <div className="alert alert-info" role="alert">
            No sweepstake results to display. Generate a sweepstake to see results here.
        </div>;
    }

    return (
        <div className="results">
            <TransitionGroup>
                {resultsMarkup}
            </TransitionGroup>
        </div>
    );
};

export default SweepstakeResults;
