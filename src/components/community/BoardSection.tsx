import React, { useState } from 'react';
import { Bell, ExternalLink, Calendar, ChevronDown, ChevronUp, Search, ShieldCheck } from 'lucide-react';
import { NOTICES, COMPANY_INFO } from '../../data/mockData';

interface BoardSectionProps {
  onOpenInquiry: () => void;
}

export const BoardSection: React.FC<BoardSectionProps> = ({ onOpenInquiry }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>('notice-1');
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  const categories = [
    { id: 'all', label: '전체' },
    { id: '공지', label: '공지사항' },
    { id: '여행안내', label: '여행안내' },
    { id: '입국정보', label: '입국/비자정보' },
  ];

  const filteredNotices = NOTICES.filter((notice) => {
    const matchCategory = selectedCategory === 'all' || notice.category === selectedCategory;
    const matchSearch =
      searchKeyword.trim() === '' ||
      notice.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      notice.content.toLowerCase().includes(searchKeyword.toLowerCase());
    return matchCategory && matchSearch;
  });

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="py-16 sm:py-20 bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* 상단 헤더 */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-block px-3 py-1 rounded-full bg-yaho-navy-100 text-yaho-navy-900 text-xs sm:text-sm font-extrabold tracking-wider uppercase">
            NOTICE & ANNOUNCEMENTS
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-yaho-navy-950 tracking-tight">
            야호트래블 공지사항
          </h1>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            야호트래블의 새로운 소식과 일정 안내, 안전 여행을 위한 필수 정보를 안내해 드립니다.
          </p>
        </div>

        {/* 카테고리 필터 및 검색 바 */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          {/* 카테고리 필터 버튼 */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-yaho-navy-900 text-white shadow-sm'
                    : 'text-slate-600 hover:text-yaho-navy-900 hover:bg-slate-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* 검색창 */}
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="공지 검색..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-yaho-navy-900"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* 공지사항 아코디언 리스트 */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden divide-y divide-slate-100">
          {filteredNotices.length > 0 ? (
            filteredNotices.map((notice) => {
              const isExpanded = expandedId === notice.id;
              return (
                <div key={notice.id} className="transition-colors">
                  <button
                    onClick={() => toggleExpand(notice.id)}
                    className="w-full p-6 text-left flex items-start sm:items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors"
                  >
                    <div className="space-y-1 sm:space-y-0 sm:flex sm:items-center sm:gap-4 flex-1">
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span
                          className={`text-xs font-bold px-2.5 py-0.5 rounded ${
                            notice.isImportant
                              ? 'bg-red-50 text-red-600 border border-red-200 font-extrabold'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {notice.category}
                        </span>
                        <span className="text-xs text-slate-400 sm:hidden">
                          {notice.date}
                        </span>
                      </div>
                      <h3 className="font-bold text-slate-900 text-base sm:text-lg">
                        {notice.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-4 flex-shrink-0">
                      <span className="text-xs text-slate-400 hidden sm:inline-block">
                        {notice.date}
                      </span>
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="px-6 pb-6 pt-2 bg-slate-50/60 animate-fadeIn">
                      <div className="p-6 bg-white rounded-2xl border border-slate-200/80 text-slate-700 text-sm sm:text-base leading-relaxed space-y-4">
                        <p className="whitespace-pre-line">{notice.content}</p>
                        
                        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
                          <span className="flex items-center gap-1">
                            <ShieldCheck className="w-4 h-4 text-emerald-600" />
                            야호트래블 대표 직접 안내
                          </span>
                          <button
                            onClick={onOpenInquiry}
                            className="font-bold text-yaho-navy-900 hover:underline"
                          >
                            맞춤 여행 견적 문의하기 →
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="py-16 text-center text-slate-400 space-y-2">
              <Bell className="w-8 h-8 mx-auto text-slate-300" />
              <p className="text-base font-medium">검색된 공지사항이 없습니다.</p>
            </div>
          )}
        </div>

        {/* 네이버 공식 블로그 연동 배너 */}
        <div className="bg-emerald-50 rounded-3xl p-8 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <span className="text-xs font-extrabold text-emerald-800 uppercase tracking-wide">
              NAVER OFFICIAL BLOG
            </span>
            <h4 className="text-2xl font-black text-emerald-950">
              야호트래블 네이버 공식 블로그에서 더 많은 소식을 만나보세요!
            </h4>
            <p className="text-emerald-800 text-sm">
              도고온천 전통 료칸 실물 사진, 마쓰야마 골프장 라운딩 현장, 홋카이도 답사 사진이 공식 블로그에 수시로 업데이트됩니다.
            </p>
          </div>
          <a
            href={COMPANY_INFO.naverBlogUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-xl bg-[#03C75A] hover:bg-[#02b351] text-white font-bold text-sm shadow-md transition-all flex items-center gap-2 flex-shrink-0"
          >
            <span>네이버 블로그 방문하기</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

      </div>
    </div>
  );
};
