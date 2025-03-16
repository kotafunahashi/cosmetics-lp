import { supabase } from './supabase';

// プロフィールデータを取得する関数
export async function fetchProfile(id: string) {
  const { data, error } = await supabase
    .from('profiles')  // ✅ テーブル名を profiles に変更
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching profile:', error);
    return null;
  }

  return data;
}

// 全ユーザーを取得する関数
export async function fetchAllUsers() {
  const { data, error } = await supabase.from('profiles').select('*');

  if (error) {
    console.error('Error fetching all profile:', error);
    return [];
  }
  return data;
}