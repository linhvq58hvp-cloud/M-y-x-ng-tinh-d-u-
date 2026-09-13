import React, { useState } from 'react';
import { BRAND_INFO, PRODUCT_COLORS, SCENT_COLLECTION } from '../data/productData';
import { ShieldCheck, Truck, Gift, Check, ShoppingBag, QrCode, CreditCard, Lock, Sparkles, X, Loader2 } from 'lucide-react';

interface OrderFormSectionProps {
  initialName?: string;
  initialPhone?: string;
  selectedScentId: string;
  onSelectScent: (scentId: string) => void;
}

export const OrderFormSection: React.FC<OrderFormSectionProps> = ({
  initialName = '',
  initialPhone = '',
  selectedScentId,
  onSelectScent
}) => {
  // Form States
  const [name, setName] = useState(initialName);
  const [phone, setPhone] = useState(initialPhone);
  const [address, setAddress] = useState('');
  const [note, setNote] = useState('');
  const [selectedColor, setSelectedColor] = useState(PRODUCT_COLORS[0].id);
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'banking'>('cod');
  const [submittedOrder, setSubmittedOrder] = useState<any | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  React.useEffect(() => {
    if (initialName) setName(initialName);
  }, [initialName]);

  React.useEffect(() => {
    if (initialPhone) setPhone(initialPhone);
  }, [initialPhone]);

  // Price calculations
  const calculateTotal = () => {
    if (quantity === 1) {
      return BRAND_INFO.salePrice;
    } else if (quantity === 2) {
      return 2380000; // Extra 200k discount
    } else {
      return 3450000; // Extra 420k discount
    }
  };

  const totalPrice = calculateTotal();
  const activeColorObj = PRODUCT_COLORS.find((c) => c.id === selectedColor) || PRODUCT_COLORS[0];
  const activeScentObj = SCENT_COLLECTION.find((s) => s.id === selectedScentId) || SCENT_COLLECTION[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !address || isSubmitting) return;

    setIsSubmitting(true);

    const orderId = 'AP-' + Math.floor(100000 + Math.random() * 900000);
    const currentDate = new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
    const orderDetails = {
      orderId,
      name,
      phone,
      address,
      note,
      color: activeColorObj.name,
      scent: `${activeScentObj.name} (${activeScentObj.vietnameseName})`,
      quantity,
      totalPrice,
      paymentMethod: paymentMethod === 'cod' ? 'Thanh toán khi nhận hàng (COD)' : 'Chuyển khoản ngân hàng',
      date: currentDate
    };

    // Payload formatted for Google Apps Script sheet
    const sheetPayload = {
      orderId,
      customerName: name,
      phone,
      address,
      bundleName: `Bộ máy ${BRAND_INFO.model} (SL: ${quantity})`,
      color: activeColorObj.name,
      scentName: `${activeScentObj.name} - ${activeScentObj.vietnameseName}`,
      quantity: quantity,
      totalAmount: `${totalPrice.toLocaleString('vi-VN')}đ`,
      paymentMethod: paymentMethod === 'cod' ? 'COD' : 'Chuyển khoản',
      note: note || 'Không có',
      createdAt: currentDate
    };

    try {
      if (BRAND_INFO.googleSheetScriptUrl) {
        // Use text/plain with no-cors to reliably deliver JSON string to Google Apps Script doPost(e.postData.contents)
        await fetch(BRAND_INFO.googleSheetScriptUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'text/plain;charset=utf-8',
          },
          body: JSON.stringify(sheetPayload),
        });
      }
    } catch (error) {
      console.warn('Lỗi khi gửi dữ liệu Google Sheet (đã ghi nhận nội bộ):', error);
    } finally {
      setIsSubmitting(false);
      setSubmittedOrder(orderDetails);
    }
  };

  return (
    <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-[#131313] scroll-mt-16" id="order-form">
      <div className="max-w-4xl mx-auto flex flex-col gap-10">
        
        {/* Order Form Card Container - Detailed Order Section */}
        <div
          id="detailed-order-form"
          className="p-6 sm:p-10 rounded-3xl bg-[#1c1b1b] border border-[#c5a059]/40 shadow-2xl flex flex-col gap-8 relative"
        >
          {/* Top Summary Banner */}
          <div className="p-5 rounded-2xl bg-[#0e0e0e] border border-[#4e4639]/30 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <span className="text-xs text-[#e9c176] uppercase tracking-widest font-bold block">
                {BRAND_INFO.model}
              </span>
              <p className="font-serif text-xl sm:text-2xl text-[#e5e2e1] font-medium">
                MÁY KHUẾCH TÁN TINH DẦU CAO CẤP
              </p>
              <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-[#d1c5b4]">
                <span className="flex items-center gap-1 text-[#e9c176]">
                  <Gift className="w-3.5 h-3.5" />
                  Tặng {BRAND_INFO.freeOilVolume} tinh dầu
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-[#e9c176]">
                  <Truck className="w-3.5 h-3.5" />
                  Freeship toàn quốc
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-[#e9c176]">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Bảo hành {BRAND_INFO.warrantyMonths} tháng
                </span>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-[18px] text-[#ff7d00] bg-[#000000] font-mono line-through block">
                {BRAND_INFO.originalPrice.toLocaleString('vi-VN')}đ
              </span>
              <span className="font-serif text-2xl sm:text-3xl font-bold text-[#e9c176]">
                {BRAND_INFO.salePrice.toLocaleString('vi-VN')}đ
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            
            {/* 1. QUANTITY SELECTOR (COMBO DEALS) */}
            <div id="quantity-selection-section" className="flex flex-col gap-2.5">
              <label className="text-xs uppercase tracking-wider text-[#e9c176] font-bold">
                1. CHỌN SỐ LƯỢNG &amp; COMBO ƯU ĐÃI:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  id="btn-single-machine"
                  type="button"
                  onClick={() => setQuantity(1)}
                  className={`p-4 rounded-xl border text-left flex flex-col gap-1 transition-all scroll-mt-28 ${
                    quantity === 1
                      ? 'bg-[#201f1f] border-[#c5a059] shadow-lg shadow-[#c5a059]/10 ring-2 ring-[#c5a059]/60'
                      : 'bg-[#18181b] border-[#4e4639]/30 hover:border-[#9a8f80]'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-[#e5e2e1] uppercase">1 Máy (Đơn lẻ)</span>
                    {quantity === 1 && <Check className="w-4 h-4 text-[#e9c176]" />}
                  </div>
                  <span className="text-base font-serif font-bold text-[#e9c176]">
                    1.290.000đ
                  </span>
                  <span className="text-[11px] text-[#9a8f80]">Tặng 1 chai 10ml + Freeship</span>
                </button>

                <button
                  type="button"
                  onClick={() => setQuantity(2)}
                  className={`p-4 rounded-xl border text-left flex flex-col gap-1 transition-all relative overflow-hidden ${
                    quantity === 2
                      ? 'bg-[#201f1f] border-[#c5a059] shadow-lg shadow-[#c5a059]/10'
                      : 'bg-[#18181b] border-[#4e4639]/30 hover:border-[#9a8f80]'
                  }`}
                >
                  <span className="absolute top-0 right-0 px-2 py-0.5 bg-[#c5a059] text-[#261900] text-[9px] font-bold uppercase rounded-bl">
                    Tiết kiệm thêm 200k
                  </span>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-[#e5e2e1] uppercase">Combo 2 Máy</span>
                    {quantity === 2 && <Check className="w-4 h-4 text-[#e9c176]" />}
                  </div>
                  <span className="text-base font-serif font-bold text-[#e9c176]">
                    2.380.000đ
                  </span>
                  <span className="text-[11px] text-[#9a8f80]">Phòng khách &amp; Phòng ngủ / Xe hơi</span>
                </button>

                <button
                  type="button"
                  onClick={() => setQuantity(3)}
                  className={`p-4 rounded-xl border text-left flex flex-col gap-1 transition-all relative overflow-hidden ${
                    quantity === 3
                      ? 'bg-[#201f1f] border-[#c5a059] shadow-lg shadow-[#c5a059]/10'
                      : 'bg-[#18181b] border-[#4e4639]/30 hover:border-[#9a8f80]'
                  }`}
                >
                  <span className="absolute top-0 right-0 px-2 py-0.5 bg-[#e9c176] text-[#261900] text-[9px] font-bold uppercase rounded-bl">
                    Tiết kiệm thêm 420k
                  </span>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-[#e5e2e1] uppercase">Combo 3 Máy</span>
                    {quantity === 3 && <Check className="w-4 h-4 text-[#e9c176]" />}
                  </div>
                  <span className="text-base font-serif font-bold text-[#e9c176]">
                    3.450.000đ
                  </span>
                  <span className="text-[11px] text-[#9a8f80]">Biếu tặng hoặc setup biệt thự</span>
                </button>
              </div>
            </div>

            {/* 2. COLOR SELECTION */}
            <div className="flex flex-col gap-2.5">
              <label className="text-xs uppercase tracking-wider text-[#e9c176] font-bold">
                2. CHỌN MÀU SẮC THÂN MÁY (5 MÀU):
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {PRODUCT_COLORS.map((color) => {
                  const isSelected = selectedColor === color.id;
                  return (
                    <button
                      type="button"
                      key={color.id}
                      onClick={() => setSelectedColor(color.id)}
                      className={`p-3.5 rounded-xl border text-left flex items-center justify-between gap-3 transition-all ${
                        isSelected
                          ? 'bg-[#201f1f] border-[#c5a059]'
                          : 'bg-[#18181b] border-[#4e4639]/30 hover:border-[#9a8f80]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className="w-5 h-5 rounded-full border border-white/20 shadow"
                          style={{ backgroundColor: color.hex }}
                        />
                        <span className="text-xs font-medium text-[#e5e2e1]">
                          {color.name}
                        </span>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-[#e9c176]" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. FREE SCENT SELECTION */}
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <label className="text-xs uppercase tracking-wider text-[#e9c176] font-bold">
                  3. CHỌN MÙI HƯƠNG TINH DẦU 10ML TẶNG KÈM:
                </label>
                <span className="text-[11px] text-[#d1c5b4] font-medium">Miễn phí 100%</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {SCENT_COLLECTION.map((scent) => {
                  const isSelected = selectedScentId === scent.id;
                  return (
                    <button
                      type="button"
                      key={scent.id}
                      onClick={() => onSelectScent(scent.id)}
                      className={`p-3 rounded-xl border text-center flex flex-col items-center gap-1.5 transition-all ${
                        isSelected
                          ? 'bg-[#201f1f] border-[#c5a059] shadow-md'
                          : 'bg-[#18181b] border-[#4e4639]/30 hover:border-[#9a8f80]'
                      }`}
                    >
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: scent.color }}
                      />
                      <span className="text-xs font-bold text-[#e5e2e1] uppercase">
                        {scent.name}
                      </span>
                      <span className="text-[10px] text-[#9a8f80] leading-tight">
                        {scent.vietnameseName}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. CUSTOMER SHIPPING INFO */}
            <div className="flex flex-col gap-3 pt-2">
              <label className="text-xs uppercase tracking-wider text-[#e9c176] font-bold">
                4. THÔNG TIN GIAO HÀNG TẬN NƠI:
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <span className="text-[11px] text-[#d1c5b4] uppercase tracking-wider">Họ và tên *</span>
                  <input
                    type="text"
                    required
                    placeholder="Ví dụ: Nguyễn Văn An"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-12 px-4 rounded-xl bg-[#131313] border border-[#4e4639]/40 text-[#e5e2e1] placeholder:text-[#9a8f80] text-sm focus:outline-none focus:border-[#e9c176] transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-[11px] text-[#d1c5b4] uppercase tracking-wider">Số điện thoại *</span>
                  <input
                    type="tel"
                    required
                    placeholder="Ví dụ: 0988 123 456"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="h-12 px-4 rounded-xl bg-[#131313] border border-[#4e4639]/40 text-[#e5e2e1] placeholder:text-[#9a8f80] text-sm focus:outline-none focus:border-[#e9c176] transition-colors"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-[11px] text-[#d1c5b4] uppercase tracking-wider">Địa chỉ nhận hàng chi tiết *</span>
                <input
                  type="text"
                  required
                  placeholder="Số nhà, tên đường, Phường/Xã, Quận/Huyện, Tỉnh/Thành phố"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="h-12 px-4 rounded-xl bg-[#131313] border border-[#4e4639]/40 text-[#e5e2e1] placeholder:text-[#9a8f80] text-sm focus:outline-none focus:border-[#e9c176] transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-[11px] text-[#d1c5b4] uppercase tracking-wider">Ghi chú giao hàng (Tùy chọn)</span>
                <textarea
                  rows={2}
                  placeholder="Ví dụ: Giao giờ hành chính, gọi trước khi giao 15 phút..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="p-3 rounded-xl bg-[#131313] border border-[#4e4639]/40 text-[#e5e2e1] placeholder:text-[#9a8f80] text-sm focus:outline-none focus:border-[#e9c176] transition-colors resize-none"
                />
              </div>
            </div>

            {/* 5. PAYMENT METHOD */}
            <div className="flex flex-col gap-2.5">
              <label className="text-xs uppercase tracking-wider text-[#e9c176] font-bold">
                5. HÌNH THỨC THANH TOÁN:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-4 rounded-xl border text-left flex items-center justify-between transition-all ${
                    paymentMethod === 'cod'
                      ? 'bg-[#201f1f] border-[#c5a059]'
                      : 'bg-[#18181b] border-[#4e4639]/30 hover:border-[#9a8f80]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Truck className="w-5 h-5 text-[#e9c176]" />
                    <div>
                      <span className="text-xs font-bold text-[#e5e2e1] block uppercase">
                        COD (Thanh toán khi nhận hàng)
                      </span>
                      <span className="text-[11px] text-[#9a8f80]">Được kiểm tra máy trước khi trả tiền</span>
                    </div>
                  </div>
                  {paymentMethod === 'cod' && <Check className="w-4 h-4 text-[#e9c176]" />}
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('banking')}
                  className={`p-4 rounded-xl border text-left flex items-center justify-between transition-all ${
                    paymentMethod === 'banking'
                      ? 'bg-[#201f1f] border-[#c5a059]'
                      : 'bg-[#18181b] border-[#4e4639]/30 hover:border-[#9a8f80]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <QrCode className="w-5 h-5 text-[#e9c176]" />
                    <div>
                      <span className="text-xs font-bold text-[#e5e2e1] block uppercase">
                        Chuyển khoản VietQR 24/7
                      </span>
                      <span className="text-[11px] text-[#9a8f80]">Quét mã QR tiện lợi &amp; bảo mật</span>
                    </div>
                  </div>
                  {paymentMethod === 'banking' && <Check className="w-4 h-4 text-[#e9c176]" />}
                </button>
              </div>

              {/* Show Bank Details if Banking selected */}
              {paymentMethod === 'banking' && (
                <div className="p-4 sm:p-5 rounded-2xl bg-[#0e0e0e] border border-[#c5a059]/40 flex flex-col sm:flex-row items-center gap-5 mt-2">
                  <div className="w-36 h-36 rounded-xl bg-white p-1.5 flex items-center justify-center shrink-0 shadow-lg border border-[#e9c176]/30 overflow-hidden">
                    <img
                      src={BRAND_INFO.bankInfo.qrCodeUrl}
                      alt="VietQR Techcombank Vũ Quang Linh"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        if (e.currentTarget.src !== BRAND_INFO.bankInfo.qrCodeFallback) {
                          e.currentTarget.src = BRAND_INFO.bankInfo.qrCodeFallback;
                        }
                      }}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex flex-col text-xs text-[#d1c5b4] gap-1.5 w-full">
                    <div className="flex items-center gap-2 pb-1 border-b border-[#3a352c]">
                      <span className="text-xs uppercase tracking-widest font-bold text-[#e9c176]">
                        THÔNG TIN CHUYỂN KHOẢN CHÍNH THỨC
                      </span>
                    </div>
                    <p className="flex justify-between sm:justify-start sm:gap-2">
                      <span className="text-[#9a8f80]">Ngân hàng:</span>
                      <strong className="text-[#e5e2e1]">{BRAND_INFO.bankInfo.bankName}</strong>
                    </p>
                    <p className="flex justify-between sm:justify-start sm:gap-2 items-center">
                      <span className="text-[#9a8f80]">Số tài khoản:</span>
                      <strong className="text-[#e9c176] font-mono text-sm tracking-wider font-bold">
                        {BRAND_INFO.bankInfo.accountNumber}
                      </strong>
                    </p>
                    <p className="flex justify-between sm:justify-start sm:gap-2">
                      <span className="text-[#9a8f80]">Chủ tài khoản:</span>
                      <strong className="text-[#e5e2e1] uppercase">{BRAND_INFO.bankInfo.accountHolder}</strong>
                    </p>
                    <p className="flex justify-between sm:justify-start sm:gap-2 items-center">
                      <span className="text-[#9a8f80]">Số tiền cần CK:</span>
                      <strong className="text-base text-[#e9c176] font-bold">
                        {totalPrice.toLocaleString('vi-VN')}đ
                      </strong>
                    </p>
                    <p className="text-[11px] text-[#9a8f80] pt-1 border-t border-[#2a251e]">
                      * Quét mã VietQR trên hoặc chuyển khoản với cú pháp: <span className="text-[#e5e2e1] font-medium">[Tên] + [SĐT]</span>
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Total Price Row & Submit Button */}
            <div className="pt-4 border-t border-[#4e4639]/40 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-sm uppercase tracking-wider text-[#d1c5b4] font-semibold">
                  TỔNG CỘNG THANH TOÁN:
                </span>
                <span className="font-serif text-3xl sm:text-4xl font-bold text-[#e9c176]">
                  {totalPrice.toLocaleString('vi-VN')}đ
                </span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full h-14 bg-gradient-to-r from-[#c5a059] to-[#e9c176] hover:from-[#d4af37] hover:to-[#ffdea5] text-[#261900] rounded-xl font-bold text-sm sm:text-base uppercase tracking-wider transition-all transform active:scale-95 shadow-xl shadow-[#c5a059]/25 flex items-center justify-center gap-3 ${
                  isSubmitting ? 'opacity-80 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin text-[#261900]" />
                    <span>ĐANG GỬI THÔNG TIN LÊN HỆ THỐNG...</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" />
                    <span>HOÀN TẤT ĐẶT HÀNG • NHẬN ƯU ĐÃI NGAY</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-xs text-[#9a8f80]">
                <Lock className="w-3.5 h-3.5 text-[#e9c176]" />
                <span>Thông tin của quý khách được bảo mật tuyệt đối 100% theo tiêu chuẩn riêng tư.</span>
              </div>
            </div>

          </form>

        </div>

      </div>

      {/* LUXURY ORDER CONFIRMATION MODAL */}
      {submittedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fadeIn">
          <div className="relative w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-[#1c1b1b] border-2 border-[#c5a059] shadow-2xl flex flex-col gap-6 text-center">
            
            <button
              onClick={() => setSubmittedOrder(null)}
              className="absolute top-4 right-4 p-2 text-[#9a8f80] hover:text-[#e5e2e1]"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Check icon */}
            <div className="w-16 h-16 mx-auto rounded-full bg-[#c5a059]/20 border border-[#c5a059] flex items-center justify-center text-[#e9c176] shadow-lg">
              <Check className="w-8 h-8" />
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-xs uppercase tracking-widest text-[#e9c176] font-bold">
                XÁC NHẬN ĐƠN HÀNG THÀNH CÔNG
              </span>
              <h3 className="font-serif text-2xl text-[#e5e2e1] font-medium">
                Cảm Ơn Quý Khách, {submittedOrder.name}!
              </h3>
              <p className="text-xs text-[#d1c5b4]">
                Mã đơn hàng của bạn: <strong className="text-[#e9c176] text-sm tracking-wider font-mono">{submittedOrder.orderId}</strong>
              </p>
            </div>

            {/* Order Details Receipt Box */}
            <div className="p-4 rounded-xl bg-[#0e0e0e] border border-[#4e4639]/30 text-left text-xs space-y-2 text-[#d1c5b4]">
              <div className="flex justify-between">
                <span>Số điện thoại:</span>
                <strong className="text-[#e5e2e1]">{submittedOrder.phone}</strong>
              </div>
              <div className="flex justify-between">
                <span>Địa chỉ nhận hàng:</span>
                <strong className="text-[#e5e2e1] text-right truncate max-w-[200px]">{submittedOrder.address}</strong>
              </div>
              <div className="flex justify-between">
                <span>Màu máy:</span>
                <strong className="text-[#e5e2e1]">{submittedOrder.color}</strong>
              </div>
              <div className="flex justify-between">
                <span>Hương quà tặng (10ml):</span>
                <strong className="text-[#e9c176]">{submittedOrder.scent}</strong>
              </div>
              <div className="flex justify-between">
                <span>Số lượng:</span>
                <strong className="text-[#e5e2e1]">{submittedOrder.quantity} bộ</strong>
              </div>
              <div className="flex justify-between border-t border-[#2a2a2a] pt-2 text-sm">
                <span className="font-bold text-[#e5e2e1]">Tổng thanh toán:</span>
                <strong className="text-base text-[#e9c176]">{submittedOrder.totalPrice.toLocaleString('vi-VN')}đ</strong>
              </div>
              <div className="flex justify-between text-[11px] text-[#9a8f80]">
                <span>Phương thức:</span>
                <span>{submittedOrder.paymentMethod === 'cod' ? 'Thanh toán khi nhận hàng (COD)' : 'Chuyển khoản VietQR'}</span>
              </div>
            </div>

            <p className="text-xs text-[#d1c5b4] leading-relaxed">
              Đội ngũ chuyên viên tư vấn Nova Privée sẽ liên hệ với quý khách trong vòng 15 phút để xác nhận thời gian giao hàng thuận tiện nhất.
            </p>

            <button
              onClick={() => setSubmittedOrder(null)}
              className="w-full py-3.5 rounded-xl bg-[#c5a059] hover:bg-[#d4af37] text-[#261900] font-bold text-xs uppercase tracking-wider transition-all"
            >
              Đóng &amp; Tiếp Tục Khám Phá
            </button>
          </div>
        </div>
      )}

    </section>
  );
};
