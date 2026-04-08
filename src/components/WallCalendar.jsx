import React, { useState } from 'react';
import { addMonths, subMonths } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';
import CalendarHeader from './CalendarHeader';
import CalendarGrid from './CalendarGrid';
import NotesSection from './NotesSection';
import SpiralBinding from './SpiralBinding';

const WallCalendar = () => {
  
  // Calendar state
  const [currentDate, setCurrentDate] = useState(new Date());
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [direction, setDirection] = useState(0);

  // Month navigation
  const handleNextMonth = () => {
    setDirection(1);
    setCurrentDate(addMonths(currentDate, 1));
  };

  const handlePrevMonth = () => {
    setDirection(-1);
    setCurrentDate(subMonths(currentDate, 1));
  };

  // Date range selection
  const handleDateClick = (day) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(day);
      setEndDate(null);
    } else if (day < startDate) {
      setStartDate(day);
      setEndDate(null);
    } else {
      setEndDate(day);
    }
  };

  // Page animation variants
  const variants = {
    enter: (direction) => ({
      rotateX: direction > 0 ? 90 : -90,
      opacity: 0,
    }),
    center: {
      rotateX: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      rotateX: direction > 0 ? -90 : 90,
      opacity: 0,
    }),
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto shadow-2xl rounded-xl bg-white flex flex-col perspective-[1000px]">
      
      {/* Spiral Binding */}
      <SpiralBinding />

      {/* Calendar Page */}
      <div className="relative w-full z-10" style={{ transformStyle: 'preserve-3d' }}>
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          
          <motion.div
            key={currentDate.toISOString()}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            className="flex flex-col w-full origin-top bg-white rounded-xl"
          >
            
            {/* Header */}
            <CalendarHeader
              currentDate={currentDate}
              handleNextMonth={handleNextMonth}
              handlePrevMonth={handlePrevMonth}
            />

            {/* Content Layout */}
            <div className="flex flex-col md:flex-row w-full p-6 md:p-10 gap-8 items-start">
              
              {/* Notes Section */}
              <div className="w-full md:w-1/3">
                <NotesSection currentDate={currentDate} startDate={startDate} />
              </div>

              {/* Calendar Grid */}
              <div className="w-full md:w-2/3">
                <CalendarGrid
                  currentDate={currentDate}
                  startDate={startDate}
                  endDate={endDate}
                  handleDateClick={handleDateClick}
                />
              </div>

            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default WallCalendar;