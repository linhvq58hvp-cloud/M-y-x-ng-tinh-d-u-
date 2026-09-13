import React from 'react';
import { Truck, Shield, Headphones, Lock } from 'lucide-react';
import { BRAND_INFO } from '../data/productData';

export const TrustBar: React.FC = () => {
  const trustItems = [
    {
      icon: Truck,
      title: 'GIAO TOÀN QUỐC',
      desc: 'Kiểm tra trước khi trả'
    },
    {
      icon: Shield,
      title: `BẢO HÀNH ${BRAND_INFO.warrantyMonths} THÁNG`,
      desc: 'Đổi mới linh hoạt 1-1'
    },
    {
      icon: Headphones,
      title: 'TƯ VẤN MIỄN PHÍ',
      desc: 'Hỗ trợ chọn mùi hương riêng'
    },
    {
      icon: Lock,
      title: 'THANH TOÁN AN TOÀN',
      desc: 'COD hoặc chuyển khoản'
    }
  ];

  return (
    <section className="w-full bg-[#0e0e0e] border-y border-[#4e4639]/30 py-2.5 sm:py-3 px-3 sm:px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-2.5 md:gap-3.5">
        {trustItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="flex items-center gap-2 sm:gap-2.5 py-1.5 px-2 sm:py-2 sm:px-2.5 rounded-lg bg-[#18181b]/60 border border-[#4e4639]/25 hover:border-[#c5a059]/40 transition-colors"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-md bg-[#252422] flex items-center justify-center shrink-0 text-[#e9c176]">
                <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] sm:text-[11px] font-bold tracking-wider text-[#e5e2e1] uppercase truncate leading-tight">
                  {item.title}
                </span>
                <span className="text-[9px] sm:text-[10px] text-[#9a8f80] truncate leading-tight">
                  {item.desc}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
