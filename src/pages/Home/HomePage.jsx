import { NavLink } from 'react-router-dom';
import { Header, Menu, Content, Footer } from '../../components/exports';

import styles from '../../styles/Home.module.css';

function HomePage() {
  return (
    <div className={styles.container}>
      <div className={styles.layout}>
        <Header />
        <Menu />
        <Content>
          <h2>Добро пожаловать в OZX SHOP!</h2>
          <p>
            В наш&nbsp;
            <NavLink to="/products">Магазин</NavLink>
            &nbsp;поступила уникальная коллекция товаров от лидера рынка,
            компании Yalantis!
          </p>
        </Content>
        <Footer />
      </div>
    </div>
  );
}

export default HomePage;
