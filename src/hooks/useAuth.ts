import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { User, Role } from '../types';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export const useAuth = () => {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    // Verificar sesión actual
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        setState(prev => ({ ...prev, error: error.message, loading: false }));
        return;
      }

      if (session?.user) {
        fetchUser(session.user.id);
      } else {
        setState(prev => ({ ...prev, loading: false }));
      }
    });

    // Suscribirse a cambios en la autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          fetchUser(session.user.id);
        } else {
          setState(prev => ({ ...prev, user: null, loading: false }));
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchUser = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;

      setState(prev => ({
        ...prev,
        user: data as User,
        loading: false,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Error al cargar usuario',
        loading: false,
      }));
    }
  };

  const signIn = async (email: string, password: string) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Error al iniciar sesión',
        loading: false,
      }));
      throw error;
    }
  };

  const signUp = async (
    email: string,
    password: string,
    userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>
  ) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error('No se pudo crear el usuario');

      const { error: profileError } = await supabase.from('users').insert([
        {
          id: authData.user.id,
          email,
          ...userData,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ]);

      if (profileError) throw profileError;
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Error al registrar usuario',
        loading: false,
      }));
      throw error;
    }
  };

  const signOut = async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Error al cerrar sesión',
        loading: false,
      }));
      throw error;
    }
  };

  return {
    user: state.user,
    loading: state.loading,
    error: state.error,
    signIn,
    signUp,
    signOut,
  };
}; 