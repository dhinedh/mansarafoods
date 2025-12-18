import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Profile } from '../types/database';
import { mockAdminUser, mockCustomerUser } from '../data/mockData';

interface User {
  id: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string, phone: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('mansara_user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setProfile(userData.profile);
    }
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    if (email === 'admin@mansarafoods.com' && password === 'admin123') {
      const userData = {
        id: mockAdminUser.id,
        email: mockAdminUser.email,
        profile: mockAdminUser
      };
      localStorage.setItem('mansara_user', JSON.stringify(userData));
      setUser({ id: userData.id, email: userData.email });
      setProfile(mockAdminUser);
    } else if (email === 'customer@example.com' && password === 'customer123') {
      const userData = {
        id: mockCustomerUser.id,
        email: mockCustomerUser.email,
        profile: mockCustomerUser
      };
      localStorage.setItem('mansara_user', JSON.stringify(userData));
      setUser({ id: userData.id, email: userData.email });
      setProfile(mockCustomerUser);
    } else {
      throw new Error('Invalid email or password. Try: customer@example.com / customer123 or admin@mansarafoods.com / admin123');
    }
  };

  const signUp = async (email: string, password: string, fullName: string, phone: string) => {
    const newUser: Profile = {
      id: 'user-' + Date.now(),
      email,
      full_name: fullName,
      phone,
      is_admin: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    const userData = {
      id: newUser.id,
      email: newUser.email,
      profile: newUser
    };

    localStorage.setItem('mansara_user', JSON.stringify(userData));
    setUser({ id: userData.id, email: userData.email });
    setProfile(newUser);
  };

  const signOut = async () => {
    localStorage.removeItem('mansara_user');
    setUser(null);
    setProfile(null);
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user || !profile) return;

    const updatedProfile = {
      ...profile,
      ...updates,
      updated_at: new Date().toISOString()
    };

    const userData = {
      id: user.id,
      email: user.email,
      profile: updatedProfile
    };

    localStorage.setItem('mansara_user', JSON.stringify(userData));
    setProfile(updatedProfile);
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, signIn, signUp, signOut, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
