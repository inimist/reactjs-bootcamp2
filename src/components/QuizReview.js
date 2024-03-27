import axios from "axios"
import { useEffect, useState } from "react"
import { areArraysEqual } from "./functions/arrayUtils";

function QuizReview({ quizAttemptId }) {
    const [userReview, setUserReview] = useState({});


    useEffect(() => {
        axios.get('/quizAttempt/show/' + quizAttemptId).then((res) => {
            setUserReview(res.data)
        })
    }, [])

    return (
        <>
            <div className="container">
                <h4 className="mb-4">Result: {userReview.correctquestions}/{userReview.totalquestions}</h4>

                {userReview.question_attempt &&
                    userReview.question_attempt.map((opt, optIndex) => {
                        const questionsummary = opt.questionsummary.split(':');
                        const question = questionsummary[0];
                        const options = questionsummary[1].split(',');

                        if (opt.question.question_type_id != 6) {
                            return (

                                <div key={optIndex} className="mb-4">
                                    <h6>{optIndex + 1}. {question}</h6>
                                    {/* Mapping over options array */}
                                    {options.map((option, optionIndex) => {

                                        let isCorrectAnswer = opt.rightanswer.trim() === option.trim();
                                        let isUserResponseCorrect = opt.rightanswer.trim() === opt.responsesummary.trim();
                                        let isUserSelectedOption = option.trim() === opt.responsesummary.trim();

                                        let bgColor = '';
                                        let optText = '';

                                        if (isCorrectAnswer && isUserResponseCorrect) {
                                            bgColor = 'bg-success'; // Correct answer selected by the user
                                            optText = 'Your answer'
                                        } else if (isUserSelectedOption && !isUserResponseCorrect) {
                                            bgColor = 'bg-danger'; // Wrong answer selected by the user
                                            optText = 'Your answer'
                                        } else if (isCorrectAnswer && !isUserResponseCorrect) {
                                            bgColor = 'bg-light'; // Correct answer not selected by the user
                                            optText = 'Correct answer'
                                        }

                                        return (
                                            <div key={optionIndex} className={`d-flex p-2 mb-2 ${bgColor}`}>
                                                <div className="flex-grow-1">
                                                    {option}
                                                </div>
                                                {optText && (
                                                    <div className="text-right p-1" style={{ background: 'rgba(0, 0, 0, 0.2)' }}>
                                                        {optText}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        } else {
                            //{ console.log(opt) }

                            return (
                                <div key={optIndex} className="mb-4">
                                    <h6>{optIndex + 1}. {question}</h6>
                                    {options.map((option, optionIndex) => {

                                        let userResponse = opt.responsesummary.split(',');
                                        let correctAnswers = opt.rightanswer.split(',');
                                        let bgColor = '';
                                        let optText = '';
                                        if (userResponse.includes(option) && areArraysEqual(userResponse, correctAnswers)) {//All right answers
                                            bgColor = 'bg-success'; 
                                            optText = 'Your answer'
                                        }else if(userResponse.includes(option) && !correctAnswers.includes(option)){//if any of option is wrong chossen
                                            bgColor = 'bg-danger'; 
                                            optText = 'Your answer'
                                        }else if(userResponse.includes(option) && correctAnswers.includes(option)){//if any option is right
                                            bgColor = 'bg-success'; 
                                            optText = 'Your answer'
                                        }
                                        if(!userResponse.includes(option) &&  correctAnswers.includes(option)){ // Correct answer not selected by the user
                                            bgColor = 'bg-light'; 
                                            optText = 'Correct answer'
                                        }
                                        return (
                                            <div key={optionIndex} className={`d-flex p-2 mb-2 ${bgColor}`}>
                                                <div className="flex-grow-1">
                                                    {option}
                                                </div>
                                                {optText && (
                                                    <div className="text-right p-1" style={{ background: 'rgba(0, 0, 0, 0.2)' }}>
                                                        {optText}
                                                    </div>
                                                )}
                                            </div>
                                        )
                                    })}
                                </div>
                            )
                        }

                    })}
            </div>

        </>
    );
}

export default QuizReview