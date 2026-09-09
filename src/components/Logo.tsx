import favicon from '../assets/images/favicon.png'

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ className = '', size = 'md' }: LogoProps) {
  const isSm = size === 'sm';
  const isLg = size === 'lg';

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Yellow Brand Icon Square with Paw/Hand Silhouette */}
      <div
        className={`${isSm ? 'w-9 h-9' : isLg ? 'w-12 h-12' : 'w-10 h-10'
          } rounded-lg overflow-hidden flex items-center justify-center shrink-0 shadow-sm`}
      >
        <img
          src={favicon}
          alt="logo"
          className="w-full h-full object-cover"
        />
      </div>


      {/* Clean Typography adapting to Light and Dark Mode */}
      <div className="flex flex-col">
        <span
          className={`font-bold tracking-[0.14em] text-neutral-900 dark:text-white uppercase leading-none transition-colors ${isSm ? 'text-xs' : isLg ? 'text-base' : 'text-sm'
            }`}
        >
          LAYLA RAFAELLA
        </span>
        <span className="text-[#C48E0D] dark:text-[#E5A91A] text-[10px] sm:text-[11px] font-semibold tracking-[0.12em] uppercase mt-1 transition-colors">
          Adestramento Canino
        </span>
      </div>
    </div>
  );
}
