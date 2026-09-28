import React, { useState } from 'react';
import { Plane, Calendar, MapPin, Check, ArrowRight, Sparkles, MessageCircle, Phone, Clock, ChevronRight } from 'lucide-react';
import { MONTHLY_TOURS, COMPANY_INFO } from '../../data/mockData';
import { MonthlyTourPackage } from '../../types';

interface MonthlyToursProps {
  onInquiryWithTour: (tourTitle: string) => void;
}

export const MonthlyTours: React.FC<MonthlyToursProps> = ({ onInquiryWithTour }) => {
  // 기본 선택 월: 현재 날짜 기준 또는 10월
  const [selectedTourId, setSelectedTourId] = useState<string>('oct-matsuyama');

  const currentTour = MONTHLY_TOURS.find((t) => t.id === selectedTourId) || MONTHLY_TOURS[0];

  return (
    <section id="monthly-tours" className="py-20 bg-gradient-to-b from-slate-50 via-white to-slate-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 섹션 상단 헤더 */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-yaho-gold-100/90 text-yaho-navy-950 text-xs sm:text-sm font-extrabold tracking-wide uppercase mb-3 shadow-sm border border-yaho-gold-200">
            <Sparkles className="w-4 h-4 text-yaho-gold-600 animate-pulse" />
            <span>SEASONAL BEST PICKS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-yaho-navy-950 tracking-tight">
            월별 추천 테마 관광 코스
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mt-3 leading-relaxed">
            가장 아름다운 계절에 떠나는 일본의 비경과 온천.<br className="hidden sm:inline" />
            김해공항 직항 노선과 20년 현지 전문가가 엄선한 <strong>3박 4일 완벽 동선</strong>으로 만나보세요.
          </p>
        </div>

        {/* 10월 ~ 2월 월별 탭 네비게이션 */}
        <div className="flex items-center justify-start sm:justify-center gap-2.5 sm:gap-3 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {MONTHLY_TOURS.map((tour) => {
            const isSelected = tour.id === selectedTourId;
            return (
              <button
                key={tour.id}
                onClick={() => setSelectedTourId(tour.id)}
                className={`flex-shrink-0 px-4 sm:px-6 py-3 rounded-2xl font-bold transition-all duration-300 flex items-center gap-2.5 sm:gap-3 border ${
                  isSelected
                    ? `${tour.accentColor.activeTab} border-transparent shadow-lg scale-105`
                    : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200 shadow-sm'
                }`}
              >
                <span className="text-xl sm:text-2xl">{tour.icon}</span>
                <div className="text-left">
                  <div className={`text-xs font-semibold ${isSelected ? 'text-white/90' : 'text-slate-500'}`}>
                    {tour.monthLabel}
                  </div>
                  <div className={`text-sm sm:text-base font-extrabold leading-tight ${isSelected ? 'text-white' : 'text-yaho-navy-950'}`}>
                    {tour.title.split(' ')[0]}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* 선택된 월별 코스 메인 쇼케이스 카드 */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden transition-all duration-300">
          
          {/* 상단 배너 헤더 */}
          <div className="relative bg-yaho-navy-950 text-white p-6 sm:p-8 md:p-10 overflow-hidden">
            {/* 은은한 배경 장식 */}
            <div className="absolute -right-10 -bottom-10 opacity-10 text-[180px] select-none pointer-events-none">
              {currentTour.icon}
            </div>

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                {/* 뱃지 라인 */}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-yaho-gold-400 text-yaho-navy-950 text-xs font-black shadow-sm">
                    <span>{currentTour.icon}</span>
                    <span>{currentTour.monthLabel} 추천</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-slate-100 text-xs font-bold border border-white/10">
                    <Plane className="w-3.5 h-3.5 text-yaho-gold-300" />
                    <span>{currentTour.flight}</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-slate-100 text-xs font-bold border border-white/10">
                    <Clock className="w-3.5 h-3.5 text-yaho-gold-300" />
                    <span>{currentTour.duration}</span>
                  </span>
                  {currentTour.note && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-rose-500 text-white text-xs font-bold animate-bounce">
                      ★ {currentTour.note}
                    </span>
                  )}
                </div>

                {/* 메인 타이틀 */}
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white flex items-center gap-3">
                  <span>{currentTour.title}</span>
                </h3>

                {/* 감성 캐치프레이즈 */}
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-xl sm:text-2xl text-yaho-gold-400 font-serif font-black">“</span>
                  <p className="text-base sm:text-xl font-bold text-yaho-gold-200 tracking-wide font-sans">
                    {currentTour.catchphrase}
                  </p>
                  <span className="text-xl sm:text-2xl text-yaho-gold-400 font-serif font-black">”</span>
                </div>
              </div>

              {/* 우측 빠른 견적 CTA */}
              <div className="flex-shrink-0 flex flex-col sm:flex-row md:flex-col gap-2.5">
                <button
                  onClick={() => onInquiryWithTour(`[${currentTour.monthLabel} 추천] ${currentTour.title}`)}
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-yaho-gold-400 to-yaho-gold-500 hover:from-yaho-gold-300 hover:to-yaho-gold-400 text-yaho-navy-950 font-black text-sm sm:text-base shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  <span>이 코스로 맞춤 견적 문의</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <div className="flex items-center justify-center gap-3 text-xs text-slate-300">
                  <a
                    href={`tel:${COMPANY_INFO.tel}`}
                    className="flex items-center gap-1 hover:text-white transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-yaho-gold-300" />
                    <span>전화 직통 상담</span>
                  </a>
                  <span>·</span>
                  <a
                    href={COMPANY_INFO.kakaoChannelUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[#FEE500] hover:underline"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-current" />
                    <span>카톡 1:1 상담</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* 본문 콘텐츠: 좌측(일자별 동선 타임라인) + 우측(비주얼 & 하이라이트) */}
          <div className="p-6 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* 좌측: 1일차 ~ 4일차 상세 일정 동선 (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <h4 className="text-lg font-black text-yaho-navy-950 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-yaho-navy-700" />
                  <span>일자별 핵심 상세 동선 (1~4일차)</span>
                </h4>
                <span className="text-xs text-slate-500 font-medium">※ 인원·취향에 맞춘 100% 일정 커스텀 가능</span>
              </div>

              <div className="space-y-4 pt-1">
                {currentTour.days.map((dayItem) => (
                  <div
                    key={dayItem.day}
                    className="bg-slate-50/80 rounded-2xl p-4 sm:p-5 border border-slate-200/90 hover:border-yaho-navy-300 hover:bg-slate-50 transition-all group"
                  >
                    {/* 일차 뱃지 & 숙박 정보 */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-lg bg-yaho-navy-900 text-yaho-gold-400 text-xs font-black flex items-center justify-center shadow-sm">
                          {dayItem.day}일
                        </span>
                        <span className="text-sm font-extrabold text-yaho-navy-900">
                          {dayItem.day}일차 여행 코스
                        </span>
                      </div>
                      {dayItem.stay && (
                        <span className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1 shadow-2xs">
                          <MapPin className="w-3 h-3 text-rose-500 flex-shrink-0" />
                          <span>숙박: {dayItem.stay}</span>
                        </span>
                      )}
                    </div>

                    {/* 경유지 동선 리스트 (화살표 연결 칩) */}
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                      {dayItem.spots.map((spot, sIdx) => (
                        <React.Fragment key={sIdx}>
                          <span className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200/80 text-xs sm:text-sm font-bold text-slate-800 shadow-2xs group-hover:border-slate-300 transition-colors">
                            {spot}
                          </span>
                          {sIdx < dayItem.spots.length - 1 && (
                            <ChevronRight className="w-3.5 h-3.5 text-yaho-gold-600 flex-shrink-0" />
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 우측: 랜드마크 비주얼 이미지 + 코스 포인트 (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              
              {/* 대표 이미지 카드 */}
              <div className="relative rounded-2xl overflow-hidden h-64 sm:h-72 shadow-md group">
                <img
                  src={currentTour.image}
                  alt={currentTour.title}
                  loading="lazy"
                  onError={(e) => {
                    // Fallback to verified image if load fails
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1200&auto=format&fit=crop';
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-xs font-extrabold text-yaho-gold-300 flex items-center gap-1 mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    {currentTour.seasonTag}
                  </span>
                  <h5 className="text-lg font-black tracking-tight drop-shadow-md">
                    {currentTour.title}
                  </h5>
                </div>
              </div>

              {/* 투어 핵심 하이라이트 박스 */}
              <div className="bg-yaho-navy-50/70 rounded-2xl p-5 border border-yaho-navy-100 space-y-3">
                <h5 className="text-sm font-black text-yaho-navy-950 flex items-center gap-2">
                  <span className="text-base">{currentTour.icon}</span>
                  <span>이 달의 여행 핵심 하이라이트</span>
                </h5>
                <div className="space-y-2">
                  {currentTour.highlights.map((hl, hlIdx) => (
                    <div key={hlIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 font-medium">
                      <Check className="w-4 h-4 text-yaho-gold-600 flex-shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 하단 견적 및 상담 유도 박스 */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-yaho-navy-950 text-white space-y-4">
                <div>
                  <div className="text-xs text-yaho-gold-400 font-extrabold uppercase">Custom Private Tour</div>
                  <h5 className="text-base font-black mt-0.5">우리 일행만을 위한 단독 맞춤 일정</h5>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    다른 사람과 섞이지 않는 단독 전용 차량과 20년 현지 전문가의 밀착 케어로 편안하게 떠나세요.
                  </p>
                </div>
                <button
                  onClick={() => onInquiryWithTour(`[${currentTour.monthLabel} 추천] ${currentTour.title}`)}
                  className="w-full py-3 rounded-xl bg-yaho-gold-400 hover:bg-yaho-gold-300 text-yaho-navy-950 font-black text-sm transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <span>{currentTour.monthLabel} 코스 무료 맞춤 견적 받기</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>

        </div>

        {/* 5개 월 한눈에 보기 카드 그리드 */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-lg sm:text-xl font-black text-yaho-navy-950 flex items-center gap-2">
              <span>📅 월별 추천 코스 한눈에 둘러보기</span>
            </h4>
            <span className="text-xs text-slate-500">카드를 누르면 해당 월의 상세 일정이 열립니다</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {MONTHLY_TOURS.map((tour) => {
              const isSelected = tour.id === selectedTourId;
              return (
                <div
                  key={tour.id}
                  onClick={() => {
                    setSelectedTourId(tour.id);
                    // 데스크톱/모바일에서 부드럽게 스크롤
                    const el = document.getElementById('monthly-tours');
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                  className={`cursor-pointer rounded-2xl p-4 transition-all duration-300 border flex flex-col justify-between ${
                    isSelected
                      ? 'bg-yaho-navy-900 text-white border-yaho-navy-900 shadow-lg ring-2 ring-yaho-gold-400 scale-[1.02]'
                      : 'bg-white text-slate-800 border-slate-200 hover:border-yaho-navy-300 hover:shadow-md'
                  }`}
                >
                  <div>
                    {/* 상단 월 뱃지 */}
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="text-2xl">{tour.icon}</span>
                      <span className={`text-xs font-extrabold px-2 py-0.5 rounded-full ${
                        isSelected ? 'bg-yaho-gold-400 text-yaho-navy-950' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {tour.monthLabel}
                      </span>
                    </div>

                    <h5 className="text-sm font-black tracking-tight line-clamp-1 mb-1">
                      {tour.title}
                    </h5>

                    <p className={`text-[11px] line-clamp-2 leading-relaxed mb-3 ${
                      isSelected ? 'text-slate-300' : 'text-slate-500'
                    }`}>
                      {tour.catchphrase}
                    </p>
                  </div>

                  <div className={`pt-2.5 border-t text-[11px] font-bold flex items-center justify-between ${
                    isSelected ? 'border-white/10 text-yaho-gold-300' : 'border-slate-100 text-yaho-navy-800'
                  }`}>
                    <span className="flex items-center gap-1 truncate">
                      <Plane className="w-3 h-3 flex-shrink-0" />
                      {tour.flight.replace('김해 ↔ ', '')}
                    </span>
                    <span className="flex items-center gap-0.5">
                      <span>일정보기</span>
                      <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
