import React from "react";

function SortSelect({ sort, onChange, options }) {
  return (
    <div className="sort">
      <label htmlFor="sort">Сортировка:</label>
      <select
        id="sort"
        value={sort}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SortSelect;
