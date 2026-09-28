import React, { useState } from 'react';
import { Phone, Menu, X, Compass, ChevronRight, MessageCircle } from 'lucide-react';
import { COMPANY_INFO } from '../../data/mockData';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenInquiry: (purpose?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onOpenInquiry }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: '홈' },
    { id: 'monthly', label: '월별 추천 코스' },
    { id: 'golf', label: '골프 대표코스' },
    { id: 'tours', label: '맞춤 여행 상품' },
    { id: 'about', label: '회사소개' },
    { id: 'inquiry', label: '견적 및 여행 문의' },
    { id: 'board', label: '공지사항' },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
      {/* 상단 띠 배너: 50대 및 중장년 고객을 위한 직통 안내 */}
      <div className="bg-yaho-navy-950 text-slate-200 text-xs sm:text-sm py-2 px-4 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex justify-between items-center leading-normal">
          <span className="flex items-center gap-2 font-medium truncate">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0"></span>
            <a
              href={COMPANY_INFO.naverBlogUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-base sm:text-[25px] leading-tight font-bold text-slate-100 hover:text-yaho-gold-300 underline-offset-4 hover:underline transition-colors truncate"
            >
              다녀오신 분들의 발자취(네이버블로그)
            </a>
          </span>
          <div className="hidden sm:flex items-center gap-4 text-xs flex-shrink-0">
            <a 
              href={`tel:${COMPANY_INFO.tel}`}
              className="flex items-center gap-1.5 font-semibold text-yaho-gold-300 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-yaho-gold-400" />
              <span>{COMPANY_INFO.tel}</span>
            </a>
          </div>
        </div>
      </div>

      {/* 메인 네비게이션 바 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4 lg:gap-8">
          
          {/* 로고 영역 (수평/수직 완벽 정렬) */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group select-none flex-shrink-0"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-yaho-navy-900 text-yaho-gold-400 flex items-center justify-center shadow-md group-hover:bg-yaho-navy-800 transition-colors flex-shrink-0">
              <Compass className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-yaho-navy-950 group-hover:text-yaho-navy-800 transition-colors leading-tight">
                  야호트래블
                </span>
                <span className="text-[10px] sm:text-[11px] font-extrabold tracking-wider text-yaho-gold-700 uppercase bg-yaho-gold-50 border border-yaho-gold-200/80 px-1.5 py-0.5 rounded leading-tight">
                  YAHO TRAVEL
                </span>
              </div>
              <span className="text-[11px] text-slate-500 font-semibold tracking-tight leading-tight hidden lg:inline-block">
                일본 프리미엄 프라이빗 & 인센티브 전문
              </span>
            </div>
          </div>

          {/* 데스크톱 메뉴 (로고와 완벽한 일렬 수평 정렬) */}
          <nav className="hidden xl:flex items-center justify-center gap-0.5 lg:gap-1 xl:gap-1.5 flex-1 min-w-0 mx-auto">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-2 lg:px-2.5 xl:px-3 py-2 rounded-xl text-[13px] lg:text-sm xl:text-[15px] font-bold transition-all whitespace-nowrap leading-none flex items-center justify-center ${
                  activeTab === item.id
                    ? 'text-yaho-navy-900 bg-yaho-navy-50 font-extrabold shadow-2xs'
                    : 'text-slate-600 hover:text-yaho-navy-900 hover:bg-slate-100/70'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* 우측 CTA 버튼 */}
          <div className="hidden lg:flex items-center gap-2.5 xl:gap-3 flex-shrink-0">
            <a
              href={`tel:${COMPANY_INFO.tel}`}
              className="hidden items-center gap-1.5 px-3 py-2 rounded-lg text-slate-700 hover:text-yaho-navy-900 hover:bg-slate-100 text-sm font-bold transition-colors whitespace-nowrap"
            >
              <Phone className="w-4 h-4 text-yaho-navy-800 flex-shrink-0" />
              <span>{COMPANY_INFO.tel}</span>
            </a>
            <button
              onClick={() => {
                setActiveTab('inquiry');
                onOpenInquiry();
              }}
              className="flex items-center gap-1.5 px-4 xl:px-5 py-2.5 rounded-xl bg-yaho-navy-900 hover:bg-yaho-navy-800 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all whitespace-nowrap flex-shrink-0"
            >
              <span>맞춤 견적 신청</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* 모바일 햄버거 버튼 */}
          <div className="flex xl:hidden items-center gap-2">
            <a
              href={`tel:${COMPANY_INFO.tel}`}
              className="p-2.5 rounded-lg bg-yaho-navy-50 text-yaho-navy-900"
              aria-label="전화 상담"
            >
              <Phone className="w-5 h-5" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-lg text-slate-700 hover:bg-slate-100"
              aria-label="메뉴 열기"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* 모바일 슬라이드 드롭다운 메뉴 */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-6 space-y-2 shadow-xl animate-fadeIn">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left px-4 py-3.5 rounded-xl text-lg font-bold flex items-center justify-between ${
                activeTab === item.id
                  ? 'bg-yaho-navy-50 text-yaho-navy-900'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span>{item.label}</span>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </button>
          ))}
          
          <div className="pt-4 border-t border-slate-100 space-y-2">
            <button
              onClick={() => {
                setActiveTab('inquiry');
                setMobileMenuOpen(false);
              }}
              className="w-full py-3.5 rounded-xl bg-yaho-navy-900 text-white font-bold text-base flex items-center justify-center gap-2 shadow-md"
            >
              <span>온라인 맞춤 견적 신청하기</span>
              <ChevronRight className="w-5 h-5" />
            </button>
            <a
              href={COMPANY_INFO.kakaoChannelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 rounded-xl bg-[#FEE500] text-[#191919] font-bold text-base flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>카카오톡 1:1 상담 바로가기</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
