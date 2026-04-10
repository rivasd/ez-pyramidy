import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './pages/Layout';
import SetupPage from './pages/SetupPage';
import PlayPage from './pages/PlayPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/setup" replace />} />
      <Route element={<Layout />}>
        <Route path="/setup" element={<SetupPage />} />
        <Route path="/play" element={<PlayPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/setup" replace />} />
    </Routes>
  )
}

export default App
