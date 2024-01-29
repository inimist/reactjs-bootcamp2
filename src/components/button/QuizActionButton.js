import React, { useState } from 'react'

function QuizActionButton({ handleQuizClick, handleAttemptClick, quizId ,quizData}) {
    const [isOpen, setIsOpen] = useState(false);
    const {quiz_slots} = quizData;

    const toggleOptions = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="option-button-container">
            <button className="option-button" onClick={toggleOptions}>
                <i className="fas fa-list" title="view"></i>
            </button>
            {isOpen && (
                <div className="options-menu">
                    <ul>
                    <li onClick={() => handleQuizClick(quizId, 'editQuiz')}>Edit Quiz</li>
                        <li onClick={() => handleQuizClick(quizId, 'quizQuestion')}>Add Question to Quiz</li>
                        <li onClick={() => handleAttemptClick(quizId)}>Attempt Quiz</li>
                    </ul>
                </div>
            )}
        </div>
    );
}

export default QuizActionButton