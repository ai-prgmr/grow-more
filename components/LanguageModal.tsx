'use client'

import { useState, useEffect } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useRouter, usePathname } from 'next/navigation'

interface LanguageModalProps {
    dict: {
        modal: {
            title: string
            desc: string
            confirm: string
            cancel: string
        }
    }
}

export function LanguageModal({ dict }: LanguageModalProps) {
    const [open, setOpen] = useState(false)
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        // Check localStorage on mount
        const storedLang = localStorage.getItem('language-preference')
        // Check if we already have a preference. If not, open modal.
        if (!storedLang) {
            setOpen(true)
        }
    }, [])

    const handleConfirm = () => {
        // The "Confirm" action in the dictionary implies switching to Hindi (based on en.json text "Switch to Hindi")
        // In hi.json it is "हिंदी में बदलें" (Change to Hindi).
        // So this button enforces Hindi.
        localStorage.setItem('language-preference', 'hi')
        setOpen(false)
        if (!pathname.startsWith('/hi')) {
            // Replace /en with /hi or prepend /hi if missing (though middleware handles missing)
            // Simplest replacer for /en/ -> /hi/
            const newPath = pathname.replace(/^\/en/, '/hi')
            router.push(newPath)
            router.refresh()
        }
    }

    const handleCancel = () => {
        // "Cancel" implies "Keep English" based on en.json.
        localStorage.setItem('language-preference', 'en')
        setOpen(false)
        if (pathname.startsWith('/hi')) {
            const newPath = pathname.replace(/^\/hi/, '/en')
            router.push(newPath)
            router.refresh()
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{dict.modal.title}</DialogTitle>
                    <DialogDescription>
                        {dict.modal.desc}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex flex-col sm:flex-row gap-2">
                    {/* Outline button for Cancel/English, Solid for Confirm/Hindi */}
                    <Button variant="outline" onClick={handleCancel}>{dict.modal.cancel}</Button>
                    <Button onClick={handleConfirm}>{dict.modal.confirm}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
