import React from "react";
import { Link } from "react-router-dom";
import cartEmtyImg from "../assets/img/empty-cart.png"

const CartEmpty = () => {
  return (
    <>
      <div className="cart cart--empty">
        <h2>
          Корзина порожня <icon>😕</icon>
        </h2>
        <p>
          Скоріше за все, Ви не замовляли піцу.
          <br />
          Для того щоб замовити піццу, перейдіть на головну сторінку.
        </p>
        <img src={cartEmtyImg} alt="Empty cart" />
        <Link to="/" className="button button--black">
          <span>Повернутись назад</span>
        </Link>
      </div>
    </>
  );
};

export default CartEmpty;
