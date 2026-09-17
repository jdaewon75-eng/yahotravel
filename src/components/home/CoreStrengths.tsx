import React from 'react';
import { Compass, ShieldCheck, Handshake, CheckCircle, MapPin } from 'lucide-react';
import { CORE_STRENGTHS } from '../../data/mockData';

export const CoreStrengths: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Compass':
        return <Compass className="w-8 h-8 text-yaho-gold-400 stroke-[2.2]" />;
      case 'MapPin':
        return <MapPin className="w-8 h-8 text-emerald-400 stroke-[2.2]" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-8 h-8 text-emerald-400 stroke-[2.2]" />;
      case 'Handshake':
        return <Handshake className="w-8 h-8 text-blue-400 stroke-[2.2]" />;
      default:
        return <CheckCircle className="w-8 h-8 text-yaho-gold-400" />;
    }
  };

  return (
    <section className="py-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 섹션 타이틀 */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-block px-3 py-1 rounded-full bg-yaho-navy-50 text-yaho-navy-800 text-xs sm:text-sm font-extrabold tracking-wider uppercase">
            WHY YAHO TRAVEL
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-yaho-navy-950 tracking-tight">
            왜 야호트래블을 선택해야 할까요?
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            여행 상품만 중개하는 일반 대리점이 아닙니다. 
            20년 현지 경력의 대표가 직접 기획하고 전용 차량으로 안전하게 안내합니다.
          </p>
        </div>

        {/* 3대 핵심 강점 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CORE_STRENGTHS.map((strength) => (
            <div
              key={strength.id}
              className="relative p-8 rounded-2xl bg-gradient-to-b from-white to-slate-50 border border-slate-200/80 hover:border-yaho-navy-300 card-hover-shadow group"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-16 h-16 rounded-2xl bg-yaho-navy-950 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                  {getIcon(strength.icon)}
                </div>
                <span className="text-4xl font-black text-slate-200 group-hover:text-yaho-gold-200 transition-colors">
                  {strength.number}
                </span>
              </div>

              <span className="text-xs font-bold text-yaho-gold-600 tracking-wide uppercase block mb-1.5">
                {strength.subtitle}
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-yaho-navy-950 mb-3 group-hover:text-yaho-navy-800 transition-colors">
                {strength.title}
              </h3>
              <p className="text-slate-600 text-base leading-relaxed">
                {strength.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
