import { getDictionary } from '@/lib/dictionary'
import HeroCarousel from '@/components/HeroCarousel'
import { Leaf, Droplets, ShieldCheck, PhoneCall, MessageCircle, ArrowRight, HelpCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Metadata } from 'next'
import Script from 'next/script'
import Image from 'next/image'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params
    const dict = await getDictionary(lang as "en" | "hi")
    return {
        title: dict.home.metadata.title,
        description: dict.home.metadata.description
    }
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params
    const dict = await getDictionary(lang as "en" | "hi")
    const { home, products } = dict

    const iconMap: Record<string, React.ReactNode> = {
        leaf: <Leaf className="h-10 w-10 text-green-600" />,
        droplet: <Droplets className="h-10 w-10 text-blue-600" />,
        shield: <ShieldCheck className="h-10 w-10 text-yellow-600" />
    }

    // Filter featured products
    const featuredProducts: any[] = []
    products.categories.forEach((cat: any) => {
        cat.items.forEach((item: any) => {
            if (item.featured) {
                // Add category info to item for context if needed, though for card we use item details
                featuredProducts.push({ ...item, category: cat.title })
            }
        })
    })

    const WA_NUMBER = "+917247077028"

    // Fallback for languages that might not have FAQ yet
    const faqData = home.faq || { title: "Frequently Asked Questions", subtitle: "Answers about our products.", questions: [] }

    // AEO (Answer Engine Optimization) Structured Data
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
        <div className="flex flex-col w-full">
            <Script
                id="faq-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
            />
            {/* 1. Hero Section */}
            <section className="w-full">
                <HeroCarousel slides={home.hero_slides} />
            </section>

            {/* 2. Core Benefits (Features) */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-3 gap-8">
                        {home.features.map((feature: any, index: number) => (
                            <div key={index} className="bg-[#fffcf8] rounded-2xl p-8 shadow-sm flex flex-col items-center text-center transition-transform hover:-translate-y-1 hover:shadow-md">
                                <div className="mb-6 p-4 bg-white rounded-full shadow-sm">
                                    {iconMap[feature.icon] || <Leaf className="h-10 w-10 text-green-600" />}
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. Featured Products */}
            <section className="py-20 bg-green-50/50">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between mb-12">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">{home.featured_title}</h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {featuredProducts.map((product: any, index: number) => (
                            <div key={index} className="bg-[#fffcf8] rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-lg transition-all group flex flex-col">
                                {/* Product Image Placeholder */}
                                <div className="aspect-4/3 relative overflow-hidden">
                                    {product.image ? (
                                        // object-contain is perfect here so the bottles aren't cropped
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            fill
                                            className="object-contain p-6 group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center text-slate-400 bg-slate-50 group-hover:scale-105 transition-transform duration-500">
                                            <span className="text-6xl opacity-20">🌿</span>
                                        </div>
                                    )}
                                </div>
                                <div className="p-5 flex flex-col grow">
                                    <div className="text-xs font-medium text-green-600 mb-2 uppercase tracking-wide">{product.category}</div>
                                    <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-green-700 transition-colors line-clamp-1">
                                        {product.name}
                                    </h3>
                                    <p className="text-slate-500 text-sm mb-4 line-clamp-2 grow">
                                        {product.desc}
                                    </p>
                                    <Button asChild size="sm" className="w-full bg-[#c4f5c4] hover:bg-green-700 text-white mt-auto">
                                        <Link href={`/${lang}/products`}>
                                            View Details
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 text-center">
                        <Button variant="link" asChild className="text-green-700 font-semibold gap-2 hidden md:inline-flex">
                            <Link href={`/${lang}/products`}>
                                View All Products <ArrowRight className="h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* 4. Distributor Banner */}
            <section className="w-full py-16 bg-green-900 text-white">
                <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
                    <div className="space-y-4 max-w-2xl">
                        <h2 className="text-3xl md:text-4xl font-bold">{home.distributor_banner.title}</h2>
                        <p className="text-green-100 text-lg md:text-xl font-medium">{home.distributor_banner.subtitle}</p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 min-w-[300px]">
                        <Button asChild size="lg" className="bg-white text-green-900 hover:bg-green-50 shadow-lg font-bold h-14 px-8 text-lg">
                            <Link href="/contact">
                                <PhoneCall className="mr-2 h-5 w-5" />
                                {home.distributor_banner.cta_call}
                            </Link>
                        </Button>
                        <Button asChild size="lg" className="bg-[#25D366] text-white hover:bg-[#20bd5a] shadow-lg font-bold h-14 px-8 text-lg">
                            <Link href={`https://wa.me/${WA_NUMBER}`} target="_blank">
                                <MessageCircle className="mr-2 h-5 w-5" />
                                {home.distributor_banner.cta_wa}
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* 5. AEO Optimized FAQ Section */}
            {faqData.questions.length > 0 && (
                <section className="py-20 bg-slate-50 border-t border-slate-100">
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
