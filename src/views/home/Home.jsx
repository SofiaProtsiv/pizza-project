import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Categories from "../../components/categories";
import Sort from "../../components/sort";
import Skeleton from "../../components/skeleton";
import PizzaItem from "../../components/pizzaItem";
import Pagination from "../../components/pagination";

import { setCategoryId, setCurrentPage } from "../../redux/filters/slice";
import { fetchPizzas } from "../../redux/pizzas/asyncActions";

import "./home.scss";
import notFound from "../../images/not-found.png";

export default function Home() {
  const dispatch = useDispatch();

  const { items, status } = useSelector((state) => state.pizzas);
  const { categoryId, sort, currentPage, searchValue } = useSelector(
    (state) => state.filters
  );

  const onChangeCategory = (idx) => {
    dispatch(setCategoryId(idx));
    dispatch(setCurrentPage(1));
  };

  const onChangePage = (page) => {
    dispatch(setCurrentPage(page));
  };

  const getPizzas = async () => {
    const sortBy = sort.sortProperty.replace("-", "");
    const order = sort.sortProperty.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? String(categoryId) : "";
    const search = searchValue;

    dispatch(
      fetchPizzas({
        sortBy,
        order,
        category,
        search,
        // currentPage: String(currentPage),
      })
    );

    window.scrollTo(0, 0);
  };

  useEffect(() => {
    getPizzas();
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  const pizzas = [...items]
    .splice((currentPage - 1) * 4, 4)
    .map((obj) => <PizzaItem key={Math.random(obj.id)} {...obj} />);

  const totalPages = Math.ceil(items.length / 4);

  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories category={categoryId} onChangeCategory={onChangeCategory} />
        <Sort sortBy={sort} />
      </div>
      <h2 className="content__title">All pizzas</h2>
      {status === "reject" ? (
        <div className="content__error-info">
          <h2>Something went wrong 😕</h2>
          <p>
            Unfortunately, it was not possible to get pits. Please try again
            Later.
          </p>
        </div>
      ) : (
        <>
          <div className="content__items">
            {status === "pending" ? skeletons : pizzas}
          </div>
          {pizzas.length === 0 && (
            <div className="content__error-info">
              <h2>No pizza found 😕</h2>
              <img src={notFound} alt="Two people shoping" />
              <p>
                Sorry, no pizza was found for your request. Maybe you are
                interested in something else?
              </p>
            </div>
          )}
        </>
      )}
      {totalPages > 2 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onChangePage={onChangePage}
        />
      )}
    </div>
  );
}
