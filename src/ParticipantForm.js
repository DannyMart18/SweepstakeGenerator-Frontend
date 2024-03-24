import React from 'react';
import { useForm } from 'react-hook-form';

const ParticipantForm = ({ onSubmit }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const onFormSubmit = data => {
        onSubmit(data);
        reset(); // Reset the form fields
    };

    return (
        <div className="mb-4">
            <form onSubmit={handleSubmit(onFormSubmit)} className="row g-3">
                <div className="col-md-6">
                    <input
                        {...register("name", {
                            required: "Name is required",
                            pattern: {
                                value: /\S+/,
                                message: "Name cannot be just whitespace"
                            }
                        })}
                        placeholder="Name"
                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                        aria-describedby="nameError"
                    />
                    {errors.name && (
                        <div id="nameError" className="invalid-feedback">
                            {errors.name.message}
                        </div>
                    )}
                </div>
                <div className="col-md-4">
                    <input
                        {...register("numHorses", {
                            required: "Number of Horses is required",
                            min: {
                                value: 1,
                                message: "At least one horse is required"
                            },
                            valueAsNumber: true
                        })}
                        type="number"
                        placeholder="Number of Horses"
                        className={`form-control ${errors.numHorses ? 'is-invalid' : ''}`}
                        aria-describedby="numHorsesError"
                    />
                    {errors.numHorses && (
                        <div id="numHorsesError" className="invalid-feedback">
                            {errors.numHorses.message}
                        </div>
                    )}
                </div>
                <div className="col-md-2">
                    <button type="submit" className="btn btn-primary w-100">
                        Add Participant
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ParticipantForm;
