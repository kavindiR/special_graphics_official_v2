'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
    Settings, 
    Save, 
    User, 
    Briefcase, 
    CreditCard,
    Bell,
    Shield,
    ArrowLeft,
    Globe,
    MapPin,
    Award,
    CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { designerApi } from '@/lib/api';

const DESIGN_CATEGORIES = [
    'Logo Design', 'Branding', 'Web Design', 'Packaging', 'Print Design',
    'Social Media', 'Illustration', 'Typography', 'Icon Design', 'App Design',
    'UI/UX Design', 'Motion Graphics', 'Product Design', 'Book Design', 'Poster Design'
];

export default function DesignerSettingsPage() {
    const { user, isAuthenticated, refreshUser } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [activeTab, setActiveTab] = useState<'profile' | 'payment' | 'notifications' | 'security'>('profile');
    const [formData, setFormData] = useState({
        name: '',
        bio: '',
        avatar: '',
        location: '',
        website: '',
        skills: [] as string[],
        designerLevel: 'entry' as 'entry' | 'mid' | 'top'
    });
    const [paymentData, setPaymentData] = useState({
        hyperwalletEmail: '',
        paymentMethod: 'bank_account',
        accountHolderName: '',
        bankName: '',
        accountNumber: '',
        routingNumber: '',
        currency: 'USD'
    });
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        if (typeof window !== 'undefined' && (!isAuthenticated || user?.role !== 'designer')) {
            router.push('/auth');
            return;
        }
        loadProfile();
    }, [isAuthenticated, user, router]);

    const loadProfile = async () => {
        try {
            setLoading(true);
            const response = await designerApi.getMyProfile();
            if (response.success && response.data) {
                const data = response.data as any;
                setFormData({
                    name: data?.name || '',
                    bio: data?.bio || '',
                    avatar: data?.avatar || '',
                    location: data?.location || '',
                    website: data?.website || '',
                    skills: data?.skills || [],
                    designerLevel: data?.designerLevel || 'entry'
                });
            }
        } catch (error) {
            console.error('Error loading profile:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleProfileSave = async () => {
        try {
            setSaving(true);
            setSuccessMessage('');
            const response = await designerApi.updateProfile(formData);
            if (response.success && response.data) {
                setSuccessMessage('Profile updated successfully!');
                if (refreshUser) {
                    await refreshUser();
                }
                setTimeout(() => setSuccessMessage(''), 3000);
            } else {
                alert(response.error?.message || 'Failed to update profile');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile');
        } finally {
            setSaving(false);
        }
    };

    const handlePaymentSave = async () => {
        try {
            setSaving(true);
            setSuccessMessage('');
            // In a real app, this would call a payment settings API
            // For now, we'll just show a success message
            setTimeout(() => {
                setSuccessMessage('Payment settings saved successfully!');
                setSaving(false);
                setTimeout(() => setSuccessMessage(''), 3000);
            }, 1000);
        } catch (error) {
            console.error('Error saving payment settings:', error);
            alert('Failed to save payment settings');
            setSaving(false);
        }
    };

    const handleSkillAdd = (skill: string) => {
        if (skill && !formData.skills.includes(skill)) {
            setFormData({
                ...formData,
                skills: [...formData.skills, skill]
            });
        }
    };

    const handleSkillRemove = (skill: string) => {
        setFormData({
            ...formData,
            skills: formData.skills.filter(s => s !== skill)
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                    <p className="mt-4 text-gray-600">Loading settings...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <Link href="/designer/dashboard">
                                <Button variant="outline" size="sm" className="mb-4">
                                    <ArrowLeft className="h-4 w-4 mr-2" />
                                    Back to Dashboard
                                </Button>
                            </Link>
                            <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
                            <p className="text-gray-600 mt-1">Manage your profile and account settings</p>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-1 border-b border-gray-200">
                        <button
                            onClick={() => setActiveTab('profile')}
                            className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
                                activeTab === 'profile'
                                    ? 'border-black text-black'
                                    : 'border-transparent text-gray-600 hover:text-gray-900'
                            }`}
                        >
                            <User className="h-4 w-4 inline mr-2" />
                            Profile
                        </button>
                        <button
                            onClick={() => setActiveTab('payment')}
                            className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
                                activeTab === 'payment'
                                    ? 'border-black text-black'
                                    : 'border-transparent text-gray-600 hover:text-gray-900'
                            }`}
                        >
                            <CreditCard className="h-4 w-4 inline mr-2" />
                            Payment
                        </button>
                        <button
                            onClick={() => setActiveTab('notifications')}
                            className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
                                activeTab === 'notifications'
                                    ? 'border-black text-black'
                                    : 'border-transparent text-gray-600 hover:text-gray-900'
                            }`}
                        >
                            <Bell className="h-4 w-4 inline mr-2" />
                            Notifications
                        </button>
                        <button
                            onClick={() => setActiveTab('security')}
                            className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
                                activeTab === 'security'
                                    ? 'border-black text-black'
                                    : 'border-transparent text-gray-600 hover:text-gray-900'
                            }`}
                        >
                            <Shield className="h-4 w-4 inline mr-2" />
                            Security
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {successMessage && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        <p className="text-green-800">{successMessage}</p>
                    </div>
                )}

                {/* Profile Tab */}
                {activeTab === 'profile' && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Profile Information</h2>
                        <div className="space-y-6">
                            {/* Avatar */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Profile Picture
                                </label>
                                <div className="flex items-center gap-4">
                                    {formData.avatar ? (
                                        <img 
                                            src={formData.avatar} 
                                            alt="Avatar"
                                            className="h-20 w-20 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center">
                                            <User className="h-10 w-10 text-gray-400" />
                                        </div>
                                    )}
                                    <div className="flex-1">
                                        <input
                                            type="url"
                                            value={formData.avatar}
                                            onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                                            placeholder="https://example.com/avatar.jpg"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                                        />
                                        <p className="text-xs text-gray-500 mt-1">Enter image URL</p>
                                    </div>
                                </div>
                            </div>

                            {/* Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Name *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                                />
                            </div>

                            {/* Bio */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Bio
                                </label>
                                <textarea
                                    rows={4}
                                    value={formData.bio}
                                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                    placeholder="Tell clients about yourself and your design style..."
                                    maxLength={500}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                                />
                                <p className="text-xs text-gray-500 mt-1">{formData.bio.length}/500 characters</p>
                            </div>

                            {/* Location */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <MapPin className="h-4 w-4 inline mr-1" />
                                    Location
                                </label>
                                <input
                                    type="text"
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    placeholder="City, Country"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                                />
                            </div>

                            {/* Website */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <Globe className="h-4 w-4 inline mr-1" />
                                    Website
                                </label>
                                <input
                                    type="url"
                                    value={formData.website}
                                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                                    placeholder="https://yourwebsite.com"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                                />
                            </div>

                            {/* Designer Level */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <Award className="h-4 w-4 inline mr-1" />
                                    Designer Level
                                </label>
                                <select
                                    value={formData.designerLevel}
                                    onChange={(e) => setFormData({ ...formData, designerLevel: e.target.value as 'entry' | 'mid' | 'top' })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                                >
                                    <option value="entry">Entry Level</option>
                                    <option value="mid">Mid Level</option>
                                    <option value="top">Top Level</option>
                                </select>
                                <p className="text-xs text-gray-500 mt-1">Your level is determined by performance and quality</p>
                            </div>

                            {/* Skills */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Skills
                                </label>
                                <div className="flex flex-wrap gap-2 mb-3">
                                    {formData.skills.map((skill, idx) => (
                                        <span
                                            key={idx}
                                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm flex items-center gap-2"
                                        >
                                            {skill}
                                            <button
                                                onClick={() => handleSkillRemove(skill)}
                                                className="text-gray-500 hover:text-gray-700"
                                            >
                                                ×
                                            </button>
                                        </span>
                                    ))}
                                </div>
                                <select
                                    onChange={(e) => {
                                        if (e.target.value) {
                                            handleSkillAdd(e.target.value);
                                            e.target.value = '';
                                        }
                                    }}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                                >
                                    <option value="">Add a skill...</option>
                                    {DESIGN_CATEGORIES.filter(cat => !formData.skills.includes(cat)).map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>

                            <Button
                                onClick={handleProfileSave}
                                disabled={saving}
                                className="w-full bg-black text-white hover:bg-gray-800"
                            >
                                <Save className="h-4 w-4 mr-2" />
                                {saving ? 'Saving...' : 'Save Changes'}
                            </Button>
                        </div>
                    </div>
                )}

                {/* Payment Tab */}
                {activeTab === 'payment' && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Payment Settings</h2>
                        <div className="space-y-6">
                            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                <p className="text-sm text-blue-800">
                                    <strong>Hyperwallet Integration:</strong> Payments are processed through Hyperwallet for secure and fast transfers.
                                    Please ensure your information is accurate to avoid payment delays.
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email for Hyperwallet *
                                </label>
                                <input
                                    type="email"
                                    value={paymentData.hyperwalletEmail}
                                    onChange={(e) => setPaymentData({ ...paymentData, hyperwalletEmail: e.target.value })}
                                    placeholder="your.email@example.com"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Payment Method *
                                </label>
                                <select
                                    value={paymentData.paymentMethod}
                                    onChange={(e) => setPaymentData({ ...paymentData, paymentMethod: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                                >
                                    <option value="bank_account">Bank Account</option>
                                    <option value="paypal">PayPal</option>
                                    <option value="wire_transfer">Wire Transfer</option>
                                </select>
                            </div>

                            {paymentData.paymentMethod === 'bank_account' && (
                                <>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Account Holder Name *
                                        </label>
                                        <input
                                            type="text"
                                            value={paymentData.accountHolderName}
                                            onChange={(e) => setPaymentData({ ...paymentData, accountHolderName: e.target.value })}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Bank Name *
                                        </label>
                                        <input
                                            type="text"
                                            value={paymentData.bankName}
                                            onChange={(e) => setPaymentData({ ...paymentData, bankName: e.target.value })}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Account Number *
                                            </label>
                                            <input
                                                type="text"
                                                value={paymentData.accountNumber}
                                                onChange={(e) => setPaymentData({ ...paymentData, accountNumber: e.target.value })}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Routing Number *
                                            </label>
                                            <input
                                                type="text"
                                                value={paymentData.routingNumber}
                                                onChange={(e) => setPaymentData({ ...paymentData, routingNumber: e.target.value })}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                                            />
                                        </div>
                                    </div>
                                </>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Currency *
                                </label>
                                <select
                                    value={paymentData.currency}
                                    onChange={(e) => setPaymentData({ ...paymentData, currency: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                                >
                                    <option value="USD">USD - US Dollar</option>
                                    <option value="EUR">EUR - Euro</option>
                                    <option value="GBP">GBP - British Pound</option>
                                    <option value="CAD">CAD - Canadian Dollar</option>
                                </select>
                            </div>

                            <Button
                                onClick={handlePaymentSave}
                                disabled={saving}
                                className="w-full bg-black text-white hover:bg-gray-800"
                            >
                                <Save className="h-4 w-4 mr-2" />
                                {saving ? 'Saving...' : 'Save Payment Settings'}
                            </Button>
                        </div>
                    </div>
                )}

                {/* Notifications Tab */}
                {activeTab === 'notifications' && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Notification Preferences</h2>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div>
                                    <p className="font-medium text-gray-900">Email Notifications</p>
                                    <p className="text-sm text-gray-600">Receive email updates about contests and projects</p>
                                </div>
                                <input type="checkbox" defaultChecked className="h-5 w-5" />
                            </div>
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div>
                                    <p className="font-medium text-gray-900">Contest Updates</p>
                                    <p className="text-sm text-gray-600">Get notified when contests you're in update</p>
                                </div>
                                <input type="checkbox" defaultChecked className="h-5 w-5" />
                            </div>
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div>
                                    <p className="font-medium text-gray-900">New Messages</p>
                                    <p className="text-sm text-gray-600">Notify me when I receive new messages</p>
                                </div>
                                <input type="checkbox" defaultChecked className="h-5 w-5" />
                            </div>
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div>
                                    <p className="font-medium text-gray-900">Payment Updates</p>
                                    <p className="text-sm text-gray-600">Get notified about earnings and payments</p>
                                </div>
                                <input type="checkbox" defaultChecked className="h-5 w-5" />
                            </div>
                        </div>
                    </div>
                )}

                {/* Security Tab */}
                {activeTab === 'security' && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Security Settings</h2>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Current Password
                                </label>
                                <input
                                    type="password"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Confirm New Password
                                </label>
                                <input
                                    type="password"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                                />
                            </div>
                            <Button className="w-full bg-black text-white hover:bg-gray-800">
                                <Save className="h-4 w-4 mr-2" />
                                Update Password
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

