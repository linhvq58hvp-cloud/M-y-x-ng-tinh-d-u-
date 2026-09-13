import React from 'react';
import { Box, Wind, Volume2, Zap, Droplet, Palette } from 'lucide-react';

interface SpecificationsTableProps {
  onOrderClick?: () => void;
}

export const SpecificationsTable: React.FC<SpecificationsTableProps> = () => {
  const quickHighlights = [
    {
      icon: Wind,
      label: 'Phương pháp phun',
      value: 'Hai chất lỏng',
      sub: 'Phân tách sương lạnh vi mô'
    },
    {
      icon: Box,
      label: 'Diện tích phủ sóng',
      value: '30m³',
      sub: 'Lan tỏa hương đều và êm'
    },
    {
      icon: Droplet,
      label: 'Dung tích chứa',
      value: '10ml',
      sub: 'Tinh dầu nguyên chất'
    },
    {
      icon: Zap,
      label: 'Công suất máy',
      value: '1W',
      sub: 'Siêu tiết kiệm điện'
    },
    {
      icon: Volume2,
      label: 'Độ ồn hoạt động',
      value: '< 30 dBa',
      sub: 'Tĩnh lặng tuyệt đối'
    },
    {
      icon: Palette,
      label: 'Chất liệu & Màu sắc',
      value: 'Hợp kim nhôm',
      sub: '5 màu: Xám, Đen, Bạc, Tím, Vàng'
    }
  ];

  return (
    <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-[#0e0e0e]" id="specs">
      <div className="max-w-5xl mx-auto flex flex-col gap-10">
        
        {/* Header */}
        <div className="flex flex-col gap-2.5 text-center max-w-2xl mx-auto">
          <p className="text-xs uppercase tracking-[0.3em] text-[#e9c176] font-semibold">
            THÔNG TIN SẢN PHẨM CHUẨN XÁC
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#e5e2e1] font-medium leading-tight">
            THÔNG SỐ KỸ THUẬT CHÍNH
          </h2>
          <p className="text-sm text-[#9a8f80]">
            Bảng thông số kỹ thuật được kiểm định nghiêm ngặt, đảm bảo độ chuẩn xác và độ bền vận hành tối đa.
          </p>
        </div>

        {/* Quick Highlights 6-Card Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {quickHighlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-4 rounded-xl bg-[#18181b] border border-[#4e4639]/30 flex flex-col items-center text-center gap-2 hover:border-[#c5a059]/50 transition-colors shadow-sm"
              >
                <div className="w-9 h-9 rounded-lg bg-[#2a2a2a] flex items-center justify-center text-[#e9c176] mb-0.5">
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-[11px] text-[#9a8f80] uppercase tracking-wider font-medium">
                  {item.label}
                </span>
                <span className="text-sm sm:text-base font-bold text-[#e5e2e1]">
                  {item.value}
                </span>
                <span className="text-[11px] text-[#d1c5b4]/70 line-clamp-1">
                  {item.sub}
                </span>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
