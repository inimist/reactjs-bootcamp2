import React from 'react'
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import QuizActionButton from './button/QuizActionButton';
import QuizSettingButton from './button/QuizSettingButton';
import api from './user/api';

function Home({ setActivePage, handleQuizClick, handleAttemptClick, quizData, userRole }) {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
            api.get('quiz').then((res) => {
                setData(res.data);
                setLoading(false);
            })
        
    }, [])

    return (

        <div className="container">
            {userRole == 'admin' && <QuizSettingButton setActivePage={setActivePage} />}
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
                            {data.length ? data.map((val) => (
                                <tr key={val.id}>
                                    <td><QuizActionButton handleQuizClick={handleQuizClick} handleAttemptClick={handleAttemptClick} quizId={val.id} quizData={quizData} userRole={userRole} /></td>
                                    <td>{val.name}</td>
                                    <td>{val.description}</td>
                                    <td>{val.quiz_slots.length}</td>
                                    <td>{val.minpassquestions ? val.minpassquestions : '0'}%</td>
                                    <td>{val.showpassfail ? 'Yes' : 'No'}</td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="6">No data available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>

    )
}

export default Home