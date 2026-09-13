import React from 'react';
import { Droplet, SlidersHorizontal, Sparkles } from 'lucide-react';

export const UsageGuide: React.FC = () => {
  const steps = [
    {
      number: '1',
      icon: Droplet,
      title: 'BƯỚC 01: LẮP TINH DẦU 10ML',
      desc: 'Mở nhẹ phần thân máy, lắp trực tiếp chai tinh dầu 10ml nguyên chất vào vòi phun hai chất lỏng (không cần châm nước pha loãng).'
    },
    {
      number: '2',
      icon: SlidersHorizontal,
      title: 'BƯỚC 02: CÀI ĐẶT CHẾ ĐỘ',
      desc: 'Chạm phím cảm ứng hoặc dùng Remote để chọn mốc hẹn giờ (1h, 4h, 8h) và cường độ phun sương mong muốn.'
    },
    {
      number: '3',
      icon: Sparkles,
      title: 'BƯỚC 03: TẬN HƯỞNG',
      desc: 'Ngồi xuống thư giãn và cảm nhận hương thơm thanh sạch, thuần khiết tự động bao bọc không gian phòng bạn.'
    }
  ];

  return (
    <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-[#0e0e0e]" id="guide">
      <div className="max-w-4xl mx-auto flex flex-col gap-10">
        
        <div className="flex flex-col gap-2 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-[#e9c176] font-semibold">
            TIỆN LỢI &amp; DỄ DÀNG
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#e5e2e1] font-medium leading-tight">
            SỬ DỤNG ĐƠN GIẢN CHỈ VỚI 3 BƯỚC
          </h2>
          <p className="text-sm md:text-base text-[#d1c5b4]">
            Thiết kế tối ưu công thái học giúp bất kỳ ai cũng có thể vận hành máy thuần thục ngay trong lần đầu tiên.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="p-6 rounded-2xl bg-[#18181b] border border-[#4e4639]/30 flex flex-col items-center text-center gap-4 relative group hover:border-[#c5a059]/50 transition-all shadow-md"
              >
                {/* Step badge */}
                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#c5a059] to-[#e9c176] text-[#261900] flex items-center justify-center font-serif text-2xl font-bold shadow-lg shadow-[#c5a059]/20">
                  {step.number}
                </div>

                <div className="w-8 h-8 rounded-full bg-[#2a2a2a] flex items-center justify-center text-[#e9c176]">
                  <Icon className="w-4 h-4" />
                </div>

                <div className="flex flex-col gap-1.5">
                  <span className="text-xs text-[#e9c176] font-bold tracking-widest uppercase">
                    {step.title}
                  </span>
                  <p className="text-sm text-[#d1c5b4] leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
