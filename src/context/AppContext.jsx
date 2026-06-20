import { createContext, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { makeId, rupiah, formatDate } from '../utils/helpers';

export const AppContext = createContext();

const STORAGE_KEYS = {
  products: "beyazit_cargo_products_v1",
  cart: "beyazit_cargo_cart_v1",
  orders: "beyazit_cargo_orders_v1",
  lastInvoice: "beyazit_cargo_last_invoice_v1"
};

const defaultProducts = [
  {
    id: "PRD-DEFAULT-1",
    name: "Tas Tote Premium Korea",
    emoji: "👜",
    category: "Fashion",
    city: "Seoul",
    stock: 12,
    price: 185000,
    fee: 30000,
    shipping: 25000,
    desc: "Tote bag minimalis bahan tebal, cocok untuk kuliah, kerja, dan jalan santai.",
    popular: 99
  },
  {
    id: "PRD-DEFAULT-2",
    name: "Skincare Travel Set Jepang",
    emoji: "🧴",
    category: "Skincare",
    city: "Tokyo",
    stock: 8,
    price: 320000,
    fee: 45000,
    shipping: 35000,
    desc: "Paket skincare ukuran travel, mudah dibawa, cocok untuk coba produk baru.",
    popular: 92
  },
  {
    id: "PRD-DEFAULT-3",
    name: "Sneakers Basic Putih",
    emoji: "👟",
    category: "Sepatu",
    city: "Jakarta",
    stock: 6,
    price: 425000,
    fee: 50000,
    shipping: 40000,
    desc: "Sneakers putih clean look, tersedia size pilihan sesuai catatan checkout.",
    popular: 88
  },
  {
    id: "PRD-DEFAULT-4",
    name: "Parfum Mini Dubai",
    emoji: "🧿",
    category: "Parfum",
    city: "Dubai",
    stock: 20,
    price: 145000,
    fee: 35000,
    shipping: 30000,
    desc: "Parfum mini aroma premium, cocok untuk hadiah dan penggunaan harian.",
    popular: 87
  },
  {
    id: "PRD-DEFAULT-5",
    name: "Cokelat Oleh-Oleh Turki",
    emoji: "🍫",
    category: "Makanan",
    city: "Istanbul",
    stock: 25,
    price: 95000,
    fee: 20000,
    shipping: 20000,
    desc: "Cokelat khas Turki, aman untuk oleh-oleh dan parcel kecil.",
    popular: 84
  },
  {
    id: "PRD-DEFAULT-6",
    name: "Kaos Oversize Bangkok",
    emoji: "👕",
    category: "Fashion",
    city: "Bangkok",
    stock: 18,
    price: 125000,
    fee: 25000,
    shipping: 22000,
    desc: "Kaos oversize bahan adem, warna dan size bisa ditulis di catatan.",
    popular: 82
  },
  {
    id: "PRD-DEFAULT-7",
    name: "Jam Tangan Digital",
    emoji: "⌚",
    category: "Aksesoris",
    city: "Singapore",
    stock: 10,
    price: 210000,
    fee: 30000,
    shipping: 25000,
    desc: "Jam digital kasual dengan tampilan modern dan ringan dipakai.",
    popular: 79
  },
  {
    id: "PRD-DEFAULT-8",
    name: "Makeup Lip Tint Korea",
    emoji: "💄",
    category: "Makeup",
    city: "Seoul",
    stock: 15,
    price: 99000,
    fee: 20000,
    shipping: 18000,
    desc: "Lip tint warna natural, cocok untuk daily look dan hadiah kecil.",
    popular: 77
  },
  {
    id: "PRD-DEFAULT-9",
    name: "Topi Baseball Jepang",
    emoji: "🧢",
    category: "Aksesoris",
    city: "Osaka",
    stock: 14,
    price: 135000,
    fee: 25000,
    shipping: 22000,
    desc: "Topi baseball simple dengan bordir premium dan adjustable strap.",
    popular: 75
  },
  {
    id: "PRD-DEFAULT-10",
    name: "Boneka Karakter Limited",
    emoji: "🧸",
    category: "Merchandise",
    city: "Hong Kong",
    stock: 5,
    price: 275000,
    fee: 45000,
    shipping: 35000,
    desc: "Boneka karakter edisi terbatas, cocok untuk kolektor dan kado.",
    popular: 73
  },
  {
    id: "PRD-DEFAULT-11",
    name: "Dompet Kulit Minimalis",
    emoji: "👛",
    category: "Fashion",
    city: "Bandung",
    stock: 16,
    price: 155000,
    fee: 25000,
    shipping: 18000,
    desc: "Dompet kulit sintetis elegan dengan slot kartu dan uang tunai.",
    popular: 71
  },
  {
    id: "PRD-DEFAULT-12",
    name: "Kopi Sachet Vietnam",
    emoji: "☕",
    category: "Makanan",
    city: "Ho Chi Minh",
    stock: 30,
    price: 85000,
    fee: 18000,
    shipping: 18000,
    desc: "Kopi sachet khas Vietnam, praktis untuk stok rumah atau kantor.",
    popular: 68
  }
];

export const AppProvider = ({ children }) => {
  const [products, setProducts] = useLocalStorage(STORAGE_KEYS.products, defaultProducts);
  const [cart, setCart] = useLocalStorage(STORAGE_KEYS.cart, []);
  const [orders, setOrders] = useLocalStorage(STORAGE_KEYS.orders, []);
  const [lastInvoice, setLastInvoice] = useLocalStorage(STORAGE_KEYS.lastInvoice, null);
  const [currentSection, setCurrentSection] = useState('home');
  const [toast, setToast] = useState({ show: false, message: '' });

  const showSection = (sectionId) => {
    setCurrentSection(sectionId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const triggerToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: '' }), 2500);
  };

  const addToCart = (productId) => {
    const product = products.find(item => item.id === productId);
    if (!product) return triggerToast("Produk tidak ditemukan.");
    if (Number(product.stock) <= 0) return triggerToast("Stok produk habis.");

    const existing = cart.find(item => item.productId === productId);
    if (existing) {
      if (existing.qty >= Number(product.stock)) return triggerToast("Jumlah melebihi stok.");
      setCart(cart.map(item => item.productId === productId ? { ...item, qty: item.qty + 1 } : item));
    } else {
      setCart([...cart, { productId, qty: 1, note: "" }]);
    }
    triggerToast(`${product.name} masuk keranjang.`);
  };

  const increaseQty = (productId) => {
    const product = products.find(p => p.id === productId);
    const item = cart.find(i => i.productId === productId);
    if (item.qty >= Number(product.stock)) return triggerToast("Jumlah sudah sesuai batas stok.");
    setCart(cart.map(i => i.productId === productId ? { ...i, qty: i.qty + 1 } : i));
  };

  const decreaseQty = (productId) => {
    const item = cart.find(i => i.productId === productId);
    if (item.qty <= 1) {
      setCart(cart.filter(i => i.productId !== productId));
    } else {
      setCart(cart.map(i => i.productId === productId ? { ...i, qty: i.qty - 1 } : i));
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(i => i.productId !== productId));
    triggerToast("Produk dihapus dari keranjang.");
  };

  const clearCart = () => {
    if (cart.length === 0) return;
    if (window.confirm("Kosongkan keranjang?")) {
      setCart([]);
      triggerToast("Keranjang dikosongkan.");
    }
  };

  const calculateCartTotals = () => {
    return cart.reduce((acc, item) => {
      const product = products.find(p => p.id === item.productId);
      if (!product) return acc;
      const qty = Number(item.qty) || 0;
      acc.goods += Number(product.price) * qty;
      acc.fees += Number(product.fee) * qty;
      acc.shipping += Number(product.shipping) * qty;
      acc.total += (Number(product.price) + Number(product.fee) + Number(product.shipping)) * qty;
      return acc;
    }, { goods: 0, fees: 0, shipping: 0, total: 0 });
  };

  const checkout = (customerData) => {
    const totals = calculateCartTotals();
    const orderItems = cart.map(item => {
      const product = products.find(p => p.id === item.productId);
      return {
        productId: item.productId,
        name: product?.name || "Produk",
        price: Number(product?.price || 0),
        fee: Number(product?.fee || 0),
        shipping: Number(product?.shipping || 0),
        qty: Number(item.qty),
        subtotal: (Number(product?.price || 0) + Number(product?.fee || 0) + Number(product?.shipping || 0)) * Number(item.qty)
      };
    });

    const order = {
      id: makeId("INV"),
      createdAt: new Date().toISOString(),
      customer: customerData,
      items: orderItems,
      ...totals,
      status: "pending"
    };

    setOrders([order, ...orders]);
    setProducts(products.map(p => {
      const itemInCart = cart.find(i => i.productId === p.id);
      if (itemInCart) return { ...p, stock: Math.max(0, p.stock - itemInCart.qty) };
      return p;
    }));
    setLastInvoice(order);
    setCart([]);
    showSection('invoice');
    triggerToast("Pesanan berhasil dibuat.");
  };

  const setOrderStatus = (orderId, status) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, status } : o));
    triggerToast("Status order diperbarui.");
  };

  const deleteOrder = (orderId) => {
    if (window.confirm("Hapus order ini?")) {
      setOrders(orders.filter(o => o.id !== orderId));
      if (lastInvoice?.id === orderId) setLastInvoice(null);
      triggerToast("Order dihapus.");
    }
  };

  const openOrderInvoice = (orderId) => {
    const order = orders.find(o => o.id === orderId);
    if (order) {
      setLastInvoice(order);
      showSection('invoice');
    }
  };

  const saveProduct = (productData) => {
    if (productData.id) {
      setProducts(products.map(p => p.id === productData.id ? productData : p));
      triggerToast("Produk diperbarui.");
    } else {
      setProducts([{ ...productData, id: makeId("PRD"), popular: 50 }, ...products]);
      triggerToast("Produk ditambahkan.");
    }
  };

  const deleteProduct = (productId) => {
    if (window.confirm("Hapus produk ini?")) {
      setProducts(products.filter(p => p.id !== productId));
      setCart(cart.filter(i => i.productId !== productId));
      triggerToast("Produk dihapus.");
    }
  };

  const seedProducts = () => {
    if (window.confirm("Reset katalog ke contoh produk?")) {
      setProducts(defaultProducts);
      triggerToast("Contoh produk dimuat ulang.");
    }
  };

  const resetAllData = () => {
    if (window.confirm("Reset semua data?")) {
      setProducts(defaultProducts);
      setCart([]);
      setOrders([]);
      setLastInvoice(null);
      triggerToast("Semua data direset.");
    }
  };

  const exportData = () => {
    const payload = { products, orders, cart, lastInvoice };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `beyazit-cargo-data-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    triggerToast("Data diexport.");
  };

  const importDataFromFile = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const payload = JSON.parse(e.target.result);
        if (payload.products) setProducts(payload.products);
        if (payload.orders) setOrders(payload.orders);
        if (payload.cart) setCart(payload.cart);
        if (payload.lastInvoice) setLastInvoice(payload.lastInvoice);
        triggerToast("Data berhasil diimport.");
      } catch {
        triggerToast("File JSON tidak valid.");
      }
    };
    reader.readAsText(file);
  };

  const copyInvoiceText = () => {
    if (!lastInvoice) return;
    const lines = [
      `INVOICE ${lastInvoice.id}`,
      `Beyazit Cargo`,
      `Tanggal: ${formatDate(lastInvoice.createdAt)}`,
      `Customer: ${lastInvoice.customer.name}`,
      `WhatsApp: ${lastInvoice.customer.phone}`,
      `Alamat: ${lastInvoice.customer.address}`,
      `Pembayaran: ${lastInvoice.customer.payment}`,
      "",
      "Item:",
      ...lastInvoice.items.map(item => `- ${item.qty}x ${item.name} = ${rupiah(item.subtotal)}`),
      "",
      `Subtotal barang: ${rupiah(lastInvoice.goods)}`,
      `Fee jastip: ${rupiah(lastInvoice.fees)}`,
      `Ongkir: ${rupiah(lastInvoice.shipping)}`,
      `TOTAL: ${rupiah(lastInvoice.total)}`,
      "",
      `Catatan: ${lastInvoice.customer.note || "-"}`
    ];
    navigator.clipboard.writeText(lines.join("\n"))
      .then(() => triggerToast("Teks invoice disalin."))
      .catch(() => triggerToast("Gagal menyalin invoice."));
  };

  return (
    <AppContext.Provider value={{
      products, cart, orders, lastInvoice, currentSection, toast,
      showSection, addToCart, increaseQty, decreaseQty, removeFromCart,
      clearCart, calculateCartTotals, checkout, setOrderStatus, deleteOrder,
      openOrderInvoice, saveProduct, deleteProduct, seedProducts, resetAllData,
      exportData, importDataFromFile, copyInvoiceText
    }}>
      {children}
    </AppContext.Provider>
  );
};
