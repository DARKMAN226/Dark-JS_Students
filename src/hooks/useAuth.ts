import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);

      // Handle email confirmation
      if (event === 'SIGNED_IN' && session?.user) {
        console.log('User signed in:', session.user.email);
        
        // Create or update user profile if it doesn't exist
        const { error: profileError } = await supabase
          .from('user_profiles')
          .upsert({
            user_id: session.user.id,
            full_name: session.user.user_metadata?.full_name || '',
            avatar_url: session.user.user_metadata?.avatar_url || null,
            updated_at: new Date().toISOString(),
          }, {
            onConflict: 'user_id'
          });

        if (profileError) {
          console.error('Error creating/updating profile:', profileError);
        }
      }

      // Handle user updates (like avatar changes)
      if (event === 'USER_UPDATED' && session?.user) {
        console.log('User updated:', session.user.user_metadata);
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, fullName: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
        emailRedirectTo: `${window.location.origin}/auth/callback`
      },
    });

    if (error) throw error;

    // Create user profile (will be created/updated on email confirmation)
    if (data.user) {
      const { error: profileError } = await supabase
        .from('user_profiles')
        .insert({
          user_id: data.user.id,
          full_name: fullName,
        });

      // Don't throw error if profile already exists
      if (profileError && !profileError.message.includes('duplicate key')) {
        console.error('Profile creation error:', profileError);
      }
    }

    return data;
  };

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return data;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const resendConfirmation = async (email: string) => {
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`
      }
    });

    if (error) throw error;
  };

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });

    if (error) throw error;
  };

  const updateUserMetadata = async (metadata: any) => {
    const { data, error } = await supabase.auth.updateUser({
      data: metadata
    });

    if (error) throw error;
    
    // Force refresh user data
    const { data: { user: updatedUser } } = await supabase.auth.getUser();
    if (updatedUser) {
      setUser(updatedUser);
    }
    
    return data;
  };

  const refreshUser = async () => {
    const { data: { user: refreshedUser } } = await supabase.auth.getUser();
    if (refreshedUser) {
      setUser(refreshedUser);
    }
    return refreshedUser;
  };

  return {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    resendConfirmation,
    resetPassword,
    updateUserMetadata,
    refreshUser,
  };
}