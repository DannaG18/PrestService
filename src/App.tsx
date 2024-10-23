import styles from './styles/App.module.css';
import SupplyForm from './components/supply/SupplyForm';
import SupplyList from './components/supply/SupplyList';
import { Route, Routes } from "react-router-dom";
import HomePage from './page/HomePage';
import './styles/globals.css'

function App() {
  return (
    <div className={styles.app}>
      <Routes>
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/" element={<SupplyForm />} /> */}
          <Route path="/supplies" element={<SupplyList />} />
      </Routes>
    </div>
  );
}

export default App;