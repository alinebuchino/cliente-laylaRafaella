import { MessageCircle } from 'lucide-react';
import { CONTACT_INFO } from '../data';

export default function FloatingWhatsApp() {
  const whatsappUrl = `https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent('Olá Layla! Gostaria de tirar dúvidas sobre o adestramento canino.')}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-[#E5A91A] hover:bg-[#d89c0f] text-black flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95"
      aria-label="Falar no WhatsApp"
      title="Falar no WhatsApp com Layla Rafaella"
    >
      <MessageCircle className="w-6 h-6 fill-black text-black" />
    </a>
  );
}
