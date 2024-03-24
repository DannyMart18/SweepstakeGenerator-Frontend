const Participant = ({ participant, onEdit }) => {
    return (
      <div className="card mb-2">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <span className="card-title h5">{participant.name} (Horses: {participant.numHorses})</span>
            <button onClick={() => onEdit(participant)} className="btn btn-outline-secondary btn-sm">Edit</button>
          </div>
        </div>
      </div>
    );
  };
  