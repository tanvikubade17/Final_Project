import './App.css'
import Login from './Components/admin/Login/Login.jsx';
import Dashboard from './Components/admin/Dashboard/Dashboard.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin/*" element={<Dashboard />} />
        </Routes>
    </BrowserRouter>     
    </>
  )
}

export default App
