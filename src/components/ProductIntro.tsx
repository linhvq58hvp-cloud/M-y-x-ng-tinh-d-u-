import React from 'react';
import { CheckCircle2, Cpu } from 'lucide-react';
import { BRAND_INFO } from '../data/productData';

export const ProductIntro: React.FC = () => {
  const benefits = [
    'Không cần xịt phòng liên tục gây ngắt quãng.',
    'Không cần đốt nến nguy hiểm, không muội than.',
    'Không cần đứng bên cạnh canh chừng máy.',
    'Chỉ cần cài đặt – bật máy – và tận hưởng hương thơm.'
  ];

  return (
    <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-[#0e0e0e]" id="about-product">
      <div className="max-w-6xl mx-auto flex flex-col gap-12">
        {/* Header */}
        <div className="flex flex-col gap-3 text-center max-w-3xl mx-auto">
          <span className="text-xs uppercase tracking-[0.3em] text-[#e9c176] font-semibold">
            {BRAND_INFO.name} • {BRAND_INFO.model}
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#e5e2e1] font-medium leading-tight">
            KHÔNG CHỈ LÀ MỘT CHIẾC MÁY KHUẾCH TÁN
          </h2>
          <p className="text-sm md:text-base text-[#d1c5b4] leading-relaxed">
            {BRAND_INFO.name} được thiết kế để khuếch tán tinh dầu thành những hạt nano hương siêu nhỏ (kích thước micro-meter), giúp hương thơm lan tỏa nhẹ nhàng, đều khắp không gian mà không gây ẩm mốc hay đọng nước.
          </p>
        </div>

        {/* 4 Benefits Quick Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {benefits.map((text, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-[#18181b] border border-[#4e4639]/30 flex flex-col gap-2.5 hover:border-[#c5a059]/40 transition-colors shadow-sm"
            >
              <CheckCircle2 className="w-5 h-5 text-[#e9c176]" />
              <p className="text-sm text-[#e5e2e1] font-medium leading-snug">{text}</p>
            </div>
          ))}
        </div>

        {/* Architectural Callout Showcase Banner */}
        <div className="relative w-full rounded-2xl overflow-hidden bg-[#1c1b1b] border border-[#4e4639]/30 shadow-2xl">
          <img
            src={BRAND_INFO.heroImageUrl}
            alt="Chi tiết hoàn thiện máy khuếch tán tinh dầu cao cấp"
            referrerPolicy="no-referrer"
            onError={(e) => {
              if (e.currentTarget.src !== BRAND_INFO.heroImageFallback) {
                e.currentTarget.src = BRAND_INFO.heroImageFallback;
              }
            }}
            className="w-full h-80 sm:h-96 md:h-[420px] object-cover object-center filter brightness-95"
          />
          {/* Subtle overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-[#0e0e0e]/40 to-transparent p-6 md:p-10 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <span className="px-3 py-1 bg-[#c5a059] text-[#261900] rounded text-xs uppercase tracking-widest font-bold shadow-md">
                Chế tác thủ công tinh xảo
              </span>
              <span className="text-xs text-[#e9c176] uppercase tracking-wider font-semibold px-3 py-1 bg-[#0e0e0e]/80 rounded-full border border-[#4e4639]/40">
                Chất liệu Hợp kim nhôm cao cấp
              </span>
            </div>

            <div className="flex items-center gap-4 p-4 sm:p-5 bg-[#0e0e0e]/85 rounded-xl backdrop-blur-md border border-[#4e4639]/30 max-w-2xl">
              <div className="w-11 h-11 rounded-lg bg-[#2a2a2a] flex items-center justify-center text-[#e9c176] shrink-0 shadow">
                <Cpu className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-[#e9c176] uppercase tracking-wider font-semibold block">
                  Phương pháp phun sương hai chất lỏng
                </span>
                <span className="text-sm text-[#e5e2e1] leading-relaxed">
                  Bảo tồn trọn vẹn cấu trúc phân tử và dược tính tinh dầu thuần khiết
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
