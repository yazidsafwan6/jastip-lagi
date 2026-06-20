import { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import ProductCard from '../ProductCard';
import EmptyState from '../EmptyState';
import { Search, SlidersHorizontal } from 'lucide-react';

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
    <div className="py-6 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight text-center sm:text-left">Katalog Premium</h2>
          <p className="text-slate-500 font-medium mt-1 text-center sm:text-left">Pilih produk terbaik dan serahkan proses belanja kepada kami.</p>
        </div>
        <button onClick={seedProducts} className="text-sm font-bold text-slate-400 hover:text-primary transition-colors text-center sm:text-right">
          Muat Ulang Contoh Produk
        </button>
      </div>

      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
          <div className="lg:col-span-6 relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors" />
            <input
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 text-slate-900 font-bold focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all placeholder:text-slate-300"
              placeholder="Cari produk, kota, atau kategori..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <div className="lg:col-span-3 relative">
            <SlidersHorizontal className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <select
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-11 pr-4 text-slate-900 font-bold focus:ring-4 focus:ring-primary/5 outline-none transition-all appearance-none cursor-pointer"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map(cat => (
                <option key={cat} value={cat === "Semua kategori" ? "all" : cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="lg:col-span-3">
            <select
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-4 text-slate-900 font-bold focus:ring-4 focus:ring-primary/5 outline-none transition-all appearance-none cursor-pointer"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="popular">Urut: Paling Populer</option>
              <option value="priceAsc">Urut: Harga Termurah</option>
              <option value="priceDesc">Urut: Harga Termahal</option>
              <option value="feeAsc">Urut: Fee Termurah</option>
              <option value="nameAsc">Urut: Nama A-Z</option>
            </select>
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-[2.5rem] p-20 border border-dashed border-slate-200">
          <EmptyState icon="🔎" title="Produk tidak ditemukan" text="Coba gunakan kata kunci lain atau periksa filter kategori kamu." />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
          {filtered.map(product => <ProductCard key={product.id} product={product} />)}
        </div>
      )}
    </div>
  );
}
