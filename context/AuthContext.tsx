"use client";
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase, supabaseAdmin } from "@/utils/supabaseClient";

interface AuthContextType {
  user: User | null;
  signUp: (
    email: string,
    password: string,
    name: string,
    age: number | string
  ) => Promise<{ data: any; error: Error | null }>;
  signIn: (
    email: string,
    password: string
  ) => Promise<{ data: any; error: Error | null }>;
  signOut: () => Promise<{ error: Error | null }>;
  loading: boolean;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("userAuth must used inside auth provider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };
    getSession();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  const signUp = async (
    email: string,
    password: string,
    name: string,
    age: number | string
  ): Promise<{ data: any; error: Error | null }> => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw error;
      if (data.user) {
        const { error: insertError } = await supabaseAdmin
          .from("users")
          .insert([
            {
              id: data.user.id,
              name,
              age: parseInt(age as string, 10),
              email,
            },
          ]);
        if (insertError) throw insertError;
      }
      return { data, error: null };
    } catch (error: any) {
      return { data: null, error };
    }
  };
  const signIn = async (
    email: string,
    password: string
  ): Promise<{ data: any; error: Error | null }> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      return { data, error };
    } catch (error: any) {
      return { data: null, error };
    }
  };
  const signOut = async (): Promise<{ error: Error | null }> => {
    const { error } = await supabase.auth.signOut();
    return { error };
  };
  const value: AuthContextType = {
    user,
    signUp,
    signIn,
    signOut,
    loading,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
