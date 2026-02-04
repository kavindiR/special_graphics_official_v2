'use client';

import { useState } from 'react';

interface DesignCardProps {
    design: {
        id: number;
        designer: string;
        rating: number;
        logoIndex: number;
    };
    renderLogo: (index: number) => React.ReactNode;
    image?: string;
}

export default function DesignCard({ design, renderLogo, image }: DesignCardProps) {
    const [imageError, setImageError] = useState(false);

    return (
        <div
            className="bg-white border border-gray-100 overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 group"
            onClick={() => alert(`Viewing design #${design.id} by ${design.designer}`)}
        >
            <div className="aspect-square bg-white relative overflow-hidden">
                {image && !imageError ? (
                    <img 
                        src={image} 
                        alt={`Design by ${design.designer}`}
                        className="w-full h-full object-cover object-center"
                        loading="lazy"
                        onError={() => setImageError(true)}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center p-6">
                        {renderLogo(design.logoIndex)}
                    </div>
                )}
            </div>
            <div className="p-4 sm:p-5 bg-white border-t border-gray-100">
                <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm font-medium text-gray-700">#{design.id} by {design.designer}</span>
                    <div className="flex gap-0.5 items-center">
                        {[...Array(5)].map((_, i) => (
                            <span key={i} className={`text-xl sm:text-2xl leading-none ${i < design.rating ? 'text-gray-900' : 'text-gray-300'}`}>★</span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
