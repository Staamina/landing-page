import type { SliderItem } from '@staamina/ui/landing-carousel';

export interface FeatureItem {
  title: string;
  description: string;
  icon: string;
  tags: string[];
}

export interface LandingPageContent {
  hero: {
    title: string;
    titleStaticPrefix: string;
    titleVariants: string[];
    subtitle: string;
    description: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  problemStatement: {
    text: string;
  };
  beforeAfter: {
    title: string;
    before: {
      label: string;
      tagline: string;
      items: string[];
    };
    after: {
      label: string;
      tagline: string;
      highlight: string;
      items: string[];
    };
  };
  features: {
    title: string;
    subtitle: string;
    items: FeatureItem[];
  };
  multiDevice: {
    title: string;
    subtitle: string;
    cta: string;
    devices: Array<{
      name: string;
      description: string;
      icon: string;
    }>;
  };
  franchise: {
    title: string;
    franchisees: { title: string; description: string };
    branches: { title: string; description: string };
  };
  forSiteOperators: {
    title: string;
    description: string;
    benefits: string[];
  };
  forGroupManagers: {
    title: string;
    description: string;
    benefits: string[];
  };
  forServiceProviders: {
    title: string;
    description: string;
    benefits: string[];
  };
  faq: {
    title: string;
    subtitle: string;
    items: { question: string; answer: string }[];
  };
  cta: {
    title: string;
    description: string;
    buttonText: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}

export const getLandingPageContent = (
  t: (key: string) => string
): LandingPageContent => {
  const titleVariants = [
    'landing.hero.titleVariants.pilotables',
    'landing.hero.titleVariants.anticipables',
    'landing.hero.titleVariants.controlables',
    'landing.hero.titleVariants.maitrisables',
    'landing.hero.titleVariants.exploitables',
    'landing.hero.titleVariants.mesurables',
    'landing.hero.titleVariants.tracables',
    'landing.hero.titleVariants.detectables',
    'landing.hero.titleVariants.identifiables',
  ];

  return {
    hero: {
      title: t('landing.hero.title'),
      titleStaticPrefix: t('landing.hero.titleStaticPrefix'),
      titleVariants: titleVariants.map((key) => t(key)),
      subtitle: t('landing.hero.subtitle'),
      description: t('landing.hero.description'),
      ctaPrimary: t('landing.hero.ctaPrimary'),
      ctaSecondary: t('landing.hero.ctaSecondary'),
    },
    problemStatement: {
      text: t('landing.problemStatement.text'),
    },
    beforeAfter: {
      title: t('landing.beforeAfter.title'),
      before: {
        label: t('landing.beforeAfter.before.label'),
        tagline: t('landing.beforeAfter.before.tagline'),
        items: [
          t('landing.beforeAfter.before.items.0'),
          t('landing.beforeAfter.before.items.1'),
          t('landing.beforeAfter.before.items.2'),
          t('landing.beforeAfter.before.items.3'),
        ],
      },
      after: {
        label: t('landing.beforeAfter.after.label'),
        tagline: t('landing.beforeAfter.after.tagline'),
        highlight: t('landing.beforeAfter.after.highlight'),
        items: [
          t('landing.beforeAfter.after.items.0'),
          t('landing.beforeAfter.after.items.1'),
          t('landing.beforeAfter.after.items.2'),
          t('landing.beforeAfter.after.items.3'),
        ],
      },
    },
    features: {
      title: t('landing.features.title'),
      subtitle: t('landing.features.subtitle'),
      items: [
        {
          title: t('landing.features.items.aiDeclaration.title'),
          description: t('landing.features.items.aiDeclaration.description'),
          icon: 'sparkles',
          tags: [
            t('landing.features.items.aiDeclaration.tag1'),
            t('landing.features.items.aiDeclaration.tag2'),
            t('landing.features.items.aiDeclaration.tag3'),
          ],
        },
        {
          title: t('landing.features.items.intelligentRouting.title'),
          description: t(
            'landing.features.items.intelligentRouting.description'
          ),
          icon: 'git-branch',
          tags: [
            t('landing.features.items.intelligentRouting.tag1'),
            t('landing.features.items.intelligentRouting.tag2'),
            t('landing.features.items.intelligentRouting.tag3'),
          ],
        },
        {
          title: t('landing.features.items.realTimeData.title'),
          description: t('landing.features.items.realTimeData.description'),
          icon: 'activity',
          tags: [
            t('landing.features.items.realTimeData.tag1'),
            t('landing.features.items.realTimeData.tag2'),
            t('landing.features.items.realTimeData.tag3'),
          ],
        },
        {
          title: t('landing.features.items.mapping.title'),
          description: t('landing.features.items.mapping.description'),
          icon: 'map-pin',
          tags: [
            t('landing.features.items.mapping.tag1'),
            t('landing.features.items.mapping.tag2'),
            t('landing.features.items.mapping.tag3'),
          ],
        },
        {
          title: t('landing.features.items.unifiedRepository.title'),
          description: t(
            'landing.features.items.unifiedRepository.description'
          ),
          icon: 'database',
          tags: [
            t('landing.features.items.unifiedRepository.tag1'),
            t('landing.features.items.unifiedRepository.tag2'),
            t('landing.features.items.unifiedRepository.tag3'),
          ],
        },
        {
          title: t('landing.features.items.unifiedCommunication.title'),
          description: t(
            'landing.features.items.unifiedCommunication.description'
          ),
          icon: 'message-square',
          tags: [
            t('landing.features.items.unifiedCommunication.tag1'),
            t('landing.features.items.unifiedCommunication.tag2'),
            t('landing.features.items.unifiedCommunication.tag3'),
          ],
        },
      ],
    },
    multiDevice: {
      title: t('landing.multiDevice.title'),
      subtitle: t('landing.multiDevice.subtitle'),
      cta: t('landing.multiDevice.cta'),
      devices: [
        {
          name: t('landing.multiDevice.devices.mobile.name'),
          description: t('landing.multiDevice.devices.mobile.description'),
          icon: 'smartphone',
        },
        {
          name: t('landing.multiDevice.devices.desktop.name'),
          description: t('landing.multiDevice.devices.desktop.description'),
          icon: 'monitor',
        },
        {
          name: t('landing.multiDevice.devices.kiosk.name'),
          description: t('landing.multiDevice.devices.kiosk.description'),
          icon: 'tablet',
        },
      ],
    },
    franchise: {
      title: t('landing.franchise.title'),
      franchisees: {
        title: t('landing.franchise.franchisees.title'),
        description: t('landing.franchise.franchisees.description'),
      },
      branches: {
        title: t('landing.franchise.branches.title'),
        description: t('landing.franchise.branches.description'),
      },
    },
    forSiteOperators: {
      title: t('landing.forSiteOperators.title'),
      description: t('landing.forSiteOperators.description'),
      benefits: [
        t('landing.forSiteOperators.benefits.noHassle'),
        t('landing.forSiteOperators.benefits.simpleReporting'),
        t('landing.forSiteOperators.benefits.quickResolution'),
      ],
    },
    forGroupManagers: {
      title: t('landing.forGroupManagers.title'),
      description: t('landing.forGroupManagers.description'),
      benefits: [
        t('landing.forGroupManagers.benefits.realTimeMonitoring'),
        t('landing.forGroupManagers.benefits.centralizedView'),
        t('landing.forGroupManagers.benefits.efficientCoordination'),
      ],
    },
    forServiceProviders: {
      title: t('landing.forServiceProviders.title'),
      description: t('landing.forServiceProviders.description'),
      benefits: [
        t('landing.forServiceProviders.benefits.completeInformation'),
        t('landing.forServiceProviders.benefits.directContact'),
        t('landing.forServiceProviders.benefits.efficientIntervention'),
      ],
    },
    faq: {
      title: t('landing.faq.title'),
      subtitle: t('landing.faq.subtitle'),
      items: [
        {
          question: t('landing.faq.items.0.question'),
          answer: t('landing.faq.items.0.answer'),
        },
        {
          question: t('landing.faq.items.1.question'),
          answer: t('landing.faq.items.1.answer'),
        },
        {
          question: t('landing.faq.items.2.question'),
          answer: t('landing.faq.items.2.answer'),
        },
        {
          question: t('landing.faq.items.3.question'),
          answer: t('landing.faq.items.3.answer'),
        },
        {
          question: t('landing.faq.items.4.question'),
          answer: t('landing.faq.items.4.answer'),
        },
        {
          question: t('landing.faq.items.5.question'),
          answer: t('landing.faq.items.5.answer'),
        },
      ],
    },
    cta: {
      title: t('landing.cta.title'),
      description: t('landing.cta.description'),
      buttonText: t('landing.cta.buttonText'),
    },
    seo: {
      title: t('landing.seo.title'),
      description: t('landing.seo.description'),
      keywords: [
        t('landing.seo.keywords.equipmentMaintenance'),
        t('landing.seo.keywords.siteManagement'),
        t('landing.seo.keywords.facilityManagement'),
        t('landing.seo.keywords.serviceCoordination'),
        t('landing.seo.keywords.maintenanceSoftware'),
      ],
    },
  };
};

export const getCarouselItems = (t: (key: string) => string): SliderItem[] => {
  const introTitle = t('landing.carousel.introTitle');
  const detailDescription = t('landing.carousel.detailDescription');
  const ctaLabel = t('landing.carousel.ctaLabel');

  const sectors = [
    {
      id: 6,
      key: 'hospitality',
      image: '/image6.png',
      imageClassName: 'landing-carousel__image--sm',
      specifications: [
        'hotel',
        'hotelResidence',
        'receptionHall',
        'conventionCenter',
      ],
    },
    {
      id: 1,
      key: 'retail',
      image: '/image1.png',
      specifications: [
        'cityCenterStore',
        'mallBoutique',
        'flagship',
        'cornerShopInShop',
        'outlet',
        'showroom',
        'popUpStore',
      ],
    },
    {
      id: 2,
      key: 'restaurant',
      image: '/image2.png',
      specifications: [
        'independentOrChain',
        'fastFood',
        'coffeeShop',
        'brasserie',
        'darkKitchen',
        'foodCourt',
        'bar',
      ],
    },
    {
      id: 3,
      key: 'fitness',
      image: '/image3.png',
      specifications: [
        'gym',
        'sportsClub',
        'coachingStudio',
        'wellnessCenter',
        'yogaPilates',
        'leisureCenter',
      ],
    },
    {
      id: 4,
      key: 'agencies',
      image: '/image4.png',
      specifications: ['bank', 'insurance', 'realEstate', 'travel', 'services'],
    },
    {
      id: 5,
      key: 'health',
      image: '/image5.png',
      specifications: [
        'pharmacy',
        'parapharmacy',
        'medicalCenter',
        'carePractice',
        'opticAudioprothesist',
      ],
    },
  ];

  return sectors.map((sector) => ({
    id: sector.id,
    image: sector.image,
    alt: t(`landing.carousel.sectors.${sector.key}.alt`),
    imageClassName:
      'imageClassName' in sector
        ? (sector as { imageClassName?: string }).imageClassName
        : undefined,
    intro: {
      title: introTitle,
      topic: t(`landing.carousel.sectors.${sector.key}.topic`),
      description: t(`landing.carousel.sectors.${sector.key}.introDescription`),
      ctaLabel,
    },
    detail: {
      title: t(`landing.carousel.sectors.${sector.key}.detailTitle`),
      description: detailDescription,
      specifications: sector.specifications.map((spec) => ({
        label: t(
          `landing.carousel.sectors.${sector.key}.specifications.${spec}`
        ),
        value: '✓',
      })),
      actions: [],
    },
  }));
};
