import { ServiceItem, GalleryPhoto, Testimonial, ContactInfo } from './types';

import laylaImg from './assets/images/layla.jpeg';
import cliente1Img from './assets/images/clientes/clientes1.jpeg';
import cliente2Img from './assets/images/clientes/clientes2.jpeg';
import cliente3Img from './assets/images/clientes/clientes3.jpeg';
import cliente4Img from './assets/images/clientes/clientes4.jpeg';
import cliente5Img from './assets/images/clientes/clientes5.jpeg';
import cliente6Img from './assets/images/clientes/clientes6.jpeg';
import cliente7Img from './assets/images/clientes/clientes7.jpeg';

import depoimento1 from './assets/images/depoimentos/depoimento1.jpeg';
import depoimento2 from './assets/images/depoimentos/depoimento2.jpeg';
import depoimento3 from './assets/images/depoimentos/depoimento3.jpeg';
import depoimento4 from './assets/images/depoimentos/depoimento4.jpeg';
import depoimento5 from './assets/images/depoimentos/depoimento5.jpeg';
import depoimento6 from './assets/images/depoimentos/depoimento6.jpeg';

import laylaVideoPoster from './assets/images/layla_cao.png';

export const ASSETS = {
  layla: laylaImg,
  cliente1: cliente1Img,
  cliente2: cliente2Img,
  cliente3: cliente3Img,
  cliente4: cliente4Img,
  cliente5: cliente5Img,
  cliente6: cliente6Img,
  cliente7: cliente7Img,
  depoimento1: depoimento1,
  depoimento2: depoimento2,
  depoimento3: depoimento3,
  depoimento4: depoimento4,
  depoimento5: depoimento5,
  depoimento6: depoimento6,
  videoPoster: laylaVideoPoster,
};

export const PRESENTATION_VIDEO = {
  url: '/apresentacao_layla.mp4',
  title: '',
  poster: laylaVideoPoster,
};

export const CONTACT_INFO: ContactInfo = {
  name: 'Layla Rafaella',
  title: 'Adestradora Canina & Comportamentalista',
  instagramHandle: '@layla.adestradora',
  instagramUrl: 'https://www.instagram.com/layla.adestradora/',
  whatsappNumber: '5511998765432',
  whatsappDisplay: '(11) 99876-5432',
  location: 'Águas da Prata - SP e Região (Presencial) | Todo o Brasil (Online)',
  hours: 'Segunda a Sábado, das 08h às 19h'
};

export const SERVICES: ServiceItem[] = [
  {
    id: 'adestramento',
    title: 'Adestramento Comportamental',
    subtitle: 'Comunicação clara, obediência funcional e harmonia no lar',
    tag: 'Mais Procurado',
    description:
      'Soluções definitivas para comportamentos desafiadores como puxões na guia, reatividade a outros cães ou pessoas, pulos em visitas, destruição de objetos e latidos excessivos. Foco em ensinar ao cão o que fazer, com reforço positivo e limites justos.',
    features: [
      'Passeio agradável com guia frouxa sem puxões',
      'Controle de impulsos e autocontrole do cão',
      'Comandos de foco e obediência sob distrações reais',
      'Desensibilização de reatividade e medos',
      'Acompanhamento contínuo da evolução da família'
    ],
    idealFor: 'Cães de todas as idades que precisam de foco, equilíbrio e correção de hábitos indesejados.',
    format: 'Aulas práticas semanais personalizadas',
    iconName: 'Dog',
    featured: true,
  },
  {
    id: 'imersao',
    title: 'Imersões para Donos de Cachorros',
    subtitle: 'Workshops e vivências práticas para transformar a sua liderança',
    tag: 'Experiência Exclusiva',
    description:
      'Uma experiência imersiva desenvolvida para você, tutor, compreender profundamente a mente, a linguagem e a psicologia do seu cão. Você aprende na prática a conduzir passeios, mediar interações e se tornar o porto seguro que seu cachorro respeita e confia.',
    features: [
      'Leitura de linguagem corporal canina avançada',
      'Dinâmicas práticas em grupo com cães reais',
      'Manejo de equipamentos, guias e recompensas',
      'Gestão emocional do tutor durante momentos de crise',
      'Material de apoio e grupo exclusivo de mentoria'
    ],
    idealFor: 'Tutores que querem autonomia total para entender e educar seu cão no dia a dia.',
    format: 'Imersão prática intensiva (fim de semana ou dias dedicados)',
    iconName: 'Users',
    featured: false,
  },
  {
    id: 'consultoria-online',
    title: 'Consultorias Online',
    subtitle: 'Orientação especializada onde quer que você e seu cão estejam',
    tag: 'Flexível & Global',
    description:
      'Atendimento 1 a 1 por videochamada para diagnosticar a rotina do seu cão, ajustar o ambiente, planejar a chegada de filhotes e resolver problemas de comportamento. Você recebe um plano de ação detalhado por escrito e acompanhamento via WhatsApp.',
    features: [
      'Sessão ao vivo de 60 a 90 minutos por vídeo',
      'Análise de vídeos da rotina do seu cão em casa',
      'Plano de treino sob medida em PDF pós-sessão',
      'Adaptação de filhote e xixi/cocô no lugar certo',
      'Suporte direto via WhatsApp para tirar dúvidas entre sessões'
    ],
    idealFor: 'Tutores fora da região de atendimento presencial ou que precisam de ajustes rápidos de rotina.',
    format: 'Videochamada individual + suporte WhatsApp',
    iconName: 'Video',
    featured: false,
  },
  {
    id: 'atendimento-presencial',
    title: 'Atendimentos Presenciais',
    subtitle: 'Treinamento real no ambiente onde as situações acontecem',
    tag: '100% Personalizado',
    description:
      'Aulas particulares no conforto do seu domicílio e nas ruas do seu bairro. Trabalhamos os problemas exatamente onde eles ocorrem: campainha, visitas, passeios na praça, portão da garagem e convivência familiar.',
    features: [
      'Visita técnica e avaliação presencial no domicílio',
      'Treino prático de rua, tráfego e estímulos do cotidiano',
      'Participação ativa de todos os membros da família',
      'Adaptação de rotina e enriquecimento ambiental no lar',
      'Feedback imediato com correções em tempo real'
    ],
    idealFor: 'Famílias que buscam acompanhamento próximo e correções assertivas no seu próprio território.',
    format: 'Atendimento a domicílio na Grande São Paulo',
    iconName: 'Home',
    featured: false,
  }
];

/**
 * GALERIA DE FOTOS (DESLIZE HORIZONTAL)
 * Adicione ou altere fotos da galeria aqui via código.
 * Basta adicionar novos objetos à lista com:
 * - id: identificador único (ex: 'gal-9')
 * - imageUrl: URL da foto (Unsplash, link externo ou arquivo na pasta public/ ex: '/foto.jpg')
 */
export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'gal-1',
    title: 'Cliente 1',
    imageUrl: cliente1Img,
  },
  {
    id: 'gal-2',
    title: 'Cliente 2',
    imageUrl: cliente2Img,
  },
  {
    id: 'gal-3',
    title: 'Cliente 3',
    imageUrl: cliente3Img,
  },
  {
    id: 'gal-4',
    title: 'Cliente 4',
    imageUrl: cliente4Img,
  },
  {
    id: 'gal-5',
    title: 'Cliente 5',
    imageUrl: cliente5Img,
  },
  {
    id: 'gal-6',
    title: 'Cliente 6',
    imageUrl: cliente6Img,
  },
  {
    id: 'gal-7',
    title: 'Cliente 7',
    imageUrl: cliente7Img,
  },
  {
    id: 'gal-8',
    title: 'Cliente 8',
    imageUrl: laylaVideoPoster,
  }
];

/**
 * DEPOIMENTOS REAIS DOS CLIENTES (SLIDES HORIZONTAIS)
 * Adicione ou edite os depoimentos aqui via código.
 * - photoUrl: coloque aqui o link da foto do cliente ou o print do depoimento real
 * - story: relato em 1ª pessoa do tutor
 */
export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    photoUrl: depoimento1,
  },
  {
    id: 't-2',
    photoUrl: depoimento2
  },
  {
    id: 't-3',
    photoUrl: depoimento3
  },
  {
    id: 't-4',
    photoUrl: depoimento4
  },
  {
    id: 't-5',
    photoUrl: depoimento5
  },
  {
    id: 't-6',
    photoUrl: depoimento6
  }
];

