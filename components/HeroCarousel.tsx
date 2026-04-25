'use client'

import React from 'react'
import Autoplay from 'embla-carousel-autoplay'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselDots
} from "@/components/ui/carousel"
import Image from 'next/image'

interface HeroCarouselProps {
    slides: {
        title: string
        subtitle: string
        image: string,
        mobileImage: string,
    }[]
}

export default function HeroCarousel({ slides }: HeroCarouselProps) {
    const plugin = React.useRef(
        Autoplay({ delay: 4000, stopOnInteraction: false })
    )

    return (
        <Carousel
            plugins={[plugin.current]}
            className="w-full"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
            opts={{
                loop: true,
            }}
        >
            <CarouselContent>
                {slides.map((slide, index) => (
                    <CarouselItem key={index}>
                        <div className="w-full">
                            {/* Desktop Image */}
                            <Image
                                src={slide.image}
                                alt={slide.title}
                                width={1920} // Original aspect ratio width
                                height={1080} // Original aspect ratio height
                                className="hidden sm:block w-full h-auto"
                                priority={index === 0}
                            />

                            {/* Mobile Image */}
                            {slide.mobileImage && (
                                <Image
                                    src={slide.mobileImage}
                                    alt={slide.title}
                                    width={600}
                                    height={800}
                                    className="block sm:hidden w-full h-auto"
                                    priority={index === 0}
                                />
                            )}
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            {/* Optional arrows, maybe hidden on mobile or styled differently */}
            {/* <CarouselPrevious className="left-4 bg-white/10 hover:bg-white/20 border-none text-white hidden md:flex" />
            <CarouselNext className="right-4 bg-white/10 hover:bg-white/20 border-none text-white hidden md:flex" /> */}
            <CarouselDots className='mt-3 cursor-pointer' />
        </Carousel>
    )
}
