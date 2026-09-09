import { ServiceItem, GalleryPhoto, Testimonial, ContactInfo } from './types';

// Images imported directly
import heroImg from './assets/images/layla_dog_hero_1788984506805.jpg';
import packImg from './assets/images/pack_socialization_1788984521831.jpg';
import puppyImg from './assets/images/puppy_home_training_1788984534034.jpg';
import portraitImg from './assets/images/trainer_portrait_1788984545119.jpg';
import laylaVideoPoster from './assets/images/layla_video_presentation_poster_1788988473119.jpg';

export const ASSETS = {
  hero: heroImg,
  pack: packImg,
  puppy: puppyImg,
  portrait: portraitImg,
  videoPoster: laylaVideoPoster,
};

/**
 * VÍDEO DE APRESENTAÇÃO DA LAYLA RAFAELLA
 * Adicione ou altere o vídeo de apresentação via código aqui.
 * Suporta:
 * - Arquivo local .mp4 na pasta public/ (ex: '/apresentacao_layla.mp4')
 * - Link do YouTube: 'https://www.youtube.com/watch?v=...' ou 'https://youtu.be/...'
 * - Link externo direto (.mp4 / .webm): 'https://seu-servidor.com/video.mp4'
 */
export const PRESENTATION_VIDEO = {
  url: '/apresentacao_layla.mp4',
  title: 'Apresentação Oficial de Layla Rafaella',
  poster: laylaVideoPoster,
};

export const CONTACT_INFO: ContactInfo = {
  name: 'Layla Rafaella',
  title: 'Adestradora Canina & Comportamentalista',
  instagramHandle: '@layla.adestradora',
  instagramUrl: 'https://www.instagram.com/layla.adestradora/',
  whatsappNumber: '5511998765432', // configurable in UI or quick chat
  whatsappDisplay: '(11) 99876-5432',
  location: 'São Paulo, SP e Região Metropolitana (Presencial) | Todo o Brasil (Online)',
  hours: 'Segunda a Sábado, das 08h às 19h',
  email: 'contato@laylarafaella.com.br',
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
    title: 'Harmonia em Dupla no Passeio',
    category: 'passeio',
    categoryLabel: 'Passeio & Guia',
    imageUrl: heroImg,
    dogName: 'Thor & Luna',
    breed: 'Golden Retriever & Border Collie',
    achievement: 'Fim dos puxões na guia e caminhada relaxada sob distrações.'
  },
  {
    id: 'gal-2',
    title: 'Treino de Autocontrole em Matilha',
    category: 'matilha',
    categoryLabel: 'Matilha & Socialização',
    imageUrl: packImg,
    dogName: 'Grupo Social de Sábado',
    breed: 'Diferentes raças e portes',
    achievement: 'Zero conflitos e atenção absoluta aos comandos de liberação.'
  },
  {
    id: 'gal-3',
    title: 'Educação e Boas Maneiras em Casa',
    category: 'domicilio',
    categoryLabel: 'Presencial & Domicílio',
    imageUrl: puppyImg,
    dogName: 'Bento',
    breed: 'Golden Retriever (Filhote)',
    achievement: 'Aprendizado de limites, sem mordidas e xixi no local exato.'
  },
  {
    id: 'gal-4',
    title: 'Conexão e Confiança Estabelecida',
    category: 'passeio',
    categoryLabel: 'Vínculo & Foco',
    imageUrl: portraitImg,
    dogName: 'Simba',
    breed: 'Golden Retriever',
    achievement: 'Superação de insegurança e reatividade com pessoas desconhecidas.'
  },
  {
    id: 'gal-5',
    title: 'Passeio com Foco e Autocontrole',
    category: 'passeio',
    categoryLabel: 'Passeio',
    imageUrl: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=900&q=80',
    dogName: 'Max',
    breed: 'Labrador Retriever',
    achievement: 'Foco total no tutor durante a caminhada.'
  },
  {
    id: 'gal-6',
    title: 'Socialização Positiva em Campo',
    category: 'matilha',
    categoryLabel: 'Socialização',
    imageUrl: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=900&q=80',
    dogName: 'Matilha Social',
    breed: 'Diversas raças',
    achievement: 'Interação harmoniosa entre cães.'
  },
  {
    id: 'gal-7',
    title: 'Desenvolvimento de Filhotes',
    category: 'filhotes',
    categoryLabel: 'Filhotes',
    imageUrl: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=900&q=80',
    dogName: 'Pipoca',
    breed: 'Jack Russell Terrier',
    achievement: 'Curiosidade e estímulo positivo precoce.'
  },
  {
    id: 'gal-8',
    title: 'Obediência e Prática ao Ar Livre',
    category: 'passeio',
    categoryLabel: 'Treino ao Ar Livre',
    imageUrl: 'https://images.unsplash.com/photo-1561037404-61cd46aa615b?auto=format&fit=crop&w=900&q=80',
    dogName: 'Bono',
    breed: 'Vira-lata SRD',
    achievement: 'Comando de permanência e calma no parque.'
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
    tutorName: 'Mariana Duarte',
    dogName: 'Thor',
    dogBreed: 'Golden Retriever, 2 anos',
    serviceType: 'Adestramento Presencial',
    story: 'Eu quase desisti de passear na rua. O Thor pesava 34kg e me arrastava cada vez que via outro cachorro ou moto. Eu voltava para casa com dor nos pulsos e chorando de frustração. Na primeira aula com a Layla, eu entendi exatamente onde eu estava errando. Hoje eu caminho com ele com a guia completamente solta, usando apenas uma mão. Mudou a minha vida e a dele!',
    rating: 5,
    result: 'Passeio tranquilo com guia frouxa e fim dos puxões',
    photoUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=800&q=80',
    date: 'Passeio no Parque'
  },
  {
    id: 't-2',
    tutorName: 'Ricardo Silveira',
    dogName: 'Fred',
    dogBreed: 'Border Collie, 1 ano e meio',
    serviceType: 'Comportamento & Foco',
    story: 'Eu achava que o Fred era "ligado no 220v" e que nunca se acalmaria dentro de casa. Ele destruía sofás, pulava nas visitas e latia sem parar. As aulas da Layla me ensinaram a ler as necessidades dele e canalizar a energia com calma, sem nenhum tipo de bronca violenta. Eu finalmente tenho paz na minha sala e um parceiro focado e educado.',
    rating: 5,
    result: 'Fim da destruição e autocontrole dentro de casa',
    photoUrl: 'https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?auto=format&fit=crop&w=800&q=80',
    date: 'Treino de Autocontrole'
  },
  {
    id: 't-3',
    tutorName: 'Camila & Gustavo',
    dogName: 'Luna',
    dogBreed: 'SRD (Resgatada), 3 anos',
    serviceType: 'Reabilitação de Medo',
    story: 'Nós resgatamos a Luna e ela tinha pânico de sair pelo portão, tremia muito e rosnava para qualquer estranho que tentava se aproximar. Estávamos desesperados sem saber como acolhê-la. A Layla nos atendeu com uma sensibilidade absurda. Em poucas semanas, eu vi minha cachorra desabrochar, perder o medo e abanar o rabo nos passeios. Sou eternamente grata!',
    rating: 5,
    result: 'Superação de traumas e segurança para passear',
    photoUrl: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=800&q=80',
    date: 'Adaptação & Confiança'
  },
  {
    id: 't-4',
    tutorName: 'Beatriz Nogueira',
    dogName: 'Amora',
    dogBreed: 'Buldogue Francês (Filhote), 4 meses',
    serviceType: 'Consultoria Online',
    story: 'Eu fiz a consultoria online porque moro no interior e estava perdida com xixi no tapete e mordidas fortes nos tornozelos. A Layla me entregou um plano cirúrgico. Em menos de 10 dias eu já tinha a rotina do banheiro 100% resolvida e a filhote dormindo a noite toda. O suporte diário no WhatsApp tirou todas as minhas dúvidas na hora. Recomendo de olhos fechados!',
    rating: 5,
    result: 'Xixi no lugar certo em 10 dias e zero mordidas',
    photoUrl: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=800&q=80',
    date: 'Consultoria Filhotes'
  },
  {
    id: 't-5',
    tutorName: 'Lucas Mendes',
    dogName: 'Zeus',
    dogBreed: 'Pastor Alemão, 2 anos',
    serviceType: 'Imersão Prática para Donos',
    story: 'Eu participei da Imersão para Donos e foi uma virada de chave completa para mim. Eu sempre achei que precisava ser autoritário ou usar tranco de guia para impor respeito, mas a Layla me provou na prática que liderança serena e reforço positivo geram dez vezes mais conexão. Eu saí de lá outra pessoa e o Zeus hoje anda conectado comigo em qualquer lugar.',
    rating: 5,
    result: 'Liderança tranquila e conexão profunda sem trancos',
    photoUrl: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?auto=format&fit=crop&w=800&q=80',
    date: 'Imersão Prática'
  },
  {
    id: 't-6',
    tutorName: 'Dra. Juliana Prado',
    dogName: 'Nick',
    dogBreed: 'Spitz Alemão, 3 anos',
    serviceType: 'Atendimento Domiciliar',
    story: 'O Nick latia histericamente para qualquer barulho no corredor do prédio e eu já tinha recebido duas notificações graves do condomínio. Eu estava à beira do desespero. Com os exercícios que a Layla me passou direto no meu apartamento, desarmamos o gatilho da porta em três sessões. Hoje ele fica no camilho relaxado mesmo com a campainha tocando.',
    rating: 5,
    result: 'Fim dos latidos excessivos e harmonia no condomínio',
    photoUrl: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=80',
    date: 'Atendimento em Apartamento'
  }
];

