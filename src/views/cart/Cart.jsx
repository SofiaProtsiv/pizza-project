import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import CartItem from "../../components/cartItem";
import CartEmpty from "../../components/cartEmpty";

import { clearItems } from "../../redux/cart/slice";
import { Icon } from "../../images/icons";

import "./cart.scss";

export default function Cart() {
  const dispatch = useDispatch();
  const { totalPrice, items } = useSelector((state) => state.cart);

  const totalCount = items.reduce((sum, item) => sum + item.count, 0);

  const onClickClear = () => {
    if (window.confirm("Empty shopping cart?")) {
      dispatch(clearItems());
    }
  };

  if (!totalPrice) {
    return <CartEmpty />;
  }

  return (
    <div className="container container--cart">
      <div className="cart">
        <div className="cart__top">
          <h2 className="cart__title">
            <Icon id="basket" />
            Cart
          </h2>
          <div onClick={onClickClear} className="cart__clear">
            <Icon id="clear" className="" />

            <span>Clear cart</span>
          </div>
        </div>
        <div className="cart__items">
          {items.map((item) => (
            <CartItem
              key={"_" + item.id + "_" + item.size + "_" + item.type}
              {...item}
            />
          ))}
        </div>
        <div className="cart__bottom">
          <div className="cart__bottom-details">
            <span>
              Total pizzas: <b>{totalCount} items</b>
            </span>
            <span>
              Order price: <b>${totalPrice}</b>
            </span>
          </div>
          <div className="cart__bottom-buttons">
            <Link
              to="/"
              className="button button--outline button--add go-back-btn"
            >
              <Icon id="arrowUp" className="button__go-back-icon" />

              <span>Come back</span>
            </Link>
            <div className="button pay-btn">
              <span>Pay now</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
