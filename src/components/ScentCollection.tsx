import React, { useState } from 'react';
import { SCENT_COLLECTION } from '../data/productData';
import { Check, Sparkles, Layers, ArrowRight } from 'lucide-react';

interface ScentCollectionProps {
  selectedScentId: string;
  onSelectScent: (scentId: string) => void;
  onOrderClick: () => void;
}

export const ScentCollection: React.FC<ScentCollectionProps> = ({
  selectedScentId,
  onSelectScent,
  onOrderClick
}) => {
  const [activeTab, setActiveTab] = useState<string>(selectedScentId || 'citrus');

  const currentScent = SCENT_COLLECTION.find((s) => s.id === activeTab) || SCENT_COLLECTION[0];

  const handlePickScent = (scentId: string) => {
    setActiveTab(scentId);
    onSelectScent(scentId);
  };

  return (
    <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-[#131313]" id="scents">
      <div className="max-w-6xl mx-auto flex flex-col gap-10">
        
        {/* Header */}
        <div className="flex flex-col gap-2 text-center max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-[0.3em] text-[#e9c176] font-semibold">
            NỐT HƯƠNG QUYẾN RŨ
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#e5e2e1] font-medium leading-tight">
            MỖI MÙI HƯƠNG – MỘT CẢM XÚC KHÁC NHAU
          </h2>
          <p className="text-sm md:text-base text-[#d1c5b4]">
            Tặng kèm ngay chai tinh dầu nguyên chất 10ml Haute Parfumerie khi quý khách đặt mua trọn bộ hôm nay.
          </p>
        </div>

        {/* 5 Scents Selector Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
          {SCENT_COLLECTION.map((scent) => {
            const isSelected = activeTab === scent.id;
            return (
              <button
                key={scent.id}
                onClick={() => handlePickScent(scent.id)}
                className={`px-4 sm:px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all flex items-center gap-2 border ${
                  isSelected
                    ? 'bg-[#201f1f] text-[#e9c176] border-[#c5a059] shadow-lg shadow-[#c5a059]/15'
                    : 'bg-[#18181b] text-[#cac6c1] border-[#4e4639]/30 hover:border-[#9a8f80]'
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: scent.color }} />
                <span>{scent.name}</span>
                <span className="text-[11px] text-[#9a8f80] hidden md:inline">({scent.vietnameseName})</span>
              </button>
            );
          })}
        </div>

        {/* Active Scent Detail Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#1c1b1b] border border-[#c5a059]/40 shadow-2xl flex flex-col lg:flex-row gap-8 items-center">
          
          {/* Left Column: Scent Highlights */}
          <div className="flex-1 flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <span
                  className="w-4 h-4 rounded-full shadow-md"
                  style={{ backgroundColor: currentScent.color }}
                />
                <h3 className="font-serif text-2xl sm:text-3xl text-[#e5e2e1] font-medium">
                  {currentScent.name} • {currentScent.vietnameseName}
                </h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#c5a059]/20 text-[#e9c176] text-xs font-bold uppercase tracking-wider border border-[#c5a059]/30">
                {currentScent.tag}
              </span>
            </div>

            <p className="text-sm sm:text-base text-[#e9c176] font-medium italic">
              &ldquo;{currentScent.mood}&rdquo;
            </p>

            <p className="text-sm sm:text-base text-[#d1c5b4] leading-relaxed">
              {currentScent.description}
            </p>

            <div className="p-3.5 rounded-xl bg-[#201f1f] border border-[#4e4639]/30 text-xs sm:text-sm">
              <span className="text-[#9a8f80] uppercase tracking-wider font-semibold mr-2">
                Không gian phù hợp:
              </span>
              <span className="text-[#e5e2e1] font-medium">{currentScent.suitableFor}</span>
            </div>

            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={() => {
                  onSelectScent(currentScent.id);
                  onOrderClick();
                }}
                className="h-12 px-6 bg-gradient-to-r from-[#c5a059] to-[#e9c176] hover:from-[#d4af37] hover:to-[#ffdea5] text-[#261900] font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg transition-transform active:scale-95 flex items-center gap-2"
              >
                <span>CHỌN MÙI {currentScent.name} CHO QUÀ TẶNG</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Fragrance Pyramid */}
          <div className="w-full lg:w-80 p-5 rounded-xl bg-[#131313] border border-[#4e4639]/40 flex flex-col gap-4">
            <div className="flex items-center gap-2 border-b border-[#2a2a2a] pb-2">
              <Layers className="w-4 h-4 text-[#e9c176]" />
              <span className="text-xs uppercase tracking-widest text-[#e9c176] font-bold">
                CẤU TRÚC KIM TỰ THÁP HƯƠNG
              </span>
            </div>

            {/* Top Note */}
            <div className="flex flex-col gap-1">
              <span className="text-[11px] uppercase tracking-wider text-[#9a8f80] font-bold">
                Hương đầu (Top Notes):
              </span>
              <div className="flex flex-wrap gap-1.5">
                {currentScent.topNotes.map((note, i) => (
                  <span
                    key={i}
                    className="text-xs px-2.5 py-1 rounded-md bg-[#201f1f] text-[#e5e2e1] border border-[#4e4639]/30"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>

            {/* Heart Note */}
            <div className="flex flex-col gap-1">
              <span className="text-[11px] uppercase tracking-wider text-[#9a8f80] font-bold">
                Hương giữa (Heart Notes):
              </span>
              <div className="flex flex-wrap gap-1.5">
                {currentScent.heartNotes.map((note, i) => (
                  <span
                    key={i}
                    className="text-xs px-2.5 py-1 rounded-md bg-[#201f1f] text-[#e5e2e1] border border-[#4e4639]/30"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>

            {/* Base Note */}
            <div className="flex flex-col gap-1">
              <span className="text-[11px] uppercase tracking-wider text-[#9a8f80] font-bold">
                Hương cuối (Base Notes):
              </span>
              <div className="flex flex-wrap gap-1.5">
                {currentScent.baseNotes.map((note, i) => (
                  <span
                    key={i}
                    className="text-xs px-2.5 py-1 rounded-md bg-[#201f1f] text-[#e9c176] border border-[#c5a059]/30"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
