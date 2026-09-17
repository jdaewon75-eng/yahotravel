import React from 'react';
import { ShieldCheck, Phone, MapPin, Mail, Clock, CheckCircle2 } from 'lucide-react';
import { COMPANY_INFO } from '../../data/mockData';
import { APP_VERSION, BUILD_TAG } from '../../version';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-14 pb-10 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 상단: 신뢰성 보증 배지 영역 (중장년 & 기업 고객 안심 보증) */}
        <div className="bg-slate-800/80 rounded-2xl p-6 sm:p-8 mb-12 border border-slate-700/60 shadow-inner">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-slate-200">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-yaho-gold-400/10 text-yaho-gold-400 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <div>
                <h4 className="font-bold text-white text-base mb-1">인허가 보증보험 3,000만 원 가입</h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                  관광진흥법 규정에 따라 정식 관광사업 등록 및 한국관광협회 인허가 보증보험 가입으로 안전을 보증합니다.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-400/10 text-emerald-400 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div>
                <h4 className="font-bold text-white text-base mb-1">전 고객 여행자보험 가입 의무화</h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                  KB손해보험 / DB손해보험의 최고 보장 해외여행자 보험을 전 여행객 대상 기본 가입합니다.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-400/10 text-blue-400 flex items-center justify-center flex-shrink-0">
                <Clock className="w-7 h-7" />
              </div>
              <div>
                <h4 className="font-bold text-white text-base mb-1">24시간 현지 비상 대응 체계</h4>
                <p className="text-sm text-slate-400 leading-relaxed">
                  20년 경력의 대표 현지 밀착 동행 및 일본 현지 네트워크·병원·영사관 즉시 연계 시스템을 가동합니다.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 중단: 회사 정보 및 빠른 링크 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-10 border-b border-slate-800">
          
          {/* 회사 브랜딩 & 소개 */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-black text-white tracking-tight">야호트래블</span>
              <span className="text-xs font-bold text-yaho-gold-400 border border-yaho-gold-400/40 px-2 py-0.5 rounded">
                국내외여행업 등록
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-lg leading-relaxed">
              우리가 꿈꾸던 일본, 우리끼리 여유롭게. 20년 일본 현지 베테랑 대표가 직접 기획하고 현지 밀착 동행하는 남부권 최고의 프리미엄 소규모 프라이빗 투어 & 기업 인센티브 전문 여행사입니다.
            </p>
            <div className="pt-2 text-xs text-slate-500 space-y-1">
              <p>상호명: {COMPANY_INFO.name} | 대표자: {COMPANY_INFO.ceo}</p>
              <p>사업자 소재지: {COMPANY_INFO.address}</p>
              <p>보증보험: {COMPANY_INFO.insurance}</p>
            </div>
          </div>

          {/* 고객센터 및 상담 안내 */}
          <div className="lg:col-span-6 space-y-4 bg-slate-800/40 p-6 rounded-2xl border border-slate-700/40">
            <h4 className="text-sm font-bold text-white tracking-wider uppercase">고객상담 및 견적문의</h4>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <a 
                  href={`tel:${COMPANY_INFO.tel}`}
                  className="text-3xl font-black text-yaho-gold-400 hover:text-white transition-colors tracking-tight flex items-center gap-2"
                >
                  <Phone className="w-6 h-6" />
                  <span>{COMPANY_INFO.tel}</span>
                </a>
                <p className="text-xs text-slate-400 mt-1">
                  평일 09:00 ~ 18:00 (주말/공휴일 및 긴급 문의는 카카오톡 상시 접수)
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <span className="inline-flex items-center gap-1.5 text-xs text-slate-300">
                  <MapPin className="w-4 h-4 text-yaho-gold-400" />
                  거제 사무실 방문 상담 환영
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs text-slate-300">
                  <Mail className="w-4 h-4 text-yaho-gold-400" />
                  {COMPANY_INFO.email}
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* 하단 카피라이트 및 버전 정보 */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} YAHO TRAVEL. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-400 cursor-pointer">이용약관</span>
            <span>•</span>
            <span className="hover:text-slate-400 cursor-pointer font-bold text-slate-400">개인정보처리방침</span>
            <span>•</span>
            <span className="text-[11px] text-slate-600">
              v{APP_VERSION} ({BUILD_TAG})
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
