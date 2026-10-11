import React from 'react';
import { Edit2, Trash2, Tag, ShoppingCart, Send } from 'lucide-react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    formatPrice,
    setEditingProduct,
    setIsNewProductModalOpen,
    deleteProduct,
    setSelectedProductDetail,
    addToCart,
    mode,
    setIsCartOpen
  } = useShop();

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingProduct(product);
    setIsNewProductModalOpen(true);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete "${product.name}"?`)) {
      deleteProduct(product.id);
    }
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    setIsCartOpen(true);
  };

  return (
    <div
      onClick={() => setSelectedProductDetail(product)}
      className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col cursor-pointer group active:scale-[0.99]"
    >
      {/* Product Image Box */}
      <div className="relative aspect-4/3 bg-slate-100 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          referrerPolicy="no-referrer"
          onError={(e) => {
            // Elegant SVG fallback if local path fails
            e.currentTarget.src =
              'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect fill="%23f1f5f9" width="400" height="300"/><text fill="%2364748b" font-family="sans-serif" font-size="18" font-weight="bold" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle">' +
              encodeURIComponent(product.name) +
              '</text></svg>';
          }}
        />

        {/* Top-right action icons: Edit and Delete (Admin mode or hover) */}
        <div className="absolute top-2 right-2 flex items-center gap-1.5 z-10">
          <button
            onClick={handleEdit}
            className="w-7 h-7 rounded-lg bg-white/90 hover:bg-white text-slate-700 shadow-sm flex items-center justify-center transition-all hover:scale-110 active:scale-95"
            title="Edit Product"
          >
            <Edit2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleDelete}
            className="w-7 h-7 rounded-lg bg-white/90 hover:bg-rose-50 hover:text-rose-600 text-slate-700 shadow-sm flex items-center justify-center transition-all hover:scale-110 active:scale-95"
            title="Delete Product"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Stock badge */}
        <div className="absolute bottom-2 left-2 z-10">
          {product.inStock ? (
            <span className="bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs uppercase tracking-wide">
              IN STOCK
            </span>
          ) : (
            <span className="bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs uppercase tracking-wide">
              OUT OF STOCK
            </span>
          )}
        </div>
      </div>

      {/* Card Details */}
      <div className="p-3 flex flex-col flex-1 justify-between gap-1.5">
        <div>
          <h3 className="font-bold text-[14px] text-slate-900 line-clamp-1 leading-snug group-hover:text-[#5f2eea] transition-colors">
            {product.name}
          </h3>

          <div className="text-[15px] font-black text-blue-600 tracking-tight mt-0.5 tabular-nums">
            {formatPrice(product.price)}
          </div>
        </div>

        <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[11px] text-slate-500">
          <div className="flex items-center gap-1.5 truncate max-w-[140px]">
            <span className="text-[10px] text-purple-700 bg-purple-50 px-1.5 py-0.5 rounded font-bold whitespace-nowrap">
              KPay/WavePay
            </span>
            <span className="truncate uppercase text-[10px] font-semibold text-slate-400">
              {product.category}
            </span>
          </div>

          {/* Quick Buy / Add button */}
          <button
            onClick={handleQuickAdd}
            className="p-1 rounded-md text-[#5f2eea] hover:bg-purple-50 transition-colors"
            title="Add to Cart"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
