import React from "react";

// Форма добавления товара
function ProductForm({
  formData,
  errors,
  categories,
  imageInputKey,
  onChange,
  onImageChange,
  onSubmit,
}) {
  return (
    <form className="product-form" onSubmit={onSubmit} noValidate>
      <div className="form-row">
        <label htmlFor="name">Название</label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={onChange}
          className={errors.name ? "input error" : "input"}
          placeholder="Введите название товара"
        />
        {errors.name && <span className="error-text">{errors.name}</span>}
      </div>

      <div className="form-row">
        <label htmlFor="slug">URL-адрес (slug)</label>
        <input
          id="slug"
          name="slug"
          type="text"
          value={formData.slug}
          onChange={onChange}
          className={errors.slug ? "input error" : "input"}
          placeholder="url-adres-tovara"
        />
        {errors.slug && <span className="error-text">{errors.slug}</span>}
      </div>

      <div className="form-row">
        <label htmlFor="description">Описание</label>
        <textarea
          id="description"
          name="description"
          rows={3}
          value={formData.description}
          onChange={onChange}
          className={errors.description ? "input error" : "input"}
          placeholder="Описание товара"
        />
        {errors.description && (
          <span className="error-text">{errors.description}</span>
        )}
      </div>

      <div className="form-row">
        <label htmlFor="price">Цена, ₽</label>
        <input
          id="price"
          name="price"
          type="text"
          value={formData.price}
          onChange={onChange}
          className={errors.price ? "input error" : "input"}
          placeholder="0.00"
        />
        {errors.price && <span className="error-text">{errors.price}</span>}
      </div>

      <div className="form-row">
        <label htmlFor="category">Категория</label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={onChange}
          className={errors.category ? "input error" : "input"}
        >
          <option value="">Выберите категорию</option>
          {categories.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
        {errors.category && (
          <span className="error-text">{errors.category}</span>
        )}
      </div>

      <div className="form-row">
        <label>Изображение</label>
        <input
          key={imageInputKey}
          type="file"
          accept="image/*"
          onChange={onImageChange}
          className={errors.image ? "input error" : "input"}
        />
        {errors.image && <span className="error-text">{errors.image}</span>}
      </div>

      <label className="checkbox-row">
        <input
          type="checkbox"
          name="isPublished"
          checked={formData.isPublished}
          onChange={onChange}
        />
        <span>Опубликовать товар (показывать в каталоге)</span>
      </label>

      <button type="submit" className="btn">
        Добавить
      </button>
    </form>
  );
}

export default ProductForm;
