import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
// const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';

const supabaseUrl = 'https://khagimhahmqobusbsdyy.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtoYWdpbWhhaG1xb2J1c2JzZHl5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc4NjgxNzIsImV4cCI6MjA0MzQ0NDE3Mn0.9s6NiiMIJxH-hZp2kSI4udew-rKlxGmRVW-eSkeeRFk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
