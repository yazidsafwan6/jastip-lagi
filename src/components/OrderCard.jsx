import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { rupiah, formatDate, cn } from '../utils/helpers';
import { Eye, Package, Clock, CheckCircle2, XCircle, Trash2 } from 'lucide-react';

export default function OrderCard({ order }) {
  const { openOrderInvoice, setOrderStatus, deleteOrder } = useContext(AppContext);

  const statusConfig = {
    pending: { label: 'Menunggu', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100' },
    process: { label: 'Diproses', icon: Package, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100' },
    done: { label: 'Selesai', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100' },
    cancel: { label: 'Dibatalkan', icon: XCircle, color: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-100' },
  };

  const status = statusConfig[order.status] || statusConfig.pending;

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden group hover:border-primary/20 transition-all">
      <div className="p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-start gap-6">
        <div className="space-y-4 flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-black text-slate-900 tracking-tight">{order.id}</span>
            <div className={cn("flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-wider", status.bg, status.color, status.border)}>
              <status.icon className="w-3 h-3" />
              {status.label}
            </div>
            <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">{formatDate(order.createdAt)}</span>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Customer</span>
              <span className="font-black text-slate-800">{order.customer.name}</span>
            </div>
            <div className="w-px h-8 bg-slate-100"></div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">WhatsApp</span>
              <span className="font-bold text-slate-600">{order.customer.phone}</span>
            </div>
          </div>

          <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-100">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Daftar Barang</span>
            <div className="text-sm font-bold text-slate-600 leading-relaxed italic">
              {order.items.map(item => `${item.qty}x ${item.name}`).join(", ")}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-6 w-full sm:w-auto">
          <div className="text-right">
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Tagihan</div>
            <div className="text-3xl font-black text-primary tracking-tight">{rupiah(order.total)}</div>
          </div>

          <div className="flex flex-wrap justify-end gap-2">
            <button
              onClick={() => openOrderInvoice(order.id)}
              className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl font-bold text-xs text-slate-600 hover:bg-slate-50 transition-all shadow-sm"
            >
              <Eye className="w-4 h-4" />
              Invoice
            </button>

            <div className="h-10 w-px bg-slate-200 mx-1 hidden sm:block"></div>

            <button
              onClick={() => setOrderStatus(order.id, 'process')}
              className="px-4 py-2.5 bg-blue-600 text-white rounded-xl font-bold text-xs hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
            >
              Proses
            </button>
            <button
              onClick={() => setOrderStatus(order.id, 'done')}
              className="px-4 py-2.5 bg-emerald-600 text-white rounded-xl font-bold text-xs hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200"
            >
              Selesai
            </button>
            <button
              onClick={() => deleteOrder(order.id)}
              className="p-2.5 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
