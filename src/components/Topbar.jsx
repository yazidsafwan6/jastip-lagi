import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export default function Topbar() {
  const { currentSection, showSection, cart } = useContext(AppContext);

  const cartCount = cart.reduce((sum, item) => sum + Number(item.qty || 0), 0);

  return (
    <header className="topbar no-print">
      <div className="topbar-inner">
        <div className="brand">
          <div className="brand-mark">BC</div>
          <div>
            <div className="brand-title">Beyazit Cargo</div>
            <div className="brand-subtitle">App jastip React</div>
          </div>
        </div>
        <nav className="nav" id="navTabs">
          <button className={currentSection === 'home' ? 'active' : ''} onClick={() => showSection('home')}>Home</button>
          <button className={currentSection === 'catalog' ? 'active' : ''} onClick={() => showSection('catalog')}>Katalog</button>
          <button className={currentSection === 'cart' ? 'active' : ''} onClick={() => showSection('cart')}>Keranjang</button>
          <button className={currentSection === 'orders' ? 'active' : ''} onClick={() => showSection('orders')}>Order</button>
          <button className={currentSection === 'admin' ? 'active' : ''} onClick={() => showSection('admin')}>Admin</button>
          <button className={currentSection === 'invoice' ? 'active' : ''} onClick={() => showSection('invoice')}>Invoice</button>
        </nav>
        <div className="top-actions">
          <button className="pill" onClick={() => { showSection('catalog'); /* focus search? */ }}>🔎 Cari</button>
          <button className="pill primary" onClick={() => showSection('cart')}>🛒 <span>{cartCount}</span></button>
        </div>
      </div>
    </header>
  );
}
