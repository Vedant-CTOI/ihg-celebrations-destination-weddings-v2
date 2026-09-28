export type Perspective = 'couple' | 'family';

export type DestinationGenre = 
  | 'Royal Wedding' 
  | 'Beachside' 
  | 'Mountain & Wilderness' 
  | 'Temple Shoreline' 
  | 'Backwater Serenity';

export interface ReadinessItem {
  title: string;
  detail: string;
  verified: boolean;
}

export interface Destination {
  id: string;
  name: string;
  genre: DestinationGenre;
  tagline: string;
  vibe: string;
  image: string;
  heroSnippet: string;
  editorial: string;
  signatureVenues: string[];
  climateWindow: string;
  readiness: {
    havanFireSpace: ReadinessItem;
    baraatRoute: ReadinessItem;
    dietarySegregation: ReadinessItem;
    lateNightAcoustics: ReadinessItem;
    vipSuites: ReadinessItem;
  };
}

export interface HotelProperty {
  id: string;
  name: string;
  brand: 'Six Senses' | 'InterContinental' | 'Crowne Plaza' | 'voco' | 'Holiday Inn Resort';
  location: string;
  city: 'Ranthambore' | 'Goa' | 'Mahabalipuram' | 'Kochi' | 'Delhi NCR' | 'Jim Corbett';
  region: 'Rajasthan' | 'Goa' | 'Mahabalipuram' | 'Kerala' | 'NCR / Corbett';
  genre: DestinationGenre;
  capacityMin: number;
  capacityMax: number;
  roomsCount: number;
  image: string;
  priceBand: string;
  keyHighlights: string[];
  mandapType: string;
  curatedSpaces?: { name: string; capacity: string; type: string }[];
  culinaryHighlights?: string[];
  airportDistance?: string;
  overview?: string;
}

export interface RealWeddingCase {
  id: string;
  couple: string;
  title: string;
  location: string;
  property: string;
  guestCount: number;
  coverImage: string;
  gallery: string[];
  culturalConfluence: string;
  resolutionStory: string;
  timelineHighlights: { time: string; ritual: string; space: string }[];
  coupleTestimonial: string;
}

export type WeddingFunctionId = 'mehendi' | 'sangeet' | 'wedding' | 'reception' | 'cocktail';

export interface VisualiseFunctionData {
  id: WeddingFunctionId;
  label: string;
  tagline: string;
  venueName: string;
  property: string;
  rawImage: string;
  transformedImage: string;
  decorTheme: string;
  lightingMood: string;
  keyElements: string[];
  guestLayout: string;
}

export type UserPersona = 'Bride' | 'Groom' | 'Parent' | 'Wedding Planner';

export interface InquiryFormData {
  primaryContactName: string;
  email: string;
  phone: string;
  decisionRole: UserPersona;
  destinations: string[];
  targetWindow: string;
  guestRange: string;
  estimatedGuests: number;
  ceremonyTraditions: string[];
  priorityDietary: string[];
  notes: string;
  partnerName?: string;
  planningAgency?: string;
  coupleReference?: string;
  elderAccessibilityNeeds?: string;
  vendorProductionNotes?: string;
  bridalStylingNeeds?: string;
  baraatSpec?: string;
}

export type PageView =
  | { type: 'home' }
  | { type: 'destination-detail'; destinationId: string }
  | { type: 'all-hotels'; selectedCity?: string }
  | { type: 'hotel-detail'; hotelId: string }
  | { type: 'story-detail'; storyId: string }
  | { type: 'conversation'; prefilledDestination?: string; prefilledHotel?: string }
  | { type: 'planning-charter' }
  | { type: 'confirmation'; data: InquiryFormData };
