const API_KEY = 'c3b196ea134de1770d9c29f8dd9ea354'; // OpenWeatherMapのAPIキーをここに設定
const CITY = 'Tokyo'; // 天気を取得する都市名
const API_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${CITY}&appid=${API_KEY}&units=metric&lang=ja`;

export async function fetchWeatherForecast() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('天気予報データの取得に失敗しました');
    }
    const data = await response.json();

    // 必要なデータを整形して返す
    return data.list.map((item: any) => ({
      date: item.dt_txt.split(' ')[0], // 日付部分を抽出
      weather: item.weather[0].main.toLowerCase(), // 天気情報（例: 'rain', 'clouds'）
    }));
  } catch (error) {
    console.error('天気予報の取得中にエラーが発生しました:', error);
    return [];
  }
}
