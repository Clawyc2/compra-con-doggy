import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Tipos para la tabla de usuarios
export interface DoggyUser {
  id: string;
  privy_did: string;
  email: string;
  name: string;
  avatar_url?: string;
  wallet_address?: string;
  created_at: string;
  updated_at: string;
}

// Función para crear/obtener usuario en Supabase
export async function getOrCreateUser(
  privyDid: string,
  email: string,
  name: string,
  avatarUrl?: string
): Promise<DoggyUser | null> {
  try {
    // Primero verificar si el usuario ya existe
    const { data: existingUser, error: fetchError } = await supabase
      .from('doggy_users')
      .select('*')
      .eq('privy_did', privyDid)
      .single();

    if (existingUser) {
      return existingUser;
    }

    // Si no existe, crear nuevo usuario
    const { data: newUser, error: insertError } = await supabase
      .from('doggy_users')
      .insert({
        privy_did: privyDid,
        email,
        name,
        avatar_url: avatarUrl || null,
      })
      .select()
      .single();

    if (insertError) {
      console.error('Error creating user:', insertError);
      return null;
    }

    return newUser;
  } catch (error) {
    console.error('Error in getOrCreateUser:', error);
    return null;
  }
}

// Verificar si usuario existe por privy_did
export async function checkUserExists(privyDid: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('doggy_users')
      .select('id')
      .eq('privy_did', privyDid)
      .single();

    return !!data;
  } catch {
    return false;
  }
}
