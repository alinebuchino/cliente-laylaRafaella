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
        className={`${
          isSm ? 'w-9 h-9' : isLg ? 'w-12 h-12' : 'w-10 h-10'
        } rounded-lg bg-[#E5A91A] text-black flex items-center justify-center p-1.5 shrink-0 shadow-sm`}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full text-black" fill="none" stroke="currentColor">
          <path d="M 22 55 A 32 32 0 1 1 78 55" strokeWidth="3" strokeLinecap="round" />
          <path
            d="M 52 35 C 50 24, 53 16, 55 17 C 58 24, 61 18, 64 21 C 65 26, 68 25, 69 30 C 72 38, 65 54, 56 63"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M 46 36 C 43 30, 40 30, 39 34 C 36 38, 33 40, 33 44 C 32 51, 37 59, 44 64"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Clean Typography adapting to Light and Dark Mode */}
      <div className="flex flex-col">
        <span
          className={`font-bold tracking-[0.14em] text-neutral-900 dark:text-white uppercase leading-none transition-colors ${
            isSm ? 'text-xs' : isLg ? 'text-base' : 'text-sm'
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
