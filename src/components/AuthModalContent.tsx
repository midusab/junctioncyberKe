import { useState, useEffect, type FormEvent } from 'react';
import { motion } from 'motion/react';
import { supabase } from '../lib/supabase';
import { LogIn, UserPlus, Facebook, Chrome, Eye, EyeOff, User, Lock, Mail, MapPin, RefreshCw } from 'lucide-react';
import { toast } from 'react-toastify';
import LoadingSpinner from './LoadingSpinner';

interface AuthModalProps {
  onClose: () => void;
}

export default function AuthModal({ onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [location, setLocation] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validatePassword = (pass: string) => {
    if (pass.length < 8) return 'Password must be at least 8 characters long';
    return null;
  };

  const handleAuth = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    // Simple validation for the requested admin password "123@junction"
    const passError = validatePassword(password);
    if (!isLogin && passError) {
      setError(passError);
      setLoading(false);
      return;
    }

    try {
      if (isLogin) {
        const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
        if (signInError) throw signInError;
      } else {
        const { data, error: signUpError } = await supabase.auth.signUp({ 
          email, 
          password,
          options: {
            data: {
              full_name: fullName || 'Anonymous Driver',
              location: location
            }
          }
        });
        if (signUpError) throw signUpError;
        if (data.user) {
          // Create profile record
          const { error: profileError } = await supabase.from('profiles').upsert({
            id: data.user.id,
            full_name: fullName,
            address: location,
            updated_at: new Date().toISOString(),
          });
          if (profileError) console.error('Profile creation error:', profileError);
        }
        toast.success('Registration successful!');
      }
      onClose();
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleOAuth = async (provider: 'google' | 'facebook') => {
    try {
      const { error: oauthError } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: window.location.origin,
        },
      });
      if (oauthError) throw oauthError;
    } catch (err: any) {
      setError(err.message || `${provider} login failed`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-4 p-1 glass-card border-black/5 bg-black/5 rounded-2xl mb-8">
        <button 
          onClick={() => { setIsLogin(true); setError(null); }}
          className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all ${isLogin ? 'bg-white text-brand-blue shadow-md' : 'text-black/40'}`}
        >
          Sign In
        </button>
        <button 
          onClick={() => { setIsLogin(false); setError(null); }}
          className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all ${!isLogin ? 'bg-white text-brand-blue shadow-md' : 'text-black/40'}`}
        >
          Register
        </button>
      </div>

      {error && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-sm font-medium"
        >
          {error}
        </motion.div>
      )}

      <form onSubmit={handleAuth} className="space-y-4">
        {!isLogin && (
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-2">Full Name</label>
            <div className="relative">
              <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-black/20" />
              <input 
                type="text" 
                placeholder="e.g. Juction Admin"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required={!isLogin}
                className="w-full pl-12 pr-4 py-4 rounded-2xl border-transparent bg-black/5 outline-none focus:bg-white focus:ring-2 focus:ring-brand-blue/20 transition-all font-medium" 
              />
            </div>
          </div>
        )}
        {!isLogin && (
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-2">Location / City</label>
            <div className="relative">
              <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-black/20" />
              <input 
                type="text" 
                placeholder="e.g. Karen, Nairobi"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required={!isLogin}
                className="w-full pl-12 pr-4 py-4 rounded-2xl border-transparent bg-black/5 outline-none focus:bg-white focus:ring-2 focus:ring-brand-blue/20 transition-all font-medium" 
              />
            </div>
          </div>
        )}
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-2">Email Address</label>
          <div className="relative">
            <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-black/20" />
            <input 
              type="email" 
              placeholder="admin@junction.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
              className="w-full pl-12 pr-4 py-4 rounded-2xl border-transparent bg-black/5 outline-none focus:bg-white focus:ring-2 focus:ring-brand-blue/20 transition-all font-medium" 
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-2">Password</label>
          <div className="relative">
            <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-black/20" />
            <input 
              type={showPassword ? 'text' : 'password'} 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
              className="w-full pl-12 pr-12 py-4 rounded-2xl border-transparent bg-black/5 outline-none focus:bg-white focus:ring-2 focus:ring-brand-blue/20 transition-all font-medium" 
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-black/30 hover:text-brand-blue transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="btn-primary w-full mt-4 h-16 flex items-center justify-center"
        >
          {loading ? (
            <div className="scale-50">
              <LoadingSpinner />
            </div>
          ) : (
            <div className="flex items-center gap-2">
              {isLogin ? <LogIn size={20} /> : <UserPlus size={20} />}
              <span>{isLogin ? 'Log In' : 'Register'}</span>
            </div>
          )}
        </button>
      </form>

      <div className="relative py-4">
        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-black/5"></div></div>
        <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-black/30">Or continue with</span></div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button 
          onClick={() => handleOAuth('facebook')}
          className="flex items-center justify-center gap-2 rounded-2xl border border-black/5 py-3 hover:bg-black/5 transition-all font-semibold"
        >
          <Facebook size={18} className="text-[#1877F2]" /> Facebook
        </button>
        <button 
          onClick={() => handleOAuth('google')}
          className="flex items-center justify-center gap-2 rounded-2xl border border-black/5 py-3 hover:bg-black/5 transition-all font-semibold"
        >
          <Chrome size={18} /> Google
        </button>
      </div>
    </div>
  );
}
