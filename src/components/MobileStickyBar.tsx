import React from 'react';
import { ShoppingBag, Sparkles, LayoutGrid, Droplets, Star, HelpCircle } from 'lucide-react';
import { BRAND_INFO } from '../data/productData';
import { trackMetaPixelEvent } from '../utils/metaPixel';

interface MobileStickyBarProps {
  onOrderClick: () => void;
  activeTab?: string;
  reviewsFaqSubTab?: string;
  onTabChange?: (tab: string, subTab?: string) => void;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({
  onOrderClick,
  activeTab = 'product',
  reviewsFaqSubTab = 'all',
  onTabChange
}) => {
  const handleItemClick = (tabId: string, subTab?: string) => {
    if (onTabChange) {
      onTabChange(tabId, subTab);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isItemActive = (tabId: string, subTab?: string) => {
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
    <nav className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-[#0e0e0e]/95 backdrop-blur-xl border-t border-[#4e4639]/40 shadow-[0_-8px_30px_rgba(0,0,0,0.8)] pb-safe">
      {/* Primary CTA button */}
      <div className="px-3 pt-2 pb-1.5">
        <button
          onClick={() => {
            trackMetaPixelEvent('InitiateCheckout', {
              content_name: `${BRAND_INFO.model} - Mobile Sticky`,
              currency: 'VND',
              value: BRAND_INFO.salePrice
            });
            onOrderClick();
          }}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-gradient-to-r from-[#c5a059] to-[#e9c176] hover:from-[#d4af37] hover:to-[#ffdea5] text-[#261900] font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-[#c5a059]/30 transition-transform active:scale-98"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>🛒 ĐẶT HÀNG NGAY • {BRAND_INFO.salePrice.toLocaleString('vi-VN')}Đ</span>
        </button>
      </div>

      {/* Quick navigation icons */}
      <div className="flex justify-around items-center h-12 px-2 text-[10px]">
        <button
          type="button"
          onClick={() => handleItemClick('product')}
          className={`flex flex-col items-center justify-center gap-0.5 py-1 flex-1 transition-colors cursor-pointer ${
            isItemActive('product') ? 'text-[#e9c176] font-semibold' : 'text-[#9a8f80] hover:text-[#e5e2e1]'
          }`}
        >
          <Sparkles className={`w-4 h-4 ${isItemActive('product') ? 'text-[#e9c176]' : ''}`} />
          <span>Sản phẩm</span>
        </button>

        <button
          type="button"
          onClick={() => handleItemClick('spaces')}
          className={`flex flex-col items-center justify-center gap-0.5 py-1 flex-1 transition-colors cursor-pointer ${
            isItemActive('spaces') ? 'text-[#e9c176] font-semibold' : 'text-[#9a8f80] hover:text-[#e5e2e1]'
          }`}
        >
          <LayoutGrid className={`w-4 h-4 ${isItemActive('spaces') ? 'text-[#e9c176]' : ''}`} />
          <span>Không gian</span>
        </button>

        <button
          type="button"
          onClick={() => handleItemClick('scents')}
          className={`flex flex-col items-center justify-center gap-0.5 py-1 flex-1 transition-colors cursor-pointer ${
            isItemActive('scents') ? 'text-[#e9c176] font-semibold' : 'text-[#9a8f80] hover:text-[#e5e2e1]'
          }`}
        >
          <Droplets className={`w-4 h-4 ${isItemActive('scents') ? 'text-[#e9c176]' : ''}`} />
          <span>Mùi hương</span>
        </button>

        <button
          type="button"
          onClick={() => handleItemClick('reviews_faq', 'reviews')}
          className={`flex flex-col items-center justify-center gap-0.5 py-1 flex-1 transition-colors cursor-pointer ${
            isItemActive('reviews_faq', 'reviews') ? 'text-[#e9c176] font-semibold' : 'text-[#9a8f80] hover:text-[#e5e2e1]'
          }`}
        >
          <Star className={`w-4 h-4 ${isItemActive('reviews_faq', 'reviews') ? 'text-[#e9c176]' : ''}`} />
          <span>Đánh giá</span>
        </button>

        <button
          type="button"
          onClick={() => handleItemClick('reviews_faq', 'faq')}
          className={`flex flex-col items-center justify-center gap-0.5 py-1 flex-1 transition-colors cursor-pointer ${
            isItemActive('reviews_faq', 'faq') ? 'text-[#e9c176] font-semibold' : 'text-[#9a8f80] hover:text-[#e5e2e1]'
          }`}
        >
          <HelpCircle className={`w-4 h-4 ${isItemActive('reviews_faq', 'faq') ? 'text-[#e9c176]' : ''}`} />
          <span>FAQ</span>
        </button>
      </div>
    </nav>
  );
};
