import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import SweetAlert2 from 'react-sweetalert2';


function QuizQuestions({ quizId }) {
    const [questionData, setQuestionData] = useState({}); //question we are fetching
    const [quizData, setQuizData] = useState({}); //Data to be posted
    const [loading, setLoading] = useState(true);
    const { register, handleSubmit } = useForm();
    const { name, description, minpassquestions, quiz_slots } = quizData; //gettign name description and minpasquestions from quizData
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        axios.get('/quiz/show/' + quizId).then((res) => {
            setQuizData(res.data);
        })
    }, [])
    useEffect(() => {
        axios.get('/question').then((res) => {
            setQuestionData(res.data);
            setLoading(false);
        })
    }, [])



    const onSubmit = (e) => {
        setLoading(true);
        const updatedData = {
            ...e,
            name: name,
            description: description,
            minpassquestions: minpassquestions,
        };
        if (updatedData['question_ids'].length) {
            axios.put('/quiz/update/' + quizId, updatedData).then((res) => {
                if (res.data == 'success') {
                    setLoading(false);
                    Swal.fire({
                        icon: "success",
                        title: "Successfull",
                        text: "Quiz Saved",
                        footer: '<a href="#">Why do I have this issue?</a>'
                    });
                }
            })
        }else{
            setLoading(false);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Sorry some error occured please try again later!",
                //footer: '<a href="#">Why do I have this issue?</a>'
            });
        }
    }

    return (
        <>

            <div className='container'>

                <h5 className='ms-1 mb-4'>Select Quitions to Add To Quiz</h5>

                {loading ? ( // Show loading spinner while data is being fetched
                    <div className="loading-spinner">
                        <i className="fas fa-spinner fa-spin"></i>
                    </div>
                ) : (
                    <>
                        <form onSubmit={handleSubmit(onSubmit)}><table className="quiz-table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>QuestionType</th>
                                    <th>Correct Answer</th>

                                </tr>
                            </thead>
                            <tbody>

                                {questionData.length ? questionData.map((val, index) => {

                                    return (<tr key={val.id}>
                                        <td><input type='checkbox' defaultChecked={quiz_slots && quiz_slots.some(item => item.question_id === val.id ? true : false)} value={val.id} {...register('question_ids')} className='form-check-input' /></td>
                                        <td>{val.title}</td>
                                        <td>{val.description}</td>
                                        <td>{val.question_type.title}</td>
                                        <td>{val.question_answers !== null && val.question_answers.correct_answer}</td>
                                    </tr>
                                    )
                                }) : (
                                    <tr>
                                        <td colSpan="6">No data available</td>
                                    </tr>
                                )}


                            </tbody>
                        </table>
                            <button type="submit" className="btn btn-primary mt-2 w-25">Submit</button>
                        </form>
                    </>
                )}
            </div >
        </>
    )
}

export default QuizQuestions