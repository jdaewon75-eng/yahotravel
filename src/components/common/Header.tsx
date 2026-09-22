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
      <div className="bg-yaho-navy-950 text-slate-200 text-xs sm:text-sm py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <span className="flex items-center gap-1.5 font-medium truncate">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            20년 일본 현지 전문가 밀착 케어 · 4~8인 소규모 프라이빗 & 기업 단체
          </span>
          <div className="hidden sm:flex items-center gap-4 text-xs">
            <a 
              href={`tel:${COMPANY_INFO.tel}`}
              className="flex items-center gap-1 font-semibold text-yaho-gold-300 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{COMPANY_INFO.tel}</span>
            </a>
          </div>
        </div>
      </div>

      {/* 메인 네비게이션 바 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* 로고 영역 */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-xl bg-yaho-navy-900 text-yaho-gold-400 flex items-center justify-center shadow-md group-hover:bg-yaho-navy-800 transition-colors">
              <Compass className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-black tracking-tight text-yaho-navy-950 group-hover:text-yaho-navy-800 transition-colors">
                  야호트래블
                </span>
                <span className="text-xs font-bold tracking-widest text-yaho-gold-600 uppercase">
                  YAHO TRAVEL
                </span>
              </div>
              <span className="text-[11px] text-slate-500 font-medium hidden sm:inline-block">
                일본 프리미엄 프라이빗 & 인센티브 전문
              </span>
            </div>
          </div>

          {/* 데스크톱 메뉴 */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-4 py-2.5 rounded-lg text-[16px] font-bold transition-all ${
                  activeTab === item.id
                    ? 'text-yaho-navy-900 bg-yaho-navy-50 font-extrabold'
                    : 'text-slate-600 hover:text-yaho-navy-900 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* 우측 CTA 버튼 */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`tel:${COMPANY_INFO.tel}`}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg text-slate-700 hover:text-yaho-navy-900 hover:bg-slate-100 text-sm font-bold transition-colors"
            >
              <Phone className="w-4 h-4 text-yaho-navy-800" />
              <span>{COMPANY_INFO.tel}</span>
            </a>
            <button
              onClick={() => {
                setActiveTab('inquiry');
                onOpenInquiry();
              }}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-yaho-navy-900 hover:bg-yaho-navy-800 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all"
            >
              <span>맞춤 견적 신청</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* 모바일 햄버거 버튼 */}
          <div className="flex md:hidden items-center gap-2">
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
        <div className="md:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-6 space-y-2 shadow-xl animate-fadeIn">
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
