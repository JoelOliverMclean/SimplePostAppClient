import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"
import Home from "./pages/Home"
import CreatePost from "./pages/CreatePost"
import Post from "./pages/Post"
import Registration from "./pages/Registration"
import Login from "./pages/Login"
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { AuthContext } from './helpers/AuthContext';
import { apiGet, getCsrfToken, apiPost } from "./helpers/NetworkHelper"

function App() {

  const [loggedIn, setLoggedIn] = useState(false)

  const loggedInCookie = Cookies.get("loggedin")
  if (loggedIn !== loggedInCookie)
    setLoggedIn(loggedInCookie)

  useEffect(() => {
    const validateToken = async () => {
      apiGet("/auth/validate", (response) => {
          setLoggedIn(response.status === 200)
        })
    }
    if (loggedIn)
      validateToken()
    getCsrfToken()
  }, [loggedIn])

  return (
    <div className='App'>
      <AuthContext.Provider value={{loggedIn, setLoggedIn}}>
        <Router>
          <div className="navbar">
            <Link to={"/"}>Home</Link>
            <Link to={"/createpost"}>Create A Post</Link>
            { loggedIn ? 
                  <Link onClick={() => {
                    apiPost("/auth/logout").then((response) => {
                      if (response.status === 200)
                        setLoggedIn(null)
                    })}}>Logout</Link> 
                  : 
                  <div>
                    <Link to={"/login"}>Login</Link> 
                    <Link to={"/registration"}>Register</Link>
                  </div> 
            }
          </div>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/createpost' element={<CreatePost />} />
            <Route path='/post/:id' element={<Post />} />
            <Route path='/login' element={<Login />} />
            <Route path='/registration' element={<Registration />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
