import axios from "axios";

function Navbar({ setActivePage }) {

    const handleLogout = () => {
        axios.get('/logout').then((res)=>{
            console.log(res.data);
        })
    }
    return (
        <div className="navbar">
            <h1>Quiz</h1>
            <nav className="navbar navbar-expand-lg navbar-light ">
                <ul className="navbar-nav">
                    <li onClick={() => setActivePage('home')} className="nav-item">Home</li>
                    <li onClick={() => setActivePage('questionBank')} className="nav-item">Question Bank</li>
                    <li onClick={() => setActivePage('about')} className="nav-item">About</li>
                    <li onClick={handleLogout} className="nav-item">Logout</li>
                </ul>
            </nav>
        </div>
    );
}
export default Navbar