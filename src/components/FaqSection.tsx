import React, { useState } from 'react';
import { FAQ_LIST } from '../data/productData';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<number | null>(1);

  const toggleFaq = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-[#0e0e0e]" id="faq">
      <div className="max-w-4xl mx-auto flex flex-col gap-10">
        
        {/* Header */}
        <div className="flex flex-col gap-2 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-[#e9c176] font-semibold">
            GIẢI ĐÁP THẮC MẮC
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#e5e2e1] font-medium leading-tight">
            CÂU HỎI THƯỜNG GẶP
          </h2>
          <p className="text-sm text-[#d1c5b4]">
            Những câu hỏi phổ biến nhất của khách hàng trước và trong quá trình sử dụng máy.
          </p>
        </div>

        {/* Accordions */}
        <div className="flex flex-col gap-3">
          {FAQ_LIST.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="rounded-2xl bg-[#18181b] border border-[#4e4639]/30 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-5 sm:p-6 text-left flex justify-between items-center gap-4 hover:bg-[#201f1f]/50 transition-colors"
                >
                  <span className="font-serif text-base sm:text-lg text-[#e5e2e1] font-medium">
                    {faq.id}. {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full bg-[#2a2a2a] flex items-center justify-center text-[#e9c176] shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-[#c5a059]/20' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 text-sm sm:text-base text-[#d1c5b4] leading-relaxed border-t border-[#2a2a2a] pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
