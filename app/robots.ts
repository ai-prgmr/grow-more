import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
    const baseUrl = 'https://www.growmore.in' // Update this with your actual domain

    return {
        rules: [
            {
                // General rule for all crawlers (including search engines)
                userAgent: '*',
                allow: '/',
                disallow: '/private/',
            },
            {
                // Explicitly allowing popular AI bots and agents to read your site
                // Note: '*' already allows them, but you can use these specific 
                // user agents if you want to apply different rules later
                userAgent: [
                    'GPTBot',          // OpenAI's web crawler
                    'ChatGPT-User',    // ChatGPT plugins/browsing
                    'Google-Extended', // Google's Gemini and Vertex AI
                    'anthropic-ai',    // Anthropic's Claude
                    'OAI-SearchBot',   // OpenAI Search
                    'PerplexityBot',   // Perplexity AI
                    'CCBot',           // Common Crawl (used by many LLMs)
                ],
                allow: '/',
            }
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
    }
}
