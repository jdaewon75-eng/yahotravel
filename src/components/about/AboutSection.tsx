import React from 'react';
import { Compass, ShieldCheck, Award, MapPin, Phone, Car, Building, Users, Clock, CheckCircle2 } from 'lucide-react';
import { COMPANY_INFO } from '../../data/mockData';

export const AboutSection: React.FC = () => {
  return (
    <div className="py-16 sm:py-24 bg-[#faf9f6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* 상단 타이틀 */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-block px-3 py-1 rounded-full bg-yaho-navy-100 text-yaho-navy-900 text-xs sm:text-sm font-extrabold tracking-wider uppercase">
            ABOUT YAHO TRAVEL
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-yaho-navy-950 tracking-tight">
            "믿을 수 있는 현지 전문가와<br className="hidden sm:inline" /> 떠나는 품격 있는 일본 여행"
          </h1>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            야호트래블은 경남 거제에 본사를 두고, 거제 및 남부권 고객님들께 가장 정직하고 안전한 일본 소규모 프라이빗 여행과 기업 인센티브 투어를 선사합니다.
          </p>
        </div>

        {/* 대표 인사말 및 이력 소개 */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 space-y-6">
            {/* 대표 프로필 카드 (실제 사진 등록 지원 및 품격 있는 인증 디자인) */}
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-yaho-navy-800 bg-gradient-to-b from-yaho-navy-950 via-yaho-navy-900 to-slate-900 text-white p-8 flex flex-col justify-between min-h-[420px]">
              <div className="absolute top-0 right-0 w-48 h-48 bg-yaho-gold-400/10 rounded-full blur-3xl pointer-events-none" />
              
              {/* 상단 엠블럼 & 인증 마크 */}
              <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-yaho-gold-400/20 border border-yaho-gold-400/40 text-yaho-gold-400 flex items-center justify-center shadow-inner">
                    <Compass className="w-6 h-6 stroke-[2.5]" />
                  </div>
                  <div>
                    <span className="text-[11px] font-extrabold tracking-widest text-yaho-gold-400 uppercase block">
                      OFFICIAL PROFILE
                    </span>
                    <span className="text-xs text-slate-300 font-medium">야호트래블 대표 / 총괄 투어 디렉터</span>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  현지 20년 공인
                </span>
              </div>

              {/* 중단 대표자 성함 및 직함 */}
              <div className="relative z-10 my-8 space-y-2">
                <span className="text-xs font-bold text-slate-400 tracking-wider uppercase">
                  FOUNDER & CHIEF TOUR DIRECTOR
                </span>
                <h3 className="text-3xl sm:text-4xl font-black tracking-tight text-white flex items-baseline gap-2">
                  <span>진 대 원</span>
                  <span className="text-base font-normal text-slate-400">Jin Dae-won</span>
                </h3>
                <p className="text-sm text-yaho-gold-300 font-semibold pt-1">
                  일본 현지 20년 여행사 운영 및 VIP 특화 투어 총괄 기획·동행
                </p>
              </div>

              {/* 하단 핵심 역량 3대 인증 뱃지 */}
              <div className="relative z-10 pt-4 border-t border-white/10 space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>일본 현지 20년 여행업 공인 노하우 & 네트워크</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>마쓰야마·후쿠오카·삿포로 료칸 & 골프장 직계약 네트워크</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>전 일정 단독 전용 차량 배차 및 1:1 현장 밀착 케어</span>
                </div>
              </div>
            </div>

            {/* 대표 전문 경력 및 역량 뱃지 */}
            <div className="bg-yaho-navy-50 p-5 rounded-2xl border border-yaho-navy-100 space-y-2">
              <span className="text-xs font-extrabold text-yaho-navy-900 uppercase tracking-wider block">
                SPECIAL CAREER & EXPERTISE
              </span>
              <ul className="text-xs sm:text-sm text-slate-700 space-y-1.5 font-medium">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>20년간 일본 현지 여행사 직접 운영 및 전문 기획</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>일본 현지 도로 및 최적 이동 동선 완벽 숙지</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>수많은 기업 VIP 및 소규모 맞춤 투어 총괄 경력</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold text-yaho-gold-600 uppercase tracking-wider">
              CEO GREETING
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-yaho-navy-950 leading-snug">
              "패키지의 피로감과 자유여행의 막막함,<br className="hidden sm:inline" />
              야호트래블이 완벽한 해답이 되어 드립니다."
            </h2>
            
            <div className="space-y-4 text-slate-700 text-base sm:text-lg leading-relaxed">
              <p>
                안녕하십니까, 야호트래블 대표 진대원입니다.
              </p>
              <p>
                일본 현지에서 20년 넘게 여행업에 몸담으며 수많은 한국 고객님들을 안내해 왔습니다. 
                모르는 사람들과 빽빽하게 버스에 타서 쇼핑센터를 의무적으로 돌아야 하는 저가 패키지 여행, 
                반대로 부모님이나 가족을 모시고 대중교통과 언어의 벽에 부딪혀 고생하는 자유여행을 보며 늘 안타까웠습니다.
              </p>
              <p>
                야호트래블은 <strong>'내 가족이 떠나는 여행'</strong>이라는 마음 하나로 탄생했습니다. 
                우리의 오랜 숙련된 현지 직계약 네트워크와 검증된 전용 차량 인프라를 바탕으로, 
                안전하고 품격 있는 단독 전용 차량과 온천 료칸, 숨겨진 로컬 맛집까지 오롯이 우리 일행만을 위한 여정을 선물합니다.
              </p>
              <p className="font-bold text-yaho-navy-900">
                거제와 남부권 고객님들의 가장 든든한 일본 여행 파트너로서 끝까지 책임지고 함께하겠습니다.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500">야호트래블 대표이사</span>
                <p className="text-lg font-black text-slate-900">진 대 원 배상</p>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-500">상담 직통</span>
                <p className="text-lg font-black text-yaho-navy-900">{COMPANY_INFO.tel}</p>
              </div>
            </div>
          </div>
        </div>

        {/* 야호트래블만의 4대 핵심 역량 그리드 */}
        <div className="space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="text-2xl sm:text-3xl font-black text-yaho-navy-950">
              야호트래블이 특별한 4가지 이유
            </h3>
            <p className="text-slate-600 text-sm sm:text-base">
              사업계획서에 명시된 원칙과 현지 실행력을 바탕으로 타사와 차별화된 서비스를 약속합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Car className="w-6 h-6" />
              </div>
              <h4 className="font-black text-lg text-slate-900">단독 전용 차량 안전 이동</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                검증된 현지 전용 차량 네트워크와 최적의 이동 동선 설계를 통해, 번잡함 없는 가장 편안하고 안전한 여행을 보장합니다.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Building className="w-6 h-6" />
              </div>
              <h4 className="font-black text-lg text-slate-900">현지 직계약 인프라</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                마쓰야마, 삿포로, 규슈 지역 고급 료칸과 명문 골프장의 직접 계약을 통해 중간 수수료 없는 정직한 투어를 진행합니다.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="font-black text-lg text-slate-900">3천만원 보증보험 가입</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                관광사업 등록 및 인허가 보증보험 3,000만원 가입, 전 고객 KB/DB 여행자보험을 필수로 체결하여 완벽한 신뢰를 보증합니다.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                <Clock className="w-6 h-6" />
              </div>
              <h4 className="font-black text-lg text-slate-900">24시간 비상 대응 체계</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                현지 병원, 통역 네트워크 및 영사관 비상 핫라인을 가동하여 예기치 못한 비상 상황에도 즉각적인 대처가 가능합니다.
              </p>
            </div>
          </div>
        </div>

        {/* 오시는 길 (거제 본사 안내) */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-lg space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <div>
              <span className="text-xs font-bold text-yaho-gold-600 uppercase tracking-wider block mb-1">
                LOCATION & VISITING
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-yaho-navy-950">
                야호트래블 오시는 길
              </h3>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={`tel:${COMPANY_INFO.tel}`}
                className="px-5 py-2.5 rounded-xl bg-yaho-navy-900 text-white font-bold text-sm shadow-sm hover:bg-yaho-navy-800 transition-colors flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>방문 상담 예약 ({COMPANY_INFO.tel})</span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* 사무실 정보 요약 */}
            <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-start gap-3.5">
                  <MapPin className="w-5 h-5 text-yaho-navy-900 flex-shrink-0 mt-1" />
                  <div>
                    <h5 className="font-bold text-slate-900 text-base">소재지 주소</h5>
                    <p className="text-sm text-slate-600 mt-0.5">{COMPANY_INFO.address}</p>
                    <p className="text-xs text-slate-400 mt-1">(고현동 삼덕빌딩 5층 502호 / 근린생활 업무시설)</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Phone className="w-5 h-5 text-yaho-navy-900 flex-shrink-0 mt-1" />
                  <div>
                    <h5 className="font-bold text-slate-900 text-base">대표 전화</h5>
                    <p className="text-sm text-slate-600 mt-0.5">{COMPANY_INFO.tel}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Clock className="w-5 h-5 text-yaho-navy-900 flex-shrink-0 mt-1" />
                  <div>
                    <h5 className="font-bold text-slate-900 text-base">방문 상담 가능 시간</h5>
                    <p className="text-sm text-slate-600 mt-0.5">평일 09:30 ~ 17:30 (방문 전 사전 전화 예약 권장)</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-500 space-y-1">
                <p>• 건물 내 주차 공간 완비</p>
                <p>• 소규모 모임 및 기업체 출장 미팅/방문 상담도 가능합니다.</p>
              </div>
            </div>

            {/* 지도 뷰어 (인터랙티브 안내 카드) */}
            <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 min-h-[300px] flex flex-col items-center justify-center p-8 text-center relative group">
              <div className="max-w-md space-y-3">
                <div className="w-14 h-14 rounded-full bg-yaho-navy-900 text-yaho-gold-400 flex items-center justify-center mx-auto shadow-md">
                  <MapPin className="w-7 h-7" />
                </div>
                <h4 className="font-black text-slate-900 text-lg">경남 거제시 고현동 삼덕빌딩 502호</h4>
                <p className="text-slate-500 text-xs leading-relaxed">
                  고현 중심가에 위치하여 거제 전역에서 편리하게 방문하실 수 있습니다.
                </p>
                <div className="pt-2 flex flex-wrap justify-center gap-2">
                  <a
                    href="https://map.kakao.com/link/search/경상남도 거제시 고현로 11길 24"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-[#FEE500] text-[#191919] font-bold text-xs rounded-lg shadow-sm hover:opacity-95 transition-opacity"
                  >
                    카카오맵으로 길찾기
                  </a>
                  <a
                    href="https://map.naver.com/v5/search/경상남도 거제시 고현로 11길 24"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-[#03C75A] text-white font-bold text-xs rounded-lg shadow-sm hover:opacity-95 transition-opacity"
                  >
                    네이버지도로 길찾기
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
