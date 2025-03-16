'use client';
import { supabase } from '@/app/lib/supabase';
import { useState } from 'react';

export default function Survey() {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    gender: '',
    age: '',
    recent_purchase: '',
  });

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const { error } = await supabase.from('profiles').insert([formData]);

    if (error) {
      setMessage('エラーが発生しました: ' + error.message);
    } else {
      setMessage('送信完了！ありがとうございます✨');
      // フォームリセット
      setFormData({
        name: '',
        address: '',
        phone: '',
        email: '',
        gender: '',
        age: '',
        recent_purchase: '',
      });
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" placeholder="名前" value={formData.name} onChange={handleChange} required />
        <input name="address" placeholder="住所" value={formData.address} onChange={handleChange} required />
        <input name="phone" placeholder="電話番号" value={formData.phone} onChange={handleChange} required />
        <input name="email" placeholder="メールアドレス" value={formData.email} onChange={handleChange} required />
        <select name="gender" value={formData.gender} onChange={handleChange} required>
          <option value="">性別を選択</option>
          <option value="male">男性</option>
          <option value="female">女性</option>
        </select>
        <input name="age" type="number" placeholder="年齢" value={formData.age} onChange={handleChange} required />
        <select name="recent_purchase" value={formData.recent_purchase} onChange={handleChange} required>
          <option value="">最近購入した化粧品</option>
          <option value="化粧水">化粧水</option>
          <option value="美容オイル">美容オイル</option>
          <option value="美容パック">美容パック</option>
          <option value="クリーム">クリーム</option>
        </select>
        <button type="submit" disabled={loading} className="bg-blue-500 text-white p-2 rounded">
          {loading ? '送信中...' : '送信'}
        </button>
      </form>
      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
}
