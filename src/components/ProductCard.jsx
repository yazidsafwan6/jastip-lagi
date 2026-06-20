import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { rupiah } from '../utils/helpers';

export default function ProductCard({ product }) {
  const { addToCart } = useContext(AppContext);
  const total = Number(product.price) + Number(product.fee) + Number(product.shipping);
  const stockText = Number(product.stock) > 0 ? `Stok ${product.stock}` : "Habis";
  const disabled = Number(product.stock) <= 0;

  return (
    <article className="product-card">
      <div className="product-img">
        <div className="product-badge">{product.city || "Jastip"}</div>
        {product.emoji || "📦"}
      </div>
      <div className="product-body">
        <div className="product-title">{product.name}</div>
        <div className="product-desc">{product.desc || "Produk jastip pilihan."}</div>
        <div className="product-meta">
          <span className="tag">{product.category || "Umum"}</span>
          <span className="tag">{stockText}</span>
          <span className="tag">Fee {rupiah(product.fee)}</span>
        </div>
        <div className="price-row">
          <div>
            <div className="price">{rupiah(total)}</div>
            <div className="fee">Barang {rupiah(product.price)} + fee + ongkir</div>
          </div>
        </div>
        <button
          className="btn primary block"
          disabled={disabled}
          onClick={() => addToCart(product.id)}
        >
          Tambah ke Keranjang
        </button>
      </div>
    </article>
  );
}
