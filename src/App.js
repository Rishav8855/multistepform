import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MultiStepForm from './MultiStepForm';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<MultiStepForm />} />
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
};


export default App;
