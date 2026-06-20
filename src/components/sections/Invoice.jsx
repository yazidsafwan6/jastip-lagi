import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { rupiah, formatDate } from '../../utils/helpers';
import { Copy, Printer, CheckCircle2, MapPin, CreditCard, ShoppingBag, Landmark } from 'lucide-react';
import EmptyState from '../EmptyState';

export default function Invoice() {
  const { lastInvoice, copyInvoiceText } = useContext(AppContext);

  if (!lastInvoice) {
    return (
      <div className="py-12">
        <EmptyState
          icon="🧾"
          title="Belum Ada Invoice"
          text="Lakukan checkout di keranjang atau pilih order dari daftar untuk melihat detail invoice."
        />
      </div>
    );
  }

  const order = lastInvoice;

  return (
    <div className="py-6 space-y-8 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 no-print">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Invoice Detail</h2>
        <div className="flex gap-3">
          <button
            onClick={copyInvoiceText}
            className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-2xl font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm"
          >
            <Copy className="w-4 h-4" />
            Salin Teks
          </button>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-2xl font-black shadow-xl shadow-primary/20 hover:bg-primary-dark transition-all transform active:scale-95"
          >
            <Printer className="w-4 h-4" />
            Cetak Invoice
          </button>
        </div>
      </div>

      <div className="invoice-box bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-200/60 overflow-hidden">
        {/* Header */}
        <div className="p-8 sm:p-12 bg-slate-900 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
          <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-primary font-black text-2xl">BC</div>
                <h1 className="text-3xl font-black tracking-tighter italic">BEYAZIT CARGO</h1>
              </div>
              <p className="text-slate-400 text-sm font-bold uppercase tracking-[0.2em]">Premium Jastip & Logistics</p>
              <div className="mt-6 flex flex-col gap-1 text-slate-300 text-sm font-medium">
                <span className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Makassar, Indonesia</span>
                <span className="flex items-center gap-2 font-black text-accent"><CheckCircle2 className="w-4 h-4" /> Verified Service</span>
              </div>
            </div>

            <div className="text-left sm:text-right space-y-4">
              <div className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/10 text-accent font-black text-xs uppercase tracking-widest">
                Official Invoice
              </div>
              <div className="space-y-1">
                <div className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Nomor Invoice</div>
                <div className="text-2xl font-black tracking-tight">{order.id}</div>
              </div>
              <div className="space-y-1">
                <div className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Tanggal Terbit</div>
                <div className="text-lg font-bold text-slate-200">{formatDate(order.createdAt)}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Information Grid */}
        <div className="p-8 sm:p-12 grid grid-cols-1 sm:grid-cols-2 gap-12 border-b border-slate-50">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-primary">
              <ShoppingBag className="w-5 h-5" />
              <h3 className="font-black text-slate-900 uppercase tracking-widest text-xs">Ditagihkan Kepada</h3>
            </div>
            <div className="bg-slate-50 rounded-3xl p-6 space-y-2 border border-slate-100">
              <div className="text-xl font-black text-slate-900">{order.customer.name}</div>
              <div className="text-slate-500 font-bold">{order.customer.phone}</div>
              <div className="text-slate-500 text-sm leading-relaxed pt-2 border-t border-slate-200/50 italic">{order.customer.address}</div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 text-primary">
              <CreditCard className="w-5 h-5" />
              <h3 className="font-black text-slate-900 uppercase tracking-widest text-xs">Informasi Pembayaran</h3>
            </div>
            <div className="bg-slate-50 rounded-3xl p-6 space-y-4 border border-slate-100">
              <div>
                <div className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Metode</div>
                <div className="text-lg font-black text-slate-800 flex items-center gap-2">
                  <Landmark className="w-5 h-5 text-secondary" />
                  {order.customer.payment}
                </div>
              </div>
              <div>
                <div className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Catatan Pesanan</div>
                <div className="text-sm font-bold text-slate-600">{order.customer.note || "Tidak ada catatan khusus."}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Table Area */}
        <div className="px-8 sm:px-12 py-8 overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-slate-900">
                <th className="py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Deskripsi Barang</th>
                <th className="py-4 px-4 text-center text-[10px] font-black uppercase tracking-widest text-slate-400">Qty</th>
                <th className="py-4 px-4 text-right text-[10px] font-black uppercase tracking-widest text-slate-400">Harga</th>
                <th className="py-4 px-4 text-right text-[10px] font-black uppercase tracking-widest text-slate-400">Fee</th>
                <th className="py-4 text-right text-[10px] font-black uppercase tracking-widest text-slate-400">Subtotal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {order.items.map((item, idx) => (
                <tr key={idx} className="group">
                  <td className="py-6">
                    <div className="font-black text-slate-900">{item.name}</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Est. Ongkir: {rupiah(item.shipping)}</div>
                  </td>
                  <td className="py-6 px-4 text-center font-black text-slate-900">{item.qty}</td>
                  <td className="py-6 px-4 text-right font-bold text-slate-600">{rupiah(item.price)}</td>
                  <td className="py-6 px-4 text-right font-bold text-slate-600">{rupiah(item.fee)}</td>
                  <td className="py-6 text-right font-black text-slate-900">{rupiah(item.subtotal)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary Footer */}
        <div className="p-8 sm:p-12 bg-slate-50/80 flex flex-col sm:flex-row justify-between gap-12 border-t border-slate-100">
          <div className="max-w-xs space-y-4">
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">Informasi Penting</h4>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">
              Pesanan akan diproses sesuai jadwal sourcing barang. Mohon simpan bukti pembayaran dan invoice ini sebagai referensi valid saat pengambilan/pengiriman barang.
            </p>
          </div>

          <div className="flex-1 max-w-sm space-y-3">
            <div className="flex justify-between text-slate-500 font-bold text-sm uppercase tracking-wider">
              <span>Subtotal</span>
              <span>{rupiah(order.goods)}</span>
            </div>
            <div className="flex justify-between text-slate-500 font-bold text-sm uppercase tracking-wider">
              <span>Total Fee Jastip</span>
              <span>{rupiah(order.fees)}</span>
            </div>
            <div className="flex justify-between text-slate-500 font-bold text-sm uppercase tracking-wider pb-3">
              <span>Total Ongkir</span>
              <span>{rupiah(order.shipping)}</span>
            </div>
            <div className="pt-6 border-t-4 border-slate-900 flex justify-between items-end">
              <span className="font-black text-slate-900 text-sm uppercase tracking-[0.2em]">Grand Total</span>
              <span className="text-4xl font-black text-primary tracking-tighter">{rupiah(order.total)}</span>
            </div>
          </div>
        </div>

        <div className="bg-primary py-4 text-center">
          <p className="text-[10px] font-black text-white/50 uppercase tracking-[0.4em]">Terima Kasih Atas Kepercayaan Anda</p>
        </div>
      </div>
    </div>
  );
}
