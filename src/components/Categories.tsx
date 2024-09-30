import React from "react";

type CategoriesProps = {
  value: number;
  onClickCategory: (index: number) => void;
};
const categories = [
  "Всі",
  "М'ясна",
  "Вегетаріанска",
  "Гриль",
  "Гостра",
  "Закрита",
];

const Categories: React.FC<CategoriesProps> = React.memo(
  ({ value, onClickCategory }) => {
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
);

export default Categories;
