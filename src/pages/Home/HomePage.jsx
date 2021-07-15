import { NavLink } from "react-router-dom";

const HomePage = () => (
  <>
    <h2>Добро пожаловать в OZX SHOP!</h2>
    <p>
      В наш&nbsp;
      <NavLink to="/products">Магазин</NavLink>
      &nbsp;поступила уникальная коллекция товаров от лидера рынка, компании
      Yalantis!
    </p>
  </>
);

export default HomePage;
