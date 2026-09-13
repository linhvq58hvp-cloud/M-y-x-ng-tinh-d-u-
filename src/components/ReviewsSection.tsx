import React, { useState, useEffect, useRef, useCallback } from 'react';
import { REVIEWS_LIST } from '../data/productData';
import { Star, CheckCircle, Loader2, Sparkles, SlidersHorizontal, RefreshCcw } from 'lucide-react';
import { ReviewItem } from '../types';

export const ReviewsSection: React.FC = () => {
  const ITEMS_PER_PAGE = 4;
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [displayedCount, setDisplayedCount] = useState<number>(ITEMS_PER_PAGE);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [autoScrollEnabled, setAutoScrollEnabled] = useState<boolean>(true);
  const [newlyLoadedIds, setNewlyLoadedIds] = useState<Set<string>>(new Set());

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  // Filter reviews
  const filteredReviews = selectedFilter === 'all'
    ? REVIEWS_LIST
    : REVIEWS_LIST.filter((r) => {
        const lowerSpace = r.space.toLowerCase();
        if (selectedFilter === 'living') return lowerSpace.includes('khách') || lowerSpace.includes('penthouse');
        if (selectedFilter === 'bedroom') return lowerSpace.includes('ngủ') || lowerSpace.includes('đọc sách');
        if (selectedFilter === 'car') return lowerSpace.includes('xe');
        if (selectedFilter === 'commercial') return lowerSpace.includes('spa') || lowerSpace.includes('showroom') || lowerSpace.includes('văn phòng') || lowerSpace.includes('studio');
        return true;
      });

  const displayedReviews = filteredReviews.slice(0, displayedCount);
  const hasMore = displayedCount < filteredReviews.length;

  // Reset count when filter changes
  useEffect(() => {
    setDisplayedCount(ITEMS_PER_PAGE);
    setNewlyLoadedIds(new Set());
  }, [selectedFilter]);

  // Load more function
  const loadMoreItems = useCallback(() => {
    if (isLoadingMore || !hasMore) return;

    setIsLoadingMore(true);

    // Simulate realistic dynamic async fetch latency
    setTimeout(() => {
      setDisplayedCount((prev) => {
        const nextCount = Math.min(prev + ITEMS_PER_PAGE, filteredReviews.length);
        const newIds = new Set(
          filteredReviews.slice(prev, nextCount).map((item) => item.id)
        );
        setNewlyLoadedIds(newIds);
        return nextCount;
      });
      setIsLoadingMore(false);
    }, 600);
  }, [isLoadingMore, hasMore, filteredReviews]);

  // IntersectionObserver for Infinite Scroll when scrolling near bottom of list
  useEffect(() => {
    if (!autoScrollEnabled || !hasMore || isLoadingMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        if (firstEntry.isIntersecting) {
          loadMoreItems();
        }
      },
      {
        root: null,
        rootMargin: '120px', // trigger slightly before hitting the exact bottom
        threshold: 0.1
      }
    );

    const currentSentinel = sentinelRef.current;
    if (currentSentinel) {
      observer.observe(currentSentinel);
    }

    return () => {
      if (currentSentinel) {
        observer.unobserve(currentSentinel);
      }
      observer.disconnect();
    };
  }, [autoScrollEnabled, hasMore, isLoadingMore, loadMoreItems]);

  const filterOptions = [
    { id: 'all', label: 'Tất cả đánh giá' },
    { id: 'living', label: 'Phòng khách & Penthouse' },
    { id: 'bedroom', label: 'Phòng ngủ' },
    { id: 'car', label: 'Xe hơi & Ô tô' },
    { id: 'commercial', label: 'Spa & Showroom' }
  ];

  return (
    <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-[#131313]" id="reviews">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        
        {/* Header */}
        <div className="flex flex-col gap-2 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-[#e9c176] font-semibold">
            TRẢI NGHIỆM THỰC TẾ
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#e5e2e1] font-medium leading-tight">
            KHÁCH HÀNG NÓI GÌ VỀ SẢN PHẨM?
          </h2>
          <div className="flex items-center justify-center gap-2 mt-2">
            <div className="flex text-[#e9c176]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-[#e9c176] text-[#e9c176]" />
              ))}
            </div>
            <span className="text-sm font-semibold text-[#e5e2e1]">
              4.9/5.0
            </span>
            <span className="text-xs text-[#9a8f80]">
              (Hơn 1.200+ khách hàng hài lòng trên toàn quốc)
            </span>
          </div>
        </div>

        {/* Dynamic Controls Bar: Filter Chips & Auto-Scroll Toggle */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#18181b] border border-[#4e4639]/30">
          {/* Filters */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
            {filterOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setSelectedFilter(opt.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                  selectedFilter === opt.id
                    ? 'bg-[#c5a059] text-[#261900] shadow-md'
                    : 'bg-[#201f1f] text-[#d1c5b4] hover:text-[#e5e2e1] border border-[#4e4639]/30'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Dynamic Loading Status & Mode Switch */}
          <div className="flex items-center gap-3 text-xs text-[#d1c5b4]">
            <span className="text-[#9a8f80]">
              Hiển thị <strong className="text-[#e9c176]">{displayedReviews.length}</strong> / {filteredReviews.length}
            </span>
            <span className="text-[#4e4639]">•</span>
            <button
              onClick={() => setAutoScrollEnabled(!autoScrollEnabled)}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#201f1f] border border-[#4e4639]/40 hover:border-[#c5a059]/50 transition-colors"
              title="Bật/Tắt chế độ tự động tải khi cuộn chuột đến cuối danh sách"
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  autoScrollEnabled ? 'bg-[#e9c176] animate-pulse' : 'bg-[#9a8f80]'
                }`}
              />
              <span className="text-[11px] text-[#e5e2e1]">
                Tự tải khi cuộn: <strong className={autoScrollEnabled ? 'text-[#e9c176]' : 'text-[#9a8f80]'}>{autoScrollEnabled ? 'Bật' : 'Tắt'}</strong>
              </span>
            </button>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="reviews-grid">
          {displayedReviews.map((rev) => {
            const isNewlyLoaded = newlyLoadedIds.has(rev.id);
            return (
              <div
                key={rev.id}
                className={`p-6 rounded-2xl bg-[#1c1b1b] border border-[#4e4639]/30 flex flex-col justify-between gap-4 shadow-xl hover:border-[#c5a059]/40 transition-all duration-500 ${
                  isNewlyLoaded ? 'animate-fadeIn scale-[1.01]' : ''
                }`}
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div className="flex text-[#e9c176]">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#e9c176] text-[#e9c176]" />
                      ))}
                    </div>
                    <span className="text-xs text-[#9a8f80]">{rev.date}</span>
                  </div>

                  <p className="text-sm md:text-base text-[#e5e2e1] italic leading-relaxed">
                    &ldquo;{rev.content}&rdquo;
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[#2a2a2a]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#c5a059] to-[#e9c176] text-[#261900] font-bold text-sm flex items-center justify-center shadow-md">
                      {rev.avatarLetter}
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-semibold text-[#e5e2e1]">
                          {rev.name}
                        </span>
                        <CheckCircle className="w-3.5 h-3.5 text-[#e9c176]" />
                      </div>
                      <span className="text-xs text-[#9a8f80]">{rev.location}</span>
                    </div>
                  </div>

                  <span className="text-[11px] text-[#e9c176] px-2.5 py-1 rounded-full bg-[#201f1f] border border-[#4e4639]/40">
                    {rev.space}
                  </span>
                </div>
              </div>
            );
          })}

          {/* SKELETON LOADER CARDS (Shown dynamically during fetching) */}
          {isLoadingMore && (
            <>
              {[...Array(2)].map((_, i) => (
                <div
                  key={`skeleton-${i}`}
                  className="p-6 rounded-2xl bg-[#1c1b1b]/60 border border-[#c5a059]/20 flex flex-col justify-between gap-4 animate-pulse shadow-lg"
                >
                  <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-center">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, s) => (
                          <div key={s} className="w-4 h-4 rounded bg-[#2a2a2a]" />
                        ))}
                      </div>
                      <div className="w-16 h-3 rounded bg-[#2a2a2a]" />
                    </div>
                    <div className="w-full h-4 rounded bg-[#2a2a2a]" />
                    <div className="w-5/6 h-4 rounded bg-[#2a2a2a]" />
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-[#2a2a2a]">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#2a2a2a]" />
                      <div className="flex flex-col gap-1.5">
                        <div className="w-24 h-3.5 rounded bg-[#2a2a2a]" />
                        <div className="w-16 h-2.5 rounded bg-[#2a2a2a]" />
                      </div>
                    </div>
                    <div className="w-20 h-6 rounded-full bg-[#2a2a2a]" />
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {/* BOTTOM SENTINEL & DYNAMIC TRIGGER CONTAINER */}
        <div
          ref={sentinelRef}
          className="flex flex-col items-center justify-center py-6 gap-3"
        >
          {isLoadingMore ? (
            <div className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#1c1b1b] border border-[#c5a059]/40 text-[#e9c176] text-xs font-semibold uppercase tracking-wider shadow-lg">
              <Loader2 className="w-4 h-4 animate-spin text-[#e9c176]" />
              <span>Đang tải thêm đánh giá... (Dynamic Loading)</span>
            </div>
          ) : hasMore ? (
            <div className="flex flex-col items-center gap-2">
              {autoScrollEnabled ? (
                <div className="flex items-center gap-2 text-xs text-[#9a8f80]">
                  <Sparkles className="w-3.5 h-3.5 text-[#e9c176] animate-pulse" />
                  <span>Cuộn xuống dưới để tự động tải thêm nội dung</span>
                </div>
              ) : null}

              {/* Manual Load More fallback button */}
              <button
                onClick={loadMoreItems}
                className="px-6 py-3 rounded-xl bg-[#201f1f] hover:bg-[#c5a059] text-[#e5e2e1] hover:text-[#261900] border border-[#4e4639]/40 hover:border-transparent text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md flex items-center gap-2"
              >
                <RefreshCcw className="w-3.5 h-3.5" />
                <span>Tải thêm {Math.min(ITEMS_PER_PAGE, filteredReviews.length - displayedCount)} đánh giá nữa</span>
              </button>
            </div>
          ) : (
            <div className="px-5 py-2 rounded-full bg-[#18181b] border border-[#4e4639]/30 text-xs text-[#9a8f80]">
              ✓ Đã tải đầy đủ {filteredReviews.length} đánh giá xác thực từ khách hàng VIP
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
