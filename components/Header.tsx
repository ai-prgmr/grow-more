import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetClose } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import LanguageSwitcher from './LanguageSwitcher'
import Image from 'next/image'

export default function Header({ lang, dict }: { lang: string, dict: any }) {
    const navigation = [
        { name: dict.navigation.home, href: `/${lang}` },
        { name: dict.navigation.products, href: `/${lang}/products` },
        { name: dict.navigation.about, href: `/${lang}/about` },
        { name: dict.navigation.distributors, href: `/${lang}/distributor` },
        { name: dict.navigation.contact, href: `/${lang}/contact` },
    ]

    return (
        <header className="border-b bg-[#f7fffa] backdrop-blur-md sticky top-0 z-50">
            <div className="container mx-auto h-20 flex items-center justify-between">
                <Link href={`/${lang}`} className="text-2xl font-bold text-green-700 tracking-light">
                    <Image src="/grow-more/images/logo-removebg.png" alt="grow more logo" width={200} height={200} />
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="text-sm font-medium hover:text-green-700 transition-colors"
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-2 sm:gap-4">
                    <LanguageSwitcher lang={lang} />

                    {/* Mobile Menu */}
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden">
                                <Menu className="h-6 w-6" />
                                <span className="sr-only">Open menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="bg-green-100 border-green-200">
                            <SheetTitle className="text-center mb-4">&nbsp;</SheetTitle>
                            <div className="flex flex-col gap-4 mt-8">
                                {navigation.map((item) => (
                                    <SheetClose asChild key={item.name}>
                                        <Link
                                            href={item.href}
                                            className="text-lg text-center font-medium hover:text-green-700 transition-colors"
                                        >
                                            {item.name}
                                        </Link>
                                    </SheetClose>
                                ))}
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    )
}
