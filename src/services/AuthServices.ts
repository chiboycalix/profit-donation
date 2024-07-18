import { supabase } from "../lib/subapase";

export const register = async (
  email: string,
  password: string,
  fullName: string,
  phoneNumber?: string
) => {
  const { data, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });
  if (authError) throw authError;

  if (data.user) {
    const { error: insertError } = await supabase.from("users").insert({
      id: data.user.id,
      email,
      full_name: fullName,
      phone_number: phoneNumber || null,
    });

    if (insertError) throw insertError;
  }
};

export const signIn = async (email: string, password: string) => {
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
};
