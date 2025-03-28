import getWeather from '@/app/lib/getWeather';
import { SparklesIcon } from '@heroicons/react/24/solid'

async function fetchProducts() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/products.json`
  );
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}

export default async function LPPage(
  pageProps: { params: Promise<{ source: string }> } // params の型を Promise に変更
) {
  // params を await してから値を取り出す
  const { source } = await pageProps.params;

  let coverContent;
  if (source === "instagram") {
    coverContent = <img src="/images/cover.jpg" alt="Instagram Cover" />;
  } else if (source === "youtube") {
    coverContent = <img src="/images/cover2.jpg" alt="YouTube Cover" />;
  } else {
    coverContent = <img src="/images/cover3.jpg" alt="Default Cover" />;
  }

  const weather = await getWeather();
  const isRainy = weather.isRainy;
  const products = await fetchProducts();

  // 推奨商品は常に "recommend" を使う前提（products.json 内に 4 件用意）
  const recommendProducts = products.recommend;
  // 雨の日におすすめは "rainy"（雨の日の場合のみ表示）
  const rainyProducts = products.rainy;

  return (
    <>
      <header className="bg01">
        <div className="max-w-7xl mx-auto">
          <div className="md:flex items-center">
            <div className="flex-1 p-4">
              <h1 className="mb-10">ソフトブラシビューティ</h1>
              <p className="serif text-7xl mb-5">まもなく<br />発売開始</p>
              <p className="mb-10">最新のフェイシャルライン<br />「オゾニア」の発売を開始します。</p>
              <a href="#" className="btn bg-white font-bold py-2 px-4 rounded-full">ひと足先にチェックする</a>
            </div>
            <div className="flex-1">{coverContent}</div>
          </div>
        </div>
      </header>
      <main>
      <section id="newProduct" className="bg02">
            <div className="md:flex max-w-7xl mx-auto items-center">
                <div className="flex-1">
                    <a href=""><img src="/images/pic01.jpg" alt=""/></a>
                </div>
                <div className="flex-1 xs:p-4">
                    <h2 className="text-2xl">新商品のプレビュー</h2>
                    <div className="md:flex gap-10 items-center justify-between">
                        <div className="flex-1">
                            <p className="text-2xl serif">オゾニアは、軽い使用感で、確かな効果が感じられる敏感肌用のラインです。<br/>すべての製品に植物エキスとピュアな氷河の水を使用しており、自然な輝きを放ちます！</p>
                        </div>
                        <div>
                            <a href=""><img src="/images/pic02.jpg" alt=""/></a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section id="about" className="bg01">
            <div className="md:flex max-w-4xl mx-auto items-center justify-between">
                <div className="flex-1">
                    <dl className="mb-15">
                        <dt className="mb-2"><SparklesIcon className="size-6" /> オーガニック</dt>
                        <dd className="text-2xl serif">すべて<br/>天然成分</dd>
                    </dl>
                    <dl className="mb-15">
                        <dt className="mb-2"><SparklesIcon className="size-6" /> 優しい</dt>
                        <dd className="text-2xl serif">敏感肌でも<br/>安心</dd>
                    </dl>
                    <dl>
                        <dt className="mb-2"><SparklesIcon className="size-6" /> 効果</dt>
                        <dd className="text-2xl serif">臨床試験済み</dd>
                    </dl>
                </div>
                <div>
                    <a href=""><img src="/images/pic03.jpg" alt=""/></a>
                </div>
            </div>
        </section>
        <section id="feature" className="bg03">
            <div className="max-w-7xl mx-auto md:flex gap-10 items-center justify-between text-center pt-20 pb-20">
                <div className="bg-white">
                    <img src="/images/pic04.jpg" alt=""/>
                    <p className="serif p-3">新鮮な植物エキス</p>
                </div>
                <div className="bg-white">
                    <img src="/images/pic05.jpg" alt=""/>
                    <p className="serif p-3">純粋な氷河水</p>
                </div>
                <div className="bg-white">
                    <img src="/images/pic06.jpg" alt=""/>
                    <p className="serif p-3">ビタミンを豊富に配合</p>
                </div>
            </div>
        </section>
        <section id="product" className="bg02">
          <div className="max-w-7xl mx-auto text-center pt-20 pb-20">
            <h2 className="text-2xl mb-10">いち早く、オゾニアシリーズをご体験ください</h2>
            <ul className="md:flex gap-10 items-center justify-between mb-10">
              {recommendProducts.map((product: any) => (
                <li key={product.id}>
                  <a href={product.link}>
                    <img src={product.image} alt={product.name} className="mb-2" />
                  </a>
                  <h2 className="text-lg font-semibold serif">{product.name}</h2>
                  <p className="text-sm serif">{product.description}</p>
                </li>
              ))}
            </ul>
          {isRainy && (
            <>
            <h2 className="text-2xl pt-10 mb-10">雨の日におすすめ</h2>
            <ul className="md:flex gap-10 items-center justify-between mb-10">
                {rainyProducts.map((product: any) => (
                  <li key={product.id}>
                    <a href={product.link}>
                      <img src={product.image} alt={product.name} className="mb-2" />
                    </a>
                    <h2 className="text-lg font-semibold serif">{product.name}</h2>
                    <p className="text-sm serif">{product.description}</p>
                  </li>
                ))}
              </ul>)
            </>
            )}
            <a href="#" className="btn02 bg-white font-bold py-2 px-4 rounded-full">ひと足先にチェックする</a>
          </div>
        </section>
      </main>
      <footer className="bg01 text-center pt-10 pb-2">
        <nav>
          <ul className="flex justify-center gap-5 mb-10">
            <li><a href="#">ホーム</a></li>
            <li><a href="#">新商品</a></li>
            <li><a href="#">特徴</a></li>
            <li><a href="#">製品</a></li>
          </ul>
        </nav>
        <p className="text-xs">&copy; 2023 Cosmetics Store. All rights reserved.</p>
      </footer>
    </>
  );
}
