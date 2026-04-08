import React from 'react';
import { format } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Month images
import month0 from '../assets/month_0.png';
import month1 from '../assets/month_1.png';
import month2 from '../assets/month_2.png';
import month3 from '../assets/month_3.png';
import month4 from '../assets/month_4.png';
import month5 from '../assets/month_5.png';
import month6 from '../assets/month_6.png';
import month7 from '../assets/month_7.png';
import month8 from '../assets/month_8.png';
import month9 from '../assets/month_9.png';
import month10 from '../assets/month_10.png';
import month11 from '../assets/month_11.png';

const CalendarHeader = ({ currentDate, handleNextMonth, handlePrevMonth }) => {
  
  // Get background image based on current month
  const getHeroImage = (date) => {
    const month = date.getMonth();
    const seasonalImages = {
      0: month0,
      1: month1,
      2: month2,
      3: month3,
      4: month4,
      5: month5,
      6: month6,
      7: month7,
      8: month8,
      9: month9,
      10: month10,
      11: month11,
    };
    return seasonalImages[month] || seasonalImages[0];
  };

  return (
    <div className="relative w-full h-64 md:h-80 rounded-t-xl overflow-hidden shadow-sm z-0">
      
      {/* Hero Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out"
        style={{ backgroundImage: `url(${getHeroImage(currentDate)})` }}
      >
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent mix-blend-multiply"></div>
      </div>

      {/* Bottom Wave Decoration */}
      <div className="absolute bottom-0 left-0 w-full flex translate-y-3 md:translate-y-4">
        <svg
          viewBox="0 0 1000 150"
          preserveAspectRatio="none"
          className="h-16 md:h-24 w-full text-primary-500 fill-current opacity-90 drop-shadow-lg"
        >
          <path d="M0,150 L1000,150 L1000,20 C750,20 600,150 0,150 Z"></path>
        </svg>
      </div>

      {/* Overlay Content */}
      <div className="absolute inset-0 pointer-events-none">
        
        {/* Month Navigation */}
        <div className="absolute inset-0 flex justify-between items-center px-4 md:px-8 z-30">
          <button 
            onClick={handlePrevMonth}
            className="pointer-events-auto p-2 md:p-3 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.3)] border border-white/40 transition-all group -mt-8"
          >
            <ChevronLeft size={28} className="text-white drop-shadow-lg group-hover:-translate-x-0.5 transition-transform" />
          </button>
          
          <button 
            onClick={handleNextMonth}
            className="pointer-events-auto p-2 md:p-3 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.3)] border border-white/40 transition-all group -mt-8"
          >
            <ChevronRight size={28} className="text-white drop-shadow-lg group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Month & Year Display */}
        <div className="absolute bottom-0 right-0 p-6 md:p-10 flex flex-col items-end z-20 translate-y-3 md:translate-y-4">
          <span className="text-xl md:text-3xl font-light text-white/90 tracking-widest drop-shadow-md">
            {format(currentDate, 'yyyy')}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-wider drop-shadow-xl mt-1">
            {format(currentDate, 'MMMM')}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default CalendarHeader;