import React, { useState, useEffect, useRef } from 'react';

function QuizActionButton({ handleQuizClick, handleAttemptClick, quizId, quizData }) {
    const [isOpen, setIsOpen] = useState(false);
    const { quiz_slots } = quizData;
    const menuRef = useRef(null);

    const toggleOptions = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            // Clicked outside the menu, close it
            setIsOpen(false);
        }
    };

    useEffect(() => {
        // Attach event listener when the component mounts
        document.addEventListener('mousedown', handleClickOutside);

        // Clean up the event listener when the component unmounts
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="option-button-container">
            <button className="option-button" onClick={toggleOptions}>
                <i className="fas fa-list" title="view"></i>
            </button>
            {isOpen && (
                <div className="options-menu" ref={menuRef}>
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

export default QuizActionButton;
