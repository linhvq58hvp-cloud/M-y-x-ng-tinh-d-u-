import React from 'react';
interface FeaturesSectionProps {
  onOrderClick?: () => void;
}

export const FeaturesSection: React.FC<FeaturesSectionProps> = () => {
  const features = [
    {
      number: '01',
      title: '🌿 Hương thơm lan tỏa',
      desc: 'Giúp tinh dầu được khuếch tán nhẹ nhàng, phân bổ đồng đều khắp không gian mà không làm đọng nước trên mặt bàn hay đồ gỗ đắt tiền.'
    },
    {
      number: '02',
      title: '💨 Khuếch tán ổn định',
      desc: 'Tạo nồng độ hương thơm ổn định, duy trì liên tục sự dễ chịu thay vì chỉ bùng phát một lúc rồi tắt lịm như bình xịt aerosol.'
    },
    {
      number: '03',
      title: '🤫 Vận hành êm ái (< 30 dBa)',
      desc: 'Thiết kế buồng tiêu âm hướng đến sự tĩnh lặng tuyệt đối, lý tưởng cho giấc ngủ sâu trong phòng ngủ hay không gian tập trung làm việc.'
    },
    {
      number: '04',
      title: '⏱️ Cài đặt thời gian thông minh',
      desc: 'Chủ động thiết lập các mốc hẹn giờ linh hoạt và chu kỳ phun ngắt quãng thông minh giúp tối ưu lượng tinh dầu.'
    },
    {
      number: '05',
      title: '✨ Thân vỏ hợp kim nhôm nguyên khối',
      desc: 'Thiết kế trụ tròn 71*136mm nhỏ gọn, tinh xảo với 5 tùy chọn màu sắc (Xám, Đen, Bạc, Tím, Vàng), hòa quyện hoàn hảo vào nội thất xe hơi và phòng ốc.'
    }
  ];

  return (
    <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-[#131313]" id="features">
      <div className="max-w-4xl mx-auto flex flex-col gap-10">
        {/* Header */}
        <div className="flex flex-col gap-2 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-[#e9c176] font-semibold">
            TÍNH NĂNG VƯỢT TRỘI
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#e5e2e1] font-medium leading-tight">
            5 LÝ DO BẠN SẼ YÊU THÍCH CHIẾC MÁY NÀY
          </h2>
        </div>

        {/* Feature Cards 01 - 05 */}
        <div className="flex flex-col gap-4">
          {features.map((feat) => (
            <div
              key={feat.number}
              className="flex items-start gap-4 sm:gap-6 p-5 sm:p-6 rounded-2xl bg-[#1c1b1b] border border-[#4e4639]/30 hover:border-[#c5a059]/50 transition-all shadow-md group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#2a2a2a] group-hover:bg-[#c5a059]/20 border border-[#4e4639]/30 flex items-center justify-center shrink-0 text-[#e9c176] transition-colors">
                <span className="font-serif text-xl font-bold">{feat.number}</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <h3 className="font-serif text-lg sm:text-xl text-[#e5e2e1] font-medium group-hover:text-[#e9c176] transition-colors">
                  {feat.title}
                </h3>
                <p className="text-sm md:text-base text-[#d1c5b4] leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
