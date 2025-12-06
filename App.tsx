import React from 'react';
import Calculator from './components/Calculator';

const App: React.FC = () => {
  return (
    <main className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-200 to-slate-300">
      <div className="w-full h-full sm:h-auto sm:w-auto flex items-center justify-center p-0 sm:p-4">
        <Calculator />
      </div>
      
      {/* Footer/Info for desktop view */}
      <div className="fixed bottom-4 text-slate-500 text-xs font-medium hidden sm:block pointer-events-none">
        CalcMate v1.0 &bull; Keyboard Support Enabled
      </div>
    </main>
  );
};

export default App;
