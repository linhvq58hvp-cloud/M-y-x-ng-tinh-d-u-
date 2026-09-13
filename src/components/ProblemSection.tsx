import React from 'react';
import { Lightbulb, XCircle } from 'lucide-react';
import { BRAND_INFO } from '../data/productData';

export const ProblemSection: React.FC = () => {
  const painPoints = [
    'Phòng kín có mùi khó chịu lâu ngày không thoát được.',
    'Mùi thức ăn hoặc mùi ẩm mốc xuất hiện thường xuyên trong sinh hoạt.',
    'Xịt phòng nhân tạo có mùi quá nồng gắt, hóa chất gây ngột ngạt đau đầu.',
    'Hương thơm nhanh bay hơi chỉ sau 10 - 15 phút sử dụng xịt thông thường.',
    'Khó duy trì mùi hương ổn định liên tục trong suốt cả ngày dài.'
  ];

  return (
    <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-[#131313] relative overflow-hidden">
      <div className="max-w-4xl mx-auto flex flex-col gap-12 text-center">
        {/* Section Header */}
        <div className="flex flex-col gap-3">
          <p className="text-xs uppercase tracking-[0.3em] text-[#e9c176] font-semibold">
            NỖI BẬN TÂM VỀ KHÔNG GIAN
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#e5e2e1] font-medium leading-tight">
            KHÔNG GIAN ĐẸP NHƯNG VẪN THIẾU MỘT THỨ...
          </h2>
          <p className="text-sm md:text-base text-[#d1c5b4] max-w-2xl mx-auto leading-relaxed">
            Một không gian đẹp không chỉ được cảm nhận bằng thị giác. Mùi hương chính là linh hồn vô hình tạo nên đẳng cấp và cảm xúc thư giãn sâu sắc cho tổ ấm của bạn.
          </p>
        </div>

        {/* 5 Pain Points List */}
        <div className="flex flex-col gap-3 text-left">
          {painPoints.map((point, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-4 rounded-xl bg-[#1c1b1b] border border-[#4e4639]/30 hover:border-[#ffb4ab]/40 transition-colors shadow-sm"
            >
              <XCircle className="w-5 h-5 text-[#ffb4ab] shrink-0 mt-0.5" />
              <p className="text-sm md:text-base text-[#e5e2e1] font-normal">
                {point}
              </p>
            </div>
          ))}
        </div>

        {/* Solution Card Transition */}
        <div className="p-8 rounded-2xl bg-gradient-to-br from-[#2a2a2a] to-[#201f1f] border border-[#c5a059]/40 text-center shadow-2xl relative overflow-hidden">
          <div className="w-14 h-14 mx-auto rounded-full bg-[#c5a059]/20 border border-[#c5a059]/40 flex items-center justify-center text-[#e9c176] mb-4">
            <Lightbulb className="w-7 h-7" />
          </div>
          <h3 className="font-serif text-xl sm:text-2xl text-[#e9c176] font-medium uppercase mb-2">
            GIẢI PHÁP ĐƠN GIẢN: MÁY KHUẾCH TÁN TINH DẦU {BRAND_INFO.name.toUpperCase()}
          </h3>
          <p className="text-sm md:text-base text-[#d1c5b4] leading-relaxed max-w-xl mx-auto">
            Một thiết bị kiến trúc nhỏ gọn với công nghệ tán hạt vi mô giúp bạn chủ động kiến tạo không gian thơm thanh tao, ngát hương tự nhiên và mang đậm phong cách sống riêng biệt.
          </p>
        </div>
      </div>
    </section>
  );
};
