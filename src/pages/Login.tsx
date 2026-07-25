import React, { useState } from 'react';
import { Lock, Mail, Zap, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useWebsite } from '../context/WebsiteContext';
import { useToast } from '../context/ToastContext';
import { PageTab } from '../components/Header';

interface Props {
  setActiveTab: (tab: PageTab) => void;
}

export const LoginPage: React.FC<Props> = ({ setActiveTab }) => {
  const { login } = useAuth();
  const { settings } = useWebsite();
  const { showToast } = useToast();

  // Start with empty fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      showToast(
        'Missing Information',
        'Please enter your email and password.',
        'error'
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const success = await login(email, password);

      if (success) {
        showToast(
          'Login Successful',
          'Welcome to the Admin Dashboard.',
          'success'
        );
        setActiveTab('admin');
      } else {
        showToast(
          'Authentication Failed',
          'Incorrect email or password.',
          'error'
        );
      }
    } catch (error) {
      console.error(error);

      showToast(
        'Login Error',
        'Unable to sign in. Please try again.',
        'error'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-200 p-8">

        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 p-0.5">
            <div className="w-full h-full bg-slate-950 rounded-2xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-blue-400" />
            </div>
          </div>

          <p className="mt-4 text-xs uppercase tracking-widest font-bold text-blue-600">
            {settings.powered_by}
          </p>

          <h1 className="mt-2 text-2xl font-black text-slate-900">
            Admin Control Portal
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Sign in using your administrator account.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">
              Email Address
            </label>

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

              <input
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">
              Password
            </label>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

              <input
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition disabled:opacity-60"
          >
            {isSubmitting ? 'Signing In...' : 'Sign In'}
            <ArrowRight className="w-4 h-4" />
          </button>

        </form>

      </div>
    </div>
  );
};