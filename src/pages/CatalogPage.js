import React, { useMemo, useState } from "react";
import Header from "../components/layout/Header";
import ProductList from "../components/catalog/ProductList";
import ProductForm from "../components/catalog/ProductForm";
import SortSelect from "../components/catalog/SortSelect";
import "../styles/catalog.css";

// картинки товаров
import nikeAirMax90 from "../assets/images/Nike_Air_Max_90.jpg";
import theNorthFaceHoodie from "../assets/images/The_North_Face_Essential_Hoodie.jpg";
import tommyTee from "../assets/images/Tommy_Hilfiger_Classic_Tee.png";
import vansSweatshirt from "../assets/images/Vans_Spray_On_Loose_Crew.png";

const CATEGORIES = [
  { value: "zhenskaya-odezhda", label: "Женская одежда" },
  { value: "muzhskaya-odezhda", label: "Мужская одежда" },
  { value: "detskaya-odezhda", label: "Детская одежда" },
  { value: "obuv", label: "Обувь" },
  { value: "aksessuary", label: "Аксессуары" },
  { value: "novinki", label: "Новинки" },
  { value: "rasprodazha", label: "Распродажа" },
];

const getCategoryLabel = (value) => {
  const found = CATEGORIES.find((c) => c.value === value);
  return found ? found.label : value;
};

const initialProducts = [
  {
    id: 1,
    name: "Nike Air Max 90",
    slug: "nike-air-max-90",
    description:
      "Классические кроссовки Nike Air Max 90 с амортизацией и стильным дизайном.",
    price: 9990,
    category: "obuv",
    image: nikeAirMax90,
    isPublished: true,
  },
  {
    id: 2,
    name: "Худи The North Face Essential Hoodie",
    slug: "the-north-face-essential-hoodie",
    description:
      "Универсальная хлопковая толстовка с фирменным логотипом The North Face. Подходит для повседневной носки и активного отдыха.",
    price: 7490,
    category: "muzhskaya-odezhda",
    image: theNorthFaceHoodie,
    isPublished: true,
  },
  {
    id: 3,
    name: "Tommy Hilfiger Classic Tee",
    slug: "tommy-hilfiger-classic-tee",
    description:
      "Классическая футболка Tommy Hilfiger из хлопка с логотипом бренда.",
    price: 3490,
    category: "zhenskaya-odezhda",
    image: tommyTee,
    isPublished: true,
  },
  {
    id: 4,
    name: "Свитшот Vans Spray On Loose Crew",
    slug: "svitshot-vans-spray-on-loose-crew",
    description:
      "Одежда свободного кроя из мягкого флиса с ярким принтом логотипа Vans на груди.",
    price: 4500,
    category: "muzhskaya-odezhda",
    image: vansSweatshirt,
    isPublished: true,
  },
];

const sortOptions = [
  { value: "name-asc", label: "По названию (А-Я)" },
  { value: "name-desc", label: "По названию (Я-А)" },
  { value: "price-asc", label: "По цене (сначала дешёвые)" },
  { value: "price-desc", label: "По цене (сначала дорогие)" },
];

function CatalogPage() {
  const [products, setProducts] = useState(initialProducts);
  const [sort, setSort] = useState("name-asc");

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    price: "",
    category: "",
    isPublished: true,
    imageFile: null,
    imagePreview: "",
  });

  const [errors, setErrors] = useState({});
  const [imageInputKey, setImageInputKey] = useState(0);

  // показываем только опубликованные товары
  const sortedProducts = useMemo(() => {
    const published = products.filter((p) => p.isPublished);
    const sorted = [...published];

    switch (sort) {
      case "name-asc":
        sorted.sort((a, b) => a.name.localeCompare(b.name, "ru"));
        break;
      case "name-desc":
        sorted.sort((a, b) => b.name.localeCompare(a.name, "ru"));
        break;
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    return sorted;
  }, [products, sort]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);

    setFormData((prev) => ({
      ...prev,
      imageFile: file,
      imagePreview: previewUrl,
    }));

    setErrors((prev) => ({ ...prev, image: undefined }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Введите название товара";
    }

    const slug = formData.slug.trim();
    if (!slug) {
      newErrors.slug = "Введите URL-адрес (slug)";
    } else if (!/^[a-z0-9-]+$/.test(slug)) {
      newErrors.slug = "Slug: только латинские буквы, цифры и -";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Введите описание товара";
    }

    if (!formData.price) {
      newErrors.price = "Укажите цену";
    } else if (Number.isNaN(Number(formData.price))) {
      newErrors.price = "Цена должна быть числом";
    } else if (Number(formData.price) <= 0) {
      newErrors.price = "Цена должна быть больше нуля";
    }

    if (!formData.category) {
      newErrors.category = "Выберите категорию";
    }

    if (!formData.imageFile && !formData.imagePreview) {
      newErrors.image = "Выберите файл изображения";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const newProduct = {
      id: Date.now(),
      name: formData.name.trim(),
      slug: formData.slug.trim(),
      description: formData.description.trim(),
      price: Number(formData.price),
      category: formData.category,
      image: formData.imagePreview || "",
      isPublished: formData.isPublished,
    };

    setProducts((prev) => [...prev, newProduct]);

    setFormData({
      name: "",
      slug: "",
      description: "",
      price: "",
      category: "",
      isPublished: true,
      imageFile: null,
      imagePreview: "",
    });
    setErrors({});
    setImageInputKey((k) => k + 1);
  };

  return (
    <div className="page">
      <Header />

      <main className="main">
        <section className="catalog">
          <div className="catalog-header">
            <h1>Каталог товаров</h1>

            <SortSelect
              sort={sort}
              onChange={setSort}
              options={sortOptions}
            />
          </div>

          <ProductList
            products={sortedProducts}
            getCategoryLabel={getCategoryLabel}
          />
        </section>

        <section className="form-section">
          <h2>Добавить товар</h2>
          <ProductForm
            formData={formData}
            errors={errors}
            categories={CATEGORIES}
            imageInputKey={imageInputKey}
            onChange={handleChange}
            onImageChange={handleImageChange}
            onSubmit={handleSubmit}
          />
        </section>
      </main>
    </div>
  );
}

export default CatalogPage;
