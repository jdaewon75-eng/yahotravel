import React, { useState } from 'react';
import { Flag, Plane, Clock, Car, Bath, Check, X, ArrowRight, Phone, MessageCircle, Star, BedDouble } from 'lucide-react';
import { COMPANY_INFO } from '../../data/mockData';
import suonadaPond from '../../assets/images/golf-yukuhashi/suonada1.jpg';
import suonadaClub from '../../assets/images/golf-yukuhashi/suonada2.jpg';
import miyakoImg from '../../assets/images/golf-yukuhashi/miyako1.jpg';
import katsuyamaImg from '../../assets/images/golf-yukuhashi/katsuyama1.jpg';
import abRoom from '../../assets/images/golf-yukuhashi/ab_room.jpg';
import abBath from '../../assets/images/golf-yukuhashi/ab_bath.jpg';
import abDining from '../../assets/images/golf-yukuhashi/ab_dining.jpg';
import riRoom from '../../assets/images/golf-yukuhashi/ri_room.jpg';
import riBath from '../../assets/images/golf-yukuhashi/ri_bath.jpg';
import riDining from '../../assets/images/golf-yukuhashi/ri_dining.jpg';

// 골프 추천코스: 북큐슈 유쿠하시 3색 골프 (후쿠오카 인·아웃)
// ※ 요금은 1인 · 4인 1조 · 항공권 불포함 · 환율 100엔=890원 기준 (2026.10.01 ~ 2027.03.31 출발)

interface PriceRow {
  price: string;
  typeA: string;
  typeB: string;
}

interface PlanDay {
  day: string;
  text: string;
}

interface Plan {
  id: string;
  label: string;
  holes: string;
  basePrice: string;
  fullGolfLabel: string;
  fullGolfPrice: string;
  rows: PriceRow[];
  extra3: string;
  extra2: string;
  typeA: PlanDay[];
  typeB: PlanDay[];
  hotelNights: string;
}

const PLANS: Plan[] = [
  {
    id: '2n3d',
    label: '2박 3일',
    holes: '36홀',
    basePrice: '717,000',
    fullGolfLabel: '3일 모두 골프 (54홀)',
    fullGolfPrice: '851,000',
    rows: [
      { price: '717,000원', typeA: '일 · 월 · 화 · 수', typeB: '월 · 화 · 수 · 목' },
      { price: '770,000원', typeA: '토', typeB: '일' },
      { price: '779,000원', typeA: '목', typeB: '금' },
      { price: '824,000원', typeA: '금', typeB: '토' },
    ],
    extra3: '+89,000원',
    extra2: '+285,000원',
    typeA: [
      { day: '1일차', text: '후쿠오카 공항 도착 → 호텔 이동 (약 90분) · 체크인 · 대욕장' },
      { day: '2일차', text: '조식 → 골프장 (15~20분) → 18홀 라운드 → 호텔' },
      { day: '3일차', text: '체크아웃 → 18홀 라운드 → 후쿠오카 공항 (약 90분) → 귀국' },
    ],
    typeB: [
      { day: '1일차', text: '오전 도착 → 골프장 직행 (약 90분) → 오후 18홀 (일몰까지) → 호텔' },
      { day: '2일차', text: '조식 → 골프장 (15~20분) → 18홀 라운드 → 호텔' },
      { day: '3일차', text: '조식 · 체크아웃 → 후쿠오카 공항 (약 90분) → 귀국' },
    ],
    hotelNights: '호텔 2박',
  },
  {
    id: '3n4d',
    label: '3박 4일',
    holes: '54홀',
    basePrice: '917,000',
    fullGolfLabel: '4일 모두 골프 (72홀)',
    fullGolfPrice: '1,051,000',
    rows: [
      { price: '917,000원', typeA: '일 · 월 · 화', typeB: '월 · 화 · 수' },
      { price: '979,000원', typeA: '수', typeB: '목' },
      { price: '984,000원', typeA: '토', typeB: '일' },
      { price: '1,033,000원', typeA: '목 · 금', typeB: '금 · 토' },
    ],
    extra3: '+143,000원',
    extra2: '+330,000원',
    typeA: [
      { day: '1일차', text: '후쿠오카 공항 도착 → 호텔 이동 (약 90분) · 체크인 · 대욕장' },
      { day: '2·3일차', text: '조식 → 골프장 (15~20분) → 18홀 라운드 → 호텔' },
      { day: '4일차', text: '체크아웃 → 18홀 라운드 → 후쿠오카 공항 (약 90분) → 귀국' },
    ],
    typeB: [
      { day: '1일차', text: '오전 도착 → 골프장 직행 (약 90분) → 오후 18홀 (일몰까지) → 호텔' },
      { day: '2·3일차', text: '조식 → 골프장 (15~20분) → 18홀 라운드 → 호텔' },
      { day: '4일차', text: '조식 · 체크아웃 → 후쿠오카 공항 (약 90분) → 귀국' },
    ],
    hotelNights: '호텔 3박',
  },
];

const APPEAL_POINTS = [
  { icon: <Plane className="w-6 h-6" />, title: '비행 1시간, 첫날부터 라운드', text: '김해 07:30 출발 · 후쿠오카 08:30 도착. 도착 당일 오후에 바로 18홀.' },
  { icon: <Flag className="w-6 h-6" />, title: '명문 코스 3곳을 매일 다르게', text: '미야코 · 스오나다 · 카츠야마고쇼. 세계 톱 선수들이 뛴 챔피언 코스 포함.' },
  { icon: <Car className="w-6 h-6" />, title: '호텔 ↔ 골프장 15~20분', text: '이동은 짧게, 라운드는 여유 있게. 공항·골프장·호텔 송영 포함.' },
  { icon: <Bath className="w-6 h-6" />, title: '라운드 후엔 대욕장으로', text: '남녀 대욕장이 있는 호텔 · 조식 뷔페 포함. 54홀·72홀까지 가능.' },
];

const COURSES = [
  {
    name: '스오나다 CC',
    jp: '周防灘カントリークラブ',
    tag: '챔피언 코스',
    image: suonadaClub,
    text: '1988·89년 월드 슈퍼매치 개최지. 톰 왓슨, 닉 팔도, 세베 바예스테로스가 뛴 코스. 바다 위를 치는 듯한 개방감.',
  },
  {
    name: '미야코 CC',
    jp: 'みやこカントリークラブ',
    tag: '전망 구릉 코스',
    image: miyakoImg,
    text: '교토평야와 스오나다 바다를 한눈에. 대나무 숲과 일본 정원 사이로 이어지는 전략형 코스.',
  },
  {
    name: '카츠야마고쇼 CC',
    jp: '勝山御所カントリークラブ',
    tag: '연못 · 소나무 숲',
    image: katsuyamaImg,
    text: '소나무 숲과 7개의 연못이 어우러진 평탄한 코스. 넓은 금잔디 그린으로 공략의 재미.',
  },
];

const HOTELS = [
  {
    name: 'AB호텔 유쿠하시',
    jp: 'ABホテル行橋',
    images: [abRoom, abBath, abDining],
    points: ['JR 유쿠하시역 도보 1분', '방음 객실, 숙면 침대와 깃털 베개', '남녀 대욕장 16:00–01:00 / 5:00–9:00', '일식·양식 무료 조식'],
  },
  {
    name: '호텔 루트인 유쿠하시',
    jp: 'ホテルルートイン行橋',
    images: [riRoom, riBath, riDining],
    points: ['이자카야·야키니쿠 먹자골목 인근', '전 객실 WOWOW 무료 시청', '남녀 대욕장 15:00–02:00 / 5:00–10:00', '30여 종 일식·양식 조식 뷔페'],
  },
];

interface GolfRecommendedProps {
  onInquiryWithTour: (tourTitle: string) => void;
}

export const GolfRecommended: React.FC<GolfRecommendedProps> = ({ onInquiryWithTour }) => {
  const [planId, setPlanId] = useState<string>(PLANS[0].id);
  const plan = PLANS.find((p) => p.id === planId) || PLANS[0];
  const inquiryTitle = `[골프 추천코스] 북큐슈 유쿠하시 3색 골프 ${plan.label}`;

  const includes = [
    `${plan.hotelNights} (2인 1실 · 조식 포함) · 대욕장`,
    '그린피 · 카트피 · 락카피',
    '공항 ↔ 골프장 ↔ 호텔 송영차량',
  ];
  const excludes = ['왕복 항공권', '골프장 중식 · 석식 · 개인 경비', '캐디 (노캐디 셀프 라운드)', '가이드 (가이드 미동행 상품)'];

  return (
    <section id="golf-recommend" className="py-20 bg-yaho-warm-50 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* 섹션 헤더 */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-yaho-gold-100/90 text-yaho-navy-950 text-xs sm:text-sm font-extrabold tracking-wide uppercase mb-3 shadow-sm border border-yaho-gold-200">
            <Star className="w-4 h-4 text-yaho-gold-600" />
            <span>RECOMMENDED GOLF</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-yaho-navy-950 tracking-tight">
            골프 추천코스
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mt-3 leading-relaxed">
            김해에서 1시간, 매일 다른 코스로 즐기는 <strong>북큐슈 유쿠하시 3색 골프</strong>.<br className="hidden sm:inline" />
            합리적인 요금으로 36홀부터 72홀까지 원하는 만큼 라운드하세요.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">

          {/* 히어로 */}
          <div className="relative min-h-[340px] sm:min-h-[400px] flex items-end">
            <img src={suonadaPond} alt="스오나다 CC 코스 전경" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-yaho-navy-950 via-yaho-navy-950/60 to-transparent" />
            <div className="relative z-10 w-full p-6 sm:p-8 md:p-10 text-white flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-yaho-gold-400 text-yaho-navy-950 text-xs font-black shadow-sm mb-3">
                  ⛳ 후쿠오카 인·아웃 · 2026.10 – 2027.03 출발
                </span>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight">북큐슈 유쿠하시 3색 골프</h3>
                <p className="mt-1 text-sm sm:text-base text-slate-200 font-semibold">北九州・行橋ゴルフ | 셀프 라운드 · 대욕장 호텔 · 송영 포함</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {[
                    { icon: <Plane className="w-3.5 h-3.5 text-yaho-gold-300" />, text: '김해 ↔ 후쿠오카 직항 (약 1시간)' },
                    { icon: <Clock className="w-3.5 h-3.5 text-yaho-gold-300" />, text: '2박 3일 · 3박 4일' },
                    { icon: <Flag className="w-3.5 h-3.5 text-yaho-gold-300" />, text: '36홀 ~ 72홀' },
                  ].map((chip, i) => (
                    <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-slate-100 text-xs font-bold border border-white/10">
                      {chip.icon}
                      <span>{chip.text}</span>
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex-shrink-0 flex flex-col gap-2.5">
                <button
                  onClick={() => onInquiryWithTour(inquiryTitle)}
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-yaho-gold-400 to-yaho-gold-500 hover:from-yaho-gold-300 hover:to-yaho-gold-400 text-yaho-navy-950 font-black text-sm sm:text-base shadow-lg transition-all flex items-center justify-center gap-2 touch-target"
                >
                  <span>골프 추천코스 견적 문의</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <div className="flex items-center justify-center gap-3 text-xs text-slate-300">
                  <a href={`tel:${COMPANY_INFO.tel}`} className="flex items-center gap-1 hover:text-white transition-colors">
                    <Phone className="w-3.5 h-3.5 text-yaho-gold-300" />
                    <span>전화 상담</span>
                  </a>
                  <span>·</span>
                  <a href={COMPANY_INFO.kakaoChannelUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[#FEE500] hover:underline">
                    <MessageCircle className="w-3.5 h-3.5 fill-current" />
                    <span>카톡 상담</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* 어필 포인트 4가지 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6 sm:p-8 bg-slate-50 border-b border-slate-200">
            {APPEAL_POINTS.map((p, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col gap-2">
                <div className="w-11 h-11 rounded-full bg-yaho-navy-900 text-yaho-gold-400 flex items-center justify-center">{p.icon}</div>
                <div className="text-base sm:text-lg font-black text-yaho-navy-950 leading-snug">{p.title}</div>
                <p className="text-sm text-slate-600 leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>

          <div className="p-6 sm:p-8 lg:p-10 space-y-12">

            {/* 요금 */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-5">
                <h4 className="text-xl sm:text-2xl font-black text-yaho-navy-950">요금 안내 <span className="text-sm font-semibold text-slate-500">(1인 · 4인 1조 · 항공권 불포함)</span></h4>
                <div className="inline-flex rounded-xl bg-slate-100 p-1 self-start">
                  {PLANS.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setPlanId(p.id)}
                      className={`px-5 py-2.5 rounded-lg text-sm sm:text-base font-extrabold transition-all touch-target ${
                        p.id === planId ? 'bg-yaho-navy-900 text-white shadow' : 'text-slate-600 hover:text-yaho-navy-900'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="rounded-2xl border-2 border-yaho-navy-900 p-5 sm:p-6">
                  <div className="text-sm font-bold text-yaho-gold-600">{plan.label} · 골프 {plan.holes}</div>
                  <div className="flex items-baseline gap-1.5 mt-1">
                    <span className="text-base">1인</span>
                    <span className="text-4xl sm:text-5xl font-black text-yaho-navy-950 tracking-tight">{plan.basePrice}</span>
                    <span className="text-xl font-bold">원~</span>
                  </div>
                  <div className="text-sm text-slate-500 mt-1">4인 1조 · 평일 출발 기준</div>
                </div>
                <div className="rounded-2xl border-2 border-yaho-gold-500 bg-yaho-gold-50 p-5 sm:p-6">
                  <div className="text-sm font-bold text-yaho-gold-600">{plan.label} · {plan.fullGolfLabel}</div>
                  <div className="flex items-baseline gap-1.5 mt-1">
                    <span className="text-base">1인</span>
                    <span className="text-4xl sm:text-5xl font-black text-yaho-navy-950 tracking-tight">{plan.fullGolfPrice}</span>
                    <span className="text-xl font-bold">원~</span>
                  </div>
                  <div className="text-sm text-slate-500 mt-1">4인 1조 · 평일 출발 · 오전 도착 / 저녁 출발 항공 이용 시</div>
                </div>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full text-sm sm:text-base">
                  <thead className="bg-yaho-navy-50 text-yaho-navy-950">
                    <tr>
                      <th className="text-left px-4 py-3 font-black">1인 요금</th>
                      <th className="text-left px-4 py-3 font-black">A. 인아웃형 출발일<div className="text-xs font-medium text-slate-500">도착일 휴식 후 매일 골프</div></th>
                      <th className="text-left px-4 py-3 font-black">B. 조석형 출발일<div className="text-xs font-medium text-slate-500">도착일부터 골프 · 마지막 날 귀국</div></th>
                    </tr>
                  </thead>
                  <tbody>
                    {plan.rows.map((r, i) => (
                      <tr key={i} className={`border-t border-slate-200 ${i === 0 ? 'bg-yaho-gold-50/70' : ''}`}>
                        <td className="px-4 py-3 font-black text-yaho-navy-950 whitespace-nowrap">{r.price}</td>
                        <td className={`px-4 py-3 ${i === 0 ? 'font-bold' : ''}`}>{r.typeA}</td>
                        <td className={`px-4 py-3 ${i === 0 ? 'font-bold' : ''}`}>{r.typeB}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm text-slate-600">
                <span>3인 출발 1인 <strong className="text-yaho-navy-950">{plan.extra3}</strong></span>
                <span>2인 출발 1인 <strong className="text-yaho-navy-950">{plan.extra2}</strong></span>
                <span>일본 공휴일 골프 1회 <strong className="text-yaho-navy-950">+49,000원</strong> · 호텔 1박 <strong className="text-yaho-navy-950">+45,000원</strong></span>
              </div>
              <p className="mt-2 text-xs text-slate-500">요금은 환율 100엔 = 890원 기준이며, 환율 변동 시 조정될 수 있습니다.</p>
            </div>

            {/* 일정 */}
            <div>
              <h4 className="text-xl sm:text-2xl font-black text-yaho-navy-950 mb-5">{plan.label} 일정</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: 'A. 인아웃형', days: plan.typeA },
                  { title: 'B. 조석형', days: plan.typeB },
                ].map((t) => (
                  <div key={t.title} className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5 space-y-3">
                    <div className="text-base sm:text-lg font-black text-yaho-navy-950">{t.title}</div>
                    {t.days.map((d) => (
                      <div key={d.day} className="flex items-start gap-3 text-sm sm:text-base text-slate-700">
                        <span className="flex-shrink-0 px-2.5 h-7 rounded-lg bg-yaho-navy-900 text-yaho-gold-400 text-xs font-black flex items-center">{d.day}</span>
                        <span className="leading-relaxed">{d.text}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <p className="mt-3 text-sm text-slate-600">
                <Plane className="inline w-4 h-4 mr-1 text-yaho-gold-600" />
                매일 골프 추천 항공: 에어부산 BX148 김해 07:30 → 후쿠오카 08:30 / BX143 후쿠오카 19:40 → 김해 20:40
              </p>
            </div>

            {/* 골프장 */}
            <div>
              <h4 className="text-xl sm:text-2xl font-black text-yaho-navy-950 mb-5">3색 골프 코스 <span className="text-sm font-semibold text-slate-500">18홀 · 셀프 라운드 · 전동카트</span></h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {COURSES.map((c) => (
                  <div key={c.name} className="rounded-2xl border border-slate-200 overflow-hidden bg-white card-hover-shadow">
                    <img src={c.image} alt={c.name} loading="lazy" className="w-full h-48 object-cover" />
                    <div className="p-5 space-y-2">
                      <span className="inline-block px-2.5 py-1 rounded-md bg-yaho-navy-900 text-white text-xs font-bold">{c.tag}</span>
                      <div>
                        <div className="text-lg font-black text-yaho-navy-950">{c.name}</div>
                        <div className="text-xs text-slate-500">{c.jp}</div>
                      </div>
                      <p className="text-sm text-slate-700 leading-relaxed">{c.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 호텔 */}
            <div>
              <h4 className="text-xl sm:text-2xl font-black text-yaho-navy-950 mb-5">대욕장 호텔 <span className="text-sm font-semibold text-slate-500">2인 1실 · 조식 포함 · 둘 중 한 곳</span></h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {HOTELS.map((h) => (
                  <div key={h.name} className="rounded-2xl border border-slate-200 overflow-hidden bg-white">
                    <div className="grid grid-cols-3 gap-0.5">
                      {h.images.map((src, i) => (
                        <img key={i} src={src} alt={`${h.name} 사진 ${i + 1}`} loading="lazy" className="w-full h-28 sm:h-36 object-cover" />
                      ))}
                    </div>
                    <div className="p-5 space-y-2">
                      <div>
                        <div className="text-lg font-black text-yaho-navy-950 flex items-center gap-2"><BedDouble className="w-5 h-5 text-yaho-gold-600" />{h.name}</div>
                        <div className="text-xs text-slate-500">{h.jp}</div>
                      </div>
                      {h.points.map((pt, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm text-slate-700">
                          <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 포함 / 불포함 + 문의 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              <div className="rounded-2xl border border-slate-200 p-5 space-y-2">
                <h5 className="text-base font-black text-yaho-navy-950">포함 사항</h5>
                {includes.map((t, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-slate-700">
                    <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{t}</span>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl border border-slate-200 p-5 space-y-2">
                <h5 className="text-base font-black text-yaho-navy-950">불포함 사항</h5>
                {excludes.map((t, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-slate-600">
                    <X className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
                    <span>{t}</span>
                  </div>
                ))}
              </div>
              <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-yaho-navy-950 text-white space-y-3 flex flex-col justify-between">
                <p className="text-sm text-slate-300 leading-relaxed">
                  ※ 송영차량은 다른 일행과 함께 이용할 수 있으며, 첫날 라운드는 일몰까지입니다. 출발일·인원에 맞춘 정확한 요금은 문의해 주세요.
                </p>
                <button
                  onClick={() => onInquiryWithTour(inquiryTitle)}
                  className="w-full py-3.5 rounded-xl bg-yaho-gold-400 hover:bg-yaho-gold-300 text-yaho-navy-950 font-black text-base transition-all shadow-md flex items-center justify-center gap-2 touch-target"
                >
                  <span>우리 팀 일정으로 견적 받기</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
