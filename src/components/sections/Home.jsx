import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import StatCard from '../StatCard';
import { rupiah } from '../../utils/helpers';

export default function Home() {
  const { products, orders, showSection } = useContext(AppContext);

  const totalRevenue = orders.reduce((sum, order) => sum + (Number(order.total) || 0), 0);

  return (
    <section className="section active">
      <div className="hero">
        <div className="hero-card">
          <div className="hero-kicker">⚡ Cepat · Aman · Terpercaya</div>
          <h1>Jastip modern dalam React.</h1>
          <p>Kelola katalog produk, hitung fee jastip otomatis, masukkan produk ke keranjang, buat pesanan, dan cetak invoice langsung dari browser.</p>
          <div className="hero-buttons">
            <button className="hero-btn light" onClick={() => showSection('catalog')}>Mulai Belanja</button>
            <button className="hero-btn dark" onClick={() => showSection('admin')}>Kelola Produk</button>
          </div>
        </div>
        <div className="hero-side">
          <div className="mini-card">
            <div className="mini-title">Untuk jualan jastip</div>
            <div className="mini-text">Cocok untuk open PO, jastip barang luar kota, jastip bandara, jastip skincare, fashion, makanan, dan merchandise.</div>
          </div>
          <div className="mini-card">
            <div className="mini-title">Tanpa server</div>
            <div className="mini-text">Data tersimpan di LocalStorage browser. Bisa diedit, reset, export, dan import.</div>
          </div>
          <div className="mini-card">
            <div className="mini-title">Invoice siap print</div>
            <div className="mini-text">Setelah checkout, invoice bisa langsung dicetak atau disalin untuk dikirim ke pelanggan.</div>
          </div>
        </div>
      </div>
      <div className="stats-grid">
        <StatCard value={products.length} label="Produk aktif" />
        <StatCard value={orders.length} label="Order tersimpan" />
        <StatCard value={rupiah(totalRevenue)} label="Total transaksi" />
      </div>
      <div className="section-head">
        <div>
          <h2>Cara kerja app</h2>
          <p>Alur sederhana untuk customer dan admin jastip.</p>
        </div>
      </div>
      <div className="timeline">
        {[
          { num: 1, title: 'Pilih produk', desc: 'Customer memilih barang dari katalog yang sudah kamu siapkan.' },
          { num: 2, title: 'Masuk keranjang', desc: 'Harga barang, fee, dan estimasi ongkir dihitung otomatis.' },
          { num: 3, title: 'Checkout', desc: 'Customer mengisi nama, WhatsApp, alamat, dan catatan pesanan.' },
          { num: 4, title: 'Admin proses', desc: 'Pesanan tersimpan di halaman Order dan bisa diubah statusnya.' },
          { num: 5, title: 'Cetak invoice', desc: 'Invoice otomatis dibuat dan siap dikirim ke customer.' }
        ].map(item => (
          <div className="timeline-item" key={item.num}>
            <div className="timeline-num">{item.num}</div>
            <div className="timeline-card">
              <b>{item.title}</b>
              <span>{item.desc}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
