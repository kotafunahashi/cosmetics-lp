'use client';

import { useEffect, useState } from 'react';
import { fetchProfile } from '@/app/lib/fetchData';

export default function LpPage({ params }: { params: { id: string } }) {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const getProfile = async () => {
      const data = await fetchProfile(params.id);
      setProfile(data);
    };
    getProfile();
  }, [params.id]);

  if (!profile) return <div>Loading...</div>;

  return (
    <div>
      <h1>Welcome, {profile.name}!</h1>
      <p>最近購入した化粧品: {profile.recent_product}</p>
      <p>年齢: {profile.age}</p>
      <p>おすすめ商品: {/* ここにおすすめ商品ロジックを書く */}</p>
    </div>
  );
}
