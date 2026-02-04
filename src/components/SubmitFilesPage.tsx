'use client';

import { useState, useRef } from 'react';
import { Check, X, FileIcon } from 'lucide-react';

export default function SubmitFilesPage() {
    // 1. STATE: The "Memory" of the file list
    // We start with some mock data, or you can start with [] to be empty
    const [files, setFiles] = useState<{ id: number; name: string; size: string }[]>([
        { id: 1, name: "Logo.eps", size: "65.5KB" },
        { id: 2, name: "Logo.ai", size: "55.5KB" }
    ]);

    const fileInputRef = useRef<HTMLInputElement>(null);

    // --- HANDLERS ---

    // 1. Trigger the hidden file input
    const handleAddBoxClick = () => {
        fileInputRef.current?.click();
    };

    // 2. Handle actual file selection
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            // Convert the "FileList" object to a normal array
            const newFiles = Array.from(e.target.files).map((file, index) => ({
                id: Date.now() + index, // Generate a unique ID
                name: file.name,
                // Calculate dynamic size (e.g., 1024 bytes = 1KB)
                size: (file.size / 1024).toFixed(1) + "KB"
            }));

            // Add new files to the existing list
            setFiles((prev) => [...prev, ...newFiles]);
        }
    };

    // 3. Delete a file
    const removeFile = (idToDelete: number) => {
        setFiles(files.filter((file) => file.id !== idToDelete));
    };

    // 4. View Agreement Simulation
    const handleViewAgreement = () => {
        alert("Opening signed document: Transfer_Agreement_01-05-2024.pdf");
    };

    // 5. Send Logic with Validation
    const handleSendFiles = () => {
        if (files.length === 0) {
            alert("Error: You must add at least one file before sending.");
            return;
        }

        // Success Simulation
        alert(`Success! ${files.length} files have been sent to Geeth Roman.`);

        // Clear the list to show they are "sent"
        setFiles([]);
    };

    return (
        <div className="min-h-screen bg-white flex flex-col">

            <main className="flex-grow flex flex-col">

                {/* 1. BREADCRUMB */}
                <div className="max-w-7xl mx-auto px-8 w-full pt-8 pb-6">
                    <div className="text-xs font-medium text-gray-500 font-body mb-2">
                        My Contests / <span className="text-black font-bold">Submit Files</span>
                    </div>
                </div>

                {/* 2. NOTIFICATION BAR */}
                <div className="w-full bg-[#1A1A1A] text-white py-4 px-8">
                    <div className="max-w-7xl mx-auto flex items-center gap-3">
                        <div className="bg-white rounded-full p-0.5">
                            <Check className="w-3 h-3 text-black stroke-[4]" />
                        </div>
                        <p className="text-sm font-medium font-body">
                            Payment will be released in 5 days. Kindly await Geeth Roman's feedback or approval of your work.
                        </p>
                    </div>
                </div>

                {/* 3. MAIN CONTENT AREA */}
                <div className="max-w-7xl mx-auto px-8 w-full py-10 flex-grow">

                    {/* Files Section */}
                    <div className="mb-12">
                        <h2 className="font-heading text-2xl font-bold text-gray-900 mb-6">Files</h2>

                        {/* The Dynamic File List */}
                        <div className="space-y-4">
                            {files.map((file) => (
                                <div key={file.id} className="flex justify-between items-start border-b border-gray-100 pb-4 group">
                                    <div>
                                        <p className="font-heading font-bold text-gray-800 text-lg flex items-center gap-2">
                                            <FileIcon className="w-4 h-4 text-gray-400" />
                                            {file.name}
                                        </p>
                                        <p className="text-xs text-gray-400 font-body mt-1 ml-6">File Size : {file.size}</p>
                                    </div>
                                    {/* Delete Button */}
                                    <button
                                        onClick={() => removeFile(file.id)}
                                        className="text-gray-300 hover:text-red-500 transition-colors p-2"
                                        title="Remove file"
                                    >
                                        <X className="w-5 h-5 stroke-[3]" />
                                    </button>
                                </div>
                            ))}

                            {/* Empty State Message (Only shows if list is empty) */}
                            {files.length === 0 && (
                                <div className="text-center py-8 text-gray-400 text-sm italic">
                                    No files added yet.
                                </div>
                            )}
                        </div>

                        {/* Hidden Input for PC File Picker */}
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            className="hidden"
                            multiple // Allows selecting multiple files at once
                            accept=".eps,.ai,.pdf,.png,.jpeg,.psd,.gif" // Limits to allowed types
                        />

                        {/* Add Files Box */}
                        <div
                            onClick={handleAddBoxClick}
                            className="mt-6 border border-gray-200 rounded-sm py-8 flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
                        >
                            <span className="text-gray-400 text-sm font-body">Add Design Files</span>
                        </div>
                    </div>


                    {/* Copyrights Section */}
                    <div className="mb-12">
                        <h2 className="font-heading text-2xl font-bold text-gray-900 mb-2">Copyrights & Agreement</h2>

                        <div className="mb-4">
                            <button
                                onClick={handleViewAgreement}
                                className="border border-gray-300 text-gray-700 px-6 py-2.5 text-xs font-medium rounded-[4px] hover:border-black hover:text-black transition-colors font-body bg-white"
                            >
                                View Agreement you signed
                            </button>
                        </div>

                        <p className="text-xs text-gray-400 font-body mb-8">
                            Signed by you on 01/05/2024
                        </p>

                        {/* Main Action Button */}
                        <button
                            onClick={handleSendFiles}
                            className={`px-10 py-3.5 text-xs font-bold uppercase tracking-wide rounded-sm transition-colors font-body shadow-sm ${files.length === 0
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' // Disabled Style
                                : 'bg-[#1A1A1A] text-white hover:bg-black' // Active Style
                                }`}
                        >
                            Send New Files
                        </button>

                        <p className="text-[11px] text-gray-400 font-body mt-3">
                            The client has been notified regarding the uploaded files for review.
                        </p>
                    </div>

                </div>
            </main>

        </div>
    );
}
