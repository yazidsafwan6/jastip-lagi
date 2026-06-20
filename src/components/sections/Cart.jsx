import { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { ShoppingBag, CreditCard, User, Phone, MapPin, Notebook, Trash2 } from 'lucide-react';
import CartItem from '../CartItem';
import EmptyState from '../EmptyState';
import { rupiah } from '../../utils/helpers';

export default function Cart() {
  const { cart, clearCart, checkout, calculateCartTotals } = useContext(AppContext);
  const [customer, setCustomer] = useState({
    name: '',
    phone: '',
    address: '',
    note: '',
    payment: 'Transfer Bank'
  });

  const totals = calculateCartTotals();

  const handleCheckout = () => {
    if (!customer.name || !customer.phone || !customer.address) {
      alert("Mohon lengkapi nama, WhatsApp, dan alamat pengiriman.");
      return;
    }
    checkout(customer);
  };

  return (
    <div className="py-6 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Keranjang Belanja</h2>
          <p className="text-slate-500 font-medium mt-1">Review pesanan dan lengkapi detail pengiriman.</p>
        </div>
        <button
          onClick={clearCart}
          className="inline-flex items-center gap-2 text-rose-600 font-bold text-sm hover:bg-rose-50 px-4 py-2 rounded-xl transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          Kosongkan Keranjang
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Items List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
            <div className="p-6 border-b border-slate-50 bg-slate-50/50 flex items-center gap-3">
              <div className="p-2 bg-primary rounded-xl text-white">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <h3 className="font-black text-slate-900 text-lg">Item Pesanan</h3>
            </div>

            <div className="divide-y divide-slate-50">
              {cart.length === 0 ? (
                <div className="p-12">
                  <EmptyState
                    icon="🛒"
                    title="Keranjang masih kosong"
                    text="Jelajahi katalog kami dan temukan barang impianmu."
                  />
                </div>
              ) : (
                cart.map(item => <CartItem key={item.productId} item={item} />)
              )}
            </div>
          </div>
        </div>

        {/* Checkout Form */}
        <div className="space-y-6">
          <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 p-8 space-y-6">
            <h3 className="font-black text-slate-900 text-xl flex items-center gap-3">
              <CreditCard className="w-6 h-6 text-primary" />
              Detail Checkout
            </h3>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Nama Penerima</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 pl-11 pr-4 text-slate-900 font-bold focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-slate-300"
                    placeholder="Nama lengkap"
                    value={customer.name}
                    onChange={(e) => setCustomer({...customer, name: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">WhatsApp</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 pl-11 pr-4 text-slate-900 font-bold focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-slate-300"
                    placeholder="Contoh: 08123456789"
                    value={customer.phone}
                    onChange={(e) => setCustomer({...customer, phone: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Metode Pembayaran</label>
                <select
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 px-4 text-slate-900 font-bold focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all appearance-none cursor-pointer"
                  value={customer.payment}
                  onChange={(e) => setCustomer({...customer, payment: e.target.value})}
                >
                  <option>Transfer Bank</option>
                  <option>QRIS</option>
                  <option>COD (Bayar di Tempat)</option>
                  <option>DP 50% (Sisa saat COD)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Alamat Lengkap</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-4 w-4 h-4 text-slate-400" />
                  <textarea
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 pl-11 pr-4 text-slate-900 font-bold focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-slate-300 min-height-[100px] resize-none"
                    placeholder="Alamat pengiriman atau titik temu"
                    rows="3"
                    value={customer.address}
                    onChange={(e) => setCustomer({...customer, address: e.target.value})}
                  ></textarea>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Catatan Tambahan</label>
                <div className="relative">
                  <Notebook className="absolute left-4 top-4 w-4 h-4 text-slate-400" />
                  <textarea
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3.5 pl-11 pr-4 text-slate-900 font-bold focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-slate-300 min-height-[80px] resize-none"
                    placeholder="Warna, ukuran, atau instruksi khusus"
                    rows="2"
                    value={customer.note}
                    onChange={(e) => setCustomer({...customer, note: e.target.value})}
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-50 space-y-3">
              <div className="flex justify-between text-slate-500 font-bold text-sm">
                <span>Subtotal Barang</span>
                <span>{rupiah(totals.goods)}</span>
              </div>
              <div className="flex justify-between text-slate-500 font-bold text-sm">
                <span>Total Fee Jastip</span>
                <span>{rupiah(totals.fees)}</span>
              </div>
              <div className="flex justify-between text-slate-500 font-bold text-sm pb-2">
                <span>Estimasi Ongkir</span>
                <span>{rupiah(totals.shipping)}</span>
              </div>
              <div className="flex justify-between items-end pt-3 border-t-2 border-dashed border-slate-100">
                <span className="font-black text-slate-900">Total Tagihan</span>
                <span className="text-2xl font-black text-primary tracking-tight">{rupiah(totals.total)}</span>
              </div>
            </div>

            <button
              disabled={cart.length === 0}
              onClick={handleCheckout}
              className="w-full bg-primary text-white py-4 rounded-2xl font-black text-lg shadow-xl shadow-primary/20 hover:bg-accent hover:text-primary-dark transition-all transform active:scale-[0.98] disabled:bg-slate-100 disabled:text-slate-300 disabled:shadow-none"
            >
              Proses Pesanan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
