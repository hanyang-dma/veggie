import React, { useState } from 'react';
import { VEGETABLE_DATA, UI_TEXT } from '../constants';
import { Category, Language, Vegetable } from '../types';
import { Plus, Minus, ArrowRight } from 'lucide-react';

interface SidebarProps {
  language: Language;
  onSelectVegetable: (veg: Vegetable) => void;
  selectedVegetableId?: string;
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  language, 
  onSelectVegetable, 
  selectedVegetableId, 
  isOpen,
  toggleSidebar
}) => {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set([VEGETABLE_DATA[0].id]));
  const [expandedSubCategories, setExpandedSubCategories] = useState<Set<string>>(new Set([VEGETABLE_DATA[0].subCategories[0].id]));

  const toggleCategory = (id: string) => {
    const newSet = new Set(expandedCategories);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setExpandedCategories(newSet);
  };

  const toggleSubCategory = (id: string) => {
    const newSet = new Set(expandedSubCategories);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setExpandedSubCategories(newSet);
  };

  const handleVegetableClick = (veg: Vegetable) => {
    onSelectVegetable(veg);
    if (window.innerWidth < 768) {
      toggleSidebar();
    }
  };

  return (
    <aside 
      className={`
        fixed inset-y-0 left-0 z-50 w-80 bg-surface border-r border-surface-200 transform transition-transform duration-300 ease-out
        md:relative md:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
    >
      {/* Header */}
      <div className="h-24 flex flex-col justify-between p-6 border-b border-surface-200">
        <h2 className="text-3xl font-display font-bold text-white tracking-tighter uppercase leading-none">
          {UI_TEXT.title[language]}
        </h2>
        <div className="flex justify-between items-end">
          <span className="text-[10px] font-mono text-brand uppercase tracking-widest">{UI_TEXT.subtitle[language]}</span>
          <span className="text-[10px] font-mono text-gray-500">V.2.0</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="overflow-y-auto h-[calc(100vh-96px)]">
        {VEGETABLE_DATA.map((category, index) => (
          <div key={category.id} className="border-b border-surface-200">
            {/* Level 1: Category */}
            <button
              onClick={() => toggleCategory(category.id)}
              className={`
                w-full flex items-center justify-between p-4 bg-surface hover:bg-surface-100 transition-colors group
                ${expandedCategories.has(category.id) ? 'bg-surface-100' : ''}
              `}
            >
              <span className="font-display font-medium text-lg text-white uppercase tracking-tight group-hover:text-brand transition-colors">
                {category.name[language]}
              </span>
              <span className="text-brand">
                {expandedCategories.has(category.id) ? <Minus size={16} /> : <Plus size={16} />}
              </span>
            </button>

            {/* Level 2: SubCategory */}
            {expandedCategories.has(category.id) && (
              <div className="bg-surface-100 border-t border-surface-200">
                {category.subCategories.map((sub) => (
                  <div key={sub.id} className="border-b border-surface-200 last:border-b-0">
                    <button
                      onClick={() => toggleSubCategory(sub.id)}
                      className="w-full flex items-center justify-between px-6 py-3 hover:bg-surface-200 transition-colors"
                    >
                      <span className="font-mono text-xs text-gray-400 uppercase tracking-widest">
                        {sub.name[language]}
                      </span>
                      <span className={`text-gray-500 transform transition-transform ${expandedSubCategories.has(sub.id) ? 'rotate-90' : ''}`}>
                         <ArrowRight size={12} />
                      </span>
                    </button>

                    {/* Level 3: Items */}
                    {expandedSubCategories.has(sub.id) && (
                      <div className="bg-surface-200 py-1">
                        {sub.items.map((veg) => (
                          <button
                            key={veg.id}
                            onClick={() => handleVegetableClick(veg)}
                            className={`
                              w-full text-left px-8 py-3 flex items-center justify-between group
                              border-l-4 transition-all duration-150
                              ${selectedVegetableId === veg.id 
                                ? 'border-brand bg-white text-black' 
                                : 'border-transparent text-gray-300 hover:text-white hover:border-gray-500'}
                            `}
                          >
                            <span className={`font-display uppercase tracking-wide text-sm ${selectedVegetableId === veg.id ? 'font-bold' : ''}`}>
                              {veg.name[language]}
                            </span>
                            <span className="font-mono text-[10px] opacity-50">{veg.icon}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        
        {/* Footer Filler */}
        <div className="p-8 text-center opacity-20">
          <div className="w-8 h-8 border border-white mx-auto rotate-45 mb-4"></div>
          <span className="font-mono text-[10px] block">EST. 2025</span>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;