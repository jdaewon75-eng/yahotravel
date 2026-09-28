import React, { useState } from 'react';
import { Flag, Plane, Clock, Users, Sun, Check, X, ArrowRight, MapPin, Car, UtensilsCrossed, BedDouble, Phone, MessageCircle } from 'lucide-react';
import { GOLF_COURSES } from '../../data/golfCourses';
import { COMPANY_INFO } from '../../data/mockData';

interface GolfSignatureProps {
  onInquiryWithTour: (tourTitle: string) => void;
}

export const GolfSignature: React.FC<GolfSignatureProps> = ({ onInquiryWithTour }) => {
  const [selectedId, setSelectedId] = useState<string>(GOLF_COURSES[0].id);
  const course = GOLF_COURSES.find((c) => c.id === selectedId) || GOLF_COURSES[0];
  const inquiryTitle = `[골프 대표코스] ${course.title}`;

  const infoChips = [
    { icon: <Plane className="w-3.5 h-3.5 text-yaho-gold-300" />, text: course.flight },
    { icon: <Clock className="w-3.5 h-3.5 text-yaho-gold-300" />, text: course.duration },
    { icon: <Flag className="w-3.5 h-3.5 text-yaho-gold-300" />, text: course.rounds },
    { icon: <Users className="w-3.5 h-3.5 text-yaho-gold-300" />, text: course.groupSize },
  ];

  return (
    <section id="golf-course" className="py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* 섹션 헤더 */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 text-xs sm:text-sm font-extrabold tracking-wide uppercase mb-3 shadow-sm border border-emerald-200">
            <Flag className="w-4 h-4 text-emerald-600" />
            <span>SIGNATURE GOLF COURSE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-yaho-navy-950 tracking-tight">
            지역별 골프 대표코스
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mt-3 leading-relaxed">
            김해공항 직항으로 떠나는 일본 5대 지역 골프 여행.{' '}<br className="hidden sm:inline" />
            지역마다 엄선한 명문 코스 <strong>3라운드 54홀</strong>과 온천·리조트 숙박을 한 번에 즐기세요.
          </p>
        </div>

        {/* 지역 탭 */}
        <div className="flex items-center justify-start sm:justify-center gap-2.5 sm:gap-3 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {GOLF_COURSES.map((c) => {
            const isSelected = c.id === selectedId;
            return (
              <button
                key={c.id}
                onClick={() => setSelectedId(c.id)}
                className={`flex-shrink-0 px-4 sm:px-6 py-3 rounded-2xl font-bold transition-all duration-300 flex items-center gap-2.5 border ${
                  isSelected
                    ? 'bg-gradient-to-r from-emerald-700 to-emerald-600 text-white border-transparent shadow-lg scale-105'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200 shadow-sm'
                }`}
              >
                <span className="text-xl sm:text-2xl">{c.icon}</span>
                <div className="text-left">
                  <div className={`text-xs font-semibold ${isSelected ? 'text-white/90' : 'text-slate-500'}`}>골프 대표코스</div>
                  <div className={`text-sm sm:text-base font-extrabold leading-tight ${isSelected ? 'text-white' : 'text-yaho-navy-950'}`}>
                    {c.regionLabel}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">

          {/* 히어로 배너 */}
          <div className="relative min-h-[320px] sm:min-h-[360px] flex items-end">
            <img
              src={course.image}
              alt={course.title}
              loading="lazy"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1200&auto=format&fit=crop';
              }}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-yaho-navy-950 via-yaho-navy-950/70 to-yaho-navy-950/10" />

            <div className="relative z-10 w-full p-6 sm:p-8 md:p-10 text-white flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-yaho-gold-400 text-yaho-navy-950 text-xs font-black shadow-sm mb-3">
                  {course.icon} {course.badge}
                </span>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight">{course.title}</h3>
                <p className="mt-2 text-sm sm:text-base text-slate-200 font-semibold">{course.subtitle}</p>
                <p className="mt-3 text-base sm:text-xl font-bold text-yaho-gold-200">“{course.catchphrase}”</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {infoChips.map((chip, i) => (
                    <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-slate-100 text-xs font-bold border border-white/10">
                      {chip.icon}
                      <span>{chip.text}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex-shrink-0 flex flex-col gap-2.5">
                <button
                  onClick={() => onInquiryWithTour(inquiryTitle)}
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-yaho-gold-400 to-yaho-gold-500 hover:from-yaho-gold-300 hover:to-yaho-gold-400 text-yaho-navy-950 font-black text-sm sm:text-base shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <span>골프 대표코스 견적 문의</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <div className="flex items-center justify-center gap-3 text-xs text-slate-300">
                  <a href={`tel:${COMPANY_INFO.tel}`} className="flex items-center gap-1 hover:text-white transition-colors">
                    <Phone className="w-3.5 h-3.5 text-yaho-gold-300" />
                    <span>전화 상담</span>
                  </a>
                  <span>·</span>
                  <a href={COMPANY_INFO.kakaoChannelUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[#FEE500] hover:underline">
                    <MessageCircle className="w-3.5 h-3.5 fill-current" />
                    <span>카톡 상담</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* 핵심 수치 */}
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-slate-200 border-b border-slate-200 bg-slate-50">
            {course.stats.map((s, i) => (
              <div key={i} className="p-4 sm:p-5 text-center">
                <div className="text-[11px] sm:text-xs font-bold text-slate-500">{s.label}</div>
                <div className="text-base sm:text-xl font-black text-yaho-navy-950 mt-1">{s.value}</div>
              </div>
            ))}
          </div>

          <div className="p-6 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* 좌측: 일자별 일정 */}
            <div className="lg:col-span-7 space-y-4">
              <h4 className="text-lg font-black text-yaho-navy-950 flex items-center gap-2 pb-2 border-b border-slate-200">
                <Flag className="w-5 h-5 text-emerald-600" />
                <span>일자별 라운딩 & 여행 일정</span>
              </h4>

              {course.days.map((d) => (
                <div key={d.day} className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 sm:p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 h-7 rounded-lg bg-yaho-navy-900 text-yaho-gold-400 text-xs font-black flex items-center justify-center">
                        DAY {d.day}
                      </span>
                      <span className="text-sm sm:text-base font-extrabold text-yaho-navy-900">{d.title}</span>
                    </div>
                    {d.round && (
                      <span className="px-2.5 py-1 rounded-md bg-emerald-600 text-white text-xs font-black">
                        {d.round.label} · {d.round.holes}홀
                      </span>
                    )}
                  </div>

                  {d.round && (
                    <div className="mb-3 rounded-xl bg-white border border-emerald-200 p-3 text-xs sm:text-sm space-y-1.5">
                      <div className="font-extrabold text-emerald-800 flex items-center gap-1.5">
                        <Flag className="w-3.5 h-3.5" />
                        {d.round.courseName ? `${d.round.courseName} (${d.round.courseType})` : d.round.courseType}
                      </div>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-slate-600 font-medium">
                        <span className="flex items-center gap-1"><Sun className="w-3.5 h-3.5 text-amber-500" />{d.round.teeOff}</span>
                        <span className="flex items-center gap-1"><Car className="w-3.5 h-3.5 text-yaho-navy-700" />{d.round.transfer}</span>
                      </div>
                    </div>
                  )}

                  <ol className="space-y-1.5 mb-3">
                    {d.schedule.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 font-medium">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-yaho-gold-500 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ol>

                  <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-200 text-[11px] sm:text-xs">
                    <span className="flex items-center gap-1 px-2 py-1 rounded-md bg-white border border-slate-200 text-slate-600">
                      <UtensilsCrossed className="w-3 h-3 text-yaho-navy-700" />
                      {[d.meals.breakfast && `조: ${d.meals.breakfast}`, d.meals.lunch && `중: ${d.meals.lunch}`, d.meals.dinner && `석: ${d.meals.dinner}`].filter(Boolean).join(' / ')}
                    </span>
                    <span className="flex items-center gap-1 px-2 py-1 rounded-md bg-white border border-slate-200 text-slate-700 font-bold">
                      <BedDouble className="w-3 h-3 text-rose-500" />
                      {d.stay}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* 우측: 하이라이트 / 포함·불포함 / 추천 */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-emerald-50/70 rounded-2xl p-5 border border-emerald-100 space-y-3">
                <h5 className="text-sm font-black text-yaho-navy-950">⛳ 대표코스 핵심 포인트</h5>
                {course.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 font-medium">
                    <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-slate-200 p-4 space-y-2">
                  <h5 className="text-sm font-black text-yaho-navy-950">포함 사항</h5>
                  {course.includes.map((t, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-xs text-slate-700">
                      <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
                <div className="rounded-2xl border border-slate-200 p-4 space-y-2">
                  <h5 className="text-sm font-black text-yaho-navy-950">불포함 사항</h5>
                  {course.excludes.map((t, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-xs text-slate-600">
                      <X className="w-3.5 h-3.5 text-rose-500 flex-shrink-0 mt-0.5" />
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 p-4 space-y-2">
                <h5 className="text-sm font-black text-yaho-navy-950 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-rose-500" /> 이런 분께 추천합니다
                </h5>
                <div className="flex flex-wrap gap-2">
                  {course.recommendedFor.map((r, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-full bg-yaho-navy-50 text-yaho-navy-900 text-xs font-bold border border-yaho-navy-100">
                      {r}
                    </span>
                  ))}
                </div>
                <p className="text-[11px] text-slate-500 pt-1">
                  <Sun className="inline w-3 h-3 mr-1 text-amber-500" />베스트 시즌: {course.bestSeason}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-yaho-navy-950 text-white space-y-3">
                <p className="text-xs text-slate-300 leading-relaxed">※ {course.notice}</p>
                <button
                  onClick={() => onInquiryWithTour(inquiryTitle)}
                  className="w-full py-3 rounded-xl bg-yaho-gold-400 hover:bg-yaho-gold-300 text-yaho-navy-950 font-black text-sm transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <span>우리 팀 일정으로 무료 견적 받기</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
