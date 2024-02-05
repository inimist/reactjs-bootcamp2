import React from 'react'
import axios from "axios";
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import QuizActionButton from './button/QuizActionButton';
import QuizSettingButton from './button/QuizSettingButton';

function Home({ setActivePage, handleQuizClick, handleAttemptClick ,quizData}) {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('quiz').then((res) => {
            setData(res.data);
            setLoading(false);
            console.log(data);
        })
    }, [])
 
    return (

        <div className="container">
            <QuizSettingButton setActivePage={setActivePage} />
            <h2>Quiz Table</h2>
            <div className="table-container">
                {loading ? ( // Show loading spinner while data is being fetched
                    <div className="loading-spinner">
                        <i className="fas fa-spinner fa-spin"></i>
                    </div>
                ) : (
                    <table className="quiz-table">
                        <thead>
                            <tr>
                                <th>Action</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Question Count</th>
                                <th>Question Need to Pass</th>
                                <th>Show Pass Fail</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.length && data.map((val) => (
                                <tr key={val.id}>
                                    <td><QuizActionButton handleQuizClick={handleQuizClick} handleAttemptClick={handleAttemptClick} quizId={val.id} quizData ={quizData}/></td>
                                    <td>{val.name}</td>
                                    <td>{val.description}</td>
                                    <td>{val.quiz_slots.length}</td>
                                    <td>{val.minpassquestions?val.minpassquestions:'0'}%</td>
                                    <td>{val.showpassfail ? 'Yes' : 'No'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>

    )
}

export default Home