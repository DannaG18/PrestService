import styles from './styles/App.module.css';
import { Route, Routes } from "react-router-dom";
import HomePage from './page/HomePage';
import AdminDashboard from './page/AdminDashboard';
import './styles/globals.css'

function App() {
  return (
    <div className={styles.app}>
      <Routes>
          <Route path="/" element={<AdminDashboard />} />
      </Routes>
    </div>
  );
}

export default App;