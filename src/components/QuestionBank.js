import React, { useEffect, useState } from 'react'
import axios from 'axios';
import OptionButton from './button/Optionbutton';
import Swal from 'sweetalert2';

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
  const showDeleteConfirmation = (id) => {
    // Using SweetAlert2 for a more styled confirmation dialog
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        // User clicked the "Yes, delete it!" button
        handleDelete(id);
      }
    });
  };

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
                {data.length ? (
                  data.map((val, index) => (
                    <tr key={val.id}>
                      <td>{index + 1}</td>
                      <td>
                        <i className="fas fa-edit" title="Edit"></i>&nbsp;&nbsp;&nbsp;&nbsp;
                        <i
                          className="fas fa-times"
                          title="Delete"
                          onClick={() => showDeleteConfirmation(val.id)}
                        ></i>
                      </td>
                      <td>{val.title}</td>
                      <td>{val.description}</td>
                      <td>{val.question_type.title}</td>
                      <td>{val.question_answers !== null && val.question_answers.correct_answer}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6">No data available</td>
                  </tr>
                )}

              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  )
}

export default QuestionBank