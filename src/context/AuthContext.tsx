import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { UserProfile } from '../types';
import { getSupabase } from '../supabase/client';

interface AuthContextType {
  user: UserProfile | null;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('dol_auth_user');

    if (!saved) return null;

    try {
      return JSON.parse(saved);
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('dol_auth_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('dol_auth_user');
    }
  }, [user]);

  const login = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    const supabase = getSupabase();

    if (!supabase) {
      console.error('Supabase client is not configured.');
      return false;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error || !data.user) {
        console.error(error?.message);
        return false;
      }

      const authUser: UserProfile = {
        id: data.user.id,
        name:
          data.user.user_metadata?.name ||
          data.user.email?.split('@')[0] ||
          'Administrator',
        email: data.user.email || email,
        phone: data.user.user_metadata?.phone || '',
        role: 'admin',
        created_at:
          data.user.created_at || new Date().toISOString(),
      };

      setUser(authUser);

      return true;
    } catch (err) {
      console.error('Login Error:', err);
      return false;
    }
  };

  const logout = async () => {
    const supabase = getSupabase();

    if (supabase) {
      await supabase.auth.signOut();
    }

    localStorage.removeItem('dol_auth_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin: user?.role === 'admin',
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
};