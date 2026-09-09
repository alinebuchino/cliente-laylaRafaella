import { useState, useRef, useCallback } from 'react';

interface UseHorizontalSliderOptions {
  totalItems: number;
  gap?: number;
}

/**
 * Custom hook to manage responsive horizontal carousels with smooth scrolling,
 * snap navigation, and current index tracking.
 */
export function useHorizontalSlider({ totalItems, gap = 20 }: UseHorizontalSliderOptions) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = useCallback(() => {
    if (!sliderRef.current) return;
    const { scrollLeft, clientWidth } = sliderRef.current;
    if (clientWidth > 0 && totalItems > 0) {
      const cardWidth = sliderRef.current.firstElementChild?.clientWidth || 320;
      const step = cardWidth + gap;
      const newIndex = Math.round(scrollLeft / step);
      setCurrentIndex(Math.min(Math.max(newIndex, 0), totalItems - 1));
    }
  }, [totalItems, gap]);

  const scrollToSlide = useCallback(
    (index: number) => {
      if (!sliderRef.current) return;
      const cardWidth = sliderRef.current.firstElementChild?.clientWidth || 320;
      sliderRef.current.scrollTo({
        left: index * (cardWidth + gap),
        behavior: 'smooth',
      });
      setCurrentIndex(index);
    },
    [gap]
  );

  const nextSlide = useCallback(() => {
    if (totalItems === 0) return;
    const next = (currentIndex + 1) % totalItems;
    scrollToSlide(next);
  }, [currentIndex, totalItems, scrollToSlide]);

  const prevSlide = useCallback(() => {
    if (totalItems === 0) return;
    const prev = (currentIndex - 1 + totalItems) % totalItems;
    scrollToSlide(prev);
  }, [currentIndex, totalItems, scrollToSlide]);

  return {
    sliderRef,
    currentIndex,
    scrollToSlide,
    nextSlide,
    prevSlide,
    handleScroll,
  };
}
