"use client";
import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

// --- Global Constants and Styling ---
const BG_COLOR = '#f8f8f8'; // Light background color
const DARK_COLOR = '#131313'; // Dark text and primary button color
const RED_COLOR = '#ef4444'; // Red for validation messages
const GREEN_COLOR = '#10B981'; // Tailwind's emerald/green for met requirements

// --- Official Brand Social Icons (Perfect Structure & Brand Guidelines) ---

// 1. Google Official Multi-color 'G' Logo (Brand Colors: Blue #4285F4, Green #34A853, Yellow #FBBC05, Red #EA4335)
const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);

// 2. Facebook Official Blue 'f' Logo (Brand Color: #1877F2)
const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fill="#1877F2"
      d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
    />
  </svg>
);

// 3. Apple Official Bitten Apple Logo (Brand Color: Black #000000)
const AppleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fill="#000000"
      d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"
    />
  </svg>
);


// Helper component for social login buttons
const SocialButton = ({ icon: Icon, text }: { icon: React.FC<React.SVGProps<SVGSVGElement>>; text: string }) => (
  <button
    // The hover:border-black ensures the button follows the monochrome style when interacted with
    className="flex items-center justify-center w-full py-3 px-4 mb-4 border border-gray-300 rounded-lg text-sm transition-all duration-200 bg-white shadow-sm hover:border-black"
    style={{ color: DARK_COLOR }}
  >
    <Icon className="w-5 h-5 mr-3" />
    {text}
  </button>
);

// --- Password Validation Logic ---
// Note: Backend requires minimum 6 characters, frontend enforces stronger validation for better security
const validatePassword = (password: string) => ({
  isMinLength: password.length >= 6, // Backend minimum
  isUppercase: /[A-Z]/.test(password),
  isLowercase: /[a-z]/.test(password),
  isNumber: /[0-9]/.test(password),
});

// --- Validation Requirement Display Component (Updated color logic) ---
const ValidationRequirement = ({ isValid, text }: { isValid: boolean; text: string }) => (
  // Use GREEN_COLOR for met, RED_COLOR for missing
  <p className="flex items-center text-xs" style={{ color: isValid ? GREEN_COLOR : RED_COLOR }}>
    {isValid ? (
      // Checkmark icon (Green when valid)
      <svg className="w-3 h-3 mr-2 fill-current" viewBox="0 0 20 20">
        <path d="M7.629 14.571l-3.3-3.3a.5.5 0 010-.707l.707-.707a.5.5 0 01.707 0l2.593 2.593 5.973-5.973a.5.5 0 01.707 0l.707.707a.5.5 0 010 .707l-6.68 6.68a.5.5 0 01-.707 0z" />
      </svg>
    ) : (
      // Simple dot visual for 'missing'
      <svg className="w-3 h-3 mr-2 fill-current" viewBox="0 0 20 20">
        <circle cx="10" cy="10" r="2.5" />
      </svg>
    )}
    {text}
  </p>
);

// =========================================================================
// --- SIGN UP FORM COMPONENT ---
// =========================================================================
const SignUpForm = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  const { register } = useAuth();
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<'designer' | 'client' | null>(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [validation, setValidation] = useState(validatePassword(''));
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check URL parameters for user type from onboarding
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const typeParam = params.get('type');
      if (typeParam === 'designer' || typeParam === 'client') {
        setUserType(typeParam);
      }
    }
  }, []);

  // Update validation status whenever password changes
  useEffect(() => {
    setValidation(validatePassword(password));
  }, [password]);

  // Check if all necessary fields are filled (not including password validation)
  const isBasicFormFilled = firstName && lastName && email && password && userType;
  const isPasswordValid = Object.values(validation).every(v => v);
  const isFormValid = isBasicFormFilled && isPasswordValid;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setError(null);
    
    if (isFormValid) {
      setLoading(true);
      try {
        const fullName = `${firstName} ${lastName}`.trim();
        const result = await register(fullName, email, password, userType || undefined);
        
        if (result.success) {
          // Success - redirect based on user role
          const storedUser = localStorage.getItem('user');
          if (storedUser) {
            const user = JSON.parse(storedUser);
            if (user.role === 'designer') {
              router.push('/designer/dashboard');
            } else if (user.role === 'client') {
              router.push('/client/dashboard');
            } else if (user.role === 'admin' || user.role === 'moderator') {
              router.push('/adminpanel');
            } else {
              router.push('/');
            }
          } else {
            router.push('/');
          }
        } else {
          setError(result.error || 'Registration failed. Please try again.');
        }
      } catch (err) {
        setError('An unexpected error occurred. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-semibold mb-6 text-center" style={{ color: DARK_COLOR }}>Sign Up</h2>

      {/* Social Login Buttons (Using corrected colored icons) */}
      <SocialButton icon={GoogleIcon} text="Continue with Google" />
      <SocialButton icon={FacebookIcon} text="Continue with Facebook" />
      <SocialButton icon={AppleIcon} text="Continue with Apple" />

      <div className="flex items-center my-6">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="flex-shrink mx-4 text-gray-500 text-sm">Or, create an account with email.</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      {/* User Type Selection */}
      <div className="mb-6">
        <label className="text-sm font-medium block mb-3" style={{ color: DARK_COLOR }}>
          I am a...
        </label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setUserType('designer')}
            className={`py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200 border-2 ${
              userType === 'designer'
                ? 'border-black bg-black text-white'
                : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
            }`}
          >
            I'm a Designer
          </button>
          <button
            type="button"
            onClick={() => setUserType('client')}
            className={`py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200 border-2 ${
              userType === 'client'
                ? 'border-black bg-black text-white'
                : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
            }`}
          >
            I Need Something Designed
          </button>
        </div>
        {submitted && !userType && (
          <p className="text-xs mt-2" style={{ color: RED_COLOR }}>
            Please select your account type
          </p>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Name Fields */}
        <div className="flex space-x-4 mb-4">
          <div className="flex-1">
            <label className="text-sm font-medium block mb-2" style={{ color: DARK_COLOR }}>
              First Name
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className={`w-full py-2 border-b-2 bg-transparent focus:outline-none focus:border-black ${submitted && !firstName ? 'border-red-500' : 'border-gray-300'}`}
              style={{ color: DARK_COLOR }}
            />
          </div>
          <div className="flex-1">
            <label className="text-sm font-medium block mb-2" style={{ color: DARK_COLOR }}>
              Last Name
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className={`w-full py-2 border-b-2 bg-transparent focus:outline-none focus:border-black ${submitted && !lastName ? 'border-red-500' : 'border-gray-300'}`}
              style={{ color: DARK_COLOR }}
            />
          </div>
        </div>

        {/* Email Address */}
        <div className="mb-4">
          <label className="text-sm font-medium block mb-2" style={{ color: DARK_COLOR }}>
            Email Address
          </label>
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              className={`w-full py-2 border-b-2 bg-transparent focus:outline-none focus:border-black ${submitted && !email ? 'border-red-500' : 'border-gray-300'}`}
              style={{ color: DARK_COLOR }}
            />
          </div>
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="text-sm font-medium block mb-2" style={{ color: DARK_COLOR }}>
            Password
          </label>
          <div className="relative">
            <input
              type={isPasswordVisible ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full py-2 border-b-2 bg-transparent focus:outline-none focus:border-black ${submitted && password.length > 0 && !isPasswordValid ? 'border-red-500' : 'border-gray-300'}`}
              style={{ color: DARK_COLOR }}
            />
            <button
              type="button"
              className="absolute right-0 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-black transition-colors"
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            >
              {isPasswordVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Password Validation Requirements (Visible if typing) */}
        {password.length > 0 && (
          <div className="grid grid-cols-2 gap-y-2 text-xs mb-6">
            <ValidationRequirement isValid={validation.isMinLength} text="6 characters minimum" />
            <ValidationRequirement isValid={validation.isUppercase} text="1 uppercase letter" />
            <ValidationRequirement isValid={validation.isLowercase} text="1 lowercase letter" />
            <ValidationRequirement isValid={validation.isNumber} text="1 number" />
          </div>
        )}
        {password.length === 0 && <div className="h-10 mb-6"></div>}


        {/* Terms and Conditions */}
        <p className="text-xs text-gray-600 mb-6">
          By clicking below, you agree to our Special Graphics <span className="underline cursor-pointer">Terms and Conditions</span> and acknowledge our <span className="underline cursor-pointer">Privacy and Cookie Policy</span>.
        </p>

        {/* Create Account Button */}
        <button
          type="submit"
          disabled={!isFormValid || loading}
          className={`w-full py-3 rounded-lg text-sm font-medium transition-opacity duration-200 flex items-center justify-center ${!isFormValid || loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          style={{ backgroundColor: DARK_COLOR, color: 'white' }}
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Creating account...
            </>
          ) : (
            'Create an account'
          )}
        </button>
      </form>

      {/* Sign In Link */}
      <p className="text-center text-sm mt-6 text-gray-700"> {/* <--- Added text-gray-700 here */}
        Already have an account?{' '}
        <button className="text-sm font-medium underline" onClick={() => onNavigate('signin')} style={{ color: DARK_COLOR }}>
          Sign In
        </button>
      </p>
    </div>
  );
};

// =========================================================================
// --- SIGN IN FORM COMPONENT ---
// =========================================================================
const SignInForm = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isFormValid = email && password;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setError(null);
    
    if (isFormValid) {
      setLoading(true);
      try {
        const result = await login(email, password);
        
        if (result.success) {
          // Redirect based on user role
          const storedUser = localStorage.getItem('user');
          if (storedUser) {
            const user = JSON.parse(storedUser);
            if (user.role === 'designer') {
              router.push('/designer/dashboard');
            } else if (user.role === 'client') {
              router.push('/client/dashboard');
            } else if (user.role === 'admin' || user.role === 'moderator') {
              router.push('/adminpanel');
            } else {
              router.push('/');
            }
          } else {
            router.push('/');
          }
        } else {
          setError(result.error || 'Login failed. Please check your credentials.');
        }
      } catch (err) {
        setError('An unexpected error occurred. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-semibold mb-6 text-center" style={{ color: DARK_COLOR }}>Welcome Back</h2>

      {/* Social Login Buttons */}
      <SocialButton icon={GoogleIcon} text="Login with Google" />

      <div className="flex items-center my-6">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="flex-shrink mx-4 text-gray-500 text-sm">Or, sign in with email.</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Email Address */}
        <div className="mb-4">
          <label className="text-sm font-medium block mb-2" style={{ color: DARK_COLOR }}>
            Email Address
          </label>
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              className={`w-full py-2 border-b-2 bg-transparent focus:outline-none focus:border-black ${submitted && !email ? 'border-red-500' : 'border-gray-300'}`}
              style={{ color: DARK_COLOR }}
            />
          </div>
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="text-sm font-medium block mb-2" style={{ color: DARK_COLOR }}>
            Password
          </label>
          <div className="relative">
            <input
              type={isPasswordVisible ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full py-2 border-b-2 bg-transparent focus:outline-none focus:border-black ${submitted && !password ? 'border-red-500' : 'border-gray-300'}`}
              style={{ color: DARK_COLOR }}
            />
            <button
              type="button"
              className="absolute right-0 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-black transition-colors"
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            >
              {isPasswordVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Remember me and Forgot password */}
        <div className="flex justify-between items-center text-sm mb-6">
          <label className="flex items-center text-xs text-gray-600">
            <input type="checkbox" className="mr-2" />
            Remember me
          </label>
          <button type="button" className="text-xs underline text-gray-600 hover:text-black transition-colors">
            Forgot password?
          </button>
        </div>


        {/* Terms and Conditions */}
        <p className="text-xs text-gray-600 mb-6">
          By signing in, you agree to our Special Graphics <span className="underline cursor-pointer">Terms and Conditions</span> and acknowledge our <span className="underline cursor-pointer">Privacy and Cookie Policy</span>.
        </p>

        {/* Sign In Button (Outlined/Lightly Styled) */}
        <button
          type="submit"
          disabled={!isFormValid || loading}
          className={`w-full py-3 rounded-lg text-sm font-medium transition-all duration-200 border flex items-center justify-center ${!isFormValid || loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          style={{ borderColor: DARK_COLOR, color: DARK_COLOR, backgroundColor: 'white' }}
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Signing in...
            </>
          ) : (
            'Sign In'
          )}
        </button>
      </form>

      <div className="text-center text-sm my-4 text-gray-500">Or</div>

      {/* Create an account Button (Solid Black) */}
      <button
        type="button"
        className="w-full py-3 rounded-lg text-sm font-medium transition-opacity duration-200"
        onClick={() => onNavigate('signup')}
        style={{ backgroundColor: DARK_COLOR, color: 'white' }}
      >
        Create an account
      </button>
    </div>
  );
};

// =========================================================================
// --- MAIN APPLICATION ENTRY POINT (ROUTING LOGIC) ---
// =========================================================================
const App = () => {
  const { user, isAuthenticated, loading } = useAuth();
  const router = useRouter();

  // Check if coming from onboarding (has type parameter) - show signup
  const [page, setPage] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const typeParam = params.get('type');
      const modeParam = params.get('mode');
      if (typeParam || modeParam === 'register') {
        return 'signup';
      }
    }
    return 'signin';
  });

  // Redirect authenticated users away from auth page
  useEffect(() => {
    if (!loading && isAuthenticated && user) {
      if (user.role === 'designer') {
        router.push('/designer/dashboard');
      } else if (user.role === 'client') {
        router.push('/client/dashboard');
      } else if (user.role === 'admin' || user.role === 'moderator') {
        router.push('/adminpanel');
      } else {
        router.push('/');
      }
    }
  }, [user, isAuthenticated, loading, router]);

  // Load the custom font using a standard link element - still needed for text elements
  const fontLink = (
    <link
      key="dancing-script-font"
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&display=swap"
    />
  );

  // Show loading state or nothing while checking auth
  if (loading) {
    return (
      <>
        {fontLink}
        <div
          className="min-h-screen flex items-center justify-center p-4 sm:p-6"
          style={{ backgroundColor: BG_COLOR, fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
        >
          <div className="text-gray-600">Loading...</div>
        </div>
      </>
    );
  }

  // Don't render auth forms if user is already authenticated (redirect will happen)
  if (isAuthenticated && user) {
    return (
      <>
        {fontLink}
        <div
          className="min-h-screen flex items-center justify-center p-4 sm:p-6"
          style={{ backgroundColor: BG_COLOR, fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
        >
          <div className="text-gray-600">Redirecting...</div>
        </div>
      </>
    );
  }

  return (
    <>
      {fontLink}
      <div
        className="min-h-screen flex items-center justify-center p-4 sm:p-6"
        style={{ backgroundColor: BG_COLOR, fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}
      >
        <div
          className="w-full max-w-sm p-8 bg-white rounded-xl shadow-lg"
        >
          {/* Logo matching Header component style */}
          <div className="flex justify-center mb-8">
            <span className="text-xl md:text-2xl text-gray-900 tracking-tight">
              <span className="font-normal">Special</span>{' '}
              <span className="font-bold">Graphics</span>
            </span>
          </div>
          {page === 'signin' ? (
            <SignInForm onNavigate={setPage} />
          ) : (
            <SignUpForm onNavigate={setPage} />
          )}
        </div>
      </div>
    </>
  );
};

export default App;
