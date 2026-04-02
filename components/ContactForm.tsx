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
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>(
    'idle'
  )

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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-3.5"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs uppercase tracking-widest text-white text-opacity-35">
            {t.form.name}
          </label>
          <input
            {...register('name')}
            type="text"
            placeholder="Tu nombre"
            className="bg-white bg-opacity-5 border border-white border-opacity-10 px-4 py-3 text-white text-sm outline-none focus:border-rose transition-colors"
          />
          {errors.name && (
            <p className="text-xs text-rose">{errors.name.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs uppercase tracking-widest text-white text-opacity-35">
            {t.form.establishment}
          </label>
          <input
            {...register('establishment')}
            type="text"
            placeholder="Farmacia / Clínica / Spa"
            className="bg-white bg-opacity-5 border border-white border-opacity-10 px-4 py-3 text-white text-sm outline-none focus:border-rose transition-colors"
          />
          {errors.establishment && (
            <p className="text-xs text-rose">{errors.establishment.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs uppercase tracking-widest text-white text-opacity-35">
            {t.form.email}
          </label>
          <input
            {...register('email')}
            type="email"
            placeholder="tu@email.com"
            className="bg-white bg-opacity-5 border border-white border-opacity-10 px-4 py-3 text-white text-sm outline-none focus:border-rose transition-colors"
          />
          {errors.email && (
            <p className="text-xs text-rose">{errors.email.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs uppercase tracking-widest text-white text-opacity-35">
            {t.form.country}
          </label>
          <select
            {...register('country')}
            className="bg-white bg-opacity-5 border border-white border-opacity-10 px-4 py-3 text-white text-sm outline-none focus:border-rose transition-colors"
          >
            <option value="" style={{ color: '#1A0A12' }}>
              Select country
            </option>
            <option value="DO" style={{ color: '#1A0A12' }}>
              República Dominicana
            </option>
            <option value="TC" style={{ color: '#1A0A12' }}>
              Turks & Caicos
            </option>
            <option value="PR" style={{ color: '#1A0A12' }}>
              Puerto Rico
            </option>
            <option value="TT" style={{ color: '#1A0A12' }}>
              Trinidad y Tobago
            </option>
            <option value="JM" style={{ color: '#1A0A12' }}>
              Jamaica
            </option>
            <option value="BB" style={{ color: '#1A0A12' }}>
              Barbados
            </option>
            <option value="ES" style={{ color: '#1A0A12' }}>
              España
            </option>
          </select>
          {errors.country && (
            <p className="text-xs text-rose">{errors.country.message}</p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs uppercase tracking-widest text-white text-opacity-35">
          {t.form.message}
        </label>
        <textarea
          {...register('message')}
          rows={3}
          placeholder="Cuéntanos sobre tu establecimiento..."
          className="bg-white bg-opacity-5 border border-white border-opacity-10 px-4 py-3 text-white text-sm outline-none focus:border-rose transition-colors resize-none"
        />
        {errors.message && (
          <p className="text-xs text-rose">{errors.message.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting || submitStatus !== 'idle'}
        className={`px-4 py-4 text-white text-xs uppercase tracking-widest font-medium transition-all ${
          submitStatus === 'success'
            ? 'bg-green-600'
            : submitStatus === 'error'
              ? 'bg-rose'
              : 'bg-rose hover:bg-opacity-80'
        } disabled:opacity-50`}
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
