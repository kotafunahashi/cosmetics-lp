'use client';

import { useEffect, useState } from 'react';
import { fetchProfile } from '@/app/lib/fetchData';
import { fetchWeatherForecast } from '@/app/lib/weatherData'; // 相対パスに修正

export default function LpPage({ params }: { params: Promise<{ id: string }> }) {
  const [profile, setProfile] = useState<any>(null);
  const [id, setId] = useState<string | null>(null);
  const [recommendation, setRecommendation] = useState<string | null>(null); // おすすめ商品

  useEffect(() => {
    const unwrapParams = async () => {
      const resolvedParams = await params;
      setId(resolvedParams.id);
    };
    unwrapParams();
  }, [params]);

  useEffect(() => {
    if (id) {
      const getProfile = async () => {
        const data = await fetchProfile(id);
        setProfile(data);
      };
      getProfile();
    }
  }, [id]);

  useEffect(() => {
    const getWeatherAndRecommendation = async () => {
      const weatherData = await fetchWeatherForecast(); // 天気予報を取得
      const rainDays = weatherData.filter((day: any) => day.weather === 'rain'); // 雨の日を抽出

      if (rainDays.length > 0) {
        const twoDaysBeforeRain = rainDays.map((day: any) => {
          const date = new Date(day.date);
          date.setDate(date.getDate() - 2); // 雨の日の2日前を計算
          return date.toISOString().split('T')[0]; // YYYY-MM-DD形式に変換
        });

        // ロジックに基づいておすすめ商品を設定
        if (twoDaysBeforeRain.includes(new Date().toISOString().split('T')[0])) {
          setRecommendation('雨の日の2日前におすすめの化粧品はこちら！');
        }
      }
    };
    getWeatherAndRecommendation();
  }, []);

  if (!profile) return <div>Loading...</div>;

  return (
    <div>
      <h1>{profile.name}さん、こんにちは。</h1>
      <p>最近購入した化粧品: {profile.recent_product}</p>
      <p>年齢: {profile.age}</p>
      <p>おすすめ商品: {recommendation || 'おすすめ商品はありません。'}</p>
    </div>
  );
}
