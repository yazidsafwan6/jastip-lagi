import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { rupiah } from '../utils/helpers';

export default function CartItem({ item }) {
  const { products, increaseQty, decreaseQty, removeFromCart } = useContext(AppContext);
  const product = products.find(p => p.id === item.productId);

  if (!product) return null;

  const subtotal = (Number(product.price) + Number(product.fee) + Number(product.shipping)) * Number(item.qty);

  return (
    <div className="cart-item">
      <div className="cart-icon">{product.emoji || "📦"}</div>
      <div>
        <div className="cart-name">{product.name}</div>
        <div className="cart-note">{product.category} · {product.city} · {rupiah(subtotal)}</div>
      </div>
      <div className="qty">
        <button onClick={() => decreaseQty(item.productId)}>−</button>
        <span>{item.qty}</span>
        <button onClick={() => increaseQty(item.productId)}>+</button>
        <button onClick={() => removeFromCart(item.productId)} title="Hapus">🗑️</button>
      </div>
    </div>
  );
}
