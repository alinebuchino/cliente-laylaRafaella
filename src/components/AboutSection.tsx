import { useState, useRef, ChangeEvent } from 'react';
import {
  Instagram,
  MessageCircle,
  Check,
  Play,
  Pause,
  Volume2,
  VolumeX,
  RotateCcw,
  Upload,
  Maximize,
  Link as LinkIcon,
  Video as VideoIcon,
  Sparkles
} from 'lucide-react';
import { ASSETS, CONTACT_INFO } from '../data';

export default function AboutSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(30);
  const [customVideoUrl, setCustomVideoUrl] = useState<string | null>(null);
  const [videoUrlInput, setVideoUrlInput] = useState('');
  const [showUrlModal, setShowUrlModal] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const whatsappUrl = `https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(
    'Olá Layla! Assisti ao seu vídeo de apresentação e gostaria de saber mais sobre o adestramento.'
  )}`;

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
    setIsMuted(!isMuted);
  };

  const handleSeek = (e: ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomVideoUrl(url);
      setIsPlaying(true);
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.play().catch(() => {});
        }
      }, 100);
    }
  };

  const handleApplyUrl = () => {
    if (videoUrlInput.trim()) {
      setCustomVideoUrl(videoUrlInput.trim());
      setShowUrlModal(false);
      setIsPlaying(true);
    }
  };

  const handleFullscreen = () => {
    if (containerRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      } else {
        containerRef.current.requestFullscreen().catch(() => {});
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Helper for YouTube embed check
  const getYouTubeEmbedUrl = (url: string) => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    return match ? `https://www.youtube.com/embed/${match[1]}?autoplay=1` : null;
  };

  const ytEmbed = customVideoUrl ? getYouTubeEmbedUrl(customVideoUrl) : null;

  return (
    <section id="sobre" className="py-20 bg-white dark:bg-[#0c0c0c] border-t border-neutral-200 dark:border-neutral-850 transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Video Presentation of Layla (6 cols) */}
          <div className="lg:col-span-6" id="video">
            <div className="rounded-2xl overflow-hidden border border-neutral-300 dark:border-neutral-800 bg-black shadow-2xl transition-colors">
              
              {/* Top Bar of the Video Player */}
              <div className="bg-neutral-900/95 border-b border-neutral-800 px-4 py-2.5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#E5A91A] animate-pulse" />
                  <span className="font-semibold text-white tracking-wide flex items-center gap-1.5">
                    <VideoIcon className="w-3.5 h-3.5 text-[#E5A91A]" />
                    Apresentação da Layla
                  </span>
                </div>
                <span className="text-[11px] text-neutral-400 font-medium">
                  Vídeo Oficial
                </span>
              </div>

              {/* Video Screen */}
              <div
                ref={containerRef}
                className="relative aspect-video w-full flex items-center justify-center overflow-hidden bg-neutral-950 group"
              >
                {ytEmbed ? (
                  <iframe
                    src={ytEmbed}
                    title="Vídeo de Apresentação da Layla"
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <>
                    <video
                      ref={videoRef}
                      src={customVideoUrl || undefined}
                      poster={ASSETS.portrait}
                      playsInline
                      muted={isMuted}
                      className="w-full h-full object-cover"
                      onTimeUpdate={() => {
                        if (videoRef.current) {
                          setCurrentTime(videoRef.current.currentTime);
                          if (!isNaN(videoRef.current.duration) && videoRef.current.duration > 0) {
                            setDuration(videoRef.current.duration);
                          }
                        }
                      }}
                      onEnded={() => setIsPlaying(false)}
                      onClick={togglePlay}
                    />

                    {/* Poster overlay when not playing or no custom video loaded */}
                    {!isPlaying && (
                      <div
                        onClick={togglePlay}
                        className="absolute inset-0 bg-black/40 backdrop-blur-[1px] flex flex-col items-center justify-center cursor-pointer transition-all hover:bg-black/30"
                      >
                        <button
                          type="button"
                          aria-label="Reproduzir apresentação"
                          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#E5A91A] hover:bg-[#d89c0f] text-black flex items-center justify-center shadow-2xl transform transition-transform hover:scale-110 active:scale-95 cursor-pointer"
                        >
                          <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current ml-1" />
                        </button>
                        <div className="mt-3 px-3 py-1 rounded-full bg-black/75 border border-white/10 text-white text-xs font-semibold backdrop-blur-md flex items-center gap-1.5 shadow-lg">
                          <Sparkles className="w-3.5 h-3.5 text-[#E5A91A]" />
                          <span>Clique para assistir à apresentação</span>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Video Player Controls (for native video) */}
              {!ytEmbed && (
                <div className="p-3 bg-[#111111] border-t border-neutral-800 flex flex-col gap-2">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-1 sm:gap-2">
                      <button
                        onClick={togglePlay}
                        className="p-1.5 text-neutral-300 hover:text-[#E5A91A] transition-colors cursor-pointer"
                        title={isPlaying ? 'Pausar' : 'Reproduzir'}
                      >
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                      </button>

                      <button
                        onClick={() => {
                          setCurrentTime(0);
                          if (videoRef.current) {
                            videoRef.current.currentTime = 0;
                          }
                        }}
                        className="p-1.5 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                        title="Reiniciar"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={toggleMute}
                        className="p-1.5 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                        title={isMuted ? 'Ativar som' : 'Silenciar'}
                      >
                        {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-[#E5A91A]" />}
                      </button>

                      <span className="text-[11px] font-mono text-neutral-400 ml-1">
                        {formatTime(currentTime)} / {formatTime(duration)}
                      </span>
                    </div>

                    {/* Timeline Scrubber */}
                    <input
                      type="range"
                      min="0"
                      max={duration || 30}
                      step="0.1"
                      value={currentTime}
                      onChange={handleSeek}
                      className="flex-grow h-1.5 bg-neutral-800 rounded appearance-none cursor-pointer accent-[#E5A91A] mx-2"
                    />

                    <button
                      onClick={handleFullscreen}
                      className="p-1.5 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                      title="Tela cheia"
                    >
                      <Maximize className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Sub-bar with Layla's ID and Action to Change Video */}
              <div className="p-4 bg-neutral-50 dark:bg-[#111111] flex flex-wrap items-center justify-between gap-3 border-t border-neutral-200 dark:border-neutral-800 transition-colors">
                <div className="flex items-center gap-3">
                  <img
                    src={ASSETS.portrait}
                    alt="Layla Rafaella"
                    className="w-10 h-10 rounded-full object-cover border border-[#E5A91A]/40"
                  />
                  <div>
                    <div className="text-neutral-900 dark:text-white text-sm font-semibold">Layla Rafaella</div>
                    <div className="text-xs text-[#C48E0D] dark:text-[#E5A91A] font-medium">Adestradora & Comportamentalista</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Upload video file button */}
                  <label
                    title="Adicionar arquivo de vídeo (.mp4)"
                    className="cursor-pointer inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-[11px] font-medium text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-800 transition-colors"
                  >
                    <Upload className="w-3.5 h-3.5 text-[#E5A91A]" />
                    <span>Adicionar vídeo .mp4</span>
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>

                  {/* Insert video link button */}
                  <button
                    type="button"
                    onClick={() => setShowUrlModal(true)}
                    title="Inserir link do YouTube ou vídeo"
                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-[11px] font-medium text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-800 transition-colors cursor-pointer"
                  >
                    <LinkIcon className="w-3.5 h-3.5 text-[#E5A91A]" />
                    <span className="hidden sm:inline">Inserir Link</span>
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Succinct Bio (6 cols) */}
          <div className="lg:col-span-6">
            <span className="text-xs font-semibold text-[#C48E0D] dark:text-[#E5A91A] tracking-wider uppercase transition-colors">
              Sobre a Profissional
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-950 dark:text-white mt-1.5 transition-colors">
              Comunicação clara entre você e seu cão
            </h2>

            <p className="mt-4 text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed transition-colors">
              Com anos de experiência e centenas de famílias atendidas, Layla Rafaella trabalha com metodologia baseada em reforço positivo, respeito aos limites biológicos do animal e capacitação real dos tutores.
            </p>

            <p className="mt-3 text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed transition-colors">
              O objetivo não é apenas ensinar comandos mecânicos, mas construir uma convivência tranquila no dia a dia, solucionando puxões no passeio, reatividade na rua e comportamentos desafiadores dentro de casa.
            </p>

            {/* Concise Checklist */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#C48E0D] dark:text-[#E5A91A] shrink-0" />
                <span>Zero punições físicas ou aversivos</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#C48E0D] dark:text-[#E5A91A] shrink-0" />
                <span>Educação e autonomia para o tutor</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#C48E0D] dark:text-[#E5A91A] shrink-0" />
                <span>Aulas práticas no ambiente real</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#C48E0D] dark:text-[#E5A91A] shrink-0" />
                <span>Suporte contínuo por WhatsApp</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#E5A91A] hover:bg-[#d89c0f] text-black font-semibold text-xs shadow-xs transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Falar com a Layla</span>
              </a>

              <a
                href={CONTACT_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-850 text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-white border border-neutral-200 dark:border-neutral-800 text-xs font-medium transition-colors"
              >
                <Instagram className="w-3.5 h-3.5 text-[#C48E0D] dark:text-[#E5A91A]" />
                <span>Ver no Instagram</span>
              </a>
            </div>

          </div>

        </div>
      </div>

      {/* Modal to paste Video Link (YouTube, Vimeo, etc.) */}
      {showUrlModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#111111] border border-neutral-200 dark:border-neutral-800 rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="text-base font-bold text-neutral-900 dark:text-white mb-2">
              Inserir link do vídeo de apresentação
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-4">
              Cole o link do seu vídeo no YouTube, Vimeo ou link direto .mp4:
            </p>
            <input
              type="text"
              value={videoUrlInput}
              onChange={(e) => setVideoUrlInput(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=... ou .mp4"
              className="w-full px-3.5 py-2.5 rounded-lg text-xs bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white focus:outline-none focus:border-[#E5A91A] mb-4 font-mono"
            />
            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowUrlModal(false)}
                className="px-4 py-2 rounded-lg text-xs font-medium text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleApplyUrl}
                className="px-4 py-2 rounded-lg text-xs font-semibold bg-[#E5A91A] hover:bg-[#d89c0f] text-black transition-colors"
              >
                Salvar e Reproduzir
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
