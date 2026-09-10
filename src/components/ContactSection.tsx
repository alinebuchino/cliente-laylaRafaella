import { useState, FormEvent } from 'react';
import { Instagram, MessageCircle, MapPin, Clock, ArrowUpRight } from 'lucide-react';
import { CONTACT_INFO } from '../data';

export default function ContactSection() {
  const [tutorName, setTutorName] = useState('');
  const [dogName, setDogName] = useState('');
  const [message, setMessage] = useState('');

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();
    let text = `Olá Layla! Me chamo ${tutorName || 'um tutor interessado'}`;
    if (dogName) text += ` e sou tutor(a) do cãozinho *${dogName}*`;
    if (message) text += `.\nAssunto: ${message}`;
    text += `.\nGostaria de entender melhor como funciona o adestramento e agendar uma avaliação.`;

    const url = `https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const directWhatsappUrl = `https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent('Olá Layla! Gostaria de tirar dúvidas e agendar uma avaliação para o meu cão.')}`;

  return (
    <section id="contato" className="py-20 bg-neutral-50 dark:bg-[#0f0f0f] border-t border-neutral-200 dark:border-neutral-800/80 transition-colors duration-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold text-[#C48E0D] dark:text-[#E5A91A] tracking-wider uppercase transition-colors">
            Entre em Contato
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-950 dark:text-white mt-1.5 transition-colors">
            Quer ver a mesma transformação com o seu cachorro?
          </h2>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300 transition-colors">
            Dê o primeiro passo e tire suas dúvidas ou agende uma avaliação comportamental pelo WhatsApp ou acompanhe o perfil no Instagram.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">

          {/* Left Column: Direct Links (5 cols) */}
          <div className="md:col-span-5 space-y-4">

            {/* Instagram Card */}
            <a
              href={CONTACT_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-5 rounded-xl bg-white dark:bg-[#0c0c0c] border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors shadow-xs group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center text-[#C48E0D] dark:text-[#E5A91A] group-hover:text-black dark:group-hover:text-white transition-colors">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400 block">Instagram Oficial</span>
                    <strong className="text-sm text-neutral-900 dark:text-white font-semibold">{CONTACT_INFO.instagramHandle}</strong>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-[#C48E0D] dark:group-hover:text-[#E5A91A] transition-colors" />
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-3 leading-relaxed">
                Acompanhe vídeos práticos do dia a dia, dicas de educação canina e bastidores das imersões.
              </p>
            </a>

            {/* Direct WhatsApp Action */}
            <a
              href={directWhatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-5 rounded-xl bg-white dark:bg-[#0c0c0c] border border-neutral-200 dark:border-neutral-800 hover:border-[#E5A91A]/60 transition-colors shadow-xs group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#E5A91A] text-black flex items-center justify-center font-bold">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400 block">WhatsApp Direto</span>
                    <strong className="text-sm text-neutral-900 dark:text-white font-semibold">{CONTACT_INFO.whatsappDisplay}</strong>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-[#C48E0D] dark:group-hover:text-[#E5A91A] transition-colors" />
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-3 leading-relaxed">
                Envie uma mensagem rápida para consultar datas, valores e disponibilidade.
              </p>
            </a>

            {/* Operational Info */}
            <div className="p-4 rounded-xl bg-white/70 dark:bg-[#0c0c0c]/60 border border-neutral-200 dark:border-neutral-850 text-xs text-neutral-600 dark:text-neutral-400 space-y-2 transition-colors">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C48E0D] dark:text-[#E5A91A] shrink-0 mt-0.5" />
                <span>{CONTACT_INFO.location}</span>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 text-[#C48E0D] dark:text-[#E5A91A] shrink-0 mt-0.5" />
                <span>{CONTACT_INFO.hours}</span>
              </div>
            </div>

          </div>

          {/* Right Column: Quick Contact Form (7 cols) */}
          <div className="md:col-span-7">
            <div className="p-6 rounded-xl bg-white dark:bg-[#0c0c0c] border border-neutral-200 dark:border-neutral-800 shadow-sm transition-colors">
              <h3 className="text-base font-bold text-neutral-950 dark:text-white mb-1">
                Envie uma mensagem rápida
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-5">
                Preencha os campos para abrir a conversa no WhatsApp já personalizada.
              </p>

              <form onSubmit={handleSendMessage} className="space-y-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                      Seu Nome
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Carlos"
                      value={tutorName}
                      onChange={(e) => setTutorName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white text-xs focus:outline-none focus:border-[#E5A91A] focus:bg-white dark:focus:bg-neutral-900 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                      Nome do Cachorro
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Rex"
                      value={dogName}
                      onChange={(e) => setDogName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white text-xs focus:outline-none focus:border-[#E5A91A] focus:bg-white dark:focus:bg-neutral-900 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Como eu, Layla, posso te ajudar?
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Ex: Meu cão puxa muito na guia e late para outros cães na rua..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white text-xs focus:outline-none focus:border-[#E5A91A] focus:bg-white dark:focus:bg-neutral-900 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-[#E5A91A] hover:bg-[#d89c0f] text-black font-semibold text-xs transition-all flex items-center justify-center gap-2 mt-2 shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Iniciar Conversa no WhatsApp</span>
                </button>
              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
