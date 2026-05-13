import supabase from "./supabase";

export async function login(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw new Error(error.message);
  return data;
}

export async function getCurrentUser() {
  const { data } = await supabase.auth.getSession();
  if (!data.session) return null;

  const { data: userData, error } = await supabase.auth.getUser();
  if (error) throw new Error(error.message);

  return userData?.user;
}

export async function logOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}
