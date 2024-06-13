import axios from "axios";
import './App.css';
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import QuestionBank from "./components/QuestionBank";
import AddQuestion from "./components/AddQuestion";
import QuizQuestions from "./components/QuizQuestions";
import AttempQuiz from "./components/AttempQuiz";
import CreateQuiz from "./components/CreateQuiz";
import Swal from "sweetalert2";
import EditQuiz from "./components/EditQuiz";
import AccessHub from "./components/user/AccessHub";
import QuizReview from "./components/QuizReview";

axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL + "/api/v1";
// if (!axios.defaults.headers.common["Authorization"])
//   axios.defaults.headers.common["Authorization"] = getBearer();
if (!axios.defaults.headers.post["Content-Type"])
  axios.defaults.headers.post["Content-Type"] = "application/json";
const storedToken = localStorage.getItem('token');
    if (storedToken) {
      const accessToken = JSON.parse(storedToken);
      axios.defaults.headers.post['Authorization'] = `Bearer ${accessToken}`;
    }
axios.interceptors.request.use(
  (request) => {
    // console.log(request);
    // Edit request config
    return request;
  },
  (error) => {
    // console.log(error);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    // console.log(response);
    // Edit response config
    return response;
  },
  (error) => {
    // console.log(error);
    return Promise.reject(error);
  }
);
function App() {
  const [activePage, setActivePage] = useState('accessHub');
  const [quizId, setQuizId] = useState(null)
  const [quizAttemptId, setQuizAttemptId] = useState();
  const [quizData, setQuizData] = useState({});
  const [userRole, setUserRole] = useState({});
  const { quiz_slots } = quizData;

  const handleQuizClick = (id, pageName) => {
    setQuizId(id);
    setActivePage(pageName); // Set the active page to 'quiz' or any other appropriate page
  };

  const handleAttemptClick = (id) => {
    setQuizId(id);
    const storedToken = localStorage.getItem('token');

    if (storedToken) {
      const accessToken = JSON.parse(storedToken);

      const config = {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      };
      axios.get(`/quiz/show/${id}`, config)
        .then((res) => {
          setQuizData(res.data);
          if (res.data.quiz_slots.length !== 0) {
            setActivePage('attemptQuestion');
          } else {
            Swal.fire({
              icon: "error",
              title: "Sorry",
              text: "There are no question to attempt in this quiz",
              footer: '<a href="#">Why do I have this issue?</a>'
            });
          }
        })
        .catch((error) => {
          console.error("Error fetching quiz data:", error);
        });
    }
  };

  const quizAttemptclick = (id) => {
    console.log(id);
    setQuizAttemptId(id);
    setActivePage('quizReview');
  }

  useEffect(() => {
    const role = localStorage.getItem('userRole');

    if (role) {
      setUserRole(JSON.parse(role));
    }
  })

  return (
    <>
      <div>

        {activePage === 'accessHub' && <AccessHub setActivePage={setActivePage} userRole={userRole} />}
        {activePage !== 'accessHub' && <Navbar setActivePage={setActivePage} userRole={userRole} />}
        {activePage === 'home' && <Home setActivePage={setActivePage} handleQuizClick={handleQuizClick} handleAttemptClick={handleAttemptClick} quizData={quizData} userRole={userRole} />}
        {activePage === 'questionBank' && <QuestionBank setActivePage={setActivePage} />}
        {activePage === 'about' && <h2>About Page</h2>}
        {activePage === 'contact' && <h2>Contact Page</h2>}
        {activePage === 'addQuestion' && <AddQuestion setActivePage={setActivePage} />}
        {activePage === 'quizQuestion' && <QuizQuestions quizId={quizId} />}
        {activePage === 'attemptQuestion' && <AttempQuiz quizId={quizId} quizData={quizData} quizAttemptclick={quizAttemptclick} />}
        {activePage === 'createQuiz' && <CreateQuiz />}
        {activePage === 'editQuiz' && <EditQuiz quizId={quizId} />}
        {activePage === 'quizReview' && <QuizReview quizAttemptId={quizAttemptId} />}

      </div>
      {/* <BrowserRouter>
        <Routes>
          <Route path="/question" element={<AddQuestion />} />
        </Routes>
      </BrowserRouter> */}
    </>
  );
}

export default App;
