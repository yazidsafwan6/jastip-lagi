import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { rupiah, formatDate } from '../../utils/helpers';
import EmptyState from '../EmptyState';

export default function Invoice() {
  const { lastInvoice, copyInvoiceText } = useContext(AppContext);

  if (!lastInvoice) {
    return (
      <section className="section active">
        <div className="section-head no-print">
          <div>
            <h2>Invoice</h2>
            <p>Invoice terakhir akan tampil di sini setelah checkout atau saat pilih order.</p>
          </div>
        </div>
        <EmptyState icon="🧾" title="Belum ada invoice" text="Checkout atau pilih order untuk menampilkan invoice." />
      </section>
    );
  }

  const order = lastInvoice;

  return (
    <section className="section active">
      <div className="section-head no-print">
        <div>
          <h2>Invoice</h2>
          <p>Invoice terakhir akan tampil di sini setelah checkout atau saat pilih order.</p>
        </div>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button className="btn ghost" onClick={copyInvoiceText}>Salin teks invoice</button>
          <button className="btn primary" onClick={() => window.print()}>Print invoice</button>
        </div>
      </div>
      <div className="invoice-box">
        <div className="invoice-head">
          <div>
            <div className="invoice-brand">Beyazit Cargo</div>
            <div className="invoice-muted">Jastip cepat, aman, dan terpercaya.<br/>Makassar · Indonesia</div>
          </div>
          <div className="invoice-muted">
            <b>Invoice:</b> {order.id}<br/>
            <b>Tanggal:</b> {formatDate(order.createdAt)}<br/>
            <b>Status:</b> {order.status}
          </div>
        </div>

        <div className="two-col">
          <div className="note-box">
            <b>Ditagihkan kepada</b><br/>
            {order.customer.name}<br/>
            {order.customer.phone}<br/>
            {order.customer.address}
          </div>
          <div className="note-box">
            <b>Pembayaran</b><br/>
            {order.customer.payment}<br/>
            Catatan: {order.customer.note || "-"}
          </div>
        </div>

        <div style={{ height: '18px' }}></div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Produk</th>
                <th>Qty</th>
                <th>Harga</th>
                <th>Fee</th>
                <th>Ongkir</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.name}</td>
                  <td>{item.qty}</td>
                  <td>{rupiah(item.price)}</td>
                  <td>{rupiah(item.fee)}</td>
                  <td>{rupiah(item.shipping)}</td>
                  <td>{rupiah(item.subtotal)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ height: '16px' }}></div>
        <div className="summary-row"><span>Subtotal barang</span><strong>{rupiah(order.goods)}</strong></div>
        <div className="summary-row"><span>Total fee jastip</span><strong>{rupiah(order.fees)}</strong></div>
        <div className="summary-row"><span>Estimasi ongkir</span><strong>{rupiah(order.shipping)}</strong></div>
        <div className="invoice-total">{rupiah(order.total)}</div>

        <div style={{ height: '18px' }}></div>
        <div className="note-box">
          Terima kasih sudah menggunakan layanan Beyazit Cargo. Pesanan akan diproses sesuai jadwal open PO dan ketersediaan barang. Simpan invoice ini sebagai bukti pemesanan.
        </div>
      </div>
    </section>
  );
}
