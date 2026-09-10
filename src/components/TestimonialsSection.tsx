import { useState } from 'react';
import {
  Quote,
  MessageCircle,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Camera
} from 'lucide-react';
import { TESTIMONIALS, CONTACT_INFO } from '../data';
import { Testimonial } from '../types';
import { useHorizontalSlider } from '../hooks/useHorizontalSlider';

export default function TestimonialsSection() {
  const [selectedPhotoTestimonial, setSelectedPhotoTestimonial] =
    useState<Testimonial | null>(null);

  const {
    sliderRef,
    currentIndex,
    totalDots,
    scrollToSlide,
    nextSlide,
    prevSlide,
    handleScroll,
  } = useHorizontalSlider({
    totalItems: TESTIMONIALS.length,
    gap: 24
  });

  const whatsappGeneralUrl = `https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(
    'Olá Layla! Li os depoimentos reais dos tutores no seu site e gostaria de agendar uma avaliação para o meu cachorro.'
  )}`;

  return (
    <section
      id="depoimentos"
      className="py-20 bg-neutral-50 dark:bg-[#0f0f0f] border-t border-neutral-200 dark:border-neutral-800/80 transition-colors duration-200 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E5A91A]/10 border border-[#E5A91A]/30 text-xs font-semibold text-[#C48E0D] dark:text-[#E5A91A] mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Depoimentos Reais dos Clientes</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-950 dark:text-white transition-colors">
              Histórias reais de quem transformou a convivência
            </h2>

            <p className="mt-2 text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed transition-colors">
              Veja fotos e relatos em primeira pessoa de tutores que superaram puxões, medos e desobediência com o nosso método de ensino.
            </p>
          </div>

          {/* Slider Navigation Buttons */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={prevSlide}
              aria-label="Depoimento anterior"
              className="w-10 h-10 rounded-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 hover:text-black dark:hover:text-white hover:border-[#E5A91A] dark:hover:border-[#E5A91A] flex items-center justify-center transition-all shadow-xs cursor-pointer active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={nextSlide}
              aria-label="Próximo depoimento"
              className="w-10 h-10 rounded-full bg-[#E5A91A] text-black hover:bg-[#d89c0f] flex items-center justify-center transition-all shadow-xs cursor-pointer active:scale-95 font-bold"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile Swipe Hint */}
        <div className="flex items-center justify-between sm:hidden mb-4 text-xs text-neutral-500 dark:text-neutral-400">
          <span className="inline-flex items-center gap-1 text-[11px] text-[#C48E0D] dark:text-[#E5A91A] font-medium">
            <Sparkles className="w-3 h-3" />
            Deslize horizontalmente para ver mais relatos
          </span>

          <span className="font-mono text-xs">
            {currentIndex + 1} / {totalDots}
          </span>
        </div>

        {/* Carousel Container */}
        <div
          ref={sliderRef}
          onScroll={handleScroll}
          className="flex gap-6 overflow-x-auto pb-6 pt-2 snap-x snap-mandatory scroll-smooth no-scrollbar"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="
                w-[88vw]
                sm:w-[380px]
                md:w-[420px]
                lg:w-[400px]
                h-[360px]
                shrink-0
                snap-start
                rounded-2xl
                bg-white
                dark:bg-[#0c0c0c]
                border
                border-neutral-200
                dark:border-neutral-800
                hover:border-neutral-300
                dark:hover:border-neutral-700
                flex
                flex-col
                transition-all
                shadow-xs
                overflow-hidden
                group
              "
            >
              {/* Photo */}
              <div className="relative w-full h-full overflow-hidden bg-neutral-100 dark:bg-neutral-900">
                {item.photoUrl ? (
                  <img
                    src={item.photoUrl}
                    alt={`Depoimento de tutor de cão atendido por Layla Rafaella Adestradora - Depoimento ${item.id}`}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-neutral-400 p-4 text-center">
                    <Camera className="w-8 h-8 mb-1 text-[#E5A91A]" />
                    <span className="text-xs">
                      Foto do cliente
                    </span>
                  </div>
                )}

                {/* Expand Photo Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={() =>
                      setSelectedPhotoTestimonial(item)
                    }
                    title="Ampliar foto do depoimento"
                    className="w-10 h-10 rounded-full bg-black/70 hover:bg-[#E5A91A] hover:text-black text-white flex items-center justify-center backdrop-blur-sm transition-colors cursor-pointer"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Dots */}
        {totalDots > 1 && (
          <div className="flex items-center justify-center gap-2 mt-4">
            {Array.from({ length: totalDots }).map((_, dotIdx) => (
              <button
                key={dotIdx}
                onClick={() => scrollToSlide(dotIdx)}
                aria-label={`Ir para depoimento ${dotIdx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${currentIndex === dotIdx
                  ? 'w-7 bg-[#E5A91A]'
                  : 'w-2 bg-neutral-300 dark:bg-neutral-800 hover:bg-neutral-400 dark:hover:bg-neutral-700'
                  }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedPhotoTestimonial && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
          <div className="relative max-w-2xl w-full bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden shadow-2xl">

            {/* Close Button */}
            <button
              onClick={() =>
                setSelectedPhotoTestimonial(null)
              }
              className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Photo Preview */}
            <div className="max-h-[85vh] w-full bg-black overflow-hidden flex items-center justify-center">
              <img
                src={selectedPhotoTestimonial.photoUrl}
                alt={`Depoimento ${selectedPhotoTestimonial.id}`}
                className="w-full max-h-[85vh] object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
