import logo from './logo.svg';
import './App.css';
import SignUp from './components/Signup';
import SignIn from './components/Signin';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import BrowserRouter as Router


function App() {
  return (
    <Router> {/* Use BrowserRouter as Router */}
      <Routes>
        <Route path = "/signup" element={ <SignUp /> } />
        <Route path = "/signin" element={ <SignIn /> } />
      </Routes>
    </Router>
  );
}

export default App;
