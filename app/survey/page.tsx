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
  const products = ["化粧水", "美容オイル", "美容パック", "クリーム"];

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
    
<div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form className="w-full max-w-lg space-y-6 rounded-lg bg-white p-8 shadow-lg">
        <h1 className="text-2xl font-bold text-gray-700">アンケート</h1>

        {/* 名前 */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            名前
          </label>
          <input
            id="name"
            type="text"
            required
            className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
          />
        </div>

        {/* 性別 */}
        <div>
          <label className="block text-sm font-medium mb-2">性別</label>
          <div className="space-y-2">
            {['女性', '男性', 'その他'].map((gender) => (
              <div key={gender} className="flex items-center">
                <input
                  type="radio"
                  id={gender}
                  name="gender"
                  value={gender}
                  className="mr-2"
                />
                <label htmlFor={gender}>{gender}</label>
              </div>
            ))}
          </div>
        </div>

        {/* 最近購入した化粧品 */}
        <div>
          <label className="block text-sm font-medium mb-2">最近購入した化粧品</label>
          <div className="space-y-2">
            {products.map((product) => (
              <div key={product} className="flex items-center">
                <input
                  type="radio"
                  id={product}
                  name="recentProduct"
                  value={product}
                  className="mr-2"
                />
                <label htmlFor={product}>{product}</label>
              </div>
            ))}
          </div>
        </div>

        {/* 送信ボタン */}
        <div className="text-right">
          <button
            type="submit"
            className="w-full rounded-md bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600 focus:outline-none"
          >
            送信
          </button>
        </div>
      </form>
    </div>
  );
}
