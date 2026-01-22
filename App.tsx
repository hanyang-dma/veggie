import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import VegetableDetail from './components/VegetableDetail';
import { Vegetable, Language } from './types';
import { Menu, X } from 'lucide-react';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('zh'); 
  const [selectedVegetable, setSelectedVegetable] = useState<Vegetable | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'zh' : 'en');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen w-full bg-surface text-white overflow-hidden relative font-sans">
      
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-14 bg-surface border-b border-surface-200 z-40 flex items-center justify-between px-4">
        <button 
          onClick={toggleSidebar}
          className="text-white hover:text-brand"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <span className="font-display font-bold text-lg tracking-widest uppercase">VEGGIE.ARCHIVE</span>
        <button 
          onClick={toggleLanguage}
          className="font-mono text-xs text-brand border border-brand px-2 py-1"
        >
          {language.toUpperCase()}
        </button>
      </div>

      {/* Sidebar */}
      <Sidebar 
        language={language}
        onSelectVegetable={setSelectedVegetable}
        selectedVegetableId={selectedVegetable?.id}
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      {/* Main Content */}
      <main className="flex-1 h-full relative w-full pt-14 md:pt-0 bg-surface">
        
        {/* Desktop Language Toggle */}
        <div className="hidden md:block absolute top-6 right-6 z-30 mix-blend-difference">
          <button 
            onClick={toggleLanguage}
            className="
              flex items-center gap-2 px-4 py-2 
              bg-white text-black font-mono font-bold text-xs uppercase tracking-widest
              hover:bg-brand transition-colors
            "
          >
            <span>{language === 'en' ? '中文' : 'ENG'}</span>
          </button>
        </div>

        <VegetableDetail 
          vegetable={selectedVegetable} 
          language={language} 
        />
      </main>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/80 z-30 backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default App;