import { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  X,
  Maximize2,
  Sparkles,
  Camera
} from 'lucide-react';
import { GALLERY_PHOTOS } from '../data';
import { useHorizontalSlider } from '../hooks/useHorizontalSlider';

export default function PhotoGallery() {
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  const {
    sliderRef,
    currentIndex,
    totalDots,
    scrollToSlide,
    nextSlide,
    prevSlide,
    handleScroll,
  } = useHorizontalSlider({ totalItems: GALLERY_PHOTOS.length, gap: 20 });

  return (
    <section id="fotos" className="py-20 bg-white dark:bg-[#0c0c0c] border-t border-neutral-200 dark:border-neutral-850 transition-colors duration-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header with Navigation Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E5A91A]/10 border border-[#E5A91A]/30 text-xs font-semibold text-[#C48E0D] dark:text-[#E5A91A] mb-3">
              <Camera className="w-3.5 h-3.5" />
              <span>Galeria de Fotos</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-950 dark:text-white transition-colors">
              Momentos e registros reais
            </h2>
            <p className="mt-2 text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed transition-colors">
              Deslize para o lado para explorar um pouco mais dos nossos atendimentos.
            </p>
          </div>

          {/* Slider Navigation Arrows */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={prevSlide}
              aria-label="Foto anterior"
              className="w-10 h-10 rounded-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 hover:text-black dark:hover:text-white hover:border-[#E5A91A] dark:hover:border-[#E5A91A] flex items-center justify-center transition-all shadow-xs cursor-pointer active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Próxima foto"
              className="w-10 h-10 rounded-full bg-[#E5A91A] text-black hover:bg-[#d89c0f] flex items-center justify-center transition-all shadow-xs cursor-pointer active:scale-95 font-bold"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile Swipe Hint */}
        <div className="flex items-center justify-between sm:hidden mb-4 text-xs text-neutral-500 dark:text-neutral-400">
          <span className="inline-flex items-center gap-1 text-[11px] text-[#C48E0D] dark:text-[#E5A91A] font-medium">
            <Sparkles className="w-3 h-3" /> Deslize para o lado para ver mais fotos
          </span>
          <span className="font-mono text-xs">{currentIndex + 1} / {totalDots}</span>
        </div>

        {/* Horizontal Slider (Without captions/subtitles) */}
        <div
          ref={sliderRef}
          onScroll={handleScroll}
          className="flex gap-5 overflow-x-auto pb-6 pt-1 snap-x snap-mandatory scroll-smooth no-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {GALLERY_PHOTOS.map((photo, index) => (
            <div
              key={photo.id}
              onClick={() => setActivePhotoIndex(index)}
              className="w-[78vw] sm:w-[320px] md:w-[340px] lg:w-[320px] shrink-0 snap-start group relative rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 cursor-pointer transition-all shadow-xs"
            >
              {/* Image without any captions/text */}
              <div className="aspect-[3/4] w-full overflow-hidden relative">
                <img
                  src={photo.imageUrl}
                  alt={`Layla Rafaella Adestramento Canino - Registro real de aula prática ${index + 1}`}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />

                {/* Subtle Hover Gradient & Expand Icon */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-black/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform scale-75 group-hover:scale-100 shadow-lg backdrop-blur-xs">
                    <Maximize2 className="w-4 h-4 text-[#E5A91A]" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Dots */}
        {totalDots > 1 && (
          <div className="flex items-center justify-center gap-1.5 mt-2">
            {Array.from({ length: totalDots }).map((_, dotIdx) => (
              <button
                key={dotIdx}
                onClick={() => scrollToSlide(dotIdx)}
                aria-label={`Ir para foto ${dotIdx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${currentIndex === dotIdx
                  ? 'w-7 bg-[#E5A91A]'
                  : 'w-2 bg-neutral-300 dark:bg-neutral-800 hover:bg-neutral-400 dark:hover:bg-neutral-700'
                  }`}
              />
            ))}
          </div>
        )}

      </div>

      {/* Pure Photo Lightbox (Without Captions) */}
      {activePhotoIndex !== null && GALLERY_PHOTOS[activePhotoIndex] && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setActivePhotoIndex(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setActivePhotoIndex(null)}
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Previous photo button in lightbox */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActivePhotoIndex((prev) => (prev !== null ? (prev - 1 + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length : 0));
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/70 hover:bg-[#E5A91A] hover:text-black text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Foto anterior"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next photo button in lightbox */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActivePhotoIndex((prev) => (prev !== null ? (prev + 1) % GALLERY_PHOTOS.length : 0));
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/70 hover:bg-[#E5A91A] hover:text-black text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Próxima foto"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Clean High-Res Photo Display */}
          <div
            className="relative max-w-4xl max-h-[85vh] w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={GALLERY_PHOTOS[activePhotoIndex].imageUrl}
              alt="Foto ampliada"
              className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
            />
          </div>

          {/* Counter at bottom */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/70 text-white text-xs font-mono">
            {activePhotoIndex + 1} / {GALLERY_PHOTOS.length}
          </div>
        </div>
      )}

    </section>
  );
}
