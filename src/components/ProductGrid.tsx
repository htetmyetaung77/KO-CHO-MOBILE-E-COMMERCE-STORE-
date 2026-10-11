import React from 'react';
import { ProductCard } from './ProductCard';
import { useShop } from '../context/ShopContext';
import { PackageOpen, Plus } from 'lucide-react';

export const ProductGrid: React.FC = () => {
  const {
    products,
    selectedCategory,
    searchQuery,
    sortBy,
    setIsNewProductModalOpen
  } = useShop();

  // Filter products
  const filteredProducts = products.filter((prod) => {
    const matchCategory =
      selectedCategory === 'All' ||
      prod.category.toLowerCase() === selectedCategory.toLowerCase();

    const matchSearch =
      !searchQuery ||
      prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchCategory && matchSearch;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return 0;
  });

  if (sortedProducts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
        <div className="w-16 h-16 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-500 mb-3">
          <PackageOpen className="w-8 h-8" />
        </div>
        <h4 className="text-sm font-bold text-slate-800">No products found</h4>
        <p className="text-xs text-slate-500 mt-1 max-w-xs">
          {searchQuery
            ? `No items match "${searchQuery}". Try adjusting your search or category.`
            : 'No products in this category yet.'}
        </p>
        <button
          onClick={() => setIsNewProductModalOpen(true)}
          className="mt-4 px-4 py-2 bg-[#5f2eea] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm hover:bg-[#5024cf] transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>
    );
  }

  return (
    <div className="p-3 pb-24">
      {/* 2 columns on mobile, 3-4 columns on larger screens */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
