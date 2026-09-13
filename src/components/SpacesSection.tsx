import React, { useState, useEffect, useRef, useCallback } from 'react';
import { SPACES_LIST } from '../data/productData';
import { ArrowRight, Sparkles, Loader2, RefreshCcw } from 'lucide-react';

interface SpacesSectionProps {
  onSelectScentForSpace: (scentHint: string) => void;
  onOrderClick: () => void;
}

export const SpacesSection: React.FC<SpacesSectionProps> = ({ onSelectScentForSpace, onOrderClick }) => {
  const INITIAL_SPACES_COUNT = 3;
  const [selectedSpaceId, setSelectedSpaceId] = useState<string>('all');
  const [displayedCount, setDisplayedCount] = useState<number>(INITIAL_SPACES_COUNT);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [newlyLoadedIds, setNewlyLoadedIds] = useState<Set<string>>(new Set());

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const filteredSpaces = selectedSpaceId === 'all'
    ? SPACES_LIST
    : SPACES_LIST.filter((s) => s.id === selectedSpaceId);

  const displayedSpaces = selectedSpaceId === 'all'
    ? filteredSpaces.slice(0, displayedCount)
    : filteredSpaces;

  const hasMore = selectedSpaceId === 'all' && displayedCount < filteredSpaces.length;

  useEffect(() => {
    setDisplayedCount(INITIAL_SPACES_COUNT);
    setNewlyLoadedIds(new Set());
  }, [selectedSpaceId]);

  const loadMoreSpaces = useCallback(() => {
    if (isLoadingMore || !hasMore) return;

    setIsLoadingMore(true);

    setTimeout(() => {
      setDisplayedCount((prev) => {
        const next = Math.min(prev + 3, filteredSpaces.length);
        const newIds = new Set(filteredSpaces.slice(prev, next).map((s) => s.id));
        setNewlyLoadedIds(newIds);
        return next;
      });
      setIsLoadingMore(false);
    }, 500);
  }, [isLoadingMore, hasMore, filteredSpaces]);

  // Infinite scroll observer for spaces
  useEffect(() => {
    if (!hasMore || isLoadingMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreSpaces();
        }
      },
      { root: null, rootMargin: '100px', threshold: 0.1 }
    );

    const el = sentinelRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
      observer.disconnect();
    };
  }, [hasMore, isLoadingMore, loadMoreSpaces]);

  return (
    <section className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-[#0e0e0e]" id="spaces">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        
        {/* Section Header */}
        <div className="flex flex-col gap-2 text-center max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-[0.3em] text-[#e9c176] font-semibold">
            ĐA DẠNG TRẢI NGHIỆM
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#e5e2e1] font-medium leading-tight">
            MỘT CHIẾC MÁY – NHIỀU KHÔNG GIAN
          </h2>
          <p className="text-sm md:text-base text-[#d1c5b4]">
            Tối ưu hoàn hảo cho diện tích từ 25m² đến 80m², từ không gian sinh hoạt ấm cúng đến các môi trường thương mại và xe hơi sang trọng.
          </p>
        </div>

        {/* Space Filter Chips */}
        <div className="flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setSelectedSpaceId('all')}
            className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
              selectedSpaceId === 'all'
                ? 'bg-[#c5a059] text-[#261900] shadow-md'
                : 'bg-[#18181b] text-[#d1c5b4] hover:text-[#e5e2e1] border border-[#4e4639]/30'
            }`}
          >
            Tất cả (7 Không gian)
          </button>
          {SPACES_LIST.map((space) => (
            <button
              key={space.id}
              onClick={() => setSelectedSpaceId(space.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                selectedSpaceId === space.id
                  ? 'bg-[#c5a059] text-[#261900] shadow-md'
                  : 'bg-[#18181b] text-[#d1c5b4] hover:text-[#e5e2e1] border border-[#4e4639]/30'
              }`}
            >
              {space.title}
            </button>
          ))}
        </div>

        {/* Spaces Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedSpaces.map((space) => {
            const isNewlyLoaded = newlyLoadedIds.has(space.id);
            return (
              <div
                key={space.id}
                className={`relative rounded-2xl overflow-hidden bg-[#1c1b1b] border border-[#4e4639]/30 h-72 flex flex-col justify-end p-6 shadow-xl group transition-all duration-500 hover:-translate-y-1 ${
                  isNewlyLoaded ? 'animate-fadeIn scale-[1.01]' : ''
                }`}
              >
                <img
                  src={space.image}
                  alt={space.title}
                  className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110 filter brightness-90 group-hover:brightness-100"
                />
                {/* Luxury dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-[#0e0e0e]/65 to-transparent" />

                <div className="relative z-10 flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#e9c176] tracking-widest uppercase font-bold flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#e9c176]" />
                      {space.number} — {space.title.toUpperCase()}
                    </span>
                    <span className="text-[10px] text-[#261900] bg-[#e9c176] font-bold px-2 py-0.5 rounded-full uppercase">
                      Gợi ý: {space.suggestedScent}
                    </span>
                  </div>
                  <p className="text-sm text-[#e5e2e1] leading-relaxed">
                    {space.description}
                  </p>
                  <button
                    onClick={() => {
                      onSelectScentForSpace(space.suggestedScent);
                      onOrderClick();
                    }}
                    className="mt-2 inline-flex items-center gap-1.5 text-xs text-[#e9c176] hover:text-[#ffdea5] uppercase tracking-wider font-semibold group/btn"
                  >
                    <span>Chọn mùi phù hợp cho không gian này</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </div>
            );
          })}

          {/* Skeleton placeholders when loading more spaces */}
          {isLoadingMore && (
            <>
              {[...Array(2)].map((_, i) => (
                <div
                  key={`space-skeleton-${i}`}
                  className="relative rounded-2xl overflow-hidden bg-[#1c1b1b] border border-[#c5a059]/20 h-72 flex flex-col justify-end p-6 animate-pulse"
                >
                  <div className="w-24 h-4 rounded bg-[#2a2a2a] mb-2" />
                  <div className="w-full h-3.5 rounded bg-[#2a2a2a] mb-1" />
                  <div className="w-3/4 h-3.5 rounded bg-[#2a2a2a]" />
                </div>
              ))}
            </>
          )}
        </div>

        {/* Sentinel for dynamic loading */}
        {selectedSpaceId === 'all' && (
          <div ref={sentinelRef} className="flex flex-col items-center justify-center py-2 gap-2">
            {isLoadingMore ? (
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#18181b] border border-[#c5a059]/40 text-xs text-[#e9c176] font-medium shadow-md">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-[#e9c176]" />
                <span>Đang tự động tải thêm không gian...</span>
              </div>
            ) : hasMore ? (
              <button
                onClick={loadMoreSpaces}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#18181b] hover:bg-[#201f1f] text-xs text-[#d1c5b4] hover:text-[#e9c176] border border-[#4e4639]/30 transition-colors"
              >
                <RefreshCcw className="w-3.5 h-3.5" />
                <span>Cuộn xuống hoặc nhấn để xem thêm {filteredSpaces.length - displayedCount} không gian</span>
              </button>
            ) : (
              <span className="text-xs text-[#9a8f80]">
                Đã hiển thị toàn bộ 7 không gian kiến trúc
              </span>
            )}
          </div>
        )}

        {/* Section Bottom CTA */}
        <div className="text-center pt-2">
          <button
            onClick={onOrderClick}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#201f1f] hover:bg-[#c5a059] text-[#e5e2e1] hover:text-[#261900] border border-[#4e4639]/40 hover:border-transparent rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 shadow-lg"
          >
            <span>CHỌN MÙI HƯƠNG CHO KHÔNG GIAN BẠN</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
