'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { getTranslation, type Language } from '@/lib/i18n'

const inquirySchema = z.object({
  name: z.string().min(2, 'Name is required'),
  establishment: z.string().min(2, 'Establishment is required'),
  email: z.string().email('Invalid email'),
  country: z.string().min(1, 'Country is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type InquiryForm = z.infer<typeof inquirySchema>

interface ContactFormProps {
  lang: Language
}

export default function ContactForm({ lang }: ContactFormProps) {
  const t = getTranslation(lang)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InquiryForm>({
    resolver: zodResolver(inquirySchema),
  })

  const onSubmit = async (data: InquiryForm) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) throw new Error('Failed to submit')

      setSubmitStatus('success')
      reset()

      setTimeout(() => setSubmitStatus('idle'), 4000)
    } catch (error) {
      console.error(error)
      setSubmitStatus('error')

      setTimeout(() => setSubmitStatus('idle'), 4000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="contact-form">
      <div className="form-row">
        <div className="fg">
          <label>{t.form.name}</label>
          <input {...register('name')} type="text" placeholder="Tu nombre" />
          {errors.name && <p style={{ fontSize: '.72rem', color: 'var(--rose)' }}>{errors.name.message}</p>}
        </div>
        <div className="fg">
          <label>{t.form.establishment}</label>
          <input {...register('establishment')} type="text" placeholder="Farmacia / Clínica / Spa" />
          {errors.establishment && <p style={{ fontSize: '.72rem', color: 'var(--rose)' }}>{errors.establishment.message}</p>}
        </div>
      </div>

      <div className="form-row">
        <div className="fg">
          <label>{t.form.email}</label>
          <input {...register('email')} type="email" placeholder="tu@email.com" />
          {errors.email && <p style={{ fontSize: '.72rem', color: 'var(--rose)' }}>{errors.email.message}</p>}
        </div>
        <div className="fg">
          <label>{t.form.country}</label>
          <select {...register('country')}>
            <option value="">Select country</option>
            <option value="DO">República Dominicana</option>
            <option value="TC">Turks &amp; Caicos</option>
            <option value="PR">Puerto Rico</option>
            <option value="TT">Trinidad y Tobago</option>
            <option value="JM">Jamaica</option>
            <option value="BB">Barbados</option>
            <option value="ES">España</option>
          </select>
          {errors.country && <p style={{ fontSize: '.72rem', color: 'var(--rose)' }}>{errors.country.message}</p>}
        </div>
      </div>

      <div className="fg">
        <label>{t.form.message}</label>
        <textarea {...register('message')} rows={3} placeholder="Cuéntanos sobre tu establecimiento..." />
        {errors.message && <p style={{ fontSize: '.72rem', color: 'var(--rose)' }}>{errors.message.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting || submitStatus !== 'idle'}
        className={`form-submit${submitStatus === 'success' ? ' success' : ''}`}
        style={submitStatus === 'error' ? { background: 'var(--rose)' } : undefined}
      >
        {submitStatus === 'success'
          ? t.form.success
          : submitStatus === 'error'
            ? 'Error. Try again.'
            : t.form.submit}
      </button>
    </form>
  )
}
