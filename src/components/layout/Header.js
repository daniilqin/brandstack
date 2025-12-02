import React from "react";
import "../../styles/layout.css";

// Компонент шапки сайта
function Header() {
  return (
    <header className="header">
      <div className="logo">BrandStack</div>

      <nav className="nav">
        <span className="nav-link active">Каталог</span>
      </nav>

      <div className="header-spacer" />
    </header>
  );
}

export default Header;
