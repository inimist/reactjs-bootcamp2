import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import api from './user/api';

function AttemptQuiz({ quizId, quizData, quizAttemptclick }) {
  const { quiz_slots } = quizData;
  const { register, handleSubmit } = useForm();
  const [result, setResult] = useState({});
  const userId = localStorage.getItem('userId');


  const handleQuizAttempt = (data) => {
    api.post('/quizAttempt/create', data).then((res) => {
      setResult(res.data);
      quizAttemptclick(res.data.id);
    })
  }

  const renderCont = (res) => {
    const options = res.question.question_answers.answer_options.split(',');
    return options.map((opt, optIndex) => {
      if (res.question.question_type.id != '6') {
        // Render radio buttons
        return (
          <div key={optIndex}>
            <input
              type='radio'
              value={opt}
              {...register(`questionAttempt[${res.question.id}]`)}
            />
            <span className="ms-1">{opt}</span>
          </div>
        );
      } else {
        // Render checkboxes
        return (
          <div key={optIndex}>
            <input
              type='checkbox'
              value={opt}
              {...register(`questionAttempt[${res.question.id}]`)}
            />
            <span className="ms-1">{opt}</span>
          </div>
        );
      }
    });
  };
  return (
    <div className='container'>
      <form onSubmit={handleSubmit(handleQuizAttempt)}>
        <input type='hidden' {...register('quiz_id')} value={quizId} />
        <input type='hidden' {...register('user_id')} value={userId} />
        {quiz_slots && quiz_slots.map((res, index) => (
          <div key={res.question.id} className='my-3'>
            <div className="ms-2">
              <h6>{index + 1}. {res.question.title}</h6>
              <div className='my-0 ms-2'>
                {
                  renderCont(res)
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
