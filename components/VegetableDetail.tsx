import React, { useEffect, useState } from 'react';
import { Vegetable, Language, AIVeggieDetails } from '../types';
import { UI_TEXT } from '../constants';
import { fetchVegetableDetails } from '../services/geminiService';
import { Loader2, ArrowUpRight, ImageOff } from 'lucide-react';

interface VegetableDetailProps {
  vegetable: Vegetable | null;
  language: Language;
}

const VegetableDetail: React.FC<VegetableDetailProps> = ({ vegetable, language }) => {
  const [aiData, setAiData] = useState<AIVeggieDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (vegetable) {
      setLoading(true);
      setAiData(null);
      setImageError(false); // Reset error state on change
      
      fetchVegetableDetails(vegetable.name[language], language)
        .then((data) => {
          setAiData(data);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [vegetable, language]);

  if (!vegetable) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-surface relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
        <div className="z-10 text-center space-y-4">
          <h1 className="font-display text-8xl md:text-9xl font-bold text-white opacity-10 select-none tracking-tighter">
            ARCHIVE
          </h1>
          <p className="font-mono text-brand text-sm tracking-[0.3em] uppercase animate-pulse">
            {UI_TEXT.selectPrompt[language]}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full overflow-y-auto bg-surface text-white">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none fixed"></div>

      {/* Hero Section */}
      <div className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden border-b border-surface-200 bg-surface-100 group">
        {!imageError ? (
          <img 
            src={vegetable.imageUrl} 
            alt={vegetable.name[language]} 
            className="w-full h-full object-cover filter brightness-75 grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-surface-200">
             <div className="flex flex-col items-center gap-4 opacity-50">
               <ImageOff size={48} />
               <span className="font-mono text-xs uppercase tracking-widest">Image Source Error</span>
             </div>
          </div>
        )}
        
        {/* Large Overlay Typography */}
        <div className="absolute bottom-0 left-0 p-4 md:p-8 w-full mix-blend-difference pointer-events-none">
          <div className="flex items-baseline gap-4 mb-2">
             <span className="font-mono text-xs md:text-sm border border-white px-2 py-1">FIG. {vegetable.id.toUpperCase()}</span>
             <span className="font-mono text-xs md:text-sm uppercase">{vegetable.icon} REF</span>
          </div>
          <h1 className="font-display text-7xl md:text-[10rem] leading-[0.85] font-bold uppercase tracking-tighter text-white break-words">
            {vegetable.name[language]}
          </h1>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 min-h-[40vh]">
        
        {/* Left Col: Description & Metadata */}
        <div className="md:col-span-4 p-8 border-r border-surface-200 flex flex-col justify-between">
          <div>
            <h3 className="font-mono text-xs text-brand mb-4 uppercase tracking-widest">Description //</h3>
            <p className="font-sans text-xl md:text-2xl font-light leading-tight text-gray-200 mb-8">
              {vegetable.description[language]}
            </p>
          </div>
          
          <div className="space-y-4 mt-auto">
             <div className="flex justify-between items-center border-t border-surface-200 pt-4">
               <span className="font-mono text-xs text-gray-500">ID</span>
               <span className="font-mono text-sm">{vegetable.id}</span>
             </div>
             <div className="flex justify-between items-center border-t border-surface-200 pt-4">
               <span className="font-mono text-xs text-gray-500">TYPE</span>
               <span className="font-mono text-sm uppercase">Vegetable</span>
             </div>
          </div>
        </div>

        {/* Right Col: AI Analysis */}
        <div className="md:col-span-8">
           {loading ? (
             <div className="h-full flex items-center justify-center p-12">
                <div className="flex flex-col items-center gap-4">
                   <Loader2 className="w-8 h-8 text-brand animate-spin" />
                   <span className="font-mono text-xs text-brand animate-pulse">{UI_TEXT.loading[language]}</span>
                </div>
             </div>
           ) : aiData ? (
             <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                
                {/* Block 1: Fun Fact */}
                <div className="p-8 border-b md:border-b-0 md:border-r border-surface-200 bg-surface-100 hover:bg-surface-200 transition-colors group">
                   <div className="flex justify-between mb-6">
                      <span className="font-mono text-xs text-brand bg-surface-200 px-2 py-1">{UI_TEXT.aiFunFact[language]}</span>
                      <ArrowUpRight className="w-4 h-4 text-gray-600 group-hover:text-brand" />
                   </div>
                   <p className="font-sans font-medium text-lg text-white">
                      {aiData.funFact}
                   </p>
                </div>

                {/* Block 2: Nutrition & Prep */}
                <div className="grid grid-rows-2">
                   <div className="p-8 border-b border-surface-200 hover:bg-surface-100 transition-colors">
                      <h4 className="font-mono text-xs text-gray-500 mb-2 uppercase">{UI_TEXT.aiNutrition[language]}</h4>
                      <p className="font-display text-2xl text-white uppercase tracking-tight">
                         {aiData.nutrition}
                      </p>
                   </div>
                   <div className="p-8 bg-brand text-black flex flex-col justify-center relative overflow-hidden group">
                      <div className="absolute top-2 right-2 font-mono text-[10px] opacity-50">RECIPE.SYS</div>
                      <h4 className="font-mono text-xs font-bold mb-2 uppercase text-black/60">{UI_TEXT.aiCooking[language]}</h4>
                      <p className="font-display text-3xl font-bold uppercase leading-none group-hover:translate-x-2 transition-transform">
                         {aiData.cookingTip}
                      </p>
                   </div>
                </div>

             </div>
           ) : (
             <div className="p-12 text-center font-mono text-xs text-gray-600">
                [NO DATA AVAILABLE]
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default VegetableDetail;