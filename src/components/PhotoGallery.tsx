import { useState, ChangeEvent, MouseEvent } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Upload,
  Link as LinkIcon,
  X,
  Maximize2,
  Trash2,
  Sparkles,
  Camera
} from 'lucide-react';
import { GALLERY_PHOTOS } from '../data';
import { useHorizontalSlider } from '../hooks/useHorizontalSlider';

interface GalleryItem {
  id: string;
  imageUrl: string;
  isCustom?: boolean;
}

export default function PhotoGallery() {
  const [photos, setPhotos] = useState<GalleryItem[]>(() =>
    GALLERY_PHOTOS.map((p) => ({ id: p.id, imageUrl: p.imageUrl }))
  );
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [urlInput, setUrlInput] = useState('');

  const {
    sliderRef,
    currentIndex,
    scrollToSlide,
    nextSlide,
    prevSlide,
    handleScroll,
  } = useHorizontalSlider({ totalItems: photos.length, gap: 20 });

  // Handle multiple file upload
  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newItems: GalleryItem[] = Array.from(files).map((file: File, i) => ({
        id: `custom-file-${Date.now()}-${i}`,
        imageUrl: URL.createObjectURL(file),
        isCustom: true,
      }));
      setPhotos((prev) => [...prev, ...newItems]);
      setShowAddModal(false);
      // Scroll to newly added photos
      setTimeout(() => {
        scrollToSlide(photos.length);
      }, 150);
    }
  };

  // Handle URL addition
  const handleAddByUrl = () => {
    if (urlInput.trim()) {
      const newItem: GalleryItem = {
        id: `custom-url-${Date.now()}`,
        imageUrl: urlInput.trim(),
        isCustom: true,
      };
      setPhotos((prev) => [...prev, newItem]);
      setUrlInput('');
      setShowAddModal(false);
      setTimeout(() => {
        scrollToSlide(photos.length);
      }, 150);
    }
  };

  // Remove a photo
  const handleRemovePhoto = (id: string, e: MouseEvent) => {
    e.stopPropagation();
    setPhotos((prev) => prev.filter((p) => p.id !== id));
    if (activePhotoIndex !== null && photos[activePhotoIndex]?.id === id) {
      setActivePhotoIndex(null);
    }
  };

  return (
    <section id="fotos" className="py-20 bg-white dark:bg-[#0c0c0c] border-t border-neutral-200 dark:border-neutral-850 transition-colors duration-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header with Navigation and Add Photo Button */}
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
              Deslize para o lado para explorar a galeria fotográfica dos nossos atendimentos e cães em evolução.
            </p>
          </div>

          {/* Action buttons & controls */}
          <div className="flex items-center gap-3 shrink-0 flex-wrap">
            {/* Add Photo Button */}
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-800 text-xs font-semibold transition-all shadow-xs cursor-pointer hover:border-[#E5A91A] dark:hover:border-[#E5A91A]"
            >
              <Plus className="w-4 h-4 text-[#C48E0D] dark:text-[#E5A91A]" />
              <span>Adicionar Fotos</span>
            </button>

            {/* Slider Navigation Arrows */}
            <div className="flex items-center gap-2">
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
        </div>

        {/* Mobile Swipe Hint */}
        <div className="flex items-center justify-between sm:hidden mb-4 text-xs text-neutral-500 dark:text-neutral-400">
          <span className="inline-flex items-center gap-1 text-[11px] text-[#C48E0D] dark:text-[#E5A91A] font-medium">
            <Sparkles className="w-3 h-3" /> Deslize para o lado para ver mais fotos
          </span>
          <span className="font-mono text-xs">{currentIndex + 1} / {photos.length}</span>
        </div>

        {/* Horizontal Slider (Without captions/subtitles) */}
        <div
          ref={sliderRef}
          onScroll={handleScroll}
          className="flex gap-5 overflow-x-auto pb-6 pt-1 snap-x snap-mandatory scroll-smooth no-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {photos.map((photo, index) => (
            <div
              key={photo.id}
              onClick={() => setActivePhotoIndex(index)}
              className="w-[78vw] sm:w-[320px] md:w-[340px] lg:w-[320px] shrink-0 snap-start group relative rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 cursor-pointer transition-all shadow-xs"
            >
              {/* Image without any captions/text */}
              <div className="aspect-[3/4] w-full overflow-hidden relative">
                <img
                  src={photo.imageUrl}
                  alt={`Registro fotográfico ${index + 1}`}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />

                {/* Subtle Hover Gradient & Expand Icon */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-black/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform scale-75 group-hover:scale-100 shadow-lg backdrop-blur-xs">
                    <Maximize2 className="w-4 h-4 text-[#E5A91A]" />
                  </div>
                </div>

                {/* Delete button if custom photo was added */}
                {photo.isCustom && (
                  <button
                    onClick={(e) => handleRemovePhoto(photo.id, e)}
                    title="Remover foto adicionada"
                    className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-black/75 hover:bg-red-600 text-white flex items-center justify-center backdrop-blur-xs transition-colors shadow-md z-10"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}

          {/* Interactive Card to Add More Photos at the end of the slide */}
          <div
            onClick={() => setShowAddModal(true)}
            className="w-[78vw] sm:w-[320px] md:w-[340px] lg:w-[320px] shrink-0 snap-start aspect-[3/4] rounded-2xl border-2 border-dashed border-neutral-300 dark:border-neutral-750 hover:border-[#E5A91A] dark:hover:border-[#E5A91A] bg-neutral-50 dark:bg-neutral-900/60 hover:bg-[#E5A91A]/5 flex flex-col items-center justify-center text-center p-6 cursor-pointer transition-all group"
          >
            <div className="w-14 h-14 rounded-full bg-neutral-100 dark:bg-neutral-800 group-hover:bg-[#E5A91A] group-hover:text-black text-neutral-600 dark:text-neutral-300 flex items-center justify-center mb-3 transition-colors shadow-xs">
              <Plus className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-neutral-900 dark:text-white group-hover:text-[#C48E0D] dark:group-hover:text-[#E5A91A] transition-colors">
              Adicionar Mais Fotos
            </h4>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 max-w-[200px]">
              Envie fotos do seu computador/celular ou cole um link de imagem.
            </p>
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex items-center justify-center gap-1.5 mt-2">
          {photos.map((_, dotIdx) => (
            <button
              key={dotIdx}
              onClick={() => scrollToSlide(dotIdx)}
              aria-label={`Ir para foto ${dotIdx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                currentIndex === dotIdx
                  ? 'w-7 bg-[#E5A91A]'
                  : 'w-2 bg-neutral-300 dark:bg-neutral-800 hover:bg-neutral-400 dark:hover:bg-neutral-700'
              }`}
            />
          ))}
        </div>

      </div>

      {/* Modal to Add Photos (Upload or Link) */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="relative bg-white dark:bg-[#111111] border border-neutral-200 dark:border-neutral-800 rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <Camera className="w-5 h-5 text-[#E5A91A]" />
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                Adicionar Fotos à Galeria
              </h3>
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-6">
              Você pode enviar uma ou várias fotos do seu dispositivo, ou colar o link de uma imagem da web.
            </p>

            {/* Option 1: File Upload (Supports multiple) */}
            <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-neutral-300 dark:border-neutral-700 hover:border-[#E5A91A] dark:hover:border-[#E5A91A] rounded-xl bg-neutral-50 dark:bg-neutral-900/80 cursor-pointer transition-colors group mb-5">
              <Upload className="w-8 h-8 text-[#E5A91A] mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-semibold text-neutral-900 dark:text-white">
                Selecione fotos do seu dispositivo
              </span>
              <span className="text-[11px] text-neutral-400 mt-1">
                Suporta PNG, JPG, WEBP (pode selecionar várias)
              </span>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>

            {/* Divider */}
            <div className="relative flex items-center justify-center mb-5">
              <div className="border-t border-neutral-200 dark:border-neutral-800 w-full" />
              <span className="bg-white dark:bg-[#111111] px-3 text-[11px] text-neutral-400 uppercase font-medium">
                Ou por link
              </span>
              <div className="border-t border-neutral-200 dark:border-neutral-800 w-full" />
            </div>

            {/* Option 2: Image URL */}
            <div className="space-y-3">
              <div className="relative">
                <LinkIcon className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="https://exemplo.com/foto-cachorro.jpg"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-lg text-xs bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white focus:outline-none focus:border-[#E5A91A]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-lg text-xs font-medium text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleAddByUrl}
                  disabled={!urlInput.trim()}
                  className="px-4 py-2 rounded-lg text-xs font-semibold bg-[#E5A91A] hover:bg-[#d89c0f] text-black disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Adicionar Foto
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pure Photo Lightbox (Without Captions) */}
      {activePhotoIndex !== null && photos[activePhotoIndex] && (
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
              setActivePhotoIndex((prev) => (prev !== null ? (prev - 1 + photos.length) % photos.length : 0));
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
              setActivePhotoIndex((prev) => (prev !== null ? (prev + 1) % photos.length : 0));
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
              src={photos[activePhotoIndex].imageUrl}
              alt="Foto ampliada"
              className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
            />
          </div>

          {/* Counter at bottom */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/70 text-white text-xs font-mono">
            {activePhotoIndex + 1} / {photos.length}
          </div>
        </div>
      )}

    </section>
  );
}
