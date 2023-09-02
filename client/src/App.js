import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Home from './pages/Home';
import Main from './pages/Main';
import Login from './pages/Login';
import Posts from './pages/Posts';

function App() {
  return (
    <div>

<Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Register' element={<Register />} />
          <Route path='/' element={<Home />} />
          <Route path='/Main' element={<Main />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/Posts' element={<Posts />} />
        </Routes>
      </Router>



    </div>
  );
}

export default App;
