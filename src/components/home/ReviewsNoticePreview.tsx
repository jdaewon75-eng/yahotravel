import React from 'react';
import { Bell, ArrowRight, Shield, Calendar, ExternalLink, ThumbsUp } from 'lucide-react';
import { NOTICES, COMPANY_INFO } from '../../data/mockData';

interface ReviewsNoticePreviewProps {
  onViewBoard: () => void;
  onOpenInquiry: () => void;
}

export const ReviewsNoticePreview: React.FC<ReviewsNoticePreviewProps> = ({ onViewBoard, onOpenInquiry }) => {
  return (
    <section className="py-20 bg-slate-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* 좌측: 공지사항 & 여행 안내 목록 (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200/80 pb-4">
              <div>
                <span className="text-xs font-extrabold text-yaho-gold-600 uppercase tracking-wider block mb-1">
                  YAHO NOTICE & NEWS
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-yaho-navy-950">
                  야호트래블 공지사항 & 여행 안내
                </h3>
              </div>
              <button
                onClick={onViewBoard}
                className="text-xs sm:text-sm font-bold text-yaho-navy-800 hover:text-yaho-navy-950 flex items-center gap-1"
              >
                <span>전체보기</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3.5">
              {NOTICES.slice(0, 4).map((notice) => (
                <div
                  key={notice.id}
                  onClick={onViewBoard}
                  className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-yaho-navy-200 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded ${
                      notice.isImportant ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {notice.category}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {notice.date}
                    </span>
                  </div>

                  <h4 className="font-bold text-slate-900 text-base group-hover:text-yaho-navy-900 transition-colors line-clamp-1 mb-1">
                    {notice.title}
                  </h4>
                  <p className="text-slate-600 text-sm leading-relaxed line-clamp-2">
                    {notice.content}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 우측: 기업/VIP 단체 콜아웃 & 네이버 공식 블로그 안내 (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* 거제·남부권 기업/VIP 단체 상담 콜아웃 */}
            <div className="bg-gradient-to-br from-yaho-navy-950 to-yaho-navy-900 text-white p-7 sm:p-8 rounded-3xl shadow-xl space-y-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-36 h-36 bg-yaho-gold-400/10 rounded-full blur-2xl" />
              
              <div className="relative z-10 space-y-3">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-yaho-gold-400">
                  <Shield className="w-6 h-6" />
                </div>
                <h4 className="text-xl sm:text-2xl font-black tracking-tight leading-snug">
                  거제 조선소 협력사 & 기업체<br />맞춤 단체 제안서 무료 발송
                </h4>
                <p className="text-slate-300 text-sm leading-relaxed">
                  예산과 일정만 알려주시면, 20년 현지 네트워크를 바탕으로 최적의 일정표와 견적서를 작성해 전달드립니다.
                </p>
              </div>

              <div className="relative z-10 pt-2">
                <button
                  onClick={onOpenInquiry}
                  className="w-full py-3.5 px-4 rounded-xl bg-yaho-gold-400 hover:bg-yaho-gold-500 text-yaho-navy-950 font-black text-sm transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  <ThumbsUp className="w-4 h-4" />
                  <span>맞춤 단체 제안서 요청하기</span>
                </button>
              </div>
            </div>

            {/* 네이버 공식 블로그 배너 */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-emerald-600">
                <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                <span className="text-xs font-bold uppercase tracking-wider">OFFICIAL SNS</span>
              </div>
              <h4 className="font-bold text-slate-900 text-base">
                야호트래블 네이버 공식 블로그
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                마쓰야마 온천 료칸, 규슈 명문 골프장 및 홋카이도 현지 답사 사진과 최신 생생한 일본 소식을 확인해 보세요.
              </p>
              <a
                href={COMPANY_INFO.naverBlogUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 pt-1"
              >
                <span>블로그 바로가기</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
