'use client';

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
import { useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

import {
  getCarouselItems,
  getLandingPageContent,
} from '@/config/landing-page-content';
import { useMountAnimation } from '@/hooks/use-mount-animation';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

import { AnimatedTitle } from './animated-title';

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
      <BeforeAfterSection content={content} />
      <FeaturesSection content={content} />
      <MultiDeviceSection content={content} />
      <TargetAudienceSection content={content} />
      <FranchiseSection content={content} />
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
      <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 via-transparent to-brand-secondary/5" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(79,46,176,0.1),transparent_50%)]" />
      <div
        ref={ref}
        className={cn(
          'container relative z-10 mx-auto max-w-6xl',
          isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0'
        )}
      >
        <div className="text-center space-y-6 sm:space-y-8">
          <p className="text-base sm:text-lg md:text-xl font-semibold tracking-wide text-text/80 mx-auto leading-relaxed px-2 uppercase">
            {content.hero.description}
          </p>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-default px-2 space-y-2">
            <span className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-tertiary bg-clip-text text-transparent">
              {content.hero.titleStaticPrefix}
            </span>
            <AnimatedTitle
              messages={content.hero.titleVariants}
              className="bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-tertiary bg-clip-text text-transparent"
            />
          </h1>

          <p className="text-sm sm:text-base md:text-lg font-medium text-text/70 mx-auto px-2 max-w-[42rem]">
            {content.hero.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <LinkButton href="/contact" intent="primary" appearance="solid">
              {content.hero.ctaPrimary}
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
            </LinkButton>
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
    <section className="py-16 sm:py-20 px-4 bg-surface">
      <div
        ref={ref}
        className={cn(
          'container mx-auto max-w-[56rem] text-center',
          isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0'
        )}
      >
        <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-default leading-tight tracking-wide">
          {content.problemStatement.text}
        </p>
      </div>
    </section>
  );
}

function BeforeAfterSection({
  content,
}: {
  content: ReturnType<typeof getLandingPageContent>;
}) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.15 });

  return (
    <section className="py-12 sm:py-16 md:py-24 px-4 bg-app">
      <div
        ref={ref}
        className={cn(
          'container mx-auto max-w-6xl',
          isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0'
        )}
      >
        <p className="text-center text-sm sm:text-base font-semibold text-text/60 uppercase tracking-widest mb-10 sm:mb-14 px-4">
          {content.beforeAfter.title}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Without Staamina */}
          <Card className="relative overflow-hidden border-red-500/30 bg-red-950/10 backdrop-blur-sm">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 to-red-400" />
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                  <X className="h-4 w-4 text-red-400" />
                </div>
                <span className="text-xs font-bold tracking-widest text-red-400 uppercase">
                  {content.beforeAfter.before.label}
                </span>
              </div>
              <CardTitle className="text-lg sm:text-xl text-default/80">
                {content.beforeAfter.before.tagline}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {content.beforeAfter.before.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <X className="h-3 w-3 text-red-400" />
                    </div>
                    <span className="text-sm sm:text-base text-text/70">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* With Staamina */}
          <Card className="relative overflow-hidden border-brand-primary/30 bg-brand-primary/5 backdrop-blur-sm">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-primary to-brand-secondary" />
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-brand-primary/20 flex items-center justify-center">
                  <CheckCircle2 className="h-4 w-4 text-brand-primary" />
                </div>
                <span className="text-xs font-bold tracking-widest text-brand-primary uppercase">
                  {content.beforeAfter.after.label}
                </span>
              </div>
              <CardTitle className="text-lg sm:text-xl text-default">
                {content.beforeAfter.after.tagline}
              </CardTitle>
              <p className="text-base font-semibold text-brand-primary mt-1">
                {content.beforeAfter.after.highlight}
              </p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {content.beforeAfter.after.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-brand-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-text">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
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

function FeaturesSection({
  content,
}: {
  content: ReturnType<typeof getLandingPageContent>;
}) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
  const t = useTranslations();
  const carouselItems = getCarouselItems((key: string) => t(key));
  const carouselRef = useRef<LandingCarouselHandle>(null);
  const [activeSectorId, setActiveSectorId] = useState<string | number>(
    carouselItems[1]?.id ?? carouselItems[0]?.id
  );

  const handleSectorClick = (item: SliderItem) => {
    carouselRef.current?.navigateTo(item.id);
  };

  return (
    <section id="features" className="py-12 sm:py-16 md:py-24 bg-surface">
      <div
        ref={ref}
        className={cn(
          'container mx-auto px-4',
          isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0'
        )}
      >
        <div className="text-center space-y-3 sm:space-y-4 mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-default px-2">
            {content.features.title}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-text mx-auto px-2">
            {content.features.subtitle}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16 md:mb-20">
          {content.features.items.map((feature, index) => {
            const Icon = iconMap[feature.icon] || Activity;
            return (
              <Card
                key={index}
                className="transition-all hover:shadow-xl bg-app backdrop-blur-sm p-sm"
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-linear-to-br from-brand-primary to-brand-secondary flex items-center justify-center mb-4 shadow-lg">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg sm:text-xl text-default wrap-break-word">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="text-sm sm:text-base text-text wrap-break-word leading-relaxed">
                    {feature.description}
                  </CardDescription>
                  <div className="flex flex-wrap gap-2">
                    {feature.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-brand-primary/10 text-brand-primary border border-brand-primary/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Sector navigation buttons */}
      <div className="w-full px-4 mb-6 sm:mb-8">
        <div className="flex justify-center">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 max-w-[56rem] mx-auto">
            {carouselItems.map((item) => {
              const SectorIcon = sectorIconMap[item.id] ?? ShoppingBag;
              const isActive = activeSectorId === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSectorClick(item)}
                  className={cn(
                    'inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200 border',
                    isActive
                      ? 'bg-brand-primary text-white border-brand-primary shadow-lg shadow-brand-primary/30 scale-105'
                      : 'bg-surface text-text border-border-default hover:border-brand-primary/50 hover:text-brand-primary hover:bg-brand-primary/5'
                  )}
                  aria-pressed={isActive}
                >
                  <SectorIcon className="h-4 w-4 flex-shrink-0" />
                  <span className="whitespace-nowrap">{item.intro.topic}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="w-full">
        <LandingCarousel
          ref={carouselRef}
          items={carouselItems}
          autoPlay={false}
          onActiveItemChange={(item) => setActiveSectorId(item.id)}
        />
      </div>
    </section>
  );
}

function MultiDeviceSection({
  content,
}: {
  content: ReturnType<typeof getLandingPageContent>;
}) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section className="py-12 sm:py-16 md:py-24 px-4 bg-app">
      <div
        ref={ref}
        className={cn(
          'container mx-auto max-w-6xl',
          isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0'
        )}
      >
        <div className="text-center space-y-2 mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-default px-2">
            {content.multiDevice.title}
          </h2>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-tertiary bg-clip-text text-transparent px-2">
            {content.multiDevice.subtitle}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-10">
          {content.multiDevice.devices.map((device, index) => {
            const Icon = iconMap[device.icon] || Monitor;
            return (
              <Card
                key={index}
                className="text-center transition-all hover:shadow-xl bg-surface backdrop-blur-sm p-sm"
              >
                <CardHeader>
                  <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-brand-primary to-brand-secondary flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-base sm:text-lg font-bold tracking-wider text-default">
                    {device.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm sm:text-base text-text leading-relaxed">
                    {device.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <p className="text-center text-sm sm:text-base text-text/60 font-medium max-w-[48rem] mx-auto">
          {content.multiDevice.cta}
        </p>
      </div>
    </section>
  );
}

function TargetAudienceSection({
  content,
}: {
  content: ReturnType<typeof getLandingPageContent>;
}) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  const cards = [
    {
      title: content.forSiteOperators.title,
      description: content.forSiteOperators.description,
      benefits: content.forSiteOperators.benefits,
      borderColor: 'border-brand-primary/30',
      iconBg: 'from-brand-primary to-brand-primary-light',
      titleColor: 'text-brand-primary',
      iconColor: 'text-brand-primary',
      icon: Store,
    },
    {
      title: content.forGroupManagers.title,
      description: content.forGroupManagers.description,
      benefits: content.forGroupManagers.benefits,
      borderColor: 'border-brand-secondary/30',
      iconBg: 'from-brand-primary to-brand-primary-light',
      titleColor: 'text-brand-primary',
      iconColor: 'text-brand-primary',
      icon: Building2,
    },
    {
      title: content.forServiceProviders.title,
      description: content.forServiceProviders.description,
      benefits: content.forServiceProviders.benefits,
      borderColor: 'border-brand-tertiary/30',
      iconBg: 'from-brand-primary to-brand-primary-light',
      titleColor: 'text-brand-primary',
      iconColor: 'text-brand-primary',
      icon: Wrench,
    },
  ];

  return (
    <section className="py-12 sm:py-16 md:py-24 px-4 bg-surface">
      <div
        ref={ref}
        className={cn(
          'container relative mx-auto max-w-6xl',
          isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0'
        )}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <Card
                key={index}
                className="transition-all hover:shadow-xl bg-app backdrop-blur-sm p-sm"
              >
                <CardHeader>
                  <div
                    className={cn(
                      'w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-linear-to-br',
                      card.iconBg,
                      'flex items-center justify-center mb-4 shadow-lg'
                    )}
                  >
                    <Icon className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                  </div>
                  <CardTitle className={cn(card.titleColor, 'wrap-break-word')}>
                    {card.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4">
                  <p className="text-sm sm:text-base text-text leading-relaxed wrap-break-word">
                    {card.description}
                  </p>
                  <ul className="space-y-2">
                    {card.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-start gap-2">
                        <CheckCircle2
                          className={cn(
                            'h-4 w-4 sm:h-5 sm:w-5 mt-0.5 shrink-0',
                            card.iconColor
                          )}
                        />
                        <span className="text-sm sm:text-base text-text wrap-break-word">
                          {benefit}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
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

  return (
    <section className="py-12 sm:py-16 md:py-24 px-4 bg-app">
      <div
        ref={ref}
        className={cn(
          'container mx-auto max-w-6xl',
          isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0'
        )}
      >
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-default px-2">
            {content.franchise.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <Card className="relative overflow-hidden border-brand-secondary/30 bg-brand-secondary/5 backdrop-blur-sm p-sm">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-secondary to-brand-tertiary" />
            <CardHeader>
              <div className="w-14 h-14 rounded-full bg-linear-to-br from-brand-secondary to-brand-tertiary flex items-center justify-center mb-4 shadow-lg">
                <Network className="h-7 w-7 text-white" />
              </div>
              <CardTitle className="text-xl sm:text-2xl text-default">
                {content.franchise.franchisees.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm sm:text-base text-text leading-relaxed">
                {content.franchise.franchisees.description}
              </p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-brand-primary/30 bg-brand-primary/5 backdrop-blur-sm p-sm">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-primary to-brand-secondary" />
            <CardHeader>
              <div className="w-14 h-14 rounded-full bg-linear-to-br from-brand-primary to-brand-secondary flex items-center justify-center mb-4 shadow-lg">
                <Building2 className="h-7 w-7 text-white" />
              </div>
              <CardTitle className="text-xl sm:text-2xl text-default">
                {content.franchise.branches.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm sm:text-base text-text leading-relaxed">
                {content.franchise.branches.description}
              </p>
            </CardContent>
          </Card>
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
          <LinkButton href="/contact" intent="primary" appearance="solid">
            {content.cta.buttonText}
            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
