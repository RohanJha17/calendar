import React from 'react';
import WallCalendar from './components/WallCalendar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 sm:p-8 font-sans">
      <WallCalendar />
      <ToastContainer position="top-right" />
    </div>
  );
}

export default App;
