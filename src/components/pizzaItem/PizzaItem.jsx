import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPizzasTypes } from "../../api";
import { Icon } from "../../images/icons";
import { addItem } from "../../redux/cart/slice";
import getPrice from "../../utils/getPrice";

import "./pizzaItem.scss";

export default function PizzaItem({
  id,
  title,
  price,
  imageUrl,
  sizes,
  types,
}) {
  const dispatch = useDispatch();

  const [typeNames, setTypesNames] = useState([]);
  const [activeType, setActiveType] = useState("thin");
  const [activeSize, setActiveSize] = useState(26);
  const [additionalPrice, setAdditionalPrice] = useState(0);

  useEffect(() => {
    fetchPizzasTypes().then((res) => setTypesNames(res));
  }, []);

  const cartItem = useSelector((state) =>
    state.cart.items.filter((obj) => obj.id.startsWith("_" + id))
  );

  let addedCount = 0;

  if (cartItem) {
    cartItem.forEach((item) => {
      if (item.size === activeSize && item.type === activeType) {
        addedCount = item.count;
      }
    });
  }

  const onClickAdd = () => {
    const item = {
      id: `_${id}_${activeSize}_${activeType}`,
      title,
      price: price + additionalPrice,
      imageUrl,
      type: activeType,
      size: activeSize,
      count: 0,
    };

    dispatch(addItem(item));
  };

  useEffect(() => {
    setAdditionalPrice(getPrice(activeSize, activeType));
  }, [activeSize, activeType]);

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <div
          className="pizza-block__image"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
        <h4 className="pizza-block__title">{title}</h4>
        <div className="pizza-block__selector">
          <ul>
            {typeNames.map(({ id, name }) => (
              <li
                key={id}
                onClick={() => setActiveType(name)}
                className={activeType === name ? "active" : ""}
              >
                {name}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((size, idx) => (
              <li
                key={idx}
                onClick={() => setActiveSize(size)}
                className={activeSize === size ? "active" : ""}
              >
                {size} sm
              </li>
            ))}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">${price + additionalPrice}</div>
          <button
            onClick={onClickAdd}
            className="button button--outline button--add"
          >
            <Icon id="plus" className="" />
            <span>Add</span>
            {addedCount > 0 && <i>{addedCount}</i>}
          </button>
        </div>
      </div>
    </div>
  );
}
