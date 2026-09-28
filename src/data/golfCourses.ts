// 지역별 골프 대표코스 데이터
// ※ 골프장 실명은 계약·예약 확정 후 각 라운드의 courseName 필드에 기입하세요. (비워두면 코스 유형만 표시됩니다)
// ※ 항공 노선·운항 요일은 시즌별로 변동될 수 있으니 판매 전 확인하세요.

export interface GolfRound {
  label: string; // 예: "1라운드"
  courseName?: string; // 실제 골프장명 (확정 시 기입)
  courseType: string; // 예: "후쿠오카 근교 구릉형 명문 코스"
  holes: number;
  teeOff: string; // 예: "오후 티오프 · 스루플레이"
  transfer: string; // 예: "공항 → 골프장 약 40분"
}

export interface GolfCourseDay {
  day: number;
  title: string;
  round?: GolfRound;
  schedule: string[];
  meals: { breakfast?: string; lunch?: string; dinner?: string };
  stay: string;
}

export interface GolfSignatureCourse {
  id: string;
  regionLabel: string; // 탭 표시용 지역명
  icon: string;
  badge: string;
  title: string;
  subtitle: string;
  flight: string;
  duration: string;
  rounds: string;
  groupSize: string;
  bestSeason: string;
  catchphrase: string;
  image: string;
  stats: { label: string; value: string }[];
  highlights: string[];
  days: GolfCourseDay[];
  includes: string[];
  excludes: string[];
  recommendedFor: string[];
  notice: string;
}

const GOLF_IMAGE = 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?q=80&w=1600&auto=format&fit=crop';

const DEFAULT_GROUP_SIZE = '4인 ~ 16인 (1~4팀)';

const DEFAULT_NOTICE =
  '티오프 시간과 골프장은 출발일·인원에 따라 확정되며, 라운딩 수(2~4라운드)와 숙소 등급은 맞춤 조정 가능합니다.';

const DEFAULT_EXCLUDES = [
  '왕복 항공권 (최적 요금으로 별도 발권 대행)',
  '캐디피 (셀프 라운딩 기본, 요청 시 배정)',
  '중식(자유식) 및 개인 음료·주류',
  '여행자보험 및 개인 경비',
];

const DEFAULT_RECOMMENDED = ['골프 동호회 · 친목 모임', '기업 VIP 접대 · 임직원 포상', '부부 동반 골프 여행'];

const buildIncludes = (stayLine: string) => [
  '3라운드 그린피 (카트비 포함)',
  '전 일정 단독 전용차량 & 기사',
  stayLine,
  '일정표상 식사 (조식 3회 · 석식 3회)',
  '야호트래블 현지 전문가 동행 케어',
  '티타임 예약 및 현지 예약 대행',
];

export const GOLF_COURSES: GolfSignatureCourse[] = [
  // 1. 규슈
  {
    id: 'golf-kyushu',
    regionLabel: '규슈',
    icon: '♨️',
    badge: '규슈 골프 대표코스',
    title: '규슈 명문 3색 라운딩 & 유후인 료칸 3박 4일',
    subtitle: '후쿠오카 · 오이타 명문 코스 54홀 + 노천온천 료칸 연박',
    flight: '김해 ↔ 후쿠오카 직항 (약 1시간)',
    duration: '3박 4일',
    rounds: '3라운드 54홀',
    groupSize: DEFAULT_GROUP_SIZE,
    bestSeason: '3~6월 · 9~12월 (연중 가능)',
    catchphrase: '도착 당일부터 티오프, 라운딩 끝엔 노천탕',
    image: GOLF_IMAGE,
    stats: [
      { label: '총 라운딩', value: '54홀' },
      { label: '비행시간', value: '약 1시간' },
      { label: '숙박', value: '호텔 1박 + 료칸 2박' },
      { label: '이동', value: '단독 전용차량' },
    ],
    highlights: [
      '도착 당일 오후 티오프 — 첫날부터 18홀 라운딩으로 일정 낭비 제로',
      '성격이 다른 3개 명문 코스: 후쿠오카 구릉 코스 · 규슈 챔피언십 코스 · 오이타 고원 코스',
      '일본식 스루플레이(18홀 연속) 우선 배정으로 오후 온천·만찬 시간 확보',
      '골프백 4개 이상 적재 가능한 전용 밴/버스 단독 배차, 공항-골프장-숙소 원스톱',
      '유후인 노천온천 료칸 2연박 + 가이세키 석식으로 라운딩 피로 회복',
    ],
    days: [
      {
        day: 1,
        title: '후쿠오카 도착 → 당일 18홀 라운딩',
        round: {
          label: '1라운드',
          courseType: '후쿠오카 근교 구릉형 명문 코스',
          holes: 18,
          teeOff: '오후 티오프 · 스루플레이',
          transfer: '후쿠오카 공항 → 골프장 약 40~60분',
        },
        schedule: [
          '김해공항 오전 출발 → 후쿠오카 공항 도착',
          '전용차량 미팅 후 골프장 직행 (골프백 바로 적재)',
          '18홀 라운딩',
          '하카타 시내 호텔 체크인 → 모츠나베·야타이 석식',
        ],
        meals: { lunch: '클럽하우스 (자유식)', dinner: '하카타 모츠나베 특선' },
        stay: '후쿠오카 시내 호텔',
      },
      {
        day: 2,
        title: '오전 라운딩 → 유후인 료칸으로',
        round: {
          label: '2라운드',
          courseType: '규슈 대표 챔피언십 코스',
          holes: 18,
          teeOff: '오전 티오프 · 스루플레이',
          transfer: '호텔 → 골프장 약 30~60분',
        },
        schedule: [
          '호텔 조식 후 골프장 이동',
          '18홀 라운딩',
          '유후인으로 이동 (약 1시간 40분)',
          '료칸 체크인 → 노천온천 & 가이세키 만찬',
        ],
        meals: { breakfast: '호텔 조식', lunch: '클럽하우스 (자유식)', dinner: '료칸 가이세키' },
        stay: '유후인 노천온천 료칸',
      },
      {
        day: 3,
        title: '오이타 고원 코스 라운딩 → 료칸 연박',
        round: {
          label: '3라운드',
          courseType: '오이타 고원·산악 전망 코스',
          holes: 18,
          teeOff: '오전 티오프 · 스루플레이',
          transfer: '유후인 료칸 → 골프장 약 30~50분',
        },
        schedule: [
          '료칸 조식 후 골프장 이동',
          '유후다케를 조망하는 고원 코스 18홀',
          '료칸 복귀 → 노천탕 휴식',
          '유후인 로컬 와규 석식 또는 료칸 가이세키',
        ],
        meals: { breakfast: '료칸 조식', lunch: '클럽하우스 (자유식)', dinner: '분고규(오이타 와규) 특선' },
        stay: '유후인 노천온천 료칸 (연박)',
      },
      {
        day: 4,
        title: '유후인 아침 산책 → 귀국',
        schedule: [
          '긴린코 호수 아침 물안개 산책',
          '유노츠보 거리 기념품 쇼핑',
          '전용차량으로 후쿠오카 공항 이동 (약 1시간 40분)',
          '김해공항 도착',
        ],
        meals: { breakfast: '료칸 조식', lunch: '자유식' },
        stay: '귀국 (일정 종료)',
      },
    ],
    includes: buildIncludes('호텔 1박 + 유후인 료칸 2박 (2인 1실 기준)'),
    excludes: DEFAULT_EXCLUDES,
    recommendedFor: DEFAULT_RECOMMENDED,
    notice: DEFAULT_NOTICE,
  },

  // 2. 혼슈 (간사이)
  {
    id: 'golf-honshu',
    regionLabel: '혼슈',
    icon: '🏯',
    badge: '혼슈 골프 대표코스',
    title: '간사이 명문 라운딩 & 아리마 온천 3박 4일',
    subtitle: '고베 · 효고 · 시가 명문 코스 54홀 + 일본 3대 고탕 아리마 온천',
    flight: '김해 ↔ 간사이(오사카) 직항 (약 1시간 20분)',
    duration: '3박 4일',
    rounds: '3라운드 54홀',
    groupSize: DEFAULT_GROUP_SIZE,
    bestSeason: '3~6월 · 9~11월',
    catchphrase: '전통의 명문 코스와 천년 온천, 마지막 밤은 오사카',
    image: GOLF_IMAGE,
    stats: [
      { label: '총 라운딩', value: '54홀' },
      { label: '비행시간', value: '약 1시간 20분' },
      { label: '숙박', value: '료칸 2박 + 호텔 1박' },
      { label: '이동', value: '단독 전용차량' },
    ],
    highlights: [
      '일본 골프 발상지 간사이 — 역사 깊은 전통 명문 코스 3곳 라운딩',
      '롯코산 자락 산악 코스부터 비와호 인근 평탄 코스까지 다채로운 레이아웃',
      '일본 3대 고탕 아리마 온천 료칸 2연박 (금탕·은탕 온천 체험)',
      '마지막 밤은 오사카 시내 — 도톤보리 미식과 쇼핑까지 한 번에',
      '간사이 공항 입·출국으로 이동 동선 최소화',
    ],
    days: [
      {
        day: 1,
        title: '간사이 도착 → 고베 근교 18홀 → 아리마 온천',
        round: {
          label: '1라운드',
          courseType: '고베 근교 전통 명문 코스',
          holes: 18,
          teeOff: '오후 티오프 · 스루플레이',
          transfer: '간사이 공항 → 골프장 약 70~90분',
        },
        schedule: [
          '김해공항 오전 출발 → 간사이 공항 도착',
          '전용차량 미팅 후 골프장 직행',
          '18홀 라운딩',
          '아리마 온천 료칸 체크인 → 가이세키 만찬',
        ],
        meals: { lunch: '클럽하우스 (자유식)', dinner: '료칸 가이세키' },
        stay: '아리마 온천 료칸',
      },
      {
        day: 2,
        title: '롯코산 산악 코스 라운딩 → 료칸 연박',
        round: {
          label: '2라운드',
          courseType: '효고 산악·고원 전망 코스',
          holes: 18,
          teeOff: '오전 티오프 · 스루플레이',
          transfer: '아리마 료칸 → 골프장 약 30~50분',
        },
        schedule: [
          '료칸 조식 후 골프장 이동',
          '18홀 라운딩',
          '아리마 온천 거리 산책 (금탕·은탕 공중탕 체험)',
          '고베규 특선 석식',
        ],
        meals: { breakfast: '료칸 조식', lunch: '클럽하우스 (자유식)', dinner: '고베규 특선' },
        stay: '아리마 온천 료칸 (연박)',
      },
      {
        day: 3,
        title: '시가·교토 방면 라운딩 → 오사카 시내',
        round: {
          label: '3라운드',
          courseType: '비와호 인근 평탄 구릉 코스',
          holes: 18,
          teeOff: '오전 티오프 · 스루플레이',
          transfer: '아리마 → 골프장 약 60~90분',
        },
        schedule: [
          '료칸 조식 후 골프장 이동',
          '18홀 라운딩',
          '오사카 시내 호텔 체크인',
          '도톤보리 미식 투어 석식',
        ],
        meals: { breakfast: '료칸 조식', lunch: '클럽하우스 (자유식)', dinner: '오사카 미식 특선' },
        stay: '오사카 시내 호텔',
      },
      {
        day: 4,
        title: '오사카 관광 → 귀국',
        schedule: [
          '오사카성 공원 산책',
          '구로몬 시장 · 면세 쇼핑',
          '전용차량으로 간사이 공항 이동 (약 1시간)',
          '김해공항 도착',
        ],
        meals: { breakfast: '호텔 조식', lunch: '자유식' },
        stay: '귀국 (일정 종료)',
      },
    ],
    includes: buildIncludes('아리마 료칸 2박 + 오사카 호텔 1박 (2인 1실 기준)'),
    excludes: DEFAULT_EXCLUDES,
    recommendedFor: DEFAULT_RECOMMENDED,
    notice: DEFAULT_NOTICE,
  },

  // 3. 시코쿠 (마쓰야마)
  {
    id: 'golf-shikoku',
    regionLabel: '시코쿠',
    icon: '🌊',
    badge: '시코쿠 골프 대표코스',
    title: '세토내해 오션뷰 라운딩 & 도고온천 3박 4일',
    subtitle: '마쓰야마 · 이마바리 명문 코스 54홀 + 3,000년 도고온천 료칸',
    flight: '김해 ↔ 마쓰야마 직항',
    duration: '3박 4일',
    rounds: '3라운드 54홀',
    groupSize: DEFAULT_GROUP_SIZE,
    bestSeason: '3~6월 · 9~12월',
    catchphrase: '섬과 바다가 내려다보이는 그린, 한적한 프라이빗 라운딩',
    image: GOLF_IMAGE,
    stats: [
      { label: '총 라운딩', value: '54홀' },
      { label: '공항-시내', value: '약 20~30분' },
      { label: '숙박', value: '료칸 2박 + 호텔 1박' },
      { label: '이동', value: '단독 전용차량' },
    ],
    highlights: [
      '붐비지 않는 시코쿠 — 여유로운 티타임과 한적한 프라이빗 라운딩',
      '세토내해 섬들이 내려다보이는 오션뷰 코스에서의 특별한 라운딩',
      '3,000년 역사 도고온천 료칸 2연박 + 도고온천 본관 입욕',
      '공항-시내 20~30분, 공항-골프장 이동이 짧아 체력 부담 최소화',
      '마쓰야마 명물 도미밥 · 세토내해 해산물 미식',
    ],
    days: [
      {
        day: 1,
        title: '마쓰야마 도착 → 18홀 → 도고온천',
        round: {
          label: '1라운드',
          courseType: '마쓰야마 근교 구릉형 명문 코스',
          holes: 18,
          teeOff: '오후 티오프 · 스루플레이',
          transfer: '마쓰야마 공항 → 골프장 약 30~50분',
        },
        schedule: [
          '김해공항 출발 → 마쓰야마 공항 도착',
          '전용차량 미팅 후 골프장 직행',
          '18홀 라운딩',
          '도고온천 료칸 체크인 → 가이세키 만찬',
        ],
        meals: { lunch: '클럽하우스 (자유식)', dinner: '료칸 가이세키' },
        stay: '도고온천 료칸',
      },
      {
        day: 2,
        title: '세토내해 오션뷰 코스 → 도고 연박',
        round: {
          label: '2라운드',
          courseType: '세토내해 조망 오션뷰 코스',
          holes: 18,
          teeOff: '오전 티오프 · 스루플레이',
          transfer: '도고온천 → 골프장 약 40~60분',
        },
        schedule: [
          '료칸 조식 후 골프장 이동',
          '바다를 내려다보는 18홀 라운딩',
          '도고온천 본관 입욕 · 봇짱 가라쿠리 시계',
          '세토내해 해산물 석식',
        ],
        meals: { breakfast: '료칸 조식', lunch: '클럽하우스 (자유식)', dinner: '세토내해 해산물 특선' },
        stay: '도고온천 료칸 (연박)',
      },
      {
        day: 3,
        title: '이마바리 방면 라운딩 → 마쓰야마 시내',
        round: {
          label: '3라운드',
          courseType: '이마바리 방면 산악 전망 코스',
          holes: 18,
          teeOff: '오전 티오프 · 스루플레이',
          transfer: '도고온천 → 골프장 약 50~70분',
        },
        schedule: [
          '료칸 조식 후 골프장 이동',
          '18홀 라운딩',
          '마쓰야마 시내 호텔 체크인',
          '오카이도 상점가 · 도미밥(타이메시) 석식',
        ],
        meals: { breakfast: '료칸 조식', lunch: '클럽하우스 (자유식)', dinner: '마쓰야마 도미밥 특선' },
        stay: '마쓰야마 시내 호텔',
      },
      {
        day: 4,
        title: '마쓰야마성 관광 → 귀국',
        schedule: [
          '마쓰야마성 (로프웨이) 전망 관광',
          '반스이소 · 기념품 쇼핑',
          '전용차량으로 마쓰야마 공항 이동 (약 20~30분)',
          '김해공항 도착',
        ],
        meals: { breakfast: '호텔 조식', lunch: '자유식' },
        stay: '귀국 (일정 종료)',
      },
    ],
    includes: buildIncludes('도고온천 료칸 2박 + 마쓰야마 호텔 1박 (2인 1실 기준)'),
    excludes: DEFAULT_EXCLUDES,
    recommendedFor: DEFAULT_RECOMMENDED,
    notice: DEFAULT_NOTICE,
  },

  // 4. 홋카이도
  {
    id: 'golf-hokkaido',
    regionLabel: '홋카이도',
    icon: '🌲',
    badge: '홋카이도 골프 대표코스',
    title: '홋카이도 대자연 라운딩 & 조잔케이 온천 3박 4일',
    subtitle: '치토세 · 삿포로 명문 코스 54홀 + 계곡 온천 료칸 연박',
    flight: '김해 ↔ 삿포로(신치토세) 직항 (약 2시간 40분)',
    duration: '3박 4일',
    rounds: '3라운드 54홀',
    groupSize: DEFAULT_GROUP_SIZE,
    bestSeason: '6~9월 (시즌: 5월~10월)',
    catchphrase: '한여름에도 20도대, 광활한 페어웨이 위의 피서 골프',
    image: GOLF_IMAGE,
    stats: [
      { label: '총 라운딩', value: '54홀' },
      { label: '비행시간', value: '약 2시간 40분' },
      { label: '숙박', value: '호텔 1박 + 료칸 2박' },
      { label: '이동', value: '단독 전용차량' },
    ],
    highlights: [
      '한여름에도 선선한 기후 — 무더위 없는 쾌적한 여름 피서 골프',
      '넓은 부지를 살린 광활한 페어웨이와 자작나무 숲 코스',
      '신치토세 공항 인근 코스 배정으로 도착 당일 라운딩',
      '삿포로 근교 조잔케이 계곡 온천 료칸 2연박',
      '징기스칸 · 해산물 · 삿포로 맥주 등 홋카이도 미식',
    ],
    days: [
      {
        day: 1,
        title: '신치토세 도착 → 치토세 근교 18홀 → 삿포로',
        round: {
          label: '1라운드',
          courseType: '치토세·도마코마이 권역 임간 코스',
          holes: 18,
          teeOff: '오후 티오프 · 스루플레이',
          transfer: '신치토세 공항 → 골프장 약 20~40분',
        },
        schedule: [
          '김해공항 오전 출발 → 신치토세 공항 도착',
          '전용차량 미팅 후 골프장 직행',
          '18홀 라운딩',
          '삿포로 시내 호텔 체크인 → 징기스칸 석식',
        ],
        meals: { lunch: '클럽하우스 (자유식)', dinner: '징기스칸 & 삿포로 맥주' },
        stay: '삿포로 시내 호텔',
      },
      {
        day: 2,
        title: '삿포로 근교 라운딩 → 조잔케이 온천',
        round: {
          label: '2라운드',
          courseType: '삿포로 근교 대자연 챔피언십 코스',
          holes: 18,
          teeOff: '오전 티오프 · 스루플레이',
          transfer: '호텔 → 골프장 약 40~60분',
        },
        schedule: [
          '호텔 조식 후 골프장 이동',
          '18홀 라운딩',
          '조잔케이 온천으로 이동',
          '료칸 체크인 → 노천온천 & 가이세키 만찬',
        ],
        meals: { breakfast: '호텔 조식', lunch: '클럽하우스 (자유식)', dinner: '료칸 가이세키' },
        stay: '조잔케이 온천 료칸',
      },
      {
        day: 3,
        title: '산악 전망 코스 라운딩 → 료칸 연박',
        round: {
          label: '3라운드',
          courseType: '삿포로 남부 산악 전망 코스',
          holes: 18,
          teeOff: '오전 티오프 · 스루플레이',
          transfer: '조잔케이 → 골프장 약 30~50분',
        },
        schedule: [
          '료칸 조식 후 골프장 이동',
          '18홀 라운딩',
          '료칸 복귀 → 계곡 노천탕 휴식',
          '홋카이도 해산물 석식',
        ],
        meals: { breakfast: '료칸 조식', lunch: '클럽하우스 (자유식)', dinner: '홋카이도 해산물 특선' },
        stay: '조잔케이 온천 료칸 (연박)',
      },
      {
        day: 4,
        title: '삿포로 관광 → 귀국',
        schedule: [
          '오도리 공원 · 삿포로 시계탑',
          '니조 시장 · 기념품 쇼핑',
          '전용차량으로 신치토세 공항 이동 (약 1시간)',
          '김해공항 도착',
        ],
        meals: { breakfast: '료칸 조식', lunch: '자유식' },
        stay: '귀국 (일정 종료)',
      },
    ],
    includes: buildIncludes('삿포로 호텔 1박 + 조잔케이 료칸 2박 (2인 1실 기준)'),
    excludes: DEFAULT_EXCLUDES,
    recommendedFor: DEFAULT_RECOMMENDED,
    notice: '홋카이도 골프장은 겨울철(11월~4월) 휴장합니다. ' + DEFAULT_NOTICE,
  },

  // 5. 오키나와
  {
    id: 'golf-okinawa',
    regionLabel: '오키나와',
    icon: '🌺',
    badge: '오키나와 골프 대표코스',
    title: '오키나와 오션뷰 라운딩 & 비치 리조트 3박 4일',
    subtitle: '에메랄드빛 바다를 끼고 도는 남국 코스 54홀 + 해변 리조트 연박',
    flight: '김해 ↔ 오키나와(나하) 직항 (약 2시간)',
    duration: '3박 4일',
    rounds: '3라운드 54홀',
    groupSize: DEFAULT_GROUP_SIZE,
    bestSeason: '11~3월 겨울 골프 (연중 가능)',
    catchphrase: '한겨울에도 반팔 라운딩, 바다가 보이는 남국의 그린',
    image: GOLF_IMAGE,
    stats: [
      { label: '총 라운딩', value: '54홀' },
      { label: '비행시간', value: '약 2시간' },
      { label: '숙박', value: '리조트 2박 + 호텔 1박' },
      { label: '이동', value: '단독 전용차량' },
    ],
    highlights: [
      '한국이 추운 11~3월에도 20도 안팎 — 대표적인 겨울 피한 골프지',
      '에메랄드빛 바다를 따라 도는 오션뷰 · 리조트 코스 라운딩',
      '온나 해변 비치 리조트 2연박으로 라운딩 후 석양 감상',
      '마지막 밤은 나하 국제거리 — 아구돼지 · 류큐 요리 미식',
      '나하 공항 입·출국, 오키나와 본섬 남부~중부 효율 동선',
    ],
    days: [
      {
        day: 1,
        title: '나하 도착 → 남부 코스 18홀 → 비치 리조트',
        round: {
          label: '1라운드',
          courseType: '오키나와 남부 오션뷰 코스',
          holes: 18,
          teeOff: '오후 티오프 · 스루플레이',
          transfer: '나하 공항 → 골프장 약 30~50분',
        },
        schedule: [
          '김해공항 출발 → 나하 공항 도착',
          '전용차량 미팅 후 골프장 직행',
          '18홀 라운딩',
          '온나 해변 리조트 체크인 → 리조트 석식',
        ],
        meals: { lunch: '클럽하우스 (자유식)', dinner: '리조트 디너' },
        stay: '온나 해변 비치 리조트',
      },
      {
        day: 2,
        title: '중부 리조트 코스 라운딩 → 리조트 연박',
        round: {
          label: '2라운드',
          courseType: '중부 해안 리조트 코스',
          holes: 18,
          teeOff: '오전 티오프 · 스루플레이',
          transfer: '리조트 → 골프장 약 20~40분',
        },
        schedule: [
          '리조트 조식 후 골프장 이동',
          '18홀 라운딩',
          '만자모 절벽 석양 감상',
          '오키나와 해산물 석식',
        ],
        meals: { breakfast: '리조트 조식', lunch: '클럽하우스 (자유식)', dinner: '오키나와 해산물 특선' },
        stay: '온나 해변 비치 리조트 (연박)',
      },
      {
        day: 3,
        title: '북부 전망 코스 라운딩 → 나하 시내',
        round: {
          label: '3라운드',
          courseType: '본섬 북부 바다 전망 코스',
          holes: 18,
          teeOff: '오전 티오프 · 스루플레이',
          transfer: '리조트 → 골프장 약 40~60분',
        },
        schedule: [
          '리조트 조식 후 골프장 이동',
          '18홀 라운딩',
          '나하 시내 호텔 체크인',
          '국제거리 · 아구돼지 샤브샤브 석식',
        ],
        meals: { breakfast: '리조트 조식', lunch: '클럽하우스 (자유식)', dinner: '아구돼지 샤브샤브' },
        stay: '나하 시내 호텔',
      },
      {
        day: 4,
        title: '슈리성 관광 → 귀국',
        schedule: [
          '슈리성 공원 산책',
          '국제거리 · 기념품 쇼핑',
          '전용차량으로 나하 공항 이동 (약 20~30분)',
          '김해공항 도착',
        ],
        meals: { breakfast: '호텔 조식', lunch: '자유식' },
        stay: '귀국 (일정 종료)',
      },
    ],
    includes: buildIncludes('비치 리조트 2박 + 나하 호텔 1박 (2인 1실 기준)'),
    excludes: DEFAULT_EXCLUDES,
    recommendedFor: ['겨울철 골프 동호회 · 친목 모임', '기업 VIP 접대 · 임직원 포상', '부부 동반 골프 여행'],
    notice: DEFAULT_NOTICE,
  },
];
