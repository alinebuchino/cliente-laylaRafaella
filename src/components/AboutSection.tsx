import { useState, useRef, useEffect, ChangeEvent } from 'react';
import {
  Instagram,
  MessageCircle,
  Check,
  Play,
  Pause,
  Volume2,
  VolumeX,
  RotateCcw,
  Maximize,
  X,
  Video as VideoIcon,
  Sparkles
} from 'lucide-react';
import { ASSETS, CONTACT_INFO, PRESENTATION_VIDEO } from '../data';

export default function AboutSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(30);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const whatsappUrl = `https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent(
    'Olá Layla! Assisti ao seu vídeo de apresentação e gostaria de saber mais sobre o adestramento.'
  )}`;

  const videoSource = PRESENTATION_VIDEO.url.trim();

  // Helper for YouTube embed check
  const getYouTubeEmbedUrl = (url: string) => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    return match ? `https://www.youtube.com/embed/${match[1]}?autoplay=1` : null;
  };

  const ytEmbed = videoSource ? getYouTubeEmbedUrl(videoSource) : null;

  // Track fullscreen state across standard and webkit (iOS/Safari) implementations
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleFullscreenChange = () => {
      const doc = document as any;
      const v = video as any;
      const isFull = !!(
        document.fullscreenElement ||
        doc.webkitFullscreenElement ||
        doc.mozFullScreenElement ||
        doc.msFullscreenElement ||
        v.webkitDisplayingFullscreen
      );
      setIsFullscreen(isFull);
      if (!isFull) {
        setIsExpanded(false);
      }
      // In native fullscreen, activate native controls so mobile users have complete scrub/exit controls
      video.controls = isFull;
    };

    const handleIOSBeginFullscreen = () => {
      setIsFullscreen(true);
      setIsExpanded(true);
      video.controls = true;
      setIsPlaying(true);
    };

    const handleIOSEndFullscreen = () => {
      setIsFullscreen(false);
      setIsExpanded(false);
      video.controls = false;
      setIsPlaying(!video.paused);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    video.addEventListener('webkitbeginfullscreen', handleIOSBeginFullscreen);
    video.addEventListener('webkitendfullscreen', handleIOSEndFullscreen);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);

      video.removeEventListener('webkitbeginfullscreen', handleIOSBeginFullscreen);
      video.removeEventListener('webkitendfullscreen', handleIOSEndFullscreen);
    };
  }, []);

  // Keyboard shortcut ESC to exit expanded mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && (isExpanded || isFullscreen)) {
        closeExpanded();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isExpanded, isFullscreen]);

  // Lock body scroll when in expanded view to prevent background scrolling on mobile
  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isExpanded]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play().catch(() => { });
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

  const openExpanded = async () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().catch(() => { });
      setIsPlaying(true);
    }

    // Always set isExpanded and isFullscreen to true so the expanded view and close button are displayed
    setIsExpanded(true);
    setIsFullscreen(true);

    const v = video as any;
    const c = containerRef.current as any;

    // Mobile iOS Safari: native fullscreen on video element if preferred
    if (typeof v.webkitEnterFullscreen === 'function' && !video.requestFullscreen) {
      try {
        v.webkitEnterFullscreen();
        return;
      } catch (err) {
        console.warn('webkitEnterFullscreen error:', err);
      }
    }

    // Try HTML5 container fullscreen if available
    if (c && c.requestFullscreen) {
      c.requestFullscreen().catch(() => { });
    }
  };

  const closeExpanded = () => {
    setIsExpanded(false);
    setIsFullscreen(false);

    const doc = document as any;
    if (
      document.fullscreenElement ||
      doc.webkitFullscreenElement ||
      doc.mozFullScreenElement ||
      doc.msFullscreenElement
    ) {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => { });
      } else if (doc.webkitExitFullscreen) {
        doc.webkitExitFullscreen();
      } else if (doc.mozCancelFullScreen) {
        doc.mozCancelFullScreen();
      } else if (doc.msExitFullscreen) {
        doc.msExitFullscreen();
      }
    }

    const v = videoRef.current as any;
    if (v && typeof v.webkitExitFullscreen === 'function') {
      try {
        v.webkitExitFullscreen();
      } catch { }
    }
  };

  const toggleExpand = () => {
    if (isExpanded || isFullscreen) {
      closeExpanded();
    } else {
      openExpanded();
    }
  };

  const handleFullscreen = async () => {
    if (isExpanded || isFullscreen) {
      closeExpanded();
    } else {
      openExpanded();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <section id="sobre" className="py-20 bg-white dark:bg-[#0c0c0c] border-t border-neutral-200 dark:border-neutral-850 transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

          {/* Video Presentation of Layla (6 cols) */}
          <div className="order-2 lg:order-1 lg:col-span-6" id="video">
            {/* Placeholder to keep layout stable when expanded */}
            {isExpanded && (
              <div className="aspect-video w-full rounded-2xl bg-neutral-900/40 border border-neutral-800/40 flex items-center justify-center text-neutral-400 text-xs">
                <span>Vídeo em reprodução expandida</span>
              </div>
            )}

            {/* Video Player Box (Fixed Fullscreen Overlay when isExpanded is true) */}
            <div
              className={
                isExpanded
                  ? "fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-center items-center p-2 sm:p-4 md:p-6 overflow-y-auto"
                  : "rounded-2xl overflow-hidden border border-neutral-300 dark:border-neutral-800 bg-black shadow-2xl transition-colors"
              }
              onClick={(e) => {
                if (isExpanded && e.target === e.currentTarget) {
                  closeExpanded();
                }
              }}
            >
              {/* Top bar visible ONLY when expanded: prominent Close (X) button */}
              {isExpanded && (
                <div className="w-full max-w-5xl flex items-center justify-between pb-3 px-1 sm:px-2">
                  <div className="flex items-center gap-2 text-white text-xs sm:text-sm font-medium">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#E5A91A] animate-pulse" />
                    <span className="truncate max-w-[200px] sm:max-w-none">{PRESENTATION_VIDEO.title || 'Vídeo de Apresentação'}</span>
                  </div>

                  {/* Botão de fechar após expandir */}
                  <button
                    type="button"
                    onClick={closeExpanded}
                    className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-800 hover:bg-neutral-700 active:scale-95 text-white hover:text-[#E5A91A] border border-white/20 shadow-xl transition-all cursor-pointer"
                    title="Fechar vídeo expandido"
                    aria-label="Fechar vídeo expandido"
                  >
                    <X className="w-5 h-5 text-[#E5A91A]" />
                    <span className="text-xs sm:text-sm font-semibold">Fechar</span>
                  </button>
                </div>
              )}

              {/* Player Container */}
              <div className={isExpanded ? "w-full max-w-5xl rounded-xl sm:rounded-2xl overflow-hidden border border-neutral-800 bg-black shadow-2xl relative flex flex-col" : "w-full"}>
                {/* Top Bar of the Video Player */}
                <div className="bg-neutral-900/95 border-b border-neutral-800 px-3 sm:px-4 py-2.5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#E5A91A] animate-pulse" />
                    <span className="font-semibold text-white tracking-wide flex items-center gap-1.5 truncate">
                      <VideoIcon className="w-3.5 h-3.5 text-[#E5A91A] shrink-0" />
                      {PRESENTATION_VIDEO.title || 'Vídeo de Apresentação'}
                    </span>
                  </div>

                  {/* Botão de fechar após expandir na barra do player */}
                  {isExpanded && (
                    <button
                      type="button"
                      onClick={closeExpanded}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 active:scale-95 text-white hover:text-[#E5A91A] border border-neutral-700 text-xs font-medium transition-colors cursor-pointer"
                      title="Fechar modo expandido"
                      aria-label="Fechar modo expandido"
                    >
                      <X className="w-4 h-4 text-[#E5A91A]" />
                      <span className="text-[11px] font-semibold">Fechar</span>
                    </button>
                  )}
                </div>

                {/* Video Screen */}
                <div
                  ref={containerRef}
                  className={`relative ${isExpanded ? 'aspect-video max-h-[70vh]' : 'aspect-video'} w-full flex items-center justify-center overflow-hidden bg-neutral-950 group`}
                >
                  {ytEmbed ? (
                    <iframe
                      src={ytEmbed}
                      title={PRESENTATION_VIDEO.title}
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <>
                      <video
                        ref={videoRef}
                        src={videoSource || undefined}
                        poster={PRESENTATION_VIDEO.poster || ASSETS.videoPoster}
                        playsInline
                        preload="metadata"
                        muted={isMuted}
                        className="w-full h-full object-contain bg-black cursor-pointer"
                        onLoadedMetadata={() => {
                          if (videoRef.current && !isNaN(videoRef.current.duration)) {
                            setDuration(videoRef.current.duration);
                          }
                        }}
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
                        onDoubleClick={toggleExpand}
                      />

                      {/* Botão de fechar flutuante no canto superior direito APÓS EXPANDIR */}
                      {isExpanded && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            closeExpanded();
                          }}
                          className="absolute top-3 right-3 z-30 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/80 hover:bg-neutral-900 active:scale-90 text-white hover:text-[#E5A91A] border border-white/20 shadow-xl backdrop-blur-sm cursor-pointer transition-all"
                          title="Fechar modo expandido"
                          aria-label="Fechar modo expandido"
                        >
                          <X className="w-4 h-4 text-[#E5A91A]" />
                          <span className="text-xs font-semibold">Fechar</span>
                        </button>
                      )}

                      {/* Poster overlay when not playing */}
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
                    <div className="flex items-center justify-between gap-2 sm:gap-3">
                      <div className="flex items-center gap-1 sm:gap-2">
                        <button
                          type="button"
                          onClick={togglePlay}
                          className="p-1.5 text-neutral-300 hover:text-[#E5A91A] transition-colors cursor-pointer"
                          title={isPlaying ? 'Pausar' : 'Reproduzir'}
                          aria-label={isPlaying ? 'Pausar' : 'Reproduzir'}
                        >
                          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setCurrentTime(0);
                            if (videoRef.current) {
                              videoRef.current.currentTime = 0;
                            }
                          }}
                          className="p-1.5 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                          title="Reiniciar"
                          aria-label="Reiniciar vídeo"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={toggleMute}
                          className="p-1.5 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                          title={isMuted ? 'Ativar som' : 'Silenciar'}
                          aria-label={isMuted ? 'Ativar som' : 'Silenciar'}
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
                        className="flex-grow h-1.5 bg-neutral-800 rounded appearance-none cursor-pointer accent-[#E5A91A] mx-1 sm:mx-2"
                        aria-label="Controle de tempo do vídeo"
                      />

                      {/* Touch-Friendly Expand / Close Toggle Button */}
                      <button
                        type="button"
                        onClick={isExpanded || isFullscreen ? closeExpanded : openExpanded}
                        className="p-2 text-neutral-300 hover:text-[#E5A91A] active:text-[#E5A91A] transition-colors cursor-pointer flex items-center justify-center min-w-[36px] min-h-[36px] rounded-lg hover:bg-neutral-800 active:scale-95"
                        title={isExpanded || isFullscreen ? 'Fechar modo expandir (X)' : 'Expandir vídeo'}
                        aria-label={isExpanded || isFullscreen ? 'Fechar modo expandir (X)' : 'Expandir vídeo'}
                      >
                        {isExpanded || isFullscreen ? (
                          <X className="w-4 h-4 text-[#E5A91A]" />
                        ) : (
                          <Maximize className="w-4 h-4 text-[#E5A91A]" />
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {/* Sub-bar with Layla's ID */}
                <div className="p-4 bg-neutral-50 dark:bg-[#111111] flex items-center justify-between gap-3 border-t border-neutral-200 dark:border-neutral-800 transition-colors">
                  <div className="flex items-center gap-3">
                    <img
                      src={ASSETS.videoPoster}
                      alt="Layla Rafaella"
                      className="w-10 h-10 rounded-full object-cover border border-[#E5A91A]/40"
                    />
                    <div>
                      <div className="text-neutral-900 dark:text-white text-sm font-semibold">Layla Rafaella</div>
                      <div className="text-xs text-[#C48E0D] dark:text-[#E5A91A] font-medium">Adestradora & Comportamentalista</div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Succinct Bio (6 cols) */}
          <div className="order-1 lg:order-2 lg:col-span-6">
            <span className="text-xs font-semibold text-[#C48E0D] dark:text-[#E5A91A] tracking-wider uppercase transition-colors">
              Sobre a Profissional
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-950 dark:text-white mt-1.5 transition-colors">
              Comunicação clara entre você e seu cão
            </h2>

            <p className="mt-4 text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed transition-colors">
              Com anos de experiência e centenas de famílias atendidas, trabalho com metodologia baseada em respeito aos limites biológicos do animal e capacitação real dos tutores.
            </p>

            <p className="mt-3 text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed transition-colors">
              O objetivo não é apenas ensinar comandos mecânicos, mas construir uma convivência tranquila no dia a dia, solucionando puxões no passeio, reatividade na rua, comportamentos desafiadores dentro de casa e etc.
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
                <span>Fale diretamente comigo</span>
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
    </section>
  );
}
