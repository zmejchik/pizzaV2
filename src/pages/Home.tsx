import React from "react";
import qs from "qs";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Sceleton from "../components/PizzaBlock/Sceleton";
import Pagination from "../components/Pagination";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { sortList } from "../components/Sort";
import { useAppDispatch } from "../redux/store";
import { selectFilter } from "../redux/filter/selectors";
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/filter/slice";
import { ISort } from "../redux/filter/types";
import { selectPizzaData } from "../redux/pizza/selectors";
import { fetchPizzas } from "../redux/pizza/asyncActions";

const Home: React.FC = () => {
  const { categoryId, sort, currentPage, searchValue } =
    useSelector(selectFilter);
  const { items, status } = useSelector(selectPizzaData);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const sortType = sort.sortProperty;

  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const onСhangeCategory = React.useCallback((idx: number) => {
    dispatch(setCategoryId(idx));
  }, []);

  const onChangePage = (page: number) => dispatch(setCurrentPage(page));

  const getPizzas = React.useCallback(async () => {
    const order = sortType.includes("-") ? "desc" : "asc";
    const sortBy = sortType.replace("-", "");
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    dispatch(
      fetchPizzas({
        sortBy,
        order,
        category,
        search,
        currentPage: String(currentPage),
      })
    );

    window.scrollTo(0, 0);
  }, [categoryId, sortType, currentPage, searchValue, dispatch]);

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, currentPage, navigate]);

  // Якщо був 1 рендер то перев УРЛ і в редакс
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortList.find(
        (obj) => obj.sortProperty === params.sortProperty
      ) as ISort;

      if (sort) {
        dispatch(
          setFilters({
            searchValue: params.search ? (params.search as string) : "",
            categoryId: Number(params.category),
            currentPage: Number(params.currentPage),
            sort: sort || sortList[0],
          })
        );
      }
      isSearch.current = true;
    }
  }, [dispatch]);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sort.sortProperty, searchValue, currentPage, getPizzas]);

  const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);
  const sceletons = [...new Array(6)].map((_, index) => (
    <Sceleton key={index} />
  ));

  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories value={categoryId} onClickCategory={onСhangeCategory} />
          <Sort value={sort} />
        </div>
        <h2 className="content__title">Всі піцци</h2>

        {status === "error" ? (
          <div className="content__error__info">
            <h2>Щось пішло не так 😕</h2>
            <p>Ми не змогли завантажити піцци. Будь-ласка спробуйте пізніше.</p>
          </div>
        ) : (
          <div className="content__items">
            {status === "loading" ? sceletons : pizzas}
          </div>
        )}

        <Pagination currentPage={currentPage} onChangePage={onChangePage} />
      </div>
    </>
  );
};
export default Home;
