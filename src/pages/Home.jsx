import React from "react";
import axios from "axios";
import qs from "qs";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Sceleton from "../components/PizzaBlock/Sceleton";
import Pagination from "../components/Pagination";
import { SearchContext } from "../App";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice";
import { setItems } from "../redux/slices/pizzaSlice";
import { sortList } from "../components/Sort";

export default function Home() {
  const { categoryId, sort, currentPage } = useSelector(
    (state) => state.filter
  );
  const { items } = useSelector((state) => state.pizza);
  const { searchValue } = React.useContext(SearchContext);
  const sortType = sort.sortProperty;
  const [isLoading, setIsLoading] = React.useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const onСhangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => dispatch(setCurrentPage(number));

  const fetchPizzas = React.useCallback(async () => {
    setIsLoading(true);
    
    const order = sortType.includes("-") ? "desc" : "asc";
    const sortBy = sortType.replace("-", "");
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    try {
      const { data } = await axios.get(
        `https://66eaf37e55ad32cda47b1447.mockapi.io/items?&page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
      );
      dispatch(setItems(data));
    } catch (error) {
      console.log("ERROR", error);
    } finally {
      setIsLoading(false);
    }
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
      );

      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );
      isSearch.current = true;
    }
  }, [dispatch]);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      fetchPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sort.sortProperty, searchValue, currentPage, fetchPizzas]);

  const pizzas = items.map((value) => <PizzaBlock key={value.id} {...value} />);
  const sceletons = [...new Array(6)].map((_, index) => (
    <Sceleton key={index} />
  ));

  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories
            value={categoryId}
            onClickCategory={(id) => onСhangeCategory(id)}
          />
          <Sort />
        </div>
        <h2 className="content__title">Всі піцци</h2>
        <div className="content__items">{isLoading ? sceletons : pizzas}</div>
        <Pagination currentPage={currentPage} onChangePage={onChangePage} />
      </div>
    </>
  );
}
