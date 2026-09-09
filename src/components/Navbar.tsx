import { useState, useEffect } from 'react';
import { Instagram, MessageCircle, Menu, X, Sun, Moon } from 'lucide-react';
import Logo from './Logo';
import { CONTACT_INFO } from '../data';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Sobre', href: '#sobre' },
    { label: 'Serviços', href: '#servicos' },
    { label: 'Fotos', href: '#fotos' },
    { label: 'Depoimentos', href: '#depoimentos' },
    { label: 'Contato', href: '#contato' },
  ];

  const whatsappUrl = `https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent('Olá Layla! Gostaria de saber mais sobre o adestramento para o meu cão.')}`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? 'bg-white/95 dark:bg-[#0c0c0c]/95 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800/80 py-3 shadow-xs'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between">
          <a href="#inicio" className="transition-opacity hover:opacity-90">
            <Logo size="sm" />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-300 hover:text-[#C48E0D] dark:hover:text-[#E5A91A] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Direct Actions: Theme Toggle, Instagram, WhatsApp */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Theme Toggle (Light: White & Yellow / Dark: Black & Yellow) */}
            <button
              onClick={toggleTheme}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors"
              title={isDark ? 'Mudar para Versão Branco e Amarelo' : 'Mudar para Modo Escuro (Preto e Amarelo)'}
              aria-label="Alternar tema"
            >
              {isDark ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-[#E5A91A]" />
                  <span className="text-[11px]">Modo Branco</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-neutral-600" />
                  <span className="text-[11px]">Modo Escuro</span>
                </>
              )}
            </button>

            <a
              href={CONTACT_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-neutral-600 dark:text-neutral-300 hover:text-[#C48E0D] dark:hover:text-[#E5A91A] hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
              title="Instagram @layla.adestradora"
            >
              <Instagram className="w-4 h-4" />
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#E5A91A] hover:bg-[#d89c0f] text-black text-xs font-semibold shadow-xs transition-all"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Mobile controls */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800"
              aria-label="Alternar tema"
            >
              {isDark ? <Sun className="w-4 h-4 text-[#E5A91A]" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-lg text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800"
              aria-label="Menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-[#111111] border-b border-neutral-200 dark:border-neutral-800 px-6 py-5 shadow-xl">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm font-medium text-neutral-800 dark:text-neutral-200 hover:text-[#C48E0D] dark:hover:text-[#E5A91A] py-1.5"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 border-t border-neutral-200 dark:border-neutral-800 flex flex-col gap-2.5">
              <a
                href={CONTACT_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-300 hover:text-[#C48E0D] dark:hover:text-[#E5A91A]"
              >
                <Instagram className="w-4 h-4 text-[#E5A91A]" />
                <span>Instagram @layla.adestradora</span>
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#E5A91A] text-black text-xs font-semibold mt-1"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Conversar no WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
