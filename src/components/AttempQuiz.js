import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

function AttemptQuiz({ quizId, quizData }) {
  const { quiz_slots } = quizData;
  const { register, handleSubmit } = useForm();
  const [result, setResult] = useState({});

  const onSubmit = (data) => {
    axios.post('/quizAttempt/create', data).then((res) => {
      setResult(res.data);
      if (res.data.result == 'pass') {
        Swal.fire({
          icon: "success",
          title: "congratulation",
          html: '<b>Result :' + res.data.correctquestions + '/' + res.data.totalquestions + '</b>',
          footer: '<a href="#">Why do I have this issue?</a>'
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops..You need to try again!",
          html: '<b>Result :' + res.data.correctquestions + '/' + res.data.totalquestions + '</b>',
          footer: '<a href="#">Why do I have this issue?</a>'
        });
      }
    })
  }

  return (
    <div className='container'>
      <form onSubmit={handleSubmit(onSubmit)}>
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
