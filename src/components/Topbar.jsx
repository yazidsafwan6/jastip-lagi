import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { ShoppingCart, Search, Home, Package, ClipboardList, Settings, ReceiptText } from 'lucide-react';
import { cn } from '../utils/helpers';

export default function Topbar() {
  const { currentSection, showSection, cart } = useContext(AppContext);
  const cartCount = cart.reduce((sum, item) => sum + Number(item.qty || 0), 0);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'catalog', label: 'Katalog', icon: Package },
    { id: 'cart', label: 'Keranjang', icon: ShoppingCart },
    { id: 'orders', label: 'Order', icon: ClipboardList },
    { id: 'admin', label: 'Admin', icon: Settings },
    { id: 'invoice', label: 'Invoice', icon: ReceiptText },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => showSection('home')}>
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-black text-xl shadow-lg shadow-primary/20">
              BC
            </div>
            <div className="hidden sm:block">
              <div className="text-lg font-black tracking-tight text-slate-900 leading-tight">Beyazit Cargo</div>
              <div className="text-xs font-medium text-slate-500">Premium Jastip Service</div>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => showSection(item.id)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 flex items-center gap-2",
                  currentSection === item.id
                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                    : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                )}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => showSection('catalog')}
              className="p-2.5 sm:px-4 sm:py-2.5 rounded-full border border-slate-200 bg-white shadow-sm hover:shadow-md transition-all flex items-center gap-2 text-slate-700"
            >
              <Search className="w-5 h-5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline font-extrabold text-sm">Cari</span>
            </button>
            <button
              onClick={() => showSection('cart')}
              className="relative p-2.5 sm:px-4 sm:py-2.5 rounded-full bg-primary text-white shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all flex items-center gap-2"
            >
              <ShoppingCart className="w-5 h-5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline font-extrabold text-sm">Keranjang</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 sm:static sm:top-auto sm:right-auto w-5 h-5 bg-accent text-primary-dark rounded-full flex items-center justify-center text-[10px] sm:text-xs font-black ring-2 ring-white sm:ring-0">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <div className="lg:hidden flex items-center justify-center gap-1 pb-3 px-4 overflow-x-auto no-scrollbar">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => showSection(item.id)}
            className={cn(
              "px-3 py-1.5 rounded-full text-[11px] font-bold transition-all flex items-center gap-1 whitespace-nowrap",
              currentSection === item.id
                ? "bg-primary text-white"
                : "text-slate-500 bg-slate-100"
            )}
          >
            <item.icon className="w-3 h-3" />
            {item.label}
          </button>
        ))}
      </div>
    </header>
  );
}
