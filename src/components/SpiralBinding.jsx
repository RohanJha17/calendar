import React from 'react';

const SpiralBinding = () => {
  
  // Generate spiral rings
  const bindings = Array.from({ length: 20 });
  
  return (
    <div className="absolute top-0 left-0 w-full flex justify-center -mt-3 z-50 pointer-events-none">
      
      {/* Spiral Container */}
      <div className="flex space-x-2 md:space-x-4">
        {bindings.map((_, i) => (
          <div key={i} className="relative w-2 md:w-3 h-8 md:h-10">
            
            {/* Coil */}
            <div className="absolute top-0 left-0 w-full h-full bg-linear-to-r from-gray-400 via-gray-200 to-gray-500 rounded-full shadow-[0_4px_6px_rgba(0,0,0,0.5)] transform -rotate-15"></div>
            
            {/* Punch Hole */}
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 md:w-4 md:h-4 bg-slate-800 rounded-full opacity-30 blur-[1px]"></div>
          
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpiralBinding;