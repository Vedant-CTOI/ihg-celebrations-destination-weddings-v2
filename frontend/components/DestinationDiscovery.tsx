import React, { useState } from 'react';
import { DESTINATIONS_DATA } from '../constants';
import { Destination } from '../types';
import { Check, ArrowRight, ChevronDown, FileText, Sparkles } from 'lucide-react';

interface DestinationDiscoveryProps {
  onOpenDetail?: (destination: Destination) => void;
}

export const DestinationDiscovery: React.FC<DestinationDiscoveryProps> = ({ onOpenDetail }) => {
  const [activeTabId, setActiveTabId] = useState(DESTINATIONS_DATA[0].id);

  const activeDestination = DESTINATIONS_DATA.find((d) => d.id === activeTabId) || DESTINATIONS_DATA[0];

  const handleOpenDetail = () => {
    if (onOpenDetail) {
      onOpenDetail(activeDestination);
    }
  };

  return (
    <section id="destinations" className="py-20 bg-neutral-50 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Genre Selector */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="max-w-xl">
            <span className="text-[11px] uppercase tracking-[0.25em] text-neutral-500 font-sans font-medium block mb-2">
              Destination Genres
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-black font-normal mb-2">
              Discovery by Genre
            </h2>
            <p className="font-sans text-neutral-600 text-sm font-light">
              Explore India’s wedding destinations by architectural genre—from royal fortresses and barefoot beaches to secluded mountain valleys.
            </p>
          </div>

          {/* Genre Dropdown Selector & CTA */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-3 font-sans">
            <div className="relative inline-block w-full sm:w-72">
              <label htmlFor="destination-select" className="block text-[10px] uppercase tracking-wider text-neutral-500 font-semibold mb-1">
                Select Wedding Genre:
              </label>
              <div className="relative">
                <select
                  id="destination-select"
                  value={activeTabId}
                  onChange={(e) => setActiveTabId(e.target.value)}
                  className="w-full appearance-none bg-white border border-neutral-300 hover:border-black rounded-xl px-4 py-2.5 pr-10 text-xs font-sans text-black font-medium shadow-2xs focus:outline-none focus:border-black transition-colors cursor-pointer"
                >
                  {DESTINATIONS_DATA.map((dest) => (
                    <option key={dest.id} value={dest.id}>
                      {dest.genre}: {dest.name}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-neutral-500">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Section Level CTA: Open Genre Dossier Page with Property List */}
            <button
              onClick={handleOpenDetail}
              className="inline-flex items-center justify-center space-x-1.5 text-xs font-sans uppercase tracking-wider bg-black text-white px-5 py-2.5 rounded-xl hover:bg-neutral-800 transition-colors shadow-2xs font-medium shrink-0 cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Explore {activeDestination.genre} Dossier</span>
            </button>
          </div>
        </div>

        {/* Quick Genre Pill Navigation */}
        <div className="flex space-x-2 overflow-x-auto no-scrollbar pb-3 mb-6">
          {DESTINATIONS_DATA.map((dest) => {
            const isSelected = dest.id === activeTabId;
            return (
              <button
                key={dest.id}
                onClick={() => setActiveTabId(dest.id)}
                className={`px-4 py-2 rounded-xl text-xs font-sans transition-all whitespace-nowrap text-left border cursor-pointer ${
                  isSelected
                    ? 'border-black bg-black text-white font-medium shadow-2xs'
                    : 'border-neutral-200 text-neutral-700 hover:border-black bg-white'
                }`}
              >
                <span className="block text-[11px] uppercase tracking-wider font-semibold">
                  {dest.genre}
                </span>
                <span className={`text-[10px] block opacity-70 ${isSelected ? 'text-neutral-300' : 'text-neutral-500'}`}>
                  {dest.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Destination Genre Card */}
        <div className="bg-white rounded-2xl border border-neutral-300 overflow-hidden shadow-2xs">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Image (Grayscale Luxury) */}
            <div 
              onClick={handleOpenDetail}
              className="lg:col-span-5 relative min-h-[300px] lg:min-h-full bg-black cursor-pointer group"
            >
              <img
                src={activeDestination.image}
                alt={`${activeDestination.genre} - ${activeDestination.name}`}
                className="w-full h-full object-cover filter grayscale contrast-115 group-hover:scale-102 transition-transform duration-500"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://placehold.co/800x1000/000000/FFFFFF?text=' + encodeURIComponent(activeDestination.name);
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              <div className="absolute top-4 left-4">
                <span className="bg-white text-black text-[10px] font-sans uppercase tracking-widest px-3 py-1 rounded-full font-bold shadow-sm">
                  Genre: {activeDestination.genre}
                </span>
              </div>

              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="bg-white/90 text-black text-[10px] font-sans uppercase tracking-widest px-3 py-1 rounded-full font-medium shadow-sm">
                  View Genre Properties
                </span>
              </div>

              <div className="absolute bottom-5 left-5 right-5 text-white">
                <span className="text-[10px] uppercase tracking-widest text-neutral-300 font-sans block mb-1">
                  {activeDestination.vibe}
                </span>
                <p className="font-serif text-lg italic text-neutral-100">
                  "{activeDestination.heroSnippet}"
                </p>
              </div>
            </div>

            {/* Editorial & Essential Readiness */}
            <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-2 text-[11px] font-sans text-neutral-500 uppercase tracking-wider block mb-1">
                  <span className="font-semibold text-black">{activeDestination.genre}</span>
                  <span>•</span>
                  <span>{activeDestination.tagline}</span>
                </div>

                <h3 className="font-serif text-2xl text-black font-normal mb-3">
                  {activeDestination.name} Sanctuary Overview
                </h3>

                <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed mb-6">
                  {activeDestination.editorial}
                </p>

                {/* Season & Signature Sites */}
                <div className="flex flex-wrap gap-x-6 gap-y-2 py-3 border-y border-neutral-200 text-xs font-sans text-neutral-800 mb-6">
                  <div>
                    <span className="text-neutral-500">Season:</span> {activeDestination.climateWindow}
                  </div>
                  <div>
                    <span className="text-neutral-500">Signature Venues:</span> {activeDestination.signatureVenues.join(' • ')}
                  </div>
                </div>

                {/* Streamlined Readiness List */}
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-sans font-semibold block mb-3">
                    Ceremonial Readiness for {activeDestination.genre}
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans">
                    <div className="flex items-start space-x-2">
                      <Check className="w-3.5 h-3.5 text-black shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium text-black">{activeDestination.readiness.havanFireSpace.title}</span>
                        <p className="text-[11px] text-neutral-500 font-light">{activeDestination.readiness.havanFireSpace.detail}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2">
                      <Check className="w-3.5 h-3.5 text-black shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium text-black">{activeDestination.readiness.baraatRoute.title}</span>
                        <p className="text-[11px] text-neutral-500 font-light">{activeDestination.readiness.baraatRoute.detail}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2">
                      <Check className="w-3.5 h-3.5 text-black shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium text-black">{activeDestination.readiness.dietarySegregation.title}</span>
                        <p className="text-[11px] text-neutral-500 font-light">{activeDestination.readiness.dietarySegregation.detail}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2">
                      <Check className="w-3.5 h-3.5 text-black shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium text-black">{activeDestination.readiness.lateNightAcoustics.title}</span>
                        <p className="text-[11px] text-neutral-500 font-light">{activeDestination.readiness.lateNightAcoustics.detail}</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Action Links */}
              <div className="mt-8 pt-4 border-t border-neutral-200 flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handleOpenDetail}
                  className="inline-flex items-center space-x-1.5 text-xs font-sans text-black hover:text-neutral-600 transition-colors font-semibold uppercase tracking-wider cursor-pointer"
                >
                  <span>Open {activeDestination.genre} Page & Property List</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <span className="text-xs font-sans text-neutral-400 font-light">
                  5-Point Ceremonial Audit Verified
                </span>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
