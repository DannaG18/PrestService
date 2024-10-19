import React from 'react';
import styles from './styles/App.module.css';
import SupplyForm from './components/WineryManager';
import SupplyList from './components/View';
import { Route, Routes } from "react-router-dom";
import HomePage from './page/HomePage';
import './styles/globals.css'

function App() {
  return (
    <div className={styles.app}>
      <Routes>
          {/* <Route path="/" element={<HomePage />} /> */}
          <Route path="/" element={<SupplyForm />} />
          <Route path="/view" element={<SupplyList />} />
      </Routes>
    </div>
  );
}

export default App;