import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

function EditQuiz({ quizId }) {
    const [data, setData] = useState({
        name: '',
        description: '',
    });

    useEffect(() => {
        axios.get('/quiz/edit/' + quizId).then((res) => {
            setData({
                'name': res.data.name,
                'description': res.data.description
            });
        });
    }, [quizId]);

    const [errors, setErrors] = useState({
        name: '',
        description: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const onSubmit = (event) => {
        event.preventDefault();

        // Add your own validation logic here if needed
        if (!data.name.trim()) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                name: 'Quiz name is required',
            }));
            return;
        }

        axios.put('/quiz/update/' + quizId, data).then((res) => {
            if (res.data === 'success') {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Sorry, some error occurred!',
                });
            }
        });
    };

    return (
        <div className='container'>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="quiz-name">Quiz Name</label>
                    <input
                        type="text"
                        id="quiz-name"
                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                        placeholder="Enter quiz name"
                        name="name"
                        value={data.name}
                        onChange={handleChange}
                    />
                    {errors.name && <span className="invalid-feedback">{errors.name}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                        placeholder="Enter description"
                        name="description"
                        value={data.description}
                        onChange={handleChange}
                    ></textarea>
                    {errors.description && <span className="invalid-feedback">{errors.description}</span>}
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default EditQuiz;
