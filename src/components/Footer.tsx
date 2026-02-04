"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";

// Payment method logo components
const MastercardLogo = () => (
    <svg width="36" height="24" viewBox="0 0 36 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="36" height="24" rx="4" fill="#EB001B"/>
        <circle cx="13" cy="12" r="7" fill="#F79E1B"/>
        <circle cx="23" cy="12" r="7" fill="#FF5F00"/>
    </svg>
);

const PayPalLogo = () => (
    <svg width="36" height="24" viewBox="0 0 36 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="36" height="24" rx="4" fill="#003087"/>
        <path d="M11 7L13.5 15H12L11.2 11.5H9.5L8.5 15H7L9.5 7H11Z" fill="white"/>
        <path d="M17 7C18.2 7 19 7.4 19.4 8.2C19.6 8.6 19.7 9 19.7 9.5C19.7 10.2 19.4 10.8 18.8 11.2C18.5 11.4 18.1 11.5 17.6 11.5H16.6L16.4 12.5H15L15.8 7.5H17V7ZM16.6 10.5H17.2C17.5 10.5 17.8 10.4 18 10.3C18.2 10.2 18.4 10 18.4 9.6C18.4 9.2 18.2 9 18 8.9C17.8 8.8 17.5 8.7 17.2 8.7H16.6V10.5Z" fill="white"/>
    </svg>
);

const VisaLogo = () => (
    <svg width="36" height="24" viewBox="0 0 36 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="36" height="24" rx="4" fill="#1434CB"/>
        <text x="18" y="15" fontSize="9" fontWeight="bold" fill="white" textAnchor="middle" fontFamily="Arial, sans-serif" letterSpacing="1">VISA</text>
    </svg>
);

export default function Footer() {
    return (
        <footer className="bg-black text-white pt-12 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
                    {/* Company Column */}
                    <div className="flex flex-col gap-3">
                        <h4 className="font-bold text-base mb-2">Company</h4>
                        <Link href="/contact" className="text-white hover:text-gray-300 transition-colors text-sm">Contact</Link>
                        <Link href="/careers" className="text-white hover:text-gray-300 transition-colors text-sm">Careers</Link>
                        <Link href="/team" className="text-white hover:text-gray-300 transition-colors text-sm">Team</Link>
                        <Link href="/press" className="text-white hover:text-gray-300 transition-colors text-sm">Press releases</Link>
                    </div>

                    {/* Categories Column */}
                    <div className="flex flex-col gap-3">
                        <h4 className="font-bold text-base mb-2">Categories</h4>
                        <Link href="/category/advertising" className="text-white hover:text-gray-300 transition-colors text-sm">Advertising Services</Link>
                        <Link href="/category/social-media" className="text-white hover:text-gray-300 transition-colors text-sm">Social Media Services</Link>
                        <Link href="/category/content-marketing" className="text-white hover:text-gray-300 transition-colors text-sm">Content Marketing</Link>
                        <Link href="/category/graphic-design" className="text-white hover:text-gray-300 transition-colors text-sm">Graphic Design & Branding</Link>
                        <Link href="/category/animation" className="text-white hover:text-gray-300 transition-colors text-sm">Animation & Video Production</Link>
                        <Link href="/category/seo" className="text-white hover:text-gray-300 transition-colors text-sm">SEO & Website Development</Link>
                        <Link href="/category/media-pr" className="text-white hover:text-gray-300 transition-colors text-sm">Media & PR Services</Link>
                        <Link href="/category/email-marketing" className="text-white hover:text-gray-300 transition-colors text-sm">Email Marketing & Automation</Link>
                    </div>

                    {/* Marketing Solutions Column */}
                    <div className="flex flex-col gap-3">
                        <h4 className="font-bold text-base mb-2">Marketing Solutions</h4>
                        <Link href="/solutions/social-media-ads" className="text-white hover:text-gray-300 transition-colors text-sm">Social Media Ads</Link>
                        <Link href="/solutions/google-seo" className="text-white hover:text-gray-300 transition-colors text-sm">Google SEO & Blogs</Link>
                        <Link href="/solutions/bulk-emails" className="text-white hover:text-gray-300 transition-colors text-sm">Bulk Emails & SMS</Link>
                        <Link href="/solutions/lead-generation" className="text-white hover:text-gray-300 transition-colors text-sm">Lead Generation</Link>
                        <Link href="/solutions/branding" className="text-white hover:text-gray-300 transition-colors text-sm">Branding & Logo Design</Link>
                        <Link href="/solutions/website-development" className="text-white hover:text-gray-300 transition-colors text-sm">Website Development</Link>
                        <Link href="/categories" className="text-white hover:text-gray-300 transition-colors text-sm">Browse all categories</Link>
                    </div>

                    {/* Info Column */}
                    <div className="flex flex-col gap-3">
                        <h4 className="font-bold text-base mb-2">Info</h4>
                        <Link href="/faq" className="text-white hover:text-gray-300 transition-colors text-sm">FAQ</Link>
                        <Link href="/about" className="text-white hover:text-gray-300 transition-colors text-sm">About Us</Link>
                        <Link href="/support" className="text-white hover:text-gray-300 transition-colors text-sm">Customer Support</Link>
                    </div>

                    {/* Lets Us Help Column */}
                    <div className="flex flex-col gap-3">
                        <h4 className="font-bold text-base mb-2">Lets Us Help</h4>
                        <Link href="/account" className="text-white hover:text-gray-300 transition-colors text-sm">My Account</Link>
                        <Link href="/shipping" className="text-white hover:text-gray-300 transition-colors text-sm">Shipping & Returns</Link>
                        <Link href="/ideas" className="text-white hover:text-gray-300 transition-colors text-sm">Ideas & Advice</Link>
                        <Link href="/accessibility" className="text-white hover:text-gray-300 transition-colors text-sm">Accessibility</Link>
                        <Link href="/sustainability" className="text-white hover:text-gray-300 transition-colors text-sm">Sustainability</Link>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-white pt-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
                        <div className="flex flex-wrap justify-center md:justify-start items-center gap-2 text-white">
                            <span>© 2014 - 2025 Special Graphics LLC | Special Graphics (PVT) LTD</span>
                        </div>
                        <div className="flex flex-wrap justify-center md:justify-end items-center gap-4">
                            <div className="flex items-center gap-2 text-white">
                                <Link href="/terms" className="hover:text-gray-300 transition-colors">Terms and Conditions</Link>
                                <span>|</span>
                                <Link href="/privacy" className="hover:text-gray-300 transition-colors">Privacy</Link>
                            </div>
                            <div className="flex items-center gap-2 text-white">
                                <span>English</span>
                                <span className="hover:text-gray-300 cursor-pointer transition-colors">Español</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <MastercardLogo />
                                <PayPalLogo />
                                <VisaLogo />
                            </div>
                        </div>
                    </div>
                    {/* Social Media Icons */}
                    <div className="flex justify-center md:justify-start items-center gap-4 pt-4">
                        <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition-colors">
                            <Facebook size={20} />
                        </Link>
                        <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition-colors">
                            <Twitter size={20} />
                        </Link>
                        <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition-colors">
                            <Instagram size={20} />
                        </Link>
                        <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition-colors">
                            <Linkedin size={20} />
                        </Link>
                        <Link href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition-colors">
                            <Youtube size={20} />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
