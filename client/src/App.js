import './App.css';
import { Navigate, Route, Routes, useLocation } from 'react-router';
import Login from './Screens/Login';
import Registration from './Screens/Registration';
import Dashboard from './Screens/Dashboard';
import ProtectedRoute from './Components/ProtectedRoute';
import Test from './Screens/Test';

function App() {
  const location = useLocation();
  return (
    <Routes>
      <Route path="/registration" element={<Registration />} />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      }
      />
      <Route path="/test" element={<Test />} />
      <Route path="/" element={<Login />} />
      <Route path="*" element={<Navigate to='/' state={{ from: location }} />} />
    </Routes>
  );
}

export default App;
