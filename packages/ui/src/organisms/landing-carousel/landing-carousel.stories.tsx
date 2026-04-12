import type { Meta, StoryObj } from '@storybook/react';

import { LandingCarousel, type SliderItem } from './landing-carousel';

const mockItems: SliderItem[] = [
  {
    id: 1,
    image: 'http://localhost:4001/image1.png',
    alt: 'Retail',
    intro: {
      title: "NOS SECTEURS D'ACTIVITÉ",
      topic: 'Retail',
      description:
        "Dans les réseaux de magasins, la performance repose sur des infrastructures toujours opérationnelles. Staamina permet de centraliser, piloter et fiabiliser la maintenance de l'ensemble des équipements en point de vente.",
      ctaLabel: 'Découvrir',
    },
    detail: {
      title: 'Retail',
      description:
        "UNE PLATEFORME UNIQUE POUR PILOTER LA MAINTENANCE DES INFRASTRUCTURES, QUEL QUE SOIT LE SECTEUR D'ACTIVITÉ.",
      specifications: [
        { label: 'Magasin de centre-ville', value: '✓' },
        { label: 'Boutique de centre commercial', value: '✓' },
        { label: 'Flagship', value: '✓' },
        { label: 'Corner / shop-in-shop', value: '✓' },
        { label: 'Outlet', value: '✓' },
        { label: 'Showroom', value: '✓' },
        { label: 'Pop-up store', value: '✓' },
      ],
      actions: [
        {
          label: 'En savoir plus',
          onClick: () => console.log('Retail clicked'),
        },
      ],
    },
  },
  {
    id: 2,
    image: 'http://localhost:4001/image1.png',
    alt: 'Restauration & Food Service',
    intro: {
      title: "NOS SECTEURS D'ACTIVITÉ",
      topic: 'Restauration & Food Service',
      description:
        "Dans la restauration, la moindre panne peut impacter le service et l'expérience client. Staamina aide les équipes à assurer la continuité des infrastructures critiques, de la salle à la cuisine.",
      ctaLabel: 'Découvrir',
    },
    detail: {
      title: 'Restauration & Food Service',
      description:
        "UNE PLATEFORME UNIQUE POUR PILOTER LA MAINTENANCE DES INFRASTRUCTURES, QUEL QUE SOIT LE SECTEUR D'ACTIVITÉ.",
      specifications: [
        { label: 'Restaurant (indépendant ou chaîne)', value: '✓' },
        { label: 'Fast-food / restauration rapide', value: '✓' },
        { label: 'Coffee shop', value: '✓' },
        { label: 'Brasserie', value: '✓' },
        { label: 'Dark kitchen', value: '✓' },
        { label: 'Food court', value: '✓' },
        { label: 'Bar', value: '✓' },
      ],
      actions: [
        {
          label: 'En savoir plus',
          onClick: () => console.log('Restauration clicked'),
        },
      ],
    },
  },
  {
    id: 3,
    image: 'http://localhost:4001/image1.png',
    alt: 'Fitness & Loisirs',
    intro: {
      title: "NOS SECTEURS D'ACTIVITÉ",
      topic: 'Fitness & Loisirs',
      description:
        "Dans les réseaux de magasins, la performance repose sur des infrastructures toujours opérationnelles. Staamina permet de centraliser, piloter et fiabiliser la maintenance de l'ensemble des équipements en point de vente.",
      ctaLabel: 'Découvrir',
    },
    detail: {
      title: 'Fitness & Loisirs',
      description:
        "UNE PLATEFORME UNIQUE POUR PILOTER LA MAINTENANCE DES INFRASTRUCTURES, QUEL QUE SOIT LE SECTEUR D'ACTIVITÉ.",
      specifications: [
        { label: 'Salle de sport / fitness', value: '✓' },
        { label: 'Club de sport', value: '✓' },
        { label: 'Studio de coaching', value: '✓' },
        { label: 'Centre de bien-être', value: '✓' },
        { label: 'Salle de yoga / pilates', value: '✓' },
        { label: 'Centre de loisirs', value: '✓' },
      ],
      actions: [
        {
          label: 'En savoir plus',
          onClick: () => console.log('Fitness clicked'),
        },
      ],
    },
  },
  {
    id: 4,
    image: 'http://localhost:4001/image1.png',
    alt: 'Agences & Services',
    intro: {
      title: "NOS SECTEURS D'ACTIVITÉ",
      topic: 'Agences & Services',
      description:
        "Dans les réseaux d'agences, la fiabilité des infrastructures conditionne la qualité du service client. Staamina offre une vision centralisée de la maintenance pour piloter efficacement tous les points de vente.",
      ctaLabel: 'Découvrir',
    },
    detail: {
      title: 'Agences & Services',
      description:
        "UNE PLATEFORME UNIQUE POUR PILOTER LA MAINTENANCE DES INFRASTRUCTURES, QUEL QUE SOIT LE SECTEUR D'ACTIVITÉ.",
      specifications: [
        { label: 'Agence bancaire', value: '✓' },
        { label: "Agence d'assurance", value: '✓' },
        { label: 'Agence immobilière', value: '✓' },
        { label: 'Agence de voyage', value: '✓' },
        {
          label: 'Agence de services (intérim, emploi, formation)',
          value: '✓',
        },
      ],
      actions: [
        {
          label: 'En savoir plus',
          onClick: () => console.log('Agences clicked'),
        },
      ],
    },
  },
  {
    id: 5,
    image: 'http://localhost:4001/image1.png',
    alt: 'Santé & Proximité',
    intro: {
      title: "NOS SECTEURS D'ACTIVITÉ",
      topic: 'Santé & Proximité',
      description:
        'Dans les établissements de santé et de proximité, chaque dysfonctionnement compte. Staamina sécurise le suivi et la maintenance des équipements essentiels au bon fonctionnement des sites.',
      ctaLabel: 'Découvrir',
    },
    detail: {
      title: 'Santé & Proximité',
      description:
        "UNE PLATEFORME UNIQUE POUR PILOTER LA MAINTENANCE DES INFRASTRUCTURES, QUEL QUE SOIT LE SECTEUR D'ACTIVITÉ.",
      specifications: [
        { label: 'Pharmacie', value: '✓' },
        { label: 'Parapharmacie', value: '✓' },
        { label: 'Centre médical', value: '✓' },
        { label: 'Cabinet de soins', value: '✓' },
        { label: "Centre d'optique / audioprothésiste", value: '✓' },
      ],
      actions: [
        {
          label: 'En savoir plus',
          onClick: () => console.log('Santé clicked'),
        },
      ],
    },
  },
  {
    id: 6,
    image: 'http://localhost:4001/image1.png',
    alt: 'Hospitality & Accueil',
    intro: {
      title: "NOS SECTEURS D'ACTIVITÉ",
      topic: 'Hospitality & Accueil',
      description:
        "Dans l'hôtellerie et les lieux d'accueil, la continuité des infrastructures est un enjeu clé de satisfaction client. Staamina centralise la maintenance pour garantir des sites toujours opérationnels.",
      ctaLabel: 'Découvrir',
    },
    detail: {
      title: 'Hospitality & Accueil',
      description:
        "UNE PLATEFORME UNIQUE POUR PILOTER LA MAINTENANCE DES INFRASTRUCTURES, QUEL QUE SOIT LE SECTEUR D'ACTIVITÉ.",
      specifications: [
        { label: 'Hôtel', value: '✓' },
        { label: 'Résidence hôtelière', value: '✓' },
        { label: "Hall d'accueil / réception", value: '✓' },
        { label: 'Centre de congrès', value: '✓' },
      ],
      actions: [
        {
          label: 'En savoir plus',
          onClick: () => console.log('Hospitality clicked'),
        },
      ],
    },
  },
];

const meta: Meta<typeof LandingCarousel> = {
  title: 'Organisms/LandingCarousel',
  component: LandingCarousel,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    autoPlay: {
      control: 'boolean',
      description: 'Enable automatic slide rotation',
    },
    autoPlayInterval: {
      control: 'number',
      description: 'Interval in milliseconds between auto-play slides',
    },
    showDetailView: {
      control: 'boolean',
      description: 'Show detail view by default instead of intro view',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof LandingCarousel>;

export const Default: Story = {
  args: {
    items: mockItems,
  },
};

export const WithAutoPlay: Story = {
  args: {
    items: mockItems,
    autoPlay: true,
    autoPlayInterval: 4000,
  },
};

export const FastAutoPlay: Story = {
  args: {
    items: mockItems,
    autoPlay: true,
    autoPlayInterval: 2000,
  },
};

export const WithDetailView: Story = {
  args: {
    items: mockItems,
    showDetailView: true,
  },
};

export const SingleItem: Story = {
  args: {
    items: [mockItems[0]],
  },
};

export const TwoItems: Story = {
  args: {
    items: mockItems.slice(0, 2),
  },
};

export const WithCustomClassName: Story = {
  args: {
    items: mockItems,
    className: 'custom-slider-class',
  },
};
