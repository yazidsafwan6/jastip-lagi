import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import OrderCard from '../OrderCard';
import EmptyState from '../EmptyState';

export default function Orders() {
  const { orders, exportData } = useContext(AppContext);

  return (
    <section className="section active">
      <div className="section-head">
        <div>
          <h2>Daftar Order</h2>
          <p>Semua pesanan tersimpan di browser ini. Status bisa diubah manual.</p>
        </div>
        <button className="btn ghost" onClick={exportData}>Export data</button>
      </div>
      {orders.length === 0 ? (
        <EmptyState icon="📋" title="Belum ada order" text="Order akan muncul setelah checkout." />
      ) : (
        <div id="ordersList">
          {orders.map(order => <OrderCard key={order.id} order={order} />)}
        </div>
      )}
    </section>
  );
}
