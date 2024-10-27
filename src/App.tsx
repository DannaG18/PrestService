import styles from './styles/App.module.css'; 

import { Route, Routes} from "react-router-dom";
import HomePage from './page/HomePage';
import './styles/globals.css';
import SupplyForm from './components/supply/SupplyForm';
import SupplyList from './components/supply/SupplyList';

function App() {


  return (
    <div className={styles.app}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/supply-form" element={<SupplyForm />}/>
        <Route path="/supply-view" element={<SupplyList />}/>
      </Routes>
    </div>
  );
}

export default App;
