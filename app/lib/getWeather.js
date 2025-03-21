export default async function getWeather() {
  const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
  const CITY = process.env.NEXT_PUBLIC_CITY;
  if (!API_KEY) {
    throw new Error('APIキーが見つかりません');
  }
  const API_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${CITY}&appid=${API_KEY}&units=metric&lang=ja`;

  
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('Failed to fetch weather');
  
    const data = await res.json();
    const forecast = data.list.slice(0, 8); // 2日分
    const isRainy = forecast.some((item) => item.weather[0].main === 'Rain');
  
    return { isRainy };
  }