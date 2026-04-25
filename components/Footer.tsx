import Link from 'next/link'
import Image from 'next/image'

export default function Footer({ lang, dict }: { lang: string, dict: any }) {
    return (
        <footer className="bg-slate-950 text-slate-300 py-16 border-t border-slate-800">
            <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
                <div className="col-span-2 md:col-span-1">
                    <Link href={`/${lang}`} className="text-2xl font-bold mb-4 text-white block">
                        <Image src="/grow-more/images/logo-removebg.png" alt="grow more logo" width={150} height={150} />
                    </Link>
                    <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
                        {dict.home.subtitle}Empowering Indian farmers with advanced agricultural biotechnology to maximize yield and soil health.
                    </p>
                </div>

                <div>
                    <h4 className="font-semibold text-white mb-4">Navigation</h4>
                    <ul className="flex flex-col gap-2">
                        <li><Link href={`/${lang}`} className="text-sm hover:text-green-400 transition-colors">{dict.navigation.home}</Link></li>
                        <li><Link href={`/${lang}/products`} className="text-sm hover:text-green-400 transition-colors">{dict.navigation.products}</Link></li>
                        <li><Link href={`/${lang}/about`} className="text-sm hover:text-green-400 transition-colors">{dict.navigation.about}</Link></li>
                        <li><Link href={`/${lang}/distributor`} className="text-sm hover:text-green-400 transition-colors">{dict.navigation.distributors}</Link></li>
                        <li><Link href={`/${lang}/contact`} className="text-sm hover:text-green-400 transition-colors">{dict.navigation.contact}</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-semibold text-white mb-4">Contact</h4>
                    <p className="text-sm text-slate-400 leading-relaxed">
                        <strong>Email:</strong>growmoreagriscience@gmail.com<br />
                        <strong>Phone:</strong> +91 7247077028<br />
                        <strong>Address:</strong>18-B, MPIDC, Kalasura Road, Bijepur, M.P. 453001 INDIA
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 mt-12 pt-8 border-t border-slate-900 flex flex-col lg:flex-row justify-between items-center gap-6 lg:gap-0 text-sm text-slate-600">
                <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-center md:text-left">
                    <p>&copy; {new Date().getFullYear()} GrowMore. All rights reserved.</p>
                    <div className="flex items-center gap-2 bg-slate-900/80 px-4 py-1.5 rounded-full border border-slate-800 shadow-inner">
                        <span className="text-lg leading-none select-none" role="img" aria-label="India Flag">🇮🇳</span>
                        <span className="font-semibold text-slate-300 text-xs tracking-widest uppercase">Proudly Make In India</span>
                    </div>
                </div>
                <div className="flex gap-6">
                    <Link href="#" className="hover:text-green-400 transition-colors">Facebook</Link>
                    <Link href="#" className="hover:text-green-400 transition-colors">Twitter</Link>
                    <Link href="#" className="hover:text-green-400 transition-colors">Instagram</Link>
                </div>
            </div>
        </footer>
    )
}
