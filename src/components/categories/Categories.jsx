import React, { useEffect, useState } from "react";
import { fetchPizzasCategories } from "../../api";
import "./categories.scss";

const Categories = ({ category, onChangeCategory }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchPizzasCategories().then((res) => setCategories(res));
  }, []);

  return (
    <div className="categories">
      <ul>
        {categories.map(({ id, name }) => (
          <li
            key={id}
            onClick={() => onChangeCategory(id)}
            className={category === id ? "active" : ""}
          >
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
