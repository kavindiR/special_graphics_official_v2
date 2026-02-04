"use client";

import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

interface FeatureSectionProps {
    title: React.ReactNode;
    description: string;
    buttonText: string;
    buttonColorClass: string;
    buttonLink?: string;
    secondaryLinkText?: string;
    secondaryLinkHref?: string;
    imageSrc: string;
    imageAlt: string;
    isImageLeft?: boolean;
    backgroundColorClass?: string;
    titleColorClass?: string;
}

export default function FeatureSection({
    title,
    description,
    buttonText,
    buttonColorClass,
    buttonLink = "#",
    secondaryLinkText = "Start Your Project Now",
    secondaryLinkHref = "#",
    imageSrc,
    imageAlt,
    isImageLeft = false,
    backgroundColorClass = "bg-white",
    titleColorClass = "text-[#222]",
}: FeatureSectionProps) {

    return (
        <section className={clsx("py-16 md:py-20", backgroundColorClass)}>
            <div className={clsx("container mx-auto px-4 flex items-center gap-12", isImageLeft ? "flex-col-reverse md:flex-row" : "flex-col md:flex-row")}>

                {isImageLeft && (
                    <div className="md:w-1/2 flex justify-center">
                        <Image src={imageSrc} alt={imageAlt} width={600} height={500} className="w-full max-w-lg h-auto object-contain" />
                    </div>
                )}

                <div className="md:w-1/2 space-y-6 text-center md:text-left">
                    <h2 className={clsx("text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight", titleColorClass)}>
                        {title}
                    </h2>
                    <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-md mx-auto md:mx-0">
                        {description}
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 md:gap-6 pt-4">
                        <Link href={buttonLink}>
                            <button className={clsx("text-white px-6 py-3 rounded text-sm font-medium transition-colors cursor-pointer", buttonColorClass)}>
                                {buttonText}
                            </button>
                        </Link>
                        <Link href={secondaryLinkHref} className="text-gray-600 hover:text-black font-medium text-sm">
                            {secondaryLinkText}
                        </Link>
                    </div>
                </div>

                {!isImageLeft && (
                    <div className="md:w-1/2 flex justify-center relative">
                        <Image src={imageSrc} alt={imageAlt} width={600} height={500} className="w-full max-w-lg h-auto object-contain" />
                    </div>
                )}

            </div>
        </section>
    );
}
