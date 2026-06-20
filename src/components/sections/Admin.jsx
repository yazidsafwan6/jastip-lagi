import { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { rupiah } from '../../utils/helpers';

export default function Admin() {
  const { products, saveProduct, deleteProduct, resetAllData, exportData, importDataFromFile } = useContext(AppContext);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    emoji: '📦',
    category: 'Umum',
    city: 'Makassar',
    stock: 0,
    price: 0,
    fee: 0,
    shipping: 0,
    desc: ''
  });

  const handleEdit = (product) => {
    setEditingProduct(product.id);
    setFormData(product);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name) {
      alert("Nama produk wajib diisi.");
      return;
    }
    saveProduct({ ...formData, id: editingProduct });
    setEditingProduct(null);
    setFormData({
      name: '',
      emoji: '📦',
      category: 'Umum',
      city: 'Makassar',
      stock: 0,
      price: 0,
      fee: 0,
      shipping: 0,
      desc: ''
    });
  };

  const cancelEdit = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      emoji: '📦',
      category: 'Umum',
      city: 'Makassar',
      stock: 0,
      price: 0,
      fee: 0,
      shipping: 0,
      desc: ''
    });
  };

  return (
    <section className="section active">
      <div className="section-head">
        <div>
          <h2>Admin Produk</h2>
          <p>Tambah, edit, hapus, export, dan import katalog produk jastip.</p>
        </div>
        <button className="btn danger" onClick={resetAllData}>Reset semua data</button>
      </div>
      <div className="admin-layout">
        <div className="panel">
          <h3>{editingProduct ? 'Edit produk' : 'Tambah produk'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="wide">
                <label className="label">Nama produk</label>
                <input className="input" placeholder="Nama produk" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              <div>
                <label className="label">Emoji / ikon</label>
                <input className="input" placeholder="👜" value={formData.emoji} onChange={e => setFormData({...formData, emoji: e.target.value})} />
              </div>
              <div>
                <label className="label">Kategori</label>
                <input className="input" placeholder="Fashion" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} />
              </div>
              <div>
                <label className="label">Kota asal</label>
                <input className="input" placeholder="Jakarta" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} />
              </div>
              <div>
                <label className="label">Stok</label>
                <input className="input" type="number" value={formData.stock} onChange={e => setFormData({...formData, stock: Number(e.target.value)})} />
              </div>
              <div>
                <label className="label">Harga barang</label>
                <input className="input" type="number" value={formData.price} onChange={e => setFormData({...formData, price: Number(e.target.value)})} />
              </div>
              <div>
                <label className="label">Fee jastip</label>
                <input className="input" type="number" value={formData.fee} onChange={e => setFormData({...formData, fee: Number(e.target.value)})} />
              </div>
              <div>
                <label className="label">Estimasi ongkir</label>
                <input className="input" type="number" value={formData.shipping} onChange={e => setFormData({...formData, shipping: Number(e.target.value)})} />
              </div>
              <div className="wide">
                <label className="label">Deskripsi</label>
                <textarea className="textarea" placeholder="Deskripsi singkat produk" value={formData.desc} onChange={e => setFormData({...formData, desc: e.target.value})}></textarea>
              </div>
            </div>
            <div style={{ height: '12px' }}></div>
            <button className="btn primary block" type="submit">Simpan produk</button>
            {editingProduct && (
              <>
                <div style={{ height: '8px' }}></div>
                <button className="btn ghost block" type="button" onClick={cancelEdit}>Batal edit</button>
              </>
            )}
          </form>
        </div>
        <div className="panel">
          <h3>Produk tersimpan</h3>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Produk</th>
                  <th>Kategori</th>
                  <th>Harga</th>
                  <th>Fee</th>
                  <th>Stok</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {products.length === 0 ? (
                  <tr><td colSpan="6">Belum ada produk.</td></tr>
                ) : (
                  products.map(product => (
                    <tr key={product.id}>
                      <td>
                        <b>{product.emoji || "📦"} {product.name}</b><br/>
                        <span className="invoice-muted">{product.city || "-"}</span>
                      </td>
                      <td>{product.category || "Umum"}</td>
                      <td>{rupiah(product.price)}</td>
                      <td>{rupiah(product.fee)}</td>
                      <td>{product.stock}</td>
                      <td>
                        <button className="btn small ghost" onClick={() => handleEdit(product)}>Edit</button>
                        <button className="btn small danger" onClick={() => deleteProduct(product.id)}>Hapus</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div style={{ height: '14px' }}></div>
          <div className="two-col">
            <button className="btn secondary" onClick={exportData}>Export JSON</button>
            <button className="btn accent" onClick={() => document.getElementById('importFile').click()}>Import JSON</button>
          </div>
          <input className="hidden" type="file" id="importFile" accept="application/json" onChange={importDataFromFile} />
        </div>
      </div>
    </section>
  );
}
