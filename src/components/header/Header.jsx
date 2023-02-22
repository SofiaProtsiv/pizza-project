import { Link, NavLink, useLocation } from "react-router-dom";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import logo from "../../images/logo.png";
import "./header.scss";
import Search from "../search";
import { Icon } from "../../images/icons";

export default function Header() {
  const { items, totalPrice } = useSelector((state) => state.cart);
  const location = useLocation();
  const isMounted = useRef(false);

  const totalCount = items.reduce((sum, item) => sum + item.count, 0) || 0;

  useEffect(() => {
    if (isMounted.current) {
      localStorage.setItem("cart", JSON.stringify(items));
    }
    isMounted.current = true;
  }, [items]);

  return (
    <div className="header">
      <div className="container">
        <NavLink to="/">
          <div className="header__logo">
            <img width="38" src={logo} alt="Pizza logo" />
            <div>
              <h1>React Pizza</h1>
              <p>the most delicious pizza in the universe</p>
            </div>
          </div>
        </NavLink>

        {location.pathname !== "/cart" && (
          <div className="header__functional">
            <Search />
            <div className="header__cart">
              <Link to="/cart" className="button button--cart">
                <span>{totalPrice ? `$${totalPrice}` : "Cart"}</span>
                <div className="button__delimiter"></div>
                <Icon id="basket" classNam="" />
                <span>{totalCount}</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
