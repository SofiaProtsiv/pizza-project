import React, { useCallback, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import debounce from "lodash.debounce";

import { setSearchValue } from "../../redux/filters/slice";
import { Icon } from "../../images/icons";

import "./search.scss";

export default function Search() {
  const dispatch = useDispatch();

  const [value, setValue] = useState("");
  const inputRef = useRef(null);

  const updateSearchValue = useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str));
    }, 500),
    []
  );

  const onChangeInput = (event) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  const hendleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <form className="header__form" onSubmit={hendleSubmit}>
      <label className="header__form-input-label">
        <Icon id="search" className="header__form-input-icon" />
        <input
          ref={inputRef}
          value={value}
          onChange={onChangeInput}
          name="query"
          className="header__form-input"
          placeholder="Search..."
        />
      </label>
    </form>
  );
}
