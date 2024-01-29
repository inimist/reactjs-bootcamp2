import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2';

function CreateQuiz() {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const onSubmit = (data) => {
        axios.post('/quiz/create', data).then((res) => {
            if (res.data == 'success') {
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    //footer: '<a href="#">Why do I have this issue?</a>'
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Sorry some error occured!",
                    //html: '<b>Result :' + res.data.correctquestions + '/' + res.data.totalquestions + '</b>',
                    //footer: '<a href="#">Why do I have this issue?</a>'
                });
            }
        })
    }
    return (
        <div className='container'>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* <input type='hidden' {...register('creator_id')}  defaultValue="1"/> */}
                <div className="form-group">
                    <label htmlFor="quiz-name">Quiz Name</label>
                    <input
                        type="text"
                        id="quiz-name"
                        className={`form-control ${errors.questionTitle ? 'is-invalid' : ''}`}
                        placeholder="Enter quiz name"
                        {...register('name', { required: 'Quiz name is required' })}
                    />
                    {errors.questionTitle && <span className="invalid-feedback">{errors.questionTitle.message}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                        placeholder="Enter description"
                        {...register('description', { required: 'Description is required' })}
                    ></textarea>
                    {errors.description && <span className="invalid-feedback">{errors.description.message}</span>}
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default CreateQuiz