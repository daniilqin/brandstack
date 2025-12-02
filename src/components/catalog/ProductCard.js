import React from "react";

// Компонент карточки товара
function ProductCard({ product, categoryLabel }) {
  return (
    <article className="product-card">
      <div className="product-image-wrapper">
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
        />
      </div>

      <h2 className="product-name">{product.name}</h2>

      {/* <p className="product-slug">/{product.slug}</p> */}

      <p className="product-description">{product.description}</p>

      <p className="product-price">{product.price} ₽</p>

      <p className="product-meta">
        Категория: <b>{categoryLabel || "—"}</b>
      </p>

      <p
        className={
          product.isPublished
            ? "product-status published"
            : "product-status draft"
        }
      >
        {product.isPublished ? "Опубликован" : "Черновик"}
      </p>
    </article>
  );
}

export default ProductCard;
