'use client';

import * as React from 'react';
import Image from 'next/image';
import {
  LandingCarousel,
  type LandingCarouselHandle,
  type SliderItem,
} from '@staamina/ui/landing-carousel';
import '@staamina/ui/landing-carousel/landing-carousel.css';
import { cn } from '@staamina/ui/utils';
import {
  Activity,
  BedDouble,
  CheckCircle2,
  Database,
  Dumbbell,
  GitBranch,
  HeartPulse,
  Landmark,
  MapPin,
  MessageSquare,
  Monitor,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Building2,
  Tablet,
  Utensils,
  X,
  Network,
} from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

import {
  getCarouselItems,
  getLandingPageContent,
} from '@/config/landing-page-content';
import { useMountAnimation } from '@/hooks/use-mount-animation';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

import { AnimatedTitle } from './animated-title';
import { DarkVeil } from './dark-veil';
import { IncidentPath } from './incident-path';
import { StarBorderLink } from './star-border';
import './star-border.css';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  activity: Activity,
  sparkles: Sparkles,
  'git-branch': GitBranch,
  'map-pin': MapPin,
  database: Database,
  'message-square': MessageSquare,
  smartphone: Smartphone,
  monitor: Monitor,
  tablet: Tablet,
};

function HighlightedText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <span key={i} className="text-[#a78bfa]">
              {part.slice(2, -2)}
            </span>
          );
        }
        return <React.Fragment key={i}>{part}</React.Fragment>;
      })}
    </>
  );
}

export function LandingPage() {
  const t = useTranslations();
  const content = getLandingPageContent((key: string) => t(key));

  return (
    <div className="min-h-screen bg-app text-default">
      <HeroSection content={content} />
      <ProblemStatementSection content={content} />
      <ProblemComplexitySection content={content} />
      <BeforeAfterSection content={content} />
      <FeaturesSection content={content} />
      <MultiDeviceSection content={content} />
      <UseCasesSection content={content} />
      <FranchiseSection content={content} />
      <WhyChooseSection content={content} />
      <FAQSection content={content} />
      <CTASection content={content} />
    </div>
  );
}

function HeroSection({
  content,
}: {
  content: ReturnType<typeof getLandingPageContent>;
}) {
  const { ref, isVisible } = useMountAnimation(0);

  return (
    <section className="relative overflow-hidden min-h-svh flex flex-col items-center justify-center px-4 py-20 bg-app">
      <DarkVeil speed={3} scanlineFrequency={0.5} />
      <div
        className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 via-transparent to-brand-secondary/5"
        style={{ zIndex: 1 }}
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(79,46,176,0.1),transparent_50%)]"
        style={{ zIndex: 1 }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-black"
        style={{ zIndex: 2 }}
      />
      <div
        ref={ref}
        className={cn(
          'container relative z-20 mx-auto max-w-6xl w-full',
          isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0'
        )}
      >
        <div className="text-center space-y-4 sm:space-y-6">
          <div className="space-y-1">
            <p
              className="text-[0.6rem] sm:text-base md:text-lg font-bold tracking-wide text-text/80 mx-auto leading-relaxed px-2 uppercase"
              style={{ fontFamily: 'var(--font-roboto), sans-serif' }}
            >
              {content.hero.description}
            </p>

            <h1
              className="text-[0.6rem] sm:text-base md:text-lg font-bold leading-tight text-default px-2"
              style={{ fontFamily: 'var(--font-roboto), sans-serif' }}
            >
              <span className="text-[#a78bfa]">STAAMINA</span>
              {content.hero.titleMiddle}
              <AnimatedTitle
                messages={content.hero.titleVariants}
                className="inline font-bold text-[#a78bfa]"
                align="left"
              />
            </h1>
          </div>

          <p
            className="text-[1rem] sm:text-2xl md:text-4xl lg:text-5xl font-bold w-full leading-tight mt-4 sm:mt-10 text-center"
            style={{ fontFamily: 'var(--font-roboto), sans-serif' }}
          >
            <HighlightedText text={content.hero.subtitleLine1} />{' '}
            <HighlightedText text={content.hero.subtitleLine2} />
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8 sm:pt-12">
            <StarBorderLink href="/contact" color="#a78bfa" speed="5s">
              {content.hero.ctaPrimary}
            </StarBorderLink>
          </div>
        </div>
      </div>
    </section>
  );
}

type StoreLayer = 'domaines' | 'zones' | 'equipements';

function ProblemStatementSection({
  content,
}: {
  content: ReturnType<typeof getLandingPageContent>;
}) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const [activeLayer, setActiveLayer] = useState<StoreLayer | null>(null);

  const storeLayerConfig: Record<
    StoreLayer,
    {
      label: string;
      color: string;
      badges: { x: string; y: string; text: string }[];
    }
  > = {
    domaines: {
      label: content.storeLayer.domaines.label,
      color: '#ede9fe',
      badges: [
        { x: '18%', y: '28%', text: content.storeLayer.domaines.badges[0] },
        { x: '55%', y: '18%', text: content.storeLayer.domaines.badges[1] },
        { x: '72%', y: '42%', text: content.storeLayer.domaines.badges[2] },
        { x: '30%', y: '60%', text: content.storeLayer.domaines.badges[3] },
      ],
    },
    zones: {
      label: content.storeLayer.zones.label,
      color: '#a78bfa',
      badges: [
        { x: '15%', y: '50%', text: content.storeLayer.zones.badges[0] },
        { x: '42%', y: '30%', text: content.storeLayer.zones.badges[1] },
        { x: '65%', y: '55%', text: content.storeLayer.zones.badges[2] },
        { x: '50%', y: '65%', text: content.storeLayer.zones.badges[3] },
      ],
    },
    equipements: {
      label: content.storeLayer.equipements.label,
      color: '#8b5cf6',
      badges: [
        { x: '20%', y: '42%', text: content.storeLayer.equipements.badges[0] },
        { x: '48%', y: '22%', text: content.storeLayer.equipements.badges[1] },
        { x: '70%', y: '38%', text: content.storeLayer.equipements.badges[2] },
        { x: '35%', y: '68%', text: content.storeLayer.equipements.badges[3] },
      ],
    },
  };

  const handleToggle = (layer: StoreLayer) => {
    setActiveLayer((prev) => (prev === layer ? null : layer));
  };

  const activeCfg = activeLayer ? storeLayerConfig[activeLayer] : null;

  return (
    <section
      id="probleme"
      className="relative bg-black overflow-hidden py-16 sm:py-20 flex items-center"
    >
      <div
        className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/80 to-transparent"
        style={{ zIndex: 2 }}
      />
      <div
        ref={ref}
        className={cn(
          'relative z-10 w-full flex flex-col md:flex-row items-center',
          isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0'
        )}
      >
        <div className="w-full md:w-[40%] px-5 sm:px-8 md:px-12 py-8 sm:py-12 shrink-0">
          <p
            className="font-bold text-white text-left"
            style={{
              fontFamily: 'var(--font-roboto), sans-serif',
              fontSize: 'clamp(1.1rem, 2.8vw, 3.5rem)',
              lineHeight: '1.1',
            }}
          >
            <span className="block">
              <HighlightedText text={content.problemStatement.line1} />
            </span>
            <span className="block">
              <HighlightedText text={content.problemStatement.line2} />
            </span>
            <span className="block">
              <HighlightedText text={content.problemStatement.line3} />
            </span>
          </p>
        </div>

        <div className="w-full md:w-[60%] flex flex-col items-center gap-6 py-8">
          {/* Image container */}
          <div className="relative w-[85%]">
            {/* Dots background */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage:
                  'radial-gradient(circle, rgba(167,139,250,0.35) 1px, transparent 1px)',
                backgroundSize: '24px 24px',
                maskImage:
                  'radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 80%)',
                WebkitMaskImage:
                  'radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 80%)',
              }}
            />
            {/* Glow behind image */}
            <div
              className="absolute pointer-events-none"
              style={{
                width: '60%',
                height: '60%',
                background:
                  'radial-gradient(ellipse at 50% 50%, rgba(124,58,237,0.18) 0%, transparent 70%)',
                top: '20%',
                left: '20%',
              }}
            />
            <Image
              src="/store-isometric.webp"
              alt="Point de vente isométrique"
              width={1000}
              height={850}
              className="w-full h-auto object-contain relative z-10"
            />
            {/* Layer badges */}
            {activeCfg &&
              activeCfg.badges.map((badge, i) => (
                <div
                  key={i}
                  className="absolute z-20 pointer-events-none"
                  style={{
                    left: badge.x,
                    top: badge.y,
                    transform: 'translate(-50%, -50%)',
                    opacity: activeLayer ? 1 : 0,
                    transition: `opacity 300ms ease ${i * 60}ms, transform 300ms ease ${i * 60}ms`,
                  }}
                >
                  <div
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold whitespace-nowrap shadow-lg"
                    style={{
                      background: 'rgba(10,0,20,0.75)',
                      border: `1px solid ${activeCfg.color}`,
                      color: activeCfg.color,
                      backdropFilter: 'blur(8px)',
                      WebkitBackdropFilter: 'blur(8px)',
                      boxShadow: `0 0 16px ${activeCfg.color}55`,
                    }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: activeCfg.color }}
                    />
                    {badge.text}
                  </div>
                </div>
              ))}
          </div>

          {/* Toggle buttons */}
          <div className="flex items-center gap-3">
            {(Object.keys(storeLayerConfig) as StoreLayer[]).map((layer) => {
              const cfg = storeLayerConfig[layer];
              const isActive = activeLayer === layer;
              return (
                <button
                  key={layer}
                  onClick={() => handleToggle(layer)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200"
                  style={{
                    fontFamily: 'var(--font-roboto), sans-serif',
                    background: isActive
                      ? `${cfg.color}22`
                      : 'rgba(255,255,255,0.05)',
                    border: `1px solid ${isActive ? cfg.color : 'rgba(255,255,255,0.15)'}`,
                    color: isActive ? cfg.color : 'rgba(255,255,255,0.5)',
                    boxShadow: isActive ? `0 0 16px ${cfg.color}33` : 'none',
                  }}
                >
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0 transition-all duration-200"
                    style={{
                      background: isActive
                        ? cfg.color
                        : 'rgba(255,255,255,0.3)',
                    }}
                  />
                  {cfg.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProblemComplexitySection({
  content: _content,
}: {
  content: ReturnType<typeof getLandingPageContent>;
}) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section className="px-4 bg-app">
      <div
        ref={ref}
        className={cn(
          'container mx-auto max-w-[56rem] text-center',
          isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0'
        )}
      >
        <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-default leading-tight tracking-wide">
          {/* Content to be defined */}
        </p>
      </div>
    </section>
  );
}

function useParallax(strength = 50) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const progress = 1 - rect.bottom / (windowHeight + rect.height);
      setOffset(Math.min(Math.max(progress * strength, 0), strength));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [strength]);

  return { ref, offset };
}

function FeatureRow({
  label,
  sectionTitle,
  tagline,
  highlight,
  items,
  accentColor,
  illustrationSide,
  illustration,
}: {
  label: string;
  sectionTitle?: React.ReactNode;
  tagline?: string;
  highlight?: string;
  items: { text: string; type: 'positive' | 'negative' }[];
  accentColor: 'red' | 'brand';
  illustrationSide: 'left' | 'right';
  illustration?: React.ReactNode;
}) {
  const { ref: textRef, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const { ref: illustrationRef, offset } = useParallax(40);

  const illustrationEl = (
    <div className="flex items-center justify-center p-4 sm:p-8">
      <div
        ref={illustrationRef}
        style={{ transform: `translateY(-${offset}px)` }}
        className="w-full transition-transform duration-75 ease-out"
      >
        {illustration ?? (
          <div
            className={cn(
              'w-full h-72 sm:h-96 rounded-2xl border-2 flex items-center justify-center',
              accentColor === 'red'
                ? 'border-red-500/20 bg-red-950/10'
                : 'border-brand-primary/20 bg-brand-primary/5'
            )}
          >
            <p className="text-text/30 text-sm">Illustration à ajouter</p>
          </div>
        )}
      </div>
    </div>
  );

  const textEl = (
    <div
      ref={textRef}
      className={cn(
        'flex flex-col justify-center px-5 sm:px-8 md:px-12 py-8 sm:py-10 transition-all duration-700 ease-out',
        isVisible
          ? 'opacity-100 translate-x-0'
          : `opacity-0 ${illustrationSide === 'left' ? 'translate-x-12' : '-translate-x-12'}`
      )}
    >
      {label && (
        <span
          className="text-base sm:text-xl md:text-2xl font-bold tracking-wide uppercase mb-3 inline-block"
          style={{
            fontFamily: 'var(--font-roboto), sans-serif',
            background:
              'linear-gradient(90deg, #a78bfa, #7c3aed, #c4b5fd, #7c3aed, #a78bfa)',
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            animation: 'gradient-sweep 3s linear infinite',
          }}
        >
          {label}
        </span>
      )}
      {tagline && (
        <h3
          className="text-base sm:text-xl md:text-2xl font-bold text-default mb-4 leading-tight"
          style={{ fontFamily: 'var(--font-roboto), sans-serif' }}
        >
          {tagline}
        </h3>
      )}
      {highlight && (
        <p
          className="text-base sm:text-xl md:text-2xl font-bold text-white mb-4"
          style={{ fontFamily: 'var(--font-roboto), sans-serif' }}
        >
          {highlight}
        </p>
      )}
      <ul className="space-y-4">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            {item.type === 'negative' ? (
              <div className="w-5 h-5 rounded-full bg-transparent border border-brand-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                <X className="h-3 w-3 text-brand-primary" />
              </div>
            ) : (
              <CheckCircle2 className="h-5 w-5 text-brand-primary flex-shrink-0 mt-0.5" />
            )}
            <span
              className={cn(
                'text-sm sm:text-base',
                item.type === 'negative' ? 'text-text/70' : 'text-text'
              )}
            >
              {item.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="border-b border-white/5 py-12 sm:py-16">
      {sectionTitle && (
        <div className="w-full px-8 sm:px-12 py-6">
          <h3
            className="text-lg sm:text-xl md:text-2xl font-bold text-default text-center"
            style={{ fontFamily: 'var(--font-roboto), sans-serif' }}
          >
            {sectionTitle}
          </h3>
        </div>
      )}
      <div className="overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center">
          {/* Text always first on mobile (order-1), illustration second (order-2).
              On desktop, swap positions when illustrationSide === 'left'. */}
          <div className={illustrationSide === 'left' ? 'order-2 md:order-1' : 'order-2 md:order-2'}>
            {illustrationEl}
          </div>
          <div className={illustrationSide === 'left' ? 'order-1 md:order-2' : 'order-1 md:order-1'}>
            {textEl}
          </div>
        </div>
      </div>
    </div>
  );
}

function BeforeAfterSection({
  content,
}: {
  content: ReturnType<typeof getLandingPageContent>;
}) {
  return (
    <section
      id="solution"
      className="relative w-full"
      style={{
        background:
          'radial-gradient(ellipse 60% 50% at 5% 30%, rgba(109,40,217,0.22) 0%, transparent 70%), radial-gradient(ellipse 50% 60% at 95% 70%, rgba(79,70,229,0.18) 0%, transparent 65%), radial-gradient(ellipse 40% 40% at 50% 50%, rgba(124,58,237,0.06) 0%, transparent 60%), #000000',
      }}
    >
      <div style={{ position: 'relative', zIndex: 1 }}>
        <FeatureRow
          sectionTitle={
            <div className="space-y-2">
              <p
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-default leading-tight"
                style={{ fontFamily: 'var(--font-roboto), sans-serif' }}
              >
                <HighlightedText text={content.beforeAfter.row1line1} />
              </p>
              <p
                className="text-lg sm:text-xl md:text-2xl font-bold text-default leading-tight"
                style={{ fontFamily: 'var(--font-roboto), sans-serif' }}
              >
                {content.beforeAfter.row1line2}
              </p>
            </div>
          }
          label={content.beforeAfter.before.label}
          tagline={content.beforeAfter.before.tagline}
          items={content.beforeAfter.before.items.map((item) => ({
            text: item,
            type: 'negative' as const,
          }))}
          accentColor="red"
          illustrationSide="left"
        />
        <FeatureRow
          sectionTitle={
            <div className="space-y-2">
              <p
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-default leading-tight"
                style={{ fontFamily: 'var(--font-roboto), sans-serif' }}
              >
                <HighlightedText text={content.beforeAfter.row2line1} />
              </p>
              <p
                className="text-lg sm:text-xl md:text-2xl font-bold text-default leading-tight"
                style={{ fontFamily: 'var(--font-roboto), sans-serif' }}
              >
                {content.beforeAfter.row2line2}
              </p>
            </div>
          }
          label={content.beforeAfter.after.label}
          highlight={content.beforeAfter.after.highlight}
          items={content.beforeAfter.after.items.map((item) => ({
            text: item,
            type: 'positive' as const,
          }))}
          accentColor="brand"
          illustrationSide="right"
        />
      </div>
    </section>
  );
}

const sectorIconMap: Record<
  string | number,
  React.ComponentType<{ className?: string }>
> = {
  1: ShoppingBag, // retail
  2: Utensils, // restaurant
  3: Dumbbell, // fitness
  4: Landmark, // agencies
  5: HeartPulse, // health
  6: BedDouble, // hospitality
};

function FeatureCard({
  feature,
  index,
}: {
  feature: { title: string; description: string; tags: string[]; icon: string };
  index: number;
}) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.15 });
  const Icon = iconMap[feature.icon] || Activity;

  return (
    <div
      ref={ref}
      className={cn(
        'group relative h-full p-5 sm:p-7 rounded-2xl border border-white/10 transition-all duration-700',
        'hover:border-[#a78bfa]/40 hover:shadow-[0_0_40px_rgba(124,58,237,0.12)]',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      )}
      style={{
        background: 'rgba(167,139,250,0.03)',
        transitionDelay: `${index * 80}ms`,
        display: 'grid',
        gridTemplateRows: 'auto auto 1fr auto',
        gap: '1.25rem',
      }}
    >
      {/* Icon */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
        style={{
          background: 'linear-gradient(135deg, #7c3aed, #a78bfa)',
          boxShadow: '0 0 20px rgba(124,58,237,0.3)',
        }}
      >
        <Icon className="h-6 w-6 text-white" />
      </div>

      {/* Title */}
      <h3
        className="text-lg sm:text-xl font-bold text-white leading-snug"
        style={{ fontFamily: 'var(--font-roboto), sans-serif' }}
      >
        {feature.title}
      </h3>

      {/* Description */}
      <p
        className="text-base text-white/60 leading-relaxed font-normal"
        style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
      >
        {feature.description}
      </p>

      {/* Tags */}
      <ul className="flex flex-col gap-1.5 pt-1">
        {feature.tags.map((tag, tagIndex) => (
          <li key={tagIndex} className="flex items-center gap-2">
            <span
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ background: '#a78bfa' }}
            />
            <span
              className="text-sm text-white/60 font-normal"
              style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
            >
              {tag}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FeaturesSection({
  content,
}: {
  content: ReturnType<typeof getLandingPageContent>;
}) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section
      id="fonctionnalites"
      className="relative w-full"
      style={{
        background:
          'radial-gradient(ellipse at 50% 0%, rgba(124,58,237,0.18) 0%, transparent 60%), #000000',
      }}
    >
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 py-16 sm:py-24">
        {/* Header */}
        <div
          ref={ref}
          className={cn(
            'text-center mb-14 transition-all duration-700',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          )}
        >
          <h2
            className="font-bold text-white leading-tight"
            style={{
              fontFamily: 'var(--font-roboto), sans-serif',
              fontSize: 'clamp(1.5rem, 3.5vw, 2.8rem)',
            }}
          >
            <span className="block">
              <HighlightedText text={content.features.titleLine1} />
            </span>
            <span className="block">
              <HighlightedText text={content.features.titleLine2} />
            </span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {content.features.items.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function DeviceRow({
  name,
  description,
  illustrationSide,
  imageSrc,
  imageWidthClass = 'w-[55%]',
  textPaddingLeft = 'px-5 sm:px-8 md:px-10',
  illustrationPadding = 'p-4 sm:p-6',
}: {
  name: string;
  description: string;
  illustrationSide: 'left' | 'right';
  imageSrc: string;
  imageWidthClass?: string;
  textPaddingLeft?: string;
  illustrationPadding?: string;
}) {
  const { ref: textRef, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const { ref: illustrationRef, offset } = useParallax(40);

  const illustrationEl = (
    <div className={`flex items-center justify-center ${illustrationPadding}`}>
      <div
        ref={illustrationRef}
        className={imageWidthClass}
        style={{
          transform: `translateY(-${offset}px)`,
          transition: 'transform 75ms ease-out',
          position: 'relative',
        }}
      >
        {/* Glow behind image */}
        <div
          className="absolute pointer-events-none"
          style={{
            width: '70%',
            height: '70%',
            background:
              'radial-gradient(ellipse at 50% 50%, rgba(124,58,237,0.25) 0%, transparent 70%)',
            top: '15%',
            left: '15%',
            filter: 'blur(24px)',
          }}
        />
        <Image
          src={imageSrc}
          alt={name}
          width={500}
          height={360}
          className="relative z-10 w-full h-auto object-contain drop-shadow-[0_0_32px_rgba(124,58,237,0.3)]"
        />
      </div>
    </div>
  );

  const titleEl = (
    <span
      className="text-base sm:text-xl md:text-2xl lg:text-3xl font-bold tracking-wide uppercase inline-block"
      style={{
        fontFamily: 'var(--font-roboto), sans-serif',
        background: 'linear-gradient(90deg, #a78bfa, #7c3aed, #c4b5fd, #7c3aed, #a78bfa)',
        backgroundSize: '200% auto',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        animation: 'gradient-sweep 3s linear infinite',
      }}
    >
      {name}
    </span>
  );

  const descriptionEl = (
    <div className="flex flex-col gap-0.5">
      {description.split('. ').map((sentence, i, arr) => (
        <p
          key={i}
          className="text-base sm:text-lg md:text-xl text-white leading-snug font-normal"
          style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
        >
          {sentence.endsWith('.') ? sentence : `${sentence}${i < arr.length - 1 ? '.' : ''}`}
        </p>
      ))}
    </div>
  );

  return (
    <div className="border-b border-white/5">
      <div className="overflow-hidden">
        {/* Mobile layout: titre → image → description */}
        <div className="flex flex-col md:hidden px-5 py-6">
          <div ref={textRef} className={cn(
            'transition-all duration-700 ease-out mb-4',
            isVisible ? 'opacity-100' : 'opacity-0'
          )}>
            {titleEl}
          </div>
          {/* Mobile image — no parallax, constrained */}
          <div className="flex items-center justify-center py-4 overflow-hidden">
            <div className={`${imageWidthClass} relative`}>
              <Image
                src={imageSrc}
                alt={name}
                width={500}
                height={360}
                className="w-full h-auto object-contain drop-shadow-[0_0_32px_rgba(124,58,237,0.3)]"
              />
            </div>
          </div>
          <div className={cn(
            'transition-all duration-700 ease-out mt-2',
            isVisible ? 'opacity-100' : 'opacity-0'
          )}>
            {descriptionEl}
          </div>
        </div>

        {/* Desktop layout: two columns */}
        <div className="hidden md:grid md:grid-cols-2 items-center">
          <div className={illustrationSide === 'right' ? 'order-first md:order-last' : ''}>
            {illustrationEl}
          </div>
          <div
            ref={textRef}
            className={cn(
              `flex flex-col justify-center ${textPaddingLeft} py-6 transition-all duration-700 ease-out`,
              isVisible
                ? 'opacity-100 translate-x-0'
                : `opacity-0 ${illustrationSide === 'left' ? 'translate-x-12' : '-translate-x-12'}`
            )}
          >
            <div className="mb-3">{titleEl}</div>
            {descriptionEl}
          </div>
        </div>
      </div>
    </div>
  );
}

function MultiDeviceSection({
  content,
}: {
  content: ReturnType<typeof getLandingPageContent>;
}) {
  const devices = [
    {
      ...content.multiDevice.devices[0],
      illustrationSide: 'left' as const,
      imageSrc: '/device-mobile.svg',
      imageWidthClass: 'w-[45%] sm:w-[35%] md:w-[17%]',
      illustrationPadding: 'p-4 sm:p-6 md:pt-16',
    },
    {
      ...content.multiDevice.devices[1],
      illustrationSide: 'right' as const,
      imageSrc: '/device-desktop.svg',
      imageWidthClass: 'w-[85%] sm:w-[75%] md:w-[55%]',
      textPaddingLeft: 'px-5 sm:px-8 md:pl-16 md:pr-4 lg:pl-28',
      illustrationPadding: 'px-4 sm:px-6 pt-8 sm:pt-12 md:pt-16 pb-4',
    },
    {
      ...content.multiDevice.devices[2],
      illustrationSide: 'left' as const,
      imageSrc: '/device-kiosk.svg',
      imageWidthClass: 'w-[65%] sm:w-[55%] md:w-[50%]',
      illustrationPadding: 'p-4 sm:p-6 md:pt-16',
    },
  ];

  return (
    <section
      className="relative w-full"
      style={{
        background:
          'radial-gradient(ellipse at 10% 50%, rgba(124,58,237,0.2) 0%, transparent 55%), radial-gradient(ellipse at 90% 50%, rgba(99,102,241,0.15) 0%, transparent 55%), #000000',
      }}
    >
      <div className="w-full px-8 sm:px-12 pt-16 pb-8 text-center">
        <h2
          className="font-bold text-white leading-tight"
          style={{
            fontFamily: 'var(--font-roboto), sans-serif',
            fontSize: 'clamp(1.5rem, 3.5vw, 2.8rem)',
          }}
        >
          <span className="block">
            <HighlightedText text={content.multiDevice.titleLine1} />
          </span>
          <span className="block">
            <HighlightedText text={content.multiDevice.titleLine2} />
          </span>
        </h2>
        <div
          style={{
            fontFamily: 'var(--font-roboto), sans-serif',
            fontSize: 'clamp(0.95rem, 2.2vw, 1.5rem)',
            marginTop: '1rem',
            textAlign: 'center',
            width: '100%',
            color: 'rgba(255,255,255,1)',
            fontWeight: '500',
          }}
        >
          <span style={{ display: 'block', width: '100%' }}>
            {content.multiDevice.ctaLine1}
          </span>
          <span style={{ display: 'block', width: '100%' }}>
            {content.multiDevice.ctaLine2}
          </span>
        </div>
      </div>

      {devices.map((device, index) => (
        <DeviceRow
          key={index}
          name={device.name}
          description={device.description}
          illustrationSide={device.illustrationSide}
          imageSrc={device.imageSrc}
          imageWidthClass={'imageWidthClass' in device ? device.imageWidthClass : undefined}
          textPaddingLeft={'textPaddingLeft' in device ? device.textPaddingLeft : undefined}
          illustrationPadding={'illustrationPadding' in device ? device.illustrationPadding : undefined}
        />
      ))}
    </section>
  );
}

function UseCasesSection({
  content,
}: {
  content: ReturnType<typeof getLandingPageContent>;
}) {
  const t = useTranslations();
  const carouselItems = getCarouselItems((key: string) => t(key));
  const carouselRef = useRef<LandingCarouselHandle>(null);
  const [activeSectorId, setActiveSectorId] = useState<string | number>(
    carouselItems[0]?.id ?? 1
  );
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  const handleSectorClick = (item: SliderItem) => {
    carouselRef.current?.navigateTo(item.id);
  };

  return (
    <section id="secteurs" className="py-12 sm:py-16 md:py-24 bg-black">
      <div
        ref={ref}
        className={cn(
          isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0'
        )}
      >
        <div className="text-left space-y-3 mb-2 px-4 sm:px-6">
          <h2
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-default"
            style={{ fontFamily: 'var(--font-roboto), sans-serif' }}
          >
            {t('landing.carousel.introTitle')}
          </h2>
          <p
            className="text-base sm:text-lg md:text-xl text-text w-full"
            style={{ fontFamily: 'var(--font-roboto), sans-serif' }}
          >
            <span className="block">
              <HighlightedText text={content.carousel.subtitleLine1} />
            </span>
            <span className="block">
              <HighlightedText text={content.carousel.subtitleLine2} />
            </span>
          </p>
        </div>

        <div className="w-full">
          <LandingCarousel
            ref={carouselRef}
            items={carouselItems}
            autoPlay={false}
            onActiveItemChange={(item) => setActiveSectorId(item.id)}
            footer={
              <div className="flex justify-center">
                <div className="flex flex-nowrap justify-center gap-2 sm:gap-3 mx-auto">
                  {carouselItems.map((item) => {
                    const SectorIcon = sectorIconMap[item.id] ?? ShoppingBag;
                    const isActive = activeSectorId === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleSectorClick(item)}
                        className={cn(
                          'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border',
                          isActive
                            ? 'bg-brand-primary text-white border-brand-primary shadow-lg shadow-brand-primary/30 scale-105'
                            : 'bg-surface text-text border-border-default hover:border-brand-primary/50 hover:text-brand-primary hover:bg-brand-primary/5'
                        )}
                        aria-pressed={isActive}
                      >
                        <SectorIcon className="h-4 w-4 flex-shrink-0" />
                      </button>
                    );
                  })}
                </div>
              </div>
            }
          />
        </div>
      </div>
    </section>
  );
}

function FranchiseSection({
  content,
}: {
  content: ReturnType<typeof getLandingPageContent>;
}) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  const franchiseBlocks = [
    {
      label: content.franchise.franchisees.title,
      description: content.franchise.franchisees.description,
      icon: Network,
    },
    {
      label: content.franchise.branches.title,
      description: content.franchise.branches.description,
      icon: Building2,
    },
  ];

  return (
    <section
      className="relative w-full"
      style={{
        background:
          'radial-gradient(ellipse at 10% 50%, rgba(124,58,237,0.2) 0%, transparent 55%), radial-gradient(ellipse at 90% 50%, rgba(99,102,241,0.15) 0%, transparent 55%), #000000',
      }}
    >
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 py-16">
        <div className="text-center mb-12">
          <h2
            className="font-bold text-white leading-tight"
            style={{
              fontFamily: 'var(--font-roboto), sans-serif',
              fontSize: 'clamp(1.5rem, 3.5vw, 2.8rem)',
            }}
          >
            <span className="block">{content.franchise.titleLine1}</span>
            <span className="block">
              <HighlightedText text={content.franchise.titleLine2} />
            </span>
          </h2>
        </div>

        <div
          ref={ref}
          className={cn(
            'grid grid-cols-1 md:grid-cols-2 gap-px border border-white/10 rounded-2xl overflow-hidden transition-all duration-700',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          )}
        >
          {franchiseBlocks.map((block, index) => {
            const Icon = block.icon;
            return (
              <div
                key={index}
                className={cn(
                  'flex flex-col gap-5 p-5 sm:p-8 md:p-10 h-full',
                  index === 0 ? 'md:border-r border-white/10' : ''
                )}
                style={{ background: 'rgba(167,139,250,0.03)' }}
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#7c3aed] to-[#a78bfa] flex items-center justify-center shadow-lg flex-shrink-0">
                  <Icon className="h-7 w-7 text-white" />
                </div>
                <span
                  className="text-xl sm:text-2xl md:text-3xl font-bold tracking-wide uppercase leading-tight"
                  style={{
                    fontFamily: 'var(--font-roboto), sans-serif',
                    background:
                      'linear-gradient(90deg, #a78bfa, #7c3aed, #c4b5fd, #7c3aed, #a78bfa)',
                    backgroundSize: '200% auto',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    animation: 'gradient-sweep 3s linear infinite',
                  }}
                >
                  {block.label}
                </span>
                <div className="flex flex-col gap-2">
                  {block.description.split('. ').map((sentence, i, arr) => (
                    <p
                      key={i}
                      className="text-base sm:text-lg text-white leading-relaxed font-normal"
                      style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
                    >
                      {sentence.endsWith('.')
                        ? sentence
                        : `${sentence}${i < arr.length - 1 ? '.' : ''}`}
                    </p>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function WhyChooseSection({
  content,
}: {
  content: ReturnType<typeof getLandingPageContent>;
}) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <section
      className="relative w-full"
      style={{
        background:
          'radial-gradient(ellipse at 50% 100%, rgba(124,58,237,0.18) 0%, transparent 60%), #000000',
      }}
    >
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 py-16 sm:py-24">
        {/* Header */}
        <div className="text-center mb-14">
          <h2
            className="font-bold text-white leading-tight"
            style={{
              fontFamily: 'var(--font-roboto), sans-serif',
              fontSize: 'clamp(1.5rem, 3.5vw, 2.8rem)',
            }}
          >
            <span className="block">
              <HighlightedText text={content.whyChoose.titleHighlight} />
            </span>
          </h2>
          <p
            className="mt-4 text-white font-normal"
            style={{
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontSize: 'clamp(1.05rem, 1.8vw, 1.35rem)',
            }}
          >
            {content.whyChoose.subtitle}
          </p>
        </div>

        {/* Stats grid */}
        <div ref={ref} className="flex flex-wrap justify-center gap-6">
          {content.whyChoose.stats.map((stat, index) => (
            <div key={index} className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
              <StatCard stat={stat} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function useCountUp({
  target,
  duration = 1800,
  isActive,
}: {
  target: number;
  duration?: number;
  isActive: boolean;
}) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isActive) return;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isActive, target, duration]);

  return count;
}

function StatCard({
  stat,
  index,
}: {
  stat: { value: string; label: string };
  index: number;
}) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.15 });

  // Parse numeric value and suffix (e.g. "155%" → 155, "%")
  const match = stat.value.match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : '';

  const count = useCountUp({ target, duration: 1800, isActive: isVisible });

  return (
    <div
      ref={ref}
      className="flex flex-col items-center text-center gap-3 p-5 sm:p-7"
    >
      <span
        className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal leading-none"
        style={{
          fontFamily: 'Helvetica, Arial, sans-serif',
          background:
            'linear-gradient(90deg, #a78bfa, #7c3aed, #c4b5fd, #7c3aed, #a78bfa)',
          backgroundSize: '200% auto',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          animation: 'gradient-sweep 3s linear infinite',
        }}
      >
        {isVisible ? `${count}${suffix}` : `0${suffix}`}
      </span>
      <p
        className="text-base sm:text-lg font-bold text-white leading-snug"
        style={{ fontFamily: 'var(--font-roboto), sans-serif' }}
      >
        {stat.label}
      </p>
    </div>
  );
}

function FAQSection({
  content,
}: {
  content: ReturnType<typeof getLandingPageContent>;
}) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="faq"
      className="py-12 sm:py-16 md:py-24 px-4 sm:px-8 md:px-16 bg-black"
    >
      <div
        ref={ref}
        style={{ width: '100%' }}
        className={cn(
          isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0'
        )}
      >
        <div className="text-center mb-12 space-y-2">
          <h2
            className="font-bold text-white leading-tight"
            style={{
              fontFamily: 'var(--font-roboto), sans-serif',
              fontSize: 'clamp(1.5rem, 4vw, 3.5rem)',
            }}
          >
            <HighlightedText text={content.faq.titleLine1} />
          </h2>
          <p
            className="font-bold text-white leading-tight"
            style={{
              fontFamily: 'var(--font-roboto), sans-serif',
              fontSize: 'clamp(1.5rem, 4vw, 3.5rem)',
            }}
          >
            <HighlightedText text={content.faq.titleLine2} />
          </p>
        </div>

        <div
          style={{
            width: '100%',
            maxWidth: '56rem',
            marginLeft: 'auto',
            marginRight: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
          }}
        >
          {content.faq.items.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                style={{ width: '100%' }}
                className={cn(
                  'rounded-2xl border transition-all duration-300',
                  isOpen
                    ? 'border-brand-primary/40 bg-brand-primary/5'
                    : 'border-white/10 bg-white/[0.03] hover:border-white/20'
                )}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  style={{
                    width: '100%',
                    display: 'grid',
                    gridTemplateColumns: 'auto 1fr',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '1.25rem 1.5rem',
                    textAlign: 'left',
                  }}
                >
                  <span
                    className="flex-shrink-0 text-2xl font-bold leading-none transition-colors duration-300"
                    style={{
                      color: isOpen ? '#a78bfa' : 'rgba(255,255,255,0.5)',
                    }}
                  >
                    {isOpen ? '−' : '+'}
                  </span>
                  <span
                    style={{
                      display: 'block',
                      width: '100%',
                      textAlign: 'left',
                      fontFamily: 'var(--font-roboto), sans-serif',
                    }}
                    className={cn(
                      'text-base sm:text-lg font-semibold transition-colors',
                      isOpen ? 'text-[#a78bfa]' : 'text-white'
                    )}
                  >
                    {item.question}
                  </span>
                </button>
                <div
                  className={cn(
                    'overflow-hidden transition-all duration-300 ease-in-out',
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  )}
                >
                  <p
                    style={{
                      display: 'block',
                      width: '100%',
                      textAlign: 'left',
                      fontFamily: 'var(--font-roboto), sans-serif',
                    }}
                    className="px-4 sm:px-6 pb-5 text-sm sm:text-base md:text-lg text-text/70 leading-relaxed"
                  >
                    {item.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CTASection({
  content,
}: {
  content: ReturnType<typeof getLandingPageContent>;
}) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.3 });

  return (
    <section
      id="contact"
      ref={ref}
      className={cn(
        'relative overflow-hidden py-16 sm:py-24 md:py-32 px-4',
        isVisible ? 'animate-scale-in opacity-100' : 'opacity-0'
      )}
      style={{
        background:
          'linear-gradient(135deg, #4c1d95 0%, #6d28d9 25%, #7c3aed 50%, #a855f7 75%, #c084fc 100%)',
      }}
    >
      {/* Grain texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.06'/%3E%3C/svg%3E\")",
          backgroundSize: '200px 200px',
          opacity: 0.4,
        }}
      />
      {/* Glow spots */}
      <div
        className="absolute top-0 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)',
          transform: 'translateY(-50%)',
        }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(0,0,0,0.15) 0%, transparent 70%)',
          transform: 'translateY(50%)',
        }}
      />

      <div className="container relative z-10 mx-auto text-center">
        <div className="flex flex-col items-center gap-2">
          <h2
            className="font-bold text-white leading-tight px-2"
            style={{
              fontFamily: 'var(--font-roboto), sans-serif',
              fontSize: 'clamp(1.5rem, 4vw, 4rem)',
            }}
          >
            {content.cta.titleLine}
          </h2>
          <p
            className="text-white/90 mx-auto px-2 max-w-[48rem] font-normal"
            style={{
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontSize: 'clamp(1rem, 2.5vw, 1.8rem)',
            }}
          >
            {content.cta.description}
          </p>
          <StarBorderLink href="/contact" color="#ffffff" speed="4s">
            {content.cta.buttonText}
          </StarBorderLink>
        </div>
      </div>
    </section>
  );
}
