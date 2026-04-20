import Image from "next/image";

type BrandMarkProps = {
  compact?: boolean;
};

export function BrandMark({ compact = false }: BrandMarkProps) {
  return (
    <div className="flex items-center">
      <Image
        src="/puzzle-logo.png"
        alt="Puzzle"
        width={compact ? 140 : 220}
        height={compact ? 44 : 70}
        priority
        className={compact ? "h-10 w-auto object-contain" : "h-14 w-auto object-contain"}
      />
    </div>
  );
}
