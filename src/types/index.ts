export type TourRegion = 'all' | 'fukuoka' | 'matsuyama' | 'honshu' | 'sapporo' | 'okinawa' | 'custom';

export interface DayItinerary {
  day: number;
  title: string;
  meals: {
    breakfast?: string;
    lunch?: string;
    dinner?: string;
  };
  hotel: string;
  spots: string[];
  description: string;
}

export interface TourPackage {
  id: string;
  title: string;
  subtitle: string;
  region: 'matsuyama' | 'sapporo' | 'fukuoka' | 'honshu' | 'okinawa' | 'custom';
  regionName: string;
  duration: string; // 예: "2박 3일"
  departure: string; // 예: "김해(부산) 출발 기준 / 전국 출발 맞춤"
  badge: string; // 예: "베스트셀러", "힐링온천", "기업추천"
  thumbnail: string;
  tags: string[];
  highlight: string[];
  summary: string;
  itinerary: DayItinerary[];
  includes?: string[];
  excludes?: string[];
  recommendedFor: string[];
}

export interface InquiryFormData {
  name: string;
  phone: string;
  email?: string;
  region: string;
  departureDate: string;
  duration: string;
  adultCount: number;
  childCount: number;
  purpose: 'private_family' | 'corporate_incentive' | 'golf_hotspring' | 'other';
  budget?: string;
  customRequests: string;
  agreedToPrivacy: boolean;
}

export interface ReviewItem {
  id: string;
  author: string;
  location: string;
  tourName: string;
  date: string;
  rating: number;
  title: string;
  content: string;
  images?: string[];
  tags: string[];
}

export interface NoticeItem {
  id: string;
  category: '공지' | '여행안내' | '입국정보';
  title: string;
  date: string;
  isImportant?: boolean;
  content: string;
}
