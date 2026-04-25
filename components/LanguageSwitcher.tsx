'use client'

import { useRouter, usePathname } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Languages } from 'lucide-react'

export default function LanguageSwitcher({ lang }: { lang: string }) {
    const router = useRouter()
    const pathname = usePathname()

    const toggleLanguage = () => {
        const newLang = lang === 'en' ? 'hi' : 'en'
        localStorage.setItem('language-preference', newLang)
        // Ensure we handle the path correctly.
        // If pathname starts with /en or /hi, replace it.
        // If for some reason it doesn't (shouldn't happen with middleware), prepend.
        let newPath = pathname
        if (pathname.startsWith(`/${lang}`)) {
            newPath = pathname.replace(`/${lang}`, `/${newLang}`)
        } else {
            // Fallback or complex case, just go to root of new lang
            newPath = `/${newLang}`
        }
        router.push(newPath)
    }

    return (
        <Button
            variant="outline"
            onClick={toggleLanguage}
            className="gap-2 border-green-200 hover:bg-green-50 text-green-800 hover:text-green-900 transition-colors"
        >
            <Languages className="h-4 w-4" />
            <span className="font-medium">{lang === 'en' ? 'हिंदी' : 'English'}</span>
        </Button>
    )
}
