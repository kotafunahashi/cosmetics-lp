import { fetchAllUsers } from '@/app/lib/fetchData';
import Link from 'next/link';

export default async function AllUsersLPPage() {
  // 全ユーザー取得
  const profiles = await fetchAllUsers();

  if (!profiles || profiles.length === 0) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold">ユーザーが見つかりません</h1>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">ユーザーリスト</h1>
      <ul className="space-y-4">
        {profiles.map((profile) => (
          <li key={profile.id} className="border p-4 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold">{profile.name}</h2>
            <Link
              href={`/lp/${profile.id}`}
              className="text-blue-500 hover:underline"
            >
              {profile.name} さんのおすすめ商品を見る
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
