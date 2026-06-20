import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Trash2, Minus, Plus } from 'lucide-react';
import { rupiah } from '../utils/helpers';

export default function CartItem({ item }) {
  const { products, increaseQty, decreaseQty, removeFromCart } = useContext(AppContext);
  const product = products.find(p => p.id === item.productId);

  if (!product) return null;

  const subtotal = (Number(product.price) + Number(product.fee) + Number(product.shipping)) * Number(item.qty);

  return (
    <div className="p-6 flex flex-col sm:flex-row items-center gap-6 group">
      <div className="w-24 h-24 rounded-2xl bg-slate-50 flex items-center justify-center text-4xl shadow-inner group-hover:scale-105 transition-transform">
        {product.emoji || "📦"}
      </div>

      <div className="flex-1 text-center sm:text-left">
        <h4 className="font-black text-slate-900 text-lg leading-tight mb-1">{product.name}</h4>
        <div className="flex flex-wrap justify-center sm:justify-start gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
          <span>{product.category}</span>
          <span className="text-slate-200">•</span>
          <span>{product.city}</span>
        </div>
        <div className="mt-2 text-primary font-black">{rupiah(subtotal)}</div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
          <button
            onClick={() => decreaseQty(item.productId)}
            className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-white hover:text-primary transition-colors text-slate-400"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="w-10 text-center font-black text-slate-900">{item.qty}</span>
          <button
            onClick={() => increaseQty(item.productId)}
            className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-white hover:text-primary transition-colors text-slate-400"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        <button
          onClick={() => removeFromCart(item.productId)}
          className="w-12 h-12 rounded-2xl flex items-center justify-center text-rose-500 hover:bg-rose-50 transition-colors"
          title="Hapus"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
