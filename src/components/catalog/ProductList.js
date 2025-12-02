import React from "react";
import ProductCard from "./ProductCard";

// Компонент списка товаров
function ProductList({ products, getCategoryLabel }) {
  return (
    <div className="products-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          categoryLabel={getCategoryLabel(product.category)}
        />
      ))}
    </div>
  );
}

export default ProductList;
