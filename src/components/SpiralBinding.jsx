import React from 'react';

const SpiralBinding = () => {
  
  const bindings = Array.from({ length: 32 });
  
  return (
    <div className="absolute top-0 left-0 w-full flex justify-center -mt-3 z-50 pointer-events-none px-6 md:px-10">
      
      <div className="flex w-full justify-between">
        {bindings.map((_, i) => (
          <div key={i} className="relative w-2 md:w-2.5 h-8 md:h-10">
            
            <div className="absolute top-0 left-0 w-full h-full bg-linear-to-r from-gray-400 via-gray-200 to-gray-500 rounded-full shadow-[0_4px_6px_rgba(0,0,0,0.5)] transform -rotate-15"></div>
            
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 md:w-3.5 md:h-3.5 bg-slate-800 rounded-full opacity-30 blur-[1px]"></div>
          
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpiralBinding;