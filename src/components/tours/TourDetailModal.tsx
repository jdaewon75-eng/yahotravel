import React from 'react';
import { X, Calendar, MapPin, Check, AlertCircle, Phone, ArrowRight, ShieldCheck } from 'lucide-react';
import { TourPackage } from '../../types';
import { COMPANY_INFO } from '../../data/mockData';

interface TourDetailModalProps {
  tour: TourPackage | null;
  onClose: () => void;
  onInquiry: (tourTitle: string) => void;
}

export const TourDetailModal: React.FC<TourDetailModalProps> = ({ tour, onClose, onInquiry }) => {
  if (!tour) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 상단 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-all"
          aria-label="닫기"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 모달 헤더 이미지 배너 */}
        <div className="relative h-64 sm:h-72 flex-shrink-0">
          <img
            src={tour.thumbnail}
            alt={tour.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-yaho-gold-400 text-yaho-navy-950 text-xs font-black">
                {tour.badge}
              </span>
              <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold">
                {tour.regionName}
              </span>
              <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold">
                {tour.duration}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight drop-shadow-md">
              {tour.title}
            </h2>
            <p className="text-slate-200 text-sm sm:text-base font-normal">
              {tour.subtitle}
            </p>
          </div>
        </div>

        {/* 모달 스크롤 본문 */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8">
          
          {/* 출발 및 코스 요약 */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase block mb-1">출발 정보</span>
              <p className="font-bold text-slate-800 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-yaho-gold-600" />
                {tour.departure}
              </p>
            </div>
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase block mb-1">진행 방식</span>
              <p className="font-bold text-slate-800 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                20년 전문가 맞춤 기획 및 전용 차량 단독 프라이빗 투어
              </p>
            </div>
          </div>

          {/* 주요 핵심 포인트 */}
          <div>
            <h3 className="text-lg font-black text-yaho-navy-950 mb-3 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-yaho-gold-500"></span>
              이 여행의 특별한 포인트
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {tour.highlight.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-slate-700 text-sm bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                  <Check className="w-4 h-4 text-yaho-gold-600 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 일차별 상세 일정표 */}
          <div>
            <h3 className="text-lg font-black text-yaho-navy-950 mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-yaho-navy-900" />
              일차별 상세 일정표
            </h3>
            <div className="space-y-4">
              {tour.itinerary.map((day) => (
                <div key={day.day} className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm">
                  <div className="bg-yaho-navy-900 text-white px-5 py-3 flex items-center justify-between">
                    <span className="font-black text-base flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-yaho-gold-400 text-yaho-navy-950 flex items-center justify-center text-xs font-black">
                        Day {day.day}
                      </span>
                      {day.title}
                    </span>
                    <span className="text-xs text-slate-300 hidden sm:inline-block font-medium">
                      호텔: {day.hotel}
                    </span>
                  </div>
                  
                  <div className="p-5 space-y-3">
                    <p className="text-slate-700 text-sm leading-relaxed">
                      {day.description}
                    </p>

                    {/* 방문 스팟 태그 */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {day.spots.map((spot, sIdx) => (
                        <span key={sIdx} className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-medium">
                          • {spot}
                        </span>
                      ))}
                    </div>

                    {/* 식사 정보 */}
                    <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap gap-4 text-xs text-slate-500">
                      {day.meals.breakfast && <span>조식: <strong className="text-slate-700">{day.meals.breakfast}</strong></span>}
                      {day.meals.lunch && <span>중식: <strong className="text-slate-700">{day.meals.lunch}</strong></span>}
                      {day.meals.dinner && <span>석식: <strong className="text-slate-700">{day.meals.dinner}</strong></span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 포함 / 불포함 안내 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-emerald-50/70 border border-emerald-200 p-5 rounded-2xl">
              <h4 className="font-black text-emerald-900 text-sm mb-2 flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600" />
                포함 사항
              </h4>
              <ul className="space-y-1.5 text-xs sm:text-sm text-emerald-800">
                {tour.includes.map((inc, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    • {inc}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl">
              <h4 className="font-black text-slate-800 text-sm mb-2 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-slate-500" />
                불포함 사항
              </h4>
              <ul className="space-y-1.5 text-xs sm:text-sm text-slate-600">
                {tour.excludes.map((exc, e) => (
                  <li key={e} className="flex items-center gap-1.5">
                    • {exc}
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        {/* 모달 하단 고정 액션 바 */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 flex-shrink-0">
          <div className="text-xs text-slate-500 text-center sm:text-left">
            * 위 일정은 고객님의 출발 희망일, 인원, 선호도에 따라 100% 맞춤 조정 가능합니다.
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href={`tel:${COMPANY_INFO.tel}`}
              className="flex-1 sm:flex-initial px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-700 font-bold text-sm hover:bg-slate-100 transition-colors flex items-center justify-center gap-1.5"
            >
              <Phone className="w-4 h-4" />
              <span>전화 문의</span>
            </a>
            <button
              onClick={() => {
                onInquiry(tour.title);
                onClose();
              }}
              className="flex-1 sm:flex-initial px-6 py-3 rounded-xl bg-yaho-navy-900 hover:bg-yaho-navy-800 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>이 코스로 맞춤 견적 신청</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
