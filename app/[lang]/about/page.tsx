import { getDictionary } from "@/lib/dictionary"
import Image from "next/image"
import { Metadata } from "next"

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
    const { lang } = await params
    const dict = await getDictionary(lang as "en" | "hi")
    return {
        title: dict.about.metadata.title,
        description: dict.about.metadata.description,
    }
}

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
    const { lang } = await params
    const dict = await getDictionary(lang as "en" | "hi")
    const { about } = dict

    return (
        <div className="flex flex-col w-full">
            {/* Hero Section */}
            <section className="w-full bg-green-50 py-16 md:py-24">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid gap-10 lg:grid-cols-2 items-center">
                        <div className="space-y-4">
                            <h1 className="text-4xl font-extrabold tracking-tight text-green-900 lg:text-5xl">
                                {about.hero.title}
                            </h1>
                            <p className="text-xl text-green-700/80 max-w-[600px]">
                                {about.hero.subtitle}
                            </p>
                        </div>
                        {/* Placeholder for Hero Image - Could be a farm or team photo */}
                        <div className="rounded-xl overflow-hidden shadow-xl aspect-video bg-green-200 relative">
                            <Image src="/grow-more/images/lush-green.png" alt="Lush Green" fill className="object-cover" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Story Section */}
            <section className="py-16 bg-white px-4">
                <div className="container mx-auto max-w-4xl text-center space-y-6">
                    <h2 className="text-3xl font-bold text-slate-900">{about.story.title}</h2>
                    <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
                        {about.story.content}
                    </p>
                </div>
            </section>

            {/* Stats & Values Section */}
            <section className="bg-green-900 text-white py-16">
                <div className="container mx-auto px-4">
                    {/* Stats */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16 text-center">
                        {about.stats.map((stat: any, index: number) => (
                            <div key={index} className="space-y-2">
                                <div className="text-4xl font-black text-yellow-400">{stat.value}</div>
                                <div className="text-green-100 font-medium tracking-wide text-sm uppercase">{stat.label}</div>
                            </div>
                        ))}
                    </div>

                    <div className="h-px bg-green-800 w-full mb-16" />

                    {/* Values */}
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4">{about.values.title}</h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {about.values.items.map((item: any, index: number) => (
                            <div key={index} className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:bg-white/20 transition-colors">
                                <h3 className="text-xl font-bold text-yellow-400 mb-2">{item.title}</h3>
                                <p className="text-green-50">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-20 bg-slate-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16 space-y-4">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900">{about.team.title}</h2>
                        <p className="text-lg text-slate-600 font-medium max-w-2xl mx-auto">{about.team.subtitle}</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
                        {about.team.members.map((member: any, index: number) => (
                            <div key={index} className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                                <div className="aspect-square relative bg-slate-200 overflow-hidden">
                                    {/* Use next/image if you have images, or fallback to a placeholder */}
                                    {/* Since images are not generated yet, we use a colored div with initials or placeholder */}
                                    <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400">
                                        {/* If the user had images, we would put <Image src={member.image} ... /> here */}
                                        <span className="sr-only">{member.name} photo</span>
                                        {/* Placeholder visual */}
                                        <svg className="h-20 w-20" fill="currentColor" viewBox="0 0 24 24"><path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                                    </div>
                                </div>
                                <div className="p-6 space-y-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-green-700 transition-colors">{member.name}</h3>
                                        <div className="text-green-600 font-medium text-sm">{member.role}</div>
                                    </div>

                                    {/* Focus Badge */}
                                    <span className="inline-flex items-center rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700 ring-1 ring-inset ring-green-600/20">
                                        Focus: {member.focus}
                                    </span>

                                    <div className="pt-4 border-t border-slate-100">
                                        <p className="text-slate-500 italic text-sm leading-relaxed">
                                            "{member.quote}"
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
