import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/app/globals.css'
import { cn } from '@/lib/utils'
import { getDictionary } from '@/lib/dictionary'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params
    const dict = await getDictionary(lang as "en" | "hi")
    const baseUrl = 'https://www.growmore.in'

    return {
        metadataBase: new URL(baseUrl),
        title: {
            default: dict.site.name,
            template: `%s | ${dict.site.name}`
        },
        description: dict.site.description,
        alternates: {
            canonical: `/${lang}`,
            languages: {
                'en': '/en',
                'hi': '/hi',
                'x-default': '/en',
            },
        },
        openGraph: {
            type: 'website',
            siteName: dict.site.name,
            locale: lang === 'hi' ? 'hi_IN' : 'en_US',
        },
        twitter: {
            card: 'summary_large_image',
            title: dict.site.name,
            description: dict.site.description,
        },
    }
}

export async function generateStaticParams() {
    return [{ lang: 'en' }, { lang: 'hi' }]
}

export default async function RootLayout({
    children,
    params,
}: {
    children: React.ReactNode
    params: Promise<{ lang: string }>
}) {
    const { lang } = await params
    const dict = await getDictionary(lang as "en" | "hi")
    const baseUrl = 'https://www.growmore.in'

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        'name': 'GrowMore',
        'url': baseUrl,
        'logo': `${baseUrl}/logo.png`,
        'contactPoint': {
            '@type': 'ContactPoint',
            'telephone': '+91-9999999999',
            'contactType': 'customer service',
            'areaServed': 'IN',
            'availableLanguage': ['English', 'Hindi']
        }
    }

    return (
        <html lang={lang} suppressHydrationWarning>
            <body className={cn("min-h-screen bg-background font-sans antialiased", inter.className)}>
                <Script
                    id="organization-schema"
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
                <div className="flex flex-col min-h-screen">
                    <Header lang={lang} dict={dict} />
                    <main className="grow">{children}</main>
                    <Footer lang={lang} dict={dict} />
                </div>
            </body>
        </html>
    )
}
