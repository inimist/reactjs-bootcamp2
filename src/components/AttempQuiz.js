import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';


function AttemptQuiz({ quizId, quizData, quizAttemptclick }) {
  const { quiz_slots } = quizData;
  const { register, handleSubmit } = useForm();
  const [result, setResult] = useState({});

  const handleQuizAttempt = (data) => {
    axios.post('/quizAttempt/create', data).then((res) => {
      setResult(res.data);
      quizAttemptclick(res.data.id);
    })
  }

  return (
    <div className='container'>
      <form onSubmit={handleSubmit(handleQuizAttempt)}>
        <input type='hidden' {...register('quiz_id')} value={quizId} />
        <input type='hidden' {...register('user_id')} value='1' />
        {quiz_slots && quiz_slots.map((res, index) => (
          <div key={res.question.id} className='my-3'>
            <div className="ms-2">
              <h6>{index + 1}. {res.question.title}</h6>
              <div className='my-0 ms-2'>
                {/* Splitting answer options and rendering them */}
                {res.question.question_answers.answer_options &&
                  res.question.question_answers.answer_options.split(',').map((opt, optIndex) => (
                    <div key={optIndex}>
                      <input type='radio' value={opt}  {...register('questionAttempt[' + res.question.id + ']')} />
                      <span className="ms-1">{opt}</span>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        ))}
        <button type="submit" className="btn btn-primary mt-2 w-25">Submit</button>
      </form>
    </div>
  );
}

export default AttemptQuiz;
