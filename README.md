# 야호트래블 (YAHO TRAVEL)

> **"우리가 꿈꾸던 일본, 우리끼리 여유롭게"**  
> 20년 현지 전문가가 직접 기획하고 안내하는 프리미엄 소규모 프라이빗 투어 & 기업 인센티브 전문 웹사이트

---

## 🌟 프로젝트 개요

야호트래블은 경남 거제 및 남부권 50대 이상 중장년층, 조선소 협력사 및 기업체 단체, 4~8인 소규모 가족 모임을 타깃으로 하는 프리미엄 일본 전문 여행사 웹사이트입니다.

### 핵심 특장점
- **20년 현지 전문가 직접 인솔**: 기획부터 현지 핸들링까지 원스톱 밀착 케어
- **안전 운행 수송 역량**: 한국 1종 대형 및 일본 버스 영업용 운전면허 동시 보유 전용 차량 운행
- **현지 직계약 인프라**: 마쓰야마, 삿포로, 규슈 지역 고급 료칸 & 명문 골프장 직계약
- **신뢰와 안전**: 관광사업 정식 등록, 3,000만 원 인허가 보증보험 및 전원 여행자보험 가입

---

## 🛠️ 기술 스택 (Tech Stack)

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Lucide React (Icons)
- **Email & Messaging**: Web3Forms API, 카카오톡 채널 1:1 상담 직통 연동
- **Architecture**: 컴포넌트 모듈화, 이원화 버전 관리 및 캐시 버스팅(`src/version.ts`)

---

## 📁 디렉토리 구조

```text
yahotravel/
├── .agents/                    # 프로젝트 아키텍처 및 코딩 규칙
│   └── rules/
├── public/                     # 정적 에셋 (파비콘, 이미지)
│   └── images/
├── src/
│   ├── components/             # 기능별 모듈 컴포넌트
│   │   ├── about/              # 회사소개 & 오시는 길
│   │   ├── common/             # 헤더, 푸터, 플로팅 카카오톡
│   │   ├── community/          # 공지사항 & 여행안내
│   │   ├── home/               # 메인 히어로, 핵심 강점, 서비스 카드
│   │   ├── inquiry/            # 맞춤 견적 신청 스마트 폼
│   │   └── tours/              # 여행 상품 목록 & 상세 일정표 모달
│   ├── data/                   # 여행 코스 및 회사 데이터
│   ├── types/                  # TypeScript 인터페이스
│   ├── App.tsx                 # 메인 라우트 및 탭 전환
│   ├── index.css               # Tailwind CSS & 전역 스타일
│   ├── main.tsx                # React 렌더링 진입점
│   └── version.ts              # SemVer 및 BUILD_TAG 캐시 버스팅 관리
├── .env.example                # 환경 변수 예시
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## 🚀 시작하기 (Getting Started)

### 1. 의존성 패키지 설치
```bash
npm install
```

### 2. 환경 변수 설정
프로젝트 루트에 `.env` 파일을 생성하고 다음 항목을 설정합니다 (참고: `.env.example`):
```env
VITE_ADMIN_EMAIL=info.yahotravel@gmail.com
VITE_COMPANY_TEL=055-736-6068
VITE_KAKAO_CHAT_URL=http://pf.kakao.com/_zxiSrX/chat
VITE_WEB3FORMS_KEY=your_web3forms_key_here
```

### 3. 개발 서버 실행
```bash
npm run dev
```
브라우저에서 `http://localhost:3001`으로 접속합니다.

### 4. 프로덕션 빌드
```bash
npm run build
```
빌드 산출물은 `dist/` 폴더에 생성됩니다.

---

## 📄 라이선스
Copyright © 2026 YAHO TRAVEL. All rights reserved.
