import React from 'react';
import './app.css';
import TopbarMenu from "./commonparts/Topbar/TopbarMenu"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from './commonparts/Sidebar/Sidebar';
import Home from './commonparts/Sidebar/Pages/Home';
import ManageTeam from './commonparts/Sidebar/Pages/ManageTeam';
import ContactInformation from './commonparts/Sidebar/Pages/ContactInformation';
import Analysis from './commonparts/Sidebar/Pages/Analysis';
import Events from './commonparts/Sidebar/Pages/Events';
import WeatherInfo from './commonparts/Sidebar/Pages/WeatherInfo';


const App = () => {
  return (
    <BrowserRouter>
      <TopbarMenu />
      <Sidebar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/ManageTeam" element={<ManageTeam />} />
          <Route path="/ContactInformation" element={<ContactInformation />} />
          <Route path="/Analysis" element={<Analysis />} />
          <Route path="/Events" element={<Events />} />
          <Route path="/WeatherInfo" element={<WeatherInfo />} />
          
        </Routes>
      </Sidebar>
      <div className="watermark">Akash Mathane</div>
    </BrowserRouter>
  );
};

export default App;