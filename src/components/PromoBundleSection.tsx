import React, { useState, useEffect } from 'react';
import { BRAND_INFO } from '../data/productData';
import { trackMetaPixelEvent } from '../utils/metaPixel';
import { Check, ShoppingBag, Clock, Sparkles } from 'lucide-react';

interface PromoBundleSectionProps {
  onOrderClick: () => void;
}

export const PromoBundleSection: React.FC<PromoBundleSectionProps> = ({ onOrderClick }) => {
  // 6 hours countdown simulation
  const [timeLeft, setTimeLeft] = useState({
    hours: 5,
    minutes: 42,
    seconds: 18
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 6, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  return (
    <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-[#0e0e0e]" id="promo">
      <div className="max-w-4xl mx-auto flex flex-col gap-10">
        
        {/* Header */}
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="px-4 py-1 rounded-full bg-[#c5a059]/20 text-[#e9c176] text-xs uppercase tracking-widest font-bold border border-[#c5a059]/40 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5" />
            Duy nhất hôm nay
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl text-[#e5e2e1] font-medium leading-tight">
            🎁 ƯU ĐÃI ĐẶC BIỆT DÀNH RIÊNG CHO BẠN
          </h2>
        </div>

        {/* Big Promo Card */}
        <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-b from-[#252528] via-[#1c1b1b] to-[#141416] border-2 border-[#c5a059]/60 shadow-[0_0_50px_-10px_rgba(197,160,89,0.25)] flex flex-col gap-6">
          
          {/* Price & Savings Strip */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-[#4e4639]/40 text-center sm:text-left">
            <div>
              <span className="text-sm text-[#9a8f80] line-through block">
                Giá niêm yết: {BRAND_INFO.originalPrice.toLocaleString('vi-VN')}đ
              </span>
              <span className="font-serif text-3xl sm:text-5xl text-[#e9c176] font-bold tracking-tight">
                {BRAND_INFO.salePrice.toLocaleString('vi-VN')}đ
              </span>
            </div>

            <div className="flex flex-col items-center sm:items-end gap-1">
              <span className="px-4 py-1.5 rounded-lg bg-[#c5a059] text-[#261900] text-xs font-bold uppercase tracking-wider shadow-md">
                TIẾT KIỆM NGAY {BRAND_INFO.savings.toLocaleString('vi-VN')}Đ
              </span>
              <span className="text-xs text-[#d1c5b4]">Áp dụng cho 12 khách hàng đầu tiên trong ngày</span>
            </div>
          </div>

          {/* Countdown Clock */}
          <div className="flex flex-col sm:flex-row items-center justify-between p-4 rounded-xl bg-[#0e0e0e]/80 border border-[#4e4639]/40 gap-3">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#e9c176] font-semibold">
              <Clock className="w-4 h-4 text-[#e9c176] animate-spin" />
              <span>Thời gian ưu đãi còn lại:</span>
            </div>
            <div className="flex items-center gap-2 font-mono text-lg sm:text-xl font-bold text-[#e5e2e1]">
              <span className="px-2.5 py-1 rounded bg-[#201f1f] text-[#e9c176] border border-[#4e4639]/30">
                {formatNumber(timeLeft.hours)}
              </span>
              <span>:</span>
              <span className="px-2.5 py-1 rounded bg-[#201f1f] text-[#e9c176] border border-[#4e4639]/30">
                {formatNumber(timeLeft.minutes)}
              </span>
              <span>:</span>
              <span className="px-2.5 py-1 rounded bg-[#201f1f] text-[#e9c176] border border-[#4e4639]/30">
                {formatNumber(timeLeft.seconds)}
              </span>
            </div>
          </div>

          {/* Free Gifts & Guarantees checklist */}
          <div className="flex flex-col gap-3 py-2">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-[#18181b] border border-[#4e4639]/20">
              <Check className="w-5 h-5 text-[#e9c176] shrink-0" />
              <span className="text-sm md:text-base text-[#e5e2e1]">
                🎁 <strong>Tặng 10ml tinh dầu nguyên chất</strong> tùy chọn (Citrus, Fresh, Floral, Woody, Luxury).
              </span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-[#18181b] border border-[#4e4639]/20">
              <Check className="w-5 h-5 text-[#e9c176] shrink-0" />
              <span className="text-sm md:text-base text-[#e5e2e1]">
                🎁 <strong>Tặng kèm bộ phụ kiện chuẩn:</strong> Dây sạc bọc dù Type-C cao cấp &amp; Remote điều khiển từ xa.
              </span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-[#18181b] border border-[#4e4639]/20">
              <Check className="w-5 h-5 text-[#e9c176] shrink-0" />
              <span className="text-sm md:text-base text-[#e5e2e1]">
                🚚 <strong>FREESHIP TOÀN QUỐC:</strong> Giao nhanh tận tay, kiểm tra hàng thoải mái trước khi thanh toán.
              </span>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-[#18181b] border border-[#4e4639]/20">
              <Check className="w-5 h-5 text-[#e9c176] shrink-0" />
              <span className="text-sm md:text-base text-[#e5e2e1]">
                🛡️ <strong>BẢO HÀNH CHÍNH HÃNG 12 THÁNG:</strong> Cam kết 1 đổi 1 mới 100% trong 30 ngày nếu có lỗi kỹ thuật.
              </span>
            </div>
          </div>

          {/* Primary CTA */}
          <button
            onClick={() => {
              trackMetaPixelEvent('InitiateCheckout', {
                content_name: `${BRAND_INFO.model} - Promo Bundle`,
                currency: 'VND',
                value: BRAND_INFO.salePrice
              });
              onOrderClick();
            }}
            className="w-full h-14 bg-gradient-to-r from-[#c5a059] to-[#e9c176] hover:from-[#d4af37] hover:to-[#ffdea5] text-[#261900] rounded-xl font-bold text-sm sm:text-base uppercase tracking-wider transition-all transform active:scale-95 shadow-xl shadow-[#c5a059]/30 flex items-center justify-center gap-3"
          >
            <ShoppingBag className="w-5 h-5" />
            <span>ĐẶT HÀNG NGAY • NHẬN TRỌN BỘ ƯU ĐÃI</span>
          </button>

        </div>

      </div>
    </section>
  );
};
