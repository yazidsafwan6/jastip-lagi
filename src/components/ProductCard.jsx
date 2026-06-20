import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { ShoppingCart, MapPin, Tag, Info } from 'lucide-react';
import { rupiah } from '../utils/helpers';

export default function ProductCard({ product }) {
  const { addToCart } = useContext(AppContext);
  const total = Number(product.price) + Number(product.fee) + Number(product.shipping);
  const isOutOfStock = Number(product.stock) <= 0;

  return (
    <article className="group bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden flex flex-col hover:border-primary/20 transition-all duration-300 transform hover:-translate-y-1">
      <div className="h-56 bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center text-7xl relative overflow-hidden">
        <div className="absolute top-4 left-4 flex gap-2">
          <div className="bg-white/90 backdrop-blur-md border border-slate-200 px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
            <MapPin className="w-3 h-3 text-secondary" />
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-700">{product.city || "Jastip"}</span>
          </div>
        </div>
        {isOutOfStock && (
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] flex items-center justify-center z-10">
            <div className="bg-white text-slate-900 px-6 py-2 rounded-full font-black text-sm uppercase tracking-widest shadow-xl">
              Habis
            </div>
          </div>
        )}
        <span className="transition-transform duration-500 group-hover:scale-110">{product.emoji || "📦"}</span>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-2 mb-3">
          <h3 className="font-black text-slate-900 text-lg leading-tight group-hover:text-primary transition-colors">{product.name}</h3>
        </div>

        <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-2">
          {product.desc || "Produk jastip kurasi pilihan tim Beyazit Cargo."}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          <div className="bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-xl flex items-center gap-1.5">
            <Tag className="w-3 h-3 text-slate-400" />
            <span className="text-[11px] font-bold text-slate-600">{product.category || "Umum"}</span>
          </div>
          <div className="bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-xl flex items-center gap-1.5 text-emerald-700">
            <Info className="w-3 h-3" />
            <span className="text-[11px] font-bold">Stok: {product.stock}</span>
          </div>
        </div>

        <div className="mt-auto pt-4 border-t border-slate-50 flex items-end justify-between gap-4">
          <div>
            <div className="text-2xl font-black text-slate-900 tracking-tight">{rupiah(total)}</div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Harga + Fee + Ongkir</div>
          </div>

          <button
            disabled={isOutOfStock}
            onClick={() => addToCart(product.id)}
            className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20 hover:bg-accent hover:text-primary-dark transition-all active:scale-95 disabled:bg-slate-100 disabled:text-slate-300 disabled:shadow-none"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </article>
  );
}
