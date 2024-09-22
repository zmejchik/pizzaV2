import React from "react";

function Categories({ value, onClickCategory }) {

  const categories = [
    "Всі",
    "М'ясна",
    "Вегетаріанска",
    "Гриль",
    "Гостра",
    "Закрита",
  ];

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, index) => (
          <li
            key={index}
            onClick={() => onClickCategory(index)}
            className={value === index ? "active" : ""}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
