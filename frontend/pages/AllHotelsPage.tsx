import React, { useState, useMemo } from 'react';
import { HOTELS_DATA } from '../constants';
import { HotelProperty } from '../types';
import { ArrowLeft, Users, BedDouble, Eye, ArrowRight, X, MapPin, Sparkles, Utensils, Check, Plane } from 'lucide-react';

interface AllHotelsPageProps {
  initialCity?: string;
  onNavigateBack: () => void;
  onNavigateToInquiry: (hotelName: string) => void;
}

export const AllHotelsPage: React.FC<AllHotelsPageProps> = ({
  initialCity = 'All Cities',
  onNavigateBack,
  onNavigateToInquiry
}) => {
  const [selectedCity, setSelectedCity] = useState<string>(initialCity);
  const [popupHotel, setPopupHotel] = useState<HotelProperty | null>(null);

  // Available cities in India across IHG's portfolio
  const citiesInIndia = [
    'All Cities',
    'Ranthambore',
    'Goa',
    'Mahabalipuram',
    'Kochi',
    'Delhi NCR',
    'Jim Corbett'
  ];

  // Filtered hotels list based on selected city
  const filteredHotels = useMemo(() => {
    if (selectedCity === 'All Cities') {
      return HOTELS_DATA;
    }
    return HOTELS_DATA.filter((h) => h.city === selectedCity);
  }, [selectedCity]);

  return (
    <div className="min-h-screen bg-white text-black font-sans pb-24 animate-fade-in">
      
      {/* Top Breadcrumb Bar */}
      <div className="border-b border-neutral-200 bg-neutral-50 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2 text-neutral-500">
            <button onClick={onNavigateBack} className="hover:text-black cursor-pointer">Exploration</button>
            <span>/</span>
            <span className="text-black font-medium">Hotels & Palaces ({selectedCity})</span>
          </div>

          <button
            onClick={onNavigateBack}
            className="inline-flex items-center space-x-1 text-black hover:text-neutral-600 font-medium uppercase tracking-wider text-[11px] cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Main Page</span>
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        
        {/* Page Title & Context */}
        <div className="space-y-2">
          <span className="text-[11px] uppercase tracking-[0.25em] text-neutral-500 font-semibold block">
            National Portfolio
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-black leading-tight">
            Hotels & Palaces
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 font-light max-w-2xl leading-relaxed">
            Browse our complete portfolio of palatial fortresses, coastal resorts, and waterfront lodges across premier Indian wedding destinations. Select any sanctuary to inspect floorplans and launch your discovery inquiry.
          </p>
        </div>

        {/* Top Cities in India Filter Bar */}
        <div className="bg-neutral-50 p-4 sm:p-5 rounded-2xl border border-neutral-200 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase tracking-wider text-neutral-500 font-semibold">
              Filter by City in India:
            </span>
            <span className="text-xs text-neutral-500">
              Showing <strong className="text-black font-medium">{filteredHotels.length}</strong> {filteredHotels.length === 1 ? 'property' : 'properties'}
            </span>
          </div>

          {/* Cities Filter Pills */}
          <div className="flex space-x-2 overflow-x-auto no-scrollbar pb-1">
            {citiesInIndia.map((city) => {
              const isSelected = selectedCity === city;
              return (
                <button
                  key={city}
                  onClick={() => setSelectedCity(city)}
                  className={`px-4 py-2 rounded-xl text-xs font-sans whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-black text-white font-medium shadow-xs'
                      : 'bg-white border border-neutral-300 text-neutral-700 hover:border-black'
                  }`}
                >
                  {city}
                </button>
              );
            })}
          </div>
        </div>

        {/* Hotels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHotels.map((hotel) => (
            <div
              key={hotel.id}
              onClick={() => setPopupHotel(hotel)}
              className="group bg-white rounded-2xl border border-neutral-200 hover:border-black overflow-hidden transition-all duration-300 flex flex-col justify-between cursor-pointer shadow-2xs hover:shadow-md"
            >
              <div>
                {/* Photo with Overlay (Grayscale) */}
                <div className="relative h-60 overflow-hidden bg-neutral-900">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-full object-cover filter grayscale contrast-110 group-hover:scale-103 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://placehold.co/600x400/000000/FFFFFF?text=' + encodeURIComponent(hotel.name);
                    }}
                  />
                  <span className="absolute top-3 left-3 bg-white/95 text-black text-[10px] uppercase tracking-wider font-sans px-2.5 py-0.5 rounded-full font-medium shadow-xs">
                    {hotel.brand}
                  </span>

                  <span className="absolute top-3 right-3 bg-black/85 text-white text-[10px] uppercase tracking-wider font-sans px-2.5 py-0.5 rounded-full font-medium border border-white/20">
                    {hotel.city}
                  </span>

                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-white text-black px-3 py-1.5 rounded-full text-xs font-sans font-medium flex items-center space-x-1.5 shadow-sm">
                      <Eye className="w-3.5 h-3.5 text-black" />
                      <span>Open Sanctuary Overview</span>
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] uppercase tracking-wider font-sans text-neutral-500 font-medium">
                      {hotel.location}
                    </span>
                    <span className="text-[10px] bg-neutral-100 text-neutral-700 px-2 py-0.5 rounded-full font-medium">
                      {hotel.genre}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-normal text-black mb-2 group-hover:underline transition-colors">
                    {hotel.name}
                  </h3>

                  <div className="flex items-center space-x-4 text-xs font-sans text-neutral-700 py-2 border-y border-neutral-200 mb-3">
                    <span className="flex items-center space-x-1">
                      <Users className="w-3.5 h-3.5 text-black" />
                      <span>{hotel.capacityMin}–{hotel.capacityMax} Guests</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <BedDouble className="w-3.5 h-3.5 text-black" />
                      <span>{hotel.roomsCount} Rooms</span>
                    </span>
                  </div>

                  <p className="text-[11px] text-neutral-500 font-sans italic mb-2">
                    Mandap: {hotel.mandapType}
                  </p>
                </div>
              </div>

              {/* Action Button: Opens Popup Overlay */}
              <div className="p-5 pt-0">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setPopupHotel(hotel);
                  }}
                  className="w-full text-center border border-neutral-300 group-hover:bg-black group-hover:text-white text-black text-[11px] uppercase tracking-wider font-sans font-medium py-2 rounded-xl transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <span>Quick Overview</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* POPUP OVERLAY FOR HOTEL PROPERTY */}
      {popupHotel && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 transition-opacity animate-fade-in font-sans">
          <div 
            className="relative bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-neutral-300 shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-label={popupHotel.name}
          >
            {/* Close Button */}
            <button
              onClick={() => setPopupHotel(null)}
              className="absolute top-4 right-4 z-20 bg-white/90 hover:bg-black hover:text-white text-black p-2 rounded-full shadow-md transition-colors cursor-pointer"
              aria-label="Close popup"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Hero Image in Popup */}
            <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-black">
              <img
                src={popupHotel.image}
                alt={popupHotel.name}
                className="w-full h-full object-cover filter grayscale contrast-115"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://placehold.co/1000x500/000000/FFFFFF?text=' + encodeURIComponent(popupHotel.name);
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="flex items-center space-x-2 text-[10px] uppercase tracking-wider font-semibold mb-2">
                  <span className="bg-white text-black px-2.5 py-0.5 rounded-full">
                    {popupHotel.brand}
                  </span>
                  <span className="bg-white/20 backdrop-blur-xs text-white px-2.5 py-0.5 rounded-full">
                    {popupHotel.city}
                  </span>
                  <span className="bg-white/20 backdrop-blur-xs text-white px-2.5 py-0.5 rounded-full">
                    {popupHotel.genre}
                  </span>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl font-normal text-white">
                  {popupHotel.name}
                </h2>

                <p className="text-xs text-neutral-300 flex items-center space-x-1.5 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-white shrink-0" />
                  <span>{popupHotel.location}</span>
                </p>
              </div>
            </div>

            {/* Body Content */}
            <div className="p-6 sm:p-8 space-y-6">
              
              {/* Key Metrics Strip */}
              <div className="grid grid-cols-3 gap-3 bg-neutral-100 p-4 rounded-xl border border-neutral-200 text-center text-xs">
                <div>
                  <span className="text-[10px] uppercase text-neutral-500 block">Capacity</span>
                  <div className="font-serif text-lg font-bold text-black flex items-center justify-center space-x-1">
                    <Users className="w-4 h-4 text-black" />
                    <span>{popupHotel.capacityMin}–{popupHotel.capacityMax}</span>
                  </div>
                  <span className="text-[10px] text-neutral-500">Guests</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-neutral-500 block">Accommodations</span>
                  <div className="font-serif text-lg font-bold text-black flex items-center justify-center space-x-1">
                    <BedDouble className="w-4 h-4 text-black" />
                    <span>{popupHotel.roomsCount} Keys</span>
                  </div>
                  <span className="text-[10px] text-neutral-500">Rooms & Villas</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-neutral-500 block">Pricing Tier</span>
                  <div className="font-serif text-sm font-semibold text-black mt-1">
                    {popupHotel.priceBand}
                  </div>
                  <span className="text-[10px] text-neutral-500">Full Sanctuary</span>
                </div>
              </div>

              {/* Overview */}
              <div>
                <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-semibold block mb-1">
                  Sanctuary Overview
                </span>
                <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                  {popupHotel.overview || 'A premier IHG destination sanctuary engineered with dedicated ceremony lawns, consecrated havan courtyards, and secluded villas for multi-generational weddings.'}
                </p>
                {popupHotel.airportDistance && (
                  <div className="flex items-center space-x-1.5 text-xs text-neutral-800 mt-2 font-medium">
                    <Plane className="w-3.5 h-3.5 text-black" />
                    <span>Transit: {popupHotel.airportDistance}</span>
                  </div>
                )}
              </div>

              {/* Curated Celebration Spaces */}
              <div>
                <span className="text-[10px] uppercase tracking-wider text-black font-bold block mb-2.5">
                  Curated Celebration Spaces
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {(popupHotel.curatedSpaces || [
                    { name: 'Grand Horizon Lawn', capacity: '500 guests', type: 'Open-Air Mandap' },
                    { name: 'Pillarless Ballroom', capacity: '450 guests', type: 'Indoor Sound-Isolated' },
                    { name: 'Sacred Water Terrace', capacity: '200 guests', type: 'Intimate Pheras' }
                  ]).map((space, idx) => (
                    <div key={idx} className="bg-neutral-50 p-3.5 rounded-xl border border-neutral-200 text-xs">
                      <span className="text-[10px] uppercase text-neutral-500 font-semibold block mb-0.5">
                        {space.type}
                      </span>
                      <div className="font-semibold text-black">{space.name}</div>
                      <div className="text-[11px] text-neutral-500 mt-1">Ideal for {space.capacity}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Culinary and Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-black font-bold block mb-2">
                    Culinary Readiness
                  </span>
                  <ul className="space-y-1.5 text-xs text-neutral-700 font-light">
                    {(popupHotel.culinaryHighlights || [
                      'Dedicated pure Jain and Sattvic kitchen lines',
                      'Live traditional halwai dessert stations',
                      'Simultaneous global coastal grills & continental bars'
                    ]).map((c, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <Utensils className="w-3.5 h-3.5 text-black shrink-0 mt-0.5" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <span className="text-[10px] uppercase tracking-wider text-black font-bold block mb-2">
                    Sanctuary Highlights
                  </span>
                  <ul className="space-y-1.5 text-xs text-neutral-700 font-light">
                    {popupHotel.keyHighlights.map((h, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <Check className="w-3.5 h-3.5 text-black shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Mandap Spec Banner */}
              <div className="bg-black text-white p-4 rounded-xl flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] uppercase text-neutral-400 block font-semibold">
                    Signature Mandap Setting
                  </span>
                  <div className="font-serif text-base text-neutral-100 mt-0.5">
                    {popupHotel.mandapType}
                  </div>
                </div>
                <Sparkles className="w-5 h-5 text-neutral-400 shrink-0" />
              </div>

              {/* POPUP CTA TO ENQUIRE - LEAD FORM (OPEN DISCOVERY INTAKE) */}
              <div className="pt-3 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-xs text-neutral-500">
                  Ready to check dates & room blocks for {popupHotel.name.split(' ')[0]}?
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const hotelName = popupHotel.name;
                    setPopupHotel(null);
                    onNavigateToInquiry(hotelName);
                  }}
                  className="w-full sm:w-auto bg-black hover:bg-neutral-800 text-white px-7 py-3 rounded-full text-xs uppercase tracking-wider font-medium transition-all shadow-sm flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <span>Enquire — Open Discovery Intake</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};
