'use client';

import Image from 'next/image';
import { LinkButton } from '@staamina/ui/link-button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@staamina/ui/card';
import {
  LandingCarousel,
  type LandingCarouselHandle,
  type SliderItem,
} from '@staamina/ui/landing-carousel';
import '@staamina/ui/landing-carousel/landing-carousel.css';
import { cn } from '@staamina/ui/utils';
import {
  Activity,
  ArrowRight,
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
  Store,
  Building2,
  Wrench,
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
      <UseCasesSection />
      <FranchiseSection content={content} />
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
    <section className="relative overflow-hidden pt-20 sm:pt-32 pb-20 sm:pb-40 px-4 bg-app">
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
          'container relative z-20 mx-auto max-w-6xl',
          isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0'
        )}
      >
        <div className="text-center space-y-4 sm:space-y-6">
          <div className="space-y-1">
            <p
              className="text-base sm:text-lg md:text-xl font-bold tracking-wide text-text/80 mx-auto leading-relaxed px-2 uppercase"
              style={{ fontFamily: 'var(--font-roboto), sans-serif' }}
            >
              {content.hero.description}
            </p>

            <h1
              className="text-base sm:text-lg md:text-xl font-bold leading-tight text-default px-2"
              style={{ fontFamily: 'var(--font-roboto), sans-serif' }}
            >
              <span className="text-[#a78bfa]">STAAMINA</span>
              {' REND LES DYSFONCTIONNEMENTS '}
              <AnimatedTitle
                messages={content.hero.titleVariants}
                className="inline font-bold text-[#a78bfa]"
                align="left"
              />
            </h1>
          </div>

          <p
            className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold w-full leading-tight mt-12 sm:mt-16 text-center"
            style={{ fontFamily: 'var(--font-roboto), sans-serif' }}
          >
            LA SOLUTION DE <span className="text-[#a78bfa]">MAINTENANCE</span>{' '}
            POUR <span className="text-[#a78bfa]">PILOTER INTELLIGEMMENT</span>{' '}
            LES INCIDENTS DE VOS{' '}
            <span className="text-[#a78bfa]">POINTS DE VENTE.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-16">
            <StarBorderLink href="/contact" color="#a78bfa" speed="5s">
              {content.hero.ctaPrimary}
            </StarBorderLink>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProblemStatementSection({
  content,
}: {
  content: ReturnType<typeof getLandingPageContent>;
}) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section
      id="probleme"
      className="relative bg-black overflow-hidden min-h-screen flex items-center"
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
        <div className="w-full md:w-[40%] px-8 sm:px-16 py-16 shrink-0">
          <p
            className="font-bold text-white leading-snug text-left"
            style={{
              fontFamily: 'var(--font-roboto), sans-serif',
              fontSize: 'clamp(1.1rem, 2.8vw, 3.5rem)',
            }}
          >
            <span className="block">
              UN <span className="text-[#a78bfa]">POINT DE VENTE</span> EST{' '}
              <span className="text-[#a78bfa]">COMPLEXE</span>.
            </span>
            <span className="block">
              À L&apos;ÉCHELLE D&apos;UN{' '}
              <span className="text-[#a78bfa]">RÉSEAU</span>, LA{' '}
              <span className="text-[#a78bfa]">COMPLEXITÉ</span> DEVIENT{' '}
              <span className="text-[#a78bfa]">EXPONENTIELLE</span>.
            </span>
            <span className="block">
              VOS <span className="text-[#a78bfa]">OPÉRATIONS</span> NE
              DEVRAIENT PAS L&apos;ÊTRE.
            </span>
          </p>
        </div>
        <div className="w-full md:w-[60%] flex items-center justify-center">
          <Image
            src="/store-isometric.png"
            alt="Point de vente isométrique"
            width={1000}
            height={850}
            className="w-[80%] h-auto object-contain"
          />
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
}: {
  label: string;
  sectionTitle?: React.ReactNode;
  tagline?: string;
  highlight?: string;
  items: { text: string; type: 'positive' | 'negative' }[];
  accentColor: 'red' | 'brand';
  illustrationSide: 'left' | 'right';
}) {
  const { ref: textRef, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const { ref: illustrationRef, offset } = useParallax(40);

  const illustrationEl = (
    <div className="flex items-center justify-center p-8 sm:p-12">
      <div
        ref={illustrationRef}
        style={{ transform: `translateY(-${offset}px)` }}
        className="w-full transition-transform duration-75 ease-out"
      >
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
      </div>
    </div>
  );

  const textEl = (
    <div
      ref={textRef}
      className={cn(
        'flex flex-col justify-center px-8 sm:px-12 md:px-16 py-12 transition-all duration-700 ease-out',
        isVisible
          ? 'opacity-100 translate-x-0'
          : `opacity-0 ${illustrationSide === 'left' ? 'translate-x-12' : '-translate-x-12'}`
      )}
    >
      {label && (
        <span
          className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-wide uppercase mb-4 inline-block"
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
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-default mb-6 leading-tight"
          style={{ fontFamily: 'var(--font-roboto), sans-serif' }}
        >
          {tagline}
        </h3>
      )}
      {highlight && (
        <p
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6"
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
    <div className="border-b border-white/5 min-h-screen">
      {sectionTitle && (
        <div className="w-full px-8 sm:px-12 py-6">
          <h3
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-default text-center"
            style={{ fontFamily: 'var(--font-roboto), sans-serif' }}
          >
            {sectionTitle}
          </h3>
        </div>
      )}
      <div className="overflow-hidden">
        <div className="min-h-[60vh] grid grid-cols-1 md:grid-cols-2 items-center">
          {illustrationSide === 'left' ? (
            <>
              {illustrationEl}
              {textEl}
            </>
          ) : (
            <>
              {textEl}
              {illustrationEl}
            </>
          )}
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
        backgroundImage:
          'radial-gradient(circle, rgba(167, 139, 250, 0.45) 1px, transparent 1px), linear-gradient(135deg, #000000 0%, #0d0014 40%, #1a0030 70%, #0d0014 100%)',
        backgroundSize: '28px 28px, 100% 100%',
      }}
    >
      <div>
        <FeatureRow
          sectionTitle={
            <div className="space-y-2">
              <p
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-default leading-tight"
                style={{ fontFamily: 'var(--font-roboto), sans-serif' }}
              >
                STAAMINA <span className="text-[#a78bfa]">STRUCTURE</span> ET{' '}
                <span className="text-[#a78bfa]">SIMPLIFIE</span> LES OPÉRATIONS
              </p>
              <p
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-default leading-tight"
                style={{ fontFamily: 'var(--font-roboto), sans-serif' }}
              >
                LA RÉSOLUTION D&apos;UN INCIDENT NE DEVRAIT PAS ÊTRE UN PARCOURS
                D&apos;OBSTACLES.
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
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-default leading-tight"
                style={{ fontFamily: 'var(--font-roboto), sans-serif' }}
              >
                DE LA <span className="text-[#a78bfa]">DÉCLARATION</span>{' '}
                D&apos;UN INCIDENT JUSQU&apos;À SA{' '}
                <span className="text-[#a78bfa]">RÉSOLUTION</span>
              </p>
              <p
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-default leading-tight"
                style={{ fontFamily: 'var(--font-roboto), sans-serif' }}
              >
                UN POINT D&apos;ENTRÉE UNIQUE POUR TOUS VOS INCIDENTS.
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
        'group relative h-full p-7 rounded-2xl border border-white/10 transition-all duration-700',
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
              fontSize: 'clamp(1.2rem, 2.8vw, 2.8rem)',
            }}
          >
            <span className="block">
              DES <span className="text-[#a78bfa]">FONCTIONNALITÉS</span> AU
              SERVICE
            </span>
            <span className="block">
              DE LA <span className="text-[#a78bfa]">PERFORMANCE</span>{' '}
              COLLECTIVE
            </span>
          </h2>
          <p
            className="mt-4 text-white/50 font-normal"
            style={{
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontSize: 'clamp(0.95rem, 1.5vw, 1.15rem)',
            }}
          >
            {content.features.subtitle}
          </p>
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
}: {
  name: string;
  description: string;
  illustrationSide: 'left' | 'right';
}) {
  const { ref: textRef, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const { ref: illustrationRef, offset } = useParallax(40);

  const illustrationEl = (
    <div className="flex items-center justify-center p-4 sm:p-6">
      <div
        ref={illustrationRef}
        style={{ transform: `translateY(-${offset}px)` }}
        className="w-full transition-transform duration-75 ease-out"
      >
        <div className="w-full h-48 sm:h-64 rounded-2xl border-2 border-[#a78bfa]/20 bg-[#a78bfa]/5 flex items-center justify-center">
          <p className="text-white/20 text-sm">Illustration à ajouter</p>
        </div>
      </div>
    </div>
  );

  const textEl = (
    <div
      ref={textRef}
      className={cn(
        'flex flex-col justify-center px-6 sm:px-8 md:px-10 py-6 transition-all duration-700 ease-out',
        isVisible
          ? 'opacity-100 translate-x-0'
          : `opacity-0 ${illustrationSide === 'left' ? 'translate-x-12' : '-translate-x-12'}`
      )}
    >
      <span
        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-wide uppercase mb-3 inline-block"
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
        {name}
      </span>
      <div className="flex flex-col gap-2">
        {description.split('. ').map((sentence, i, arr) => (
          <p
            key={i}
            className="text-xl sm:text-2xl text-white leading-relaxed font-normal"
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

  return (
    <div className="border-b border-white/5">
      <div className="overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center">
          {illustrationSide === 'left' ? (
            <>
              {illustrationEl}
              {textEl}
            </>
          ) : (
            <>
              {textEl}
              {illustrationEl}
            </>
          )}
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
    { ...content.multiDevice.devices[0], illustrationSide: 'left' as const }, // MOBILE & TABLETTE
    { ...content.multiDevice.devices[1], illustrationSide: 'right' as const }, // LAPTOP & DESKTOP
    { ...content.multiDevice.devices[2], illustrationSide: 'left' as const }, // CAISSE & BORNE
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
            fontSize: 'clamp(1.2rem, 2.8vw, 2.8rem)',
          }}
        >
          <span className="block">
            <span className="text-[#a78bfa]">PENSÉE</span> POUR CHAQUE{' '}
            <span className="text-[#a78bfa]">UTILISATEUR</span>
          </span>
          <span className="block">
            <span className="text-[#a78bfa]">OPTIMISÉE</span> POUR CHAQUE{' '}
            <span className="text-[#a78bfa]">ENVIRONNEMENT</span>
          </span>
        </h2>
        <div
          style={{
            fontFamily: 'var(--font-roboto), sans-serif',
            fontSize: 'clamp(1rem, 2.2vw, 1.5rem)',
            marginTop: '1rem',
            textAlign: 'center',
            width: '100%',
            color: 'rgba(255,255,255,1)',
            fontWeight: '500',
          }}
        >
          <span style={{ display: 'block', width: '100%' }}>
            CONÇU POUR TOUS LES USAGES OPÉRATIONNELS,
          </span>
          <span style={{ display: 'block', width: '100%' }}>
            STAAMINA S&apos;ADAPTE NATIVEMENT AUX ENVIRONNEMENTS EXISTANTS.
          </span>
        </div>
      </div>

      {devices.map((device, index) => (
        <DeviceRow
          key={index}
          name={device.name}
          description={device.description}
          illustrationSide={device.illustrationSide}
        />
      ))}
    </section>
  );
}

function UseCasesSection() {
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
        <div className="text-left space-y-3 mb-2 px-4">
          <h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-default"
            style={{ fontFamily: 'var(--font-roboto), sans-serif' }}
          >
            {t('landing.carousel.introTitle')}
          </h2>
          <p
            className="text-lg sm:text-xl md:text-2xl text-text w-full"
            style={{ fontFamily: 'var(--font-roboto), sans-serif' }}
          >
            <span className="block">
              <span className="text-[#a78bfa]">STAAMINA</span> EST PENSÉE POUR
              INTÉGRER TOUTES LES{' '}
              <span className="text-[#a78bfa]">SPÉCIFICITÉS MÉTIERS</span>,
            </span>
            <span className="block">
              QUEL QUE SOIT{' '}
              <span className="text-[#a78bfa]">LE SECTEUR D&apos;ACTIVITÉ</span>
              .
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
              fontSize: 'clamp(1.2rem, 2.8vw, 2.8rem)',
            }}
          >
            <span className="block">UNE SOLUTION POUR ACCOMPAGNER</span>
            <span className="block">
              VOS <span className="text-[#a78bfa]">SUCCURSALES</span> COMME VOS{' '}
              <span className="text-[#a78bfa]">FRANCHISES</span>
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
                  'flex flex-col gap-6 p-8 sm:p-10 md:p-12 h-full',
                  index === 0 ? 'md:border-r border-white/10' : ''
                )}
                style={{ background: 'rgba(167,139,250,0.03)' }}
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#7c3aed] to-[#a78bfa] flex items-center justify-center shadow-lg flex-shrink-0">
                  <Icon className="h-7 w-7 text-white" />
                </div>
                <span
                  className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-wide uppercase leading-tight min-h-[4rem]"
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
                      className="text-lg sm:text-xl text-white leading-relaxed font-normal"
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
      className="py-16 sm:py-20 md:py-28 px-6 sm:px-12 md:px-20 bg-black"
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
            VOUS AVEZ DES <span className="text-[#a78bfa]">QUESTIONS</span> ?
          </h2>
          <p
            className="font-bold text-white leading-tight"
            style={{
              fontFamily: 'var(--font-roboto), sans-serif',
              fontSize: 'clamp(1.5rem, 4vw, 3.5rem)',
            }}
          >
            NOUS AVONS LES <span className="text-[#a78bfa]">RÉPONSES.</span>
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
                      'text-lg sm:text-xl font-semibold transition-colors',
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
                    className="px-6 pb-5 text-lg sm:text-xl text-text/70 leading-relaxed"
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
        'py-12 sm:py-16 md:py-24 px-4 bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-tertiary relative overflow-hidden',
        isVisible ? 'animate-scale-in opacity-100' : 'opacity-0'
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.2),transparent_70%)]" />
      <div className="container relative mx-auto text-center">
        <div className="space-y-6 sm:space-y-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-on-primary px-2 wrap-break-word">
            {content.cta.title}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-on-primary/90 mx-auto px-2 wrap-break-word max-w-[48rem]">
            {content.cta.description}
          </p>
          <StarBorderLink href="/contact" color="#a78bfa" speed="5s">
            {content.cta.buttonText}
          </StarBorderLink>
        </div>
      </div>
    </section>
  );
}
