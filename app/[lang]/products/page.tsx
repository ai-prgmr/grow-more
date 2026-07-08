import { Button } from '@/components/ui/button'
import { getDictionary } from '@/lib/dictionary'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import { HelpCircle } from 'lucide-react'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params
    const dict = await getDictionary(lang as "en" | "hi")
    const baseUrl = 'https://growmoreagriscience.com'
    return {
        title: dict.products.metadata.title,
        description: dict.products.metadata.description,
        alternates: {
            canonical: `/${lang}/products`,
            languages: {
                'en': `/en/products`,
                'hi': `/hi/products`,
                'x-default': `/en/products`,
            },
        },
        openGraph: {
            title: dict.products.metadata.title,
            description: dict.products.metadata.description,
            url: `/${lang}/products`,
            images: [
                {
                    url: `/images/lush-green.jpg`,
                    width: 1200,
                    height: 630,
                    alt: dict.products.metadata.title,
                }
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: dict.products.metadata.title,
            description: dict.products.metadata.description,
            site: '@growmoreagri',
            images: [`/images/lush-green.jpg`],
        },
    }
}

export default async function ProductsPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params
    const dict = await getDictionary(lang as "en" | "hi")
    const baseUrl = 'https://growmoreagriscience.com'

    // Generate JSON-LD for products
    const allProducts = dict.products.categories.flatMap((cat: any) =>
        cat.items.map((item: any, index: number) => {
            const imageUrl = item.image 
                ? (item.image.startsWith('http') ? item.image : `${baseUrl}${item.image}`)
                : `${baseUrl}/images/logo-removedbg.png`

            return {
                '@type': 'ListItem',
                'position': index + 1,
                'item': {
                    '@type': 'Product',
                    'name': item.name,
                    'description': item.desc,
                    'image': imageUrl,
                    'url': `${baseUrl}/${lang}/products`,
                    'category': cat.title,
                    'brand': {
                        '@type': 'Brand',
                        'name': 'GrowMore Agri Science'
                    },
                    'offers': {
                        '@type': 'AggregateOffer',
                        'priceCurrency': 'INR',
                        'offers': [
                            {
                                '@type': 'Offer',
                                'availability': 'https://schema.org/InStock',
                                'priceSpecification': {
                                    '@type': 'PriceSpecification',
                                    'valueAddedTaxIncluded': true
                                }
                            }
                        ]
                    }
                }
            }
        })
    )

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        'itemListElement': allProducts
    }

    const faqData = dict.products.faq || { title: "FAQ", subtitle: "", questions: [] }

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
        <div className="bg-slate-50 min-h-screen">
            <Script
                id="products-list-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Script
                id="products-faq-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
            />

            {/* Hero Section */}
            <div className="relative w-full h-[300px] md:h-[400px] flex items-center justify-center mb-16">
                <Image
                    src="/grow-more/images/lush-green.jpg"
                    alt={dict.products.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/20 z-10" />
                <div className="relative z-20 text-center space-y-4 px-4 container mx-auto">
                    <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">{dict.products.title}</h1>
                    <p className="text-xl text-white/90 max-w-2xl mx-auto">{dict.products.subtitle}</p>
                </div>
            </div>

            <div className="container mx-auto px-4 pb-20">
                <div className="space-y-20">
                    {dict.products.categories.map((category: any) => (
                        <section key={category.id} id={category.id} className="scroll-mt-24">
                            <div className="mb-8 border-l-4 border-green-500 pl-4">
                                <h2 className="text-2xl font-bold text-slate-800 mb-2">{category.title}</h2>
                                <p className="text-slate-600">{category.description}</p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
                                {category.items.map((item: any) => (
                                    <div
                                        key={item.id}
                                        className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full"
                                    >
                                        {/* Image Section */}
                                        <div className="aspect-3/4 w-full relative overflow-hidden bg-slate-50/50 border-b border-slate-100/50 flex items-center justify-center p-6 group-hover:bg-slate-100/50 transition-colors duration-300">
                                            {item.image ? (
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    fill
                                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                                    className="object-contain p-6 group-hover:scale-108 transition-transform duration-500 ease-out"
                                                />
                                            ) : (
                                                <div className="absolute inset-0 flex items-center justify-center text-slate-300 bg-slate-50/30">
                                                    <span className="text-6xl group-hover:scale-110 transition-transform duration-500 ease-out opacity-20">🌿</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Text & Action Section */}
                                        <div className="p-6 flex flex-col grow">
                                            <h3 className="text-xl font-bold text-slate-800 group-hover:text-green-700 transition-colors duration-300 mb-2 line-clamp-2 min-h-14 flex items-center">
                                                {item.name}
                                            </h3>
                                            <p className="text-sm text-slate-500 leading-relaxed mb-6 grow">
                                                {item.desc}
                                            </p>

                                            <div className="pt-4 w-full h-full flex flex-row gap-2 justify-center items-center border-slate-100 mt-auto">
                                                <Image
                                                    src="/grow-more/images/Digital_Glyph_Green.svg"
                                                    alt="WhatsApp Icon"
                                                    width={20}
                                                    height={20}
                                                    className="text-white"
                                                />
                                                <Button asChild className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-xl transition-all shadow-sm hover:shadow-md">
                                                    <Link
                                                        href={`https://wa.me/917247077028?text=${encodeURIComponent(
                                                            lang === 'hi'
                                                                ? `नमस्ते, मैं ${item.name} में रुचि रखता हूँ। कृपया इसके बारे में अधिक जानकारी साझा करें।`
                                                                : `Hello, I am interested in ${item.name}. Please share more details.`
                                                        )}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        Connect with us
                                                    </Link>
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>
            </div>

            {/* AEO Optimized FAQ Section */}
            {faqData.questions.length > 0 && (
                <section className="py-20 bg-white border-t border-slate-100">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <div className="text-center mb-16">
                            <HelpCircle className="h-12 w-12 text-green-600 mx-auto mb-4 opacity-80" />
                            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">{faqData.title}</h2>
                            <p className="text-slate-600 text-lg">{faqData.subtitle}</p>
                        </div>

                        <div className="space-y-6">
                            {faqData.questions.map((item: any, index: number) => (
                                <div key={index} className="bg-slate-50 rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
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
