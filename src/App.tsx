import styles from './styles/App.module.css';
import { Route, Routes, useNavigate } from "react-router-dom";
import HomePage from './page/HomePage';
import AdminDashboard from './page/AdminDashboard';
import './styles/globals.css';
import SupplyForm from './components/supply/SupplyForm';
import SupplyList from './components/supply/SupplyList';
import LoginPopup from './components/home/LoginPopup';

function App() {
  const navigate = useNavigate();

  const handleViewSupplies = () => {
    navigate("/supply-view");
  };

  const handleCloseLoginPopup = () => {
    console.log("Login popup closed");
  };

  return (
    <div className={styles.app}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/supply-form" element={<SupplyForm onView={handleViewSupplies} />} />
        <Route path="/supply-view" element={<SupplyList />} />
        
      </Routes>
    </div>
  );
}

export default App;
