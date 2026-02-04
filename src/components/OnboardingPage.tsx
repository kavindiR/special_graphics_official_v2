'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function OnboardingPage() {
    const router = useRouter();
    const [selectedType, setSelectedType] = useState<'client' | 'designer' | null>(null);

    const handleContinue = () => {
        if (selectedType) {
            // Navigate to auth page with the selected user type
            router.push(`/auth?type=${selectedType}&mode=register`);
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-8">
            {/* Logo */}
            <div className="mb-12 text-center">
                <h1 className="text-3xl md:text-4xl font-bold text-black mb-1">
                    Special Graphics
                </h1>
                <p className="text-sm text-gray-500 mt-1">by Special Graphics</p>
            </div>

            {/* Main Heading */}
            <h2 className="text-3xl md:text-4xl font-bold text-black text-center mb-12 max-w-2xl">
                Let&apos;s begin your journey with Special Graphics
            </h2>

            {/* Choice Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8 w-full max-w-2xl">
                {/* I need something designed */}
                <button
                    onClick={() => setSelectedType('client')}
                    className={`flex-1 p-8 rounded-lg border-2 transition-all duration-200 text-left ${
                        selectedType === 'client'
                            ? 'border-gray-400 bg-gray-50'
                            : 'border-gray-200 hover:border-gray-300'
                    }`}
                >
                    <div className="text-xl font-semibold text-black">
                        I need something designed
                    </div>
                </button>

                {/* I'm a designer */}
                <div
                    className={`flex-1 rounded-lg transition-all duration-200 relative ${
                        selectedType === 'designer' ? 'p-[2px]' : 'p-0'
                    }`}
                    style={
                        selectedType === 'designer'
                            ? {
                                  background: 'linear-gradient(to right, #3B82F6, #06B6D4)',
                              }
                            : {}
                    }
                >
                    <button
                        onClick={() => setSelectedType('designer')}
                        className={`w-full h-full p-8 rounded-lg text-left transition-all duration-200 ${
                            selectedType === 'designer'
                                ? 'bg-blue-50'
                                : 'border-2 border-gray-200 hover:border-gray-300 bg-white'
                        }`}
                    >
                        <div className="text-xl font-semibold text-black">
                            I&apos;m a designer
                        </div>
                    </button>
                </div>
            </div>

            {/* Continue Button */}
            <button
                onClick={handleContinue}
                disabled={!selectedType}
                className={`w-full max-w-2xl py-4 px-8 rounded-lg font-semibold text-white transition-all duration-200 ${
                    selectedType
                        ? 'bg-gray-900 hover:bg-black cursor-pointer'
                        : 'bg-gray-300 cursor-not-allowed'
                }`}
            >
                Continue
            </button>

            {/* Privacy Policy */}
            <div className="mt-12 text-center text-sm text-gray-500 max-w-2xl">
                For more details on how we use your information, please read our{' '}
                <Link href="/privacy" className="text-gray-700 underline hover:text-black">
                    Privacy and Cookie Policy
                </Link>
                .
            </div>
        </div>
    );
}

