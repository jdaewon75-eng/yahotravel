import React, { useState } from 'react';
import { MapPin, Calendar, Check, ArrowRight, Eye, Sparkles } from 'lucide-react';
import { TOUR_PACKAGES } from '../../data/mockData';
import { TourPackage, TourRegion } from '../../types';

interface TourListProps {
  onSelectTour: (tour: TourPackage) => void;
  onInquiryWithTour: (tourTitle: string) => void;
  onOpenCustomInquiry: () => void;
}

export const TourList: React.FC<TourListProps> = ({ onSelectTour, onInquiryWithTour, onOpenCustomInquiry }) => {
  const [selectedRegion, setSelectedRegion] = useState<TourRegion>('all');

  const filterTabs: { id: TourRegion; label: string }[] = [
    { id: 'all', label: '전체 상품' },
    { id: 'matsuyama', label: '마쓰야마 (시코쿠)' },
    { id: 'sapporo', label: '삿포로 (홋카이도)' },
    { id: 'fukuoka', label: '후쿠오카 (규슈)' },
    { id: 'honshu', label: '도쿄/오사카 (혼슈)' },
    { id: 'okinawa', label: '나하 (오키나와)' },
  ];

  const filteredTours = selectedRegion === 'all'
    ? TOUR_PACKAGES
    : TOUR_PACKAGES.filter((t) => t.region === selectedRegion);

  return (
    <div className="py-16 sm:py-20 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* 상단 헤더 */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-block px-3 py-1 rounded-full bg-yaho-navy-100 text-yaho-navy-900 text-xs sm:text-sm font-extrabold tracking-wider uppercase">
            SIGNATURE TOUR PACKAGES
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-yaho-navy-950 tracking-tight">
            야호트래블 프리미엄 맞춤 여행 상품
          </h1>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            모든 일정은 20년 현지 전문가가 엄선한 베스트 코스이며, 고객님의 일정·희망 숙소·예산에 맞춰 <strong>100% 단독 맞춤 변경</strong>이 가능합니다.
          </p>
        </div>

        {/* 지역 필터 탭 바 (요타비 스타일 클린 탭) */}
        <div className="flex justify-center">
          <div className="inline-flex p-1.5 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-x-auto max-w-full">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedRegion(tab.id)}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
                  selectedRegion === tab.id
                    ? 'bg-yaho-navy-900 text-white shadow-md'
                    : 'text-slate-600 hover:text-yaho-navy-900 hover:bg-slate-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 상품 카드 목록 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTours.map((tour) => (
            <div
              key={tour.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group card-hover-shadow"
            >
              {/* 이미지 배너 */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={tour.thumbnail}
                  alt={tour.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                <div className="absolute top-4 left-4 flex flex-wrap gap-1.5">
                  <span className="px-3 py-1 rounded-full bg-yaho-gold-400 text-yaho-navy-950 text-xs font-black shadow-md">
                    {tour.badge}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-white text-xs font-medium">
                    {tour.duration}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-xs font-semibold text-yaho-gold-300 flex items-center gap-1 mb-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {tour.regionName}
                  </span>
                  <h3 className="text-xl font-black tracking-tight leading-snug drop-shadow-sm">
                    {tour.title}
                  </h3>
                </div>
              </div>

              {/* 본문 정보 */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <p className="text-slate-600 text-sm leading-relaxed line-clamp-2">
                    {tour.subtitle}
                  </p>

                  <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    <Calendar className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    <span>{tour.departure}</span>
                  </div>

                  {/* 하이라이트 */}
                  <div className="space-y-2 pt-1">
                    {tour.highlight.slice(0, 3).map((hl, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2 text-xs text-slate-700">
                        <Check className="w-3.5 h-3.5 text-yaho-gold-600 flex-shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 하단 버튼 */}
                <div className="pt-4 border-t border-slate-100 flex items-center gap-2.5">
                  <button
                    onClick={() => onSelectTour(tour)}
                    className="flex-1 py-3 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Eye className="w-4 h-4 text-slate-600" />
                    <span>일정표 보기</span>
                  </button>
                  <button
                    onClick={() => onInquiryWithTour(tour.title)}
                    className="flex-1 py-3 px-3 rounded-xl bg-yaho-navy-900 hover:bg-yaho-navy-800 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-1"
                  >
                    <span>맞춤 견적 문의</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 100% 완전 자유 맞춤 투어 신청 배너 */}
        <div className="bg-gradient-to-r from-yaho-navy-950 via-yaho-navy-900 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yaho-gold-400/20 text-yaho-gold-300 text-xs font-bold border border-yaho-gold-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              나만의 특별한 코스 만들기
            </span>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
              원하시는 다른 지역이나 일정이 있으신가요?
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              도쿄, 오사카, 나고야, 오키나와 등 일본 전역 어디든 원하시는 날짜와 인원, 테마(골프, 온천, 미식, 가족 여행)를 알려주시면 1:1 맞춤 견적서를 무료로 기획해 드립니다.
            </p>
          </div>
          <button
            onClick={onOpenCustomInquiry}
            className="px-8 py-4 rounded-xl bg-yaho-gold-400 hover:bg-yaho-gold-500 text-yaho-navy-950 font-black text-base shadow-xl transition-all flex-shrink-0 flex items-center gap-2"
          >
            <span>완전 맞춤 견적 신청하기</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </div>
  );
};
