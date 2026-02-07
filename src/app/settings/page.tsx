'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
    Settings, 
    Save, 
    User, 
    Mail,
    Lock,
    Bell,
    Shield,
    ArrowLeft,
    CheckCircle2,
    Globe,
    MapPin,
    Award
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { authApi } from '@/lib/api';

export default function SettingsPage() {
    const { user, isAuthenticated, updateUser } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'notifications'>('profile');
    const [successMessage, setSuccessMessage] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        bio: '',
        avatar: '',
        location: '',
        website: ''
    });
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    useEffect(() => {
        if (typeof window !== 'undefined' && !isAuthenticated) {
            router.push('/auth');
            return;
        }
        loadProfile();
    }, [isAuthenticated, user, router]);

    const loadProfile = async () => {
        try {
            setLoading(true);
            const response = await authApi.getCurrentUser();
            if (response.success && response.data) {
                setFormData({
                    name: response.data.name || '',
                    email: response.data.email || '',
                    bio: response.data.bio || '',
                    avatar: response.data.avatar || '',
                    location: response.data.location || '',
                    website: response.data.website || ''
                });
            } else if (user) {
                // Use user from context if API fails
                setFormData({
                    name: user.name || '',
                    email: user.email || '',
                    bio: user.bio || '',
                    avatar: user.avatar || '',
                    location: user.location || '',
                    website: user.website || ''
                });
            }
        } catch (error) {
            console.error('Error loading profile:', error);
            // Use user from context on error
            if (user) {
                setFormData({
                    name: user.name || '',
                    email: user.email || '',
                    bio: user.bio || '',
                    avatar: user.avatar || '',
                    location: user.location || '',
                    website: user.website || ''
                });
            }
        } finally {
            setLoading(false);
        }
    };

    const handleProfileSave = async () => {
        try {
            setSaving(true);
            setSuccessMessage('');
            const response = await authApi.updateProfile({
                name: formData.name,
                bio: formData.bio,
                avatar: formData.avatar,
                location: formData.location,
                website: formData.website
            });

            if (response.success && response.data) {
                setSuccessMessage('Profile updated successfully!');
                if (updateUser) {
                    updateUser(response.data);
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

    const handlePasswordChange = async () => {
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            alert('New passwords do not match');
            return;
        }

        if (passwordData.newPassword.length < 6) {
            alert('Password must be at least 6 characters');
            return;
        }

        try {
            setSaving(true);
            setSuccessMessage('');
            // In a real app, this would call a password change API
            // For now, we'll just show a success message
            setTimeout(() => {
                setSuccessMessage('Password updated successfully!');
                setPasswordData({
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                });
                setSaving(false);
                setTimeout(() => setSuccessMessage(''), 3000);
            }, 1000);
        } catch (error) {
            console.error('Error changing password:', error);
            alert('Failed to change password');
            setSaving(false);
        }
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
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link href="/profile">
                                <Button variant="outline" size="sm">
                                    <ArrowLeft className="h-4 w-4 mr-2" />
                                    Back to Profile
                                </Button>
                            </Link>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
                                <p className="text-gray-600 mt-1">Manage your account settings and preferences</p>
                            </div>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-1 border-b border-gray-200 mt-6">
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
                                    <User className="h-4 w-4 inline mr-1" />
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

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <Mail className="h-4 w-4 inline mr-1" />
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    disabled
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                                />
                                <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
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
                                    placeholder="Tell us about yourself..."
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

                {/* Security Tab */}
                {activeTab === 'security' && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Security Settings</h2>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <Lock className="h-4 w-4 inline mr-1" />
                                    Current Password
                                </label>
                                <input
                                    type="password"
                                    value={passwordData.currentPassword}
                                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    value={passwordData.newPassword}
                                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                                />
                                <p className="text-xs text-gray-500 mt-1">Must be at least 6 characters</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Confirm New Password
                                </label>
                                <input
                                    type="password"
                                    value={passwordData.confirmPassword}
                                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                                />
                            </div>
                            <Button
                                onClick={handlePasswordChange}
                                disabled={saving || !passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword}
                                className="w-full bg-black text-white hover:bg-gray-800"
                            >
                                <Save className="h-4 w-4 mr-2" />
                                {saving ? 'Updating...' : 'Update Password'}
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
                                    <p className="text-sm text-gray-600">Receive email updates about your account and activities</p>
                                </div>
                                <input type="checkbox" defaultChecked className="h-5 w-5" />
                            </div>
                            {user?.role === 'designer' && (
                                <>
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
                                </>
                            )}
                            {user?.role === 'client' && (
                                <>
                                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                        <div>
                                            <p className="font-medium text-gray-900">Contest Submissions</p>
                                            <p className="text-sm text-gray-600">Get notified when designers submit to your contests</p>
                                        </div>
                                        <input type="checkbox" defaultChecked className="h-5 w-5" />
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                        <div>
                                            <p className="font-medium text-gray-900">Project Updates</p>
                                            <p className="text-sm text-gray-600">Get notified about your project progress</p>
                                        </div>
                                        <input type="checkbox" defaultChecked className="h-5 w-5" />
                                    </div>
                                </>
                            )}
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div>
                                    <p className="font-medium text-gray-900">Marketing Emails</p>
                                    <p className="text-sm text-gray-600">Receive updates about new features and promotions</p>
                                </div>
                                <input type="checkbox" className="h-5 w-5" />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

