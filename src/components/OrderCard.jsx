import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { rupiah, formatDate } from '../utils/helpers';

export default function OrderCard({ order }) {
  const { openOrderInvoice, setOrderStatus, deleteOrder } = useContext(AppContext);

  const statusLabel = (status) => {
    if (status === "process") return "Diproses";
    if (status === "done") return "Selesai";
    if (status === "cancel") return "Dibatalkan";
    return "Menunggu";
  };

  const statusClass = (status) => {
    if (status === "process") return "process";
    if (status === "done") return "done";
    if (status === "cancel") return "cancel";
    return "pending";
  };

  const itemList = order.items.map(item => `${item.qty}x ${item.name}`).join(", ");

  return (
    <div className="order-card">
      <div className="order-top">
        <div>
          <div className="order-id">{order.id}</div>
          <div className="order-date">{formatDate(order.createdAt)} · {order.customer.name} · {order.customer.phone}</div>
        </div>
        <span className={`status ${statusClass(order.status)}`}>{statusLabel(order.status)}</span>
      </div>
      <div className="invoice-muted">{itemList}</div>
      <div className="summary-row total"><span>Total</span><strong>{rupiah(order.total)}</strong></div>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '12px' }}>
        <button className="btn small ghost" onClick={() => openOrderInvoice(order.id)}>Lihat invoice</button>
        <button className="btn small secondary" onClick={() => setOrderStatus(order.id, 'process')}>Proses</button>
        <button className="btn small accent" onClick={() => setOrderStatus(order.id, 'done')}>Selesai</button>
        <button className="btn small danger" onClick={() => setOrderStatus(order.id, 'cancel')}>Batal</button>
        <button className="btn small danger" onClick={() => deleteOrder(order.id)}>Hapus</button>
      </div>
    </div>
  );
}
