import React, { useState, useEffect } from 'react';
import { Send, Phone, MessageCircle, CheckCircle2, ShieldCheck, Calendar, Users, Copy, Mail, Check, AlertCircle } from 'lucide-react';
import { InquiryFormData } from '../../types';
import { COMPANY_INFO } from '../../data/mockData';

interface InquiryFormProps {
  initialPurpose?: string;
  initialTourTitle?: string;
}

export const InquiryForm: React.FC<InquiryFormProps> = ({ initialPurpose, initialTourTitle }) => {
  const [formData, setFormData] = useState<InquiryFormData>({
    name: '',
    phone: '',
    email: '',
    region: 'fukuoka',
    departureDate: '',
    duration: '2박 3일',
    adultCount: 4,
    childCount: 0,
    purpose: (initialPurpose as any) || 'private_family',
    budget: '',
    customRequests: initialTourTitle ? `[문의 희망 코스: ${initialTourTitle}]\n` : '',
    agreedToPrivacy: true,
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);
  const [emailSentStatus, setEmailSentStatus] = useState<'idle' | 'success' | 'failed'>('idle');

  useEffect(() => {
    if (initialPurpose) {
      setFormData((prev) => ({ ...prev, purpose: initialPurpose as any }));
    }
  }, [initialPurpose]);

  useEffect(() => {
    if (initialTourTitle) {
      setFormData((prev) => ({
        ...prev,
        customRequests: `[문의 코스: ${initialTourTitle}]\n${prev.customRequests.replace(/\[문의 코스:[^\]]+\]\n?/, '')}`
      }));
    }
  }, [initialTourTitle]);

  // 전화번호 자동 하이픈 포맷팅
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, '');
    let formatted = raw;
    if (raw.length > 3 && raw.length <= 7) {
      formatted = `${raw.slice(0, 3)}-${raw.slice(3)}`;
    } else if (raw.length > 7) {
      formatted = `${raw.slice(0, 3)}-${raw.slice(3, 7)}-${raw.slice(7, 11)}`;
    }
    setFormData((prev) => ({ ...prev, phone: formatted }));
    if (errors.phone || errors.contact) {
      setErrors((prev) => ({ ...prev, phone: '', contact: '' }));
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, email: e.target.value }));
    if (errors.email || errors.contact) {
      setErrors((prev) => ({ ...prev, email: '', contact: '' }));
    }
  };

  const getPurposeLabel = (p: string) => {
    switch (p) {
      case 'private_family':
        return '소규모 프라이빗 투어 (4~8인)';
      case 'corporate_incentive':
        return '우리끼리 맞춤 단체 여행 (친목·동호회·대가족)';
      case 'golf_hotspring':
        return '힐링 온천 & 명문 골프 맞춤';
      default:
        return '기타 맞춤 여행';
    }
  };

  const getRegionLabel = (r: string) => {
    switch (r) {
      case 'fukuoka':
        return '후쿠오카·규슈 (벳부,구마모토,가고시마)등 전지역';
      case 'matsuyama':
        return '마쓰야마·시코쿠(다카마쓰, 고치)등 전지역';
      case 'honshu':
      case 'tokyo':
        return '도쿄·혼슈(오사카,나고야,도야마)등 전지역';
      case 'sapporo':
        return '삿포로·홋카이도(오타루,하코다테,비에이)등 전지역';
      case 'okinawa':
        return '나하·오키나와(남부,중부,북부섬)등 전지역';
      case 'custom':
        return '6. 기타 일본 전지역 단독 맞춤 기획';
      default:
        return '6. 기타 일본 전지역 단독 맞춤 기획';
    }
  };

  // 신청서 요약 텍스트 생성 (카카오톡, 메일 본문용)
  const generateSummaryText = () => {
    return `[야호트래블 맞춤 여행 견적 신청서]
• 신청자(단체명): ${formData.name}
• 휴대폰 연락처: ${formData.phone || '미입력'}
• 이메일 주소: ${formData.email || '미입력'}
• 여행 목적: ${getPurposeLabel(formData.purpose)}
• 희망 지역: ${getRegionLabel(formData.region)}
• 출발 희망일: ${formData.departureDate} (${formData.duration})
• 인원: 성인 ${formData.adultCount}명 ${formData.childCount > 0 ? `/ 소아 ${formData.childCount}명` : ''}
• 추가 요청사항:
${formData.customRequests.trim() || '(특별 요청사항 없음)'}
---------------------------------
* 야호트래블 웹사이트에서 고객이 직접 작성한 견적 신청서입니다.`;
  };

  // 유효성 검사: 연락처(휴대폰) 또는 이메일 중 최소 하나는 필수!
  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = '성함 또는 단체명을 입력해 주세요.';

    const rawPhone = formData.phone.replace(/[^0-9]/g, '');
    const hasPhone = rawPhone.length > 0;
    const validPhone = rawPhone.length >= 10;

    const emailTrimmed = (formData.email || '').trim();
    const hasEmail = emailTrimmed.length > 0;
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrimmed);

    // 둘 다 없을 경우
    if (!hasPhone && !hasEmail) {
      newErrors.contact = '연락받으실 휴대폰 번호 또는 이메일 중 하나는 반드시 입력해 주세요.';
    } else {
      if (hasPhone && !validPhone) {
        newErrors.phone = '올바른 휴대폰 번호를 입력해 주세요 (최소 10자리).';
      }
      if (hasEmail && !validEmail) {
        newErrors.email = '올바른 이메일 주소 형식을 입력해 주세요 (예: user@example.com).';
      }
    }

    if (!formData.departureDate) newErrors.departureDate = '출발 희망일을 선택해 주세요.';
    if (!formData.agreedToPrivacy) newErrors.agreedToPrivacy = '개인정보 수집 및 이용에 동의해 주세요.';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCopySummary = () => {
    const text = generateSummaryText();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSendViaKakao = () => {
    handleCopySummary();
    window.open(COMPANY_INFO.kakaoChannelUrl, '_blank');
  };

  const handleSendViaMailto = () => {
    const subject = encodeURIComponent(`[야호트래블 견적문의] ${formData.name}님 (${formData.departureDate} 출발)`);
    const body = encodeURIComponent(generateSummaryText());
    window.location.href = `mailto:${COMPANY_INFO.email}?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setEmailSentStatus('idle');

    // 1. 브라우저 localStorage에 안전하게 백업 저장
    try {
      const existingInquiries = JSON.parse(localStorage.getItem('yahotravel_inquiries') || '[]');
      existingInquiries.push({
        ...formData,
        submittedAt: new Date().toISOString()
      });
      localStorage.setItem('yahotravel_inquiries', JSON.stringify(existingInquiries));
    } catch (err) {
      console.error('Storage error:', err);
    }

    // 2. Web3Forms API로 실제 관리자 이메일 발송
    const accessKey = import.meta.env.VITE_WEB3FORMS_KEY || '7272a2ac-24a2-4bc9-9dc3-51c908b4fd60';

    if (!accessKey) {
      console.warn('VITE_WEB3FORMS_KEY is not configured');
      setEmailSentStatus('failed');
      setIsSubmitting(false);
      setSubmitted(true);
      window.scrollTo({ top: 150, behavior: 'smooth' });
      return;
    }

    try {
      const payload: Record<string, any> = {
        access_key: accessKey,
        subject: `[야호트래블 견적신청] ${formData.name}님 - ${formData.departureDate} (${getRegionLabel(formData.region)})`,
        from_name: '야호트래블 웹사이트',
        name: formData.name,
        message: generateSummaryText(),
        '신청자(단체명)': formData.name,
        '휴대폰연락처': formData.phone || '미입력',
        '이메일주소': formData.email || '미입력',
        '여행목적': getPurposeLabel(formData.purpose),
        '희망지역': getRegionLabel(formData.region),
        '출발희망일': formData.departureDate,
        '여행기간': formData.duration,
        '성인인원': `${formData.adultCount}명`,
        '소아인원': formData.childCount > 0 ? `${formData.childCount}명` : '없음',
        '상세요청사항': formData.customRequests.trim() || '없음',
      };

      if (formData.email?.trim()) {
        payload.email = formData.email.trim();
        payload.replyto = formData.email.trim();
      }

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (data.success) {
        setEmailSentStatus('success');
      } else {
        console.warn('Web3Forms response:', data);
        setEmailSentStatus('failed');
      }
    } catch (err) {
      console.error('Web3Forms network error:', err);
      setEmailSentStatus('failed');
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
      window.scrollTo({ top: 150, behavior: 'smooth' });
    }
  };

  // 고객이 입력한 연락처 요약 (전화번호 또는 이메일)
  const contactDisplay = [formData.phone, formData.email].filter(Boolean).join(' / ');

  return (
    <div className="py-16 sm:py-20 bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* 상단 타이틀 */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-block px-3 py-1 rounded-full bg-yaho-navy-100 text-yaho-navy-900 text-xs sm:text-sm font-extrabold tracking-wider uppercase">
            CUSTOM ESTIMATE & INQUIRY
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-yaho-navy-950 tracking-tight">
            맞춤 여행 견적 및 상담 신청
          </h1>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            원하시는 인원과 일정, 여행 목적을 남겨주시면 <strong>20년 현지 전문가 진대원 대표</strong>가 직접 검토 후 가장 알맞은 단독 제안서와 견적을 신속히 회신드립니다.
          </p>
        </div>

        {/* 상단 빠른 상담 배너 */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-yaho-navy-900 text-yaho-gold-400 flex items-center justify-center flex-shrink-0">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase">전화로 바로 상담하기</span>
              <p className="text-2xl font-black text-yaho-navy-950">{COMPANY_INFO.tel}</p>
            </div>
          </div>
          <a
            href={COMPANY_INFO.kakaoChannelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#FEE500] hover:bg-[#FADA0A] text-[#191919] font-black text-sm flex items-center justify-center gap-2 shadow-sm transition-transform hover:scale-105"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            <span>카카오톡 1:1 실시간 상담하기</span>
          </a>
        </div>

        {/* 견적 폼 영역 */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-xl">
          {submitted ? (
            <div className="py-8 space-y-8 animate-fadeIn">
              
              {/* 상단 완료 안내 (내부 이메일 주소 절대 미노출, 고객용 정갈한 안내) */}
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
                </div>
                
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>견적 신청서 정상 접수 완료</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-yaho-navy-950">
                    맞춤 여행 견적 신청이 완료되었습니다!
                  </h3>
                </div>

                <p className="text-slate-600 text-base max-w-lg mx-auto leading-relaxed">
                  남겨주신 연락처(<strong className="text-slate-900">{contactDisplay}</strong>)로 
                  진대원 대표가 일정을 검토한 후 신속하게 맞춤 제안서를 안내해 드리겠습니다.
                </p>
              </div>

              {/* 작성된 신청서 요약 카드 */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-slate-800 space-y-4 max-w-2xl mx-auto">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <span className="font-extrabold text-sm text-yaho-navy-900 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    접수된 견적 신청서 내용
                  </span>
                  <button
                    onClick={handleCopySummary}
                    className="text-xs font-bold text-slate-600 hover:text-yaho-navy-900 flex items-center gap-1 bg-white px-2.5 py-1 rounded border border-slate-200 transition-colors shadow-sm"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-600">복사 완료!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>내용 복사</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                  <p><span className="text-slate-500">신청자:</span> <strong className="text-slate-900">{formData.name}</strong></p>
                  {formData.phone && <p><span className="text-slate-500">휴대폰:</span> <strong className="text-slate-900">{formData.phone}</strong></p>}
                  {formData.email && <p><span className="text-slate-500">이메일:</span> <strong className="text-slate-900">{formData.email}</strong></p>}
                  <p><span className="text-slate-500">여행지:</span> <strong className="text-slate-900">{getRegionLabel(formData.region)}</strong></p>
                  <p><span className="text-slate-500">일정:</span> <strong className="text-slate-900">{formData.departureDate} ({formData.duration})</strong></p>
                  <p><span className="text-slate-500">인원:</span> <strong className="text-slate-900">성인 {formData.adultCount}명 {formData.childCount > 0 ? `, 소아 ${formData.childCount}명` : ''}</strong></p>
                  <p><span className="text-slate-500">여행목적:</span> <strong className="text-slate-900">{getPurposeLabel(formData.purpose)}</strong></p>
                </div>

                {formData.customRequests.trim() && (
                  <div className="pt-2 border-t border-slate-200/80 text-xs sm:text-sm">
                    <span className="text-slate-500 block mb-1">상세 요청사항:</span>
                    <p className="p-3 bg-white rounded-xl border border-slate-200 text-slate-700 whitespace-pre-line leading-relaxed">
                      {formData.customRequests}
                    </p>
                  </div>
                )}
              </div>

              {/* 전송 액션 버튼 모음 */}
              <div className="max-w-2xl mx-auto space-y-3">
                <div className="text-center text-xs font-bold text-slate-500">
                  더 빠른 실시간 상담을 원하시면 카카오톡 1:1 상담창으로 바로 문의하실 수 있습니다:
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* 카카오톡 1:1 채팅방 직행 */}
                  <button
                    onClick={handleSendViaKakao}
                    className="w-full py-3.5 px-4 rounded-xl bg-[#FEE500] hover:bg-[#FADA0A] text-[#191919] font-black text-sm flex items-center justify-center gap-2 shadow-md transition-all hover:scale-[1.02]"
                  >
                    <MessageCircle className="w-5 h-5 fill-current" />
                    <span>카톡 1:1 채팅으로 빠른 상담</span>
                  </button>

                  {/* 이메일 프로그램 직통 열기 (내부 주소 숨김) */}
                  <button
                    onClick={handleSendViaMailto}
                    className="w-full py-3.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all hover:scale-[1.02]"
                  >
                    <Mail className="w-4 h-4 text-yaho-gold-400" />
                    <span>내 메일 프로그램으로 내용 전송</span>
                  </button>
                </div>

                <div className="text-center pt-2">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData((prev) => ({ ...prev, name: '', phone: '', email: '', customRequests: '' }));
                    }}
                    className="text-xs text-slate-500 hover:text-slate-800 underline"
                  >
                    새로운 견적 신청서 작성하기
                  </button>
                </div>
              </div>

            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* 섹션 1: 여행 목적 및 지역 선택 */}
              <div className="space-y-4">
                <h3 className="text-lg font-black text-yaho-navy-950 flex items-center gap-2 border-b border-slate-100 pb-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-yaho-gold-500"></span>
                  1. 여행 목적 및 희망 지역
                </h3>

                {/* 여행 목적 라디오 버튼 카드 */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'private_family', label: '소규모 프라이빗 투어', desc: '4~8인 가족/친목 단독 차량' },
                    { id: 'corporate_incentive', label: '우리끼리 맞춤 단체 여행', desc: '친목회·동호회·대가족 힐링 단체' },
                    { id: 'golf_hotspring', label: '힐링 온천 & 골프 투어', desc: '명문 골프장 & 최고급 료칸' },
                  ].map((p) => (
                    <label
                      key={p.id}
                      className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                        formData.purpose === p.id
                          ? 'border-yaho-navy-900 bg-yaho-navy-50/70 shadow-sm'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <input
                        type="radio"
                        name="purpose"
                        value={p.id}
                        checked={formData.purpose === p.id}
                        onChange={() => setFormData({ ...formData, purpose: p.id as any })}
                        className="sr-only"
                      />
                      <span className="font-black text-slate-900 text-base">{p.label}</span>
                      <span className="text-xs text-slate-500 mt-1">{p.desc}</span>
                    </label>
                  ))}
                </div>

                {/* 희망 지역 및 기간 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">
                      여행 희망 지역 <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.region}
                      onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-slate-800 text-base font-medium focus:ring-2 focus:ring-yaho-navy-900 focus:border-yaho-navy-900 outline-none"
                    >
                      <option value="fukuoka">1. 후쿠오카·규슈 (벳부,구마모토,가고시마)등 전지역</option>
                      <option value="matsuyama">2. 마쓰야마·시코쿠(다카마쓰, 고치)등 전지역</option>
                      <option value="honshu">3. 도쿄·혼슈(오사카,나고야,도야마)등 전지역</option>
                      <option value="sapporo">4. 삿포로·홋카이도(오타루,하코다테,비에이)등 전지역</option>
                      <option value="okinawa">5. 나하·오키나와(남부,중부,북부섬)등 전지역</option>
                      <option value="custom">6. 기타 일본 전지역 단독 맞춤 기획</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">
                      희망 여행 기간
                    </label>
                    <select
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-slate-800 text-base font-medium focus:ring-2 focus:ring-yaho-navy-900 focus:border-yaho-navy-900 outline-none"
                    >
                      <option value="2박 3일">2박 3일</option>
                      <option value="3박 4일">3박 4일 (가장 선호)</option>
                      <option value="4박 5일">4박 5일</option>
                      <option value="기타 맞춤">기타 맞춤 일정</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* 섹션 2: 일정 및 인원 */}
              <div className="space-y-4">
                <h3 className="text-lg font-black text-yaho-navy-950 flex items-center gap-2 border-b border-slate-100 pb-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-yaho-gold-500"></span>
                  2. 출발 일정 및 예상 인원
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      출발 희망일 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={formData.departureDate}
                      onChange={(e) => {
                        setFormData({ ...formData, departureDate: e.target.value });
                        if (errors.departureDate) setErrors({ ...errors, departureDate: '' });
                      }}
                      className={`w-full px-4 py-3 rounded-xl border text-base font-medium focus:ring-2 focus:ring-yaho-navy-900 outline-none ${
                        errors.departureDate ? 'border-red-500 bg-red-50' : 'border-slate-300'
                      }`}
                    />
                    {errors.departureDate && <p className="text-xs text-red-500 mt-1 font-semibold">{errors.departureDate}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-slate-400" />
                      성인 인원 (중학생 이상)
                    </label>
                    <div className="flex items-center">
                      <input
                        type="number"
                        min="1"
                        max="100"
                        value={formData.adultCount}
                        onChange={(e) => setFormData({ ...formData, adultCount: parseInt(e.target.value) || 1 })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-base font-medium focus:ring-2 focus:ring-yaho-navy-900 outline-none"
                      />
                      <span className="ml-2 text-sm font-bold text-slate-600 flex-shrink-0">명</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-slate-400" />
                      소아/유아 (선택)
                    </label>
                    <div className="flex items-center">
                      <input
                        type="number"
                        min="0"
                        max="50"
                        value={formData.childCount}
                        onChange={(e) => setFormData({ ...formData, childCount: parseInt(e.target.value) || 0 })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-base font-medium focus:ring-2 focus:ring-yaho-navy-900 outline-none"
                      />
                      <span className="ml-2 text-sm font-bold text-slate-600 flex-shrink-0">명</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 섹션 3: 신청자 정보 및 연락처 (휴대폰 또는 이메일 중 1개 이상 필수) */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-3 gap-2">
                  <h3 className="text-lg font-black text-yaho-navy-950 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-yaho-gold-500"></span>
                    3. 신청자 정보 및 연락처
                  </h3>
                  <span className="text-xs font-bold text-yaho-navy-800 bg-yaho-navy-100 px-3 py-1 rounded-full self-start sm:self-auto">
                    * 휴대폰 또는 이메일 중 최소 1개 필수 입력
                  </span>
                </div>

                {/* 전체 연락처 미입력 시 통합 경고 */}
                {errors.contact && (
                  <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-red-600 text-xs sm:text-sm font-bold animate-fadeIn">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{errors.contact}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* 신청자 성함 */}
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">
                      성함 / 단체명 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="예: 홍길동 (또는 OO정밀)"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: '' });
                      }}
                      className={`w-full px-4 py-3 rounded-xl border text-base font-medium focus:ring-2 focus:ring-yaho-navy-900 outline-none ${
                        errors.name ? 'border-red-500 bg-red-50' : 'border-slate-300'
                      }`}
                    />
                    {errors.name && <p className="text-xs text-red-500 mt-1 font-semibold">{errors.name}</p>}
                  </div>

                  {/* 휴대폰 연락처 */}
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5 flex items-center justify-between">
                      <span>휴대폰 연락처</span>
                      <span className="text-xs text-slate-400 font-normal">문자/카톡 수신용</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="010-1234-5678"
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      maxLength={13}
                      className={`w-full px-4 py-3 rounded-xl border text-base font-medium focus:ring-2 focus:ring-yaho-navy-900 outline-none ${
                        errors.phone || errors.contact ? 'border-red-400 bg-red-50/50' : 'border-slate-300'
                      }`}
                    />
                    {errors.phone && <p className="text-xs text-red-500 mt-1 font-semibold">{errors.phone}</p>}
                  </div>

                  {/* 연락받을 이메일 주소 */}
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5 flex items-center justify-between">
                      <span>이메일 주소</span>
                      <span className="text-xs text-slate-400 font-normal">견적서 수신용</span>
                    </label>
                    <input
                      type="email"
                      placeholder="example@naver.com"
                      value={formData.email || ''}
                      onChange={handleEmailChange}
                      className={`w-full px-4 py-3 rounded-xl border text-base font-medium focus:ring-2 focus:ring-yaho-navy-900 outline-none ${
                        errors.email || errors.contact ? 'border-red-400 bg-red-50/50' : 'border-slate-300'
                      }`}
                    />
                    {errors.email && <p className="text-xs text-red-500 mt-1 font-semibold">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">
                    추가 문의 및 희망 요청사항 (선택)
                  </label>
                  <textarea
                    rows={4}
                    placeholder="희망하시는 숙소 조건(온천 노천탕 필수, 단독 연회장 등), 식사 취향(와규, 스시), 골프 라운딩 희망 홀수 등을 자유롭게 적어주세요."
                    value={formData.customRequests}
                    onChange={(e) => setFormData({ ...formData, customRequests: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-base font-medium focus:ring-2 focus:ring-yaho-navy-900 outline-none resize-none"
                  />
                </div>
              </div>

              {/* 개인정보 수집 및 이용 동의 */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.agreedToPrivacy}
                    onChange={(e) => {
                      setFormData({ ...formData, agreedToPrivacy: e.target.checked });
                      if (errors.agreedToPrivacy) setErrors({ ...errors, agreedToPrivacy: '' });
                    }}
                    className="w-5 h-5 rounded border-slate-300 text-yaho-navy-900 focus:ring-yaho-navy-900 mt-0.5"
                  />
                  <div className="text-xs sm:text-sm text-slate-600">
                    <span className="font-bold text-slate-800">[필수] 개인정보 수집 및 이용 동의</span>: 
                    맞춤 여행 상담 및 견적 안내를 위해 성함, 연락처(휴대폰 또는 이메일) 정보를 수집하며, 목적 달성 후 안전하게 파기됩니다.
                  </div>
                </label>
                {errors.agreedToPrivacy && (
                  <p className="text-xs text-red-500 mt-2 font-semibold">{errors.agreedToPrivacy}</p>
                )}
              </div>

              {/* 제출 버튼 */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 rounded-2xl bg-yaho-navy-900 hover:bg-yaho-navy-800 text-white font-black text-lg shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>견적 신청서 전송 중...</span>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>맞춤 여행 견적 신청 완료하기</span>
                  </>
                )}
              </button>

              <div className="text-center text-xs text-slate-400 flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>야호트래블은 고객님의 소중한 개인정보를 안전하게 보호하며 마케팅용으로 활용하지 않습니다.</span>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
