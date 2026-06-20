import { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
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
      alert("Isi nama, WhatsApp, dan alamat dulu.");
      return;
    }
    checkout(customer);
  };

  return (
    <section className="section active">
      <div className="section-head">
        <div>
          <h2>Keranjang</h2>
          <p>Cek pesanan customer, isi data penerima, lalu buat invoice.</p>
        </div>
        <button className="btn danger" onClick={clearCart}>Kosongkan keranjang</button>
      </div>
      <div className="cart-layout">
        <div className="panel">
          <h3>Item pesanan</h3>
          {cart.length === 0 ? (
            <EmptyState icon="🛒" title="Keranjang masih kosong" text="Tambahkan produk dari katalog dulu." />
          ) : (
            <div id="cartItems">
              {cart.map(item => <CartItem key={item.productId} item={item} />)}
            </div>
          )}
        </div>
        <div className="panel">
          <h3>Checkout</h3>
          <div className="form-grid">
            <div className="wide">
              <label className="label">Nama customer</label>
              <input
                className="input"
                placeholder="Contoh: Andi"
                value={customer.name}
                onChange={(e) => setCustomer({...customer, name: e.target.value})}
              />
            </div>
            <div>
              <label className="label">Nomor WhatsApp</label>
              <input
                className="input"
                placeholder="08xxxxxxxxxx"
                value={customer.phone}
                onChange={(e) => setCustomer({...customer, phone: e.target.value})}
              />
            </div>
            <div>
              <label className="label">Metode bayar</label>
              <select
                className="select"
                value={customer.payment}
                onChange={(e) => setCustomer({...customer, payment: e.target.value})}
              >
                <option>Transfer Bank</option>
                <option>QRIS</option>
                <option>COD</option>
                <option>DP 50%</option>
              </select>
            </div>
            <div className="wide">
              <label className="label">Alamat / titik temu</label>
              <textarea
                className="textarea"
                placeholder="Alamat lengkap atau titik temu"
                value={customer.address}
                onChange={(e) => setCustomer({...customer, address: e.target.value})}
              ></textarea>
            </div>
            <div className="wide">
              <label className="label">Catatan</label>
              <textarea
                className="textarea"
                placeholder="Contoh: warna hitam, size L, jangan lupa struk"
                value={customer.note}
                onChange={(e) => setCustomer({...customer, note: e.target.value})}
              ></textarea>
            </div>
          </div>
          <div style={{ height: '14px' }}></div>
          <div id="cartSummary">
            <div className="summary-row"><span>Subtotal barang</span><strong>{rupiah(totals.goods)}</strong></div>
            <div className="summary-row"><span>Total fee jastip</span><strong>{rupiah(totals.fees)}</strong></div>
            <div className="summary-row"><span>Estimasi ongkir</span><strong>{rupiah(totals.shipping)}</strong></div>
            <div className="summary-row total"><span>Total</span><strong>{rupiah(totals.total)}</strong></div>
          </div>
          <button className="btn primary block" onClick={handleCheckout}>Buat Pesanan & Invoice</button>
        </div>
      </div>
    </section>
  );
}
