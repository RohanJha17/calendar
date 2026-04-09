import React, { useState, useEffect } from 'react';
import {
  format,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  isSameMonth,
  isSameDay,
  isWithinInterval,
} from 'date-fns';

const CalendarGrid = ({ currentDate, startDate, endDate, handleDateClick }) => {
  const [updateTrigger, setUpdateTrigger] = useState(0);

  useEffect(() => {
    const handler = () => setUpdateTrigger(prev => prev + 1);
    window.addEventListener('notesSaved', handler);
    return () => window.removeEventListener('notesSaved', handler);
  }, []);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDateOfWeek = startOfWeek(monthStart, { weekStartsOn: 1 });
  const endDateOfWeek = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const daysInGrid = eachDayOfInterval({
    start: startDateOfWeek,
    end: endDateOfWeek,
  });

  const weekDays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

  return (
    <div className="w-full font-sans">
      <div className="grid grid-cols-7 mb-2">
        {weekDays.map((day, idx) => (
          <div
            key={day}
            className={`text-center text-xs font-bold ${idx >= 5 ? 'text-primary-600' : 'text-slate-900'
              }`}
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-1 gap-x-0">
        {daysInGrid.map((day) => {

          const isCurrentMonth = isSameMonth(day, monthStart);
          const isSelectedStart = startDate && isSameDay(day, startDate);
          const isSelectedEnd = endDate && isSameDay(day, endDate);
          const isInRange =
            startDate &&
            endDate &&
            isWithinInterval(day, { start: startDate, end: endDate });
          const isToday = isSameDay(day, new Date());
          const isWeekend = day.getDay() === 0 || day.getDay() === 6;

          const noteKey = `calendar-note-${format(day, 'yyyy-MM-dd')}`;
          const noteData = localStorage.getItem(noteKey);
          const hasNote = !!noteData && noteData.trim() !== '';

          let baseClasses =
            "relative h-8 md:h-9 w-full flex items-center justify-center text-xs md:text-sm cursor-pointer transition-all duration-200";
          let textClass = "";
          let bgClass = "bg-transparent";
          let roundClass = "";

          if (!isCurrentMonth) {
            textClass = "text-slate-300";
          } else if (isSelectedStart || isSelectedEnd) {
            textClass = "text-white font-bold drop-shadow-sm";
            bgClass = "bg-primary-500 z-10 scale-105 shadow-md";
            roundClass =
              isSelectedStart && isSelectedEnd
                ? "rounded-full"
                : isSelectedStart
                  ? "rounded-l-full"
                  : "rounded-r-full";
          } else if (isInRange) {
            textClass = isWeekend
              ? "text-primary-700 font-bold"
              : "text-slate-900 font-medium";
            bgClass = "bg-primary-100";
          } else {
            textClass = isWeekend
              ? "text-primary-600 font-bold"
              : "text-slate-900 font-medium";

            if (isToday) textClass = "text-primary-700 font-bold";

            bgClass = isToday
              ? "bg-primary-50 ring-2 ring-primary-300 ring-inset shadow-sm"
              : "hover:bg-slate-100";

            roundClass = isToday ? "rounded-full" : "hover:rounded-full";
          }

          if (isSelectedStart && !endDate) {
            roundClass = "rounded-full";
          }

          return (
            <div key={day.toISOString()} className="relative">
              {isInRange && !isSelectedStart && !isSelectedEnd && (
                <div className="absolute inset-0 bg-primary-100 -mx-1" />
              )}
              {isSelectedStart && endDate && !isSelectedEnd && (
                <div className="absolute inset-y-0 right-0 w-1/2 bg-primary-100" />
              )}
              {isSelectedEnd && startDate && !isSelectedStart && (
                <div className="absolute inset-y-0 left-0 w-1/2 bg-primary-100" />
              )}

              <div
                className={`${baseClasses} ${textClass} ${bgClass} ${roundClass}`}
                onClick={() => handleDateClick(day)}
              >
                {format(day, 'd')}

                {isToday && !isSelectedStart && !isSelectedEnd && (
                  <span className="absolute bottom-1 w-1 h-1 bg-primary-500 rounded-full" />
                )}

                {hasNote && (
                  <span
                    className={`absolute top-1 right-2 w-1.5 h-1.5 rounded-full shadow-sm ${isSelectedStart || isSelectedEnd
                        ? 'bg-white'
                        : 'bg-amber-400'
                      }`}
                    title="Has Notes"
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarGrid;