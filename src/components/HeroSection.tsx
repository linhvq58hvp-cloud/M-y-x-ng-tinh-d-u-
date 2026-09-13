import React, { useState, useEffect, useRef, useCallback } from 'react';
import { BRAND_INFO, HERO_SLIDES, HeroSlideItem } from '../data/productData';
import { 
  Star, Gift, Truck, ShieldCheck, ArrowRight, Car, Sparkles, Flame, Check,
  ChevronLeft, ChevronRight, X, Play
} from 'lucide-react';

interface HeroSectionProps {
  onQuickReserve: (name: string, phone: string) => void;
  onOrderClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onQuickReserve, onOrderClick }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isReserved, setIsReserved] = useState(false);
  const [countdown, setCountdown] = useState<number>(60);

  // Million-Dollar Carousel States
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [isZoomOpen, setIsZoomOpen] = useState<boolean>(false);

  const slides: HeroSlideItem[] = HERO_SLIDES;
  const DEFAULT_SLIDE_DURATION = 4500; // 4.5 seconds for standard images
  const currentSlideDuration = slides[activeSlide]?.durationMs || DEFAULT_SLIDE_DURATION;
  const TICK_INTERVAL = 50; // smooth 50ms ticks

  // Touch swipe handling
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const handleNextSlide = useCallback(() => {
    setActiveSlide((prev) => (prev < slides.length - 1 ? prev + 1 : 0));
    setProgress(0);
  }, [slides.length]);

  const handlePrevSlide = useCallback(() => {
    setActiveSlide((prev) => (prev > 0 ? prev - 1 : slides.length - 1));
    setProgress(0);
  }, [slides.length]);

  // Smooth Auto-Play Progress Loop (Like Apple / Tesla / Porsche luxury showcases)
  useEffect(() => {
    if (!isPlaying || isHovered || isZoomOpen) return;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + (TICK_INTERVAL / currentSlideDuration) * 100;
        if (next >= 100) {
          handleNextSlide();
          return 0;
        }
        return next;
      });
    }, TICK_INTERVAL);

    return () => clearInterval(timer);
  }, [isPlaying, isHovered, isZoomOpen, currentSlideDuration, handleNextSlide]);

  // Keyboard navigation for zoom modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isZoomOpen) return;
      if (e.key === 'Escape') setIsZoomOpen(false);
      if (e.key === 'ArrowRight') handleNextSlide();
      if (e.key === 'ArrowLeft') handlePrevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isZoomOpen, handleNextSlide, handlePrevSlide]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsHovered(true);
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    setIsHovered(false);
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 40) {
      handleNextSlide();
    } else if (distance < -40) {
      handlePrevSlide();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 1 ? prev - 1 : 60));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleButtonClick = (e?: React.FormEvent | React.MouseEvent) => {
    if (e) e.preventDefault();
    if (name || phone) {
      onQuickReserve(name, phone);
    }
    setIsReserved(true);
    onOrderClick();
    setTimeout(() => {
      setIsReserved(false);
    }, 1500);
  };

  return (
    <section className="relative w-full pt-16 sm:pt-20 pb-8 sm:pb-12 md:pt-20 md:pb-14 overflow-hidden bg-[#131313]" id="product">
      {/* Visual Halo Light Ambient Bloom */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 md:w-[600px] md:h-[600px] bg-[#c5a059]/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -top-10 right-10 w-72 h-72 bg-[#e9c176]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-12 items-start">
          
          {/* Left Column (Desktop) / Top (Mobile): Authentic Luxury Product Imagery */}
          <div className="lg:col-span-6 flex flex-col items-center">
            {/* Pure, clear Luxury Product Imagery - Million-Dollar Auto-Slider Frame */}
            <div
              className="relative w-full max-w-lg aspect-square rounded-2xl overflow-hidden bg-gradient-to-b from-[#181613] via-[#121212] to-[#0a0a0a] border border-[#c5a059]/40 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95),0_0_30px_rgba(197,160,89,0.12)] group select-none"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* Million-Dollar Segmented Progress Indicators (Apple / Tesla Style) */}
              <div className="absolute top-2.5 inset-x-3.5 z-20 flex items-center gap-1.5 pointer-events-none">
                {slides.map((_, idx) => (
                  <div
                    key={idx}
                    className="flex-1 h-1 rounded-full bg-black/50 backdrop-blur-sm overflow-hidden border border-white/10 shadow-sm"
                  >
                    <div
                      className="h-full bg-gradient-to-r from-[#c5a059] to-[#e9c176] transition-all"
                      style={{
                        width:
                          idx < activeSlide
                            ? '100%'
                            : idx === activeSlide
                            ? `${progress}%`
                            : '0%',
                        transitionDuration: idx === activeSlide ? '50ms' : '0ms'
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Sliding Track */}
              <div
                className="flex w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{ transform: `translateX(-${activeSlide * 100}%)` }}
              >
                {slides.map((slide, index) => (
                  <div
                    key={slide.id || index}
                    className="w-full h-full shrink-0 relative flex items-center justify-center bg-[#0d0d0d] cursor-zoom-in overflow-hidden"
                    onClick={() => setIsZoomOpen(true)}
                  >
                    {slide.isVideo ? (
                      <div className="w-full h-full relative flex items-center justify-center">
                        <video
                          src={slide.videoUrl}
                          poster={slide.url}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-full object-cover object-center"
                          onError={(e) => {
                            if (slide.videoFallbackUrl && e.currentTarget.src !== slide.videoFallbackUrl) {
                              e.currentTarget.src = slide.videoFallbackUrl;
                            }
                          }}
                        />
                        {/* Subtle Badge for Video */}
                        <div className="absolute bottom-3 left-3 z-10 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-[#c5a059]/40 flex items-center gap-1.5 text-[10px] text-[#e9c176] font-medium pointer-events-none">
                          <Play className="w-2.5 h-2.5 fill-[#e9c176]" />
                          <span>Video 4K • Tự Động Lặp</span>
                        </div>
                      </div>
                    ) : (
                      <img
                        src={slide.url}
                        alt={slide.alt || BRAND_INFO.name}
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          // Fallback to high-speed CDN if local asset is loading
                          if (e.currentTarget.src !== slide.fallbackUrl) {
                            e.currentTarget.src = slide.fallbackUrl;
                          }
                        }}
                        className="w-full h-full object-contain sm:object-cover object-center transition-transform duration-700"
                        draggable={false}
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Navigation Arrows */}
              {slides.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrevSlide();
                    }}
                    aria-label="Ảnh trước"
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-[#0e0e0e]/80 backdrop-blur-md border border-[#c5a059]/40 text-[#d1c5b4] hover:text-[#261900] hover:bg-[#c5a059] flex items-center justify-center transition-all opacity-80 group-hover:opacity-100 hover:scale-105 shadow-xl active:scale-95"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNextSlide();
                    }}
                    aria-label="Ảnh tiếp theo"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-[#0e0e0e]/80 backdrop-blur-md border border-[#c5a059]/40 text-[#d1c5b4] hover:text-[#261900] hover:bg-[#c5a059] flex items-center justify-center transition-all opacity-80 group-hover:opacity-100 hover:scale-105 shadow-xl active:scale-95"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Bottom Subtle Navigation Dots */}
              {slides.length > 1 && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0e0e0e]/80 backdrop-blur-md border border-[#4e4639]/40 shadow-lg">
                  {slides.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveSlide(idx);
                        setProgress(0);
                      }}
                      aria-label={`Chuyển đến ảnh ${idx + 1}`}
                      className={`transition-all duration-300 rounded-full ${
                        activeSlide === idx
                          ? 'w-5 h-1.5 bg-[#e9c176]'
                          : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/80'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* 3 Feature highlight badges - Compact micro pills matching logo height (h-6 sm:h-7) */}
            <div className="w-full max-w-lg mt-2.5 grid grid-cols-3 gap-1.5 sm:gap-2 px-0.5">
              <div className="h-6 sm:h-7 flex items-center justify-center text-center gap-1 sm:gap-1.5 px-1.5 sm:px-2 rounded-full bg-[#1c1b1b] border border-[#4e4639]/30 text-[#e9c176]">
                <Star className="w-3 h-3 fill-[#e9c176] text-[#e9c176] shrink-0" />
                <span className="text-[9px] sm:text-[10px] font-medium tracking-wider uppercase leading-none whitespace-nowrap truncate">
                  Apex One
                </span>
              </div>
              <div className="h-6 sm:h-7 flex items-center justify-center text-center gap-1 sm:gap-1.5 px-1.5 sm:px-2 rounded-full bg-[#1c1b1b] border border-[#4e4639]/30 text-[#d1c5b4]">
                <Sparkles className="w-3 h-3 text-[#e9c176] shrink-0" />
                <span className="text-[9px] sm:text-[10px] font-medium tracking-wider uppercase leading-none whitespace-nowrap truncate">
                  Quiet Mist
                </span>
              </div>
              <div className="h-6 sm:h-7 flex items-center justify-center text-center gap-1 sm:gap-1.5 px-1.5 sm:px-2 rounded-full bg-[#1c1b1b] border border-[#4e4639]/30 text-[#e9c176]">
                <Car className="w-3 h-3 text-[#e9c176] shrink-0" />
                <span className="text-[9px] sm:text-[10px] font-medium tracking-wider uppercase leading-none whitespace-nowrap truncate">
                  Phòng &amp; Ô tô
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Details, Pricing, Perks, and Quick Reserve */}
          <div className="lg:col-span-6 flex flex-col gap-3 sm:gap-3.5 text-left pt-1">
            {/* Category tag + Headline group - Balanced editorial spacing */}
            <div className="flex flex-col gap-2.5 sm:gap-3">
              {/* Category tag */}
              <div className="flex items-center gap-2">
                <span className="w-8 h-[1px] bg-[#c5a059]" />
                <p className="text-xs uppercase tracking-[0.25em] text-[#e9c176] font-semibold leading-none">
                  {BRAND_INFO.tagline}
                </p>
              </div>

              {/* Main Headline */}
              <div className="flex flex-col gap-2">
                <h1 className="font-serif text-[24px] text-[#e5e2e1] leading-[1.2] font-medium">
                  MÁY KHUẾCH TÁN TINH DẦU CAO CẤP
                </h1>
                <p className="text-sm sm:text-base text-[#d1c5b4] leading-relaxed max-w-xl">
                  {BRAND_INFO.subtitle}
                </p>
              </div>
            </div>

            {/* Pricing Module - Compact & High-Impact Luxury Banner */}
            <div className="flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#221f19] via-[#1a1916] to-[#171614] border border-[#c5a059]/60 shadow-lg shadow-[#c5a059]/10">
              <div className="flex items-baseline gap-2.5 sm:gap-3 flex-wrap">
                <span className="font-serif text-2xl sm:text-3xl text-[#e9c176] font-bold tracking-tight">
                  {BRAND_INFO.salePrice.toLocaleString('vi-VN')}đ
                </span>
                <span className="text-xs text-[#9a8f80] line-through decoration-[#c5a059]/50 font-medium">
                  {BRAND_INFO.originalPrice.toLocaleString('vi-VN')}đ
                </span>
              </div>
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-[#c5a059] to-[#e9c176] text-[#261900] text-[11px] font-extrabold tracking-wider shadow shrink-0">
                <span>GIẢM 30%</span>
              </div>
            </div>

            {/* Perks Row - Streamlined */}
            <div className="grid grid-cols-3 gap-2">
              <div className="flex flex-col items-center justify-center py-2 px-1.5 sm:px-2 rounded-xl bg-[#1c1b1b] border border-[#4e4639]/30 text-center gap-0.5">
                <Gift className="w-4 h-4 text-[#e9c176]" />
                <span className="text-[10px] sm:text-[11px] text-[#e5e2e1] font-semibold tracking-wider uppercase leading-tight">
                  TẶNG {BRAND_INFO.freeOilVolume} TINH DẦU
                </span>
              </div>
              <div className="flex flex-col items-center justify-center py-2 px-1.5 sm:px-2 rounded-xl bg-[#1c1b1b] border border-[#4e4639]/30 text-center gap-0.5">
                <Truck className="w-4 h-4 text-[#e9c176]" />
                <span className="text-[10px] sm:text-[11px] text-[#e5e2e1] font-semibold tracking-wider uppercase leading-tight">
                  FREESHIP TOÀN QUỐC
                </span>
              </div>
              <div className="flex flex-col items-center justify-center py-2 px-1.5 sm:px-2 rounded-xl bg-[#1c1b1b] border border-[#4e4639]/30 text-center gap-0.5">
                <ShieldCheck className="w-4 h-4 text-[#e9c176]" />
                <span className="text-[10px] sm:text-[11px] text-[#e5e2e1] font-semibold tracking-wider uppercase leading-tight">
                  BẢO HÀNH {BRAND_INFO.warrantyMonths} THÁNG
                </span>
              </div>
            </div>

            {/* Direct Instant Booking / Quick Action */}
            <form onSubmit={handleButtonClick} className="flex flex-col gap-2.5 pt-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Họ và tên của bạn"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#1c1b1b] border border-[#4e4639]/40 text-[#e5e2e1] text-xs sm:text-sm placeholder-[#9a8f80] focus:outline-none focus:border-[#c5a059] transition-colors"
                />
                <input
                  type="tel"
                  placeholder="Số điện thoại nhận ưu đãi"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#1c1b1b] border border-[#4e4639]/40 text-[#e5e2e1] text-xs sm:text-sm placeholder-[#9a8f80] focus:outline-none focus:border-[#c5a059] transition-colors"
                />
              </div>

              {/* Main CTA Button with Dynamic Shimmer Effect */}
              <button
                type="submit"
                className="relative overflow-hidden w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#c5a059] via-[#e9c176] to-[#c5a059] text-[#261900] font-bold text-sm tracking-wider uppercase transition-all duration-300 transform hover:scale-[1.01] active:scale-[0.99] shadow-xl shadow-[#c5a059]/20 hover:shadow-[#c5a059]/35 flex items-center justify-center gap-2 group cursor-pointer"
              >
                {/* Visual subtle reflection light bar */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />
                
                {isReserved ? (
                  <>
                    <Check className="w-5 h-5 text-[#261900] stroke-[3]" />
                    <span>ĐÃ TIẾP NHẬN - CHUYỂN ĐẾN ĐƠN HÀNG...</span>
                  </>
                ) : (
                  <>
                    <Flame className="w-4 h-4 fill-[#261900] text-[#261900]" />
                    <span>ĐẶT MUA NGAY - GIỮ ƯU ĐÃI 30%</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 stroke-[2.5]" />
                  </>
                )}
              </button>
            </form>

            {/* Urgency & Commitment Micro-Footer */}
            <div className="flex items-center justify-between text-[11px] sm:text-xs text-[#9a8f80] px-1 pt-0.5">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#e9c176] animate-ping" />
                <span>Chỉ còn <strong>14 suất</strong> ưu đãi trong ngày</span>
              </span>
              <span className="font-mono text-[#e9c176]">
                Ưu đãi kết thúc sau {countdown}s
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen High-Resolution Lightbox Modal */}
      {isZoomOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 animate-fadeIn"
          onClick={() => setIsZoomOpen(false)}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={() => setIsZoomOpen(false)}
            aria-label="Đóng xem chi tiết"
            className="absolute top-4 right-4 z-50 w-11 h-11 rounded-full bg-[#1c1b1b] border border-[#c5a059]/50 text-[#e5e2e1] hover:text-[#e9c176] flex items-center justify-center transition-all hover:scale-110 shadow-2xl"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Modal Prev / Next */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handlePrevSlide();
            }}
            aria-label="Ảnh trước"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-[#1c1b1b]/90 border border-[#c5a059]/50 text-[#e5e2e1] hover:text-[#e9c176] hover:border-[#e9c176] flex items-center justify-center transition-all shadow-2xl"
          >
            <ChevronLeft className="w-7 h-7" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleNextSlide();
            }}
            aria-label="Ảnh tiếp theo"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-[#1c1b1b]/90 border border-[#c5a059]/50 text-[#e5e2e1] hover:text-[#e9c176] hover:border-[#e9c176] flex items-center justify-center transition-all shadow-2xl"
          >
            <ChevronRight className="w-7 h-7" />
          </button>

          {/* Zoomed Image/Video Container */}
          <div
            className="relative max-w-4xl max-h-[85vh] w-full flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {slides[activeSlide]?.isVideo ? (
              <video
                src={slides[activeSlide]?.videoUrl}
                poster={slides[activeSlide]?.url}
                autoPlay
                loop
                muted
                playsInline
                className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl border border-[#c5a059]/40 bg-black"
                onError={(e) => {
                  if (slides[activeSlide]?.videoFallbackUrl && e.currentTarget.src !== slides[activeSlide]?.videoFallbackUrl) {
                    e.currentTarget.src = slides[activeSlide]?.videoFallbackUrl!;
                  }
                }}
              />
            ) : (
              <img
                src={slides[activeSlide]?.url}
                alt={slides[activeSlide]?.alt}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  if (e.currentTarget.src !== slides[activeSlide]?.fallbackUrl) {
                    e.currentTarget.src = slides[activeSlide]?.fallbackUrl;
                  }
                }}
                className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl border border-[#c5a059]/40"
              />
            )}
            <div className="mt-3 px-4 py-1.5 rounded-full bg-[#1c1b1b] border border-[#c5a059]/30 text-[#e9c176] text-xs font-serif tracking-wide">
              0{activeSlide + 1} / 0{slides.length} • {slides[activeSlide]?.title}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
