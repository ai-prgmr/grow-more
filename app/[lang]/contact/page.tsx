import { getDictionary } from "@/lib/dictionary"
import { PhoneCall, Sprout, Mail, MessageCircle, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Metadata } from "next"
import Script from "next/script"

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params
    const dict = await getDictionary(lang as "en" | "hi")
    return {
        title: dict.contact.metadata.title,
        description: dict.contact.metadata.description,
    }
}

const WA_NUMBER = "917974889472" // Placeholder number for now

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params
    const dict = await getDictionary(lang as "en" | "hi")
    const { contact } = dict

    // Icons corresponding to the 3 cards: Helpline (Phone), Sales (Sprout - keeping internal logic or Phone?), Email (Mail)
    // Previous logic was index % length. Let's make it explicit based on card index.
    const icons = [PhoneCall, Sprout, Mail]

    return (
        <div className="flex flex-col w-full">
            {/* Hero Section */}
            <section className="bg-green-50 py-12 text-center">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl md:text-5xl font-extrabold text-green-900 mb-4">{contact.hero.title}</h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">{contact.hero.subtitle}</p>
                </div>
            </section>

            {/* Contact Cards Grid */}
            <section className="py-12 md:py-16">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-3 gap-8">
                        {contact.cards.map((card: any, index: number) => {
                            const Icon = icons[index % icons.length]
                            return (
                                <div key={index} className="flex flex-col bg-white rounded-xl shadow-md border border-slate-100 p-6 transition-all hover:shadow-xl hover:-translate-y-1">
                                    <div className="bg-green-100 p-3 w-fit rounded-lg mb-4 text-green-700">
                                        <Icon className="h-6 w-6" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">{card.title}</h3>
                                    <p className="text-slate-600 mb-6 flex-grow">{card.desc}</p>

                                    <div className="space-y-4 mt-auto">
                                        <div className="font-medium text-slate-900">
                                            {/* card.phone for first two, card.info for email which is index 2 */}
                                            {index === 2 ? card.info : card.phone}
                                        </div>
                                        <Button asChild className="w-full bg-slate-900 hover:bg-slate-800 text-white">
                                            {/* Logic for tel vs mailto */}
                                            {index === 2 ? (
                                                <Link href={`mailto:${card.info}`}>{card.action}</Link>
                                            ) : (
                                                <Link href={`tel:${card.phone.replace(/[^0-9]/g, '')}`}>{card.action}</Link>
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Locations Section with Maps */}
            <section className="py-16 bg-slate-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-slate-900">{contact.locations.title}</h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Corporate Office */}
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col">
                            <div className="p-6 border-b border-slate-100">
                                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                    <MapPin className="text-green-600 h-5 w-5" />
                                    {contact.locations.corporate.title}
                                </h3>
                                <p className="text-slate-600 mt-2">{contact.locations.corporate.address}</p>
                            </div>
                            <div className="h-[300px] w-full bg-slate-200">
                                <iframe
                                    src={contact.locations.corporate.mapUri}
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Corporate Location"
                                />
                            </div>
                        </div>

                        {/* Factory Plant */}
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col">
                            <div className="p-6 border-b border-slate-100">
                                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                    <MapPin className="text-green-600 h-5 w-5" />
                                    {contact.locations.factory.title}
                                </h3>
                                <p className="text-slate-600 mt-2">{contact.locations.factory.address}</p>
                            </div>
                            <div className="h-[300px] w-full bg-slate-200">
                                <iframe
                                    src={contact.locations.factory.mapUri}
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Factory Location"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Distributor & WhatsApp Section */}
            <section className="bg-green-900 py-16 text-white text-center md:text-left">
                <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="max-w-xl space-y-4">
                        <h2 className="text-3xl md:text-4xl font-bold">{contact.distributor.title}</h2>
                        <p className="text-green-100 text-lg">{contact.distributor.subtitle}</p>
                        <div className="flex items-center gap-2 text-green-200">
                            <PhoneCall className="h-4 w-4" /> <span>{contact.distributor.phone}</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 w-full md:w-auto min-w-[300px]">
                        <Button asChild size="lg" className="bg-white text-green-900 hover:bg-green-50 hover:text-green-950 font-bold">
                            <Link href={`tel:${contact.distributor.phone.replace(/[^0-9]/g, '')}`}>
                                <PhoneCall className="mr-2 h-5 w-5" />
                                {contact.distributor.cta_text}
                            </Link>
                        </Button>

                        <Button asChild size="lg" className="bg-[#25D366] text-white hover:bg-[#20bd5a] font-bold">
                            <Link href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(contact.distributor.whatsapp_msg)}`} target="_blank">
                                <MessageCircle className="mr-2 h-5 w-5" />
                                {contact.distributor.whatsapp_btn}
                            </Link>
                        </Button>
                    </div>
                </div>
                <Script
                    id="local-business-schema"
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'LocalBusiness',
                            'name': 'GrowMore',
                            'image': 'https://www.growmore.in/og-image.jpg',
                            'telephone': '+91-9999999999',
                            'email': 'growmore@growmore.in',
                            'address': [
                                {
                                    '@type': 'PostalAddress',
                                    'streetAddress': contact.locations.corporate.address,
                                    'addressLocality': 'Indore',
                                    'addressRegion': 'MP',
                                    'postalCode': '452001',
                                    'addressCountry': 'IN'
                                },
                                {
                                    '@type': 'PostalAddress',
                                    'streetAddress': contact.locations.factory.address,
                                    'addressLocality': 'Betma',
                                    'addressRegion': 'MP',
                                    'addressCountry': 'IN'
                                }
                            ]
                        })
                    }}
                />
            </section>

        </div>
    )
}
