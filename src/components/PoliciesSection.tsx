import React from 'react';
import { Truck, ShieldCheck, RefreshCw, MessageSquare } from 'lucide-react';
import { BRAND_INFO } from '../data/productData';

export const PoliciesSection: React.FC = () => {
  const policies = [
    {
      icon: Truck,
      title: 'GIAO TOÀN QUỐC',
      desc: 'Đóng gói chuẩn quà tặng cao cấp nhiều lớp chống sốc, giao tận tay an toàn. Đồng kiểm tra trước khi thanh toán.'
    },
    {
      icon: ShieldCheck,
      title: `BẢO HÀNH ${BRAND_INFO.warrantyMonths} THÁNG`,
      desc: 'Bảo hành chính hãng 12 tháng điện tử theo số điện thoại, hỗ trợ linh kiện thay thế và vệ sinh máy trọn đời.'
    },
    {
      icon: RefreshCw,
      title: 'ĐỔI MỚI 1 - 1 TRONG 30 NGÀY',
      desc: 'Cam kết đổi mới chiếc máy khác ngay lập tức nếu phát sinh bất kỳ trục trặc kỹ thuật nào trong 30 ngày đầu sử dụng.'
    },
    {
      icon: MessageSquare,
      title: 'HỖ TRỢ TƯ VẤN 24/7',
      desc: 'Chuyên gia tư vấn mùi hương riêng biệt cho từng không gian: gia đình, xe hơi, spa, showroom thương hiệu.'
    }
  ];

  return (
    <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-[#131313]" id="policy">
      <div className="max-w-6xl mx-auto flex flex-col gap-10">
        
        {/* Header */}
        <div className="flex flex-col gap-2 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-[#e9c176] font-semibold">
            CAM KẾT DỊCH VỤ TẬN TÂM
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#e5e2e1] font-medium leading-tight">
            CHÍNH SÁCH BÁN HÀNG AURA PRIVÉE
          </h2>
        </div>

        {/* 4 Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {policies.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#1c1b1b] border border-[#4e4639]/30 flex flex-col gap-3 hover:border-[#c5a059]/40 transition-colors shadow-sm"
              >
                <div className="w-12 h-12 rounded-xl bg-[#2a2a2a] flex items-center justify-center text-[#e9c176]">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-sm font-bold text-[#e5e2e1] uppercase tracking-wider">
                  {p.title}
                </span>
                <p className="text-xs sm:text-sm text-[#d1c5b4] leading-relaxed">
                  {p.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
