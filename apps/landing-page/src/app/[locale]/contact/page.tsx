import { getTranslations } from 'next-intl/server';

import { ContactFormPage } from '@/components/landing/contact-form-page';
import { LandingPageFooter } from '@/components/landing/landing-page-footer';
import { LandingPageHeader } from '@/components/landing/landing-page-header';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return {
    title: t('landing.contact.form.title'),
    description: t('landing.contact.form.description'),
    openGraph: {
      title: t('landing.contact.form.title'),
      description: t('landing.contact.form.description'),
      type: 'website',
      locale: locale,
    },
    alternates: {
      canonical: `/${locale}/contact`,
      languages: {
        en: '/en/contact',
        fr: '/fr/contact',
      },
    },
  };
}

export default async function ContactPage() {
  return (
    <>
      <LandingPageHeader />
      <ContactFormPage />
      <LandingPageFooter />
    </>
  );
}
