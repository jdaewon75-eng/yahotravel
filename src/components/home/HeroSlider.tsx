import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, Shield, Award } from 'lucide-react';

interface HeroSliderProps {
  onOpenInquiry: (purpose?: string) => void;
  onExploreTours: () => void;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({ onOpenInquiry, onExploreTours }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 'private',
      badge: '20년 현지 베테랑 직접 기획 · 전용차량 케어',
      title: '우리가 꿈꾸던 일본,\n우리끼리 여유롭게',
      subtitle: '대형 패키지의 번잡함 없이, 우리 가족·지인만을 위한 단독 차량과 맞춤 일정.\n20년 현지 전문가가 기획부터 운전·인솔까지 완벽하게 밀착 동행합니다.',
      ctaText: '소규모 맞춤 견적 문의',
      ctaPurpose: 'private_family',
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1920&auto=format&fit=crop',
      accent: '프라이빗 투어 (4인~8인)'
    },
    {
      id: 'corporate',
      badge: '거제 및 남부권 기업체 · 조선소 협력사 · VIP 단체',
      title: '비즈니스 품격을 높이는\n맞춤형 일본 VIP 단체 여행',
      subtitle: '명문 골프장, 전통 온천 료칸, 전용 리무진 버스까지 직계약 인프라.\n성공적인 기업 포상 및 비즈니스 인센티브 투어를 완성합니다.',
      ctaText: '기업/단체 제안서 요청',
      ctaPurpose: 'corporate_incentive',
      image: 'https://images.unsplash.com/photo-1696329938280-5eb678dd4202?q=80&w=1920&auto=format&fit=crop',
      accent: '기업 인센티브 & 명문 골프'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="relative h-[560px] sm:h-[640px] lg:h-[700px] overflow-hidden bg-slate-950">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
          }`}
        >
          {/* 배경 이미지 및 그라데이션 오버레이 */}
          <div
            className="absolute inset-0 bg-cover bg-center transform scale-105 transition-transform duration-10000"
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-yaho-navy-950/95 via-yaho-navy-950/80 to-transparent sm:w-3/4 lg:w-3/5" />
          <div className="absolute inset-0 bg-gradient-to-t from-yaho-navy-950/90 via-transparent to-black/20" />

          {/* 콘텐츠 영역 */}
          <div className="relative z-20 max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
            <div className="max-w-2xl space-y-6">
              
              {/* 상단 뱃지 */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-yaho-gold-400/20 border border-yaho-gold-400/40 text-yaho-gold-300 text-xs sm:text-sm font-bold tracking-wide">
                <Award className="w-4 h-4 text-yaho-gold-400" />
                <span>{slide.badge}</span>
              </div>

              {/* 메인 타이틀 (시니어 고객을 위한 시원시원한 폰트) */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.2] sm:leading-[1.25] tracking-tight whitespace-pre-line drop-shadow-md">
                {slide.title}
              </h1>

              {/* 서브 카피 */}
              <p className="text-slate-200 text-base sm:text-lg leading-relaxed whitespace-pre-line font-normal text-opacity-95">
                {slide.subtitle}
              </p>

              {/* 액션 버튼 그룹 */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <button
                  onClick={() => onOpenInquiry(slide.ctaPurpose)}
                  className="px-7 py-4 rounded-xl bg-yaho-gold-400 hover:bg-yaho-gold-500 text-yaho-navy-950 font-black text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  <span>{slide.ctaText}</span>
                  <ArrowRight className="w-5 h-5 stroke-[2.5]" />
                </button>
                <button
                  onClick={onExploreTours}
                  className="px-6 py-4 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-base backdrop-blur-md border border-white/25 transition-all flex items-center justify-center gap-2"
                >
                  <span>대표 코스 일정 보기</span>
                </button>
              </div>

              {/* 하단 안심 포인트 */}
              <div className="flex items-center gap-6 pt-4 text-xs sm:text-sm text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-yaho-gold-400" />
                  3,000만원 인허가 보증보험
                </span>
                <span className="flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-yaho-gold-400" />
                  한·일 대형면허 안전 운행
                </span>
              </div>

            </div>
          </div>
        </div>
      ))}

      {/* 좌우 화살표 컨트롤 */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-sm border border-white/20 transition-all hidden sm:flex"
        aria-label="이전 슬라이드"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-sm border border-white/20 transition-all hidden sm:flex"
        aria-label="다음 슬라이드"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* 하단 인디케이터 도트 */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-2.5 rounded-full transition-all ${
              idx === currentSlide ? 'w-8 bg-yaho-gold-400' : 'w-2.5 bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`${idx + 1}번 슬라이드로 이동`}
          />
        ))}
      </div>
    </section>
  );
};
