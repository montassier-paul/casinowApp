import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './pages/Dashboard';
import NoPage from './pages/NoPage';
import { AppProvider } from './Context/AppContext';
import { UserProvider } from './Context/UserContext';
import Login from './pages/Login';
import Protected from './pages/Protected';

function App() {


  return (
    <AppProvider>
    <UserProvider>
    <BrowserRouter>
    <Routes>
      <Route path="dashboard" element={<Protected  context='Dashboard' path={"/Login"} outlet={<Dashboard />} />} />
      <Route path='login' element={<Protected  context='Login' path={"/Dashboard"} outlet={<Login />} />}/>
      <Route path="*" element={<NoPage />} />
      
    </Routes>
  </BrowserRouter>
  </UserProvider>
  </AppProvider>
  );
}

export default App;


