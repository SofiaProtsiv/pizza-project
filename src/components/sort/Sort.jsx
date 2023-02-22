import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Icon } from "../../images/icons";
import { setSort } from "../../redux/filters/slice";

import "./sort.scss";

export const sortList = [
  { name: "popularity (DESC)", sortProperty: "rating" },
  { name: "popularity (ASC)", sortProperty: "-rating" },
  { name: "price (DESC)", sortProperty: "price" },
  { name: "price (ASC)", sortProperty: "-price" },
  { name: "alphabet (DESC)", sortProperty: "title" },
  { name: "alphabet (ASC)", sortProperty: "-title" },
];

export default function Sort({ sortBy }) {
  const dispatch = useDispatch();
  const sortRef = useRef(null);

  const [open, setOpen] = useState(false);

  const onClickListItem = (obj) => {
    dispatch(setSort(obj));
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
        setOpen(false);
      }
    };
    document.body.addEventListener("click", handleClickOutside);
    return () => document.body.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <Icon
          id="arrowDown"
          className={open ? "sort__label-icon active" : "sort__label-icon"}
        />
        <b>Sort by:</b>
        <span onClick={() => setOpen(!open)}>{sortBy.name}</span>
      </div>
      {open && (
        <div className="sort__popup">
          <ul>
            {sortList.map((obj, i) => (
              <li
                key={i}
                onClick={() => onClickListItem(obj)}
                className={
                  sortBy.sortProperty === obj.sortProperty ? "active" : ""
                }
              >
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
