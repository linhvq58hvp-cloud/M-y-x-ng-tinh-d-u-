import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ProblemSection } from './components/ProblemSection';
import { ProductIntro } from './components/ProductIntro';
import { FeaturesSection } from './components/FeaturesSection';
import { SpacesSection } from './components/SpacesSection';
import { TechnologySection } from './components/TechnologySection';
import { UsageGuide } from './components/UsageGuide';
import { ScentCollection } from './components/ScentCollection';
import { SpecificationsTable } from './components/SpecificationsTable';
import { ReviewsSection } from './components/ReviewsSection';
import { PromoBundleSection } from './components/PromoBundleSection';
import { PoliciesSection } from './components/PoliciesSection';
import { FaqSection } from './components/FaqSection';
import { OrderFormSection } from './components/OrderFormSection';
import { Footer } from './components/Footer';
import { MobileStickyBar } from './components/MobileStickyBar';
import { 
  Star, 
  ShoppingBag, 
  X, 
  ArrowRight, 
  HelpCircle, 
  ShieldCheck 
} from 'lucide-react';

export type MainTabType = 'product' | 'spaces' | 'scents' | 'reviews_faq';
export type SubTabType = 'all' | 'reviews' | 'faq' | 'policies';

export default function App() {
  const [activeTab, setActiveTab] = useState<MainTabType>('product');
  const [reviewsFaqSubTab, setReviewsFaqSubTab] = useState<SubTabType>('all');
  const [selectedScentId, setSelectedScentId] = useState<string>('citrus');
  const [reservedName, setReservedName] = useState<string>('');
  const [reservedPhone, setReservedPhone] = useState<string>('');
  const [isOrderModalOpen, setIsOrderModalOpen] = useState<boolean>(false);

  // Sync with URL Hash on load & hashchange
  useEffect(() => {
    const parseHash = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (hash === 'spaces') {
        setActiveTab('spaces');
      } else if (hash === 'scents') {
        setActiveTab('scents');
      } else if (hash === 'reviews') {
        setActiveTab('reviews_faq');
        setReviewsFaqSubTab('reviews');
      } else if (hash === 'faq') {
        setActiveTab('reviews_faq');
        setReviewsFaqSubTab('faq');
      } else if (hash === 'specs' || hash === 'features' || hash === 'product') {
        setActiveTab('product');
      } else if (hash === 'order') {
        setIsOrderModalOpen(true);
      }
    };

    parseHash();
    window.addEventListener('hashchange', parseHash);
    return () => window.removeEventListener('hashchange', parseHash);
  }, []);

  const handleTabChange = (tabId: string, subTab?: string) => {
    if (tabId === 'product' || tabId === 'spaces' || tabId === 'scents' || tabId === 'reviews_faq') {
      setActiveTab(tabId as MainTabType);
      if (tabId === 'reviews_faq' && subTab) {
        setReviewsFaqSubTab(subTab as SubTabType);
      } else if (tabId === 'reviews_faq' && !subTab) {
        setReviewsFaqSubTab('all');
      }
      window.history.replaceState(null, '', `#${subTab || tabId}`);
    } else if (tabId === 'reviews') {
      setActiveTab('reviews_faq');
      setReviewsFaqSubTab('reviews');
      window.history.replaceState(null, '', '#reviews');
    } else if (tabId === 'faq') {
      setActiveTab('reviews_faq');
      setReviewsFaqSubTab('faq');
      window.history.replaceState(null, '', '#faq');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToOrderForm = () => {
    setIsOrderModalOpen(true);
  };

  const handleQuickReserve = (name: string, phone: string) => {
    setReservedName(name);
    setReservedPhone(phone);
    setIsOrderModalOpen(true);
  };

  const handleSelectScentForSpace = (scentHint: string) => {
    const lower = scentHint.toLowerCase();
    if (lower.includes('woody')) setSelectedScentId('woody');
    else if (lower.includes('citrus')) setSelectedScentId('citrus');
    else if (lower.includes('fresh')) setSelectedScentId('fresh');
    else if (lower.includes('floral')) setSelectedScentId('floral');
    else if (lower.includes('luxury')) setSelectedScentId('luxury');
    // Switch to scent page so the user can explore that scent in detail
    handleTabChange('scents');
  };

  return (
    <div className="min-h-screen bg-[#131313] text-[#e5e2e1] flex flex-col antialiased selection:bg-[#c5a059] selection:text-[#121212]">
      {/* Fixed Luxury Header */}
      <Header
        onOrderClick={scrollToOrderForm}
        activeTab={activeTab}
        reviewsFaqSubTab={reviewsFaqSubTab}
        onTabChange={handleTabChange}
      />

      {/* Main Container */}
      <main className="flex-1 flex flex-col w-full pt-[56px] sm:pt-[64px] pb-16 lg:pb-0">
        {/* ========================================================= */}
        {/* 1. TAB SẢN PHẨM: Chỉ hiển thị nội dung xoay quanh sản phẩm */}
        {/* ========================================================= */}
        {activeTab === 'product' && (
          <div className="flex flex-col w-full animate-fadeIn">
            {/* Hero Showcase & Quick Reserve */}
            <HeroSection
              onQuickReserve={handleQuickReserve}
              onOrderClick={scrollToOrderForm}
            />

            {/* Problem Statement & Solution */}
            <ProblemSection />

            {/* Product Introduction & Architectural Callout */}
            <ProductIntro />

            {/* 5 Outstanding Features */}
            <FeaturesSection onOrderClick={scrollToOrderForm} />

            {/* Technology & Cold Air Diffusion Comparison */}
            <TechnologySection />

            {/* Technical Specifications */}
            <SpecificationsTable onOrderClick={scrollToOrderForm} />

            {/* 3-Step Simple Usage Guide */}
            <UsageGuide />

            {/* Bottom Navigation CTA Banner */}
            <section className="py-12 px-4 sm:px-6 bg-[#0e0e0e] border-t border-[#4e4639]/30">
              <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 p-6 sm:p-8 rounded-2xl bg-[#1c1b1b] border border-[#c5a059]/30 shadow-xl">
                <div className="flex flex-col gap-1.5 text-center sm:text-left">
                  <span className="text-xs uppercase tracking-widest text-[#e9c176] font-semibold">
                    Bước tiếp theo
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl text-[#e5e2e1]">
                    Khám phá máy trên từng không gian sống
                  </h3>
                  <p className="text-xs sm:text-sm text-[#d1c5b4]">
                    Xem phối cảnh 7 không gian từ phòng khách, phòng ngủ đến xe hơi và văn phòng.
                  </p>
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => handleTabChange('spaces')}
                    className="flex-1 sm:flex-initial px-5 py-3 rounded-xl border border-[#c5a059]/60 hover:border-[#e9c176] text-[#e9c176] text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#c5a059]/10 transition-all"
                  >
                    <span>Xem Không Gian</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={scrollToOrderForm}
                    className="flex-1 sm:flex-initial px-5 py-3 rounded-xl bg-gradient-to-r from-[#c5a059] to-[#e9c176] hover:from-[#d4af37] hover:to-[#ffdea5] text-[#261900] text-xs font-bold uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 transition-all"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Đặt Hàng Ngay</span>
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ========================================================= */}
        {/* 2. TAB KHÔNG GIAN: Chỉ hiển thị nội dung về không gian     */}
        {/* ========================================================= */}
        {activeTab === 'spaces' && (
          <div className="flex flex-col w-full animate-fadeIn">
            {/* Header intro for Spaces */}
            <div className="w-full pt-10 pb-4 px-4 sm:px-6 text-center max-w-3xl mx-auto">
              <span className="text-xs uppercase tracking-[0.3em] text-[#e9c176] font-semibold">
                BỐ CỤC & PHONG CÁCH
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#e5e2e1] font-medium mt-1">
                7 KHÔNG GIAN SỐNG ĐẲNG CẤP
              </h1>
              <p className="text-sm text-[#d1c5b4] mt-2">
                Nova Privée Apex One được thiết kế để hòa quyện hài hòa vào mọi góc sống thượng lưu.
              </p>
            </div>

            {/* Spaces & Lifestyle (7 Spaces) */}
            <SpacesSection
              onSelectScentForSpace={handleSelectScentForSpace}
              onOrderClick={scrollToOrderForm}
            />

            {/* Bottom Navigation CTA Banner */}
            <section className="py-12 px-4 sm:px-6 bg-[#0e0e0e] border-t border-[#4e4639]/30">
              <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 p-6 sm:p-8 rounded-2xl bg-[#1c1b1b] border border-[#c5a059]/30 shadow-xl">
                <div className="flex flex-col gap-1.5 text-center sm:text-left">
                  <span className="text-xs uppercase tracking-widest text-[#e9c176] font-semibold">
                    Khám phá tiếp theo
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl text-[#e5e2e1]">
                    Chọn mùi hương Haute Parfumerie cho phòng của bạn
                  </h3>
                  <p className="text-xs sm:text-sm text-[#d1c5b4]">
                    Tìm hiểu 5 nốt hương tinh tế từ Citrus Serenity đến Woody Mystique.
                  </p>
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => handleTabChange('scents')}
                    className="flex-1 sm:flex-initial px-5 py-3 rounded-xl border border-[#c5a059]/60 hover:border-[#e9c176] text-[#e9c176] text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#c5a059]/10 transition-all"
                  >
                    <span>Khám Phá Mùi Hương</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={scrollToOrderForm}
                    className="flex-1 sm:flex-initial px-5 py-3 rounded-xl bg-gradient-to-r from-[#c5a059] to-[#e9c176] text-[#261900] text-xs font-bold uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 transition-all"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Đặt Hàng Ngay</span>
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ========================================================= */}
        {/* 3. TAB MÙI HƯƠNG: Chỉ hiển thị nội dung về mùi hương        */}
        {/* ========================================================= */}
        {activeTab === 'scents' && (
          <div className="flex flex-col w-full animate-fadeIn">
            {/* Scent Collection (5 Fragrance Profiles & Pyramid) */}
            <ScentCollection
              selectedScentId={selectedScentId}
              onSelectScent={setSelectedScentId}
              onOrderClick={scrollToOrderForm}
            />

            {/* Bottom Navigation CTA Banner */}
            <section className="py-12 px-4 sm:px-6 bg-[#0e0e0e] border-t border-[#4e4639]/30">
              <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 p-6 sm:p-8 rounded-2xl bg-[#1c1b1b] border border-[#c5a059]/30 shadow-xl">
                <div className="flex flex-col gap-1.5 text-center sm:text-left">
                  <span className="text-xs uppercase tracking-widest text-[#e9c176] font-semibold">
                    Đặc quyền hôm nay
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl text-[#e5e2e1]">
                    Tặng ngay chai 10ml tinh dầu cao cấp
                  </h3>
                  <p className="text-xs sm:text-sm text-[#d1c5b4]">
                    Chọn mùi hương bạn yêu thích trong form đặt hàng để nhận ngay trọn bộ ưu đãi.
                  </p>
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => handleTabChange('reviews_faq')}
                    className="flex-1 sm:flex-initial px-5 py-3 rounded-xl border border-[#c5a059]/60 hover:border-[#e9c176] text-[#e9c176] text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#c5a059]/10 transition-all"
                  >
                    <span>Xem Đánh Giá & FAQ</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={scrollToOrderForm}
                    className="flex-1 sm:flex-initial px-5 py-3 rounded-xl bg-gradient-to-r from-[#c5a059] to-[#e9c176] text-[#261900] text-xs font-bold uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 transition-all"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Đặt Hàng & Nhận Quà</span>
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ========================================================= */}
        {/* 4. TAB ĐÁNH GIÁ & FAQ: Chỉ hiển thị review, FAQ, chính sách */}
        {/* ========================================================= */}
        {activeTab === 'reviews_faq' && (
          <div className="flex flex-col w-full animate-fadeIn">
            {/* Header intro & Sub-navigation filter */}
            <div className="w-full pt-10 pb-4 px-4 sm:px-6 text-center max-w-3xl mx-auto">
              <span className="text-xs uppercase tracking-[0.3em] text-[#e9c176] font-semibold">
                TRẢI NGHIỆM & CAM KẾT
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#e5e2e1] font-medium mt-1">
                ĐÁNH GIÁ KHÁCH HÀNG & HỎI ĐÁP FAQ
              </h1>
              <p className="text-sm text-[#d1c5b4] mt-2">
                Hơn 2.800+ khách hàng tinh hoa đã tin dùng Nova Privée Apex One trên toàn quốc.
              </p>

              {/* Sub-tabs filter */}
              <div className="mt-6 inline-flex items-center justify-center p-1 rounded-2xl bg-[#1c1b1b] border border-[#4e4639]/40 gap-1">
                <button
                  type="button"
                  onClick={() => setReviewsFaqSubTab('all')}
                  className={`px-3 sm:px-4 py-1.5 rounded-xl text-xs font-medium transition-all ${
                    reviewsFaqSubTab === 'all'
                      ? 'bg-[#c5a059] text-[#131313] font-bold shadow'
                      : 'text-[#cac6c1] hover:text-[#e9c176]'
                  }`}
                >
                  Tất cả
                </button>
                <button
                  type="button"
                  onClick={() => setReviewsFaqSubTab('reviews')}
                  className={`px-3 sm:px-4 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 ${
                    reviewsFaqSubTab === 'reviews'
                      ? 'bg-[#c5a059] text-[#131313] font-bold shadow'
                      : 'text-[#cac6c1] hover:text-[#e9c176]'
                  }`}
                >
                  <Star className="w-3 h-3" />
                  <span>Đánh giá</span>
                </button>
                <button
                  type="button"
                  onClick={() => setReviewsFaqSubTab('faq')}
                  className={`px-3 sm:px-4 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 ${
                    reviewsFaqSubTab === 'faq'
                      ? 'bg-[#c5a059] text-[#131313] font-bold shadow'
                      : 'text-[#cac6c1] hover:text-[#e9c176]'
                  }`}
                >
                  <HelpCircle className="w-3 h-3" />
                  <span>Hỏi đáp (FAQ)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setReviewsFaqSubTab('policies')}
                  className={`px-3 sm:px-4 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 ${
                    reviewsFaqSubTab === 'policies'
                      ? 'bg-[#c5a059] text-[#131313] font-bold shadow'
                      : 'text-[#cac6c1] hover:text-[#e9c176]'
                  }`}
                >
                  <ShieldCheck className="w-3 h-3" />
                  <span>Chính sách</span>
                </button>
              </div>
            </div>

            {/* Customer Reviews */}
            {(reviewsFaqSubTab === 'all' || reviewsFaqSubTab === 'reviews') && (
              <ReviewsSection />
            )}

            {/* Promotion Bundle & Live Countdown */}
            {reviewsFaqSubTab === 'all' && (
              <PromoBundleSection onOrderClick={scrollToOrderForm} />
            )}

            {/* Sales Policies */}
            {(reviewsFaqSubTab === 'all' || reviewsFaqSubTab === 'policies') && (
              <PoliciesSection />
            )}

            {/* FAQ Interactive Accordions */}
            {(reviewsFaqSubTab === 'all' || reviewsFaqSubTab === 'faq') && (
              <FaqSection />
            )}

            {/* Bottom CTA Banner */}
            <section className="py-12 px-4 sm:px-6 bg-[#0e0e0e] border-t border-[#4e4639]/30">
              <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 p-6 sm:p-8 rounded-2xl bg-[#1c1b1b] border border-[#c5a059]/30 shadow-xl">
                <div className="flex flex-col gap-1.5 text-center sm:text-left">
                  <span className="text-xs uppercase tracking-widest text-[#e9c176] font-semibold">
                    Đồng hành cùng bạn
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl text-[#e5e2e1]">
                    Sẵn sàng nâng tầm không gian sống?
                  </h3>
                  <p className="text-xs sm:text-sm text-[#d1c5b4]">
                    Đặt hàng ngay hôm nay để nhận ưu đãi giảm 560.000đ và quà tặng 10ml tinh dầu.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={scrollToOrderForm}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#c5a059] to-[#e9c176] text-[#261900] text-xs font-bold uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 transition-all"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Đặt Hàng Ngay</span>
                </button>
              </div>
            </section>
          </div>
        )}
      </main>

      {/* Brand Footer */}
      <Footer />

      {/* Mobile Bottom Sticky Conversion Bar */}
      <MobileStickyBar
        onOrderClick={scrollToOrderForm}
        activeTab={activeTab}
        reviewsFaqSubTab={reviewsFaqSubTab}
        onTabChange={handleTabChange}
      />

      {/* Dedicated Luxury Order Modal / Checkout Overlay */}
      {isOrderModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-start justify-center overflow-y-auto p-3 sm:p-6 lg:p-10 animate-fadeIn"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsOrderModalOpen(false);
            }
          }}
        >
          <div className="relative w-full max-w-4xl my-auto bg-[#131313] border border-[#c5a059]/60 rounded-3xl shadow-2xl overflow-hidden animate-slideUp">
            {/* Modal Top Bar */}
            <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-[#1c1b1b]/95 backdrop-blur-md border-b border-[#4e4639]/40">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-[#e9c176]" />
                <span className="font-serif text-sm sm:text-base font-medium text-[#e5e2e1] uppercase tracking-wider">
                  ĐẶT HÀNG TRỰC TIẾP • NOVA PRIVÉE APEX ONE
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsOrderModalOpen(false)}
                className="flex items-center gap-1 text-xs text-[#d1c5b4] hover:text-[#e9c176] px-2.5 py-1 rounded-lg bg-[#2a2928] border border-[#4e4639]/40 transition-colors"
                aria-label="Đóng cửa sổ đặt hàng"
              >
                <X className="w-4 h-4" />
                <span>Đóng</span>
              </button>
            </div>

            {/* Modal Order Form Body */}
            <div className="p-2 sm:p-4">
              <OrderFormSection
                key={`${reservedName}-${reservedPhone}`}
                initialName={reservedName}
                initialPhone={reservedPhone}
                selectedScentId={selectedScentId}
                onSelectScent={setSelectedScentId}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
