import axios from "axios";
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from "react";
import Quiz from "./components/Quiz";
import Navbar from "./components/Navbar";
import { useState } from "react";
import QuestionBank from "./components/QuestionBank";
import AddQuestion from "./components/AddQuestion";

axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL + "/api/v1";
// if (!axios.defaults.headers.common["Authorization"])
//   axios.defaults.headers.common["Authorization"] = getBearer();
if (!axios.defaults.headers.post["Content-Type"])
  axios.defaults.headers.post["Content-Type"] = "application/json";

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
  const [activePage, setActivePage] = useState('home');
  return (
    <>
      <div>
        <Navbar setActivePage={setActivePage} />
        {activePage === 'home' && <Quiz />}
        {activePage === 'questionBank' && <QuestionBank setActivePage={setActivePage}/>}
        {activePage === 'about' && <h2>About Page</h2>}
        {activePage === 'contact' && <h2>Contact Page</h2>}
        {activePage === 'addQuestion' && <AddQuestion  />}
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
