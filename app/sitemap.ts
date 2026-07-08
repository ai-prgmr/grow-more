import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://growmoreagriscience.com' // Canonical domain

    const routes = [
        '',
        '/about',
        '/contact',
        '/products',
    ]

    const languages = ['en', 'hi']

    const entries: MetadataRoute.Sitemap = []

    languages.forEach((lang) => {
        routes.forEach((route) => {
            entries.push({
                url: `${baseUrl}/${lang}${route}`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: route === '' ? 1.0 : 0.8,
            })
        })
    })

    return entries
}
