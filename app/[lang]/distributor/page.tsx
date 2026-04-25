import { getDictionary } from "@/lib/dictionary"
import { MapPin, PhoneCall, MessageCircle, Send, Users, Building, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Metadata } from "next"
import Image from "next/image"
import Script from "next/script"

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params
    const dict = await getDictionary(lang as "en" | "hi")
    return {
        title: dict.distributors_page.metadata.title,
        description: dict.distributors_page.metadata.description,
    }
}

export default async function DistributorPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params
    const dict = await getDictionary(lang as "en" | "hi")
    const { distributors_page } = dict

    const faqData = distributors_page.faq || { title: "FAQ", subtitle: "", questions: [] }

    const faqJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': faqData.questions.map((q: any) => ({
            '@type': 'Question',
            'name': q.q,
            'acceptedAnswer': {
                '@type': 'Answer',
                'text': q.a
            }
        }))
    }

    return (
        <div className="flex flex-col w-full min-h-screen bg-slate-50">
            <Script
                id="distributor-faq-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
            />
            {/* Hero Section */}
            <section className="relative py-24 md:py-40 flex items-center justify-center overflow-hidden min-h-[60vh]">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/grow-more/images/distributor-image.png"
                        alt="GrowMore Distributor Network"
                        fill
                        className="object-cover object-center"
                        priority
                    />
                    {/* Dark gradient overlays for text readability and premium look */}
                    <div className="absolute inset-0 bg-green-100/60 mix-blend-multiply" />
                    {/* <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-transparent opacity-90" /> */}
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center mt-8">
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 tracking-tight drop-shadow-lg">
                        {distributors_page.hero.title}
                    </h1>
                    <p className="text-xl md:text-2xl text-green-50 max-w-3xl mx-auto font-medium leading-relaxed drop-shadow-md">
                        {distributors_page.hero.subtitle}
                    </p>
                </div>
            </section>

            {/* Locations Section */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16 max-w-4xl mx-auto">
                        <Users className="h-16 w-16 text-green-600 mx-auto mb-6" />
                        <h2 className="text-4xl font-bold text-slate-900 mb-6">{distributors_page.locations.title}</h2>
                        <p className="text-lg text-slate-600 leading-relaxed">
                            {distributors_page.locations.subtitle}
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12 items-start">
                        {/* Map View */}
                        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden flex flex-col h-[500px] lg:h-[600px] transform transition-transform hover:scale-[1.01] duration-300">
                            <div className="p-6 border-b border-slate-100 bg-green-50/50">
                                <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                                    <MapPin className="text-green-600 h-6 w-6" />
                                    {distributors_page.locations.title}
                                </h3>
                            </div>
                            <div className="w-full grow bg-slate-200">
                                <iframe
                                    src={distributors_page.locations.mapUri}
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Distributor Locations"
                                    className="grayscale-[0.2] contrast-125"
                                />
                            </div>
                        </div>

                        {/* List of Distributors */}
                        <div className="space-y-6">
                            {distributors_page.locations.list.map((distributor: any, index: number) => (
                                <div key={index} className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all border border-slate-100 group">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h4 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-green-700 transition-colors">
                                                {distributor.name}
                                            </h4>
                                            <div className="flex items-center gap-2 text-slate-600 mb-2">
                                                <Building className="h-4 w-4 text-green-500" />
                                                <span>{distributor.city}</span>
                                            </div>
                                            <div className="flex items-start gap-2 text-slate-500 text-sm">
                                                <MapPin className="h-4 w-4 mt-1 text-slate-400 shrink-0" />
                                                <span>{distributor.address}</span>
                                            </div>
                                        </div>
                                        <div className="bg-green-100 p-3 rounded-full text-green-700 shrink-0">
                                            <PhoneCall className="h-5 w-5" />
                                        </div>
                                    </div>
                                    <div className="mt-6 pt-4 border-t border-slate-100">
                                        <div className="font-semibold text-slate-900 flex items-center gap-2">
                                            <span>{distributor.phone}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Become a Distributor Section */}
            <section className="py-20 md:py-32 bg-white relative overflow-hidden">
                <div className="absolute inset-0 bg-green-900/5 mix-blend-multiply" />
                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center mb-16 max-w-3xl mx-auto">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
                            {distributors_page.join.title}
                        </h2>
                        <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-light">
                            {distributors_page.join.subtitle}
                        </p>
                    </div>

                    <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 grid md:grid-cols-2">
                        {/* Option 1: Form */}
                        <div className="p-8 md:p-12 lg:p-16 border-b md:border-b-0 md:border-r border-slate-100">
                            <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                                <Send className="h-6 w-6 text-green-600" />
                                {distributors_page.join.form.title}
                            </h3>
                            <form className="space-y-6">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-semibold text-slate-700 block">
                                        {distributors_page.join.form.name_label}
                                    </label>
                                    <input
                                        id="name"
                                        type="text"
                                        required
                                        placeholder={distributors_page.join.form.name_placeholder}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="company_name" className="text-sm font-semibold text-slate-700 block">
                                        {distributors_page.join.form.company_label}
                                    </label>
                                    <input
                                        id="company_name"
                                        type="text"
                                        required
                                        placeholder={distributors_page.join.form.company_placeholder}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="phone" className="text-sm font-semibold text-slate-700 block">
                                        {distributors_page.join.form.phone_label}
                                    </label>
                                    <input
                                        id="phone"
                                        type="tel"
                                        required
                                        placeholder={distributors_page.join.form.phone_placeholder}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="city" className="text-sm font-semibold text-slate-700 block">
                                        {distributors_page.join.form.city_label}
                                    </label>
                                    <input
                                        id="city"
                                        type="text"
                                        required
                                        placeholder={distributors_page.join.form.city_placeholder}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="city" className="text-sm font-semibold text-slate-700 block">
                                        {distributors_page.join.form.district_label}
                                    </label>
                                    <input
                                        id="city"
                                        type="text"
                                        required
                                        placeholder={distributors_page.join.form.district_placeholder}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                                    />
                                </div>
                                <Button type="button" size="lg" className="w-full bg-green-700 hover:bg-green-800 text-white shadow-lg shadow-green-700/20 py-6 text-lg rounded-xl mt-4">
                                    {distributors_page.join.form.submit_btn}
                                </Button>
                            </form>
                        </div>

                        {/* Option 2: WhatsApp */}
                        <div className="p-8 md:p-12 lg:p-16 flex flex-col items-center justify-center bg-slate-50 text-center">
                            <div className="bg-[#25D366]/10 p-6 rounded-full mb-8">
                                <MessageCircle className="h-16 w-16 text-[#25D366]" />
                            </div>
                            <h3 className="text-3xl font-bold text-slate-900 mb-4">
                                {distributors_page.join.whatsapp.title}
                            </h3>
                            <p className="text-slate-600 mb-10 max-w-sm leading-relaxed">
                                {distributors_page.join.subtitle.split('.')[1] || "Skip the form and message us directly for an instant response."}
                            </p>
                            <Button asChild size="lg" className="w-full max-w-xs bg-[#25D366] hover:bg-[#20bd5a] text-white py-8 text-xl rounded-2xl shadow-xl shadow-[#25D366]/20 font-bold transition-all hover:scale-105">
                                <Link
                                    href={`https://wa.me/${distributors_page.join.whatsapp.phone}?text=${encodeURIComponent(distributors_page.join.whatsapp.message)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <MessageCircle className="mr-3 h-8 w-8" />
                                    {distributors_page.join.whatsapp.btn_text}
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* AEO Optimized FAQ Section */}
            {faqData.questions.length > 0 && (
                <section className="py-20 bg-slate-50 border-t border-slate-200">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <div className="text-center mb-16">
                            <HelpCircle className="h-12 w-12 text-green-600 mx-auto mb-4 opacity-80" />
                            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">{faqData.title}</h2>
                            <p className="text-slate-600 text-lg">{faqData.subtitle}</p>
                        </div>

                        <div className="space-y-6">
                            {faqData.questions.map((item: any, index: number) => (
                                <div key={index} className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                                    <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-start gap-3">
                                        <span className="text-green-600 font-black">Q.</span>
                                        {item.q}
                                    </h3>
                                    <p className="text-slate-600 leading-relaxed text-lg pl-8 border-l-2 border-green-100">
                                        <span className="text-green-600 font-bold mr-2 hidden">A.</span>
                                        {item.a}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    )
}
