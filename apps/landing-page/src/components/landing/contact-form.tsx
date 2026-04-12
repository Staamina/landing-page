'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalFooter,
  ModalClose,
} from '@staamina/ui/modal';
import { Button } from '@staamina/ui/button';
import { Input } from '@staamina/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@staamina/ui/select';
import { Textarea } from '@staamina/ui/textarea';
import { cn } from '@staamina/ui/utils';
import { Loader2 } from 'lucide-react';

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  jobTitle: string;
  companyWebsite?: string;
  companyType?: string;
  annualRevenue?: string;
  industry?: string;
  message?: string;
}

interface ContactFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ContactForm({ open, onOpenChange }: ContactFormProps) {
  const t = useTranslations();
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    jobTitle: '',
    companyWebsite: '',
    companyType: '',
    annualRevenue: '',
    industry: '',
    message: '',
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof ContactFormData, string>>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof ContactFormData, string>> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = t('landing.contact.form.errors.required');
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = t('landing.contact.form.errors.required');
    }
    if (!formData.email.trim()) {
      newErrors.email = t('landing.contact.form.errors.required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('landing.contact.form.errors.invalidEmail');
    }
    if (!formData.phone.trim()) {
      newErrors.phone = t('landing.contact.form.errors.required');
    }
    if (!formData.jobTitle.trim()) {
      newErrors.jobTitle = t('landing.contact.form.errors.required');
    }
    if (
      formData.companyWebsite &&
      !/^https?:\/\/.+/.test(formData.companyWebsite)
    ) {
      newErrors.companyWebsite = t('landing.contact.form.errors.invalidUrl');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
      const response = await fetch(`${apiUrl}/api/v1/contact/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          jobTitle: formData.jobTitle.trim(),
          companyWebsite: formData.companyWebsite?.trim() || undefined,
          companyType: formData.companyType || undefined,
          annualRevenue: formData.annualRevenue || undefined,
          industry: formData.industry || undefined,
          message: formData.message?.trim() || undefined,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send contact form');
      }

      setSubmitStatus('success');
      setTimeout(() => {
        onOpenChange(false);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          jobTitle: '',
          companyWebsite: '',
          companyType: '',
          annualRevenue: '',
          industry: '',
          message: '',
        });
        setErrors({});
        setSubmitStatus('idle');
      }, 2000);
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof ContactFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      size="2xl"
      className="max-h-[90vh] overflow-y-auto p-4 sm:p-6"
    >
      <ModalHeader className="px-0 sm:px-0 pb-4 sm:pb-6">
        <ModalTitle className="text-xl sm:text-2xl font-bold text-default">
          {t('landing.contact.form.title')}
        </ModalTitle>
        <ModalDescription className="text-sm sm:text-base text-gray-400 mt-2">
          {t('landing.contact.form.description')}
        </ModalDescription>
      </ModalHeader>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 sm:space-y-8 px-0 sm:px-0"
      >
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-default mb-4 sm:mb-6">
            {t('landing.contact.form.sections.aboutYou')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-default mb-2">
                {t('landing.contact.form.fields.firstName')}
                <span className="text-red-500 ml-1">*</span>
              </label>
              <Input
                value={formData.firstName}
                onChange={(e) => handleChange('firstName', e.target.value)}
                className={cn('w-full', errors.firstName && 'border-red-500')}
                placeholder={t('landing.contact.form.placeholders.firstName')}
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">
                  {errors.firstName}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-default mb-2">
                {t('landing.contact.form.fields.lastName')}
                <span className="text-red-500 ml-1">*</span>
              </label>
              <Input
                value={formData.lastName}
                onChange={(e) => handleChange('lastName', e.target.value)}
                className={cn('w-full', errors.lastName && 'border-red-500')}
                placeholder={t('landing.contact.form.placeholders.lastName')}
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">
                  {errors.lastName}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-default mb-2">
                {t('landing.contact.form.fields.email')}
                <span className="text-red-500 ml-1">*</span>
              </label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className={cn('w-full', errors.email && 'border-red-500')}
                placeholder={t('landing.contact.form.placeholders.email')}
              />
              {errors.email && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-default mb-2">
                {t('landing.contact.form.fields.phone')}
                <span className="text-red-500 ml-1">*</span>
              </label>
              <Input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className={cn('w-full', errors.phone && 'border-red-500')}
                placeholder={t('landing.contact.form.placeholders.phone')}
              />
              {errors.phone && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">
                  {errors.phone}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-default mb-2">
                {t('landing.contact.form.fields.jobTitle')}
                <span className="text-red-500 ml-1">*</span>
              </label>
              <Input
                value={formData.jobTitle}
                onChange={(e) => handleChange('jobTitle', e.target.value)}
                className={cn('w-full', errors.jobTitle && 'border-red-500')}
                placeholder={t('landing.contact.form.placeholders.jobTitle')}
              />
              {errors.jobTitle && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">
                  {errors.jobTitle}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-default mb-2">
                {t('landing.contact.form.fields.companyWebsite')}
              </label>
              <Input
                type="url"
                value={formData.companyWebsite}
                onChange={(e) => handleChange('companyWebsite', e.target.value)}
                className={cn(
                  'w-full',
                  errors.companyWebsite && 'border-red-500'
                )}
                placeholder={t(
                  'landing.contact.form.placeholders.companyWebsite'
                )}
              />
              {errors.companyWebsite && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">
                  {errors.companyWebsite}
                </p>
              )}
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-semibold text-default mb-4 sm:mb-6">
            {t('landing.contact.form.sections.aboutCompany')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-default mb-2">
                {t('landing.contact.form.fields.companyType')}
              </label>
              <Select
                value={formData.companyType}
                onValueChange={(value) => handleChange('companyType', value)}
              >
                <SelectTrigger
                  className={cn(
                    'w-full',
                    errors.companyType && 'border-red-500'
                  )}
                >
                  <SelectValue
                    placeholder={t(
                      'landing.contact.form.placeholders.companyType'
                    )}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="startup">
                    {t('landing.contact.form.options.companyType.startup')}
                  </SelectItem>
                  <SelectItem value="sme">
                    {t('landing.contact.form.options.companyType.sme')}
                  </SelectItem>
                  <SelectItem value="enterprise">
                    {t('landing.contact.form.options.companyType.enterprise')}
                  </SelectItem>
                  <SelectItem value="other">
                    {t('landing.contact.form.options.companyType.other')}
                  </SelectItem>
                </SelectContent>
              </Select>
              {errors.companyType && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">
                  {errors.companyType}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-default mb-2">
                {t('landing.contact.form.fields.annualRevenue')}
              </label>
              <Select
                value={formData.annualRevenue}
                onValueChange={(value) => handleChange('annualRevenue', value)}
              >
                <SelectTrigger
                  className={cn(
                    'w-full',
                    errors.annualRevenue && 'border-red-500'
                  )}
                >
                  <SelectValue
                    placeholder={t(
                      'landing.contact.form.placeholders.annualRevenue'
                    )}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-100k">
                    {t('landing.contact.form.options.annualRevenue.0-100k')}
                  </SelectItem>
                  <SelectItem value="100k-500k">
                    {t('landing.contact.form.options.annualRevenue.100k-500k')}
                  </SelectItem>
                  <SelectItem value="500k-1m">
                    {t('landing.contact.form.options.annualRevenue.500k-1m')}
                  </SelectItem>
                  <SelectItem value="1m-5m">
                    {t('landing.contact.form.options.annualRevenue.1m-5m')}
                  </SelectItem>
                  <SelectItem value="5m+">
                    {t('landing.contact.form.options.annualRevenue.5m+')}
                  </SelectItem>
                </SelectContent>
              </Select>
              {errors.annualRevenue && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">
                  {errors.annualRevenue}
                </p>
              )}
            </div>

            <div className="md:col-span-2 space-y-2">
              <label className="block text-sm font-medium text-default mb-2">
                {t('landing.contact.form.fields.industry')}
              </label>
              <Select
                value={formData.industry}
                onValueChange={(value) => handleChange('industry', value)}
              >
                <SelectTrigger
                  className={cn('w-full', errors.industry && 'border-red-500')}
                >
                  <SelectValue
                    placeholder={t(
                      'landing.contact.form.placeholders.industry'
                    )}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="retail">
                    {t('landing.contact.form.options.industry.retail')}
                  </SelectItem>
                  <SelectItem value="hospitality">
                    {t('landing.contact.form.options.industry.hospitality')}
                  </SelectItem>
                  <SelectItem value="healthcare">
                    {t('landing.contact.form.options.industry.healthcare')}
                  </SelectItem>
                  <SelectItem value="manufacturing">
                    {t('landing.contact.form.options.industry.manufacturing')}
                  </SelectItem>
                  <SelectItem value="real-estate">
                    {t('landing.contact.form.options.industry.realEstate')}
                  </SelectItem>
                  <SelectItem value="other">
                    {t('landing.contact.form.options.industry.other')}
                  </SelectItem>
                </SelectContent>
              </Select>
              {errors.industry && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">
                  {errors.industry}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-default mb-2">
            {t('landing.contact.form.fields.message')}
          </label>
          <Textarea
            value={formData.message}
            onChange={(e) => handleChange('message', e.target.value)}
            rows={4}
            className={cn('w-full', errors.message && 'border-red-500')}
            placeholder={t('landing.contact.form.placeholders.message')}
          />
          {errors.message && (
            <p className="text-red-500 text-xs sm:text-sm mt-1">
              {errors.message}
            </p>
          )}
        </div>

        {submitStatus === 'success' && (
          <div className="bg-green-500/10 border border-green-500/50 text-green-500 p-3 sm:p-4 rounded-md text-sm sm:text-base">
            {t('landing.contact.form.success')}
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 sm:p-4 rounded-md text-sm sm:text-base">
            {t('landing.contact.form.error')}
          </div>
        )}

        <ModalFooter className="px-0 sm:px-0 pt-4 sm:pt-6 flex-col sm:flex-row gap-3 sm:gap-4">
          <ModalClose asChild>
            <Button
              type="button"
              intent="tertiary"
              appearance="outline"
              className="w-full sm:w-auto"
            >
              {t('common.cancel')}
            </Button>
          </ModalClose>
          <Button
            type="submit"
            intent="primary"
            appearance="solid"
            disabled={isSubmitting}
            className="w-full sm:w-auto"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t('landing.contact.form.submitting')}
              </>
            ) : (
              t('landing.contact.form.submit')
            )}
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
}
