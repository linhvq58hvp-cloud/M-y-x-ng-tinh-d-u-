import React from 'react';
import { Wind, Sliders, Timer, Droplet, Radio, PiggyBank, VolumeX, Check, X, Minus } from 'lucide-react';
import { COMPARISON_ROWS } from '../data/productData';

export const TechnologySection: React.FC = () => {
  const techCards = [
    {
      icon: Wind,
      label: 'Phương pháp khuếch tán',
      value: 'Phun sương hai chất lỏng',
      desc: 'Công nghệ phân tách lạnh, bảo toàn trọn vẹn tinh dầu'
    },
    {
      icon: VolumeX,
      label: 'Độ ồn khi vận hành',
      value: '< 30 dBa cực êm',
      desc: 'Tĩnh lặng tuyệt đối cho giấc ngủ và tập trung'
    },
    {
      icon: Droplet,
      label: 'Dung tích bình chứa',
      value: '10ml nguyên chất',
      desc: 'Dùng trực tiếp tinh dầu, không cần pha nước'
    },
    {
      icon: Sliders,
      label: 'Công suất tiêu thụ',
      value: '1W tiết kiệm điện',
      desc: 'Hiệu suất cao, an toàn và thân thiện môi trường'
    },
    {
      icon: Timer,
      label: 'Diện tích phủ sóng',
      value: '30m³ tối ưu',
      desc: 'Lan tỏa hương thơm đồng đều và nhanh chóng'
    },
    {
      icon: PiggyBank,
      label: 'Chất liệu & Trọng lượng',
      value: 'Hợp kim nhôm • 0,35kg',
      desc: 'Kích thước nhỏ gọn 71*136mm chuẩn sang trọng'
    }
  ];

  return (
    <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-[#131313]" id="tech">
      <div className="max-w-6xl mx-auto flex flex-col gap-16">
        
        {/* Technology Header */}
        <div className="flex flex-col gap-2 text-center max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-[0.3em] text-[#e9c176] font-semibold">
            KỸ NGHỆ HIỆN ĐẠI
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#e5e2e1] font-medium leading-tight">
            CÔNG NGHỆ KHUẾCH TÁN TINH DẦU ĐẲNG CẤP
          </h2>
          <p className="text-sm md:text-base text-[#d1c5b4]">
            Ứng dụng phương pháp phun sương hai chất lỏng nguyên chất không qua nhiệt, phân tách tinh dầu thành các phân tử vi mô lan tỏa đồng đều trong không gian 30m³.
          </p>
        </div>

        {/* Tech Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {techCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-xl bg-[#1c1b1b] border border-[#4e4639]/30 flex flex-col gap-2 hover:border-[#c5a059]/40 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-[#2a2a2a] flex items-center justify-center text-[#e9c176] mb-1">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[11px] text-[#9a8f80] uppercase tracking-wider">
                  {card.label}
                </span>
                <span className="text-base font-semibold text-[#e5e2e1]">
                  {card.value}
                </span>
                <span className="text-xs text-[#d1c5b4]">
                  {card.desc}
                </span>
              </div>
            );
          })}

          {/* Quiet Highlight Box (spans full width on mobile or 3 cols on desktop) */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-3 p-6 rounded-xl bg-gradient-to-r from-[#201f1f] via-[#2a2a2a] to-[#201f1f] border border-[#c5a059]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-center sm:text-left">
              <div className="w-12 h-12 rounded-full bg-[#c5a059]/20 flex items-center justify-center text-[#e9c176] shrink-0">
                <VolumeX className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs text-[#e9c176] uppercase tracking-widest font-bold block">
                  VẬN HÀNH SIÊU ÊM ÁI
                </span>
                <p className="text-lg font-serif text-[#e5e2e1]">
                  Độ ồn chỉ dưới 22dB – Êm dịu hơn cả tiếng thì thầm trong đêm
                </p>
              </div>
            </div>
            <span className="px-4 py-1.5 rounded-full bg-[#c5a059] text-[#261900] text-xs font-bold uppercase tracking-wider whitespace-nowrap">
              Chuẩn Sleep-Grade
            </span>
          </div>
        </div>

        {/* COMPARISON TABLE */}
        <div className="flex flex-col gap-6 pt-6">
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-[#e9c176] font-semibold mb-1">
              SỰ KHÁC BIỆT THỰC SỰ
            </p>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#e5e2e1] font-medium">
              MÁY KHUẾCH TÁN AURA PRIVÉE HAY XỊT PHÒNG &amp; NẾN THƠM?
            </h3>
          </div>

          <div className="w-full rounded-2xl overflow-hidden border border-[#4e4639]/40 bg-[#18181b] shadow-2xl">
            {/* Header */}
            <div className="grid grid-cols-12 p-4 bg-[#201f1f] border-b border-[#4e4639]/40 text-xs uppercase tracking-wider font-bold">
              <div className="col-span-5 sm:col-span-6 text-[#d1c5b4]">Tiêu chí so sánh</div>
              <div className="col-span-4 sm:col-span-3 text-center text-[#e9c176] flex items-center justify-center gap-1">
                <span>Nova Privée</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#c5a059] text-[#261900] hidden sm:inline">Khuyên Dùng</span>
              </div>
              <div className="col-span-3 sm:col-span-3 text-center text-[#9a8f80]">Xịt phòng / Nến</div>
            </div>

            {/* Rows */}
            <div className="divide-y divide-[#2a2a2a]">
              {COMPARISON_ROWS.map((row, idx) => (
                <div
                  key={idx}
                  className={`grid grid-cols-12 p-4 items-center text-sm ${
                    idx % 2 === 0 ? 'bg-[#18181b]' : 'bg-[#1c1b1b]'
                  }`}
                >
                  <div className="col-span-5 sm:col-span-6 text-[#e5e2e1] font-medium pr-2">
                    {row.feature}
                  </div>
                  <div className="col-span-4 sm:col-span-3 text-center flex items-center justify-center">
                    <span className="w-7 h-7 rounded-full bg-[#c5a059]/20 text-[#e9c176] flex items-center justify-center font-bold">
                      <Check className="w-4 h-4" />
                    </span>
                  </div>
                  <div className="col-span-3 sm:col-span-3 text-center text-xs text-[#ffb4ab] flex items-center justify-center">
                    {typeof row.spray === 'boolean' ? (
                      row.spray ? (
                        <Check className="w-4 h-4 text-[#e9c176]" />
                      ) : (
                        <span className="w-6 h-6 rounded-full bg-[#ffb4ab]/10 text-[#ffb4ab] flex items-center justify-center font-bold">
                          <X className="w-3.5 h-3.5" />
                        </span>
                      )
                    ) : (
                      <span className="text-[11px] text-[#9a8f80]">{row.spray}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quote Banner */}
          <div className="p-6 rounded-xl bg-gradient-to-r from-[#201f1f] via-[#2a2a2a] to-[#201f1f] border border-[#4e4639]/40 text-center shadow-lg">
            <p className="font-serif text-lg sm:text-xl text-[#e9c176] italic font-medium">
              &ldquo;MỘT LẦN ĐẦU TƯ – CHỦ ĐỘNG TẠO NÊN DẤU ẤN KHỨU GIÁC ĐỘC BẢN CHO KHÔNG GIAN SỐNG&rdquo;
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
