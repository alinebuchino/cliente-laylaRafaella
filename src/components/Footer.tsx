import { Instagram, MessageCircle } from 'lucide-react';
import Logo from './Logo';
import { CONTACT_INFO } from '../data';

export default function Footer() {
  return (
    <footer className="bg-neutral-100 dark:bg-[#080808] border-t border-neutral-200 dark:border-neutral-900 py-10 text-neutral-600 dark:text-neutral-400 text-xs transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-neutral-200 dark:border-neutral-900">
          <Logo size="sm" />

          <div className="flex items-center gap-6">
            <a
              href={CONTACT_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-black dark:hover:text-[#E5A91A] transition-colors"
            >
              <Instagram className="w-4 h-4 text-[#C48E0D] dark:text-[#E5A91A]" />
              <span>{CONTACT_INFO.instagramHandle}</span>
            </a>

            <a
              href={`https://wa.me/${CONTACT_INFO.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-black dark:hover:text-[#E5A91A] transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-[#C48E0D] dark:text-[#E5A91A]" />
              <span>{CONTACT_INFO.whatsappDisplay}</span>
            </a>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-neutral-500 text-[11px]">
          <p>© {new Date().getFullYear()} Layla Rafaella • Adestramento Canino <br></br>Todos os direitos reservados.</p>
          <p>Águas da Prata - SP e Região <br></br> Consultorias Online para todo o Brasil</p>
        </div>
      </div>
    </footer>
  );
}
