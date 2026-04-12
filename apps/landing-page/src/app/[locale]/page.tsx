import { getTranslations } from 'next-intl/server';

import { LandingPage } from '@/components/landing/landing-page';
import { LandingPageFooter } from '@/components/landing/landing-page-footer';
import { LandingPageHeader } from '@/components/landing/landing-page-header';
import { getLandingPageContent } from '@/config/landing-page-content';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const content = getLandingPageContent((key: string) => t(key));

  return {
    title: content.seo.title,
    description: content.seo.description,
    keywords: content.seo.keywords.join(', '),
    openGraph: {
      title: content.seo.title,
      description: content.seo.description,
      type: 'website',
      locale: locale,
    },
    twitter: {
      card: 'summary_large_image',
      title: content.seo.title,
      description: content.seo.description,
    },
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: '/en',
        fr: '/fr',
      },
    },
  };
}

export default async function Home() {
  return (
    <>
      <LandingPageHeader />
      <LandingPage />
      <LandingPageFooter />
    </>
  );
}
