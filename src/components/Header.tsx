import React, { useState, useEffect } from 'react';
import { BRAND_INFO } from '../data/productData';
import { Sparkles, Phone, ShoppingBag, Menu, X, ShieldCheck, Truck } from 'lucide-react';

interface HeaderProps {
  onOrderClick: () => void;
  activeTab?: string;
  reviewsFaqSubTab?: string;
  onTabChange?: (tab: string, subTab?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOrderClick,
  activeTab = 'product',
  reviewsFaqSubTab = 'all',
  onTabChange
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Sản Phẩm', tabId: 'product' },
    { label: 'Không Gian', tabId: 'spaces' },
    { label: 'Mùi Hương', tabId: 'scents' },
    { label: 'Đánh Giá', tabId: 'reviews_faq', subTab: 'reviews' },
    { label: 'FAQ', tabId: 'reviews_faq', subTab: 'faq' }
  ];

  const handleNavClick = (tabId: string, subTab?: string) => {
    if (onTabChange) {
      onTabChange(tabId, subTab);
    }
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isLinkActive = (tabId: string, subTab?: string) => {
    if (tabId === 'reviews_faq') {
      if (activeTab !== 'reviews_faq') return false;
      if (subTab && reviewsFaqSubTab !== 'all') {
        return reviewsFaqSubTab === subTab;
      }
      return true;
    }
    return activeTab === tabId;
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      {/* Top micro announcement bar */}
      <div className="bg-[#0e0e0e] border-b border-[#4e4639]/40 py-1.5 px-2 sm:px-4 text-center text-[#e9c176] font-medium flex items-center justify-center gap-1.5 sm:gap-2 overflow-hidden whitespace-nowrap">
        <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 animate-pulse text-[#e9c176] shrink-0" />
        <span className="whitespace-nowrap text-[clamp(9px,2.4vw,12px)] tracking-tight sm:tracking-widest uppercase font-medium">
          ƯU ĐÃI ĐẶC BIỆT • FREESHIP TOÀN QUỐC • TẶNG 10ML TINH DẦU
        </span>
      </div>

      {/* Main navigation bar: sleek single horizontal line, approx 2x height of the announcement bar */}
      <div
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#131313]/95 backdrop-blur-xl border-b border-[#4e4639]/40 py-2 shadow-2xl'
            : 'bg-[#131313]/90 backdrop-blur-md border-b border-[#4e4639]/20 py-2.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between h-8 sm:h-9">
          {/* Logo & Brand Name on a single horizontal line */}
          <a href="#" className="flex items-center gap-2.5 group" id="brand-logo-link">
            {/* Luxury Brand Emblem Monogram */}
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-[#e9c176] via-[#c5a059] to-[#8a6e30] p-[1px] shadow-[0_0_12px_rgba(197,160,89,0.35)] shrink-0 transition-transform group-hover:scale-105">
              <div className="w-full h-full rounded-full bg-[#131313] flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#e9c176]" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" fillOpacity="0.15" />
                  <circle cx="12" cy="12" r="3" fill="currentColor" />
                </svg>
              </div>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="font-serif text-sm sm:text-base font-medium tracking-wider text-[#e5e2e1] uppercase whitespace-nowrap">
                Nova Privée
              </span>
              <span className="hidden sm:inline-block text-[#4e4639] text-xs">•</span>
              <span className="hidden sm:inline-block text-[9px] sm:text-[10px] tracking-[0.2em] text-[#e9c176] uppercase font-sans whitespace-nowrap">
                Haute Parfumerie
              </span>
            </div>
          </a>

          {/* Desktop Nav links */}
          <nav className="hidden lg:flex items-center space-x-6 text-xs tracking-wide">
            {navLinks.map((link) => {
              const active = isLinkActive(link.tabId, link.subTab);
              return (
                <button
                  key={`${link.tabId}-${link.subTab || ''}`}
                  type="button"
                  onClick={() => handleNavClick(link.tabId, link.subTab)}
                  className={`py-1 relative uppercase tracking-wider font-medium transition-all cursor-pointer ${
                    active
                      ? 'text-[#e9c176] font-semibold'
                      : 'text-[#cac6c1] hover:text-[#e9c176]'
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute bottom-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[#e9c176] to-transparent rounded-full shadow-[0_0_8px_#e9c176]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={`tel:${BRAND_INFO.hotline}`}
              className="hidden md:flex items-center gap-1.5 text-xs uppercase tracking-wider text-[#d1c5b4] hover:text-[#e9c176] transition-colors px-2.5 py-1 rounded border border-[#4e4639]/40 h-8"
            >
              <Phone className="w-3 h-3 text-[#e9c176]" />
              <span>{BRAND_INFO.hotline}</span>
            </a>

            <button
              onClick={onOrderClick}
              className="px-3 sm:px-4 h-8 bg-gradient-to-r from-[#c5a059] to-[#e9c176] hover:from-[#d4af37] hover:to-[#ffdea5] text-[#261900] font-semibold text-xs tracking-wider uppercase rounded shadow-md shadow-[#c5a059]/20 transition-all transform active:scale-95 flex items-center gap-1.5 whitespace-nowrap"
            >
              <ShoppingBag className="w-3.5 h-3.5 shrink-0" />
              <span>Đặt Hàng Ngay</span>
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 text-[#e5e2e1] hover:text-[#e9c176] transition-colors h-8 w-8 flex items-center justify-center"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#18181b]/98 backdrop-blur-2xl border-b border-[#4e4639]/40 px-6 py-6 shadow-2xl transition-all">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => {
              const active = isLinkActive(link.tabId, link.subTab);
              return (
                <button
                  key={`${link.tabId}-${link.subTab || ''}`}
                  type="button"
                  onClick={() => handleNavClick(link.tabId, link.subTab)}
                  className={`text-base py-2.5 px-3 rounded-lg border flex items-center justify-between text-left transition-all ${
                    active
                      ? 'bg-[#201f1f] text-[#e9c176] border-[#c5a059]/60 font-semibold'
                      : 'text-[#e5e2e1] hover:text-[#e9c176] border-transparent hover:border-[#4e4639]/40'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {active && <span className="w-1.5 h-1.5 rounded-full bg-[#e9c176] shadow-[0_0_6px_#e9c176]" />}
                    {link.label}
                  </span>
                  <span className={`text-xs ${active ? 'text-[#e9c176]' : 'text-[#9a8f80]'}`}>→</span>
                </button>
              );
            })}
            <div className="pt-2 flex flex-col gap-3">
              <a
                href={`tel:${BRAND_INFO.hotline}`}
                className="flex items-center justify-center gap-2 py-3 rounded bg-[#201f1f] text-[#e9c176] text-sm font-medium border border-[#4e4639]/40"
              >
                <Phone className="w-4 h-4" />
                <span>Hotline: {BRAND_INFO.hotline}</span>
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOrderClick();
                }}
                className="w-full py-3 bg-gradient-to-r from-[#c5a059] to-[#e9c176] text-[#261900] font-bold text-sm tracking-wider uppercase rounded shadow-lg flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Đặt Hàng Ngay - Giảm 560.000đ</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
