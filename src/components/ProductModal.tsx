import React, { useState, useEffect } from 'react';
import { X, Upload, Check, Image as ImageIcon } from 'lucide-react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';

export const ProductModal: React.FC = () => {
  const {
    isNewProductModalOpen,
    setIsNewProductModalOpen,
    editingProduct,
    setEditingProduct,
    addProduct,
    updateProduct,
    categories
  } = useShop();

  const [name, setName] = useState('');
  const [price, setPrice] = useState<number>(3000000);
  const [originalPrice, setOriginalPrice] = useState<number>(3200000);
  const [category, setCategory] = useState('MOBILE PHONE');
  const [customCategory, setCustomCategory] = useState('');
  const [inStock, setInStock] = useState(true);
  const [stockCount, setStockCount] = useState(10);
  const [image, setImage] = useState('/src/assets/images/product_iphone_16_white_1791651983874.jpg');
  const [description, setDescription] = useState('');
  const [colorsText, setColorsText] = useState('White, Black, Titanium');
  const [storageText, setStorageText] = useState('128GB, 256GB, 512GB');

  // Available image presets
  const sampleImages = [
    { label: 'iPhone 16 Box', url: '/src/assets/images/product_iphone_16_white_1791651983874.jpg' },
    { label: 'iPhone 15 Pro', url: '/src/assets/images/product_iphone_15_pro_box_1791651995091.jpg' },
    { label: 'Aura Headphones', url: '/src/assets/images/product_wireless_anc_headphones_1791651840223.jpg' },
    { label: 'Apex Smartwatch', url: '/src/assets/images/product_smart_fitness_watch_1791651852281.jpg' },
    { label: 'Mechanical Keyboard', url: '/src/assets/images/product_minimalist_mechanical_keyboard_1791651864323.jpg' },
    { label: 'Store Lifestyle', url: '/src/assets/images/hero_ecommerce_showcase_1791651826248.jpg' }
  ];

  useEffect(() => {
    if (editingProduct) {
      setName(editingProduct.name);
      setPrice(editingProduct.price);
      setOriginalPrice(editingProduct.originalPrice || editingProduct.price);
      setCategory(editingProduct.category);
      setInStock(editingProduct.inStock);
      setStockCount(editingProduct.stockCount);
      setImage(editingProduct.image);
      setDescription(editingProduct.description);
      setColorsText(editingProduct.colors?.join(', ') || '');
      setStorageText(editingProduct.storage?.join(', ') || '');
    } else {
      setName('');
      setPrice(3300000);
      setOriginalPrice(3450000);
      setCategory('MOBILE PHONE');
      setInStock(true);
      setStockCount(15);
      setImage('/src/assets/images/product_iphone_16_white_1791651983874.jpg');
      setDescription('Brand new sealed box with official warranty.');
      setColorsText('White, Black, Natural Titanium');
      setStorageText('128GB, 256GB');
    }
  }, [editingProduct, isNewProductModalOpen]);

  if (!isNewProductModalOpen) return null;

  const handleClose = () => {
    setIsNewProductModalOpen(false);
    setEditingProduct(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const finalCategory = category === 'NEW' ? customCategory.trim() || 'GENERAL' : category;

    const colors = colorsText
      ? colorsText
          .split(',')
          .map((c) => c.trim())
          .filter(Boolean)
      : undefined;

    const storage = storageText
      ? storageText
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean)
      : undefined;

    if (editingProduct) {
      updateProduct(editingProduct.id, {
        name,
        price: Number(price),
        originalPrice: Number(originalPrice),
        category: finalCategory,
        inStock,
        stockCount: Number(stockCount),
        image,
        description,
        colors,
        storage
      });
    } else {
      addProduct({
        name,
        price: Number(price),
        originalPrice: Number(originalPrice),
        category: finalCategory,
        inStock,
        stockCount: Number(stockCount),
        image,
        description,
        colors,
        storage
      });
    }

    handleClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-100 overflow-hidden">
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900">
            {editingProduct ? 'Edit Product' : 'Add New Product'}
          </h2>
          <button
            onClick={handleClose}
            className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 space-y-4 text-xs">
          {/* Image Selection & Preview */}
          <div>
            <label className="block font-bold text-slate-700 mb-1.5">Product Image</label>
            <div className="flex gap-3 items-start">
              <div className="w-24 h-24 rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0 relative group">
                <img
                  src={image}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src =
                      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect fill="%23f1f5f9" width="100" height="100"/><text fill="%2364748b" font-size="12" x="50%25" y="50%25" text-anchor="middle">Photo</text></svg>';
                  }}
                />
              </div>

              <div className="flex-1 space-y-2">
                <input
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="Paste image URL..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#5f2eea]/30"
                />

                <div className="flex flex-wrap gap-1">
                  {sampleImages.map((s, idx) => (
                    <button
                      type="button"
                      key={idx}
                      onClick={() => setImage(s.url)}
                      className={`px-2 py-1 rounded-md text-[10px] font-semibold transition-colors ${
                        image === s.url
                          ? 'bg-[#5f2eea] text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Product Name */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Product Title <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. iPhone 16 Pro Max 256GB"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-[#5f2eea]/30"
            />
          </div>

          {/* Price & Original Price */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Selling Price (MMK) <span className="text-rose-500">*</span>
              </label>
              <input
                type="number"
                required
                min={0}
                step={1000}
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#5f2eea]/30"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Original Price (MMK)</label>
              <input
                type="number"
                min={0}
                step={1000}
                value={originalPrice}
                onChange={(e) => setOriginalPrice(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-[#5f2eea]/30"
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">Category</label>
            <div className="flex gap-2">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#5f2eea]/30"
              >
                {categories
                  .filter((c) => c !== 'All')
                  .map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                <option value="NEW">+ Custom New Category</option>
              </select>

              {category === 'NEW' && (
                <input
                  type="text"
                  placeholder="New category name..."
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value)}
                  className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-[#5f2eea]/30"
                />
              )}
            </div>
          </div>

          {/* Stock status & count */}
          <div className="grid grid-cols-2 gap-3 items-center">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Stock Count</label>
              <input
                type="number"
                min={0}
                value={stockCount}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setStockCount(val);
                  setInStock(val > 0);
                }}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-[#5f2eea]/30"
              />
            </div>

            <div className="pt-5">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={inStock}
                  onChange={(e) => setInStock(e.target.checked)}
                  className="w-4 h-4 text-[#5f2eea] rounded border-slate-300 focus:ring-[#5f2eea]"
                />
                <span className="font-semibold text-slate-700">Display as "In Stock"</span>
              </label>
            </div>
          </div>

          {/* Variants: Colors & Storage */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Color Options (comma separated)</label>
              <input
                type="text"
                value={colorsText}
                onChange={(e) => setColorsText(e.target.value)}
                placeholder="White, Black, Natural Titanium"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Storage / Size Options</label>
              <input
                type="text"
                value={storageText}
                onChange={(e) => setStorageText(e.target.value)}
                placeholder="128GB, 256GB, 512GB"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">Product Description</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Features, warranty details, box contents..."
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-[#5f2eea]/30"
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#5f2eea] hover:bg-[#5024cf] text-white font-bold shadow-md transition-colors flex items-center gap-1.5"
            >
              <Check className="w-4 h-4 stroke-[2.5]" />
              <span>{editingProduct ? 'Save Changes' : 'Publish Product'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
