import { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './Layout/Layout';
import { Dashboard } from './pages/Dashboard';
import { AddPost } from './pages/AddPost';
import { PostDetails } from './pages/PostDetails';
import { Register } from './pages/Signup';
import { Login } from './pages/Login';
import { getCurrentUser } from './services/Auth.service';

function App() {
  const [user, setUser] = useState({name: '', email: ''})
  const getUserInfo = async () => {
    setTimeout(() => {
      const userData = getCurrentUser();      
      const uData = {
        name: userData.name,
        email: userData.email
      }
      setUser(uData);      
    }, 100)
    
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<Layout user={user} />}>
              <Route path="/login" element={<Login getUser={getUserInfo} />}  />
              <Route path="/register" element={<Register />}  />
              <Route path="/" element={<Dashboard />} />              
              <Route path="/add-post" element={<AddPost />} />
              <Route path="/post/:id" element={<PostDetails />} />              
          </Route>
        </Routes>        
      </BrowserRouter>
    </div>
  );
}

export default App;
