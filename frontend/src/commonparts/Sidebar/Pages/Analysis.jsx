import React from 'react';
import SalesChart from './Charts/SalesChart'; 
import Piechartsupplier from './Charts/Piechartsupplier';
import './css/analysis.css'

const App = () => {
  return (
    <div>
    <div>
        <h1>Analysis</h1>
    </div>
    <div className="container">
        <div className='chartbox'>
        <div className="chart1">
            <SalesChart/>
        </div>

        <div className="chart2">
           <Piechartsupplier/>
        </div>
        <div className="chart3">
        
        </div>
        </div>
    </div>
    </div>
  );
};

export default App;
