"use client";
import Image from "next/image";
import { getDictionary } from "@/lib/dictionary"


const WhatsAppButton: React.FC = () => {
    const whatsappNumber = "+7247077028";
    const whatsappMessage = ""
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

    // const { lang } = await params
    // const dict = await getDictionary(lang as "en" | "hi")
    // const { contact } = dict

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center">
            {/* WhatsApp Button */}
            <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white transition-all duration-300 transform hover:scale-110 flex items-center justify-center w-12 h-12 md:w-14 md:h-14"
                aria-label="Chat on WhatsApp"
            >
                <Image
                    src="/grow-more/images/Digital_Glyph_Green.svg"
                    alt="WhatsApp Icon"
                    width={40}
                    height={40}
                    className="text-white"
                />
            </a>
        </div>
    );
};
export default WhatsAppButton;
