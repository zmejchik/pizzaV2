import React from "react";
import styles from "./NotFoundBlock.module.scss";

const NotFoundBlock: React.FC = () => {
  return (
    <div className="container">
      <div className={styles.root}>
        <h1>
          <span>&#128530;</span>
          <br />
          Нічого не знайдено
        </h1>
        <p className={styles.description}>
          Нажаль сторінка відсутня на сервері
        </p>
      </div>
    </div>
  );
};

export default NotFoundBlock;
