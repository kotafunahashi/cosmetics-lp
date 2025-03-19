import getWeather from '@/app/lib/getWeather';

// 型定義を修正して props を受け取る部分を改善
async function fetchProducts() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/products.json`
    );
    if (!res.ok) throw new Error('Failed to fetch products');
    return res.json();
  }
  
  export default async function LPPage(
    pageProps: { params: { source: string } }
  ) {
    // ここで直接 params から値を取り出す
    const { source } = pageProps.params;
  
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
    const sourceProducts = products[source] || products.recommend;
    if (!Array.isArray(sourceProducts)) {
      throw new Error('sourceProducts is not an array');
    }
  
    const recommendedProducts = isRainy
      ? [...sourceProducts.slice(0, 2), ...products.rainy]
      : sourceProducts;
  

  return (
    <>
      <header className="bg01">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center">
            <div className="flex-1">
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
        <section id="product" className="bg02">
          <div className="max-w-7xl mx-auto text-center pt-20 pb-20">
            <h2 className="text-2xl mb-10">いち早く、オゾニアシリーズをご体験ください</h2>
            <ul className="flex gap-10 items-center justify-between mb-10">
              {recommendedProducts.map((product: any) => (
                <li key={product.id}>
                  <a href={product.link}>
                    <img src={product.image} alt={product.name} className="mb-2" />
                  </a>
                  <h2 className="text-lg font-semibold serif">{product.name}</h2>
                  <p className="text-sm serif">{product.description}</p>
                </li>
              ))}
            </ul>
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
