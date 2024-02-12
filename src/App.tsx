import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import SettingsPage from './pages/settings/Settings';
import DevicesPage from './pages/devices/Devices';
import DevicePage from './pages/devices/Device';
import JournalsPage from './pages/journals/Journals';
import ControllerInfoPage from './pages/controller/ControllerInfo';
import Header from './components/Header';
import config from './utils/config';

function App() {
    return (
        <>
            <BrowserRouter basename={config.basePath}>
                <Header />
                <Routes>
                    <Route path="/" element={<ControllerInfoPage />} />
                    <Route path="/devices" element={<DevicesPage />} />
                    <Route path="/devices/:id" element={<DevicePage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                    <Route path="/logs" element={<JournalsPage />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
