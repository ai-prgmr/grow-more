import { Button } from '@/components/ui/button'
import { getDictionary } from '@/lib/dictionary'
import { Metadata } from 'next'
import Image from 'next/image'
import Script from 'next/script'
import { HelpCircle } from 'lucide-react'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params
    const dict = await getDictionary(lang as "en" | "hi")
    return {
        title: dict.products.metadata.title,
        description: dict.products.metadata.description,
    }
}

export default async function ProductsPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params
    const dict = await getDictionary(lang as "en" | "hi")

    // Generate JSON-LD for products
    const allProducts = dict.products.categories.flatMap((cat: any) =>
        cat.items.map((item: any, index: number) => ({
            '@type': 'ListItem',
            'position': index + 1,
            'item': {
                '@type': 'Product',
                'name': item.name,
                'description': item.desc,
                'image': item.image,
                'brand': {
                    '@type': 'Brand',
                    'name': 'GrowMore'
                }
            }
        }))
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

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {category.items.map((item: any, index: number) => (
                                    <div
                                        key={item.id}
                                        // The magic happens here: We reverse the row direction if the index is odd
                                        className={`flex flex-col md:flex-row ${index % 2 !== 0 ? "md:flex-row-reverse" : ""
                                            } gap-8 md:gap-16 items-center group`}
                                    >
                                        {/* Image Column */}
                                        <div className="w-full md:w-1/2 h-72 md:h-96 relative overflow-hidden bg-white border border-slate-100 rounded-3xl shadow-sm group-hover:shadow-xl transition-all duration-500 p-8">
                                            {item.image ? (
                                                // object-contain is perfect here so the bottles aren't cropped
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    fill
                                                    className="object-contain p-6 group-hover:scale-105 transition-transform duration-500"
                                                />
                                            ) : (
                                                <div className="absolute inset-0 flex items-center justify-center text-slate-400 bg-slate-50 group-hover:scale-105 transition-transform duration-500">
                                                    <span className="text-6xl opacity-20">🌿</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Text Content Column */}
                                        <div className="w-full md:w-1/2 flex flex-col justify-center space-y-4">
                                            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 group-hover:text-green-700 transition-colors">
                                                {item.name}
                                            </h3>
                                            <p className="text-lg text-slate-600 leading-relaxed">
                                                {item.desc}
                                            </p>

                                            <div className="pt-6">
                                                {/* I updated the button to be a bit more prominent for this larger layout */}
                                                <Button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-6 rounded-xl text-md transition-colors shadow-md hover:shadow-lg">
                                                    Connect with Us
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
