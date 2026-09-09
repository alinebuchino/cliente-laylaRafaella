import { useState, ChangeEvent } from 'react';
import {
  Star,
  Quote,
  CheckCircle2,
  MessageCircle,
  Heart,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Camera,
  Upload
} from 'lucide-react';
import { TESTIMONIALS, CONTACT_INFO } from '../data';
import { Testimonial } from '../types';
import { useHorizontalSlider } from '../hooks/useHorizontalSlider';

export default function TestimonialsSection() {
  const [selectedPhotoTestimonial, setSelectedPhotoTestimonial] = useState<Testimonial | null>(null);
  const [customPhotos, setCustomPhotos] = useState<Record<string, string>>({});

  const {
    sliderRef,
    currentIndex,
    scrollToSlide,
    nextSlide,
    prevSlide,
    handleScroll,
  } = useHorizontalSlider({ totalItems: TESTIMONIALS.length, gap: 24 });

  const handleCustomPhotoUpload = (e: ChangeEvent<HTMLInputElement>, id: string) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomPhotos((prev) => ({ ...prev, [id]: url }));
    }
  };

  const whatsappGeneralUrl = `https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(
    'Olá Layla! Li os depoimentos reais dos tutores no seu site e gostaria de agendar uma avaliação para o meu cachorro.'
  )}`;

  return (
    <section id="depoimentos" className="py-20 bg-neutral-50 dark:bg-[#0f0f0f] border-t border-neutral-200 dark:border-neutral-800/80 transition-colors duration-200 relative overflow-hidden">
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
              Veja fotos e relatos em primeira pessoa de tutores que superaram puxões, medos e desobediência com o método de Layla Rafaella.
            </p>
          </div>

          {/* Slider Navigation Buttons (Desktop & Tablet) */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400 mr-2">
              <span>{currentIndex + 1} de {TESTIMONIALS.length}</span>
            </div>
            
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

        {/* Slider Indicator Bar for Mobile Touch */}
        <div className="flex items-center justify-between sm:hidden mb-4 text-xs text-neutral-500 dark:text-neutral-400">
          <span className="inline-flex items-center gap-1 text-[11px] text-[#C48E0D] dark:text-[#E5A91A] font-medium">
            <Sparkles className="w-3 h-3" /> Deslize para o lado para ver mais
          </span>
          <span className="font-mono text-xs">{currentIndex + 1} / {TESTIMONIALS.length}</span>
        </div>

        {/* Carousel Container */}
        <div
          ref={sliderRef}
          onScroll={handleScroll}
          className="flex gap-6 overflow-x-auto pb-6 pt-2 snap-x snap-mandatory scroll-smooth no-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {TESTIMONIALS.map((item, index) => {
            const currentPhoto = customPhotos[item.id] || item.photoUrl;

            return (
              <div
                key={item.id}
                className="w-[88vw] sm:w-[380px] md:w-[420px] lg:w-[400px] shrink-0 snap-start rounded-2xl bg-white dark:bg-[#0c0c0c] border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 flex flex-col justify-between transition-all shadow-xs overflow-hidden group"
              >
                {/* Photo of the Real Client / Testimonial */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-100 dark:bg-neutral-900 border-b border-neutral-100 dark:border-neutral-800">
                  {currentPhoto ? (
                    <img
                      src={currentPhoto}
                      alt={`Depoimento de ${item.tutorName} e seu cão ${item.dogName}`}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-neutral-400 p-4 text-center">
                      <Camera className="w-8 h-8 mb-1 text-[#E5A91A]" />
                      <span className="text-xs">Foto do cliente / print do depoimento</span>
                    </div>
                  )}

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent pointer-events-none" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                    <span className="text-[10px] font-semibold text-white bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                      {item.serviceType}
                    </span>

                    <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-1 rounded-full border border-white/10 text-[#E5A91A] text-xs">
                      <Star className="w-3 h-3 fill-current" />
                      <span className="font-bold text-white text-[11px]">5.0</span>
                    </div>
                  </div>

                  {/* Bottom Info over Image */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between pointer-events-auto">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#E5A91A] tracking-wider block drop-shadow-sm">
                        {item.date || 'Depoimento Real'}
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold text-white drop-shadow-sm leading-tight">
                        {item.dogName} • {item.dogBreed}
                      </h4>
                    </div>

                    {/* Expand Photo Button */}
                    <button
                      onClick={() => setSelectedPhotoTestimonial(item)}
                      title="Ampliar foto do depoimento"
                      className="w-7 h-7 rounded-lg bg-black/70 hover:bg-[#E5A91A] hover:text-black text-white flex items-center justify-center backdrop-blur-sm transition-colors cursor-pointer"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Card Body with Story in First Person */}
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div>
                    {/* First-person story quote */}
                    <div className="relative mb-4">
                      <Quote className="w-5 h-5 text-[#E5A91A]/30 dark:text-[#E5A91A]/40 mb-1" />
                      <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-200 leading-relaxed font-normal italic">
                        "{item.story}"
                      </p>
                    </div>

                    {/* Result Achievement Tag */}
                    <div className="pt-3 border-t border-neutral-100 dark:border-neutral-850 flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#C48E0D] dark:text-[#E5A91A] shrink-0 mt-0.5" />
                      <span className="text-xs font-semibold text-neutral-900 dark:text-neutral-200">
                        {item.result}
                      </span>
                    </div>
                  </div>

                  {/* Tutor Profile Footer */}
                  <div className="mt-5 pt-4 border-t border-neutral-100 dark:border-neutral-850 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#E5A91A]/15 border border-[#E5A91A]/30 flex items-center justify-center font-bold text-xs text-[#C48E0D] dark:text-[#E5A91A]">
                        {item.tutorName.charAt(0)}
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-neutral-950 dark:text-white leading-tight">
                          {item.tutorName}
                        </h5>
                        <p className="text-[10px] text-neutral-500 dark:text-neutral-400">
                          Tutor(a) verificado(a)
                        </p>
                      </div>
                    </div>

                    {/* Option to replace/test photo directly */}
                    <label
                      title="Adicionar ou trocar foto/print deste depoimento"
                      className="cursor-pointer inline-flex items-center gap-1 text-[11px] text-neutral-400 hover:text-[#C48E0D] dark:hover:text-[#E5A91A] transition-colors py-1 px-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-850"
                    >
                      <Upload className="w-3 h-3" />
                      <span className="hidden sm:inline">Trocar foto</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleCustomPhotoUpload(e, item.id)}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination Dots */}
        <div className="flex items-center justify-center gap-2 mt-4">
          {TESTIMONIALS.map((_, dotIdx) => (
            <button
              key={dotIdx}
              onClick={() => scrollToSlide(dotIdx)}
              aria-label={`Ir para slide ${dotIdx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                currentIndex === dotIdx
                  ? 'w-7 bg-[#E5A91A]'
                  : 'w-2 bg-neutral-300 dark:bg-neutral-800 hover:bg-neutral-400 dark:hover:bg-neutral-700'
              }`}
            />
          ))}
        </div>

        {/* Bottom CTA to encourage tutor contact */}
        <div className="mt-12 p-6 rounded-2xl bg-white dark:bg-[#0c0c0c] border border-neutral-200 dark:border-neutral-800 text-center max-w-2xl mx-auto shadow-xs">
          <h3 className="text-base sm:text-lg font-bold text-neutral-950 dark:text-white">
            Quer ver essa transformação na rotina do seu cão?
          </h3>
          <p className="mt-1.5 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 max-w-lg mx-auto">
            Não importa se o desafio é puxar a guia, ansiedade de separação ou reatividade. Converse diretamente com a Layla e tire suas dúvidas.
          </p>
          <div className="mt-5 flex justify-center">
            <a
              href={whatsappGeneralUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#E5A91A] hover:bg-[#d89c0f] text-black font-semibold text-xs shadow-xs transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Quero uma avaliação para o meu cão</span>
            </a>
          </div>
        </div>

      </div>

      {/* Lightbox Modal for Testimonial Photo */}
      {selectedPhotoTestimonial && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
          <div className="relative max-w-2xl w-full bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden shadow-2xl">
            {/* Modal Close Button */}
            <button
              onClick={() => setSelectedPhotoTestimonial(null)}
              className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Photo Preview */}
            <div className="aspect-[16/10] sm:aspect-[16/9] w-full bg-black overflow-hidden flex items-center justify-center">
              <img
                src={customPhotos[selectedPhotoTestimonial.id] || selectedPhotoTestimonial.photoUrl}
                alt={selectedPhotoTestimonial.tutorName}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Modal Details */}
            <div className="p-6">
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs font-semibold text-[#C48E0D] dark:text-[#E5A91A] bg-[#E5A91A]/10 px-2.5 py-1 rounded">
                  {selectedPhotoTestimonial.serviceType}
                </span>

                <div className="flex text-[#E5A91A]">
                  {[...Array(selectedPhotoTestimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </div>

              <p className="text-sm text-neutral-700 dark:text-neutral-300 italic mb-4">
                "{selectedPhotoTestimonial.story}"
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-neutral-200 dark:border-neutral-800 text-xs">
                <div>
                  <h4 className="font-bold text-neutral-900 dark:text-white">
                    {selectedPhotoTestimonial.tutorName}
                  </h4>
                  <p className="text-neutral-500 dark:text-neutral-400">
                    Tutor(a) de {selectedPhotoTestimonial.dogName} ({selectedPhotoTestimonial.dogBreed})
                  </p>
                </div>

                <div className="flex items-center gap-1.5 text-[#C48E0D] dark:text-[#E5A91A] font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{selectedPhotoTestimonial.result}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
