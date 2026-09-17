import React, { useState } from 'react';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { FloatingKakao } from './components/common/FloatingKakao';
import { HeroSlider } from './components/home/HeroSlider';
import { CoreStrengths } from './components/home/CoreStrengths';
import { ServiceCards } from './components/home/ServiceCards';
import { FeaturedTours } from './components/home/FeaturedTours';
import { ReviewsNoticePreview } from './components/home/ReviewsNoticePreview';
import { AboutSection } from './components/about/AboutSection';
import { TourList } from './components/tours/TourList';
import { TourDetailModal } from './components/tours/TourDetailModal';
import { InquiryForm } from './components/inquiry/InquiryForm';
import { BoardSection } from './components/community/BoardSection';
import { TourPackage } from './types';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedTour, setSelectedTour] = useState<TourPackage | null>(null);
  const [inquiryInitialPurpose, setInquiryInitialPurpose] = useState<string | undefined>(undefined);
  const [inquiryInitialTourTitle, setInquiryInitialTourTitle] = useState<string | undefined>(undefined);

  // 견적 문의 탭으로 이동 헬퍼
  const handleOpenInquiry = (purpose?: string) => {
    setInquiryInitialPurpose(purpose);
    setInquiryInitialTourTitle(undefined);
    setActiveTab('inquiry');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 특정 투어를 지정하여 견적 문의로 이동
  const handleInquiryWithTour = (tourTitle: string) => {
    setInquiryInitialTourTitle(tourTitle);
    setInquiryInitialPurpose(undefined);
    setActiveTab('inquiry');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf9f6] text-slate-800">
      {/* 고정 상단 헤더 */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenInquiry={handleOpenInquiry}
      />

      {/* 메인 콘텐츠 바디 */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <>
            {/* 1. 메인 비주얼 히어로 슬라이더 */}
            <HeroSlider
              onOpenInquiry={handleOpenInquiry}
              onExploreTours={() => {
                setActiveTab('tours');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* 2. 3대 핵심 강점 (20년 현지 전문가 / 로컬 스토리텔링 / 직계약 인프라) */}
            <CoreStrengths />

            {/* 3. 주요 서비스 소개 카드 3종 (소규모 프라이빗 / 기업 인센티브 / 힐링 골프온천) */}
            <ServiceCards onOpenInquiry={handleOpenInquiry} />

            {/* 4. 대표 상품 샘플 코스 미리보기 (마쓰야마 2박3일 등) */}
            <FeaturedTours
              onSelectTour={setSelectedTour}
              onInquiryWithTour={handleInquiryWithTour}
              onViewAll={() => {
                setActiveTab('tours');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* 5. 고객 생생 후기 & 최근 공지사항 & 기업 제안서 콜아웃 */}
            <ReviewsNoticePreview
              onViewBoard={() => {
                setActiveTab('board');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenInquiry={() => handleOpenInquiry('corporate_incentive')}
            />
          </>
        )}

        {activeTab === 'tours' && (
          <TourList
            onSelectTour={setSelectedTour}
            onInquiryWithTour={handleInquiryWithTour}
            onOpenCustomInquiry={() => handleOpenInquiry('custom')}
          />
        )}

        {activeTab === 'about' && <AboutSection />}

        {activeTab === 'inquiry' && (
          <InquiryForm
            initialPurpose={inquiryInitialPurpose}
            initialTourTitle={inquiryInitialTourTitle}
          />
        )}

        {activeTab === 'board' && (
          <BoardSection onOpenInquiry={() => handleOpenInquiry()} />
        )}
      </main>

      {/* 투어 상세 일정표 모달 */}
      <TourDetailModal
        tour={selectedTour}
        onClose={() => setSelectedTour(null)}
        onInquiry={handleInquiryWithTour}
      />

      {/* 우측 하단 카카오톡 1:1 상담 & 빠른 전화 플로팅 버튼 */}
      <FloatingKakao />

      {/* 신뢰성 보증 푸터 */}
      <Footer />
    </div>
  );
};

export default App;
