import React, { useState } from 'react';
import { addMonths, subMonths } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';
import CalendarHeader from './CalendarHeader';
import CalendarGrid from './CalendarGrid';
import NotesSection from './NotesSection';
import SpiralBinding from './SpiralBinding';

const WallCalendar = () => {

  const [currentDate, setCurrentDate] = useState(new Date());
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [direction, setDirection] = useState(0);

  const handleNextMonth = () => {
    setDirection(1);
    setCurrentDate(addMonths(currentDate, 1));
  };

  const handlePrevMonth = () => {
    setDirection(-1);
    setCurrentDate(subMonths(currentDate, 1));
  };

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

  const getThemeColors = (monthIndex) => {
    const themes = {
      0: {
        '--color-primary-50': '#e0f2fe', '--color-primary-100': '#bae6fd',
        '--color-primary-300': '#38bdf8', '--color-primary-500': '#028ce5',
        '--color-primary-600': '#0284c7', '--color-primary-700': '#0369a1',
      },
      1: {
        '--color-primary-50': '#fdf2f8', '--color-primary-100': '#fce7f3',
        '--color-primary-300': '#f472b6', '--color-primary-500': '#ec4899',
        '--color-primary-600': '#db2777', '--color-primary-700': '#be185d',
      },
      2: {
        '--color-primary-50': '#ecfdf5', '--color-primary-100': '#d1fae5',
        '--color-primary-300': '#6ee7b7', '--color-primary-500': '#10b981',
        '--color-primary-600': '#059669', '--color-primary-700': '#047857',
      },
      3: {
        '--color-primary-50': '#f3e8ff', '--color-primary-100': '#e9d5ff',
        '--color-primary-300': '#d8b4fe', '--color-primary-500': '#a855f7',
        '--color-primary-600': '#9333ea', '--color-primary-700': '#7e22ce',
      },
      4: {
        '--color-primary-50': '#f0fdfa', '--color-primary-100': '#ccfbf1',
        '--color-primary-300': '#5eead4', '--color-primary-500': '#14b8a6',
        '--color-primary-600': '#0d9488', '--color-primary-700': '#0f766e',
      },
      5: {
        '--color-primary-50': '#fffbeb', '--color-primary-100': '#fef3c7',
        '--color-primary-300': '#fcd34d', '--color-primary-500': '#f59e0b',
        '--color-primary-600': '#d97706', '--color-primary-700': '#b45309',
      },
      6: {
        '--color-primary-50': '#fff7ed', '--color-primary-100': '#ffedd5',
        '--color-primary-300': '#fdba74', '--color-primary-500': '#f97316',
        '--color-primary-600': '#ea580c', '--color-primary-700': '#c2410c',
      },
      7: {
        '--color-primary-50': '#fef2f2', '--color-primary-100': '#fee2e2',
        '--color-primary-300': '#fca5a5', '--color-primary-500': '#ef4444',
        '--color-primary-600': '#dc2626', '--color-primary-700': '#b91c1c',
      },
      8: {
        '--color-primary-50': '#eef2ff', '--color-primary-100': '#e0e7ff',
        '--color-primary-300': '#a5b4fc', '--color-primary-500': '#6366f1',
        '--color-primary-600': '#4f46e5', '--color-primary-700': '#4338ca',
      },
      9: {
        '--color-primary-50': '#f5f3ff', '--color-primary-100': '#ede9fe',
        '--color-primary-300': '#c4b5fd', '--color-primary-500': '#8b5cf6',
        '--color-primary-600': '#7c3aed', '--color-primary-700': '#6d28d9',
      },
      10: {
        '--color-primary-50': '#fefce8', '--color-primary-100': '#fef08a',
        '--color-primary-300': '#fde047', '--color-primary-500': '#eab308',
        '--color-primary-600': '#ca8a04', '--color-primary-700': '#a16207',
      },
      11: {
        '--color-primary-50': '#f8fafc', '--color-primary-100': '#f1f5f9',
        '--color-primary-300': '#cbd5e1', '--color-primary-500': '#64748b',
        '--color-primary-600': '#475569', '--color-primary-700': '#334155',
      }
    };
    return themes[monthIndex] || themes[0];
  };

  return (
    <div 
      className="relative w-[96%] max-w-3xl mx-auto shadow-2xl rounded-xl bg-white flex flex-col perspective-[1000px] transition-colors duration-1000"
      style={getThemeColors(currentDate.getMonth())}
    >

      <SpiralBinding />

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

            <CalendarHeader
              currentDate={currentDate}
              handleNextMonth={handleNextMonth}
              handlePrevMonth={handlePrevMonth}
            />

            <div className="flex flex-col md:flex-row w-full p-4 md:p-6 gap-6 items-start">

              <div className="w-full md:w-1/3">
                <NotesSection currentDate={currentDate} startDate={startDate} />
              </div>

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