import React from 'react';
import { Users, HeartHandshake, Sparkles, ArrowRight } from 'lucide-react';
import { CORE_SERVICES } from '../../data/mockData';

interface ServiceCardsProps {
  onOpenInquiry: (purpose?: string) => void;
}

export const ServiceCards: React.FC<ServiceCardsProps> = ({ onOpenInquiry }) => {
  const getPurpose = (id: string) => {
    switch (id) {
      case 'private':
        return 'private_family';
      case 'corporate':
        return 'corporate_incentive';
      case 'healing-golf':
        return 'golf_hotspring';
      default:
        return undefined;
    }
  };

  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'private':
        return <Users className="w-5 h-5 text-yaho-navy-900" />;
      case 'corporate':
        return <HeartHandshake className="w-5 h-5 text-yaho-navy-900" />;
      case 'healing-golf':
        return <Sparkles className="w-5 h-5 text-yaho-navy-900" />;
      default:
        return null;
    }
  };

  return (
    <section className="py-20 bg-slate-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
          <div>
            <div className="inline-block px-3 py-1 rounded-full bg-yaho-gold-100 text-yaho-gold-700 text-xs sm:text-sm font-extrabold tracking-wider uppercase mb-2">
              OUR SERVICES
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-yaho-navy-950 tracking-tight">
              야호트래블 주력 맞춤 서비스
            </h2>
          </div>
          <p className="text-slate-600 text-base max-w-md">
            정해진 규격 패키지가 아닌, 고객님의 모임 목적과 인원에 꼭 맞춘 1:1 맞춤형 플랜을 제안합니다.
          </p>
        </div>

        {/* 3대 서비스 카드 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CORE_SERVICES.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              {/* 카드 상단 이미지 */}
              <div className="relative h-60 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                
                {/* 뱃지 */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-white/95 text-yaho-navy-900 text-xs font-bold shadow-md flex items-center gap-1.5 backdrop-blur-sm">
                    {getServiceIcon(service.id)}
                    {service.badge}
                  </span>
                </div>

                {/* 타이틀 및 서브타이틀 */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-xs font-semibold text-yaho-gold-300 uppercase tracking-wide">
                    {service.subtitle}
                  </span>
                  <h3 className="text-2xl font-black tracking-tight drop-shadow-sm">
                    {service.title}
                  </h3>
                </div>
              </div>

              {/* 카드 본문 */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                <p className="text-slate-600 text-base leading-relaxed">
                  {service.desc}
                </p>

                <button
                  onClick={() => onOpenInquiry(getPurpose(service.id))}
                  className="w-full py-3.5 px-4 rounded-xl bg-slate-100 group-hover:bg-yaho-navy-900 group-hover:text-white text-slate-800 font-bold text-sm transition-all flex items-center justify-center gap-2"
                >
                  <span>이 일정으로 맞춤 상담받기</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
