import { LucideIcon, Dog, Users, Video, Home, ArrowRight } from 'lucide-react';
import { CONTACT_INFO } from '../data';

interface ServiceCardData {
  id: string;
  icon: LucideIcon;
  title: string;
  subtitle: string;
  desc: string;
  points: string[];
  badge: string;
}

const SERVICES_LIST: ServiceCardData[] = [
  {
    id: 'adestramento',
    icon: Dog,
    title: 'Adestramento Canino',
    subtitle: 'Comportamento & Obediência',
    desc: 'Correção de comportamentos indesejados: puxar na guia, reatividade com outros cães ou pessoas, pulos em visitas e latidos excessivos.',
    points: ['Passeio agradável com guia solta', 'Controle de impulsos e foco', 'Resolução de medos e reatividade'],
    badge: 'Principal',
  },
  {
    id: 'imersao',
    icon: Users,
    title: 'Imersões para Donos',
    subtitle: 'Workshops & Prática em Grupo',
    desc: 'Experiência imersiva e dinâmica para os tutores aprenderem a ler sinais corporais, conduzir com calma e liderar com segurança.',
    points: ['Leitura de linguagem canina', 'Dinâmicas práticas com cães reais', 'Manejo correto de guias e recompensas'],
    badge: 'Exclusivo',
  },
  {
    id: 'consultoria',
    icon: Video,
    title: 'Consultorias Online',
    subtitle: 'Atendimento Individual por Vídeo',
    desc: 'Orientação personalizada para tutores de qualquer região. Ajuste de rotina, preparo para filhotes e plano de ação estruturado.',
    points: ['Chamada de vídeo individual 1 a 1', 'Plano de treino personalizado em PDF', 'Suporte direto via WhatsApp'],
    badge: 'Todo o Brasil',
  },
  {
    id: 'presencial',
    icon: Home,
    title: 'Atendimentos Presenciais',
    subtitle: 'Aulas a Domicílio e na Rua',
    desc: 'Treinamento prático direto no ambiente onde as situações acontecem: sua casa, portão, praças e ruas do seu bairro.',
    points: ['Visita e avaliação no domicílio', 'Treino em situações reais da rotina', 'Participação de toda a família'],
    badge: 'Grande SP',
  },
];

export default function ServicesSection() {
  return (
    <section id="servicos" className="py-20 bg-neutral-50 dark:bg-[#0f0f0f] border-t border-neutral-200 dark:border-neutral-800/80 transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold text-[#C48E0D] dark:text-[#E5A91A] tracking-wider uppercase transition-colors">
            Serviços Prestados
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-950 dark:text-white mt-1.5 transition-colors">
            Como Layla pode ajudar você e seu cão
          </h2>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300 transition-colors">
            Formatos flexíveis e objetivos para atender as necessidades específicas da sua rotina.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SERVICES_LIST.map((item) => {
            const Icon = item.icon;
            const whatsappUrl = `https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(
              `Olá Layla! Gostaria de informações sobre o serviço: *${item.title}*.`
            )}`;

            return (
              <div
                key={item.id}
                className="rounded-xl bg-white dark:bg-[#0c0c0c] border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 p-6 flex flex-col justify-between transition-colors shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-[#C48E0D] dark:text-[#E5A91A] transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-semibold text-neutral-600 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-900 px-2.5 py-1 rounded border border-neutral-200 dark:border-neutral-800 transition-colors">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-neutral-950 dark:text-white transition-colors">{item.title}</h3>
                  <div className="text-xs text-[#C48E0D] dark:text-[#E5A91A] font-medium mt-0.5 transition-colors">{item.subtitle}</div>

                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 mt-3 leading-relaxed transition-colors">
                    {item.desc}
                  </p>

                  <ul className="mt-4 space-y-1.5 border-t border-neutral-100 dark:border-neutral-850 pt-4 transition-colors">
                    {item.points.map((point, i) => (
                      <li key={i} className="text-xs text-neutral-600 dark:text-neutral-400 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E5A91A]" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-850 flex items-center justify-between transition-colors">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#C48E0D] dark:text-[#E5A91A] hover:text-[#9e6d08] dark:hover:text-[#f3bb32] transition-colors"
                  >
                    <span>Consultar no WhatsApp</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
