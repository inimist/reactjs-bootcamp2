import React, { useEffect, useState } from 'react'
import axios from 'axios';
import OptionButton from './button/Optionbutton';

function QuestionBank({ setActivePage }) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/question').then((res) => {
      setData(res.data);
      setLoading(false);
    })
  }, [])

  const handleDelete = (id) => {
    axios.delete('question/delete/' + id).then((res) => {
      setLoading(true);
      if (res.data == 'deleted') {
        axios.get('/question').then((res) => {
          setData(res.data);
          setLoading(false);
        })
      }
    })
  }

  return (
    <>

      <div className="container">
        <OptionButton setActivePage={setActivePage} />
        <h2>Question Bank</h2>
        <div className="table-container">
          {loading ? ( // Show loading spinner while data is being fetched
            <div className="loading-spinner">
              <i className="fas fa-spinner fa-spin"></i>
            </div>
          ) : (
            <table className="quiz-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Action</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>QuestionType</th>
                  <th>Correct Answer</th>

                </tr>
              </thead>
              <tbody>
                {data.length && data.map((val, index) => {
                  return (<tr key={val.id}>
                    <td>{index + 1}</td>
                    <td><i className="fas fa-edit" title="Edit"></i>&nbsp;&nbsp;&nbsp;&nbsp;<i className="fas fa-times" title="Delete" onClick={() => handleDelete(val.id)}></i></td>
                    <td>{val.title}</td>
                    <td>{val.description}</td>
                    <td>{val.question_type.title}</td>
                    <td>{val.question_answers !== null && val.question_answers.correct_answer}</td>
                  </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  )
}

export default QuestionBank