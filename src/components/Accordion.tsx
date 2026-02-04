'use client';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface AccordionProps {
    title: string;
    content: string;
}

export default function Accordion({ title, content }: AccordionProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-gray-200 py-4 last:border-b-0">
            <button
                className="w-full flex justify-between items-center text-left py-2 font-medium text-gray-900 hover:text-gray-600 transition-colors focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span>{title}</span>
                {isOpen ? <ChevronUp className="h-5 w-5 text-gray-500" /> : <ChevronDown className="h-5 w-5 text-gray-500" />}
            </button>
            {isOpen && (
                <div className="py-2 text-sm text-gray-600 leading-relaxed animate-in fade-in slide-in-from-top-1 duration-200">
                    {content}
                </div>
            )}
        </div>
    );
}
