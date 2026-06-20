import { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { LayoutGrid, Plus, Download, Upload, Trash2, Edit3, MapPin, Search } from 'lucide-react';
import { rupiah, cn } from '../../utils/helpers';

export default function Admin() {
  const { products, saveProduct, deleteProduct, resetAllData, exportData, importDataFromFile } = useContext(AppContext);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    emoji: '📦',
    category: 'Umum',
    city: 'Jakarta',
    stock: 10,
    price: 0,
    fee: 25000,
    shipping: 15000,
    desc: ''
  });

  const handleEdit = (product) => {
    setEditingProduct(product.id);
    setFormData(product);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name) return alert("Nama produk wajib diisi.");
    saveProduct({ ...formData, id: editingProduct });
    setEditingProduct(null);
    setFormData({ name: '', emoji: '📦', category: 'Umum', city: 'Jakarta', stock: 10, price: 0, fee: 25000, shipping: 15000, desc: '' });
  };

  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="py-6 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Admin Control Panel</h2>
          <p className="text-slate-500 font-medium mt-1">Kelola inventori, katalog, dan database lokal.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={exportData} className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl font-bold text-sm text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
            <Download className="w-4 h-4" />
            Export JSON
          </button>
          <button onClick={() => document.getElementById('importFile').click()} className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl font-bold text-sm text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
            <Upload className="w-4 h-4" />
            Import JSON
          </button>
          <button onClick={resetAllData} className="flex items-center gap-2 px-4 py-2 bg-rose-50 text-rose-600 rounded-xl font-bold text-sm hover:bg-rose-100 transition-all">
            <Trash2 className="w-4 h-4" />
            Reset Data
          </button>
          <input className="hidden" type="file" id="importFile" accept="application/json" onChange={importDataFromFile} />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Form Panel */}
        <div className="xl:col-span-4">
          <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 p-8 sticky top-28">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-primary rounded-xl text-white">
                {editingProduct ? <Edit3 className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
              </div>
              <h3 className="font-black text-slate-900 text-xl">{editingProduct ? 'Edit Produk' : 'Tambah Produk'}</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Nama Produk</label>
                <input
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 px-4 text-slate-900 font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  placeholder="Contoh: Tote Bag Premium"
                  value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Emoji / Icon</label>
                  <input className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 px-4 text-slate-900 font-bold text-center text-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  value={formData.emoji} onChange={e => setFormData({...formData, emoji: e.target.value})} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Stok</label>
                  <input type="number" className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 px-4 text-slate-900 font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  value={formData.stock} onChange={e => setFormData({...formData, stock: Number(e.target.value)})} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Kategori</label>
                  <input className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 px-4 text-slate-900 font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Kota Asal</label>
                  <input className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 px-4 text-slate-900 font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Harga Barang (IDR)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">Rp</span>
                  <input type="number" className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 pl-10 pr-4 text-slate-900 font-black focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  value={formData.price} onChange={e => setFormData({...formData, price: Number(e.target.value)})} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Fee Jastip</label>
                  <input type="number" className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 px-4 text-slate-900 font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  value={formData.fee} onChange={e => setFormData({...formData, fee: Number(e.target.value)})} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Ongkir</label>
                  <input type="number" className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 px-4 text-slate-900 font-bold focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  value={formData.shipping} onChange={e => setFormData({...formData, shipping: Number(e.target.value)})} />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Deskripsi Produk</label>
                <textarea
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 px-4 text-slate-900 font-medium focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                  rows="3"
                  value={formData.desc} onChange={e => setFormData({...formData, desc: e.target.value})}
                ></textarea>
              </div>

              <div className="pt-2 flex flex-col gap-3">
                <button type="submit" className="w-full bg-primary text-white py-4 rounded-2xl font-black text-lg shadow-xl shadow-primary/20 hover:bg-accent hover:text-primary-dark transition-all transform active:scale-[0.98]">
                  {editingProduct ? 'Update Produk' : 'Simpan Produk'}
                </button>
                {editingProduct && (
                  <button type="button" onClick={() => { setEditingProduct(null); setFormData({ name: '', emoji: '📦', category: 'Umum', city: 'Jakarta', stock: 10, price: 0, fee: 25000, shipping: 15000, desc: '' }); }} className="w-full bg-slate-100 text-slate-600 py-3 rounded-2xl font-bold hover:bg-slate-200 transition-all">
                    Batal Edit
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* List Panel */}
        <div className="xl:col-span-8 space-y-6">
          <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
            <div className="p-6 border-b border-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-secondary/10 rounded-xl text-secondary">
                  <LayoutGrid className="w-5 h-5" />
                </div>
                <h3 className="font-black text-slate-900 text-lg">Inventori Produk ({products.length})</h3>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  className="bg-slate-50 border border-slate-100 rounded-xl py-2 pl-10 pr-4 text-sm font-bold focus:ring-2 focus:ring-secondary/20 outline-none transition-all w-full sm:w-64"
                  placeholder="Cari produk..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/50">
                    <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Produk</th>
                    <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Kategori</th>
                    <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Harga Base</th>
                    <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Fee</th>
                    <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">Stok</th>
                    <th className="px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredProducts.map(product => (
                    <tr key={product.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{product.emoji}</span>
                          <div>
                            <div className="font-black text-slate-900 leading-tight">{product.name}</div>
                            <div className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1 mt-0.5">
                              <MapPin className="w-2.5 h-2.5" />
                              {product.city}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider">{product.category}</span>
                      </td>
                      <td className="px-6 py-4 font-bold text-slate-600 text-sm">{rupiah(product.price)}</td>
                      <td className="px-6 py-4 font-bold text-slate-600 text-sm">{rupiah(product.fee)}</td>
                      <td className="px-6 py-4">
                        <span className={cn(
                          "font-black text-sm",
                          product.stock <= 5 ? "text-rose-500" : "text-emerald-500"
                        )}>{product.stock}</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => handleEdit(product)} className="p-2 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-all" title="Edit">
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button onClick={() => deleteProduct(product.id)} className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all" title="Hapus">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredProducts.length === 0 && (
                    <tr>
                      <td colSpan="6" className="px-6 py-12 text-center text-slate-400 font-bold italic">Produk tidak ditemukan atau belum ada data.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
