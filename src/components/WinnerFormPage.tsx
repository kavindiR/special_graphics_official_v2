'use client';

import { useState, useRef } from 'react';
import { Check, LogOut, ChevronDown, Upload, X } from 'lucide-react';

interface FormData {
    fullName: string;
    address: string;
    country: string;
    state: string;
    city: string;
    zip: string;
    phone: string;
}

interface FormErrors {
    [key: string]: string | null;
}

export default function WinnerFormPage() {
    // --- STATE MANAGEMENT ---
    const [formData, setFormData] = useState<FormData>({
        fullName: '',
        address: '',
        country: '',
        state: '',
        city: '',
        zip: '',
        phone: ''
    });

    const [files, setFiles] = useState<File[]>([]);
    const [isAgreed, setIsAgreed] = useState(false);
    const [errors, setErrors] = useState<FormErrors>({});

    const fileInputRef = useRef<HTMLInputElement>(null);

    // --- HANDLERS ---

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Clear error immediately when user types
        if (errors[name]) {
            setErrors({ ...errors, [name]: null });
        }
    };

    const handleFileBoxClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const newFiles = Array.from(e.target.files);
            setFiles([...files, ...newFiles]);
        }
    };

    const removeFile = (index: number) => {
        setFiles(files.filter((_, i) => i !== index));
    };

    // --- VALIDATION LOGIC ---
    const validateForm = () => {
        let newErrors: FormErrors = {};
        let isValid = true;

        // 1. Check Required Fields
        if (!formData.fullName.trim()) { newErrors.fullName = "Name is required"; isValid = false; }
        if (!formData.address.trim()) { newErrors.address = "Address is required"; isValid = false; }
        if (!formData.country) { newErrors.country = "Select a country"; isValid = false; }
        if (!formData.state.trim()) { newErrors.state = "State is required"; isValid = false; }
        if (!formData.city.trim()) { newErrors.city = "City is required"; isValid = false; }
        if (!formData.zip.trim()) { newErrors.zip = "Zip code is required"; isValid = false; }
        if (!formData.phone.trim()) { newErrors.phone = "Phone is required"; isValid = false; }

        // 2. Check City Logic (No numbers allowed)
        if (formData.city && /\d/.test(formData.city)) {
            newErrors.city = "City name should not contain numbers";
            isValid = false;
        }

        setErrors(newErrors); // Show errors (red borders)
        return isValid;
    };

    // --- SEND LOGIC (The Fix) ---
    const handleSendFiles = () => {
        // Step 1: Check Form Fields
        if (!validateForm()) {
            console.log("Validation failed");
            return; // Stop here. Do not clear data.
        }

        // Step 2: Check Agreement (Separate Check)
        if (!isAgreed) {
            alert("You must agree to the design transfer agreement.");
            return; // Stop here. Do not clear data.
        }

        // Step 3: SUCCESS (Only runs if everything above passed)
        // FRONTEND SIMULATION: Show success
        alert("Success! Files sent to client.");

        // NOW it is safe to vanish/reset the data
        setFormData({
            fullName: '', address: '', country: '', state: '', city: '', zip: '', phone: ''
        });
        setFiles([]);
        setIsAgreed(false);
        setErrors({});
    };

    return (
        <div className="min-h-screen bg-white flex flex-col">

            <main className="flex-grow flex flex-col pb-20">

                {/* HEADER */}
                <div className="max-w-7xl mx-auto px-8 w-full pt-8 pb-6">
                    <div className="text-xs font-medium text-gray-500 font-body mb-2">
                        My Contests / <span className="text-black font-bold">Submit Files</span>
                    </div>
                </div>

                {/* NOTIFICATION BAR */}
                <div className="w-full bg-[#1A1A1A] text-white py-4 px-8">
                    <div className="max-w-7xl mx-auto flex items-center gap-3">
                        <div className="bg-white/20 rounded-sm p-1">
                            <LogOut className="w-3 h-3 text-white" />
                        </div>
                        <p className="text-sm font-medium font-body">
                            Geeth Roman won't see your work until you've signed the <span className="underline cursor-pointer">design transfer agreement</span>.
                        </p>
                    </div>
                </div>

                {/* MAIN CONTENT */}
                <div className="max-w-7xl mx-auto px-8 w-full py-10">

                    {/* 1. FILE UPLOAD SECTION */}
                    <div className="mb-12">
                        <h2 className="font-heading text-2xl font-bold text-gray-900 mb-4">Files</h2>

                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            className="hidden"
                            multiple
                        />

                        <div
                            onClick={handleFileBoxClick}
                            className="border border-gray-200 rounded-sm py-8 flex flex-col gap-2 items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors bg-white group"
                        >
                            <Upload className="w-6 h-6 text-gray-300 group-hover:text-black transition-colors" />
                            <span className="text-gray-400 text-sm font-body group-hover:text-black transition-colors">
                                {files.length > 0 ? "Add More Files" : "Add Design Files"}
                            </span>
                        </div>

                        {/* Selected Files List */}
                        {files.length > 0 && (
                            <div className="mt-4 space-y-2">
                                {files.map((file, index) => (
                                    <div key={index} className="flex items-center justify-between text-xs bg-gray-50 p-2 rounded-sm border border-gray-100">
                                        <span className="text-gray-700 font-bold">{file.name}</span>
                                        <button onClick={() => removeFile(index)} className="text-gray-400 hover:text-black">
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        <p className="text-[10px] text-gray-400 mt-2 font-body">
                            Support Formats : pdf, eps, ai, png, jpeg, psd & gif
                        </p>
                    </div>


                    {/* 2. FORM SECTION */}
                    <div>
                        <h2 className="font-heading text-2xl font-bold text-gray-900 mb-2">Copyrights & Agreement</h2>
                        <h3 className="text-lg font-heading text-gray-700 mb-2">Agreement Info</h3>

                        <div className="border border-gray-200 rounded-md p-8 bg-white mb-6">

                            {/* 4-COLUMN GRID */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-6 gap-y-6">

                                {/* Full Name */}
                                <div className="md:col-span-2 flex flex-col gap-2">
                                    <label className="text-sm text-gray-700 font-body">Full Name Or Company</label>
                                    <input
                                        name="fullName" value={formData.fullName} onChange={handleInputChange}
                                        type="text" placeholder="Add your name or company name"
                                        className={`border ${errors.fullName ? 'border-red-500 bg-red-50' : 'border-gray-300'} rounded-sm px-4 py-3 text-xs focus:outline-none focus:border-black w-full transition-colors`}
                                    />
                                    {errors.fullName && <span className="text-red-500 text-[10px]">{errors.fullName}</span>}
                                </div>

                                {/* Address */}
                                <div className="md:col-span-2 flex flex-col gap-2">
                                    <label className="text-sm text-gray-700 font-body">Address</label>
                                    <input
                                        name="address" value={formData.address} onChange={handleInputChange}
                                        type="text" placeholder="Add your address"
                                        className={`border ${errors.address ? 'border-red-500 bg-red-50' : 'border-gray-300'} rounded-sm px-4 py-3 text-xs focus:outline-none focus:border-black w-full transition-colors`}
                                    />
                                    {errors.address && <span className="text-red-500 text-[10px]">{errors.address}</span>}
                                </div>

                                {/* Country */}
                                <div className="md:col-span-1 flex flex-col gap-2">
                                    <label className="text-sm text-gray-700 font-body">Country</label>
                                    <div className="relative">
                                        <select
                                            name="country" value={formData.country} onChange={handleInputChange}
                                            className={`w-full border ${errors.country ? 'border-red-500 bg-red-50' : 'border-gray-300'} rounded-sm px-4 py-3 text-xs appearance-none focus:outline-none focus:border-black bg-white text-gray-600`}
                                        >
                                            <option value="">Select country</option>
                                            <option value="US">United States</option>
                                            <option value="LK">Sri Lanka</option>
                                        </select>
                                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                    </div>
                                    {errors.country && <span className="text-red-500 text-[10px]">{errors.country}</span>}
                                </div>

                                {/* State */}
                                <div className="md:col-span-1 flex flex-col gap-2">
                                    <label className="text-sm text-gray-700 font-body">State/Province</label>
                                    <input
                                        name="state" value={formData.state} onChange={handleInputChange}
                                        type="text"
                                        className={`border ${errors.state ? 'border-red-500 bg-red-50' : 'border-gray-300'} rounded-sm px-4 py-3 text-xs focus:outline-none focus:border-black w-full transition-colors`}
                                    />
                                </div>

                                {/* City (With Validation) */}
                                <div className="md:col-span-1 flex flex-col gap-2">
                                    <label className="text-sm text-gray-700 font-body">City/Town</label>
                                    <input
                                        name="city" value={formData.city} onChange={handleInputChange}
                                        type="text"
                                        className={`border ${errors.city ? 'border-red-500 bg-red-50' : 'border-gray-300'} rounded-sm px-4 py-3 text-xs focus:outline-none focus:border-black w-full`}
                                    />
                                    {errors.city && <span className="text-red-500 text-[10px]">{errors.city}</span>}
                                </div>

                                {/* Zip */}
                                <div className="md:col-span-1 flex flex-col gap-2">
                                    <label className="text-sm text-gray-700 font-body">Zip/Postal Code</label>
                                    <input
                                        name="zip" value={formData.zip} onChange={handleInputChange}
                                        type="text"
                                        className={`border ${errors.zip ? 'border-red-500 bg-red-50' : 'border-gray-300'} rounded-sm px-4 py-3 text-xs focus:outline-none focus:border-black w-full`}
                                    />
                                </div>

                                {/* Phone */}
                                <div className="md:col-span-1 flex flex-col gap-2">
                                    <label className="text-sm text-gray-700 font-body">Phone Number</label>
                                    <div className="flex gap-3">
                                        <div className="w-12 border border-gray-300 rounded-sm flex items-center justify-center text-xs text-gray-500 bg-gray-50">+1</div>
                                        <input
                                            name="phone" value={formData.phone} onChange={handleInputChange}
                                            type="text" placeholder="123456789"
                                            className={`flex-1 border ${errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-300'} rounded-sm px-4 py-3 text-xs focus:outline-none focus:border-black w-full`}
                                        />
                                    </div>
                                </div>

                                {/* Checkbox */}
                                <div className="md:col-span-4 flex items-center gap-3 mt-4 pt-2 border-t border-gray-50">
                                    <div
                                        onClick={() => setIsAgreed(!isAgreed)}
                                        className={`w-4 h-4 rounded-[2px] flex items-center justify-center cursor-pointer transition-colors border ${isAgreed ? 'bg-black border-black' : 'bg-white border-gray-400 hover:border-black'}`}
                                    >
                                        {isAgreed && <Check className="w-3 h-3 text-white" />}
                                    </div>
                                    <p className="text-sm font-body text-gray-800 cursor-pointer select-none" onClick={() => setIsAgreed(!isAgreed)}>
                                        I hereby agree to the terms of the <span className="underline cursor-pointer">design transfer agreement</span>
                                    </p>
                                </div>

                            </div>
                        </div>

                        <p className="text-[11px] text-gray-400 font-body mb-8 leading-relaxed">
                            You'll keep full legal ownership of your design until the client approves the files and payment.
                        </p>

                        <button
                            onClick={handleSendFiles}
                            className="bg-[#1A1A1A] text-white px-10 py-3.5 text-xs font-bold uppercase tracking-wide rounded-sm hover:bg-black transition-colors font-body shadow-sm"
                        >
                            Send Files
                        </button>

                    </div>

                </div>
            </main>

        </div>
    );
}
