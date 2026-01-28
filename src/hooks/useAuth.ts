import { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';

export interface UserProfile {
  id: string;
  user_type?: 'Inventor' | 'StartUp' | 'Company' | 'Investor';
  full_name: string;
  personal_email: string;
  photo_url?: string | null;
  cover_image_url?: string | null;
  country?: string | null;
  city?: string | null;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const mountedRef = useRef(true);
  const fetchingProfileRef = useRef(false);
  const signingOutRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    fetchingProfileRef.current = false;

    // Get initial session with error handling
    supabase.auth.getSession()
      .then(({ data: { session }, error }) => {
        if (!mountedRef.current) return;
        
        if (error) {
          console.error('Error getting session:', error);
          setLoading(false);
          return;
        }

        setUser(session?.user ?? null);
        if (session?.user) {
          fetchUserProfile(session.user.id, true);
        } else {
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error('Error getting session (catch):', error);
        if (mountedRef.current) {
          setLoading(false);
        }
      });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mountedRef.current) return;
      
      if (event === 'SIGNED_OUT' || !session) {
        setUser(null);
        setProfile(null);
        setLoading(false);
        fetchingProfileRef.current = false;
        return;
      }
      
      if (session?.user) {
        setUser(session.user);
        
        if (!fetchingProfileRef.current) {
          setLoading(true);
        }
        try {
          await fetchUserProfile(session.user.id, false);
        } catch (error) {
          console.error('Error in onAuthStateChange fetchUserProfile:', error);
          if (mountedRef.current) {
            setLoading(false);
            fetchingProfileRef.current = false;
          }
        }
      }
    });

    return () => {
      mountedRef.current = false;
      fetchingProfileRef.current = false;
      subscription.unsubscribe();
    };
  }, []);

  async function fetchUserProfile(userId: string, isInitialLoad: boolean = false) {
    if (fetchingProfileRef.current) return;

    try {
      fetchingProfileRef.current = true;
      
      if (!isInitialLoad) {
        setLoading(true);
      }

      if (!mountedRef.current) {
        fetchingProfileRef.current = false;
        return;
      }

      // Add timeout to profile fetch (5 seconds)
      const profileFetchPromise = supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      const timeoutPromise = new Promise<{ data: null; error: { message: string; code: string } }>((resolve) => {
        setTimeout(() => resolve({ data: null, error: { message: 'Profile fetch timeout', code: 'TIMEOUT' } }), 5000);
      });

      const result = await Promise.race([profileFetchPromise, timeoutPromise]);
      const { data, error } = result;

      if (error && error.code === 'TIMEOUT') {
        console.warn('Profile fetch timed out after 5s, continuing without profile');
      }

      if (error && error.code !== 'TIMEOUT') {
        console.error('Error fetching profile:', error);
      }
      
      if (mountedRef.current) {
        if (data) {
          setProfile(data);
        } else {
          setProfile(null);
        }
      }
    } catch (error) {
      console.error('Error fetching profile (catch):', error);
      if (mountedRef.current) {
        setProfile(null);
      }
    } finally {
      if (mountedRef.current) {
        setLoading(false);
      }
      fetchingProfileRef.current = false;
    }
  }

  const signOut = async () => {
    if (signingOutRef.current) return;

    signingOutRef.current = true;

    // Clear storage markers first so components that read from storage (legacy auth)
    // see the logged-out state on the next render, without waiting for async SDK calls.
    try {
      localStorage.removeItem('supabase.auth.token');
      localStorage.removeItem('user');
      sessionStorage.removeItem('authUser');
    } catch (storageError) {
      console.warn('Failed to clear storage:', storageError);
    }

    // Clear local UI state immediately.
    if (mountedRef.current) {
      setUser(null);
      setProfile(null);
      setLoading(false);
      fetchingProfileRef.current = false;
    }

    // Ensure Supabase internal session is cleared (prevents it from re-populating storage later).
    try {
      await supabase.auth.signOut({ scope: 'local' });
    } catch (error) {
      console.warn('Supabase signOut error (non-critical):', error);
    }

    signingOutRef.current = false;
  };

  return { user, profile, loading, signOut };
}
