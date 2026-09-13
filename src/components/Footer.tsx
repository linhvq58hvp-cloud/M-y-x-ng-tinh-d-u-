import React from 'react';
import { BRAND_INFO } from '../data/productData';
import { Phone, MapPin, MessageCircle, Shield, Award } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#0e0e0e] border-t border-[#4e4639]/30 text-[#d1c5b4] pt-16 pb-28 md:pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-[#2a2a2a]">
          
          {/* Column 1: Brand Info */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#e9c176] via-[#c5a059] to-[#8a6e30] p-[1.5px] shadow-[0_0_15px_rgba(197,160,89,0.3)] shrink-0">
                <div className="w-full h-full rounded-full bg-[#131313] flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#e9c176]" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" fillOpacity="0.15" />
                    <circle cx="12" cy="12" r="3" fill="currentColor" />
                  </svg>
                </div>
              </div>
              <div>
                <span className="font-serif text-xl font-medium text-[#e5e2e1] uppercase tracking-wider block">
                  Nova Privée
                </span>
                <span className="text-[10px] tracking-[0.25em] text-[#e9c176] uppercase font-sans">
                  Haute Parfumerie
                </span>
              </div>
            </div>

            <p className="text-sm text-[#d1c5b4]/80 leading-relaxed max-w-md">
              Nghệ thuật khuếch tán hương thơm thuần khiết và kiến trúc ánh sáng trầm lắng cho không gian sống thượng lưu. Kiến tạo dấu ấn khứu giác độc bản riêng biệt.
            </p>

            <div className="flex items-center gap-4 text-xs text-[#e9c176] pt-2">
              <span className="flex items-center gap-1.5">
                <Shield className="w-4 h-4" />
                Bảo hành 12 tháng
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Award className="w-4 h-4" />
                Tinh dầu chuẩn Grasse Pháp
              </span>
            </div>
          </div>

          {/* Column 2: Contact & Showrooms */}
          <div className="md:col-span-4 flex flex-col gap-3">
            <span className="text-xs uppercase tracking-widest text-[#e9c176] font-bold">
              SHOWROOM &amp; LIÊN HỆ
            </span>
            <div className="flex flex-col gap-2.5 text-xs text-[#d1c5b4]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#e9c176] shrink-0 mt-0.5" />
                <span>Địa chỉ: <strong className="text-[#e5e2e1]">{BRAND_INFO.showroom}</strong></span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#e9c176] shrink-0" />
                <span>Hotline: <strong className="text-[#e5e2e1]">{BRAND_INFO.hotline}</strong></span>
              </div>
              <div className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-[#e9c176] shrink-0" />
                <span>Zalo: <strong className="text-[#e5e2e1]">{BRAND_INFO.zalo}</strong></span>
              </div>
            </div>
          </div>

          {/* Column 3: Quick Navigation & Legal */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <span className="text-xs uppercase tracking-widest text-[#e9c176] font-bold">
              CHÍNH SÁCH BÁN HÀNG
            </span>
            <div className="flex flex-col gap-2 text-xs text-[#9a8f80]">
              <a href="#policy" className="hover:text-[#e9c176] transition-colors">
                Chính sách bảo hành 12 tháng 1-đổi-1
              </a>
              <a href="#policy" className="hover:text-[#e9c176] transition-colors">
                Quy trình đồng kiểm tra khi nhận hàng
              </a>
              <a href="#scents" className="hover:text-[#e9c176] transition-colors">
                Tư vấn chọn nốt hương phong thủy
              </a>
              <a href="#order-form" className="hover:text-[#e9c176] transition-colors">
                Bảo mật thông tin khách hàng 100%
              </a>
            </div>
          </div>

        </div>

        {/* Copyright & Disclaimer */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-[#9a8f80] gap-4">
          <p>© 2025 Nova Privée Haute Parfumerie. Tất cả quyền được bảo lưu.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Designed for Luxury Aesthetics</span>
            <span>•</span>
            <span className="text-[#e9c176]">Cold Ultrasonic Technology</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
