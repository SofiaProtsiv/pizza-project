import React from "react";
import { useDispatch } from "react-redux";
import { Icon } from "../../images/icons";
import { addItem, minusItem, removeItem } from "../../redux/cart/slice";

import "./cartItem.scss";

export default function CartItem(item) {
  const { id, title, type, size, price, count, imageUrl } = item;
  const dispatch = useDispatch();

  const onClickPlus = () => {
    dispatch(addItem(item));
  };

  const onClickMinus = () => {
    dispatch(minusItem(id));
  };

  const onClickRemove = () => {
    if (window.confirm("Ты действительно хочешь удалить товар?")) {
      dispatch(removeItem(id));
    }
  };

  return (
    <div className="cart__item">
      <div className="cart__item-img">
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
      </div>
      <div className="cart__item-info">
        <h3>{title}</h3>
        <p>
          {type}, {size} sm
        </p>
      </div>
      <div className="cart__item-count">
        <button
          disabled={count === 1}
          onClick={onClickMinus}
          className="button button--outline button--circle cart__item-count-minus"
        >
          <Icon id="minus" className="" />
        </button>
        <b>{count}</b>
        <button
          onClick={onClickPlus}
          className="button button--outline button--circle cart__item-count-plus"
        >
          <Icon id="plus" className="" />
        </button>
      </div>
      <div className="cart__item-price">
        <b>${price * count}</b>
      </div>
      <div className="cart__item-remove">
        <div
          onClick={onClickRemove}
          className="button button--outline button--circle"
        >
          <Icon id="close" />
        </div>
      </div>
    </div>
  );
}
