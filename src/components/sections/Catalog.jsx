import { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import ProductCard from '../ProductCard';
import EmptyState from '../EmptyState';

export default function Catalog() {
  const { products, seedProducts } = useContext(AppContext);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('popular');

  const categories = ["Semua kategori", ...Array.from(new Set(products.map(product => product.category).filter(Boolean))).sort()];

  let filtered = products.filter(product => {
    const haystack = [
      product.name,
      product.category,
      product.city,
      product.desc
    ].join(" ").toLowerCase();

    const matchQuery = !query || haystack.includes(query.toLowerCase());
    const matchCategory = category === "all" || product.category === category;
    return matchQuery && matchCategory;
  });

  if (sort === "priceAsc") {
    filtered.sort((a, b) => Number(a.price) - Number(b.price));
  } else if (sort === "priceDesc") {
    filtered.sort((a, b) => Number(b.price) - Number(a.price));
  } else if (sort === "feeAsc") {
    filtered.sort((a, b) => Number(a.fee) - Number(b.fee));
  } else if (sort === "nameAsc") {
    filtered.sort((a, b) => String(a.name).localeCompare(String(b.name)));
  } else {
    filtered.sort((a, b) => Number(b.popular || 0) - Number(a.popular || 0));
  }

  return (
    <section className="section active">
      <div className="section-head">
        <div>
          <h2>Katalog Jastip</h2>
          <p>Pilih produk, filter kategori, lalu tambahkan ke keranjang.</p>
        </div>
        <button className="btn ghost" onClick={seedProducts}>Reset contoh produk</button>
      </div>
      <div className="toolbar">
        <input
          className="input"
          placeholder="Cari produk, kota, kategori..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select className="select" value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map(cat => (
            <option key={cat} value={cat === "Semua kategori" ? "all" : cat}>{cat}</option>
          ))}
        </select>
        <select className="select" value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="popular">Urut populer</option>
          <option value="priceAsc">Harga termurah</option>
          <option value="priceDesc">Harga termahal</option>
          <option value="feeAsc">Fee termurah</option>
          <option value="nameAsc">Nama A-Z</option>
        </select>
      </div>
      {filtered.length === 0 ? (
        <EmptyState icon="🔎" title="Produk tidak ditemukan" text="Coba ubah kata kunci atau filter kategori." />
      ) : (
        <div className="grid">
          {filtered.map(product => <ProductCard key={product.id} product={product} />)}
        </div>
      )}
    </section>
  );
}
