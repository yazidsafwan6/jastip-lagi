import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { Package, ClipboardList, Wallet, ArrowRight, Star, Server, Printer } from 'lucide-react';
import { rupiah } from '../../utils/helpers';

export default function Home() {
  const { products, orders, showSection } = useContext(AppContext);
  const totalRevenue = orders.reduce((sum, order) => sum + (Number(order.total) || 0), 0);

  const stats = [
    { label: 'Produk Aktif', value: products.length, icon: Package, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Order Tersimpan', value: orders.length, icon: ClipboardList, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Total Transaksi', value: rupiah(totalRevenue), icon: Wallet, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  const steps = [
    { num: 1, title: 'Pilih produk', desc: 'Pilih barang keinginanmu dari katalog premium kami.' },
    { num: 2, title: 'Masuk keranjang', desc: 'Harga, fee jastip, dan ongkir dihitung otomatis & transparan.' },
    { num: 3, title: 'Checkout', desc: 'Lengkapi data pengiriman dan konfirmasi pesanan via WhatsApp.' },
    { num: 4, title: 'Proses Admin', desc: 'Admin akan membelikan barang dan mengupdate status pesananmu.' },
    { num: 5, title: 'Terima Barang', desc: 'Cetak invoice sebagai bukti dan tunggu barang sampai di rumah.' }
  ];

  return (
    <div className="space-y-12 py-6">
      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 rounded-[2.5rem] bg-gradient-to-br from-primary via-primary to-secondary p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl shadow-primary/20">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full text-sm font-bold mb-6 uppercase tracking-wider">
              <Star className="w-4 h-4 text-accent fill-accent" />
              Trusted Jastip Service
            </div>
            <h1 className="text-4xl sm:text-6xl font-black leading-[1.1] mb-6 tracking-tight">
              Solusi Jastip Modern <br className="hidden sm:block" /> Profesional & Aman.
            </h1>
            <p className="text-lg sm:text-xl text-white/80 max-w-xl mb-8 leading-relaxed">
              Kelola pesanan jastip dengan sistem cerdas. Otomasi hitung fee, pembuatan invoice, hingga manajemen inventori dalam satu platform.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => showSection('catalog')}
                className="bg-white text-primary px-8 py-4 rounded-2xl font-black text-lg flex items-center gap-2 hover:bg-accent hover:text-primary-dark transition-all transform hover:-translate-y-1 shadow-xl"
              >
                Mulai Belanja
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => showSection('admin')}
                className="bg-primary-dark/30 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-2xl font-black text-lg flex items-center gap-2 hover:bg-white/10 transition-all"
              >
                Admin Panel
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          {[
            { title: 'Premium Sourcing', desc: 'Melayani jastip barang luar kota, luar negeri, bandara, hingga open PO eksklusif.', icon: Star, color: 'text-accent' },
            { title: 'Serverless Power', desc: 'Data tersimpan aman secara lokal. Cepat, ringan, dan tidak membutuhkan koneksi internet stabil.', icon: Server, color: 'text-secondary' },
            { title: 'Invoice Ready', desc: 'Generate invoice profesional dalam hitungan detik. Siap cetak atau kirim via WhatsApp.', icon: Printer, color: 'text-primary' }
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 flex gap-5 items-start">
              <div className={`p-4 rounded-2xl bg-slate-50 ${item.color}`}>
                <item.icon className="w-6 h-6 font-bold" />
              </div>
              <div>
                <h3 className="font-black text-slate-900 text-lg mb-1">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 group hover:border-primary/20 transition-all">
            <div className={`w-14 h-14 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}>
              <stat.icon className="w-7 h-7" />
            </div>
            <div className="text-3xl font-black text-slate-900 tracking-tight">{stat.value}</div>
            <div className="text-slate-500 font-bold text-sm uppercase tracking-widest mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Workflow Section */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">Cara Kerja Beyazit Cargo</h2>
          <p className="text-slate-500 font-medium">Alur transaksi yang transparan dan memudahkan customer maupun admin.</p>
        </div>

        <div className="relative">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-1/2 hidden lg:block"></div>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 relative z-10">
            {steps.map((step) => (
              <div key={step.num} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-lg flex flex-col items-center text-center group hover:bg-primary transition-colors">
                <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center font-black text-xl mb-4 group-hover:bg-accent group-hover:text-primary transition-colors shadow-lg shadow-primary/20">
                  {step.num}
                </div>
                <h4 className="font-black text-slate-900 mb-2 group-hover:text-white">{step.title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed group-hover:text-white/80">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
