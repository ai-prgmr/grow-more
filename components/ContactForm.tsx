'use client'

import React, { useState } from 'react'
import { Button } from './ui/button'
import { Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'

interface ContactFormProps {
    dict: any
    lang: string
}

export default function ContactForm({ dict, lang }: ContactFormProps) {
    const formLabels = dict.contact.form

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        message: ''
    })

    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
    const [errorMessage, setErrorMessage] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.id]: e.target.value
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setStatus('loading')
        setErrorMessage('')

        // Payload with localized/submission details and hidden flag
        const payload = {
            ...formData,
            lead: 'Online',
            language: lang === 'hi' ? 'Hindi' : 'English',
            submittedAt: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
        }

        const endpoint = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_URL || 'https://script.google.com/macros/s/AKfycbzMt7xK7Nwz-0UoOnd2MihWpheTpfPOrV-6CdQcbWUsE9X3YmNkr1rX4P155W2TidAntQ/exec';

        try {
            await fetch(endpoint, {
                method: 'POST',
                mode: 'no-cors', // Avoids CORS preflight failures on standard Apps Script redirects
                headers: {
                    'Content-Type': 'text/plain;charset=utf-8',
                },
                body: JSON.stringify(payload)
            })

            setStatus('success')
            setFormData({
                name: '',
                phone: '',
                email: '',
                message: ''
            })
        } catch (error: any) {
            console.error('Submission error:', error)
            setStatus('error')
            setErrorMessage(lang === 'hi' ? 'कुछ गलत हो गया। कृपया पुनः प्रयास करें।' : 'Something went wrong. Please try again.')
        }
    }

    if (status === 'success') {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center space-y-4 bg-white rounded-3xl shadow-xl border border-slate-100 p-8 animate-in fade-in zoom-in duration-300">
                <CheckCircle2 className="h-16 w-16 text-green-600" />
                <h3 className="text-2xl font-bold text-slate-900">
                    {lang === 'hi' ? 'सफलतापूर्वक भेजा गया!' : 'Message Sent!'}
                </h3>
                <p className="text-slate-600 max-w-sm">
                    {formLabels.success_msg}
                </p>
                <Button
                    onClick={() => setStatus('idle')}
                    className="mt-6 bg-green-700 hover:bg-green-800 text-white px-6 rounded-xl"
                >
                    {lang === 'hi' ? 'नया संदेश भेजें' : 'Send Another'}
                </Button>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-10">
            <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                <Send className="h-6 w-6 text-green-600" />
                {formLabels.title}
            </h3>

            {status === 'error' && (
                <div className="bg-red-50 text-red-800 p-4 rounded-xl flex items-center gap-3 border border-red-200">
                    <AlertCircle className="h-5 w-5 text-red-600 shrink-0" />
                    <p className="text-sm font-medium">{errorMessage}</p>
                </div>
            )}

            <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-semibold text-slate-700 block">
                    {formLabels.name_label}
                </label>
                <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={formLabels.name_placeholder}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-semibold text-slate-700 block">
                    {formLabels.phone_label}
                </label>
                <input
                    id="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder={formLabels.phone_placeholder}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-semibold text-slate-700 block">
                    {formLabels.email_label}
                </label>
                <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={formLabels.email_placeholder}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-semibold text-slate-700 block">
                    {formLabels.message_label}
                </label>
                <textarea
                    id="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={formLabels.message_placeholder}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none"
                />
            </div>

            <Button
                type="submit"
                size="lg"
                disabled={status === 'loading'}
                className="w-full bg-green-700 hover:bg-green-800 text-white shadow-lg shadow-green-700/20 py-6 text-lg rounded-xl mt-4 flex items-center justify-center gap-2"
            >
                {status === 'loading' ? (
                    <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        {lang === 'hi' ? 'भेजा जा रहा है...' : 'Sending...'}
                    </>
                ) : (
                    formLabels.submit_btn
                )}
            </Button>
        </form>
    )
}
