import { useState, useRef, useCallback, useEffect } from 'react';

interface UseHorizontalSliderOptions {
  totalItems: number;
  gap?: number;
}

/**
 * Custom hook to manage responsive horizontal carousels with smooth scrolling,
 * snap navigation, and current index tracking based on reachable scroll steps.
 */
export function useHorizontalSlider({ totalItems, gap = 20 }: UseHorizontalSliderOptions) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(() => Math.max(0, totalItems - 1));
  const sliderRef = useRef<HTMLDivElement | null>(null);

  // Recalculates the maximum reachable index based on container and card dimensions
  const updateMetrics = useCallback(() => {
    const el = sliderRef.current;
    if (!el || totalItems === 0) {
      setMaxIndex(0);
      setCurrentIndex(0);
      return;
    }

    const { scrollWidth, clientWidth } = el;
    const maxScroll = Math.max(0, scrollWidth - clientWidth);

    if (maxScroll <= 5) {
      setMaxIndex(0);
      setCurrentIndex(0);
      return;
    }

    const firstChild = el.firstElementChild as HTMLElement | null;
    const cardWidth = firstChild ? firstChild.getBoundingClientRect().width : 320;
    const step = cardWidth + gap;

    // Number of steps to reach the end of the scroll container
    const calculatedMax = Math.max(0, Math.round(maxScroll / step));
    const finalMax = calculatedMax === 0 && maxScroll > 30 ? 1 : calculatedMax;
    const clampedMax = Math.min(finalMax, Math.max(0, totalItems - 1));

    setMaxIndex(clampedMax);
    setCurrentIndex((prev) => Math.min(prev, clampedMax));
  }, [totalItems, gap]);

  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;

    updateMetrics();

    const ro = new ResizeObserver(() => {
      updateMetrics();
    });
    ro.observe(el);
    if (el.firstElementChild) {
      ro.observe(el.firstElementChild);
    }

    window.addEventListener('resize', updateMetrics);
    window.addEventListener('orientationchange', updateMetrics);

    const images = el.querySelectorAll('img');
    images.forEach((img) => {
      if (!img.complete) {
        img.addEventListener('load', updateMetrics);
      }
    });

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', updateMetrics);
      window.removeEventListener('orientationchange', updateMetrics);
      images.forEach((img) => {
        img.removeEventListener('load', updateMetrics);
      });
    };
  }, [updateMetrics]);

  const handleScroll = useCallback(() => {
    const el = sliderRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const maxScroll = Math.max(0, scrollWidth - clientWidth);

    if (maxScroll <= 5) {
      setCurrentIndex(0);
      return;
    }

    // When scrolled to or near the very end of the scroll container
    if (scrollLeft >= maxScroll - 14) {
      setCurrentIndex(maxIndex);
      return;
    }

    // When at the very beginning
    if (scrollLeft <= 5) {
      setCurrentIndex(0);
      return;
    }

    const firstChild = el.firstElementChild as HTMLElement | null;
    const cardWidth = firstChild ? firstChild.getBoundingClientRect().width : 320;
    const step = cardWidth + gap;
    const rawIndex = Math.round(scrollLeft / step);
    setCurrentIndex(Math.min(Math.max(rawIndex, 0), maxIndex));
  }, [gap, maxIndex]);

  const scrollToSlide = useCallback(
    (index: number) => {
      const el = sliderRef.current;
      if (!el) return;
      const targetIndex = Math.min(Math.max(index, 0), maxIndex);
      const { scrollWidth, clientWidth } = el;
      const maxScroll = Math.max(0, scrollWidth - clientWidth);

      if (targetIndex >= maxIndex) {
        el.scrollTo({
          left: maxScroll,
          behavior: 'smooth',
        });
      } else {
        const firstChild = el.firstElementChild as HTMLElement | null;
        const cardWidth = firstChild ? firstChild.getBoundingClientRect().width : 320;
        const step = cardWidth + gap;
        el.scrollTo({
          left: Math.min(targetIndex * step, maxScroll),
          behavior: 'smooth',
        });
      }
      setCurrentIndex(targetIndex);
    },
    [gap, maxIndex]
  );

  const nextSlide = useCallback(() => {
    if (maxIndex === 0) return;
    const next = currentIndex >= maxIndex ? 0 : currentIndex + 1;
    scrollToSlide(next);
  }, [currentIndex, maxIndex, scrollToSlide]);

  const prevSlide = useCallback(() => {
    if (maxIndex === 0) return;
    const prev = currentIndex <= 0 ? maxIndex : currentIndex - 1;
    scrollToSlide(prev);
  }, [currentIndex, maxIndex, scrollToSlide]);

  const totalDots = maxIndex + 1;

  return {
    sliderRef,
    currentIndex,
    totalDots,
    maxIndex,
    scrollToSlide,
    nextSlide,
    prevSlide,
    handleScroll,
  };
}
