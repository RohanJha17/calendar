import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Save } from 'lucide-react';
import { toast } from 'react-toastify';

const NotesSection = ({ currentDate, startDate }) => {
  const [noteText, setNoteText] = useState('');

  const storageKey = startDate
    ? `calendar-note-${format(startDate, 'yyyy-MM-dd')}`
    : `calendar-note-${format(currentDate, 'yyyy-MM')}`;

  const keyTitle = startDate
    ? format(startDate, 'MMMM do, yyyy')
    : `Month of ${format(currentDate, 'MMMM yyyy')}`;

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    setNoteText(saved || '');
  }, [storageKey]);

  const handleSave = () => {
    if (!noteText || noteText.trim() === '') {
      localStorage.removeItem(storageKey);
      window.dispatchEvent(new Event('notesSaved'));

      toast.error('Note is empty!', {
        theme: 'colored',
        position: 'top-right',
        autoClose: 3000
      });
      return;
    }

    localStorage.setItem(storageKey, noteText.trim());
    window.dispatchEvent(new Event('notesSaved'));

    toast.success('Notes saved successfully!', {
      theme: 'dark',
      position: 'top-right',
      autoClose: 3000
    });
  };

  return (
    <div className="w-full h-full flex flex-col pt-2 text-slate-800">

      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold text-sm tracking-wide text-slate-400 uppercase">
          Notes
        </h3>
        <span className="text-xs text-primary-600 font-semibold bg-primary-50 px-2 py-1 rounded-md">
          {keyTitle}
        </span>
      </div>

      <div className="grow relative group h-48 md:h-auto min-h-50">

        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage:
              'repeating-linear-gradient(to bottom, transparent, transparent 27px, #94a3b8 27px, #94a3b8 28px)',
            backgroundAttachment: 'local'
          }}
        ></div>

        <textarea
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          placeholder="Jot down memories, events, or reminders..."
          className="w-full h-full bg-transparent border-0 resize-none focus:ring-0 p-0 text-slate-700 leading-7 focus:outline-none"
          style={{ lineHeight: '28px' }}
        />

        <button
          onClick={handleSave}
          className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm text-slate-600 hover:text-primary-600 hover:bg-primary-50 active:bg-primary-100 active:text-primary-600 hover:shadow-md transition-all opacity-100 md:opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 flex items-center text-sm font-medium border border-slate-100"
          title="Save Notes"
        >
          <Save size={16} className="mr-1.5" />
          Save
        </button>
      </div>
    </div>
  );
};

export default NotesSection;