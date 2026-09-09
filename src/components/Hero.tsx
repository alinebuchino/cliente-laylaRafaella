import { Play, MessageCircle } from 'lucide-react';
import { ASSETS, CONTACT_INFO } from '../data';

export default function Hero() {
  const whatsappUrl = `https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent('Olá Layla! Gostaria de agendar uma avaliação comportamental para o meu cão.')}`;

  return (
    <section id="inicio" className="pt-32 pb-20 sm:pt-36 sm:pb-28 bg-white dark:bg-[#0c0c0c] transition-colors duration-200 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left: Concise Copy (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-6 transition-colors">
              <span className="w-2 h-2 rounded-full bg-[#E5A91A]" />
              <span>Layla Rafaella • Adestradora Canina</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-950 dark:text-white leading-[1.2] transition-colors">
              Adestramento canino com foco em <span className="text-[#C48E0D] dark:text-[#E5A91A]">respeito</span>, equilíbrio e conexão.
            </h1>

            <p className="mt-5 text-base sm:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-xl transition-colors">
              Educação comportamental prática para cães e tutores. Aulas presenciais a domicílio, imersões práticas e consultorias online.
            </p>

            {/* Direct CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-3.5 w-full sm:w-auto">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#E5A91A] hover:bg-[#d89c0f] text-black font-semibold text-sm shadow-xs transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Agendar Avaliação no WhatsApp</span>
              </a>

              <a
                href="#video"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-850 text-neutral-800 dark:text-neutral-200 hover:text-black dark:hover:text-white border border-neutral-200 dark:border-neutral-800 text-sm font-medium transition-all"
              >
                <Play className="w-3.5 h-3.5 text-[#C48E0D] dark:text-[#E5A91A] fill-current" />
                <span>Ver Vídeo Prático</span>
              </a>
            </div>

            {/* Subtle Clean Highlights */}
            <div className="mt-10 pt-6 border-t border-neutral-200 dark:border-neutral-850/80 flex flex-wrap items-center gap-6 text-xs text-neutral-500 dark:text-neutral-400 transition-colors">
              <div className="flex items-center gap-1.5">
                <span className="text-neutral-900 dark:text-white font-semibold">+500</span> cães educados
              </div>
              <span className="text-neutral-300 dark:text-neutral-700">•</span>
              <div className="flex items-center gap-1.5">
                <span className="text-[#C48E0D] dark:text-[#E5A91A] font-semibold">100%</span> sem violência
              </div>
              <span className="text-neutral-300 dark:text-neutral-700">•</span>
              <div>Grande SP e Online para todo o Brasil</div>
            </div>

          </div>

          {/* Right: Clean Photography (5 cols) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-xl bg-neutral-100 dark:bg-neutral-900 transition-colors">
              <img
                src={ASSETS.hero}
                alt="Layla Rafaella adestrando cão ao ar livre"
                className="w-full h-[380px] sm:h-[420px] object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs">
                <span className="text-white font-medium">Condução serena em passeio urbano</span>
                <span className="text-[#E5A91A] font-semibold">Guia Frouxa</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
